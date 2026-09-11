import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, Calendar, CheckCircle2, ChevronRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { SERVICES_DATA } from "../data/services";
import { BUSINESS_INFO } from "../data/business";
import FinalCtaSection from "../components/FinalCtaSection";

export default function ServiceDetailView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const service = SERVICES_DATA.find((s) => s.slug === slug || s.id === slug);

  if (!service) {
    return (
      <div className="min-h-[70vh] pt-32 pb-16 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-white mb-4">Serviço Não Encontrado</h1>
        <p className="text-[#a1a1aa] mb-6">O serviço procurado não está cadastrado ou mudou de endereço.</p>
        <button
          onClick={() => navigate("/servicos")}
          className="px-6 py-3 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-bold"
        >
          Ver Todos os Serviços
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f]">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
          <Link to="/" className="hover:text-white">Início</Link>
          <span>/</span>
          <Link to="/servicos" className="hover:text-white">Serviços</Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold">{service.title}</span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-[#d4af37] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar para lista</span>
        </button>
      </div>

      {/* Main Service Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Service Image */}
          <div className="md:col-span-5 relative min-h-[280px] md:min-h-[400px]">
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent md:hidden" />
          </div>

          {/* Service Description & Pricing */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/30">
                  {service.category}
                </span>

                <div className="flex items-center gap-1 text-xs text-[#a1a1aa]">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Duração: {service.duration}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white mb-3">
                {service.title}
              </h1>

              <div className="text-2xl sm:text-3xl font-black text-[#d4af37] mb-6">
                {service.formattedPrice}
              </div>

              <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6">
                {service.fullDesc}
              </p>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#d4af37] mb-3">
                  O que está incluso neste atendimento:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#f4f4f5]">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 border-t border-[#27272a] flex flex-col sm:flex-row gap-3">
              <a
                href={`${BUSINESS_INFO.whatsappUrl}&text=Ol%C3%A1%2C%20quero%20agendar%20o%20servi%C3%A7o%3A%20${encodeURIComponent(service.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 px-6 rounded-xl text-sm font-extrabold bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4 text-[#0f0f0f]" />
                <span>AGENDAR {service.title.toUpperCase()}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <FinalCtaSection />
    </div>
  );
}
