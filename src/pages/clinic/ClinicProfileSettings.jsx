// src/pages/clinic/ClinicProfileSettings.jsx
import { useState, useRef, useEffect } from "react";
import { Link, Form } from "react-router";
import * as api from "../../api/clinicProfileApi";

import { localToUtcRecurring, utcToLocalRecurring } from "../../utils/timezone";

// Map between backend City enum and display names
const CITY_OPTIONS = [
    { value: "AMMAN", label: "Amman" },
    { value: "IRBID", label: "Irbid" },
    { value: "ZARQA", label: "Zarqa" },
    { value: "MAFRAQ", label: "Mafraq" },
    { value: "AJLOUN", label: "Ajloun" },
    { value: "JERASH", label: "Jerash" },
    { value: "MADABA", label: "Madaba" },
    { value: "BALQA", label: "Salt" },
    { value: "KARAK", label: "Karak" },
    { value: "TAFILEH", label: "Tafilah" },
    { value: "MAAN", label: "Maan" },
    { value: "AQABA", label: "Aqaba" },
];

const STATIC_SPECIALTIES = [
    "General Dentistry",
    "Orthodontics",
    "Oral Surgery",
    "Pediatric Dentistry",
    "Periodontics",
    "Cosmetic Dentistry",
    "Endodontics"
];

const initialForm = {
    clinicName: "",
    checkingFee: "0.00",
    description: "",
    phoneNumber: "",
    socialLinks: [""],
    city: "AMMAN",
    address: "",
    specialties: {},
    hours: {
        Sunday: { enabled: false, from: "09:00", to: "17:00" },
        Monday: { enabled: false, from: "09:00", to: "17:00" },
        Tuesday: { enabled: false, from: "09:00", to: "17:00" },
        Wednesday: { enabled: false, from: "09:00", to: "17:00" },
        Thursday: { enabled: false, from: "09:00", to: "17:00" },
        Friday: { enabled: false, from: "09:00", to: "17:00" },
        Saturday: { enabled: false, from: "09:00", to: "17:00" },
    },
};

function TrashIcon({ size = 20, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    );
}

function Icon({ children, size = 20, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {children}
        </svg>
    );
}

function LinkIcon({ size = 18 }) {
    return (
        <Icon size={size}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </Icon>
    );
}

function StoreIcon({ size = 21 }) {
    return (
        <Icon size={size}>
            <path d="M4 10v10h16V10" />
            <path d="M3 10h18l-1.5-6h-15z" />
            <path d="M8 14h8v6H8z" />
            <path d="M6 10a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
        </Icon>
    );
}

function PhoneIcon({ size = 21 }) {
    return (
        <Icon size={size}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
        </Icon>
    );
}

function LocationIcon({ size = 21 }) {
    return (
        <Icon size={size}>
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
        </Icon>
    );
}

function MedicalIcon({ size = 21 }) {
    return (
        <Icon size={size}>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M12 8v8M8 12h8" />
        </Icon>
    );
}

function ClockIcon({ size = 21 }) {
    return (
        <Icon size={size}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </Icon>
    );
}

function PlusIcon({ size = 17 }) {
    return (
        <Icon size={size}>
            <path d="M12 5v14M5 12h14" />
        </Icon>
    );
}

function Section({ icon, title, children }) {
    return (
        <section className="rounded-[14px] border border-slate-300 bg-white px-6 py-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="mb-6 flex items-center gap-2.5">
                <span className="text-blue-700">{icon}</span>
                <h2 className="text-[22px] font-medium tracking-[-0.01em] text-slate-950">
                    {title}
                </h2>
            </div>
            {children}
        </section>
    );
}

function Field({ label, required = false, children }) {
    return (
        <label className="block">
            <span className="mb-2 block text-[13px] font-medium tracking-wide text-slate-700">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </span>
            {children}
        </label>
    );
}

