import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  KeyRound,
  AlertCircle,
  ArrowRight,
  Scissors
} from "lucide-react";
import { auth, db } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { getUserFriendlyErrorMessage } from "../utils/errorMapper";

export default function AdminLoginView() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in and authorized in admins collection
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const adminDoc = await getDoc(doc(db, "admins", user.uid));
          if (adminDoc.exists()) {
            navigate("/admin");
          }
        } catch (e) {
          console.warn("Error checking admin status on load:", e);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCred.user;

      // Check if user's UID exists in the 'admins' collection
      const adminDoc = await getDoc(doc(db, "admins", user.uid));

      if (!adminDoc.exists()) {
        setError("Nenhum administrador autorizado foi configurado para esta conta.");
        setLoading(false);
        return;
      }

      navigate("/admin");
    } catch (err: any) {
      console.error("Auth login error:", err);
      setError(getUserFriendlyErrorMessage(err, "E-mail ou senha de administrador incorretos."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#0f0f0f] flex flex-col items-center justify-center px-4 selection:bg-[#d4af37] selection:text-[#0f0f0f]">
      <div className="w-full max-w-md bg-[#18181b] border border-[#27272a] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mb-3">
            <Scissors className="w-7 h-7 text-[#d4af37]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-1">
            Gustavinho do Corte
          </span>
          <h1 className="text-2xl font-black text-white">Login Administrativo</h1>
          <p className="text-xs text-[#a1a1aa] mt-1 max-w-xs">
            Acesso exclusivo para gerenciamento da barbearia. Autenticação restrita via Firebase.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/90 border border-red-800 text-red-200 text-xs font-bold flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-extrabold uppercase text-[#d4af37] block mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>E-mail do Administrador</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@barbearia.com"
              className="w-full p-3.5 bg-[#0f0f0f] border border-[#27272a] rounded-xl text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold uppercase text-[#d4af37] block mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Senha</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3.5 bg-[#0f0f0f] border border-[#27272a] rounded-xl text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-extrabold text-sm bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>Autenticando...</span>
            ) : (
              <>
                <span>ENTRAR NO PAINEL</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#27272a] text-center">
          <p className="text-[11px] text-[#71717a] font-medium flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-[#d4af37]" />
            <span>Contas de administradores são provisionadas exclusivamente pelo Firebase Console.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
