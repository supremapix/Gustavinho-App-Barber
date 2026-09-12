import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MessageCircle, ShieldCheck, Sparkles, Scissors, Clock } from "lucide-react";
import BookingStepper from "../components/booking/BookingStepper";
import StepService from "../components/booking/StepService";
import StepDate from "../components/booking/StepDate";
import StepTime from "../components/booking/StepTime";
import StepCustomer from "../components/booking/StepCustomer";
import StepReview from "../components/booking/StepReview";
import StepSuccess from "../components/booking/StepSuccess";

import { BookingStore } from "../services/bookingStore";
import {
  ServiceItem,
  Booking,
  BlockedPeriod,
  BusinessSettings
} from "../types/booking";
import { BUSINESS_INFO } from "../data/business";
import { DEFAULT_BUSINESS_SETTINGS } from "../utils/availabilityEngine";

export default function BookingView() {
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get("service");
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Data states
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  const [blockedPeriods, setBlockedPeriods] = useState<BlockedPeriod[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(DEFAULT_BUSINESS_SETTINGS);
  const [loading, setLoading] = useState<boolean>(true);

  // Form selection states
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Submitting states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [srvs, bks, blks, stts] = await Promise.all([
          BookingStore.getServices(),
          BookingStore.getBookings(),
          BookingStore.getBlockedPeriods(),
          BookingStore.getBusinessSettings()
        ]);
        setServices(srvs);
        setExistingBookings(bks);
        setBlockedPeriods(blks);
        setSettings(stts);

        if (preselectedServiceId) {
          const match = srvs.find(
            (s) =>
              s.id === preselectedServiceId ||
              s.id.toLowerCase() === preselectedServiceId.toLowerCase() ||
              s.name.toLowerCase() === preselectedServiceId.toLowerCase()
          );
          if (match) {
            setSelectedService(match);
            setCurrentStep(2);
          }
        }
      } catch (err) {
        console.error("Error loading booking store data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setSelectedDate("");
    setSelectedTime("");
    setCurrentStep(2);
  };

  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedTime("");
    setCurrentStep(3);
  };

  const handleSelectTime = (timeStr: string) => {
    setSelectedTime(timeStr);
    setCurrentStep(4);
  };

  const handleCustomerSubmit = () => {
    setCurrentStep(5);
  };

  const handleConfirmBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !customerName || !customerPhone) {
      setSubmitError("Preencha todos os campos obrigatórios antes de confirmar.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await BookingStore.createBooking({
        serviceId: selectedService.id,
        date: selectedDate,
        startTime: selectedTime,
        customerName,
        customerPhone,
        notes
      });

      if (!result.success || !result.booking) {
        setSubmitError(
          result.error || "Não foi possível concluir o agendamento. Tente novamente."
        );
        setIsSubmitting(false);
        return;
      }

      setConfirmedBooking(result.booking);
      setCurrentStep(6); // Success screen
    } catch (err) {
      setSubmitError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] pt-32 pb-16 flex flex-col items-center justify-center text-center px-4 bg-[#0f0f0f]">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-bold text-[#a1a1aa]">Carregando horários disponíveis...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0f0f0f] pb-16 min-h-screen">
      {/* Compact & Subtle Header */}
      {currentStep < 6 && (
        <div className="pt-24 sm:pt-28 pb-4 sm:pb-5 bg-gradient-to-b from-[#141416] via-[#101012] to-[#0f0f0f] border-b border-zinc-800/80 mb-5 sm:mb-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                {/* Breadcrumbs */}
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-1">
                  <Link to="/" className="hover:text-[#d4af37] transition-colors">Início</Link>
                  <span className="text-zinc-600">/</span>
                  <span className="text-[#d4af37] font-medium">Agendamento</span>
                </div>

                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-medium text-white tracking-tight">
                    Agendar Horário
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[10px] font-medium text-[#d4af37]">
                    <Sparkles className="w-2.5 h-2.5" />
                    Tempo Real
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Escolha o serviço e selecione seu horário em poucos toques.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-[#d4af37] hover:border-[#d4af37]/60 transition-all inline-flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Dúvidas?</span>
                </a>
              </div>
            </div>

            {/* Active Service Recap Pill when in steps 2 to 5 */}
            {selectedService && currentStep > 1 && (
              <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-2 text-zinc-300 flex-wrap">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37] shrink-0" />
                  <span className="font-semibold text-white">{selectedService.name}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-[#d4af37] font-semibold">{selectedService.formattedPrice}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400">{selectedService.durationMinutes} min</span>
                  {selectedDate && (
                    <>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-300">{selectedDate.split("-").reverse().join("/")}</span>
                    </>
                  )}
                  {selectedTime && (
                    <>
                      <span className="text-zinc-600">•</span>
                      <span className="text-[#d4af37] font-semibold">{selectedTime}</span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-[11px] text-[#d4af37] hover:underline font-medium ml-auto"
                >
                  Trocar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Stepper */}
        {currentStep < 6 && (
          <BookingStepper
            currentStep={currentStep}
            onStepClick={(step) => setCurrentStep(step)}
          />
        )}

        {/* Step Views */}
        <div className="mb-10">
          {currentStep === 1 && (
            <StepService
              services={services}
              selectedServiceId={selectedService?.id}
              onSelectService={handleSelectService}
            />
          )}

          {currentStep === 2 && selectedService && (
            <StepDate
              serviceDuration={selectedService.durationMinutes}
              existingBookings={existingBookings}
              blockedPeriods={blockedPeriods}
              settings={settings}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && selectedService && selectedDate && (
            <StepTime
              selectedDate={selectedDate}
              serviceDuration={selectedService.durationMinutes}
              existingBookings={existingBookings}
              blockedPeriods={blockedPeriods}
              settings={settings}
              selectedTime={selectedTime}
              onSelectTime={handleSelectTime}
              onBackToDate={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <StepCustomer
              customerName={customerName}
              customerPhone={customerPhone}
              notes={notes}
              onChangeName={setCustomerName}
              onChangePhone={setCustomerPhone}
              onChangeNotes={setNotes}
              onNext={handleCustomerSubmit}
              onBackToTime={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 5 && selectedService && selectedDate && selectedTime && (
            <StepReview
              service={selectedService}
              dateStr={selectedDate}
              timeStr={selectedTime}
              customerName={customerName}
              customerPhone={customerPhone}
              notes={notes}
              isSubmitting={isSubmitting}
              submitError={submitError}
              onConfirm={handleConfirmBooking}
              onEditStep={(step) => setCurrentStep(step)}
            />
          )}

          {currentStep === 6 && confirmedBooking && (
            <StepSuccess booking={confirmedBooking} />
          )}
        </div>

        {/* WhatsApp Direct Option Banner */}
        {currentStep < 6 && (
          <div className="max-w-sm mx-auto p-3.5 rounded-xl bg-[#141416] border border-zinc-800/80 text-center">
            <p className="text-[11px] text-zinc-400 mb-2 font-normal">
              Dúvidas ou prefere agendar conversando com o barbeiro?
            </p>
            <div className="inline-block">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-[#d4af37] hover:border-[#d4af37] transition-all min-h-[38px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
              <span className="block text-[9px] text-zinc-500 font-normal tracking-tight mt-0.5 text-center">
                agendar direto pelo chat
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
