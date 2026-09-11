import React, { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { MapPin, Navigation, Clock, Calendar, Scissors, Phone, MessageCircle, ChevronRight, CheckCircle2, ShieldCheck, Sparkles, Star } from "lucide-react";
import { getLocalidadeBySlug, getVizinhos, LOCALIDADES_LIST, BairroItem } from "../data/bairros";
import { BUSINESS_INFO } from "../data/business";
import PriceTableSection from "../components/PriceTableSection";
import PlansSection from "../components/PlansSection";
import FinalCtaSection from "../components/FinalCtaSection";
import TransformationShowcase from "../components/TransformationShowcase";

import PageHeroHeader from "../components/PageHeroHeader";

export default function CityLocalSeoView() {
  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();

  // Resolve neighborhood item from URL or fallback to CIC
  const pathSlug = slug || location.pathname.replace(/^\//, "").toLowerCase().replace(/^bairros\//, "");
  const loc: BairroItem = getLocalidadeBySlug(pathSlug) || LOCALIDADES_LIST[0];
  const vizinhos = getVizinhos(loc.slug, 6);

  // Set document title and SEO meta dynamically
  useEffect(() => {
    document.title = `Barbearia no ${loc.name} | Gustavinho do Corte`;

    // Inject JSON-LD Schema
    const canonicalUrl = `https://www.barbeiro.curitiba.br/bairros/${loc.slug}`;

    const schemaData = [
      {
        "@context": "https://schema.org",
        "@type": "HairSalon",
        "@id": `${canonicalUrl}#organization`,
        "name": `Gustavinho do Corte - Barbearia próxima ao ${loc.name}`,
        "alternateName": "Gustavinho do Corte Barbearia",
        "url": canonicalUrl,
        "description": `Barbearia premium a apenas ${loc.distancia} do ${loc.name}, no CIC Curitiba. Corte masculino R$50, barba R$50, progressiva e luzes.`,
        "telephone": "+55-41-99838-4885",
        "email": "gustavinhodocorte00@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rua Desembargador Cid Campelo, 5212",
          "addressLocality": "Curitiba",
          "addressRegion": "PR",
          "postalCode": "81170-220",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": loc.lat || -25.4856,
          "longitude": loc.lng || -49.33098
        },
        "areaServed": [
          {
            "@type": "AdministrativeArea",
            "name": loc.name,
            "geo": { "@type": "GeoCoordinates", "latitude": loc.lat, "longitude": loc.lng }
          },
          {
            "@type": "AdministrativeArea",
            "name": "Cidade Industrial de Curitiba (CIC)"
          }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "19:00"
          }
        ],
        "priceRange": "$$",
        "currenciesAccepted": "BRL",
        "paymentAccepted": "Cash, Credit Card, Debit Card, PIX",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "150",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Início",
            "item": "https://www.barbeiro.curitiba.br"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Bairros",
            "item": "https://www.barbeiro.curitiba.br/bairros"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": loc.name,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Vocês atendem moradores do ${loc.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Sim! Atendemos diariamente clientes do ${loc.name} em nossa sede na Rua Desembargador Cid Campelo, 5212, no CIC Curitiba.`
            }
          },
          {
            "@type": "Question",
            "name": `Qual a distância do ${loc.name} até a barbearia?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `A distância é de apenas aproximadamente ${loc.distancia}, com fácil acesso de carro, transporte público ou aplicativos.`
            }
          },
          {
            "@type": "Question",
            "name": "Quanto custa um corte de cabelo masculino?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O corte masculino completo custa R$ 50,00 com lavagem e acabamento profissional. Oferecemos também combo de Cabelo + Barba por R$ 80,00."
            }
          },
          {
            "@type": "Question",
            "name": "Como agendar meu horário?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Você pode agendar online diretamente no nosso sistema com confirmação imediata ou através do WhatsApp (41) 99838-4885."
            }
          }
        ]
      }
    ];

    let scriptTag = document.getElementById("json-ld-bairro");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "json-ld-bairro";
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [loc]);

  const mapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=-25.4856,-49.33098&origin=${encodeURIComponent(loc.name + ", Curitiba, PR")}`;

  return (
    <div className="w-full bg-[#0f0f0f] text-[#f4f4f5]">
      {/* 1. Breadcrumb & 2. H1 Hero Header */}
      <PageHeroHeader
        breadcrumbs={[
          { label: "Bairros", href: "/bairros" },
          { label: loc.name }
        ]}
        badge={`Atendimento Próximo ao ${loc.name}`}
        title={`Barbearia perto do ${loc.name} — Gustavinho do Corte`}
        description={`Procurando uma barbearia com corte de alta precisão e atendimento pontual perto do ${loc.name}? A Gustavinho do Corte está localizada no CIC, a apenas ${loc.distancia} de distância.`}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Opening Paragraph */}

        {/* 3. Opening Paragraph */}
        <div className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a] text-base text-[#d4d4d8] leading-relaxed mb-8">
          <p className="mb-2">
            Procurando uma barbearia com corte de alta precisão e atendimento pontual perto do <strong>{loc.name}</strong>? A <strong>Gustavinho do Corte</strong> está localizada no bairro vizinho <strong>CIC (Cidade Industrial de Curitiba)</strong>, na <strong>Rua Desembargador Cid Campelo, 5212</strong> — a apenas <strong>{loc.distancia}</strong> de distância.
          </p>
          <p className="text-xs text-[#a1a1aa] font-medium">
            Agendamento garantido pelo nosso sistema online ou direto pelo WhatsApp (41) 99838-4885.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div>
            <Link
              to="/agendar"
              className="px-6 py-4 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-black text-base flex items-center justify-center gap-2.5 shadow-lg hover:bg-[#e5c158] transition-all min-h-[52px] w-full"
            >
              <Calendar className="w-5 h-5 text-[#0f0f0f]" />
              <span>Agendar</span>
            </Link>
            <span className="block text-[9px] text-amber-200/70 font-normal tracking-tight mt-1 text-center">
              reserva online com confirmação
            </span>
          </div>

          <div>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-[#25D366] text-[#0f0f0f] font-extrabold text-base flex items-center justify-center gap-2.5 shadow-lg hover:bg-[#20bd5a] transition-all min-h-[52px] w-full"
            >
              <MessageCircle className="w-5 h-5 text-[#0f0f0f]" />
              <span>WhatsApp</span>
            </a>
            <span className="block text-[9px] text-[#0f0f0f]/80 font-normal tracking-tight mt-1 text-center">
              contato direto (41) 99838-4885
            </span>
          </div>

          <div>
            <a
              href={mapsRouteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-[#27272a] text-white border border-[#3f3f46] hover:border-[#d4af37] font-bold text-base flex items-center justify-center gap-2.5 transition-all min-h-[52px] w-full"
            >
              <Navigation className="w-5 h-5 text-[#d4af37]" />
              <span>Rota</span>
            </a>
            <span className="block text-[9px] text-[#a1a1aa] font-normal tracking-tight mt-1 text-center">
              saindo do {loc.name}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Products Showcase */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#18181b] border border-[#27272a] p-6 sm:p-8 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#d4af37] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Linha de Cosméticos Masculinos
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Produtos Premium Disponíveis na Barbearia
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#0f0f0f] border border-[#27272a]">
              <h3 className="font-bold text-white text-sm mb-1">Pomada Modeladora Premium</h3>
              <p className="text-xs text-[#a1a1aa]">Efeito matte e fixação forte o dia todo.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0f0f0f] border border-[#27272a]">
              <h3 className="font-bold text-white text-sm mb-1">Óleo para Barba Premium</h3>
              <p className="text-xs text-[#a1a1aa]">Nutrição profunda sem deixar a pele oleosa.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0f0f0f] border border-[#27272a]">
              <h3 className="font-bold text-white text-sm mb-1">Shampoo Fortificante 300ml</h3>
              <p className="text-xs text-[#a1a1aa]">Limpeza capilar de alta performance.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0f0f0f] border border-[#27272a]">
              <h3 className="font-bold text-white text-sm mb-1">Balm para Barba 60g</h3>
              <p className="text-xs text-[#a1a1aa]">Alinhamento e maciez para fios rebeldes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Canonical Price Table */}
      <PriceTableSection />

      {/* 6. Differentials */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="bg-[#18181b] border border-[#27272a] p-6 sm:p-8 rounded-2xl">
          <h2 className="text-2xl font-extrabold text-white mb-6">
            Por que moradores do {loc.name} escolhem a Gustavinho do Corte?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white text-sm mb-1">Atendimento Personalizado</h3>
                <p className="text-xs text-[#a1a1aa]">Consultoria de estilo e visagismo antes do corte para clientes do {loc.name}.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white text-sm mb-1">Fácil Acesso pelo CIC</h3>
                <p className="text-xs text-[#a1a1aa]">Apenas {loc.distancia} do {loc.name}, sem congestionamento e com via rápida.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white text-sm mb-1">Estacionamento Gratuito</h3>
                <p className="text-xs text-[#a1a1aa]">Vagas para carros e motos em frente ao estabelecimento com segurança.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white text-sm mb-1">Agendamento Online e WhatsApp</h3>
                <p className="text-xs text-[#a1a1aa]">Escolha seu horário sem filas de espera no sistema ou no WhatsApp.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white text-sm mb-1">Ambiente Climatizado</h3>
                <p className="text-xs text-[#a1a1aa]">Ar condicionado, café expresso fresco e Wi-Fi de alta velocidade.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white text-sm mb-1">Produtos Profissionais</h3>
                <p className="text-xs text-[#a1a1aa]">Uso exclusivo de cosméticos masculinos e lâminas esterilizadas descartáveis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. How to Get There */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#18181b] border border-[#27272a] p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase text-[#d4af37]">Como Chegar</span>
            <h2 className="text-2xl font-bold text-white">Saindo do {loc.name} rumo à barbearia no CIC</h2>
            <p className="text-sm text-[#d4d4d8] max-w-xl">
              Endereço: <strong>Rua Desembargador Cid Campelo, 5212 — Cidade Industrial de Curitiba (CIC)</strong>. Trajeto aproximado: <strong>{loc.distancia}</strong>.
            </p>
          </div>
          <a
            href={mapsRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-black text-sm hover:bg-[#e5c158] transition-all whitespace-nowrap"
          >
            <Navigation className="w-4 h-4 text-[#0f0f0f]" />
            <span>Abrir Rota no GPS</span>
          </a>
        </div>
      </div>

      {/* 8. Transformations / Video Showcase */}
      <TransformationShowcase />

      {/* 9. Local FAQ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <h2 className="text-2xl font-extrabold text-white mb-6">
          Perguntas Frequentes — Atendimento no {loc.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a]">
            <h3 className="font-bold text-white text-base mb-2">Vocês atendem moradores do {loc.name}?</h3>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Com certeza! Atendemos diariamente muitos clientes vindos do {loc.name} em nossa sede no CIC (Rua Desembargador Cid Campelo, 5212).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a]">
            <h3 className="font-bold text-white text-base mb-2">Qual a distância do {loc.name} até a barbearia?</h3>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              A distância estimada é de cerca de {loc.distancia}, permitindo um deslocamento muito rápido tanto de carro quanto de ônibus.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a]">
            <h3 className="font-bold text-white text-base mb-2">Quanto custa um corte de cabelo?</h3>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              O corte masculino custa R$ 50,00 com higienização e acabamento navalhado. O combo Cabelo + Barba sai por R$ 80,00.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#18181b] border border-[#27272a]">
            <h3 className="font-bold text-white text-base mb-2">Como agendar meu horário?</h3>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Você pode agendar pelo sistema online do site com confirmação instantânea ou mandar mensagem direto no WhatsApp (41) 99838-4885.
            </p>
          </div>
        </div>
      </div>

      {/* 10. Internal Links to 6 Neighboring Localities */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-xl font-bold text-white mb-4">
          Outros Bairros e Regiões Próximas Atendidas no CIC
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {vizinhos.map((v) => (
            <Link
              key={v.slug}
              to={`/bairros/${v.slug}`}
              className="p-3 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#d4af37] text-center transition-all group"
            >
              <span className="text-xs font-bold text-white group-hover:text-[#d4af37] block truncate">
                {v.name}
              </span>
              <span className="text-[10px] text-[#a1a1aa]">~{v.distancia}</span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/bairros" className="text-xs font-bold text-[#d4af37] hover:underline inline-flex items-center gap-1">
            <span>Ver todas as 126 localidades de Curitiba</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 11. Subscription Plans */}
      <PlansSection />

      {/* 12. Final CTA Section */}
      <FinalCtaSection />
    </div>
  );
}
