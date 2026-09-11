export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  period: string;
  days: string;
  economy: string;
  shortDesc: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  highlightTag?: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "plano-cabelo-essencial",
    name: "Plano Cabelo Essencial",
    price: 90,
    formattedPrice: "R$ 90",
    period: "/mês",
    days: "Segunda a Quarta",
    economy: "R$ 110",
    shortDesc: "Cortes frequentes no início da semana com máxima economia para você estar sempre alinhado.",
    features: [
      "Atendimento de Segunda a Quarta",
      "Economia calculada de R$ 110/mês",
      "Sem fidelidade • Cancele quando quiser",
      "Agendamento prioritário no WhatsApp",
      "Atendimento VIP no CIC Curitiba"
    ],
    ctaText: "ASSINAR CABELO ESSENCIAL"
  },
  {
    id: "plano-completo-essencial",
    name: "Plano Completo Essencial",
    price: 170,
    formattedPrice: "R$ 170",
    period: "/mês",
    days: "Segunda a Quarta",
    economy: "R$ 150",
    shortDesc: "Cabelo e barba alinhados de segunda a quarta com a maior economia mensal da barbearia.",
    isPopular: true,
    highlightTag: "MAIOR ECONOMIA",
    features: [
      "Cabelo + Barba de Segunda a Quarta",
      "Economia calculada de R$ 150/mês",
      "Toalha quente e barboterapia completa",
      "Sem fidelidade • Cancele quando quiser",
      "Atendimento VIP e exclusivo"
    ],
    ctaText: "ASSINAR COMPLETO ESSENCIAL"
  },
  {
    id: "plano-cabelo-flex",
    name: "Plano Cabelo Flex",
    price: 120,
    formattedPrice: "R$ 120",
    period: "/mês",
    days: "Segunda a Sábado",
    economy: "R$ 80",
    shortDesc: "Liberdade total para cortar o cabelo qualquer dia da semana, inclusive sextas e sábados.",
    features: [
      "Válido de Segunda a Sábado (todos os dias)",
      "Economia calculada de R$ 80/mês",
      "Flexibilidade de horários no CIC",
      "Sem fidelidade • Cancele quando quiser",
      "Atendimento VIP prioritário"
    ],
    ctaText: "ASSINAR CABELO FLEX"
  },
  {
    id: "plano-completo-flex",
    name: "Plano Completo Flex",
    price: 200,
    formattedPrice: "R$ 200",
    period: "/mês",
    days: "Segunda a Sábado",
    economy: "R$ 120",
    shortDesc: "O plano mais completo da barbearia: cabelo e barba com total liberdade de segunda a sábado.",
    isPopular: true,
    highlightTag: "EXPERIÊNCIA TOTAL",
    features: [
      "Cabelo + Barba de Segunda a Sábado",
      "Economia calculada de R$ 120/mês",
      "Barboterapia completa com toalha quente",
      "Sem fidelidade • Cancele quando quiser",
      "Horários prioritários e Atendimento VIP"
    ],
    ctaText: "ASSINAR COMPLETO FLEX"
  }
];
