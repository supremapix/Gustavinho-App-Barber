export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Quem é Gustavinho do Corte e onde fica a barbearia?",
    answer: "Gustavinho do Corte é uma barbearia profissional de referência no bairro CIC em Curitiba - PR, localizada na Rua Desembargador Cid Campelo, 5212. Oferece cortes masculinos, barboterapia, platinado e planos de assinatura."
  },
  {
    question: "Qual é o valor do corte de cabelo e da barba?",
    answer: "O corte masculino individual custa R$ 35,00. A barba completa / barboterapia custa R$ 30,00. O combo promocional Corte + Barba sai por R$ 60,00."
  },
  {
    question: "Qual o horário de funcionamento da barbearia? Atende sábado?",
    answer: "Sim! A barbearia funciona de segunda a sábado, das 09:00 às 19:00. Não abre aos domingos."
  },
  {
    question: "Como faço para agendar um horário?",
    answer: "O agendamento é feito de forma rápida e direta pelo WhatsApp (41) 99838-4885. Basta clicar em qualquer botão 'AGENDAR HORÁRIO' no site para abrir a conversa instantaneamente."
  },
  {
    question: "Quais serviços a barbearia oferece?",
    answer: "Oferecemos Corte Masculino (R$ 35), Barba Completa/Barboterapia (R$ 30), Combo Corte + Barba (R$ 60), Sobrancelha Navalhada (R$ 15), Acabamento/Pezinho (R$ 15), Platinado/Nevou (R$ 120), Pigmentação (R$ 25) e Selagem/Botox Capilar (R$ 70)."
  },
  {
    question: "Como funcionam os planos mensais de assinatura?",
    answer: "Com os planos mensais você paga um valor fixo por mês (Plano Cabelo R$ 90/mês, Plano Barba R$ 80/mês ou Plano VIP Total R$ 140/mês) e tem direito a cortes e/or barbas ilimitados durante todo o mês, além de atendimento prioritário."
  },
  {
    question: "Como chegar na barbearia no CIC?",
    answer: "Estamos situados na Rua Desembargador Cid Campelo, 5212 no CIC. É fácil chegar de carro via Linha Verde, Juscelino Kubitschek ou João Bettega, além de fácil acesso por ônibus vindos dos terminais do CIC, Capão Raso e Pinheirinho."
  },
  {
    question: "Aceita cartão de crédito, débito e PIX?",
    answer: "Sim, aceitamos PIX, cartões de débito, cartões de crédito e dinheiro."
  }
];
