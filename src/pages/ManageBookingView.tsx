import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertCircle, MapPin, MessageCircle, Home } from "lucide-react";
import { BookingStore } from "../services/bookingStore";
import { Booking } from "../types/booking";
import { BUSINESS_INFO } from "../data/business";
import { getUserFriendlyErrorMessage } from "../utils/errorMapper";

export default function ManageBookingView() {
  const { token } = useParams<{ token: string }>();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBooking() {
      if (!token) return;
      setLoading(true);
      try {
        const found = await BookingStore.getBookingByToken(token);
        if (!found) {
          setError("Agendamento não encontrado. Verifique o link enviado.");
        } else {
          setBooking(found);
        }
      } catch (err) {
        console.error("Error loading booking:", err);
        setError(getUserFriendlyErrorMessage(err, "Não foi possível carregar o agendamento."));
      } finally {
        setLoading(false);
      }
    }
    loadBooking();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-[70vh] pt-32 pb-16 flex flex-col items-center justify-center text-center px-4 bg-[#0f0f0f]">
        <div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-bold text-[#a1a1aa]">Carregando agendamento...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-[70vh] pt-32 pb-16 flex flex-col items-center justify-center text-center px-4 bg-[#0f0f0f]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold text-white mb-2">{error || "Agendamento não encontrado"}</h1>
        <Link to="/agendar" className="px-6 py-3 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-bold text-xs mt-4">
          Agendar
        </Link>
      </div>
    );
  }

  const [year, month, day] = booking.date.split("-").map(Number);
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  const waMessage = `Olá! Preciso alterar meu agendamento. Código: ${booking.bookingCode} — ${booking.serviceName}, ${formattedDate} às ${booking.startTime}.`;
  const waUrl = `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f] min-h-screen">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#d4af37] block mb-1">
            Consulta de Agendamento
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif-brand font-bold text-white">
            Meu Agendamento
          </h1>
        </div>

        {/* Booking Info Details */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#a1a1aa] block">Código</span>
              <span className="text-base font-black text-[#d4af37]">{booking.bookingCode}</span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                booking.status === "confirmed"
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                  : booking.status === "cancelled"
                  ? "bg-red-950 text-red-400 border border-red-800"
                  : "bg-[#27272a] text-[#a1a1aa]"
              }`}
            >
              {booking.status === "confirmed" && "Confirmado"}
              {booking.status === "cancelled" && "Cancelado"}
              {booking.status === "completed" && "Concluído"}
              {booking.status === "no_show" && "Não Compareceu"}
            </div>
          </div>

          <div className="space-y-3.5 text-[17px] text-[#f4f4f5] font-normal">
            <div className="flex justify-between">
              <span className="text-[#a1a1aa]">Cliente:</span>
              <span className="font-semibold">{booking.customerName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#a1a1aa]">Serviço:</span>
              <span className="font-semibold">{booking.serviceName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#a1a1aa]">Data:</span>
              <span className="font-semibold capitalize text-[18px] text-white">{formattedDate}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#a1a1aa]">Horário:</span>
              <span className="font-semibold text-[18px] text-[#d4af37]">{booking.startTime}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#a1a1aa]">Valor:</span>
              <span className="font-semibold text-[18px] text-[#d4af37]">
                R$ {booking.servicePrice.toFixed(2).replace(".", ",")}
              </span>
            </div>

            <div className="flex justify-between pt-2 border-t border-[#27272a]/60 text-sm">
              <span className="text-[#a1a1aa]">Endereço:</span>
              <span className="font-medium text-right text-[#d4af37]">{BUSINESS_INFO.address.shortFormatted}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="space-y-4 mb-8">
          <p className="text-xs text-[#a1a1aa] text-center font-medium">
            Precisa cancelar ou mudar o horário? Fale com a gente no WhatsApp.
          </p>

          {/* Falar no WhatsApp — Botão Principal */}
          <div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-colors shadow-lg min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>WhatsApp</span>
            </a>
            <span className="block text-[9px] text-[#a1a1aa] font-normal tracking-tight mt-1 text-center">
              solicitar cancelamento ou troca de horário
            </span>
          </div>

          {/* Ações Secundárias */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#242428] border border-[#27272a] hover:border-[#d4af37] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors min-h-[48px] w-full"
              >
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>Rotas</span>
              </a>
              <span className="block text-[9px] text-[#a1a1aa] font-normal tracking-tight mt-1 text-center">
                abrir GPS no Google Maps
              </span>
            </div>

            <div>
              <Link
                to="/"
                className="py-3 px-4 rounded-xl bg-[#242428] border border-[#27272a] hover:border-[#d4af37] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors min-h-[48px] w-full"
              >
                <Home className="w-4 h-4 text-[#d4af37]" />
                <span>Início</span>
              </Link>
              <span className="block text-[9px] text-[#a1a1aa] font-normal tracking-tight mt-1 text-center">
                retornar à página principal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

