import { useState, useEffect, useRef } from "react";
import {
    fetchDoctors,
    fetchSpecialties,
    addDoctor,
    updateDoctor,
    toggleDoctorStatus,
    fetchDoctorSchedule,
    updateSlotStatus,
} from "../../../api/clinicDoctorsApi";

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

    // ── Load data on mount ───────────────────────────────────────────────────
    useEffect(() => {
        async function load() {
            try {
                const [docs, specs] = await Promise.all([
                    fetchDoctors(),
                    fetchSpecialties(),
                ]);
                setDoctors(docs);
                setSpecialties(specs);
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
        } catch (err) {
            console.error("Save failed:", err);
        }
        setProfileModal({ open: false, editingDoctor: null });
    }

    async function handleToggleStatus(doctor) {
        setOpenMenuId(null);
        try {
            const result = await toggleDoctorStatus(doctor.id, !doctor.isActive);
            setDoctors((prev) =>
                prev.map((d) =>
                    d.id === result.id ? { ...d, isActive: result.isActive } : d
                )
            );
        } catch (err) {
            console.error("Toggle status failed:", err);
        }
    }

    function handleDeleteDoctor(doctor) {
        setOpenMenuId(null);
        setDeleteModal({ open: true, doctor });
    }

    function confirmDelete() {
        if (deleteModal.doctor) {
            setDoctors((prev) => prev.filter((d) => d.id !== deleteModal.doctor.id));
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

    async function handleSlotToggle(dayIndex, slotIndex) {
        const day = scheduleModal.schedule[dayIndex];
        // Only allow toggling on configured days
        if (!day.configured) return;

        const currentStatus = day.slots[slotIndex].status;
        // Booked slots cannot be changed
        if (currentStatus === "booked") return;

        const newStatus = currentStatus === "open" ? "resting" : "open";

        try {
            await updateSlotStatus(scheduleModal.doctorId, dayIndex, slotIndex, newStatus);
            setScheduleModal((prev) => {
                const updatedSchedule = prev.schedule.map((d, di) => {
                    if (di !== dayIndex) return d;
                    return {
                        ...d,
                        slots: d.slots.map((slot, si) =>
                            si === slotIndex ? { ...slot, status: newStatus } : slot
                        ),
                    };
                });
                return { ...prev, schedule: updatedSchedule };
            });
        } catch (err) {
            console.error("Slot update failed:", err);
        }
    }

    function handleConfigureDay(dayIndex) {
        setScheduleModal((prev) => {
            const updatedSchedule = prev.schedule.map((day, di) => {
                if (di !== dayIndex) return day;
                // Mark as configured; all slots default to resting
                return {
                    ...day,
                    configured: true,
                    slots: day.slots.map((slot) => ({ ...slot, status: "resting" })),
                };
            });
            return { ...prev, schedule: updatedSchedule };
        });
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
                    onSlotToggle={handleSlotToggle}
                    onConfigureDay={handleConfigureDay}
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
        <div className="relative bg-white rounded-2xl border border-gray-200/80 p-5 hover:shadow-lg hover:shadow-gray-200/60 transition-all duration-300 group">
            {/* Top row: avatar + name + menu */}
            <div className="flex items-start gap-3">
                <DoctorAvatar doctor={doctor} />
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">
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
                className="rounded-full object-cover border-2 border-gray-100"
                style={{ width: size, height: size }}
            />
        );
    }

    // Initials fallback with a seeded color
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

    return (
        <div
            className={`rounded-full flex items-center justify-center text-sm font-bold ${colors[colorIndex]}`}
            style={{ width: size, height: size }}
        >
            {doctor.initials}
        </div>
    );
}

/** ─── Status Badge ─── */
function StatusBadge({ isActive }) {
    return (
        <span
            className={`
                inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                ${isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-gray-50 text-gray-500 border border-gray-200"
                }
            `}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-gray-400"
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
    const [specialty, setSpecialty] = useState(doctor?.specialty || specialties[0] || "");
    const [bio, setBio] = useState(doctor?.bio || "");
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!fullName.trim()) return;
        setSaving(true);
        await onSave({ fullName: fullName.trim(), specialty, bio: bio.trim() });
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
                    <span className="text-xs font-semibold text-blue-700 mb-1 block">Specialty</span>
                    <div className="relative">
                        <select
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all cursor-pointer"
                        >
                            {specialties.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                    </div>
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


/** ─── Schedule / Working Hours Modal ─── */
function ScheduleModal({ doctorName, schedule, onSlotToggle, onConfigureDay, onClose }) {
    const configuredDays = schedule
        .map((day, idx) => ({ ...day, originalIndex: idx }))
        .filter((day) => day.configured);
    const pendingDays = schedule
        .map((day, idx) => ({ ...day, originalIndex: idx }))
        .filter((day) => !day.configured);

    return (
        <ModalBackdrop onClose={onClose}>
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-[680px] mx-4 p-7 animate-[scaleIn_0.2s_ease-out]"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-gray-900">Manage Working Hours</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="max-h-[520px] overflow-y-auto pr-1">
                    {/* ── Configured Days Section ── */}
                    <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Configured Days</h3>
                        {configuredDays.length === 0 ? (
                            <p className="text-sm text-gray-400 italic mb-4">No days configured yet.</p>
                        ) : (
                            <div className="space-y-5">
                                {configuredDays.map((day) => (
                                    <div key={day.dayLabel} className="animate-[slideDown_0.3s_ease-out]">
                                        <h4 className="text-sm font-bold text-gray-900 mb-2.5">{day.dayLabel}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {day.slots.map((slot, slotIndex) => {
                                                const isBooked = slot.status === "booked";
                                                const isOpen = slot.status === "open";
                                                // const isResting = slot.status === "resting";

                                                let colorClasses;
                                                if (isBooked) {
                                                    colorClasses = "bg-red-50 border-red-300 text-red-600 cursor-not-allowed";
                                                } else if (isOpen) {
                                                    colorClasses = "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 cursor-pointer";
                                                } else {
                                                    // resting
                                                    colorClasses = "bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200 cursor-pointer";
                                                }

                                                return (
                                                    <button
                                                        key={slot.time}
                                                        onClick={() => onSlotToggle(day.originalIndex, slotIndex)}
                                                        disabled={isBooked}
                                                        className={`min-w-[68px] px-2.5 py-2 rounded-lg text-center transition-all duration-200 border ${colorClasses}`}
                                                    >
                                                        <span className="block text-sm font-semibold">{slot.time}</span>
                                                        <span className="block text-[10px] font-medium mt-0.5">
                                                            {isBooked ? "Booked" : isOpen ? "Open" : "Resting"}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Divider ── */}
                    {pendingDays.length > 0 && (
                        <div className="border-t border-gray-200 my-5" />
                    )}

                    {/* ── Pending Setup Section ── */}
                    {pendingDays.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Pending Setup</h3>
                            <div className="space-y-5">
                                {pendingDays.map((day) => (
                                    <div key={day.dayLabel}>
                                        {/* Day header row */}
                                        <div className="flex items-center justify-between mb-2.5">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-sm font-bold text-gray-900">{day.dayLabel}</h4>
                                                <span className="text-xs text-gray-400 italic">Working hours not set for this day yet</span>
                                            </div>
                                            <button
                                                onClick={() => onConfigureDay(day.originalIndex)}
                                                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-blue-50"
                                            >
                                                <PlusCircleIcon />
                                                Configure Schedule
                                            </button>
                                        </div>
                                        {/* Disabled/faded slots preview */}
                                        <div className="flex flex-wrap gap-2 opacity-40">
                                            {day.slots.map((slot) => (
                                                <div
                                                    key={slot.time}
                                                    className="min-w-[68px] px-2.5 py-2 rounded-lg text-center border border-dashed border-gray-300 bg-gray-50 text-gray-400"
                                                >
                                                    <span className="block text-sm font-semibold">{slot.time}</span>
                                                    <span className="block text-[10px] font-medium mt-0.5">--</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Save Changes button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-8 py-2.5 text-sm font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors shadow-md shadow-blue-900/20 cursor-pointer"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </ModalBackdrop>
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
