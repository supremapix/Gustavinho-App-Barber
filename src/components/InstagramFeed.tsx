import React from "react";
import { Instagram, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function InstagramFeed() {
  return (
    <section className="relative py-12 px-4 bg-gray-50/50 border-y border-gray-200 overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-35 sm:opacity-45 scale-105"
          src="https://img.supremasite.com.br/gusta/video-barber.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/70 via-gray-50/40 to-gray-50/70" />
      </div>

      {/* Background Soft Glow Decorators */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-pink-500/20 via-purple-500/15 to-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-amber-400/15 to-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 text-white text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-sm">
            <Instagram className="w-3.5 h-3.5" />
            <span>Social Real @gustavinhodocortee</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black uppercase text-gray-950 tracking-tight mb-3">
            Siga-nos no Instagram • <span className="text-amber-500">@gustavinhodocortee</span>
          </h3>

          <p className="text-gray-600 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Acompanhe os bastidores do dia a dia da barbearia no CIC, os cortes da semana, transformações e stories em tempo real.
          </p>
        </motion.div>

        {/* Embedded Feed Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-md mx-auto w-full bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:scale-[1.01] transition-transform duration-300 relative group"
        >
          <div className="w-full h-[390px] sm:h-[405px] bg-white flex items-center justify-center relative overflow-hidden">
            <iframe
              src="https://www.instagram.com/gustavinhodocortee/embed"
              title="Feed do Instagram do Gustavinho do Corte"
              className="w-full h-[450px] -mb-12 border-0 rounded-3xl"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* CTA & Authority Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <div>
            <a
              href="https://www.instagram.com/gustavinhodocortee/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-extrabold text-base shadow-lg shadow-pink-500/20 hover:opacity-95 active:scale-95 transition-all w-full sm:w-auto"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="block text-[10px] text-gray-500 font-normal tracking-tight mt-1 text-center">
              perfil oficial @gustavinhodocortee
            </span>
          </div>

          <div className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white border border-gray-200 shadow-md">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className="font-mono text-xs font-bold text-gray-800 tracking-tight">
              Comunidade 100% Organizada do CIC Curitiba
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
