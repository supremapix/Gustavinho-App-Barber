import React from "react";
import { Link } from "react-router-dom";
import { Scissors, Home, Calendar } from "lucide-react";
import { BUSINESS_INFO } from "../data/business";

export default function NotFoundView() {
  return (
    <div className="min-h-[80vh] pt-32 pb-16 flex items-center justify-center bg-[#0f0f0f] text-center px-4">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#18181b] border border-[#d4af37] flex items-center justify-center mx-auto mb-6">
          <Scissors className="w-8 h-8 text-[#d4af37]" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-2">
          Página Não Encontrada (404)
        </h1>
        <p className="text-sm text-[#a1a1aa] mb-8 leading-relaxed">
          A página que você procurou não existe ou mudou de endereço. Acesse as seções principais da barbearia abaixo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 py-3.5 px-4 rounded-xl bg-[#18181b] border border-[#27272a] text-white font-bold text-xs hover:border-[#d4af37] flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#d4af37]" />
            <span>Voltar ao Início</span>
          </Link>

          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 px-4 rounded-xl bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] font-extrabold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#0f0f0f]" />
            <span>Agendar WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
