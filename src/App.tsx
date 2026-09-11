import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileBottomBar from "./components/MobileBottomBar";
import RouteTransition from "./components/RouteTransition";

import HomeView from "./pages/HomeView";
import ServicesView from "./pages/ServicesView";
import ServiceDetailView from "./pages/ServiceDetailView";
import PricesView from "./pages/PricesView";
import PlansView from "./pages/PlansView";
import ResultsView from "./pages/ResultsView";
import LocationView from "./pages/LocationView";
import AboutView from "./pages/AboutView";
import FaqView from "./pages/FaqView";
import BlogView from "./pages/BlogView";
import BlogPostView from "./pages/BlogPostView";
import NeighborhoodIndexView from "./pages/NeighborhoodIndexView";
import CityLocalSeoView from "./pages/CityLocalSeoView";
import NotFoundView from "./pages/NotFoundView";

import BookingView from "./pages/BookingView";
import ManageBookingView from "./pages/ManageBookingView";
import AdminView from "./pages/AdminView";
import AdminLoginView from "./pages/AdminLoginView";

import { getLocalidadeBySlug } from "./data/bairros";
import { generateLocalBusinessSchema } from "./utils/schema";

function AppContent() {
  const location = useLocation();

  // Inject dynamic JSON-LD schema & geo meta into head on route change
  useEffect(() => {
    const canonicalUrl = `https://www.barbeiro.curitiba.br${location.pathname}`;
    const pageTitle = document.title || "Gustavinho do Corte | Barbearia no CIC em Curitiba";
    const pageDesc = "Barbearia no CIC em Curitiba. Corte de cabelo masculino, barba, sobrancelha, platinado e planos mensais. Agendamento online pelo sistema ou pelo WhatsApp.";

    const schemaJson = generateLocalBusinessSchema(canonicalUrl, pageTitle, pageDesc);

    let scriptTag = document.getElementById("json-ld-schema");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "json-ld-schema";
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = schemaJson;

    // Ensure Geo Meta Tags exist on all pages
    let regionMeta = document.querySelector<HTMLMetaElement>('meta[name="geo.region"]');
    if (!regionMeta) {
      regionMeta = document.createElement("meta");
      regionMeta.setAttribute("name", "geo.region");
      regionMeta.setAttribute("content", "BR-PR");
      document.head.appendChild(regionMeta);
    }

    let placenameMeta = document.querySelector<HTMLMetaElement>('meta[name="geo.placename"]');
    if (!placenameMeta) {
      placenameMeta = document.createElement("meta");
      placenameMeta.setAttribute("name", "geo.placename");
      placenameMeta.setAttribute("content", "Curitiba, Paraná, Brasil");
      document.head.appendChild(placenameMeta);
    }

    let positionMeta = document.querySelector<HTMLMetaElement>('meta[name="geo.position"]');
    if (!positionMeta) {
      positionMeta = document.createElement("meta");
      positionMeta.setAttribute("name", "geo.position");
      positionMeta.setAttribute("content", "-25.4856;-49.33098");
      document.head.appendChild(positionMeta);
    }

    let icbmMeta = document.querySelector<HTMLMetaElement>('meta[name="ICBM"]');
    if (!icbmMeta) {
      icbmMeta = document.createElement("meta");
      icbmMeta.setAttribute("name", "ICBM");
      icbmMeta.setAttribute("content", "-25.4856, -49.33098");
      document.head.appendChild(icbmMeta);
    }

    // Manage noindex meta tag for private admin / agendamento token routes
    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const isPrivateRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/agendamento");
    if (isPrivateRoute) {
      if (!robotsMeta) {
        robotsMeta = document.createElement("meta");
        robotsMeta.setAttribute("name", "robots");
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute("content", "noindex, nofollow");
    } else if (robotsMeta) {
      robotsMeta.setAttribute("content", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f4f4f5] flex flex-col justify-between selection:bg-[#d4af37] selection:text-[#0f0f0f]">
      <Header />

      <main className="flex-1">
        <RouteTransition>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/servicos" element={<ServicesView />} />
            <Route path="/servicos/:slug" element={<ServiceDetailView />} />
            <Route path="/precos" element={<PricesView />} />
            <Route path="/planos" element={<PlansView />} />
            <Route path="/resultados" element={<ResultsView />} />
            <Route path="/galeria" element={<ResultsView />} />
            <Route path="/localizacao" element={<LocationView />} />
            <Route path="/sobre" element={<AboutView />} />
            <Route path="/faq" element={<FaqView />} />
            <Route path="/blog" element={<BlogView />} />
            <Route path="/blog/:slug" element={<BlogPostView />} />

            {/* Bairros / Geo Localities Routes */}
            <Route path="/bairros" element={<NeighborhoodIndexView />} />
            <Route path="/bairros/:slug" element={<CityLocalSeoView />} />

            {/* Booking System Routes */}
            <Route path="/agendar" element={<BookingView />} />
            <Route path="/agendamento/:token" element={<ManageBookingView />} />
            <Route path="/admin/login" element={<AdminLoginView />} />
            <Route path="/admin" element={<AdminView />} />

            {/* Catch-All Fallback (React Router v6 strict routing safety rule) */}
            <Route path="*" element={<CatchAllFallback />} />
          </Routes>
        </RouteTransition>
      </main>

      <Footer />
      <MobileBottomBar />
    </div>
  );
}

// Fallback component to safely handle any legacy or alternative neighborhood slug
function CatchAllFallback() {
  const location = useLocation();
  const rawPath = location.pathname.toLowerCase().replace(/^\//, "");

  // Check if it matches any of the 126 localidades or barbearia- prefixes
  const loc = getLocalidadeBySlug(rawPath);
  if (loc || rawPath.startsWith("barbearia-") || rawPath.startsWith("bairros/")) {
    return <CityLocalSeoView />;
  }

  return <NotFoundView />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
