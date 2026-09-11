import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "../data/blog";
import FinalCtaSection from "../components/FinalCtaSection";
import PageHeroHeader from "../components/PageHeroHeader";

export default function BlogView() {
  return (
    <div className="w-full bg-[#0f0f0f] pb-16">
      <PageHeroHeader
        breadcrumbs={[{ label: "Blog" }]}
        badge="Estilo & Cuidados"
        title="Blog de Estilo Masculino"
        description="Dicas práticas de barbeiro sobre manutenção do corte, visagismo, cuidados com a barba e tendências masculinas em Curitiba."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.slug}
              className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden hover:border-[#d4af37] transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-[#0f0f0f]">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0f0f0f]/80 text-[#d4af37] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] text-[#a1a1aa] mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-[#d4af37] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-[17px] text-[#a1a1aa] line-clamp-3 leading-relaxed mb-4 font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4af37] hover:underline"
                >
                  <span>Ler artigo completo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FinalCtaSection />
    </div>
  );
}
