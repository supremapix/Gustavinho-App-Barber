export interface BairroItem {
  slug: string;
  name: string;
  distancia: string;
  lat: number;
  lng: number;
  categoria:
    | 'Bairros Vizinhos'
    | 'Vilas do CIC'
    | 'Regiões do CIC'
    | 'Vilas e Conjuntos'
    | 'Bairros de Curitiba'
    | 'Denominações Locais';
  description?: string;
}

export const LOCALIDADES_LIST: BairroItem[] = [
  // Bairros Vizinhos (10)
  { slug: "fazendinha", name: "Fazendinha", distancia: "3 km", lat: -25.4523, lng: -49.3112, categoria: "Bairros Vizinhos" },
  { slug: "pinheirinho", name: "Pinheirinho", distancia: "4 km", lat: -25.5089, lng: -49.2926, categoria: "Bairros Vizinhos" },
  { slug: "tatuquara", name: "Tatuquara", distancia: "5 km", lat: -25.5423, lng: -49.3156, categoria: "Bairros Vizinhos" },
  { slug: "capao-raso", name: "Capão Raso", distancia: "4 km", lat: -25.4956, lng: -49.3034, categoria: "Bairros Vizinhos" },
  { slug: "campo-de-santana", name: "Campo de Santana", distancia: "4 km", lat: -25.5234, lng: -49.2789, categoria: "Bairros Vizinhos" },
  { slug: "novo-mundo", name: "Novo Mundo", distancia: "5 km", lat: -25.4789, lng: -49.2945, categoria: "Bairros Vizinhos" },
  { slug: "campo-comprido", name: "Campo Comprido", distancia: "4 km", lat: -25.4456, lng: -49.3089, categoria: "Bairros Vizinhos" },
  { slug: "augusta", name: "Augusta", distancia: "2 km", lat: -25.4867, lng: -49.3234, categoria: "Bairros Vizinhos" },
  { slug: "riviera", name: "Riviera", distancia: "2 km", lat: -25.4778, lng: -49.3189, categoria: "Bairros Vizinhos" },
  { slug: "sao-miguel", name: "São Miguel", distancia: "3 km", lat: -25.5012, lng: -49.3345, categoria: "Bairros Vizinhos" },

  // Vilas do CIC (12)
  { slug: "vila-nossa-senhora-da-luz", name: "Vila Nossa Senhora da Luz", distancia: "1 km", lat: -25.4789, lng: -49.3267, categoria: "Vilas do CIC" },
  { slug: "vila-verde", name: "Vila Verde", distancia: "2 km", lat: -25.5123, lng: -49.3312, categoria: "Vilas do CIC" },
  { slug: "vila-caiua", name: "Vila Caiuá", distancia: "1 km", lat: -25.4845, lng: -49.3278, categoria: "Vilas do CIC" },
  { slug: "vila-vitoria-regia", name: "Vila Vitória Régia", distancia: "2 km", lat: -25.5156, lng: -49.3289, categoria: "Vilas do CIC" },
  { slug: "vila-santa-helena", name: "Vila Santa Helena", distancia: "1 km", lat: -25.4823, lng: -49.3234, categoria: "Vilas do CIC" },
  { slug: "vila-conquista", name: "Vila Conquista", distancia: "1 km", lat: -25.4867, lng: -49.3212, categoria: "Vilas do CIC" },
  { slug: "vila-osvaldo-cruz", name: "Vila Osvaldo Cruz", distancia: "1 km", lat: -25.4834, lng: -49.3256, categoria: "Vilas do CIC" },
  { slug: "vila-itatiaia", name: "Vila Itatiaia", distancia: "1 km", lat: -25.4812, lng: -49.3223, categoria: "Vilas do CIC" },
  { slug: "vila-sabara", name: "Vila Sabará", distancia: "2 km", lat: -25.4889, lng: -49.3245, categoria: "Vilas do CIC" },
  { slug: "vila-barigui", name: "Vila Barigui", distancia: "1 km", lat: -25.4756, lng: -49.3189, categoria: "Vilas do CIC" },
  { slug: "vila-atenas", name: "Vila Atenas", distancia: "2 km", lat: -25.4723, lng: -49.3156, categoria: "Vilas do CIC" },
  { slug: "vila-sandra", name: "Vila Sandra", distancia: "2 km", lat: -25.4689, lng: -49.3134, categoria: "Vilas do CIC" },

  // Regiões do CIC (8)
  { slug: "cic-norte", name: "CIC Norte", distancia: "2 km", lat: -25.4656, lng: -49.3178, categoria: "Regiões do CIC" },
  { slug: "cic-sul", name: "CIC Sul", distancia: "3 km", lat: -25.5234, lng: -49.3312, categoria: "Regiões do CIC" },
  { slug: "cic-central", name: "CIC Central", distancia: "1 km", lat: -25.4856, lng: -49.3310, categoria: "Regiões do CIC" },
  { slug: "jardim-gabineto", name: "Jardim Gabineto", distancia: "2 km", lat: -25.4678, lng: -49.3145, categoria: "Regiões do CIC" },
  { slug: "belo-ar", name: "Belo Ar", distancia: "2 km", lat: -25.4934, lng: -49.3267, categoria: "Regiões do CIC" },
  { slug: "colina-verde", name: "Colina Verde", distancia: "2 km", lat: -25.4912, lng: -49.3234, categoria: "Regiões do CIC" },
  { slug: "gralha-azul", name: "Gralha Azul", distancia: "2 km", lat: -25.4978, lng: -49.3289, categoria: "Regiões do CIC" },
  { slug: "barro-preto", name: "Barro Preto", distancia: "2 km", lat: -25.5023, lng: -49.3312, categoria: "Regiões do CIC" },

  // Vilas e Conjuntos (18)
  { slug: "vila-parolin", name: "Vila Parolin", distancia: "9 km", lat: -25.4534, lng: -49.2689, categoria: "Vilas e Conjuntos" },
  { slug: "vila-torres", name: "Vila Torres", distancia: "9 km", lat: -25.4412, lng: -49.2634, categoria: "Vilas e Conjuntos" },
  { slug: "vila-tecnologica", name: "Vila Tecnológica", distancia: "3 km", lat: -25.4923, lng: -49.3189, categoria: "Vilas e Conjuntos" },
  { slug: "vila-audi", name: "Vila Audi", distancia: "4 km", lat: -25.5089, lng: -49.3234, categoria: "Vilas e Conjuntos" },
  { slug: "vila-pantanal", name: "Vila Pantanal", distancia: "9 km", lat: -25.4623, lng: -49.2389, categoria: "Vilas e Conjuntos" },
  { slug: "vila-oficinas", name: "Vila Oficinas", distancia: "10 km", lat: -25.4489, lng: -49.2434, categoria: "Vilas e Conjuntos" },
  { slug: "vila-fanny", name: "Vila Fanny", distancia: "7 km", lat: -25.4678, lng: -49.2812, categoria: "Vilas e Conjuntos" },
  { slug: "vila-hauer", name: "Vila Hauer", distancia: "8 km", lat: -25.4789, lng: -49.2712, categoria: "Vilas e Conjuntos" },
  { slug: "vila-guaira", name: "Vila Guaíra", distancia: "8 km", lat: -25.4634, lng: -49.2789, categoria: "Vilas e Conjuntos" },
  { slug: "vila-osternack", name: "Vila Osternack", distancia: "7 km", lat: -25.5312, lng: -49.2934, categoria: "Vilas e Conjuntos" },
  { slug: "vila-sao-jose", name: "Vila São José", distancia: "2 km", lat: -25.4878, lng: -49.3278, categoria: "Vilas e Conjuntos" },
  { slug: "vila-industrial", name: "Vila Industrial", distancia: "2 km", lat: -25.4823, lng: -49.3289, categoria: "Vilas e Conjuntos" },
  { slug: "vila-uniao", name: "Vila União", distancia: "3 km", lat: -25.4912, lng: -49.3267, categoria: "Vilas e Conjuntos" },
  { slug: "vila-nova-esperanca", name: "Vila Nova Esperança", distancia: "3 km", lat: -25.4989, lng: -49.3312, categoria: "Vilas e Conjuntos" },
  { slug: "vila-reno", name: "Vila Reno", distancia: "2 km", lat: -25.4845, lng: -49.3234, categoria: "Vilas e Conjuntos" },
  { slug: "conjunto-caiua", name: "Conjunto Caiuá", distancia: "1 km", lat: -25.4834, lng: -49.3267, categoria: "Vilas e Conjuntos" },
  { slug: "conjunto-parigot-de-souza", name: "Conjunto Parigot de Souza", distancia: "2 km", lat: -25.4912, lng: -49.3245, categoria: "Vilas e Conjuntos" },
  { slug: "jardim-schaffer", name: "Jardim Schaffer", distancia: "3 km", lat: -25.4956, lng: -49.3178, categoria: "Vilas e Conjuntos" },

  // Bairros de Curitiba (65)
  { slug: "agua-verde", name: "Água Verde", distancia: "8 km", lat: -25.4512, lng: -49.2834, categoria: "Bairros de Curitiba" },
  { slug: "ahu", name: "Ahú", distancia: "12 km", lat: -25.4045, lng: -49.2678, categoria: "Bairros de Curitiba" },
  { slug: "alto-boqueirao", name: "Alto Boqueirão", distancia: "12 km", lat: -25.5234, lng: -49.2456, categoria: "Bairros de Curitiba" },
  { slug: "alto-da-gloria", name: "Alto da Glória", distancia: "11 km", lat: -25.4123, lng: -49.2612, categoria: "Bairros de Curitiba" },
  { slug: "alto-da-xv", name: "Alto da XV", distancia: "10 km", lat: -25.4334, lng: -49.2589, categoria: "Bairros de Curitiba" },
  { slug: "atuba", name: "Atuba", distancia: "15 km", lat: -25.3789, lng: -49.2456, categoria: "Bairros de Curitiba" },
  { slug: "bacacheri", name: "Bacacheri", distancia: "14 km", lat: -25.3956, lng: -49.2534, categoria: "Bairros de Curitiba" },
  { slug: "bairro-alto", name: "Bairro Alto", distancia: "15 km", lat: -25.3823, lng: -49.2389, categoria: "Bairros de Curitiba" },
  { slug: "barreirinha", name: "Barreirinha", distancia: "16 km", lat: -25.3567, lng: -49.2678, categoria: "Bairros de Curitiba" },
  { slug: "batel", name: "Batel", distancia: "9 km", lat: -25.4389, lng: -49.2812, categoria: "Bairros de Curitiba" },
  { slug: "bigorrilho", name: "Bigorrilho", distancia: "9 km", lat: -25.4345, lng: -49.2934, categoria: "Bairros de Curitiba" },
  { slug: "boa-vista", name: "Boa Vista", distancia: "13 km", lat: -25.3912, lng: -49.2567, categoria: "Bairros de Curitiba" },
  { slug: "bom-retiro", name: "Bom Retiro", distancia: "12 km", lat: -25.4012, lng: -49.2612, categoria: "Bairros de Curitiba" },
  { slug: "boqueirao", name: "Boqueirão", distancia: "10 km", lat: -25.5045, lng: -49.2534, categoria: "Bairros de Curitiba" },
  { slug: "butiatuvinha", name: "Butiatuvinha", distancia: "12 km", lat: -25.3734, lng: -49.3312, categoria: "Bairros de Curitiba" },
  { slug: "cabral", name: "Cabral", distancia: "12 km", lat: -25.4012, lng: -49.2678, categoria: "Bairros de Curitiba" },
  { slug: "cachoeira", name: "Cachoeira", distancia: "16 km", lat: -25.3489, lng: -49.2756, categoria: "Bairros de Curitiba" },
  { slug: "cajuru", name: "Cajuru", distancia: "13 km", lat: -25.4567, lng: -49.2312, categoria: "Bairros de Curitiba" },
  { slug: "campina-do-siqueira", name: "Campina do Siqueira", distancia: "8 km", lat: -25.4423, lng: -49.2989, categoria: "Bairros de Curitiba" },
  { slug: "capao-da-imbuia", name: "Capão da Imbuia", distancia: "14 km", lat: -25.4478, lng: -49.2278, categoria: "Bairros de Curitiba" },
  { slug: "cascatinha", name: "Cascatinha", distancia: "13 km", lat: -25.3856, lng: -49.3156, categoria: "Bairros de Curitiba" },
  { slug: "caximba", name: "Caximba", distancia: "8 km", lat: -25.5534, lng: -49.3234, categoria: "Bairros de Curitiba" },
  { slug: "centro", name: "Centro", distancia: "10 km", lat: -25.4284, lng: -49.2712, categoria: "Bairros de Curitiba" },
  { slug: "centro-civico", name: "Centro Cívico", distancia: "11 km", lat: -25.4167, lng: -49.2712, categoria: "Bairros de Curitiba" },
  { slug: "cristo-rei", name: "Cristo Rei", distancia: "11 km", lat: -25.4378, lng: -49.2534, categoria: "Bairros de Curitiba" },
  { slug: "fanny", name: "Fanny", distancia: "7 km", lat: -25.4712, lng: -49.2856, categoria: "Bairros de Curitiba" },
  { slug: "ganchinho", name: "Ganchinho", distancia: "10 km", lat: -25.5512, lng: -49.2789, categoria: "Bairros de Curitiba" },
  { slug: "guabirotuba", name: "Guabirotuba", distancia: "10 km", lat: -25.4678, lng: -49.2512, categoria: "Bairros de Curitiba" },
  { slug: "guaira", name: "Guaíra", distancia: "8 km", lat: -25.4612, lng: -49.2767, categoria: "Bairros de Curitiba" },
  { slug: "hauer", name: "Hauer", distancia: "8 km", lat: -25.4756, lng: -49.2678, categoria: "Bairros de Curitiba" },
  { slug: "hugo-lange", name: "Hugo Lange", distancia: "11 km", lat: -25.4234, lng: -49.2567, categoria: "Bairros de Curitiba" },
  { slug: "jardim-botanico", name: "Jardim Botânico", distancia: "10 km", lat: -25.4423, lng: -49.2389, categoria: "Bairros de Curitiba" },
  { slug: "jardim-das-americas", name: "Jardim das Américas", distancia: "12 km", lat: -25.4567, lng: -49.2334, categoria: "Bairros de Curitiba" },
  { slug: "jardim-social", name: "Jardim Social", distancia: "13 km", lat: -25.4312, lng: -49.2412, categoria: "Bairros de Curitiba" },
  { slug: "juveve", name: "Juvevê", distancia: "11 km", lat: -25.4089, lng: -49.2634, categoria: "Bairros de Curitiba" },
  { slug: "lamenha-pequena", name: "Lamenha Pequena", distancia: "14 km", lat: -25.3634, lng: -49.3234, categoria: "Bairros de Curitiba" },
  { slug: "lindoia", name: "Lindóia", distancia: "7 km", lat: -25.4523, lng: -49.2978, categoria: "Bairros de Curitiba" },
  { slug: "merces", name: "Mercês", distancia: "9 km", lat: -25.4267, lng: -49.2912, categoria: "Bairros de Curitiba" },
  { slug: "mossungue", name: "Mossunguê", distancia: "8 km", lat: -25.4312, lng: -49.3134, categoria: "Bairros de Curitiba" },
  { slug: "orleans", name: "Orleans", distancia: "10 km", lat: -25.4434, lng: -49.2456, categoria: "Bairros de Curitiba" },
  { slug: "parolin", name: "Parolin", distancia: "9 km", lat: -25.4512, lng: -49.2712, categoria: "Bairros de Curitiba" },
  { slug: "pilarzinho", name: "Pilarzinho", distancia: "13 km", lat: -25.3878, lng: -49.2812, categoria: "Bairros de Curitiba" },
  { slug: "portao", name: "Portão", distancia: "6 km", lat: -25.4612, lng: -49.2934, categoria: "Bairros de Curitiba" },
  { slug: "prado-velho", name: "Prado Velho", distancia: "10 km", lat: -25.4489, lng: -49.2612, categoria: "Bairros de Curitiba" },
  { slug: "reboucas", name: "Rebouças", distancia: "9 km", lat: -25.4445, lng: -49.2678, categoria: "Bairros de Curitiba" },
  { slug: "santa-candida", name: "Santa Cândida", distancia: "17 km", lat: -25.3534, lng: -49.2534, categoria: "Bairros de Curitiba" },
  { slug: "santa-felicidade", name: "Santa Felicidade", distancia: "12 km", lat: -25.3789, lng: -49.3134, categoria: "Bairros de Curitiba" },
  { slug: "santa-quiteria", name: "Santa Quitéria", distancia: "6 km", lat: -25.4534, lng: -49.3012, categoria: "Bairros de Curitiba" },
  { slug: "santo-inacio", name: "Santo Inácio", distancia: "7 km", lat: -25.4623, lng: -49.3089, categoria: "Bairros de Curitiba" },
  { slug: "sao-braz", name: "São Braz", distancia: "8 km", lat: -25.4189, lng: -49.3189, categoria: "Bairros de Curitiba" },
  { slug: "sao-francisco", name: "São Francisco", distancia: "10 km", lat: -25.4267, lng: -49.2734, categoria: "Bairros de Curitiba" },
  { slug: "sao-joao", name: "São João", distancia: "7 km", lat: -25.4534, lng: -49.3134, categoria: "Bairros de Curitiba" },
  { slug: "sao-lourenco", name: "São Lourenço", distancia: "13 km", lat: -25.3867, lng: -49.2789, categoria: "Bairros de Curitiba" },
  { slug: "seminario", name: "Seminário", distancia: "8 km", lat: -25.4389, lng: -49.2889, categoria: "Bairros de Curitiba" },
  { slug: "sitio-cercado", name: "Sítio Cercado", distancia: "7 km", lat: -25.5356, lng: -49.2912, categoria: "Bairros de Curitiba" },
  { slug: "taboao", name: "Taboão", distancia: "6 km", lat: -25.5189, lng: -49.3089, categoria: "Bairros de Curitiba" },
  { slug: "taruma", name: "Tarumã", distancia: "14 km", lat: -25.4234, lng: -49.2312, categoria: "Bairros de Curitiba" },
  { slug: "tingui", name: "Tingui", distancia: "14 km", lat: -25.3789, lng: -49.2889, categoria: "Bairros de Curitiba" },
  { slug: "uberaba", name: "Uberaba", distancia: "12 km", lat: -25.4789, lng: -49.2345, categoria: "Bairros de Curitiba" },
  { slug: "umbara", name: "Umbará", distancia: "8 km", lat: -25.5534, lng: -49.2912, categoria: "Bairros de Curitiba" },
  { slug: "vila-izabel", name: "Vila Izabel", distancia: "7 km", lat: -25.4512, lng: -49.2912, categoria: "Bairros de Curitiba" },
  { slug: "vista-alegre", name: "Vista Alegre", distancia: "14 km", lat: -25.3712, lng: -49.2712, categoria: "Bairros de Curitiba" },
  { slug: "xaxim", name: "Xaxim", distancia: "8 km", lat: -25.4934, lng: -49.2678, categoria: "Bairros de Curitiba" },
  { slug: "abranches", name: "Abranches", distancia: "14 km", lat: -25.3734, lng: -49.2889, categoria: "Bairros de Curitiba" },
  { slug: "ecoville", name: "Ecoville", distancia: "7 km", lat: -25.4367, lng: -49.3189, categoria: "Bairros de Curitiba" },

  // Denominações Locais (13)
  { slug: "boqueirao-de-baixo", name: "Boqueirão de Baixo", distancia: "10 km", lat: -25.5089, lng: -49.2512, categoria: "Denominações Locais" },
  { slug: "boqueirao-de-cima", name: "Boqueirão de Cima", distancia: "11 km", lat: -25.5156, lng: -49.2489, categoria: "Denominações Locais" },
  { slug: "tangua", name: "Tanguá", distancia: "14 km", lat: -25.3823, lng: -49.2834, categoria: "Denominações Locais" },
  { slug: "vila-zumbi", name: "Vila Zumbi", distancia: "8 km", lat: -25.5234, lng: -49.2856, categoria: "Denominações Locais" },
  { slug: "abranches-de-baixo", name: "Abranches de Baixo", distancia: "13 km", lat: -25.3778, lng: -49.2856, categoria: "Denominações Locais" },
  { slug: "abranches-de-cima", name: "Abranches de Cima", distancia: "14 km", lat: -25.3712, lng: -49.2912, categoria: "Denominações Locais" },
  { slug: "centro-historico", name: "Centro Histórico", distancia: "10 km", lat: -25.4267, lng: -49.2689, categoria: "Denominações Locais" },
  { slug: "batel-soho", name: "Batel Soho", distancia: "9 km", lat: -25.4367, lng: -49.2845, categoria: "Denominações Locais" },
  { slug: "alto-da-rua-xv", name: "Alto da Rua XV", distancia: "10 km", lat: -25.4356, lng: -49.2567, categoria: "Denominações Locais" },
  { slug: "uberaba-de-cima", name: "Uberaba de Cima", distancia: "12 km", lat: -25.4734, lng: -49.2312, categoria: "Denominações Locais" },
  { slug: "uberaba-de-baixo", name: "Uberaba de Baixo", distancia: "11 km", lat: -25.4823, lng: -49.2378, categoria: "Denominações Locais" },
  { slug: "xaxim-velho", name: "Xaxim Velho", distancia: "8 km", lat: -25.4912, lng: -49.2645, categoria: "Denominações Locais" },
  { slug: "portao-velho", name: "Portão Velho", distancia: "6 km", lat: -25.4589, lng: -49.2956, categoria: "Denominações Locais" },

  // Anchor CIC
  { slug: "cic", name: "Cidade Industrial de Curitiba (CIC)", distancia: "0 km", lat: -25.4856, lng: -49.33098, categoria: "Regiões do CIC" }
];

export function getLocalidadeBySlug(slugInput: string): BairroItem | undefined {
  if (!slugInput) return undefined;
  const clean = slugInput
    .toLowerCase()
    .trim()
    .replace(/^barbearia-no-/, '')
    .replace(/^barbearia-em-/, '')
    .replace(/^barbearia-perto-do-/, '')
    .replace(/^barbearia-perto-de-/, '');

  return LOCALIDADES_LIST.find(
    (item) =>
      item.slug === clean ||
      item.slug === slugInput.toLowerCase() ||
      item.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === clean
  );
}

export function getVizinhos(currentSlug: string, count: number = 6): BairroItem[] {
  const current = getLocalidadeBySlug(currentSlug);
  const filtered = LOCALIDADES_LIST.filter((item) => item.slug !== currentSlug && item.slug !== 'cic');
  if (!current) return filtered.slice(0, count);

  // Return items from same category first or closest
  const sameCategory = filtered.filter((item) => item.categoria === current.categoria);
  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }

  const combined = [...sameCategory, ...filtered.filter((item) => item.categoria !== current.categoria)];
  return combined.slice(0, count);
}
