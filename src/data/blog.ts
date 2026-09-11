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
  imageUrl: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "como-manter-corte-degrade-mais-tempo",
    title: "Como manter o corte degradê em dia por mais tempo",
    metaTitle: "Como manter o degradê por mais tempo | Blog Gustavinho do Corte",
    metaDescription: "Dicas práticas do barbeiro para preservar a nitidez e o acabamento do seu corte degradê entre as visitas à barbearia.",
    excerpt: "Dicas práticas para manter o disfarçado limpo e a nuca em dia sem estragar o formato do cabelo.",
    category: "Cabelo & Estilo",
    readTime: "3 min de leitura",
    date: "02 de Setembro de 2026",
    imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
    content: `O corte degradê (fade) é um dos mais solicitados na barbearia Gustavinho do Corte no CIC. Mas para manter o tom disfarçado e bem marcado no dia a dia, alguns cuidados fazem toda a diferença:

1. **Lave o cabelo com água morna a fria**: A água muito quente resseca o couro cabeludo e estimula a oleosidade excessiva nas raizes.
2. **Use pomada de efeito opaco (matte)**: Para quem usa fade, pomadas sem brilho valorizam a transição da sombra do cabelo.
3. **Faça o pezinho de manutenção**: Fazer o acabamento na nuca e orelhas a cada 15 dias mantém a impressão de corte novo sem precisar refazer todo o degradê.
4. **Agende seu retorno com antecedência**: O intervalo ideal para manter o degradê impecável é de 15 a 20 dias.`
  },
  {
    slug: "cuidados-com-a-barba-no-inverno-curitibano",
    title: "Cuidados essenciais com a barba no inverno de Curitiba",
    metaTitle: "Cuidados com a barba no inverno de Curitiba | Gustavinho do Corte",
    metaDescription: "Saiba como proteger sua barba do frio e do vento de Curitiba usando óleos, balms e toalha quente na barboterapia.",
    excerpt: "O frio de Curitiba resseca os fios e a pele do rosto. Veja como prevenir caspa na barba e fios quebradiços.",
    category: "Barba",
    readTime: "4 min de leitura",
    date: "28 de Agosto de 2026",
    imageUrl: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=800&auto=format&fit=crop",
    content: `Quem mora em Curitiba sabe que o inverno traz temperaturas baixas e vento seco, o que afeta diretamente a saúde dos fios da barba.

- **Use shampoo específico para barba**: Shampoos convencionais retiram a hidratação natural da pele do rosto.
- **Aplique óleo para barba diariamente**: 2 a 3 gotas de óleo de argan ou jojoba massageadas até a raiz evitam a coceira e o ressecamento.
- **Faça barboterapia com toalha quente**: Além de relaxar, a toalha quente abre os poros e melhora a absorção de nutrientes.
- **Evite secador em temperatura máxima**: O calor excessivo enfraquece os fios faciais.`
  },
  {
    slug: "melhor-corte-para-cada-tipo-de-rosto",
    title: "Qual o melhor corte para o seu formato de rosto?",
    metaTitle: "Visagismo Masculino: O corte ideal para cada rosto | Gustavinho do Corte",
    metaDescription: "Guia prático de visagismo masculino no CIC Curitiba. Descubra qual estilo de cabelo e barba valoriza os traços do seu rosto.",
    excerpt: "Descubra como o visagismo masculino harmoniza traços marcantes, suaviza ângulos e destaca seus pontos fortes.",
    category: "Visagismo",
    readTime: "5 min de leitura",
    date: "15 de Agosto de 2026",
    imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop",
    content: `Na barbearia Gustavinho do Corte no CIC, não fazemos apenas cortes de catálogo: analisamos o formato da sua estrutura óssea e estilo de vida.

- **Rosto Redondo**: Cortes com volume no topo (pompador, quiff) e laterais mais baixas (degradê alto) alongam o rosto.
- **Rosto Quadrado**: Linhas bem marcadas e maxilar em evidência combinam com degradê médio e barba quadrada.
- **Rosto Oval**: Formato versátil que aceita quase todos os estilos, desde o buzz cut até cabelos mais longos.
- **Rosto Triangular**: Volume equilibrado nas têmporas e barba cheia ajudam a harmonizar o queixo.`
  }
];
