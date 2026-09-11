import React from "react";
import { Link } from "react-router-dom";

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
    <div className="relative pt-28 pb-12 overflow-hidden bg-[#0f0f0f] border-b border-[#27272a]/80 mb-12">
      {/* Background Video with Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-35 scale-105 pointer-events-none"
          src="https://img.supremasite.com.br/gusta/video-barber.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/85 to-[#0f0f0f]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/75 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
          <Link to="/" className="hover:text-white transition-colors">Início</Link>
          {breadcrumbs.map((item, idx) => (
            <React.Fragment key={idx}>
              <span>/</span>
              {item.href ? (
                <Link to={item.href} className="hover:text-white transition-colors">{item.label}</Link>
              ) : (
                <span className="text-[#d4af37] font-semibold">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {badge && (
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#d4af37] block mb-2">
            {badge}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-brand font-bold text-white tracking-tight mb-4">
          {title}
        </h1>

        <p className="text-[17px] text-[#a1a1aa] max-w-2xl leading-relaxed font-normal">
          {description}
        </p>

        {children}
      </div>
    </div>
  );
}
