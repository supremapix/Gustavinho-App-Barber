import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Scissors, AlertCircle, CheckCircle, MessageCircle, Home, XCircle, RefreshCw } from "lucide-react";
import { BookingStore } from "../services/bookingStore";
import { Booking, BookingStatus } from "../types/booking";
import { BUSINESS_INFO } from "../data/business";
import { calculateAvailableSlots } from "../utils/availabilityEngine";
import ConfirmationModal from "../components/ConfirmationModal";

export default function ManageBookingView() {
  const { token } = useParams<{ token: string }>();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Reschedule state
  const [isRescheduling, setIsRescheduling] = useState<boolean>(false);
  const [newDate, setNewDate] = useState<string>("");
  const [newTime, setNewTime] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [rescheduleMsg, setRescheduleMsg] = useState<string | null>(null);

  // Cancel Confirmation Modal state
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);

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
          setNewDate(found.date);
        }
      } catch (err) {
        setError("Erro ao carregar o agendamento.");
      } finally {
        setLoading(false);
      }
    }
    loadBooking();
  }, [token]);

  // Recalculate available slots when newDate changes during reschedule
  useEffect(() => {
    async function updateSlots() {
      if (!booking || !newDate || !isRescheduling) return;
      const [allBookings, blocked, settings] = await Promise.all([
        BookingStore.getBookings(),
        BookingStore.getBlockedPeriods(),
        BookingStore.getBusinessSettings()
      ]);

      const slots = calculateAvailableSlots(
        newDate,
        booking.serviceDurationMinutes,
        allBookings.filter((b) => b.id !== booking.id),
        blocked,
        settings
      );
      setAvailableSlots(slots);
    }
    updateSlots();
  }, [newDate, isRescheduling, booking]);

  const handleCancelBooking = async () => {
    if (!booking) return;
    setIsCancelling(true);
    const res = await BookingStore.updateBookingStatus(booking.id, "cancelled");
    setIsCancelling(false);
    setShowCancelModal(false);
    if (res.success) {
      setBooking({ ...booking, status: "cancelled" });
    } else {
      setRescheduleMsg(res.error || "Não foi possível cancelar o agendamento.");
    }
  };

  const handleConfirmReschedule = async () => {
    if (!booking || !newDate || !newTime) return;

    const res = await BookingStore.rescheduleBooking(booking.id, newDate, newTime);
    if (!res.success) {
      setRescheduleMsg(res.error || "Erro ao remarcar.");
      return;
    }

    setBooking({
      ...booking,
      date: newDate,
      startTime: newTime
    });
    setIsRescheduling(false);
    setRescheduleMsg("Agendamento reagendado com sucesso!");
  };

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
          Fazer Novo Agendamento
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

  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f] min-h-screen">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-1">
            Gestão do Cliente
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Meu Agendamento
          </h1>
        </div>

        {rescheduleMsg && (
          <div className="mb-6 p-4 rounded-xl bg-[#18181b] border border-[#d4af37] text-[#d4af37] text-xs font-bold text-center">
            {rescheduleMsg}
          </div>
        )}

        <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#a1a1aa] block">Código</span>
              <span className="text-base font-black text-[#d4af37]">{booking.bookingCode}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
              booking.status === "confirmed"
                ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                : booking.status === "cancelled"
                ? "bg-red-950 text-red-400 border border-red-800"
                : "bg-[#27272a] text-[#a1a1aa]"
            }`}>
              {booking.status === "confirmed" && "Confirmado"}
              {booking.status === "cancelled" && "Cancelado"}
              {booking.status === "completed" && "Concluído"}
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#f4f4f5]">
            <div className="flex justify-between">
              <span className="text-[#a1a1aa]">Cliente:</span>
              <span className="font-bold">{booking.customerName}</span>
            </div>

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
              <span className="font-black text-[#d4af37]">{booking.startTime}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#a1a1aa]">Valor:</span>
              <span className="font-bold text-[#d4af37]">R$ {booking.servicePrice.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>
        </div>

        {/* Reschedule Drawer/Form */}
        {isRescheduling ? (
          <div className="bg-[#18181b] border border-[#d4af37] p-6 rounded-2xl mb-8 space-y-4">
            <h3 className="font-extrabold text-sm text-white">Escolha nova data e horário:</h3>
            <div>
              <label className="text-xs text-[#a1a1aa] block mb-1">Nova Data:</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#0f0f0f] border border-[#27272a] text-white text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-[#a1a1aa] block mb-1">Horários Disponíveis:</label>
              <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setNewTime(slot)}
                    className={`p-2 rounded-lg text-xs font-bold border ${
                      newTime === slot ? "bg-[#d4af37] text-[#0f0f0f]" : "bg-[#0f0f0f] border-[#27272a] text-white"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleConfirmReschedule}
                disabled={!newTime}
                className="flex-1 py-3 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-bold text-xs disabled:opacity-50"
              >
                Salvar Novo Horário
              </button>
              <button
                type="button"
                onClick={() => setIsRescheduling(false)}
                className="px-4 py-3 rounded-xl bg-[#242428] text-white font-bold text-xs"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          booking.status === "confirmed" && (
            <div className="space-y-3 mb-8">
              <button
                type="button"
                onClick={() => setIsRescheduling(true)}
                className="w-full py-3.5 rounded-xl bg-[#242428] border border-[#27272a] text-white font-bold text-xs hover:border-[#d4af37] flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-[#d4af37]" />
                <span>REMARCAR ATENDIMENTO</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="w-full py-3.5 rounded-xl bg-red-950/40 border border-red-900/60 text-red-300 font-bold text-xs hover:bg-red-900/60 flex items-center justify-center gap-2 min-h-[48px]"
              >
                <XCircle className="w-4 h-4 text-red-400" />
                <span>CANCELAR AGENDAMENTO</span>
              </button>
            </div>
          )
        )}

        <div className="text-center pt-4">
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-[#a1a1aa] hover:text-[#d4af37]">
            <Home className="w-4 h-4" />
            <span>Voltar ao site</span>
          </Link>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showCancelModal}
        title="Cancelar Agendamento"
        message="Tem certeza que deseja cancelar seu agendamento? O horário será liberado para outros clientes."
        confirmText="Sim, Cancelar Agendamento"
        cancelText="Manter Agendamento"
        variant="danger"
        loading={isCancelling}
        onConfirm={handleCancelBooking}
        onCancel={() => setShowCancelModal(false)}
      />
    </div>
  );
}
