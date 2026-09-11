export interface BairroSEO {
  slug: string;
  name: string;
  heroTitle: string;
  metaTitle: string;
  metaDescription: string;
  distanceInfo: string;
  estimatedDriveTime: string;
  busRoutes: string;
  description: string;
  keywords: string[];
}

export const BAIRROS_DATA: Record<string, BairroSEO> = {
  "barbearia-no-cic": {
    slug: "barbearia-no-cic",
    name: "CIC (Cidade Industrial de Curitiba)",
    heroTitle: "Sua Barbearia no CIC em Curitiba",
    metaTitle: "Barbearia no CIC Curitiba | Gustavinho do Corte",
    metaDescription: "Procurando barbearia no CIC em Curitiba? Gustavinho do Corte oferece corte masculino, barba alinhada e atendimento de excelência na Rua Des. Cid Campelo.",
    distanceInfo: "Localização central no próprio bairro CIC",
    estimatedDriveTime: "A poucos minutos da sua casa ou trabalho no CIC",
    busRoutes: "Próximo a pontos de ônibus das linhas CIC / Cabral, Interbairros e alimentadores da região",
    description: "Atendemos moradores e trabalhadores da Cidade Industrial de Curitiba com máxima pontualidade, instalações confortáveis e serviços de alta precisão em corte e barba.",
    keywords: ["barbearia no cic", "barbeiro no cic curitiba", "corte masculino cic", "cabelo e barba cic"]
  },
  "barbearia-no-xaxim": {
    slug: "barbearia-no-xaxim",
    name: "Xaxim",
    heroTitle: "Barbearia para quem está no Xaxim",
    metaTitle: "Barbearia perto do Xaxim Curitiba | Gustavinho do Corte",
    metaDescription: "Mora no Xaxim e busca uma barbearia com atendimento de excelência? O Gustavinho do Corte fica no vizinho bairro CIC com fácil acesso.",
    distanceInfo: "Localizado no CIC, a poucos minutos do bairro Xaxim",
    estimatedDriveTime: "Aproximadamente 8 a 12 minutos de carro via R. Cid Campelo ou Juscelino Kubitschek",
    busRoutes: "Acesso rápido pelas linhas alimentadoras que conectam os terminais do Capão Raso e Pinheirinho",
    description: "Gustavinho do Corte está localizado no CIC e recebe diariamente clientes do bairro Xaxim que buscam corte masculino de alta precisão, barboterapia relaxante e ambiente exclusivo.",
    keywords: ["barbearia perto do xaxim", "barbeiro xaxim curitiba", "corte masculino perto do xaxim"]
  },
  "barbearia-no-pinheirinho": {
    slug: "barbearia-no-pinheirinho",
    name: "Pinheirinho",
    heroTitle: "Barbearia para quem está no Pinheirinho",
    metaTitle: "Barbearia perto do Pinheirinho Curitiba | Gustavinho do Corte",
    metaDescription: "Para quem mora ou trabalha no Pinheirinho: conheça a barbearia Gustavinho do Corte no CIC. Facilidade de acesso e agendamento sem fila.",
    distanceInfo: "Localizado no CIC, vizinho ao Pinheirinho",
    estimatedDriveTime: "Cerca de 7 a 10 minutos de carro via Linha Verde ou R. Cid Campelo",
    busRoutes: "Integração direta a partir do Terminal do Pinheirinho",
    description: "Gustavinho do Corte atende clientes do Pinheirinho que procuram agendamento pontual, degradê perfeito e barboterapia sem necessidade de espera prolongada.",
    keywords: ["barbearia pinheirinho", "barbeiro pinheirinho", "corte masculino pinheirinho"]
  },
  "barbearia-no-sitio-cercado": {
    slug: "barbearia-no-sitio-cercado",
    name: "Sítio Cercado",
    heroTitle: "Barbearia para quem está no Sítio Cercado",
    metaTitle: "Barbearia perto do Sítio Cercado | Gustavinho do Corte",
    metaDescription: "Moradores do Sítio Cercado encontram no Gustavinho do Corte (no CIC) o corte de cabelo e barba ideal com agendamento fácil.",
    distanceInfo: "Fácil acesso vindo do Sítio Cercado",
    estimatedDriveTime: "Aproximadamente 12 a 15 minutos via Contorno Sul ou David Tows",
    busRoutes: "Linhas diretas com transbordo rápido",
    description: "Gustavinho do Corte fica situado no CIC e atende semanalmente clientes que saem do Sítio Cercado em busca de cortes modernos, barba alinhada e planos de assinatura acessíveis.",
    keywords: ["barbearia sitio cercado", "barbeiro sitio cercado", "corte masculino sitio cercado"]
  },
  "barbearia-no-capao-raso": {
    slug: "barbearia-no-capao-raso",
    name: "Capão Raso",
    heroTitle: "Barbearia para quem está no Capão Raso",
    metaTitle: "Barbearia perto do Capão Raso Curitiba | Gustavinho do Corte",
    metaDescription: "Buscando barbeiro de confiança perto do Capão Raso? A barbearia Gustavinho do Corte está no CIC com estacionamento fácil e horário agendado.",
    distanceInfo: "Bairro vizinho ao CIC",
    estimatedDriveTime: "Cerca de 6 a 10 minutos de carro via R. Pedro Gusso ou Cid Campelo",
    busRoutes: "Acesso direto pelo Terminal do Capão Raso",
    description: "Sua melhor opção perto do Capão Raso. Atendimento profissional de corte e barba no CIC com horário marcado e sem surpresas.",
    keywords: ["barbearia capao raso", "barbeiro capao raso", "corte capao raso"]
  },
  "barbearia-no-portao": {
    slug: "barbearia-no-portao",
    name: "Portão",
    heroTitle: "Barbearia para quem está no Portão",
    metaTitle: "Barbearia perto do Portão Curitiba | Gustavinho do Corte",
    metaDescription: "Moradores do Portão encontram no Gustavinho do Corte no CIC a melhor combinação de preço justo, estilo e agilidade.",
    distanceInfo: "Acesso rápido vindo do Portão",
    estimatedDriveTime: "Cerca de 10 a 14 minutos pela R. João Bettega",
    busRoutes: "Linha alimentadora direta via João Bettega",
    description: "Atendemos clientes do bairro Portão que desejam um ambiente tranquilo, barboterapia de excelência e profissionais dedicados.",
    keywords: ["barbearia portao curitiba", "barbeiro portao", "corte masculino portao"]
  },
  "barbearia-na-fazendinha": {
    slug: "barbearia-na-fazendinha",
    name: "Fazendinha",
    heroTitle: "Barbearia para quem está na Fazendinha",
    metaTitle: "Barbearia perto da Fazendinha Curitiba | Gustavinho do Corte",
    metaDescription: "Para quem está na Fazendinha em Curitiba, o Gustavinho do Corte no CIC oferece acesso fácil, agendamento rápido e cortes de alto nível.",
    distanceInfo: "Ao lado da Fazendinha",
    estimatedDriveTime: "Aproximadamente 5 a 8 minutos de carro",
    busRoutes: "Integração rápida pelo Terminal da Fazendinha",
    description: "Vizinho imediato da Fazendinha, o Gustavinho do Corte é a escolha natural para quem quer um corte rápido na régua ou barba modelada sem estresse.",
    keywords: ["barbearia fazendinha", "barbeiro fazendinha curitiba"]
  },
  "barbearia-no-novo-mundo": {
    slug: "barbearia-no-novo-mundo",
    name: "Novo Mundo",
    heroTitle: "Barbearia para quem está no Novo Mundo",
    metaTitle: "Barbearia perto do Novo Mundo Curitiba | Gustavinho do Corte",
    metaDescription: "Mora ou trabalha no Novo Mundo? A barbearia Gustavinho do Corte no CIC fica a poucos minutos com atendimento agendado.",
    distanceInfo: "A pouca distância do Novo Mundo",
    estimatedDriveTime: "Cerca de 8 a 12 minutos de carro",
    busRoutes: "Conexão rápida pelas vias principais do bairro",
    description: "Gustavinho do Corte atende o público do Novo Mundo que busca um visual atualizado com praticidade de agendamento no WhatsApp.",
    keywords: ["barbearia novo mundo curitiba", "barbeiro novo mundo"]
  },
  "barbearia-no-tatuquara": {
    slug: "barbearia-no-tatuquara",
    name: "Tatuquara",
    heroTitle: "Barbearia para quem está no Tatuquara",
    metaTitle: "Barbearia perto do Tatuquara Curitiba | Gustavinho do Corte",
    metaDescription: "Atendimento de excelência em barbearia para moradores do Tatuquara no vizinho bairro CIC.",
    distanceInfo: "Acesso direto vindo do Tatuquara",
    estimatedDriveTime: "Aproximadamente 10 a 15 minutos via Contorno Sul",
    busRoutes: "Conexão de ônibus pelas linhas do Tatuquara e CIC",
    description: "Oferecemos aos clientes do Tatuquara cortes modernos, barba na navalha com toalha quente e planos mensais com ótimo custo-benefício.",
    keywords: ["barbearia tatuquara", "barbeiro tatuquara"]
  },
  "barbearia-em-curitiba": {
    slug: "barbearia-em-curitiba",
    name: "Curitiba (Geral)",
    heroTitle: "Barbearia Masculina de Referência em Curitiba",
    metaTitle: "Barbearia em Curitiba no CIC | Gustavinho do Corte",
    metaDescription: "Gustavinho do Corte é a barbearia de referência em Curitiba, localizada na Região Sul (CIC). Atendimento de alto padrão em corte, barba e estética masculina.",
    distanceInfo: "Região Sul de Curitiba - Bairro CIC",
    estimatedDriveTime: "Fácil acesso por todas as principais vias da Região Sul de Curitiba",
    busRoutes: "Múltiplas conexões pelos terminais do CIC, Capão Raso e Pinheirinho",
    description: "Destaque na cena de barbearias de Curitiba, reunindo visagismo masculino, produtos de tratamento premium e ambiente aconchegante para quem valoriza a imagem pessoal.",
    keywords: ["barbearia em curitiba", "melhor barbearia curitiba", "barbeiro curitiba"]
  }
};
