/**
 * Production wiring: Firestore (named database) through Vercel OIDC →
 * Google Workload Identity Federation → dedicated service account, and
 * SMTP through KingHost. No JSON key, no Firebase Admin default account.
 */
import { Firestore } from "@google-cloud/firestore";
import { ExternalAccountClient } from "google-auth-library";
import { getVercelOidcToken } from "@vercel/oidc";
import nodemailer from "nodemailer";
import type { NotifierDeps } from "./bookingNotifier.js";

const PROJECT_ID = "gen-lang-client-0737558452";
const DATABASE_ID = "ai-studio-gustavinhodocort-83d7026e-3333-4485-889f-ae4024347ed5";

// Identifiers only (not secrets). Env vars may override them.
const DEFAULTS: Record<string, string> = {
  GCP_PROJECT_NUMBER: "678032096541",
  GCP_WORKLOAD_IDENTITY_POOL_ID: "vercel",
  GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID: "vercel-gustavinho-prod",
  GCP_SERVICE_ACCOUNT_EMAIL: "vercel-booking-notify@gen-lang-client-0737558452.iam.gserviceaccount.com",
  // Bookings created before the notice went live are never e-mailed.
  BOOKING_NOTIFY_SINCE: "2026-11-25T21:50:16Z",
};

function required(name: string): string {
  const v = process.env[name] || DEFAULTS[name];
  if (!v) throw new Error(`missing_env_${name}`);
  return v;
}

let cached: NotifierDeps | null = null;

export function getProductionDeps(): NotifierDeps {
  if (cached) return cached;

  const notifySince = new Date(required("BOOKING_NOTIFY_SINCE"));
  if (Number.isNaN(notifySince.getTime())) throw new Error("invalid_env_BOOKING_NOTIFY_SINCE");

  const projectNumber = required("GCP_PROJECT_NUMBER");
  const poolId = required("GCP_WORKLOAD_IDENTITY_POOL_ID");
  const providerId = required("GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID");
  const serviceAccount = required("GCP_SERVICE_ACCOUNT_EMAIL");

  const authClient = ExternalAccountClient.fromJSON({
    type: "external_account",
    audience: `//iam.googleapis.com/projects/${projectNumber}/locations/global/workloadIdentityPools/${poolId}/providers/${providerId}`,
    subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    token_url: "https://sts.googleapis.com/v1/token",
    service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${serviceAccount}:generateAccessToken`,
    subject_token_supplier: { getSubjectToken: () => getVercelOidcToken() },
  });
  if (!authClient) throw new Error("oidc_client_unavailable");

  const db = new Firestore({
    projectId: PROJECT_ID,
    databaseId: DATABASE_ID,
    authClient,
    preferRest: true,
  });

  const transporter = nodemailer.createTransport({
    host: "smtpi.uni5.net",
    port: 465,
    secure: true,
    auth: { user: "contato@barbeiro.curitiba.br", pass: required("BOOKING_SMTP_PASSWORD") },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  cached = {
    db,
    notifySince,
    sendMail: async (msg) => {
      const info = await transporter.sendMail(msg);
      return { messageId: info.messageId };
    },
    log: (event, data) => console.log(JSON.stringify({ event, ...data })),
  };
  return cached;
}
