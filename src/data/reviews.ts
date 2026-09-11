export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  neighborhood: string;
  rating: number;
  date: string;
  comment: string;
}

export const CLIENT_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Matheus Oliveira",
    role: "Cliente Frequente",
    neighborhood: "CIC, Curitiba",
    rating: 5,
    date: "Há 2 semanas",
    comment: "Melhor barbearia da região do CIC. Atendimento nota 1000, degradê sempre perfeito e no horário marcado sem enrolação. Recomendo demais!"
  },
  {
    id: "rev-2",
    author: "Rodrigo Mendes",
    role: "Assinante Plano VIP",
    neighborhood: "Xaxim, Curitiba",
    rating: 5,
    date: "Há 1 mês",
    comment: "A barboterapia com toalha quente é diferenciada. Moro no Xaxim e faço questão de vir no CIC pra cortar com o Gustavinho."
  },
  {
    id: "rev-3",
    author: "Carlos Eduardo Silva",
    role: "Cliente Local",
    neighborhood: "CIC, Curitiba",
    rating: 5,
    date: "Há 3 semanas",
    comment: "Preço justo, ambiente limpo, organizado e som ambiente de primeira. Agendamento pelo WhatsApp funciona super rápido."
  },
  {
    id: "rev-4",
    author: "Lucas Ferreira",
    role: "Cliente Novo",
    neighborhood: "Pinheirinho, Curitiba",
    rating: 5,
    date: "Há 1 mês",
    comment: "Fiz o platinado com ele e ficou sensacional, fios intactos sem queimar o couro. Mão firme na navalha!"
  }
];
