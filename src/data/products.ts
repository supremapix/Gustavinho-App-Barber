export interface ProductItem {
  id: string;
  name: string;
  priceText: string;
  shortDesc: string;
  category: string;
  imageUrl?: string;
}

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: "pomada-modeladora-premium",
    name: "Pomada Modeladora Premium",
    priceText: "A consultar",
    shortDesc: "Alta fixação, efeito matte natural ou brilho clássico. Não resseca e sai facilmente na água.",
    category: "Penteado & Finalização",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "oleo-barba-premium",
    name: "Óleo para Barba Premium",
    priceText: "A consultar",
    shortDesc: "Nutrição intensa, toque sedoso e aroma marcante. Elimina o aspecto espetado e ressecado.",
    category: "Cuidado com a Barba",
    imageUrl: "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "shampoo-fortificante",
    name: "Shampoo Fortificante 300 ml",
    priceText: "A consultar",
    shortDesc: "Limpeza equilibrada, refrescância mentolada e estímulo à saúde do couro cabeludo.",
    category: "Higiene & Cuidado Diário",
    imageUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "balm-barba-60g",
    name: "Balm para Barba 60 g",
    priceText: "A consultar",
    shortDesc: "Hidratação calmante e modelagem suave. Ideal para o pós-barba e proteção diária da pele.",
    category: "Cuidado com a Barba",
    imageUrl: "https://images.unsplash.com/photo-1608248597359-0a56e727f717?q=80&w=800&auto=format&fit=crop"
  }
];
