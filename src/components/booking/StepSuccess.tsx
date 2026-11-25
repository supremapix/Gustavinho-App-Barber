import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, CalendarPlus, Navigation, MessageCircle, Home, MapPin } from "lucide-react";
import { Booking } from "../../types/booking";
import { BUSINESS_INFO } from "../../data/business";
import { bookingWhatsAppUrl } from "../../utils/bookingWhatsApp";
import { generateGoogleCalendarUrl } from "../../utils/availabilityEngine";

interface StepSuccessProps {
  booking: Booking;
}

export default function StepSuccess({ booking }: StepSuccessProps) {
  const [year, month, day] = booking.date.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  const formattedDate = dateObj.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  const googleCalendarUrl = generateGoogleCalendarUrl(
    booking.serviceName,
    booking.date,
    booking.startTime,
    booking.serviceDurationMinutes
  );

  const waUrl = bookingWhatsAppUrl(booking);

  return (
    <div className="w-full max-w-md mx-auto text-center py-2">
      {/* Success Badge */}
      <div className="w-16 h-16 rounded-full bg-[#18181b] border-2 border-[#d4af37] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#d4af37]/20">
        <CheckCircle2 className="w-8 h-8 text-[#d4af37]" />
      </div>

      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d4af37] block mb-1">
        Sucesso!
      </span>

      <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-1">
        Agendamento confirmado
      </h1>

      <p className="text-xs sm:text-sm text-zinc-400 mb-6 font-normal">
        Seu horário está reservado com sucesso no Gustavinho do Corte.
      </p>

      {/* Booking Code Card */}
      <div className="bg-[#18181b] border border-[#d4af37]/50 rounded-2xl p-5 shadow-xl mb-6 text-left space-y-3.5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Código do Agendamento
          </span>
          <span className="text-base font-bold text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded-lg border border-[#d4af37]/30">
            {booking.bookingCode}
          </span>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-[#f4f4f5]">
          <div className="flex justify-between">
            <span className="text-zinc-400">Serviço:</span>
            <span className="font-semibold">{booking.serviceName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Data:</span>
            <span className="font-semibold capitalize">{formattedDate}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Horário:</span>
            <span className="font-semibold text-[#d4af37]">Às {booking.startTime}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Valor:</span>
            <span className="font-bold text-[#d4af37]">R$ {booking.servicePrice.toFixed(2).replace(".", ",")}</span>
          </div>

          <div className="pt-2 border-t border-zinc-800 flex items-start gap-2 text-xs text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
            <span className="text-xs text-zinc-400">Rua Desembargador Cid Campelo, 5212 - CIC, Curitiba - PR</span>
          </div>
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-[#d4af37]/50 bg-[#18181b] p-4">
        <p className="mb-3 text-sm leading-relaxed text-zinc-200">
          Para avisar a barbearia, toque em <strong>Enviar</strong> no WhatsApp.
          Se ele não abrir sozinho, use o botão abaixo. Não faça outra reserva.
        </p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] p-3 text-sm font-bold text-[#0f0f0f] hover:bg-[#e5c158]">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Abrir WhatsApp da barbearia
        </a>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <div>
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-[#242428] border border-[#27272a] text-white text-xs font-bold hover:border-[#d4af37] flex items-center justify-center gap-2 transition-all min-h-[48px] w-full"
          >
            <CalendarPlus className="w-4 h-4 text-[#d4af37]" />
            <span>Agenda</span>
          </a>
          <span className="block text-[9px] text-[#a1a1aa] font-normal tracking-tight mt-1 text-center">
            salvar no Google Agenda
          </span>
        </div>

        <div>
          <a
            href={BUSINESS_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-[#242428] border border-[#27272a] text-white text-xs font-bold hover:border-[#d4af37] flex items-center justify-center gap-2 transition-all min-h-[48px] w-full"
          >
            <Navigation className="w-4 h-4 text-[#d4af37]" />
            <span>Rotas</span>
          </a>
          <span className="block text-[9px] text-[#a1a1aa] font-normal tracking-tight mt-1 text-center">
            abrir GPS no Google Maps
          </span>
        </div>

      </div>

      <div className="border-t border-[#27272a] pt-6 flex flex-col items-center justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#a1a1aa] hover:text-[#d4af37]"
        >
          <Home className="w-4 h-4" />
          <span>Início</span>
        </Link>
        <span className="block text-[9px] text-[#a1a1aa] font-normal tracking-tight mt-0.5">
          retornar à página principal
        </span>
      </div>
    </div>
  );
}
