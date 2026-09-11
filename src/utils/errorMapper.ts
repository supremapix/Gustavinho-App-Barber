/**
 * Maps raw technical errors (Firebase, Firestore, network, etc.) to clear Portuguese messages.
 * Logs original technical details to console.error for debugging.
 */
export function getUserFriendlyErrorMessage(error: any, fallbackMessage?: string): string {
  if (error) {
    console.error("[Technical Error Detail]:", error);
  }

  if (!error) {
    return fallbackMessage || "Não foi possível concluir esta ação. Tente novamente.";
  }

  const rawMsg = typeof error === "string" ? error : error?.message || String(error);
  const lower = rawMsg.toLowerCase();

  if (
    lower.includes("permission") ||
    lower.includes("insufficient") ||
    lower.includes("missing or insufficient") ||
    lower.includes("permission-denied")
  ) {
    return "Não foi possível concluir esta ação. Fale com a gente no WhatsApp.";
  }

  if (
    lower.includes("offline") ||
    lower.includes("network") ||
    lower.includes("conectar") ||
    lower.includes("internet") ||
    lower.includes("unavailable")
  ) {
    return "Não conseguimos conectar agora. Verifique sua internet e tente novamente.";
  }

  if (
    lower.includes("reservado") ||
    lower.includes("ocupado") ||
    lower.includes("already exists") ||
    lower.includes("slot")
  ) {
    return "Esse horário acabou de ser reservado. Escolha outro.";
  }

  if (
    lower.includes("auth/") ||
    lower.includes("invalid-credential") ||
    lower.includes("wrong-password") ||
    lower.includes("user-not-found")
  ) {
    return "E-mail ou senha de administrador incorretos. Verifique suas credenciais.";
  }

  // If error message is clean Portuguese without technical stack/error codes
  if (
    !rawMsg.includes("FirebaseError") &&
    !rawMsg.includes("Error:") &&
    !rawMsg.includes("code") &&
    !rawMsg.includes("status") &&
    !rawMsg.includes("at ")
  ) {
    return rawMsg;
  }

  return fallbackMessage || "Não foi possível concluir esta ação. Fale com a gente no WhatsApp.";
}