function Input({ className = "", ...props }) {
    return (
        <input
            {...props}
            className={`h-[40px] w-full rounded-md border border-slate-300 bg-white px-3 text-[15px] text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${className}`}
        />
    );
}

function Toggle({ enabled, onChange }) {
    return (
        <button
            type="button"
            onClick={onChange}
            aria-pressed={enabled}
            className={`relative h-[18px] w-[34px] rounded-full transition ${enabled ? "bg-blue-700" : "bg-slate-200"}`}
        >
            <span
                className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm transition ${enabled ? "left-[18px]" : "left-[2px]"}`}
            />
        </button>
    );
}

function PickerColumn({ items, value, onChange, className = "text-[18px]" }) {
    const scrollRef = useRef(null);
    const isScrolling = useRef(false);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startScrollTop = useRef(0);

    const itemsRef = useRef(items);
    const valueRef = useRef(value);
    const onChangeRef = useRef(onChange);

    useEffect(() => {
        itemsRef.current = items;
        valueRef.current = value;
        onChangeRef.current = onChange;
    });

    useEffect(() => {
        if (scrollRef.current && !isScrolling.current && !isDragging.current) {
            const index = items.indexOf(value);
            if (index !== -1) {
                scrollRef.current.scrollTop = index * 34;
            }
        }
    }, [value, items]);

    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const y = e.pageY;
            const walk = (y - startY.current);
            if (scrollRef.current) {
                scrollRef.current.scrollTop = startScrollTop.current - walk;
            }
        };

        const handleGlobalMouseUp = () => {
            if (isDragging.current) {
                isDragging.current = false;
                if (scrollRef.current) {
                    scrollRef.current.style.scrollSnapType = 'y mandatory';
                    const currentScroll = scrollRef.current.scrollTop;
                    const index = Math.round(currentScroll / 34);

                    scrollRef.current.scrollTo({ top: index * 34, behavior: 'smooth' });
                    const currentItems = itemsRef.current;
                    const currentValue = valueRef.current;
                    if (currentItems[index] !== undefined && currentItems[index] !== currentValue) {
                        onChangeRef.current(currentItems[index]);
                    }
                }
            }
        };

        window.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
        window.addEventListener('mouseup', handleGlobalMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, []);

    const handleScroll = (e) => {
        if (isDragging.current) return;
        const currentScroll = e.target.scrollTop;
        const index = Math.round(currentScroll / 34);

        isScrolling.current = true;
        clearTimeout(scrollRef.current.scrollTimeout);
        scrollRef.current.scrollTimeout = setTimeout(() => {
            isScrolling.current = false;
        }, 150);

        if (items[index] !== undefined && items[index] !== value) {
            onChange(items[index]);
        }
    };

    const handleMouseDown = (e) => {
        isDragging.current = true;
        startY.current = e.pageY;
        startScrollTop.current = scrollRef.current.scrollTop;
        if (scrollRef.current) {
            scrollRef.current.style.scrollSnapType = 'none';
        }
    };

    return (
        <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            className="flex-1 h-full overflow-y-auto snap-y snap-mandatory hide-scroll select-none cursor-grab active:cursor-grabbing"
        >
            <div className="h-[58px]" />
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className={`flex h-[34px] w-full snap-center items-center justify-center transition-colors ${className} ${item === value ? 'font-semibold text-black' : 'text-slate-800 hover:text-black'}`}
                >
                    {item}
                </div>
            ))}
            <div className="h-[58px]" />
        </div>
    );
}

function TimeSelect({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    let currentHour24 = 9;
    if (value) {
        currentHour24 = parseInt(value.split(":")[0], 10);
        if (isNaN(currentHour24)) currentHour24 = 9;
    }

    let currentHour12 = currentHour24 % 12 || 12;
    let currentAmPm = currentHour24 >= 12 ? "PM" : "AM";
    let currentHour12Str = `${currentHour12}:00`;

    const displayLabel = `${currentHour12.toString().padStart(2, "0")}:00 ${currentAmPm}`;

    const updateTime = (newHour12Str, newAmPm) => {
        let newHour12 = parseInt(newHour12Str.toString().split(":")[0], 10);
        let h24 = newHour12 % 12;
        if (newAmPm === "PM") h24 += 12;
        onChange(`${h24.toString().padStart(2, "0")}:00`);
    };

    const hours = ["1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00"];
    const ampmOptions = ["AM", "PM"];

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-[36px] w-[110px] items-center justify-between rounded-md border border-slate-300 bg-white px-2.5 text-[13px] font-medium text-slate-700 shadow-sm transition hover:border-blue-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
            >
                <span>{displayLabel}</span>
                <ClockIcon size={14} />
            </button>

            {isOpen && (
                <div className="absolute z-50 bottom-full mb-3 -translate-x-1/2 left-1/2">
                    <style>{`
                        .hide-scroll::-webkit-scrollbar { display: none; }
                        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                    `}</style>
                    <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-r border-b border-slate-200 bg-white z-10" />

                    <div className="relative flex h-[180px] w-[130px] flex-col items-center justify-center rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] ring-1 ring-slate-200 overflow-hidden">
                        <div className="absolute top-1/2 left-2 right-2 h-[34px] -translate-y-1/2 rounded-lg bg-slate-100 pointer-events-none" />

                        <div className="relative z-10 flex h-[150px] w-full px-1 items-center">
                            <PickerColumn
                                items={hours}
                                value={currentHour12Str}
                                onChange={(h) => updateTime(h, currentAmPm)}
                                className="text-[18px]"
                            />

                            <PickerColumn
                                items={ampmOptions}
                                value={currentAmPm}
                                onChange={(ampm) => updateTime(currentHour12, ampm)}
                                className="text-[15px]"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ClinicProfileSettings() {
    const [form, setForm] = useState(initialForm);
    const [originalSpecialties, setOriginalSpecialties] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(false);
    const [specialtyModal, setSpecialtyModal] = useState({ open: false, name: "" });
    const [deletingSpecialty, setDeletingSpecialty] = useState(null);

    async function handleSaveSpecialty() {
        const newName = specialtyModal.name.trim();
        if (!newName) return;

        try {
            await api.addSpecialty(newName);

            setForm((current) => ({
                ...current,
                specialties: {
                    ...current.specialties,
                    [newName]: true,
                },
            }));

            setOriginalSpecialties((current) => ({
                ...current,
                [newName]: true,
            }));

            setSpecialtyModal({ open: false, name: "" });
        } catch (err) {
            setError(err.message || "Failed to add specialty");
        }
    }

    async function handleDeleteSpecialty(name) {
        setDeletingSpecialty(name);
        try {
            await api.deleteSpecialty(name);
            setTimeout(() => {
                setForm(current => {
                    const newSpecialties = { ...current.specialties };
                    delete newSpecialties[name];
                    return { ...current, specialties: newSpecialties };
                });
                setOriginalSpecialties(current => {
                    const newSpecialties = { ...current };
                    delete newSpecialties[name];
                    return newSpecialties;
                });
                setDeletingSpecialty(null);
            }, 500);
        } catch (err) {
            setError(err.message);
            setDeletingSpecialty(null);
        }
    }

    function updateField(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
        setSaved(false);
    }

    // Dynamic Social Links Array Handlers
    function handleSocialLinkChange(index, value) {
        setForm(current => {
            const updated = [...current.socialLinks];
            updated[index] = value;
            return { ...current, socialLinks: updated };
        });
        setSaved(false);
    }

    function handleAddSocialLink() {
        setForm(current => ({
            ...current,
            socialLinks: [...current.socialLinks, ""],
        }));
        setSaved(false);
    }

    function handleRemoveSocialLink(index) {
        setForm(current => {
            const updated = current.socialLinks.filter((_, i) => i !== index);
            return {
                ...current,
                socialLinks: updated.length > 0 ? updated : [""],
            };
        });
        setSaved(false);
    }

    function updateSpecialty(name) {
        setForm((current) => ({
            ...current,
            specialties: {
                ...current.specialties,
                [name]: !current.specialties[name],
            },
        }));
        setSaved(false);
    }

    function updateHour(day, field, value) {
        setForm((current) => ({
            ...current,
            hours: {
                ...current.hours,
                [day]: {
                    ...current.hours[day],
                    [field]: value,
                },
            },
        }));
        setSaved(false);
    }

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);

            const [profile, specialtiesData, hoursData] = await Promise.all([
                api.fetchClinicProfile(),
                api.fetchSpecialties(),
                api.fetchClinicHours(),
            ]);

            const specialtiesMap = {};
            STATIC_SPECIALTIES.forEach(s => {
                specialtiesMap[s] = false;
            });
            specialtiesData.forEach(s => {
                specialtiesMap[s.name] = true;
            });
            setOriginalSpecialties({ ...specialtiesMap });

            const javaDayToJsDay = {
                SUNDAY: "Sunday", MONDAY: "Monday", TUESDAY: "Tuesday",
                WEDNESDAY: "Wednesday", THURSDAY: "Thursday", FRIDAY: "Friday", SATURDAY: "Saturday"
            };
            const hours = { ...initialForm.hours };
            hoursData.forEach(schedule => {
                if (!schedule.startTime || !schedule.endTime) return;
                const startConv = utcToLocalRecurring(schedule.dayOfWeek, schedule.startTime);
                const endConv = utcToLocalRecurring(schedule.dayOfWeek, schedule.endTime);

                const dayName = javaDayToJsDay[startConv.localDayOfWeek];
                if (dayName) {
                    hours[dayName] = {
                        enabled: true,
                        from: startConv.localTime,
                        to: endConv.localTime,
                    };
                }
            });

            // Normalize backend socialLinks array
            let loadedSocialLinks = [];
            if (Array.isArray(profile.socialLinks) && profile.socialLinks.length > 0) {
                loadedSocialLinks = profile.socialLinks;
            } else if (typeof profile.socialLinks === "string" && profile.socialLinks.trim()) {
                loadedSocialLinks = [profile.socialLinks.trim()];
            } else {
                loadedSocialLinks = [""];
            }

            setForm(current => ({
                ...current,
                clinicName: profile.clinicName || "",
                checkingFee: profile.checkingFee?.toString() || "0.00",
                description: profile.description || "",
                phoneNumber: profile.phoneNumber || "",
                socialLinks: loadedSocialLinks,
                city: profile.city || "AMMAN",
                address: profile.detailedAddress || "",
                specialties: specialtiesMap,
                hours: hours,
            }));
            setError("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave(event) {
        event.preventDefault();

        if (form.phoneNumber && !/^(079|078|077)\d{7}$/.test(form.phoneNumber)) {
            setError("Phone number must be exactly 10 digits and start with 079, 078, or 077");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setSaving(true);
        setError("");

        try {
            // Trim and filter empty link fields to send a clean List<String>
            const cleanedSocialLinks = form.socialLinks
                .map(link => link.trim())
                .filter(Boolean);

            // 1. Save Profile
            await api.updateClinicProfile({
                clinicName: form.clinicName,
                phoneNumber: form.phoneNumber,
                socialLinks: cleanedSocialLinks,
                detailedAddress: form.address,
                workingHours: null,
                checkingFee: parseFloat(form.checkingFee),
                description: form.description,
                city: form.city
            });

            // 2. Save Specialties
            const specialtyPromises = Object.keys(form.specialties).map(async (specialtyName) => {
                const isChecked = form.specialties[specialtyName];
                const wasChecked = originalSpecialties[specialtyName];

                if (isChecked && !wasChecked) {
                    return api.addSpecialty(specialtyName).catch(() => { });
                } else if (!isChecked && wasChecked) {
                    return api.deleteSpecialty(specialtyName).catch(() => { });
                }
            });

            // 3. Save Hours
            const jsDayToJavaDay = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
            const allJavaDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
            await Promise.all(allJavaDays.map(day => api.deleteClinicHours(day).catch(() => { })));

            const hoursPromises = Object.entries(form.hours).map(async ([day, schedule]) => {
                const dayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(day);
                const javaDay = jsDayToJavaDay[dayIndex];

                if (schedule.enabled) {
                    const startTime = schedule.from.length === 5 ? schedule.from + ":00" : schedule.from;
                    const endTime = schedule.to.length === 5 ? schedule.to + ":00" : schedule.to;

                    const startConv = localToUtcRecurring(javaDay, startTime);
                    const endConv = localToUtcRecurring(javaDay, endTime);

                    return api.saveClinicHours(startConv.utcDayOfWeek, startConv.utcTime, endConv.utcTime).catch(() => { });
                }
            });

            await Promise.all([...hoursPromises, ...specialtyPromises]);
            setOriginalSpecialties({ ...form.specialties });

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
                <div className="text-slate-500">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="text-slate-950 w-full">
            {/* Sticky Full-Width Header Band */}
            <div className="sticky top-0 z-40 -mt-8 pt-8 pb-4 -mx-8 px-8 bg-[#f7f8fa] border-b border-slate-300 shadow-xs mb-6">
                <div className="mx-auto max-w-[1060px] flex items-start justify-between">
                    <div>
                        <h1 className="text-[28px] font-medium leading-8 tracking-[-0.025em] text-slate-950">
                            Clinic Profile Settings
                        </h1>
                        <p className="mt-2 text-[14px] text-slate-600">
                            Manage your clinic&apos;s public information and contact details.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className={`flex h-[36px] items-center justify-center gap-2 rounded-md bg-blue-700 px-5 text-[13px] font-medium text-white shadow-sm transition hover:bg-blue-800 cursor-pointer ${saving ? "opacity-70" : ""}`}
                        >
                            <StoreIcon size={16} />
                            {saving ? "Saving..." : "Save Settings"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="mx-auto max-w-[1060px] pb-12">
                {error && (
                    <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSave} className="space-y-5">
                    {saved && (
                        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700">
                            Changes saved successfully.
                        </div>
                    )}

                    {/* GENERAL INFORMATION */}
                    <Section icon={<StoreIcon />} title="General Information">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                            <Field label="Clinic Name" required>
                                <Input
                                    value={form.clinicName}
                                    onChange={(e) =>
                                        updateField("clinicName", e.target.value)
                                    }
                                />
                            </Field>

                            <Field label="Checking Fee">
                                <div className="flex">
                                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-[15px] font-medium text-slate-600">
                                        JOD
                                    </div>
                                    <Input
                                        value={form.checkingFee}
                                        onChange={(e) =>
                                            updateField("checkingFee", e.target.value)
                                        }
                                        className="rounded-l-none"
                                    />
                                </div>
                            </Field>
                        </div>

                        <div className="mt-5">
                            <Field label="Description">
                                <textarea
                                    value={form.description}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 500) {
                                            updateField("description", e.target.value);
                                        }
                                    }}
                                    placeholder="Briefly describe your clinic's mission, specialties, and atmosphere..."
                                    className="h-[100px] w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-3 text-[15px] text-slate-800 outline-none placeholder:text-slate-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                />
                                <div className="mt-1 text-right text-[12px] text-slate-500">
                                    {form.description.length} / 500 characters
                                </div>
                            </Field>
                        </div>
                    </Section>

                    {/* CONTACT & SOCIAL */}
                    <Section icon={<PhoneIcon />} title="Contact & Social">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                            <Field label="Phone Number">
                                <div className="flex">
                                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-slate-600">
                                        <PhoneIcon size={13} />
                                    </div>
                                    <Input
                                        value={form.phoneNumber}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            updateField("phoneNumber", val);
                                        }}
                                        className="rounded-l-none"
                                    />
                                </div>
                            </Field>
                        </div>

                        {/* Multiple Social Links Dynamic Inputs */}
                        <div className="mt-6 pt-5 border-t border-slate-200">
                            <div className="mb-3 flex items-center justify-between">
                                <div>
                                    <span className="block text-[13px] font-medium tracking-wide text-slate-700">
                                        Social Media &amp; Public Links
                                    </span>
                                    <span className="text-[12px] text-slate-500">
                                        Add links to your Instagram, Facebook, LinkedIn, website, or other profiles.
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddSocialLink}
                                    className="flex items-center gap-1.5 text-[13px] font-medium text-blue-700 hover:text-blue-800 transition cursor-pointer"
                                >
                                    <PlusIcon size={15} />
                                    <span>Add Link</span>
                                </button>
                            </div>

                            <div className="space-y-3">
                                {form.socialLinks.map((link, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="flex flex-1">
                                            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-slate-600">
                                                <LinkIcon size={16} />
                                            </div>
                                            <Input
                                                value={link}
                                                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                                                placeholder="e.g. instagram.com/clinic or https://facebook.com/clinic"
                                                className="rounded-l-none"
                                            />
                                        </div>

                                        {form.socialLinks.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSocialLink(index)}
                                                className="flex h-[40px] w-[40px] items-center justify-center rounded-md border border-slate-300 text-slate-400 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                                                title="Remove link"
                                            >
                                                <TrashIcon size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Section>

                    {/* LOCATION */}
                    <Section icon={<LocationIcon />} title="Location Details">
                        <div className="grid grid-cols-[1fr_1fr] gap-6">
                            <div className="space-y-5">
                                <Field label="City">
                                    <div className="relative">
                                        <select
                                            value={form.city}
                                            onChange={(e) => updateField("city", e.target.value)}
                                            className="h-[40px] w-full appearance-none rounded-md border border-slate-300 bg-white px-3 text-[15px] text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                        >
                                            {CITY_OPTIONS.map(c => (
                                                <option key={c.value} value={c.value}>{c.label}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </div>
                                    </div>
                                </Field>

                                <Field label="Address">
                                    <Input
                                        value={form.address}
                                        onChange={(e) => updateField("address", e.target.value)}
                                    />
                                </Field>
                            </div>

                            <div className="flex min-h-[190px] items-center justify-center overflow-hidden rounded-lg border border-slate-300 bg-[#e8edf1]">
                                <div className="relative h-full w-full">
                                    <div className="absolute inset-0 opacity-50">
                                        <div className="absolute left-[10%] top-[15%] h-[1px] w-[80%] rotate-12 bg-white" />
                                        <div className="absolute left-[10%] top-[40%] h-[1px] w-[85%] -rotate-6 bg-white" />
                                        <div className="absolute left-[5%] top-[65%] h-[1px] w-[90%] rotate-12 bg-white" />
                                        <div className="absolute left-[25%] top-[5%] h-[90%] w-[1px] rotate-[8deg] bg-white" />
                                        <div className="absolute left-[65%] top-[5%] h-[90%] w-[1px] -rotate-[8deg] bg-white" />
                                    </div>

                                    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg bg-white px-8 py-5 shadow-sm">
                                        <LocationIcon size={24} />
                                        <span className="mt-2 whitespace-nowrap text-[12px] text-slate-600">
                                            Map preview unavailable until saved
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* MEDICAL SPECIALTIES */}
                    <Section icon={<MedicalIcon />} title="Medical Specialties">
                        <div className="grid grid-cols-4 gap-3">
                            {Object.keys(form.specialties).map((specialty) => {
                                const isStatic = STATIC_SPECIALTIES.includes(specialty);
                                const isDeleting = deletingSpecialty === specialty;

                                return (
                                    <div
                                        key={specialty}
                                        className={`flex h-[36px] items-center justify-between rounded-md border border-slate-300 px-3 text-[13px] text-slate-800 transition-all duration-500 ease-in-out ${isDeleting ? "opacity-0 scale-95" : "opacity-100 scale-100 hover:bg-slate-50"}`}
                                    >
                                        <label className="flex items-center gap-2 cursor-pointer flex-1 h-full">
                                            <input
                                                type="checkbox"
                                                checked={form.specialties[specialty]}
                                                onChange={() => updateSpecialty(specialty)}
                                                className="h-[18px] w-[18px] accent-blue-700 cursor-pointer"
                                            />
                                            <span className="truncate">{specialty}</span>
                                        </label>
                                        {!isStatic && (
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteSpecialty(specialty)}
                                                className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                                                title="Delete Custom Specialty"
                                            >
                                                <TrashIcon size={15} />
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                            <button
                                type="button"
                                onClick={() => setSpecialtyModal({ open: true, name: "" })}
                                className="flex h-[36px] items-center justify-center gap-1.5 rounded-md border border-dashed border-slate-300 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                            >
                                <PlusIcon size={14} /> Add Specialty
                            </button>
                        </div>
                    </Section>

                    {/* CLINIC HOURS */}
                    <Section icon={<ClockIcon />} title="Clinic Hours">
                        <div>
                            {Object.entries(form.hours).map(([day, schedule], index) => (
                                <div
                                    key={day}
                                    className={`flex min-h-[54px] items-center justify-between ${index !== Object.entries(form.hours).length - 1
                                        ? "border-b border-slate-200"
                                        : ""
                                    }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <Toggle
                                            enabled={schedule.enabled}
                                            onChange={() =>
                                                updateHour(day, "enabled", !schedule.enabled)
                                            }
                                        />
                                        <span
                                            className={`w-[80px] text-[15px] font-medium ${schedule.enabled
                                                ? "text-slate-950"
                                                : "text-slate-400"
                                            }`}
                                        >
                                            {day}
                                        </span>
                                    </div>

                                    {schedule.enabled ? (
                                        <div className="flex items-center gap-3">
                                            <TimeSelect
                                                value={schedule.from}
                                                onChange={(val) => updateHour(day, "from", val)}
                                            />
                                            <span className="text-[13px] text-slate-600">to</span>
                                            <TimeSelect
                                                value={schedule.to}
                                                onChange={(val) => updateHour(day, "to", val)}
                                            />
                                        </div>
                                    ) : (
                                        <span className="mr-1 text-[13px] text-slate-400">Closed</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Section>
                </form>
            </div>

            {/* ADD SPECIALTY MODAL */}
            {specialtyModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-[400px] rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="text-lg font-medium text-slate-900">Add New Specialty</h3>
                            <button
                                onClick={() => setSpecialtyModal({ open: false, name: "" })}
                                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-6">
                            <label className="mb-2 block text-[13px] font-medium tracking-wide text-slate-700">Specialty Name</label>
                            <input
                                type="text"
                                autoFocus
                                value={specialtyModal.name}
                                onChange={(e) => setSpecialtyModal({ ...specialtyModal, name: e.target.value })}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveSpecialty(); }}
                                placeholder="e.g. Endodontics"
                                className="h-[40px] w-full rounded-md border border-slate-300 bg-white px-3 text-[15px] text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setSpecialtyModal({ open: false, name: "" })}
                                className="h-[36px] rounded-md border border-slate-300 bg-white px-4 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveSpecialty}
                                className="h-[36px] rounded-md bg-blue-700 px-4 text-[13px] font-medium text-white shadow-sm transition hover:bg-blue-800 cursor-pointer"
                            >
                                Save Specialty
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}