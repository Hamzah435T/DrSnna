import { useState, useRef, useEffect } from "react";
import { Link, Form } from "react-router";

const initialForm = {
    clinicName: "Dr.Sna Dental",
    introduction: "",
    primaryPhone: "+0799999999",
    emergencyPhone: "+0790000000",
    instagram: "drsna_dental",
    facebook: "",
    streetAddress: "Princess Sumayah street, Amman",
    city: "7th circle",
    state: "Amman",
    zipCode: "11185",
    specialties: {
        "General Dentistry": true,
        Orthodontics: true,
        "Oral Surgery": false,
        "Pediatric Dentistry": true,
        Periodontics: false,
        "Cosmetic Dentistry": true,
        Endodontics: false,
    },
    hours: {
        Sunday: { enabled: true, from: "09:00", to: "17:00" },
        Monday: { enabled: true, from: "09:00", to: "17:00" },
        Tuesday: { enabled: true, from: "09:00", to: "17:00" },
        Wednesday: { enabled: true, from: "09:00", to: "17:00" },
        Thursday: { enabled: true, from: "09:00", to: "17:00" },
        Friday: { enabled: false, from: "09:00", to: "13:00" },
        Saturday: { enabled: false, from: "09:00", to: "17:00" },
    },
};

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

function DashboardIcon() {
    return (
        <Icon size={18}>
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <rect x="14" y="4" width="6" height="6" rx="1" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="14" width="6" height="6" rx="1" />
        </Icon>
    );
}

function BriefcaseIcon() {
    return (
        <Icon size={18}>
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M3 12h18M10 12v2h4v-2" />
        </Icon>
    );
}

function CalendarIcon() {
    return (
        <Icon size={18}>
            <rect x="3" y="4" width="18" height="17" rx="2" />
            <path d="M16 2v4M8 2v4M3 9h18" />
        </Icon>
    );
}

function SettingsIcon() {
    return (
        <Icon size={18}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.41 1.41-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V20h-2v-.08a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-1.41-1.41.06-.06A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.55-1H7v-2h.85a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88L9 9.06l1.41-1.41.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1-1.55V6h2v.5a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06L19.7 9.06l-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.55 1H21v2h-.15a1.7 1.7 0 0 0-1.45 1Z" />
        </Icon>
    );
}

function HelpIcon() {
    return (
        <Icon size={18}>
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.5 2.5 0 1 1 4.3 1.75c-.9.9-1.8 1.25-1.8 2.75" />
            <path d="M12 17h.01" />
        </Icon>
    );
}

function LogoutIcon() {
    return (
        <Icon size={18}>
            <path d="M10 17l5-5-5-5" />
            <path d="M15 12H3" />
            <path d="M21 19V5a2 2 0 0 0-2-2h-7" />
        </Icon>
    );
}

