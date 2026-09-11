import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MessageCircle, ShieldCheck } from "lucide-react";
import PageHeroHeader from "../components/PageHeroHeader";
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
      {/* Header Breadcrumb / Title */}
      {currentStep < 6 && (
        <PageHeroHeader
          breadcrumbs={[{ label: "Agendamento Online" }]}
          badge="Agendamento Online"
          title="Agendar Horário"
          description="Escolha seu serviço e encontre um horário disponível sem sair do site."
        />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stepper */}
        {currentStep < 6 && (
          <BookingStepper
            currentStep={currentStep}
            onStepClick={(step) => setCurrentStep(step)}
          />
        )}

        {/* Step Views */}
        <div className="mb-12">
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
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#18181b] border border-[#27272a] text-center">
            <p className="text-xs text-[#a1a1aa] mb-2 font-medium">
              Prefere agendar diretamente conversando com o barbeiro?
            </p>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#242428] border border-[#27272a] text-xs font-bold text-[#d4af37] hover:border-[#d4af37] transition-all min-h-[40px]"
            >
              <MessageCircle className="w-4 h-4 text-[#d4af37]" />
              <span>FALAR NO WHATSAPP</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
