import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  badge?: string;
  title: string | React.ReactNode;
  description: string;
  children?: React.ReactNode;
}

export default function PageHeroHeader({
  breadcrumbs,
  badge,
  title,
  description,
  children
}: PageHeroHeaderProps) {
  return (
    <div className="relative pt-32 pb-14 overflow-hidden bg-[#0a0a0b] border-b border-[#27272a]/80 mb-12 shadow-2xl">
      {/* Background Video Layer - High Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-65 sm:opacity-75 scale-105 pointer-events-none"
          src="https://img.supremasite.com.br/gusta/video-barber.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-[#0a0a0b]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/85 via-[#0a0a0b]/50 to-transparent" />
        
        {/* Ambient Gold Radial Glow */}
        <div className="absolute top-1/2 left-20 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-xs text-gray-300 mb-5">
          <Link to="/" className="hover:text-[#d4af37] transition-colors">Início</Link>
          {breadcrumbs.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="text-gray-500">/</span>
              {item.href ? (
                <Link to={item.href} className="hover:text-[#d4af37] transition-colors">{item.label}</Link>
              ) : (
                <span className="text-[#d4af37] font-bold">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {badge && (
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-[11px] font-mono font-bold tracking-[0.12em] uppercase text-[#e5c158] shadow-md">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              {badge}
            </span>
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-brand font-black text-white tracking-tight mb-4 drop-shadow-lg">
          {title}
        </h1>

        <p className="text-base sm:text-lg text-gray-200 max-w-2xl leading-relaxed font-normal drop-shadow-md">
          {description}
        </p>

        {children}
      </div>
    </div>
  );
}
