export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  imageUrl: string;
  keywords: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "planos-mensais-barbearia",
    title: "Planos Mensais de Barbearia: Economize até R$ 150 por Mês",
    metaTitle: "Planos Mensais de Barbearia no CIC | Gustavinho do Corte",
    metaDescription: "Descubra como os planos mensais de assinatura da barbearia Gustavinho do Corte no CIC garantem cabelo e barba sempre em dia com grande economia.",
    excerpt: "Como a assinatura mensal de cabelo e barba compensa financeiramente e garante visual impecável o mês todo.",
    category: "Planos & Economia",
    readTime: "4 min de leitura",
    date: "10 de Setembro de 2026",
    author: "Gustavo",
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    keywords: ["plano mensal barbearia", "assinatura barbearia cic", "corte ilimitado curitiba"],
    content: `Manter o corte de cabelo alinhado e a barba bem cuidada exige visitas frequentes à barbearia. Para quem gosta de andar sempre com o visual em dia, os custos avulsos podem pesar. É por isso que o clube de assinatura da **Gustavinho do Corte no CIC Curitiba** tornou-se a opção favorita dos nossos clientes.

### Como Funcionam os Planos Mensais?
Com uma mensalidade fixa e sem taxa de adesão ou fidelidade, você pode cortar o cabelo e/ou alinhar a barba quantas vezes precisar no mês:
- **Plano Cabelo Livre (R$ 90/mês)**: Cortes masculinos ilimitados no mês.
- **Plano Barba Premium (R$ 80/mês)**: Barba completa com toalha quente e navalha quantas vezes quiser.
- **Plano VIP Total (R$ 140/mês)**: Cabelo e barba ilimitados com prioridade de agendamento.

### Vantagens do Clube de Assinatura
1. **Economia Real**: Quem corta o cabelo a cada 10 dias economizaria mais de R$ 150 no mês em relação aos valores avulsos.
2. **Praticidade**: Agendamento rápido online ou pelo WhatsApp sem complicações.
3. **Sem Contrato Abusivo**: Cancele ou pause quando desejar, sem multas.

Agende seu primeiro atendimento na barbearia Gustavinho do Corte na Rua Desembargador Cid Campelo, 5212 - CIC.`
  },
  {
    slug: "progressiva-vs-selagem",
    title: "Progressiva vs Selagem: Qual Escolher para Seu Cabelo?",
    metaTitle: "Progressiva vs Selagem Masculina | Gustavinho do Corte CIC",
    metaDescription: "Entenda as diferenças entre progressiva e selagem masculina, duração, indicações e qual o melhor tratamento para seu cabelo no CIC Curitiba.",
    excerpt: "Diferenças fundamentais, durabilidade e indicação exata para alinhar, reduzir volume ou alisar os fios masculinos.",
    category: "Química Capilar",
    readTime: "5 min de leitura",
    date: "05 de Setembro de 2026",
    author: "Gustavo",
    imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
    keywords: ["progressiva masculina curitiba", "selagem masculina cic", "alisamento masculino"],
    content: `Muito homens buscam tratamentos químicos para controlar o volume, eliminar o frizz ou alisar os cabelos, mas ficam na dúvida entre a **Progressiva** e a **Selagem**. Ambos os procedimentos são oferecidos na Gustavinho do Corte no CIC.

### 1. Selagem Capilar (R$ 80,00)
- **Foco**: Reconstrução, disciplina e redução moderada de volume.
- **Indicação**: Ideal para cabelos ondulados, ressecados ou com frizz que precisam de brilho e alinhamento natural.
- **Duração**: De 30 a 45 dias.

### 2. Progressiva Masculina (R$ 120,00)
- **Foco**: Alisamento intenso e redução drástica de volume.
- **Indicação**: Ideal para quem busca fios totalmente lisos, práticos para pentear no dia a dia.
- **Duração**: De 60 a 90 dias (conforme o crescimento da raiz).

Consulte o barbeiro Gustavo no CIC para uma avaliação capilar gratuita e escolha o procedimento ideal.`
  },
  {
    slug: "luzes-platinado-guia-completo",
    title: "Luzes e Platinado Masculino: Guia Completo",
    metaTitle: "Luzes e Platinado Masculino no CIC | Gustavinho do Corte",
    metaDescription: "Guia completo sobre luzes masculinas, platinado nevou, descoloração segura e manutenção do tom na barbearia Gustavinho do Corte em Curitiba.",
    excerpt: "Tudo o que você precisa saber sobre nevou, luzes no topo, matização e hidratação pós-descoloração.",
    category: "Platinado & Cor",
    readTime: "6 min de leitura",
    date: "01 de Setembro de 2026",
    author: "Gustavo",
    imageUrl: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop",
    keywords: ["luzes cabelo masculino", "platinado masculino curitiba", "nevou cic"],
    content: `As luzes e o estilo platinado (o famoso *nevou*) continuam em alta no visual masculino curitibano. No entanto, descolorir o cabelo exige técnicas corretas para preservar o couro cabeludo e os fios.

### Luzes Masculinas (R$ 100,00)
As luzes na touca ou no papel criam pontos de iluminação e contraste no topo do cabelo, trazendo estilo sem mudar radicalmente a cor base.

### Platinado Global / Nevou (R$ 120,00)
O platinado total exige descoloração homogênea até o fundo de clareamento correto, seguida de matização com pigmentos prateados ou perolados.

### Cuidados Pós-Química
- Use shampoo matizador 1x por semana para evitar o amarelado.
- Faça hidratação semanal para repor a água e os nutrientes dos fios.
- Evite lavagens diárias com água fervendo.`
  },
  {
    slug: "hidratacao-capilar-masculina",
    title: "Hidratação Capilar Masculina: Por Que Você Precisa Fazer",
    metaTitle: "Hidratação Capilar Masculina no CIC | Gustavinho do Corte",
    metaDescription: "Aprenda por que a hidratação capilar masculina é essencial contra o ressecamento do clima de Curitiba e como revitalizar seus fios.",
    excerpt: "Por que condicionador não basta e como a hidratação profissional previne ressecamento e caspa.",
    category: "Tratamentos",
    readTime: "3 min de leitura",
    date: "25 de Agosto de 2026",
    author: "Gustavo",
    imageUrl: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=800&auto=format&fit=crop",
    keywords: ["hidratacao capilar masculina", "cuidado cabelo homem cic"],
    content: `Muitos homens acreditam que apenas o shampoo é suficiente no banho. No entanto, o clima frio e instável de Curitiba resseca os fios e o couro cabeludo, deixando o cabelo sem vida e opaco.

### Benefícios da Hidratação Profissional (R$ 35,00)
- Repõe a umidade natural do cabelo.
- Controla a oleosidade excessiva reativa.
- Deixa os fios macios e fáceis de pentear.
- Previne pontas secas e quebra.

Agende sua hidratação junto com o corte na Gustavinho do Corte no CIC.`
  },
  {
    slug: "como-manter-barba-saudavel",
    title: "Como Manter sua Barba Sempre Saudável e Bonita",
    metaTitle: "Como cuidar da barba no dia a dia | Gustavinho do Corte CIC",
    metaDescription: "Dicas essenciais para cuidar da barba em casa: higiene, uso de balms e óleos, e o ritual da barboterapia no CIC Curitiba.",
    excerpt: "Rotina simples para alinhar fios rebeldes, acabar com a coceira e manter a barba cheia e macia.",
    category: "Barba",
    readTime: "4 min de leitura",
    date: "18 de Agosto de 2026",
    author: "Gustavo",
    imageUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop",
    keywords: ["como cuidar da barba", "barboterapia cic", "barba alinhada curitiba"],
    content: `Uma barba bonita e imponente exige cuidados diários. Confira os passos fundamentais recomendados pelo barbeiro Gustavo:

1. **Lave com shampoo específico para barba**: Evite sabonete de corpo no rosto.
2. **Hidrate com balm ou óleo diário**: O balm alinha e dá volume; o óleo nutre os fios da raiz às pontas.
3. **Escove diariamente**: Ajuda a alinhar o crescimento e estimula a circulação local.
4. **Alinhe os contornos semanalmente**: Mantenha as bochechas e o pescoço limpos na navalha.

Visite a barbearia no CIC para o serviço completo de Cabelo + Barba (R$ 80,00).`
  },
  {
    slug: "cortes-masculinos-tendencia-2024",
    title: "Os Cortes Masculinos que Estão em Alta",
    metaTitle: "Tendências de Cortes Masculinos | Gustavinho do Corte CIC",
    metaDescription: "Conheça os cortes masculinos mais pedidos no CIC Curitiba: Mid Fade, Taper Fade, Buzz Cut e Americano.",
    excerpt: "Análise dos cortes modernos mais solicitados: degradê baixo, americano, mullets modernos e textura no topo.",
    category: "Tendências",
    readTime: "5 min de leitura",
    date: "12 de Agosto de 2026",
    author: "Gustavo",
    imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop",
    keywords: ["cortes masculinos tendencia", "corte americano cic", "taper fade curitiba"],
    content: `O visual masculino evoluiu e novos estilos ganharam destaque nas barbearias de Curitiba:

- **Taper Fade**: Acabamento sutil apenas na nuca e nas têmporas, preservando o volume lateral.
- **Corte Americano**: Degradê bem marcado e limpo nas laterais com topo levemente estilizado.
- **Mid / High Fade**: O clássico degradê médio ou alto, perfeito para quem gosta de contorno bem desenhado.
- **Social Moderno**: Tesoura no topo com acabamento limpo na máquina para ambientes de trabalho formais.

Escolha seu estilo e agende seu horário na Gustavinho do Corte no CIC.`
  },
  {
    slug: "cuidados-cabelo-masculino",
    title: "Rotina de Cuidados com o Cabelo Masculino",
    metaTitle: "Rotina de Cuidados com Cabelo Masculino | Gustavinho do Corte",
    metaDescription: "Passo a passo simples para manter o cabelo masculino forte, limpo e bem estilizado sem perder tempo.",
    excerpt: "Guia prático para higienização, escolha da pomada certa e manutenção do couro cabeludo.",
    category: "Cabelo & Estilo",
    readTime: "4 min de leitura",
    date: "08 de Agosto de 2026",
    author: "Gustavo",
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    keywords: ["rotina cabelo masculino", "cuidados cabelo homem"],
    content: `Criar hábitos diários de cuidado capilar garante que seu corte dure muito mais e seu cabelo permaneça saudável.

- Use shampoo adequado ao seu tipo de couro cabeludo (oleoso, seco ou normal).
- Aplique pomada matte para efeito natural ou pomada teia para penteados estruturados.
- Nunca durma com cabelo molhado para evitar fungos e caspa.`
  },
  {
    slug: "produtos-essenciais-barbearia",
    title: "Produtos Essenciais para Ter em Casa",
    metaTitle: "Produtos de Barbearia Essenciais em Casa | Gustavinho do Corte",
    metaDescription: "Descubra quais pomadas, óleos e balms masculinos você deve ter no seu armário para manter o visual do dia a dia.",
    excerpt: "O kit básico de grooming masculino para manter o acabamento de barbearia todos os dias.",
    category: "Produtos",
    readTime: "3 min de leitura",
    date: "01 de Agosto de 2026",
    author: "Gustavo",
    imageUrl: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=800&auto=format&fit=crop",
    keywords: ["produtos barbearia casa", "pomada modeladora masculina"],
    content: `Para manter o visual impecável entre uma visita e outra à barbearia, tenha em mãos:
1. **Pomada Modeladora Matte**: Fixação forte sem brilho excessivo.
2. **Óleo para Barba**: Garante maciez e perfume agradável.
3. **Balm Modelador**: Modela fios espetados na barba.
4. **Shampoo Fortificante**: Limpa e fortalece os fios.`
  },
  {
    slug: "como-escolher-corte-ideal",
    title: "Como Escolher o Corte Ideal para Seu Rosto",
    metaTitle: "Como escolher o corte para seu rosto | Gustavinho do Corte",
    metaDescription: "Aprenda princípios de visagismo para identificar o formato do seu rosto e escolher o corte de cabelo e barba perfeitos.",
    excerpt: "Formatos de rosto quadrado, redondo, oval e triangular x o estilo de corte ideal.",
    category: "Visagismo",
    readTime: "5 min de leitura",
    date: "25 de Julho de 2026",
    author: "Gustavo",
    imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop",
    keywords: ["corte para cada tipo de rosto", "visagismo masculino cic"],
    content: `O visagismo estuda as proporções faciais para indicar o corte e barba que mais valorizam o homem:
- **Rosto Redondo**: Prefira cortes com volume no topo e laterais baixas (fade) para alongar a face.
- **Rosto Quadrado**: Combina com quase todos os estilos, em especial faders marcados e barba quadrada.
- **Rosto Oval**: Formato muito versátil que permite degradês altos ou cabelos médios desfiados.`
  },
  {
    slug: "dicas-crescer-barba",
    title: "Dicas para Crescer uma Barba Cheia e Uniforme",
    metaTitle: "Como fazer a barba crescer cheia | Gustavinho do Corte CIC",
    metaDescription: "Dicas comprovadas de alimentação, higiene, massagem e produtos para acelerar o crescimento de uma barba volumosa.",
    excerpt: "Como superar a fase de coceira e falhas para ostentar uma barba respeitável.",
    category: "Barba",
    readTime: "4 min de leitura",
    date: "20 de Julho de 2026",
    author: "Gustavo",
    imageUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop",
    keywords: ["como crescer a barba", "barba cheia cic"],
    content: `Para quem deseja ostentar uma barba volumosa e sem falhas, paciência e cuidados são indispensáveis:
- Deixe a barba crescer por pelo menos 4 a 6 semanas antes do primeiro desenho.
- Use óleo diariamente para hidratar a pele abaixo dos fios.
- Faça o desenho dos contornos na barbearia para não afinar a barba por engano.`
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
