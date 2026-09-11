export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  formattedPrice: string;
  duration: string;
  shortDesc: string;
  fullDesc: string;
  category: 'cabelo' | 'barba' | 'combo' | 'quimica';
  isPopular?: boolean;
  imageUrl: string;
  benefits: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "corte-masculino",
    slug: "corte-masculino",
    title: "Corte Masculino",
    price: 35,
    formattedPrice: "R$ 35,00",
    duration: "35 min",
    shortDesc: "Visual renovado sem complicação. Tesoura, máquina, degradê e alinhamento perfeito.",
    fullDesc: "Corte de cabelo masculino executado com técnica apurada. Inclui lavagem com shampoo específico, consultoria de visagismo rápida para escolher o melhor estilo (fade, taper, social ou moderno), corte preciso e finalização com pomada de alta fixação.",
    category: "cabelo",
    isPopular: true,
    imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
    benefits: [
      "Consultoria prévia de formato de rosto e estilo",
      "Lavagem higienizante inclusa",
      "Degradê / Fade limpo e disfarçado",
      "Pezinho navalhado e nuca impecável",
      "Finalização com produto premium"
    ]
  },
  {
    id: "barba-completa",
    slug: "barba-completa",
    title: "Barba Completa / Barboterapia",
    price: 30,
    formattedPrice: "R$ 30,00",
    duration: "30 min",
    shortDesc: "Modelagem, toalha quente, alinhamento navalhado e hidratação profunda.",
    fullDesc: "Experiência relaxante de barboterapia. Iniciamos com óleo pré-barba, aplicação de toalha quente aromática para dilatação dos poros, desenho preciso das linhas do rosto na navalha descartável, pós-barba acalmante e balm hidratante.",
    category: "barba",
    isPopular: true,
    imageUrl: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=800&auto=format&fit=crop",
    benefits: [
      "Toalha quente amaciante para barbear sem irritação",
      "Alinhamento milimétrico na navalha",
      "Óleos essenciais e balm revitalizante",
      "Massagem facial relaxante na aplicação"
    ]
  },
  {
    id: "combo-corte-barba",
    slug: "combo-corte-barba",
    title: "Combo Corte + Barba",
    price: 60,
    formattedPrice: "R$ 60,00",
    duration: "60 min",
    shortDesc: "A experiência completa. Corte de cabelo no seu estilo + barboterapia completa.",
    fullDesc: "O pacote VIP indispensável para quem quer sair da barbearia renovado dos pés à cabeça. Economia direta e atendimento contínuo cobrindo todo o visual capilar e facial.",
    category: "combo",
    isPopular: true,
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    benefits: [
      "Corte masculino completo à sua escolha",
      "Barboterapia completa com toalha quente",
      "Economia de R$ 5,00 em relação aos serviços individuais",
      "Finalização completa de barba e cabelo"
    ]
  },
  {
    id: "sobrancelha-navalhada",
    slug: "sobrancelha-navalhada",
    title: "Sobrancelha Navalhada",
    price: 15,
    formattedPrice: "R$ 15,00",
    duration: "15 min",
    shortDesc: "Design e alinhamento preciso respeitando o desenho natural do rosto.",
    fullDesc: "Limpeza de fios sobressalentes e harmonização do olhar. Feito com lâmina afiada e gel de barbear transparente para máxima precisão e higiene.",
    category: "cabelo",
    imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop",
    benefits: [
      "Design masculino natural",
      "Remoção de excesso do centro e arcos",
      "Sem dores de pinça, processo rápido"
    ]
  },
  {
    id: "pezinho-acabamento",
    slug: "pezinho-acabamento",
    title: "Acabamento / Pezinho",
    price: 15,
    formattedPrice: "R$ 15,00",
    duration: "15 min",
    shortDesc: "Manutenção do contorno do cabelo e nuca para manter o corte em dia.",
    fullDesc: "Ideal para o intervalo entre grandes cortes. Alinha o contorno das orelhas, nuca e têmporas mantendo a sensação de corte fresco por mais tempo.",
    category: "cabelo",
    imageUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
    benefits: [
      "Limpeza rápida de nuca e laterais",
      "Desenho limpo na navalha",
      "Economia para manter o visual em dia"
    ]
  },
  {
    id: "platinado-nevou",
    slug: "platinado-nevou",
    title: "Platinado / Nevou",
    price: 120,
    formattedPrice: "R$ 120,00",
    duration: "120 min",
    shortDesc: "Descoloração profissional uniforme sem agredir o couro cabeludo + matização.",
    fullDesc: "Processo técnico de descoloração e matização para atingir o loiro platinado/branco neve perfeito. Utilizamos protetores capilares para preservar a saúde do fio e do couro.",
    category: "quimica",
    imageUrl: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop",
    benefits: [
      "Descoloração profissional com protetor de couro cabeludo",
      "Matização cinza/branco neve sem amarelar",
      "Hidratação profunda pós-química",
      "Orientação de manutenção em casa"
    ]
  },
  {
    id: "pigmentacao",
    slug: "pigmentacao",
    title: "Pigmentação de Barba / Cabelo",
    price: 25,
    formattedPrice: "R$ 25,00",
    duration: "20 min",
    shortDesc: "Correção de falhas e realce de contorno para uma barba ou cabelo mais denso.",
    fullDesc: "Aplicação de pigmento especial temporário para cobrir fios brancos ou preencher falhas na barba e cabelo. Proporciona aspecto mais denso e desenhado.",
    category: "quimica",
    imageUrl: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=800&auto=format&fit=crop",
    benefits: [
      "Disfarce instantâneo de falhas",
      "Efeito degradê mais marcado",
      "Cobre fios brancos com aspecto natural"
    ]
  },
  {
    id: "selagem-botox",
    slug: "selagem-botox",
    title: "Selagem / Botox Capilar",
    price: 70,
    formattedPrice: "R$ 70,00",
    duration: "45 min",
    shortDesc: "Alinhamento dos fios, redução de frizz e facilidade na hora de pentear.",
    fullDesc: "Tratamento de reconstrução e alinhamento. Reduz o volume excessivo, disciplina fios rebeldes e dá brilho sem tirar a masculinidade do penteado.",
    category: "quimica",
    imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
    benefits: [
      "Eliminação total do frizz",
      "Redução controlada de volume",
      "Facilidade para pentear diariamente"
    ]
  }
];
