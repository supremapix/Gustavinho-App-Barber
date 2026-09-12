import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, Calendar, ArrowLeft, MessageCircle, User, Tag, ChevronRight } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug } from "../data/blog";
import { BUSINESS_INFO } from "../data/business";
import FinalCtaSection from "../components/FinalCtaSection";

export default function BlogPostView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = getBlogPostBySlug(slug || "");

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Blog Gustavinho do Corte`;

      // Inject Article Schema JSON-LD
      const canonicalUrl = `https://www.barbeiro.curitiba.br/blog/${post.slug}`;
      const schemaData = [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.metaDescription || post.excerpt,
          "image": post.imageUrl,
          "datePublished": "2026-08-01",
          "author": {
            "@type": "Person",
            "name": post.author || "Gustavo"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Gustavinho do Corte",
            "logo": {
              "@type": "ImageObject",
              "url": "https://img.supremasite.com.br/logo-barberaria-cwb.webp"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
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
              "name": "Blog",
              "item": "https://www.barbeiro.curitiba.br/blog"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": post.title,
              "item": canonicalUrl
            }
          ]
        }
      ];

      let scriptTag = document.getElementById("json-ld-article");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "json-ld-article";
        scriptTag.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemaData);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-[70vh] pt-32 pb-16 flex flex-col items-center justify-center text-center px-4 bg-[#0f0f0f]">
        <h1 className="text-2xl font-bold text-white mb-4">Artigo Não Encontrado</h1>
        <p className="text-sm text-[#a1a1aa] mb-6">O artigo procurado não existe ou foi movido.</p>
        <button
          onClick={() => navigate("/blog")}
          className="px-6 py-3 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-bold"
        >
          Voltar para o Blog
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f] text-[#f4f4f5]">
      {/* Header Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
          <Link to="/" className="hover:text-white">Início</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-white">Blog</Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold truncate">{post.title}</span>
        </div>

        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-[#d4af37] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar a todos os artigos</span>
        </button>

        <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/30 inline-block mb-3">
          {post.category}
        </span>

        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[#a1a1aa] pb-6 border-b border-[#27272a]">
          <div className="flex items-center gap-1.5 text-white font-medium">
            <User className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Por {post.author || "Gustavo"} (Barbeiro do CIC)</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{post.readTime}</span>
          </div>
          <span>•</span>
          <div>{post.date}</div>
        </div>
      </div>

      {/* Main Content & Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-2xl overflow-hidden mb-8 max-h-[480px] shadow-2xl border border-[#27272a]">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <article className="bg-[#18181b] border border-[#27272a] p-6 sm:p-10 rounded-2xl text-[#f4f4f5] font-normal text-base sm:text-lg leading-relaxed space-y-6 whitespace-pre-line shadow-xl">
          {post.content}
        </article>

        {/* Internal Navigation Links Box */}
        <div className="mt-8 bg-[#18181b] border border-[#d4af37]/40 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white text-base">Gostou da leitura? Agende seu atendimento</h3>
            <p className="text-xs text-[#a1a1aa]">Atendimento VIP na Rua Desembargador Cid Campelo, 5212 — CIC Curitiba.</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/agendar"
              className="px-5 py-3 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#e5c158] transition-all"
            >
              <Calendar className="w-4 h-4 text-[#0f0f0f]" />
              <span>Agendar no Sistema</span>
            </Link>

            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] text-[#0f0f0f] font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#0f0f0f]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <FinalCtaSection />
    </div>
  );
}
