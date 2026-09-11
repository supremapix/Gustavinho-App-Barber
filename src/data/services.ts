export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  formattedPrice: string;
  duration: string;
  shortDesc: string;
  fullDesc: string;
  category: 'cabelo' | 'barba' | 'combo' | 'quimica' | 'cuidado';
  isPopular?: boolean;
  imageUrl: string;
  altText: string;
  benefits: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "corte-masculino",
    slug: "corte-masculino",
    title: "Corte Masculino",
    price: 50,
    formattedPrice: "R$ 50,00",
    duration: "35 min",
    shortDesc: "Corte executado na tesoura e máquina com degradê preciso, fade alinhado e acabamento impecável.",
    fullDesc: "Corte de cabelo masculino com técnica apurada e visagismo. Inclui higienização, consultoria de estilo no CIC, corte detalhado e finalização de alto padrão.",
    category: "cabelo",
    isPopular: true,
    imageUrl: "https://img.supremasite.com.br/gusta/01-servico-corte-masculino.jpg",
    altText: "Imagem ilustrativa de corte masculino com degradê e topo texturizado.",
    benefits: [
      "Consultoria de visagismo masculino",
      "Degradê / Fade de alta precisão",
      "Pezinho e contorno navalhado",
      "Finalização com produto premium"
    ]
  },
  {
    id: "cabelo-e-barba",
    slug: "cabelo-e-barba",
    title: "Cabelo + Barba",
    price: 80,
    formattedPrice: "R$ 80,00",
    duration: "60 min",
    shortDesc: "Combo completo: corte de cabelo masculino no seu estilo e alinhamento de barba.",
    fullDesc: "O pacote mais procurado. Renove completamente o visual com corte personalizado e barba modelada com toalha quente e navalha descartável.",
    category: "combo",
    isPopular: true,
    imageUrl: "https://img.supremasite.com.br/gusta/02-servico-cabelo-e-barba.jpg",
    altText: "Imagem ilustrativa de cabelo com degradê e barba alinhada.",
    benefits: [
      "Corte masculino completo à sua escolha",
      "Barboterapia completa com toalha quente",
      "Economia direta no combo",
      "Finalização capilar e facial completa"
    ]
  },
  {
    id: "barba-completa",
    slug: "barba-completa",
    title: "Barba Completa",
    price: 50,
    formattedPrice: "R$ 50,00",
    duration: "35 min",
    shortDesc: "Desenho e alinhamento na navalha, toalha quente relaxante, óleos essenciais e balm hidratante.",
    fullDesc: "Experiência tradicional de barboterapia. Toalha quente para abrir os poros e amaciar os pelos, lâmina descartável para linhas perfeitas e pós-barba refrescante.",
    category: "barba",
    isPopular: true,
    imageUrl: "https://img.supremasite.com.br/gusta/03-servico-barba-completa.jpg",
    altText: "Imagem ilustrativa de barboterapia com toalha e barba bem cuidada.",
    benefits: [
      "Toalha quente relaxante amaciante",
      "Desenho preciso na navalha descartável",
      "Hidratação com óleo e balm",
      "Pós-barba calmante sem irritação"
    ]
  },
  {
    id: "design-sobrancelha",
    slug: "design-de-sobrancelha",
    title: "Design de Sobrancelha",
    price: 15,
    formattedPrice: "R$ 15,00",
    duration: "15 min",
    shortDesc: "Alinhamento e limpeza precisa respeitando o formato masculino natural do olhar.",
    fullDesc: "Remoção de pelos sobressalentes e harmonização do olhar masculino feita com rapidez e precisão na lâmina descartável.",
    category: "cuidado",
    imageUrl: "https://img.supremasite.com.br/gusta/04-servico-sobrancelha.jpg",
    altText: "Imagem ilustrativa de sobrancelha masculina com acabamento natural.",
    benefits: [
      "Design masculino natural",
      "Limpeza rápida entre as sobrancelhas",
      "Harmonização do rosto"
    ]
  },
  {
    id: "depilacao-nariz",
    slug: "depilacao-de-nariz",
    title: "Depilação de Nariz",
    price: 25,
    formattedPrice: "R$ 25,00",
    duration: "15 min",
    shortDesc: "Remoção higiênica e rápida dos pelos nasais com cera morna hipoalergênica.",
    fullDesc: "Procedimento seguro e rápido que retira os pelos visíveis do nariz com conforto e máxima higiene, garantindo respiração livre e visual limpo.",
    category: "cuidado",
    imageUrl: "https://img.supremasite.com.br/gusta/04-servico-sobrancelha.jpg",
    altText: "Procedimento de cuidado facial masculino.",
    benefits: [
      "Cera morna hipoalergênica",
      "Procedimento rápido e indolor",
      "Higiene e visual impecável"
    ]
  },
  {
    id: "depilacao-ouvido",
    slug: "depilacao-de-ouvido",
    title: "Depilação de Ouvido",
    price: 25,
    formattedPrice: "R$ 25,00",
    duration: "15 min",
    shortDesc: "Limpeza precisa dos pelos das orelhas e canal auricular externo com cera morna.",
    fullDesc: "Elimina pelos incômodos nas orelhas de forma higiênica e duradoura com produto específico e aplicação cuidadosa.",
    category: "cuidado",
    imageUrl: "https://img.supremasite.com.br/gusta/04-servico-sobrancelha.jpg",
    altText: "Procedimento de cuidado facial masculino.",
    benefits: [
      "Aplicação cuidadosa e segura",
      "Eliminação completa dos pelos visíveis",
      "Duração de várias semanas"
    ]
  },
  {
    id: "hidratacao-capilar",
    slug: "hidratacao-capilar",
    title: "Hidratação Capilar",
    price: 35,
    formattedPrice: "R$ 35,00",
    duration: "25 min",
    shortDesc: "Recuperação do brilho, maciez e vitalidade dos fios com máscara nutritiva profissional.",
    fullDesc: "Tratamento de nutrição intensa para cabelos secos ou danificados pelo sol e poluição. Devolve maciez, brilho e maleabilidade.",
    category: "cabelo",
    imageUrl: "https://img.supremasite.com.br/gusta/01-servico-corte-masculino.jpg",
    altText: "Tratamento e hidratação capilar masculina.",
    benefits: [
      "Máscara nutritiva profissional",
      "Redução de ressecamento e opacidade",
      "Couro cabeludo revigorado"
    ]
  },
  {
    id: "limpeza-de-pele",
    slug: "limpeza-de-pele",
    title: "Limpeza de Pele",
    price: 35,
    formattedPrice: "R$ 35,00",
    duration: "30 min",
    shortDesc: "Esfoliação facial, remoção de impurezas e oleosidade excessiva com máscara purificante.",
    fullDesc: "Cuidado facial masculino que renova a pele, desobstrui poros e remove células mortas, deixando o rosto revigorado e hidratado.",
    category: "cuidado",
    imageUrl: "https://img.supremasite.com.br/gusta/03-servico-barba-completa.jpg",
    altText: "Limpeza de pele e barboterapia masculina.",
    benefits: [
      "Esfoliação e máscara purificante",
      "Controle de oleosidade e brilho excessivo",
      "Pele renovada e descansada"
    ]
  },
  {
    id: "hidratacao-de-barba",
    slug: "hidratacao-de-barba",
    title: "Hidratação de Barba",
    price: 35,
    formattedPrice: "R$ 35,00",
    duration: "20 min",
    shortDesc: "Tratamento profundo para fios ásperos ou ressecados, proporcionando maciez e alinhamento.",
    fullDesc: "Nutrição específica para os fios da barba com produtos de alta absorção. Evita coceiras, pontas duplas e fios espetados.",
    category: "barba",
    imageUrl: "https://img.supremasite.com.br/gusta/03-servico-barba-completa.jpg",
    altText: "Hidratação e alinhamento de barba.",
    benefits: [
      "Nutrição profunda dos fios da barba",
      "Toque macio e sedoso",
      "Elimina coceira e ressecamento"
    ]
  },
  {
    id: "selagem",
    slug: "selagem",
    title: "Selagem",
    price: 80,
    formattedPrice: "R$ 80,00",
    duration: "50 min",
    shortDesc: "Redução de volume e frizz, alinhando os fios com aspecto natural e fácil manutenção.",
    fullDesc: "Procedimento que alinha a estrutura dos fios, fecha as cutículas capilares e elimina o frizz sem perder a naturalidade do corte masculino.",
    category: "quimica",
    imageUrl: "https://img.supremasite.com.br/gusta/01-servico-corte-masculino.jpg",
    altText: "Selagem e alinhamento capilar masculino.",
    benefits: [
      "Redução controlada de volume",
      "Eliminação do frizz diário",
      "Praticidade total ao pentear"
    ]
  },
  {
    id: "luzes",
    slug: "luzes",
    title: "Luzes",
    price: 100,
    formattedPrice: "R$ 100,00",
    duration: "90 min",
    shortDesc: "Mechas e reflexos com descoloração controlada na touca ou pente para efeito luminoso.",
    fullDesc: "Clareamento uniforme em mechas distribuídas estrategicamente para criar destaque e modernidade no corte com produtos que protegem os fios.",
    category: "quimica",
    imageUrl: "https://img.supremasite.com.br/gusta/07-galeria-platinado-nevou.jpg",
    altText: "Luzes e reflexos em cabelo masculino.",
    benefits: [
      "Descoloração profissional dosada",
      "Matização para evitar tons amarelados",
      "Realce e destaque do corte"
    ]
  },
  {
    id: "progressiva",
    slug: "progressiva",
    title: "Progressiva",
    price: 120,
    formattedPrice: "R$ 120,00",
    duration: "90 min",
    shortDesc: "Alisamento duradouro e disciplina dos fios com brilho e maleabilidade.",
    fullDesc: "Tratamento de alisamento capilar masculino com fórmula moderna que sela a fibra capilar, elimina ondas rebeldes e dura semanas.",
    category: "quimica",
    imageUrl: "https://img.supremasite.com.br/gusta/01-servico-corte-masculino.jpg",
    altText: "Progressiva e alisamento capilar masculino.",
    benefits: [
      "Alisamento duradouro e uniforme",
      "Facilidade ao lavar e secar",
      "Brilho e maciez intensa"
    ]
  },
  {
    id: "platinado",
    slug: "platinado",
    title: "Platinado",
    price: 120,
    formattedPrice: "R$ 120,00",
    duration: "120 min",
    shortDesc: "Descoloração profissional uniforme (Nevou) com matização prata/branco neve de respeito.",
    fullDesc: "Processo técnico de descoloração e matização para atingir o loiro platinado ou branco neve perfeito. Utilizamos protetor capilar e hidratação para manter a saúde dos fios.",
    category: "quimica",
    imageUrl: "https://img.supremasite.com.br/gusta/07-galeria-platinado-nevou.jpg",
    altText: "Inspiração de cabelo platinado com laterais em degradê.",
    benefits: [
      "Nevou perfeito e uniforme",
      "Matização cinza/branco sem amarelo",
      "Proteção e hidratação pós-química"
    ]
  }
];
