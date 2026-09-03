import { useState, useEffect, useRef } from "react";
import {
    fetchDoctors,
    fetchSpecialties,
    addDoctor,
    updateDoctor,
    toggleDoctorStatus,
    deleteDoctor,
    fetchDoctorSchedule,
    saveDoctorSchedule,
    deleteDoctorScheduleDate,
} from "../../../api/clinicDoctorsApi";
import { fetchClinicHours } from "../../../api/clinicProfileApi";
import ModernAlertModal from "../../../components/ModernAlertModal";

/**
 * ClinicDoctors – Doctor Management page
 *
 * Displays doctor cards in a responsive grid.
 * Supports:
 *   • Add New Doctor     → profile modal (empty)
 *   • Edit Profile       → profile modal (pre-filled)
 *   • Manage Working Hrs → schedule modal
 *   • Activate / Deactivate toggle
 */
export default function ClinicDoctors() {
    // ── State ────────────────────────────────────────────────────────────────
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [clinicHours, setClinicHours] = useState([]);
    const [loading, setLoading] = useState(true);

    // Which card's 3-dot menu is open (doctorId or null)
    const [openMenuId, setOpenMenuId] = useState(null);

    // Profile modal (add / edit)
    const [profileModal, setProfileModal] = useState({
        open: false,
        editingDoctor: null, // null → add mode
    });

    // Working-hours modal
    const [scheduleModal, setScheduleModal] = useState({
        open: false,
        doctorId: null,
        doctorName: "",
        schedule: [],
    });

    const [deleteModal, setDeleteModal] = useState({
        open: false,
        doctor: null,
    });

    const [alertModal, setAlertModal] = useState({
        open: false,
        title: "",
        message: "",
        type: "error"
    });

    const showAlert = (message, title = "Action Failed", type = "error") => {
        setAlertModal({ open: true, title, message, type });
    };

    // ── Load data on mount ───────────────────────────────────────────────────
    useEffect(() => {
        async function load() {
            try {
                const [docs, specs, hours] = await Promise.all([
                    fetchDoctors(),
                    fetchSpecialties(),
                    fetchClinicHours(),
                ]);
                setDoctors(docs);
                setSpecialties(specs);
                setClinicHours(hours);
            } catch (err) {
                console.error("Failed to load doctors:", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // Close 3-dot menu on outside click
    useEffect(() => {
        function handleClick() {
            setOpenMenuId(null);
        }
        if (openMenuId) {
            document.addEventListener("click", handleClick);
            return () => document.removeEventListener("click", handleClick);
        }
    }, [openMenuId]);

    // ── Handlers ─────────────────────────────────────────────────────────────

    function openAddDoctor() {
        setProfileModal({ open: true, editingDoctor: null });
    }

    function openEditDoctor(doctor) {
        setOpenMenuId(null);
        setProfileModal({ open: true, editingDoctor: doctor });
    }

    async function handleProfileSave({ fullName, specialty, bio }) {
        try {
            if (profileModal.editingDoctor) {
                const updated = await updateDoctor(profileModal.editingDoctor.id, {
                    fullName,
                    specialty,
                    bio,
                });
                setDoctors((prev) =>
                    prev.map((d) =>
                        d.id === updated.id ? { ...d, ...updated } : d
                    )
                );
            } else {
                const created = await addDoctor({ fullName, specialty, bio });
                setDoctors((prev) => [...prev, created]);
            }
            setProfileModal({ open: false, editingDoctor: null });
        } catch (err) {
            console.error("Save failed:", err);
            showAlert(err.message, "Save Failed", "error");
        }
    }

    async function handleToggleStatus(doctor) {
        setOpenMenuId(null);
        try {
            const nextActive = !doctor.isActive;
            const result = await toggleDoctorStatus(doctor.id, nextActive);
            const resolvedActive = result?.isActive !== undefined ? result.isActive : nextActive;
            setDoctors((prev) =>
                prev.map((d) =>
                    d.id === doctor.id ? { ...d, isActive: resolvedActive } : d
                )
            );
        } catch (err) {
            console.error("Toggle status failed:", err);
            showAlert(err.message, "Status Update Failed", "error");
        }
    }

    function handleDeleteDoctor(doctor) {
        setOpenMenuId(null);
        setDeleteModal({ open: true, doctor });
    }

    async function confirmDelete() {
        if (deleteModal.doctor) {
            try {
                await deleteDoctor(deleteModal.doctor.id);
                setDoctors((prev) => prev.filter((d) => d.id !== deleteModal.doctor.id));
            } catch (err) {
                console.error("Failed to delete doctor:", err);
                showAlert(err.message, "Delete Failed", "error");
            }
        }
        setDeleteModal({ open: false, doctor: null });
    }

    async function openScheduleModal(doctor) {
        setOpenMenuId(null);
        try {
            const schedule = await fetchDoctorSchedule(doctor.id);
            setScheduleModal({
                open: true,
                doctorId: doctor.id,
                doctorName: doctor.fullName,
                schedule,
            });
        } catch (err) {
            console.error("Failed to load schedule:", err);
        }
    }

    function handleDayToggle(dayIndex) {
        setScheduleModal((prev) => {
            const updatedSchedule = prev.schedule.map((day, di) => {
                if (di !== dayIndex) return day;

                // Get default bounds based on clinic hours
                const [year, month, dayNum] = day.isoDate.split('-');
                const dateObj = new Date(year, month - 1, dayNum);
                const javaDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
                const dayOfWeekStr = javaDays[dateObj.getDay()];
                const clinicDay = clinicHours.find(h => h.dayOfWeek === dayOfWeekStr);

                const defaultStart = clinicDay ? clinicDay.startTime.substring(0, 5) : "09:00";
                const defaultEnd = clinicDay ? clinicDay.endTime.substring(0, 5) : "17:00";

                return {
                    ...day,
                    isActive: !day.isActive,
                    startTime: !day.isActive && !day.startTime ? defaultStart : day.startTime,
                    endTime: !day.isActive && !day.endTime ? defaultEnd : day.endTime,
                };
            });
            return { ...prev, schedule: updatedSchedule };
        });
    }

    function handleTimeChange(dayIndex, field, value) {
        setScheduleModal((prev) => {
            const updatedSchedule = prev.schedule.map((day, di) => {
                if (di !== dayIndex) return day;
                return { ...day, [field]: value };
            });
            return { ...prev, schedule: updatedSchedule };
        });
    }

    async function handleScheduleSave() {
        try {
            const savePromises = scheduleModal.schedule.map(day => {
                const specificDateStr = day.isoDate;

                if (day.isActive && day.startTime && day.endTime) {
                    // Append :00 to match LocalTime expected format
                    const startTimeStr = day.startTime.length === 5 ? `${day.startTime}:00` : day.startTime;
                    const endTimeStr = day.endTime.length === 5 ? `${day.endTime}:00` : day.endTime;
                    return saveDoctorSchedule(scheduleModal.doctorId, specificDateStr, startTimeStr, endTimeStr);
                } else {
                    // Delete the schedule for this day if it's marked inactive
                    // Catch errors in case it doesn't exist on the backend yet
                    return deleteDoctorScheduleDate(scheduleModal.doctorId, specificDateStr, day.startTime, day.endTime).catch(() => { });
                }
            });

            await Promise.all(savePromises);
            setScheduleModal({ open: false, doctorId: null, doctorName: "", schedule: [] });
            // Optionally could show a success toast here
        } catch (err) {
            console.error("Failed to save schedule:", err);
            showAlert(err.message, "Failed to Save Schedule", "error");
        }
    }

    // ── Render ────────────────────────────────────────────────────────────────

    const totalDoctors = doctors.length;

    return (
        <div className="p-8 lg:p-10 max-w-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-3xl lg:text-[2.2rem] font-bold text-gray-900 tracking-tight">
                        Doctor Management
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage credentials, specialties, and active status for{" "}
                        <span className="font-medium text-gray-700">{totalDoctors}</span>{" "}
                        clinical professionals.
                    </p>
                </div>
                <button
                    onClick={openAddDoctor}
                    className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-blue-900/20 transition-all duration-200 hover:shadow-xl hover:shadow-blue-900/30 cursor-pointer whitespace-nowrap"
                >
                    <PlusIcon />
                    Add New Doctor
                </button>
            </div>

            {/* Doctor cards grid */}
            {loading ? (
                <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
                    Loading doctors…
                </div>
            ) : doctors.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 text-gray-400">
                    <p className="text-sm">No doctors added yet.</p>
                    <button
                        onClick={openAddDoctor}
                        className="mt-3 text-blue-600 text-sm font-medium hover:underline cursor-pointer"
                    >
                        + Add your first doctor
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {doctors.map((doc) => (
                        <DoctorCard
                            key={doc.id}
                            doctor={doc}
                            isMenuOpen={openMenuId === doc.id}
                            onToggleMenu={(e) => {
                                e.stopPropagation();
                                setOpenMenuId((prev) => (prev === doc.id ? null : doc.id));
                            }}
                            onEdit={() => openEditDoctor(doc)}
                            onManageHours={() => openScheduleModal(doc)}
                            onToggleStatus={() => handleToggleStatus(doc)}
                            onDelete={() => handleDeleteDoctor(doc)}
                        />
                    ))}
                </div>
            )}

            {/* ─── Profile Modal (Add / Edit) ─── */}
            {profileModal.open && (
                <ProfileModal
                    doctor={profileModal.editingDoctor}
                    specialties={specialties}
                    onSave={handleProfileSave}
                    onClose={() => setProfileModal({ open: false, editingDoctor: null })}
                />
            )}

            {/* ─── Working Hours Modal ─── */}
            {scheduleModal.open && (
                <ScheduleModal
                    doctorName={scheduleModal.doctorName}
                    schedule={scheduleModal.schedule}
                    clinicHours={clinicHours}
                    onDayToggle={handleDayToggle}
                    onTimeChange={handleTimeChange}
                    onSave={handleScheduleSave}
                    onClose={() =>
                        setScheduleModal({ open: false, doctorId: null, doctorName: "", schedule: [] })
                    }
                />
            )}

            {/* ─── Delete Confirm Modal ─── */}
            {deleteModal.open && (
                <ConfirmModal
                    title="Delete Doctor"
                    message={`Are you sure you want to delete ${deleteModal.doctor?.fullName}? This action cannot be undone.`}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteModal({ open: false, doctor: null })}
                />
            )}

            {/* ─── Modern Alert Modal ─── */}
            <ModernAlertModal
                isOpen={alertModal.open}
                title={alertModal.title}
                message={alertModal.message}
                type={alertModal.type}
                onClose={() => setAlertModal(prev => ({ ...prev, open: false }))}
            />
        </div>
    );
}


/* ══════════════════════════════════════════════════════════════════════════════
   Sub-components
   ══════════════════════════════════════════════════════════════════════════════ */

/** ─── Doctor Card ─── */
function DoctorCard({ doctor, isMenuOpen, onToggleMenu, onEdit, onManageHours, onToggleStatus, onDelete }) {
    const menuRef = useRef(null);

    return (
        <div className={`relative bg-white rounded-2xl border p-5 transition-all duration-300 group ${doctor.isActive
            ? "border-gray-200/80 hover:shadow-lg hover:shadow-gray-200/60"
            : "border-gray-200/60 bg-gray-50/40 hover:shadow-md"
            }`}>
            {/* Top row: avatar + name + menu */}
            <div className="flex items-start gap-3">
                <DoctorAvatar doctor={doctor} />
                <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-bold leading-tight ${doctor.isActive ? "text-gray-900" : "text-gray-500"}`}>
                        {doctor.fullName}
                    </h3>
                    <p className="text-xs font-medium text-amber-700 mt-0.5">
                        {doctor.specialty}
                    </p>
                </div>
                {/* 3-dot menu trigger */}
                <button
                    ref={menuRef}
                    onClick={onToggleMenu}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                    <ThreeDotsIcon />
                </button>
            </div>

            {/* Bio excerpt */}
            <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                {doctor.bio}
            </p>

            {/* Status badge */}
            <div className="mt-4">
                <StatusBadge isActive={doctor.isActive} />
            </div>

            {/* Dropdown menu */}
            {isMenuOpen && (
                <div className="absolute right-4 top-14 z-20 bg-white rounded-xl shadow-xl shadow-gray-200/80 border border-gray-100 py-1.5 min-w-[180px] animate-[fadeIn_0.15s_ease-out]">
                    <DropdownItem
                        icon={<EditIcon />}
                        label="Edit Profile"
                        onClick={onEdit}
                    />
                    <DropdownItem
                        icon={<ClockIcon />}
                        label="Manage Working Hours"
                        onClick={onManageHours}
                    />
                    <div className="mx-3 my-1 border-t border-gray-100" />
                    <DropdownItem
                        icon={doctor.isActive ? <DeactivateIcon /> : <ActivateIcon />}
                        label={doctor.isActive ? "Deactivate" : "Activate"}
                        onClick={onToggleStatus}
                        danger={doctor.isActive}
                    />
                    <DropdownItem
                        icon={<TrashIcon />}
                        label="Delete"
                        onClick={onDelete}
                        danger={true}
                    />
                </div>
            )}
        </div>
    );
}

/** ─── Doctor Avatar ─── */
function DoctorAvatar({ doctor, size = 44 }) {
    if (doctor.avatarUrl) {
        return (
            <img
                src={doctor.avatarUrl}
                alt={doctor.fullName}
                className="rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
                style={{ width: size, height: size }}
            />
        );
    }

    const colors = [
        "bg-blue-100 text-blue-700",
        "bg-emerald-100 text-emerald-700",
        "bg-amber-100 text-amber-700",
        "bg-violet-100 text-violet-700",
        "bg-rose-100 text-rose-700",
        "bg-cyan-100 text-cyan-700",
    ];
    const colorIndex =
        doctor.fullName.split("").reduce((s, c) => s + c.charCodeAt(0), 0) % colors.length;

    const initials = doctor.initials || doctor.fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

    return (
        <div
            className={`rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${colors[colorIndex]}`}
            style={{ width: size, height: size }}
        >
            {initials}
        </div>
    );
}

/** ─── Status Badge ─── */
function StatusBadge({ isActive }) {
    return (
        <span
            className={`
                inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200
                ${isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-gray-100 text-gray-500 border border-gray-300"
                }
            `}
        >
            <span
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${isActive ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-gray-400"
                    }`}
            />
            {isActive ? "Active" : "Inactive"}
        </span>
    );
}

/** ─── Dropdown Item ─── */
function DropdownItem({ icon, label, onClick, danger = false }) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium transition-colors cursor-pointer
                ${danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-50"
                }
            `}
        >
            {icon}
            {label}
        </button>
    );
}


/* ══════════════════════════════════════════════════════════════════════════════
   Modals
   ══════════════════════════════════════════════════════════════════════════════ */

/** ─── Profile Modal (Add / Edit Doctor) ─── */
function ProfileModal({ doctor, specialties, onSave, onClose }) {
    const [fullName, setFullName] = useState(doctor?.fullName || "");

    // Parse existing comma-separated specialties or default to empty array
    const [selectedSpecialties, setSelectedSpecialties] = useState(() => {
        if (doctor?.specialty) {
            return doctor.specialty.split(',').map(s => s.trim()).filter(Boolean);
        }
        return [];
    });
    const [fallbackSpecialty, setFallbackSpecialty] = useState(doctor?.specialty || "");

    const [bio, setBio] = useState(doctor?.bio || "");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const toggleSpecialty = (s) => {
        setError(""); // clear error on change
        setSelectedSpecialties(prev =>
            prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
        );
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!fullName.trim()) return;

        const finalSpecialty = (specialties && specialties.length > 0)
            ? selectedSpecialties.join(", ")
            : fallbackSpecialty;

        if (!finalSpecialty.trim()) {
            setError("Please select at least one specialty.");
            return;
        }

        setSaving(true);
        await onSave({ fullName: fullName.trim(), specialty: finalSpecialty, bio: bio.trim() });
        setSaving(false);
    }

    return (
        <ModalBackdrop onClose={onClose}>
            <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] mx-4 p-7 animate-[scaleIn_0.2s_ease-out]"
            >
                <h2 className="text-lg font-bold text-gray-900 mb-6">Doctor Profile</h2>

                {/* Full Name */}
                <label className="block mb-4">
                    <span className="text-xs font-semibold text-blue-700 mb-1 block">Full Name</span>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                        placeholder="Enter doctor's full name"
                        required
                    />
                </label>

                {/* Specialty */}
                <label className="block mb-4">
                    <span className="text-xs font-semibold text-blue-700 mb-2 block">Specialties</span>
                    {specialties && specialties.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {specialties.map((s) => {
                                const isSelected = selectedSpecialties.includes(s);
                                return (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => toggleSpecialty(s)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${isSelected
                                            ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                            } flex items-center gap-1.5 cursor-pointer`}
                                    >
                                        <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300 bg-white'}`}>
                                            {isSelected && (
                                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            )}
                                        </div>
                                        {s}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <input
                            type="text"
                            value={fallbackSpecialty}
                            onChange={(e) => setFallbackSpecialty(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                            placeholder="e.g. General Dentistry, Orthodontics"
                        />
                    )}
                </label>

                {/* Brief Bio */}
                <label className="block mb-6">
                    <span className="text-xs font-semibold text-blue-700 mb-1 block">Brief Bio</span>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-gray-50"
                        placeholder="Short description of the doctor's experience"
                    />
                </label>

                {error && (
                    <div className="mb-6 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2 animate-[scaleIn_0.2s_ease-out]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {error}
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-center gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 disabled:opacity-60 cursor-pointer"
                    >
                        {saving ? "Saving…" : "Save"}
                    </button>
                </div>
            </form>
        </ModalBackdrop>
    );
}


function generateTimeOptions(minTime, maxTime) {
    const options = [];
    let startHour = 0;
    let endHour = 23;

    if (minTime) {
        startHour = parseInt(minTime.split(":")[0], 10);
    }
    if (maxTime) {
        endHour = parseInt(maxTime.split(":")[0], 10);
    }

    for (let h = startHour; h <= endHour; h++) {
        const hourStr = h.toString().padStart(2, '0');
        const timeVal = `${hourStr}:00`;
        const ampm = h >= 12 ? 'PM' : 'AM';
        const displayHour = h % 12 || 12;
        const displayStr = `${displayHour.toString().padStart(2, '0')}:00 ${ampm}`;
        options.push({ value: timeVal, label: displayStr });
    }
    return options;
}

/** ─── Schedule / Working Hours Modal ─── */
function ScheduleModal({ doctorName, schedule, clinicHours, onDayToggle, onTimeChange, onSave, onClose }) {
    return (
        <ModalBackdrop onClose={onClose}>
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] mx-4 p-7 animate-[scaleIn_0.2s_ease-out] flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Manage Working Hours</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                    {schedule.map((day, dayIndex) => {
                        const [year, month, dayNum] = day.isoDate.split('-');
                        const dateObj = new Date(year, month - 1, dayNum);
                        const javaDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
                        const dayOfWeekStr = javaDays[dateObj.getDay()];
                        const clinicDay = clinicHours.find(h => h.dayOfWeek === dayOfWeekStr);
                        const isClinicClosed = !clinicDay;

                        const minTime = clinicDay ? clinicDay.startTime.substring(0, 5) : undefined;
                        const maxTime = clinicDay ? clinicDay.endTime.substring(0, 5) : undefined;
                        const timeOptions = generateTimeOptions(minTime, maxTime);

                        return (
                            <div
                                key={day.dayLabel}
                                className={`rounded-xl border ${day.isActive ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50/50'} p-5 transition-colors`}
                            >
                                {/* Day Header (Label + Toggle) */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-base font-bold ${day.isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {day.dayLabel}
                                        {isClinicClosed && <span className="ml-2 text-xs text-red-500 font-normal">(Clinic Closed)</span>}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-medium ${day.isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                                            {day.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        <button
                                            type="button"
                                            disabled={isClinicClosed}
                                            onClick={() => onDayToggle(dayIndex)}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 ${isClinicClosed ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${day.isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
                                        >
                                            <span
                                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${day.isActive ? 'translate-x-5' : 'translate-x-0'}`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* Time Inputs */}
                                <div className="flex gap-4">
                                    {/* Start Time */}
                                    <div className="flex-1">
                                        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                                            <ClockIconSmall /> Start Time
                                        </label>
                                        <div className="relative">
                                            <select
                                                disabled={!day.isActive || isClinicClosed}
                                                value={day.startTime || ""}
                                                onChange={(e) => onTimeChange(dayIndex, 'startTime', e.target.value)}
                                                className={`w-full appearance-none rounded-lg border ${day.isActive ? 'border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer' : 'border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed'} px-3 py-2.5 text-sm transition-all outline-none`}
                                            >
                                                {!day.startTime && <option value="" disabled>Select Time</option>}
                                                {timeOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            <ChevronDownIcon className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 ${day.isActive && !isClinicClosed ? 'text-gray-500' : 'text-gray-300'}`} />
                                        </div>
                                    </div>
                                    {/* End Time */}
                                    <div className="flex-1">
                                        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                                            <ClockIconSmall /> End Time
                                        </label>
                                        <div className="relative">
                                            <select
                                                disabled={!day.isActive || isClinicClosed}
                                                value={day.endTime || ""}
                                                onChange={(e) => onTimeChange(dayIndex, 'endTime', e.target.value)}
                                                className={`w-full appearance-none rounded-lg border ${day.isActive ? 'border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer' : 'border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed'} px-3 py-2.5 text-sm transition-all outline-none`}
                                            >
                                                {!day.endTime && <option value="" disabled>Select Time</option>}
                                                {timeOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            <ChevronDownIcon className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 ${day.isActive && !isClinicClosed ? 'text-gray-500' : 'text-gray-300'}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-5 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onSave}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0f3460] rounded-lg hover:bg-[#1a4a85] transition-colors shadow-md cursor-pointer"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </ModalBackdrop>
    );
}

function ClockIconSmall() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

/** ─── Delete Confirm Modal ─── */
function ConfirmModal({ title, message, onConfirm, onCancel }) {
    return (
        <ModalBackdrop onClose={onCancel}>
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] mx-4 p-6 animate-[scaleIn_0.2s_ease-out]"
            >
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                        <TrashIcon />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{message}</p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-md shadow-red-200 cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </ModalBackdrop>
    );
}


/** ─── Modal Backdrop ─── */
function ModalBackdrop({ onClose, children }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] animate-[fadeIn_0.15s_ease-out]"
            onClick={onClose}
        >
            {children}
        </div>
    );
}


/* ══════════════════════════════════════════════════════════════════════════════
   Icons (inline SVG)
   ══════════════════════════════════════════════════════════════════════════════ */

function PlusIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

function ThreeDotsIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
        </svg>
    );
}

function EditIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function DeactivateIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
    );
}

function ActivateIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

function ChevronDownIcon({ className }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

function PlusCircleIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
    );
}