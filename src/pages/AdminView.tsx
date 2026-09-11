import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Plus,
  Lock,
  Scissors,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut,
  Ban,
  Filter,
  Trash2,
  ShieldAlert,
  Loader2,
  Settings,
  RefreshCw,
  Save,
  AlertTriangle
} from "lucide-react";
import { BookingStore } from "../services/bookingStore";
import {
  Booking,
  ServiceItem,
  BusinessSettings,
  BlockedPeriod,
  BookingStatus,
  WorkingDayHours
} from "../types/booking";
import { calculateAvailableSlots, DEFAULT_BUSINESS_SETTINGS } from "../utils/availabilityEngine";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import ConfirmationModal from "../components/ConfirmationModal";

const WEEKDAYS: Array<{ key: keyof BusinessSettings["businessHours"]; label: string }> = [
  { key: "monday", label: "Segunda-feira" },
  { key: "tuesday", label: "Terça-feira" },
  { key: "wednesday", label: "Quarta-feira" },
  { key: "thursday", label: "Quinta-feira" },
  { key: "friday", label: "Sexta-feira" },
  { key: "saturday", label: "Sábado" },
  { key: "sunday", label: "Domingo" }
];

export default function AdminView() {
  const navigate = useNavigate();

  // Auth state
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  // Active Tab: 'agenda' | 'manual' | 'blocked' | 'services' | 'settings'
  const [activeTab, setActiveTab] = useState<"agenda" | "manual" | "blocked" | "services" | "settings">("agenda");

  // Data states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [blockedPeriods, setBlockedPeriods] = useState<BlockedPeriod[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Agenda Filter: 'today' | 'tomorrow' | 'all' | custom YYYY-MM-DD
  const [agendaFilter, setAgendaFilter] = useState<string>("today");

  // Manual Booking Form State
  const [manualServiceId, setManualServiceId] = useState<string>("");
  const [manualDate, setManualDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [manualTime, setManualTime] = useState<string>("");
  const [manualName, setManualName] = useState<string>("");
  const [manualPhone, setManualPhone] = useState<string>("");
  const [manualNotes, setManualNotes] = useState<string>("");
  const [manualError, setManualError] = useState<string | null>(null);
  const [manualSuccess, setManualSuccess] = useState<boolean>(false);

  // Blocked Period Form State
  const [blockDate, setBlockDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [blockStartTime, setBlockStartTime] = useState<string>("12:00");
  const [blockEndTime, setBlockEndTime] = useState<string>("13:00");
  const [isFullDay, setIsFullDay] = useState<boolean>(false);
  const [blockReason, setBlockReason] = useState<string>("Almoço / Intervalo");

  // Service Edit Modal
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    variant: "danger" | "warning" | "info" | "success";
    onConfirm: () => Promise<void>;
  } | null>(null);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  // Reschedule Modal state
  const [reschedulingBooking, setReschedulingBooking] = useState<Booking | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>("");
  const [rescheduleTime, setRescheduleTime] = useState<string>("");
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);
  const [isReschedulingSaving, setIsReschedulingSaving] = useState<boolean>(false);

  // Settings tab form state
  const [editSettings, setEditSettings] = useState<BusinessSettings | null>(null);
  const [saveSettingsLoading, setSaveSettingsLoading] = useState<boolean>(false);
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState<boolean>(false);
  const [saveSettingsError, setSaveSettingsError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        setIsAuthorized(false);
        setCheckingAuth(false);
        navigate("/admin/login");
        return;
      }

      setCurrentUser(user);
      try {
        const adminDoc = await getDoc(doc(db, "admins", user.uid));
        if (adminDoc.exists()) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error("Error checking admin authorization:", err);
        setIsAuthorized(false);
      } finally {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (isAuthorized) {
      loadAllData();
    }
  }, [isAuthorized]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [bks, srvs, blks, stts] = await Promise.all([
        BookingStore.getBookings(),
        BookingStore.getServices(),
        BookingStore.getBlockedPeriods(),
        BookingStore.getBusinessSettings()
      ]);
      setBookings(bks);
      setServices(srvs);
      setBlockedPeriods(blks);
      setSettings(stts);
      if (!editSettings) {
        setEditSettings(JSON.parse(JSON.stringify(stts)));
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    const res = await BookingStore.updateBookingStatus(bookingId, newStatus);
    if (res.success) {
      loadAllData();
    }
  };

  // Actions for Cancel / No Show
  const askCancelBooking = (bk: Booking) => {
    setConfirmModal({
      isOpen: true,
      title: "Cancelar Agendamento",
      message: `Deseja realmente cancelar o agendamento de ${bk.customerName} (${bk.serviceName} em ${bk.date} às ${bk.startTime})? O horário será liberado para novos clientes.`,
      confirmText: "Sim, Cancelar",
      variant: "danger",
      onConfirm: async () => {
        setConfirmLoading(true);
        await BookingStore.updateBookingStatus(bk.id, "cancelled");
        setConfirmLoading(false);
        setConfirmModal(null);
        loadAllData();
      }
    });
  };

  const askNoShowBooking = (bk: Booking) => {
    setConfirmModal({
      isOpen: true,
      title: "Marcar como Não Compareceu",
      message: `Deseja marcar ${bk.customerName} como 'Não Compareceu'? O registro será mantido e o horário permanecerá bloqueado no histórico.`,
      confirmText: "Confirmar Ausência",
      variant: "warning",
      onConfirm: async () => {
        setConfirmLoading(true);
        await BookingStore.updateBookingStatus(bk.id, "no_show");
        setConfirmLoading(false);
        setConfirmModal(null);
        loadAllData();
      }
    });
  };

  // Reschedule handlers
  const openRescheduleModal = (bk: Booking) => {
    setReschedulingBooking(bk);
    setRescheduleDate(bk.date);
    setRescheduleTime("");
    setRescheduleError(null);
  };

  const handleSaveReschedule = async () => {
    if (!reschedulingBooking || !rescheduleDate || !rescheduleTime) {
      setRescheduleError("Selecione a nova data e o novo horário.");
      return;
    }

    setIsReschedulingSaving(true);
    setRescheduleError(null);

    const res = await BookingStore.rescheduleBooking(
      reschedulingBooking.id,
      rescheduleDate,
      rescheduleTime
    );

    setIsReschedulingSaving(false);

    if (!res.success) {
      setRescheduleError(res.error || "Esse horário acabou de ser reservado. Escolha outro.");
    } else {
      setReschedulingBooking(null);
      loadAllData();
    }
  };

  // Manual Booking submit
  const handleCreateManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setManualError(null);
    setManualSuccess(false);

    if (!manualServiceId || !manualDate || !manualTime || !manualName || !manualPhone) {
      setManualError("Preencha todos os campos obrigatórios.");
      return;
    }

    const res = await BookingStore.createBooking({
      serviceId: manualServiceId,
      date: manualDate,
      startTime: manualTime,
      customerName: manualName,
      customerPhone: manualPhone,
      notes: manualNotes
    });

    if (!res.success) {
      setManualError(res.error || "Falha ao criar agendamento.");
    } else {
      setManualSuccess(true);
      setManualName("");
      setManualPhone("");
      setManualNotes("");
      setManualTime("");
      loadAllData();
    }
  };

  // Block period submit
  const handleCreateBlockPeriod = async (e: React.FormEvent) => {
    e.preventDefault();
    await BookingStore.addBlockedPeriod({
      professionalId: "gustavinho",
      date: blockDate,
      startTime: isFullDay ? undefined : blockStartTime,
      endTime: isFullDay ? undefined : blockEndTime,
      isFullDay,
      reason: blockReason
    });
    setBlockReason("Almoço / Intervalo");
    loadAllData();
  };

  const handleDeleteBlockPeriod = async (id: string) => {
    await BookingStore.removeBlockedPeriod(id);
    loadAllData();
  };

  // Save Settings handler
  const handleSaveSettings = async () => {
    if (!editSettings) return;
    setSaveSettingsLoading(true);
    setSaveSettingsError(null);
    setSaveSettingsSuccess(false);

    try {
      await BookingStore.saveBusinessSettings(editSettings);
      setSettings(editSettings);
      setSaveSettingsSuccess(true);
      setTimeout(() => setSaveSettingsSuccess(false), 4000);
    } catch (err) {
      console.error("Error saving business settings:", err);
      setSaveSettingsError("Erro ao salvar configurações no Firestore.");
    } finally {
      setSaveSettingsLoading(false);
    }
  };

  // Filter Bookings logic
  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrowStr = tomorrowObj.toISOString().split("T")[0];

  const filteredBookings = bookings.filter((b) => {
    if (agendaFilter === "today") return b.date === todayStr;
    if (agendaFilter === "tomorrow") return b.date === tomorrowStr;
    if (agendaFilter === "all") return true;
    return b.date === agendaFilter;
  });

  // Calculate available slots for manual booking or reschedule
  const manualServiceObj = services.find((s) => s.id === manualServiceId);
  const manualSlots =
    manualServiceObj && settings
      ? calculateAvailableSlots(
          manualDate,
          manualServiceObj.durationMinutes,
          bookings,
          blockedPeriods,
          settings
        )
      : [];

  const rescheduleAvailableSlots =
    reschedulingBooking && settings
      ? calculateAvailableSlots(
          rescheduleDate,
          reschedulingBooking.serviceDurationMinutes || 30,
          bookings.filter((b) => b.id !== reschedulingBooking.id),
          blockedPeriods,
          settings
        )
      : [];

  if (checkingAuth) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-[#0f0f0f] text-center px-4">
        <Loader2 className="w-10 h-10 text-[#d4af37] animate-spin mb-3" />
        <p className="text-xs font-bold text-[#a1a1aa]">Verificando credenciais...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-[#0f0f0f] text-center px-4">
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-900/60 max-w-md w-full space-y-4">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-lg font-extrabold text-white">Acesso Não Autorizado</h2>
          <p className="text-xs text-[#a1a1aa]">
            Seu usuário não possui permissão de Administrador no Firestore.
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full py-3 rounded-xl bg-[#242428] border border-[#27272a] text-white font-bold text-xs hover:border-[#d4af37]"
          >
            Sair e Fazer Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-16 bg-[#0f0f0f] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#27272a]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d4af37] block mb-1">
              Painel de Controle
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Gestão da Barbearia
            </h1>
            <p className="text-xs text-[#a1a1aa] mt-1">
              {currentUser?.email || "Administrador Logado"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="px-4 py-2.5 rounded-xl bg-[#18181b] border border-[#27272a] text-xs font-bold text-red-400 hover:border-red-800 transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Sair do Painel</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("agenda")}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "agenda"
                ? "bg-[#d4af37] text-[#0f0f0f] shadow-lg shadow-[#d4af37]/20"
                : "bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Agenda</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("manual")}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "manual"
                ? "bg-[#d4af37] text-[#0f0f0f] shadow-lg shadow-[#d4af37]/20"
                : "bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Novo Agendamento</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("blocked")}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "blocked"
                ? "bg-[#d4af37] text-[#0f0f0f] shadow-lg shadow-[#d4af37]/20"
                : "bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white"
            }`}
          >
            <Ban className="w-4 h-4" />
            <span>Bloquear Horários</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "services"
                ? "bg-[#d4af37] text-[#0f0f0f] shadow-lg shadow-[#d4af37]/20"
                : "bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white"
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Serviços & Preços</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (settings && !editSettings) {
                setEditSettings(JSON.parse(JSON.stringify(settings)));
              }
              setActiveTab("settings");
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "settings"
                ? "bg-[#d4af37] text-[#0f0f0f] shadow-lg shadow-[#d4af37]/20"
                : "bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configurações</span>
          </button>
        </div>

        {/* TAB 1: AGENDA */}
        {activeTab === "agenda" && (
          <div>
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-bold text-[#a1a1aa] mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filtrar Data:
              </span>

              <button
                type="button"
                onClick={() => setAgendaFilter("today")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  agendaFilter === "today"
                    ? "bg-[#d4af37] text-[#0f0f0f]"
                    : "bg-[#18181b] text-[#a1a1aa] border border-[#27272a] hover:text-white"
                }`}
              >
                Hoje
              </button>

              <button
                type="button"
                onClick={() => setAgendaFilter("tomorrow")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  agendaFilter === "tomorrow"
                    ? "bg-[#d4af37] text-[#0f0f0f]"
                    : "bg-[#18181b] text-[#a1a1aa] border border-[#27272a] hover:text-white"
                }`}
              >
                Amanhã
              </button>

              <button
                type="button"
                onClick={() => setAgendaFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  agendaFilter === "all"
                    ? "bg-[#d4af37] text-[#0f0f0f]"
                    : "bg-[#18181b] text-[#a1a1aa] border border-[#27272a] hover:text-white"
                }`}
              >
                Todos
              </button>

              <input
                type="date"
                value={
                  agendaFilter !== "today" && agendaFilter !== "tomorrow" && agendaFilter !== "all"
                    ? agendaFilter
                    : ""
                }
                onChange={(e) => e.target.value && setAgendaFilter(e.target.value)}
                className="bg-[#18181b] border border-[#27272a] rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Bookings Grid */}
            {filteredBookings.length === 0 ? (
              <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-12 text-center text-[#a1a1aa]">
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#d4af37]" />
                <p className="text-sm font-bold text-white">Nenhum agendamento encontrado</p>
                <p className="text-xs mt-1">
                  Não há horários marcados para o filtro selecionado.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBookings.map((bk) => (
                  <div
                    key={bk.id}
                    className="bg-[#18181b] border border-[#27272a] rounded-2xl p-5 space-y-4 hover:border-[#d4af37]/40 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase text-[#d4af37] tracking-wider block">
                          {bk.bookingCode || "#GDC-AGEND"}
                        </span>
                        <h3 className="font-extrabold text-base text-white">{bk.customerName}</h3>
                        <p className="text-xs text-[#a1a1aa] flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-[#d4af37]" />
                          {bk.customerPhone}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-white bg-[#242428] px-2.5 py-1 rounded-lg border border-[#27272a] block">
                          {bk.startTime}
                        </span>
                        <span className="text-[10px] text-[#a1a1aa] mt-1 block font-medium">
                          {bk.date}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#242428]/60 p-3 rounded-xl border border-[#27272a]/60 space-y-1">
                      <p className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Scissors className="w-3.5 h-3.5 text-[#d4af37]" />
                        {bk.serviceName}
                      </p>
                      <p className="text-[11px] text-[#a1a1aa] font-semibold">
                        Valor: R$ {bk.servicePrice?.toFixed(2)} • {bk.serviceDurationMinutes} min
                      </p>
                      {bk.notes && (
                        <p className="text-[10px] text-[#a1a1aa] italic pt-1 border-t border-[#27272a]/40">
                          Obs: {bk.notes}
                        </p>
                      )}
                    </div>

                    {/* Status & Actions */}
                    <div className="pt-3 border-t border-[#27272a] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-[#a1a1aa]">Status:</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            bk.status === "confirmed"
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : bk.status === "completed"
                              ? "bg-blue-950 text-blue-400 border border-blue-800"
                              : bk.status === "no_show"
                              ? "bg-amber-950 text-amber-400 border border-amber-800"
                              : "bg-red-950 text-red-400 border border-red-800"
                          }`}
                        >
                          {bk.status === "confirmed"
                            ? "Confirmado"
                            : bk.status === "completed"
                            ? "Concluído"
                            : bk.status === "no_show"
                            ? "Não Compareceu"
                            : "Cancelado"}
                        </span>
                      </div>

                      {/* Primary Actions Grid */}
                      <div className="grid grid-cols-3 gap-1.5">
                        <a
                          href={`tel:${bk.customerPhone.replace(/\D/g, "")}`}
                          className="p-2 rounded-lg bg-[#242428] text-center text-[10px] font-bold text-white hover:border-[#d4af37] border border-[#27272a] transition-colors flex items-center justify-center min-h-[38px]"
                        >
                          Ligar
                        </a>
                        <a
                          href={`https://wa.me/55${bk.customerPhone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-[#242428] text-center text-[10px] font-bold text-[#d4af37] hover:border-[#d4af37] border border-[#27272a] transition-colors flex items-center justify-center min-h-[38px]"
                        >
                          WhatsApp
                        </a>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(bk.id, "completed")}
                          disabled={bk.status === "completed"}
                          className="p-2 rounded-lg bg-emerald-950/60 text-center text-[10px] font-bold text-emerald-400 border border-emerald-800 hover:bg-emerald-950 transition-colors disabled:opacity-40 min-h-[38px]"
                        >
                          Concluir
                        </button>
                      </div>

                      {/* Secondary Actions (Remarcar, Cancelar, Não Compareceu) */}
                      {bk.status === "confirmed" && (
                        <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-[#27272a]/40">
                          <button
                            type="button"
                            onClick={() => openRescheduleModal(bk)}
                            className="p-2 rounded-lg bg-[#242428] text-center text-[10px] font-bold text-[#d4af37] hover:border-[#d4af37] border border-[#27272a] transition-colors flex items-center justify-center min-h-[38px]"
                          >
                            Remarcar
                          </button>
                          <button
                            type="button"
                            onClick={() => askCancelBooking(bk)}
                            className="p-2 rounded-lg bg-red-950/60 text-center text-[10px] font-bold text-red-300 border border-red-800 hover:bg-red-950 transition-colors flex items-center justify-center min-h-[38px]"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            onClick={() => askNoShowBooking(bk)}
                            className="p-2 rounded-lg bg-amber-950/60 text-center text-[10px] font-bold text-amber-300 border border-amber-800 hover:bg-amber-950 transition-colors flex items-center justify-center min-h-[38px]"
                          >
                            Não Compareceu
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MANUAL BOOKING */}
        {activeTab === "manual" && (
          <div className="max-w-xl mx-auto bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-black text-white mb-2">Agendamento Manual</h2>
            <p className="text-xs text-[#a1a1aa] mb-6">
              Agende um cliente diretamente pelo painel (atendimento presencial ou por telefone).
            </p>

            {manualSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>Agendamento criado com sucesso!</span>
              </div>
            )}

            {manualError && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-400 text-xs font-bold mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{manualError}</span>
              </div>
            )}

            <form onSubmit={handleCreateManualBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                  Serviço *
                </label>
                <select
                  value={manualServiceId}
                  onChange={(e) => setManualServiceId(e.target.value)}
                  className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="">Selecione um serviço...</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.formattedPrice} • {s.durationMinutes} min)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                    Data *
                  </label>
                  <input
                    type="date"
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                    Horário Disponível *
                  </label>
                  <select
                    value={manualTime}
                    onChange={(e) => setManualTime(e.target.value)}
                    disabled={!manualServiceId || manualSlots.length === 0}
                    className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] disabled:opacity-40"
                  >
                    <option value="">
                      {!manualServiceId
                        ? "Selecione o serviço primeiro"
                        : manualSlots.length === 0
                        ? "Nenhum horário livre nesta data"
                        : "Selecione o horário..."}
                    </option>
                    {manualSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                  Nome do Cliente *
                </label>
                <input
                  type="text"
                  placeholder="Ex: João Silva"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                  Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  placeholder="(41) 99999-9999"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                  Observações
                </label>
                <textarea
                  placeholder="Instruções ou preferências do cliente..."
                  rows={2}
                  value={manualNotes}
                  onChange={(e) => setManualNotes(e.target.value)}
                  className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-extrabold text-xs hover:bg-[#e5c158] transition-all min-h-[48px]"
              >
                CRIAR AGENDAMENTO
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: BLOCKED PERIODS */}
        {activeTab === "blocked" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-[#18181b] border border-[#27272a] rounded-2xl p-6">
              <h2 className="text-lg font-black text-white mb-2">Bloquear Horário / Dia</h2>
              <p className="text-xs text-[#a1a1aa] mb-6">
                Bloqueie intervalos específicos para almoço, feriados ou imprevistos.
              </p>

              <form onSubmit={handleCreateBlockPeriod} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                    Data *
                  </label>
                  <input
                    type="date"
                    value={blockDate}
                    onChange={(e) => setBlockDate(e.target.value)}
                    className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1 pb-1">
                  <input
                    type="checkbox"
                    id="fullDay"
                    checked={isFullDay}
                    onChange={(e) => setIsFullDay(e.target.checked)}
                    className="rounded bg-[#242428] border-[#27272a] text-[#d4af37] focus:ring-0"
                  />
                  <label htmlFor="fullDay" className="text-xs font-bold text-white cursor-pointer">
                    Bloquear o dia inteiro
                  </label>
                </div>

                {!isFullDay && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                        Início
                      </label>
                      <input
                        type="time"
                        value={blockStartTime}
                        onChange={(e) => setBlockStartTime(e.target.value)}
                        className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                        Fim
                      </label>
                      <input
                        type="time"
                        value={blockEndTime}
                        onChange={(e) => setBlockEndTime(e.target.value)}
                        className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                    Motivo
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Almoço, Curso, Feriado..."
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 font-extrabold text-xs hover:bg-red-900/60 transition-all min-h-[48px]"
                >
                  CONFIRMAR BLOQUEIO
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-black text-white">Bloqueios Ativos</h2>
              {blockedPeriods.length === 0 ? (
                <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-8 text-center text-[#a1a1aa]">
                  <p className="text-xs">Nenhum período bloqueado no momento.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {blockedPeriods.map((bp) => (
                    <div
                      key={bp.id}
                      className="bg-[#18181b] border border-[#27272a] p-4 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-extrabold text-white block">
                          Data: {bp.date}
                        </span>
                        <span className="text-xs text-[#d4af37] font-bold block mt-0.5">
                          {bp.isFullDay
                            ? "Dia Inteiro Bloqueado"
                            : `${bp.startTime} às ${bp.endTime}`}
                        </span>
                        {bp.reason && (
                          <span className="text-[11px] text-[#a1a1aa] block mt-1">
                            Motivo: {bp.reason}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteBlockPeriod(bp.id)}
                        className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-950/40"
                        title="Remover Bloqueio"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SERVICES MANAGER */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-extrabold text-white">Serviços da Barbearia</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s) => (
                <div key={s.id} className="bg-[#18181b] border border-[#27272a] p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white">{s.name}</h3>
                    <p className="text-xs text-[#d4af37] font-black">{s.formattedPrice} • {s.durationMinutes} min</p>
                    <p className="text-xs text-[#a1a1aa] mt-2">{s.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between">
                    <span className={`text-[10px] font-bold ${s.active ? "text-emerald-400" : "text-red-400"}`}>
                      {s.active ? "Ativo" : "Inativo"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingService(s)}
                      className="text-xs font-bold text-[#d4af37] hover:underline"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CONFIGURAÇÕES */}
        {activeTab === "settings" && editSettings && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-black text-white">Configurações do Atendimento</h2>
                <p className="text-xs text-[#a1a1aa] mt-1">
                  Gerencie os horários de funcionamento, intervalos de almoço e regras de agendamento online.
                </p>
              </div>

              {saveSettingsSuccess && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Configurações salvas no Firestore com sucesso!</span>
                </div>
              )}

              {saveSettingsError && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-400 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{saveSettingsError}</span>
                </div>
              )}

              {/* General Rules */}
              <div className="space-y-4 pt-2 border-t border-[#27272a]">
                <h3 className="text-sm font-extrabold text-[#d4af37] uppercase tracking-wider">
                  Regras Gerais de Agendamento
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                      Intervalo de Horários (minutos)
                    </label>
                    <select
                      value={editSettings.slotIntervalMinutes}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          slotIntervalMinutes: Number(e.target.value)
                        })
                      }
                      className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value={15}>15 em 15 minutos</option>
                      <option value={30}>30 em 30 minutos</option>
                      <option value={45}>45 em 45 minutos</option>
                      <option value={60}>60 em 60 minutos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                      Antecedência Mínima (minutos)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={editSettings.minimumAdvanceMinutes}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          minimumAdvanceMinutes: Number(e.target.value)
                        })
                      }
                      className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                      Dias de Agendamento à Frente
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={90}
                      value={editSettings.maximumAdvanceDays}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          maximumAdvanceDays: Number(e.target.value)
                        })
                      }
                      className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>

              {/* Weekly Business Hours */}
              <div className="space-y-4 pt-4 border-t border-[#27272a]">
                <h3 className="text-sm font-extrabold text-[#d4af37] uppercase tracking-wider">
                  Horário de Funcionamento Semanal
                </h3>

                <div className="space-y-4">
                  {WEEKDAYS.map(({ key, label }) => {
                    const dayConfig: WorkingDayHours = editSettings.businessHours[key] || {
                      isOpen: false,
                      slots: []
                    };

                    const handleToggleOpen = (isOpen: boolean) => {
                      const newSlots = isOpen && dayConfig.slots.length === 0
                        ? [{ start: "09:00", end: "19:00" }]
                        : dayConfig.slots;

                      setEditSettings({
                        ...editSettings,
                        businessHours: {
                          ...editSettings.businessHours,
                          [key]: {
                            isOpen,
                            slots: newSlots
                          }
                        }
                      });
                    };

                    const handleAddSlot = () => {
                      setEditSettings({
                        ...editSettings,
                        businessHours: {
                          ...editSettings.businessHours,
                          [key]: {
                            ...dayConfig,
                            slots: [...dayConfig.slots, { start: "14:00", end: "19:00" }]
                          }
                        }
                      });
                    };

                    const handleRemoveSlot = (index: number) => {
                      const newSlots = dayConfig.slots.filter((_, idx) => idx !== index);
                      setEditSettings({
                        ...editSettings,
                        businessHours: {
                          ...editSettings.businessHours,
                          [key]: {
                            ...dayConfig,
                            isOpen: newSlots.length > 0 ? dayConfig.isOpen : false,
                            slots: newSlots
                          }
                        }
                      });
                    };

                    const handleUpdateSlot = (index: number, field: "start" | "end", val: string) => {
                      const newSlots = [...dayConfig.slots];
                      newSlots[index] = { ...newSlots[index], [field]: val };
                      setEditSettings({
                        ...editSettings,
                        businessHours: {
                          ...editSettings.businessHours,
                          [key]: {
                            ...dayConfig,
                            slots: newSlots
                          }
                        }
                      });
                    };

                    return (
                      <div
                        key={key}
                        className="p-4 rounded-xl bg-[#242428] border border-[#27272a] space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-white">{label}</span>
                          <div className="flex items-center gap-2">
                            <label className="text-xs font-bold text-[#a1a1aa] cursor-pointer">
                              {dayConfig.isOpen ? "Aberto" : "Fechado"}
                            </label>
                            <input
                              type="checkbox"
                              checked={dayConfig.isOpen}
                              onChange={(e) => handleToggleOpen(e.target.checked)}
                              className="w-4 h-4 rounded bg-[#18181b] border-[#27272a] text-[#d4af37] focus:ring-0"
                            />
                          </div>
                        </div>

                        {dayConfig.isOpen && (
                          <div className="space-y-2 pt-2 border-t border-[#27272a]/60">
                            {dayConfig.slots.map((slot, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <span className="text-[10px] font-bold text-[#a1a1aa] w-14">
                                  Turno {index + 1}:
                                </span>
                                <input
                                  type="time"
                                  value={slot.start}
                                  onChange={(e) =>
                                    handleUpdateSlot(index, "start", e.target.value)
                                  }
                                  className="bg-[#18181b] border border-[#27272a] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                                />
                                <span className="text-xs text-[#a1a1aa]">até</span>
                                <input
                                  type="time"
                                  value={slot.end}
                                  onChange={(e) =>
                                    handleUpdateSlot(index, "end", e.target.value)
                                  }
                                  className="bg-[#18181b] border border-[#27272a] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSlot(index)}
                                  className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-950/40"
                                  title="Remover Turno"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={handleAddSlot}
                              className="text-[11px] font-bold text-[#d4af37] hover:underline flex items-center gap-1 pt-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Adicionar Turno / Intervalo de Almoço
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#27272a]">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  disabled={saveSettingsLoading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-extrabold text-xs hover:bg-[#e5c158] transition-all flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saveSettingsLoading ? "Salvando..." : "SALVAR CONFIGURAÇÕES"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmText={confirmModal.confirmText}
          cancelText="Voltar"
          variant={confirmModal.variant}
          loading={confirmLoading}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal(null)}
        />
      )}

      {/* Reschedule Modal */}
      {reschedulingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#18181b] border border-[#27272a] rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-start justify-between border-b border-[#27272a] pb-3">
              <div>
                <h2 className="text-lg font-black text-white">Remarcar Atendimento</h2>
                <p className="text-xs text-[#a1a1aa]">
                  Cliente: <strong className="text-white">{reschedulingBooking.customerName}</strong> • {reschedulingBooking.serviceName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setReschedulingBooking(null)}
                className="text-[#a1a1aa] hover:text-white p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {rescheduleError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{rescheduleError}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                  Nova Data *
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => {
                    setRescheduleDate(e.target.value);
                    setRescheduleTime("");
                  }}
                  className="w-full bg-[#242428] border border-[#27272a] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-1">
                  Novo Horário Disponível *
                </label>
                {rescheduleAvailableSlots.length === 0 ? (
                  <p className="text-xs text-red-400 font-bold bg-red-950/40 p-3 rounded-xl border border-red-900/40">
                    Nenhum horário livre disponível na data selecionada. Escolha outra data.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
                    {rescheduleAvailableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setRescheduleTime(slot)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          rescheduleTime === slot
                            ? "bg-[#d4af37] text-[#0f0f0f] border-[#d4af37]"
                            : "bg-[#242428] text-white border-[#27272a] hover:border-[#d4af37]"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#27272a]">
              <button
                type="button"
                onClick={() => setReschedulingBooking(null)}
                disabled={isReschedulingSaving}
                className="px-5 py-3 rounded-xl bg-[#242428] border border-[#27272a] text-white text-xs font-bold hover:border-[#d4af37] min-h-[48px]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveReschedule}
                disabled={!rescheduleTime || isReschedulingSaving}
                className="px-6 py-3 rounded-xl bg-[#d4af37] text-[#0f0f0f] font-extrabold text-xs hover:bg-[#e5c158] transition-all disabled:opacity-40 min-h-[48px]"
              >
                {isReschedulingSaving ? "Salvando..." : "CONFIRMAR REMARCAÇÃO"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
