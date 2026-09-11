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
import CityLocalSeoView from "./pages/CityLocalSeoView";
import NotFoundView from "./pages/NotFoundView";

import BookingView from "./pages/BookingView";
import ManageBookingView from "./pages/ManageBookingView";
import AdminView from "./pages/AdminView";
import AdminLoginView from "./pages/AdminLoginView";

import { BAIRROS_DATA } from "./data/bairros";
import { generateLocalBusinessSchema } from "./utils/schema";

function AppContent() {
  const location = useLocation();

  // Inject dynamic JSON-LD schema into head on route change
  useEffect(() => {
    const canonicalUrl = `https://www.barbeiro.curitiba.br${location.pathname}`;
    const pageTitle = document.title || "Gustavinho do Corte | Barbearia no CIC em Curitiba";
    const pageDesc = "Barbearia no CIC em Curitiba. Corte de cabelo masculino, barba, sobrancelha, platinado e planos mensais.";

    const schemaJson = generateLocalBusinessSchema(canonicalUrl, pageTitle, pageDesc);

    let scriptTag = document.getElementById("json-ld-schema");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "json-ld-schema";
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = schemaJson;

    // Manage noindex meta tag for private routes
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
      robotsMeta.setAttribute("content", "index, follow");
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

            {/* Booking System Routes */}
            <Route path="/agendar" element={<BookingView />} />
            <Route path="/agendamento/:token" element={<ManageBookingView />} />
            <Route path="/admin/login" element={<AdminLoginView />} />
            <Route path="/admin" element={<AdminView />} />

            {/* Explicit Neighborhood / Bairros Local SEO Routes */}
            <Route path="/barbearia-no-cic" element={<CityLocalSeoView />} />
            <Route path="/barbearia-no-xaxim" element={<CityLocalSeoView />} />
            <Route path="/barbearia-no-pinheirinho" element={<CityLocalSeoView />} />
            <Route path="/barbearia-no-sitio-cercado" element={<CityLocalSeoView />} />
            <Route path="/barbearia-no-capao-raso" element={<CityLocalSeoView />} />
            <Route path="/barbearia-no-portao" element={<CityLocalSeoView />} />
            <Route path="/barbearia-na-fazendinha" element={<CityLocalSeoView />} />
            <Route path="/barbearia-no-novo-mundo" element={<CityLocalSeoView />} />
            <Route path="/barbearia-no-tatuquara" element={<CityLocalSeoView />} />
            <Route path="/barbearia-em-curitiba" element={<CityLocalSeoView />} />

            {/* Dynamic Bairro Routing Fallback Check (React Router v6 strict safety rule) */}
            <Route
              path="*"
              element={<CatchAllFallback />}
            />
          </Routes>
        </RouteTransition>
      </main>

      <Footer />
      <MobileBottomBar />
    </div>
  );
}

// Fallback component to safely handle any neighborhood slug without illegal wildcard patterns
function CatchAllFallback() {
  const location = useLocation();
  const cleanPath = location.pathname.toLowerCase().replace(/^\//, "");

  if (cleanPath.startsWith("barbearia-") || cleanPath in BAIRROS_DATA) {
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
