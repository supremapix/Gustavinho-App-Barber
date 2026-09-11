import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, CalendarPlus, Navigation, MessageCircle, Home, MapPin, Hash } from "lucide-react";
import { Booking } from "../../types/booking";
import { BUSINESS_INFO } from "../../data/business";
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

  // WhatsApp pre-filled text
  const waText = encodeURIComponent(
    `Olá! Acabei de fazer um agendamento pelo site Gustavinho do Corte.\n\nCódigo: ${booking.bookingCode}\nServiço: ${booking.serviceName}\nData: ${booking.date}\nHorário: ${booking.startTime}\nNome: ${booking.customerName}`
  );
  const waUrl = `${BUSINESS_INFO.whatsappUrl}&text=${waText}`;

  return (
    <div className="w-full max-w-lg mx-auto text-center py-4">
      {/* Success Badge */}
      <div className="w-20 h-20 rounded-full bg-[#18181b] border-2 border-[#d4af37] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#d4af37]/20">
        <CheckCircle2 className="w-10 h-10 text-[#d4af37]" />
      </div>

      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#d4af37] block mb-2">
        Sucesso!
      </span>

      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
        Agendamento confirmado
      </h1>

      <p className="text-[17px] text-[#a1a1aa] mb-8 font-normal">
        Seu horário está reservado com sucesso no Gustavinho do Corte.
      </p>

      {/* Booking Code Card */}
      <div className="bg-[#18181b] border border-[#d4af37]/60 rounded-2xl p-6 shadow-xl mb-8 text-left space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
          <span className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">
            Código do Agendamento
          </span>
          <span className="text-lg font-black text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-lg border border-[#d4af37]/30">
            {booking.bookingCode}
          </span>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-[#f4f4f5]">
          <div className="flex justify-between">
            <span className="text-[#a1a1aa]">Serviço:</span>
            <span className="font-bold">{booking.serviceName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#a1a1aa]">Data:</span>
            <span className="font-bold capitalize">{formattedDate}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#a1a1aa]">Horário:</span>
            <span className="font-bold text-[18px] text-[#d4af37]">{booking.startTime}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#a1a1aa]">Valor:</span>
            <span className="font-bold text-[18px] text-[#d4af37]">R$ {booking.servicePrice.toFixed(2).replace(".", ",")}</span>
          </div>

          <div className="pt-2 border-t border-[#27272a] flex items-start gap-2 text-xs text-[#a1a1aa]">
            <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <span className="text-[17px]">Rua Desembargador Cid Campelo, 5212 - CIC, Curitiba - PR</span>
          </div>
        </div>
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

        <div className="sm:col-span-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] text-xs font-bold flex items-center justify-center gap-2 transition-all min-h-[48px] w-full"
          >
            <MessageCircle className="w-4 h-4 text-[#0f0f0f]" />
            <span>WhatsApp</span>
          </a>
          <span className="block text-[9px] text-[#0f0f0f]/80 font-normal tracking-tight mt-1 text-center">
            enviar código de confirmação
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