function PlusIcon() {
    return (
        <Icon size={17}>
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
            className={`relative h-[18px] w-[34px] rounded-full transition ${enabled ? "bg-blue-700" : "bg-slate-200"
                }`}
        >
            <span
                className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm transition ${enabled ? "left-[18px]" : "left-[2px]"
                    }`}
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
                    {/* Arrow */}
                    <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-r border-b border-slate-200 bg-white z-10" />

                    <div className="relative flex h-[180px] w-[130px] flex-col items-center justify-center rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] ring-1 ring-slate-200 overflow-hidden">
                        {/* Background Highlight Pill */}
                        <div className="absolute top-1/2 left-2 right-2 h-[34px] -translate-y-1/2 rounded-lg bg-slate-100 pointer-events-none" />

                        <div className="relative z-10 flex h-[150px] w-full px-1 items-center">
                            {/* Hours */}
                            <PickerColumn
                                items={hours}
                                value={currentHour12Str}
                                onChange={(h) => updateTime(h, currentAmPm)}
                                className="text-[18px]"
                            />

                            {/* AM/PM */}
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
    const [saved, setSaved] = useState(false);

    function updateField(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

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

    function handleSave(event) {
        event.preventDefault();

        console.log("Clinic profile:", form);
        setSaved(true);
    }

    function handleCancel() {
        setForm(initialForm);
        setSaved(false);
    }

    return (
        <div className="bg-[#f7f8fa] text-slate-950 min-h-[calc(100vh-64px)] w-full">
            <div className="mx-auto max-w-[1060px]">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between border-b border-slate-300 pb-4">
                    <div>
                        <h1 className="text-[28px] font-medium leading-8 tracking-[-0.025em] text-slate-950">
                            Clinic Profile Settings
                        </h1>

                        <p className="mt-2 text-[14px] text-slate-600">
                            Manage your clinic&apos;s public information and contact
                            details.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="h-[36px] rounded-md border border-blue-700 bg-white px-5 text-[13px] font-medium text-blue-800 transition hover:bg-blue-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            className="h-[36px] rounded-md bg-blue-800 px-6 text-[13px] font-semibold text-white shadow-sm transition hover:bg-blue-900"
                        >
                            Save
                            <br />
                            Changes
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-5">
                    {/* GENERAL INFORMATION */}
                    <Section
                        icon={<StoreIcon />}
                        title="General Information"
                    >
                        <div className="space-y-5">
                            <Field label="Clinic Name" required>
                                <Input
                                    value={form.clinicName}
                                    onChange={(e) =>
                                        updateField("clinicName", e.target.value)
                                    }
                                />
                            </Field>

                            <Field label="Clinic Introduction">
                                <textarea
                                    value={form.introduction}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 500) {
                                            updateField("introduction", e.target.value);
                                        }
                                    }}
                                    placeholder="Briefly describe your clinic's mission, specialties, and atmosphere..."
                                    className="h-[100px] w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-3 text-[15px] text-slate-800 outline-none placeholder:text-slate-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                />

                                <div className="mt-1 text-right text-[12px] text-slate-500">
                                    {form.introduction.length} / 500 characters
                                </div>
                            </Field>
                        </div>
                    </Section>

                    {/* CONTACT & SOCIAL */}
                    <Section
                        icon={<PhoneIcon />}
                        title="Contact & Social"
                    >
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                            <Field label="Primary Phone">
                                <div className="flex">
                                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-slate-600">
                                        <PhoneIcon size={13} />
                                    </div>

                                    <Input
                                        value={form.primaryPhone}
                                        onChange={(e) =>
                                            updateField("primaryPhone", e.target.value)
                                        }
                                        className="rounded-l-none"
                                    />
                                </div>
                            </Field>

                            <Field label="Instagram">
                                <div className="flex">
                                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-[16px] text-slate-700">
                                        @
                                    </div>

                                    <Input
                                        value={form.instagram}
                                        onChange={(e) =>
                                            updateField("instagram", e.target.value)
                                        }
                                        className="rounded-l-none"
                                    />
                                </div>
                            </Field>

                            <Field label="Emergency / Secondary">
                                <div className="flex">
                                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-[18px] font-bold text-red-600">
                                        *
                                    </div>

                                    <Input
                                        value={form.emergencyPhone}
                                        onChange={(e) =>
                                            updateField("emergencyPhone", e.target.value)
                                        }
                                        className="rounded-l-none"
                                    />
                                </div>
                            </Field>

                            <Field label="Facebook URL">
                                <div className="flex">
                                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-[15px] text-slate-600">
                                        🔗
                                    </div>

                                    <Input
                                        value={form.facebook}
                                        onChange={(e) =>
                                            updateField("facebook", e.target.value)
                                        }
                                        placeholder="facebook.com/..."
                                        className="rounded-l-none"
                                    />
                                </div>
                            </Field>
                        </div>
                    </Section>

                    {/* LOCATION */}
                    <Section
                        icon={<LocationIcon />}
                        title="Location Details"
                    >
                        <div className="grid grid-cols-[1fr_1fr] gap-6">
                            <div className="space-y-5">
                                <Field label="Street Address">
                                    <Input
                                        value={form.streetAddress}
                                        onChange={(e) =>
                                            updateField("streetAddress", e.target.value)
                                        }
                                    />
                                </Field>

                                <div className="grid grid-cols-2 gap-4">
                                    <Field label="City">
                                        <Input
                                            value={form.city}
                                            onChange={(e) =>
                                                updateField("city", e.target.value)
                                            }
                                        />
                                    </Field>

                                    <Field label="State / Province">
                                        <Input
                                            value={form.state}
                                            onChange={(e) =>
                                                updateField("state", e.target.value)
                                            }
                                        />
                                    </Field>
                                </div>

                                <Field label="Zip / Postal Code">
                                    <Input
                                        value={form.zipCode}
                                        onChange={(e) =>
                                            updateField("zipCode", e.target.value)
                                        }
                                        className="max-w-[145px]"
                                    />
                                </Field>
                            </div>

                            {/* MAP PLACEHOLDER */}
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
                    <Section
                        icon={<MedicalIcon />}
                        title="Medical Specialties"
                    >
                        <div className="grid grid-cols-4 gap-3">
                            {Object.keys(form.specialties).map((specialty) => (
                                <label
                                    key={specialty}
                                    className="flex h-[36px] cursor-pointer items-center gap-2 rounded-md border border-slate-300 px-3 text-[13px] text-slate-800 transition hover:bg-slate-50"
                                >
                                    <input
                                        type="checkbox"
                                        checked={form.specialties[specialty]}
                                        onChange={() => updateSpecialty(specialty)}
                                        className="h-[18px] w-[18px] accent-blue-700"
                                    />

                                    <span>{specialty}</span>
                                </label>
                            ))}
                        </div>
                    </Section>

                    {/* CLINIC HOURS */}
                    <Section
                        icon={<ClockIcon />}
                        title="Clinic Hours"
                    >
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

                                            <span className="text-[13px] text-slate-600">
                                                to
                                            </span>

                                            <TimeSelect
                                                value={schedule.to}
                                                onChange={(val) => updateHour(day, "to", val)}
                                            />
                                        </div>
                                    ) : (
                                        <span className="mr-1 text-[13px] text-slate-400">
                                            Closed
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Section>

                    {saved && (
                        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700">
                            Changes saved locally. Backend integration can be added
                            later.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}