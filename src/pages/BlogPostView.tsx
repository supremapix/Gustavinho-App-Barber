import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, Calendar, ArrowLeft, MessageCircle } from "lucide-react";
import { BLOG_POSTS } from "../data/blog";
import { BUSINESS_INFO } from "../data/business";
import FinalCtaSection from "../components/FinalCtaSection";

export default function BlogPostView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[70vh] pt-32 pb-16 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-white mb-4">Artigo Não Encontrado</h1>
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
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
          <Link to="/" className="hover:text-white">Início</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-white">Blog</Link>
          <span>/</span>
          <span className="text-[#d4af37] font-semibold">{post.title}</span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-[#d4af37] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Blog</span>
        </button>

        <span className="text-xs uppercase font-extrabold tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/30 inline-block mb-3">
          {post.category}
        </span>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-[#a1a1aa] pb-6 border-b border-[#27272a]">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{post.readTime}</span>
          </div>
          <span>•</span>
          <div>{post.date}</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-2xl overflow-hidden mb-8 max-h-[450px]">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-[#18181b] border border-[#27272a] p-6 sm:p-10 rounded-2xl text-[#f4f4f5] leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base">
          {post.content}
        </div>
      </div>

      <FinalCtaSection />
    </div>
  );
}
