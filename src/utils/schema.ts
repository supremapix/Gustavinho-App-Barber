import { BUSINESS_INFO } from "../data/business";
import { SERVICES_DATA } from "../data/services";
import { FAQ_DATA } from "../data/faq";

export function generateLocalBusinessSchema(currentUrl: string, title: string, description: string) {
  const baseUrl = "https://www.barbeiro.curitiba.br";

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BarberShop",
        "@id": `${baseUrl}/#barbershop`,
        "name": BUSINESS_INFO.name,
        "legalName": BUSINESS_INFO.fullName,
        "url": baseUrl,
        "logo": BUSINESS_INFO.logoUrl,
        "image": BUSINESS_INFO.images.hero,
        "telephone": BUSINESS_INFO.phone,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": BUSINESS_INFO.address.street,
          "addressLocality": BUSINESS_INFO.address.city,
          "addressRegion": BUSINESS_INFO.address.state,
          "postalCode": BUSINESS_INFO.address.zipCode,
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": BUSINESS_INFO.geo.latitude,
          "longitude": BUSINESS_INFO.geo.longitude
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "19:00"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": BUSINESS_INFO.rating.score.toString(),
          "reviewCount": BUSINESS_INFO.rating.reviewsCount.toString(),
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasMap": BUSINESS_INFO.mapsUrl
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": BUSINESS_INFO.name,
        "description": BUSINESS_INFO.description,
        "publisher": {
          "@id": `${baseUrl}/#barbershop`
        },
        "inLanguage": "pt-BR"
      },
      {
        "@type": "WebPage",
        "@id": `${currentUrl}/#webpage`,
        "url": currentUrl,
        "name": title,
        "description": description,
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "inLanguage": "pt-BR"
      },
      ...SERVICES_DATA.map((service) => ({
        "@type": "Service",
        "@id": `${baseUrl}/servicos/${service.slug}/#service`,
        "name": service.title,
        "description": service.shortDesc,
        "provider": {
          "@id": `${baseUrl}/#barbershop`
        },
        "offers": {
          "@type": "Offer",
          "price": service.price,
          "priceCurrency": "BRL",
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/servicos/${service.slug}`
        }
      })),
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/faq/#faqpage`,
        "mainEntity": FAQ_DATA.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };

  return JSON.stringify(schemaGraph);
}
