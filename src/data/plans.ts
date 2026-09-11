export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  period: string;
  shortDesc: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  highlightTag?: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "plano-cabelo",
    name: "Plano Cabelo Livre",
    price: 90,
    formattedPrice: "R$ 90,00",
    period: "/mês",
    shortDesc: "Mantenha o cabelo sempre na régua sem se preocupar com o valor por visita.",
    features: [
      "Cortes masculinos ilimitados no mês",
      "Prioridade de agendamento no WhatsApp",
      "Pezinho de manutenção cortesia",
      "10% de desconto em produtos da barbearia"
    ],
    ctaText: "ASSINAR PLANO CABELO"
  },
  {
    id: "plano-vip",
    name: "Plano VIP Total",
    price: 140,
    formattedPrice: "R$ 140,00",
    period: "/mês",
    shortDesc: "Cabelo e barba alinhados o mês inteiro com custo-benefício máximo.",
    isPopular: true,
    highlightTag: "MAIS COMPLETO",
    features: [
      "Cortes e barbas ilimitados durante todo o mês",
      "Barboterapia completa com toalha quente",
      "Horários prioritários e flexíveis",
      "Sobrancelha inclusa quinzenalmente",
      "15% de desconto em produtos de cuidado"
    ],
    ctaText: "ASSINAR PLANO VIP"
  },
  {
    id: "plano-barba",
    name: "Plano Barba Premium",
    price: 80,
    formattedPrice: "R$ 80,00",
    period: "/mês",
    shortDesc: "Para quem leva a barba a sério e quer o rosto sempre alinhado.",
    features: [
      "Barbas ilimitadas com toalha quente",
      "Hidratação e alinhamento na navalha",
      "Atendimento ágil sem filas",
      "10% de desconto em balms e óleos"
    ],
    ctaText: "ASSINAR PLANO BARBA"
  }
];
