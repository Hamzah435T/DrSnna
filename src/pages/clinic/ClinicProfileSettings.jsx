import { useState } from "react";
import { Link, Form } from "react-router";

const initialForm = {
    clinicName: "Dr.Sna Dental",
    introduction: "",
    primaryPhone: "(555) 000-0000",
    emergencyPhone: "(555) 999-9999",
    instagram: "drsna_dental",
    facebook: "",
    streetAddress: "123 Dental Way, Suite 400",
    city: "Metropolis",
    state: "NY",
    zipCode: "10001",
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
        Monday: { enabled: true, from: "09:00", to: "17:00" },
        Tuesday: { enabled: true, from: "09:00", to: "17:00" },
        Wednesday: { enabled: true, from: "09:00", to: "17:00" },
        Thursday: { enabled: true, from: "09:00", to: "17:00" },
        Friday: { enabled: true, from: "09:00", to: "13:00" },
        Saturday: { enabled: false, from: "09:00", to: "17:00" },
        Sunday: { enabled: false, from: "09:00", to: "17:00" },
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
                <h2 className="text-[20px] font-medium tracking-[-0.01em] text-slate-950">
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
      <span className="mb-2 block text-[11px] font-medium tracking-wide text-slate-700">
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
            className={`h-[36px] w-full rounded-md border border-slate-300 bg-white px-3 text-[13px] text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${className}`}
        />
    );
}

function Toggle({ enabled, onChange }) {
    return (
        <button
            type="button"
            onClick={onChange}
            aria-pressed={enabled}
            className={`relative h-[18px] w-[34px] rounded-full transition ${
                enabled ? "bg-blue-700" : "bg-slate-200"
            }`}
        >
      <span
          className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm transition ${
              enabled ? "left-[18px]" : "left-[2px]"
          }`}
      />
        </button>
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
        <div className="min-h-screen bg-[#f7f8fa] text-slate-950">
            <div className="flex min-h-screen">
                {/* SIDEBAR */}
                <aside className="fixed left-0 top-0 z-20 flex h-screen w-[182px] flex-col border-r border-slate-300 bg-white">
                    {/* Logo / Brand */}
                    <div className="flex h-[86px] items-center gap-2 px-4">
                        <div className="flex h-[42px] w-[30px] items-center justify-center rounded-md border border-slate-200 bg-slate-50">
                            <div className="text-[17px] text-blue-700">✦</div>
                        </div>

                        <div>
                            <div className="text-[17px] font-medium leading-5 text-blue-800">
                                Dr.Sna Admin
                            </div>
                            <div className="mt-0.5 text-[9px] tracking-wide text-slate-600">
                                Clinical Management
                            </div>
                        </div>
                    </div>

                    {/* New Appointment */}
                    <div className="px-3">
                        <button
                            type="button"
                            className="flex h-[29px] w-full items-center justify-center gap-2 rounded-md bg-blue-800 text-[11px] font-semibold text-white shadow-sm transition hover:bg-blue-900"
                        >
                            <PlusIcon />
                            Add New Appointment
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="mt-4 px-3">
                        <Link
                            to="/clinic"
                            className="mb-1 flex h-[32px] items-center gap-3 rounded-md px-2.5 text-[11px] text-slate-700 transition hover:bg-slate-100"
                        >
                            <DashboardIcon />
                            Dashboard
                        </Link>

                        <Link
                            to="/clinic"
                            className="mb-1 flex h-[32px] items-center gap-3 rounded-md px-2.5 text-[11px] text-slate-700 transition hover:bg-slate-100"
                        >
                            <BriefcaseIcon />
                            Doctors
                        </Link>

                        <Link
                            to="/clinic"
                            className="mb-1 flex h-[32px] items-center gap-3 rounded-md px-2.5 text-[11px] text-slate-700 transition hover:bg-slate-100"
                        >
                            <CalendarIcon />
                            Appointments
                        </Link>

                        <Link
                            to="/clinic/settings"
                            className="flex h-[32px] items-center gap-3 rounded-md bg-blue-700 px-2.5 text-[11px] font-medium text-white shadow-sm"
                        >
                            <SettingsIcon />
                            Settings
                        </Link>
                    </nav>

                    {/* Bottom Navigation */}
                    <div className="mt-auto px-3 pb-4">
                        <div className="mb-3 border-t border-slate-300" />

                        <button
                            type="button"
                            className="mb-1 flex h-[30px] w-full items-center gap-3 rounded-md px-2.5 text-[10px] text-slate-700 hover:bg-slate-100"
                        >
                            <HelpIcon />
                            Support
                        </button>

                        <Form method="post" action="/logout">
                            <button
                                type="submit"
                                className="flex h-[30px] w-full items-center gap-3 rounded-md px-2.5 text-[10px] text-slate-700 hover:bg-slate-100"
                            >
                                <LogoutIcon />
                                Logout
                            </button>
                        </Form>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="ml-[182px] min-h-screen w-[calc(100%-182px)] px-7 py-7">
                    <div className="mx-auto max-w-[1060px]">
                        {/* Header */}
                        <div className="mb-6 flex items-start justify-between border-b border-slate-300 pb-4">
                            <div>
                                <h1 className="text-[25px] font-medium leading-8 tracking-[-0.025em] text-slate-950">
                                    Clinic Profile Settings
                                </h1>

                                <p className="mt-1 text-[11px] text-slate-600">
                                    Manage your clinic&apos;s public information and contact
                                    details.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="h-[30px] rounded-md border border-blue-700 bg-white px-5 text-[10px] font-medium text-blue-800 transition hover:bg-blue-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="h-[30px] rounded-md bg-blue-800 px-6 text-[10px] font-semibold text-white shadow-sm transition hover:bg-blue-900"
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
                        className="h-[92px] w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-3 text-[13px] text-slate-800 outline-none placeholder:text-slate-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                                        <div className="mt-1 text-right text-[9px] text-slate-500">
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
                                            <div className="flex h-[36px] w-[35px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-slate-600">
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
                                            <div className="flex h-[36px] w-[35px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-[14px] text-slate-700">
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
                                            <div className="flex h-[36px] w-[35px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-[16px] font-bold text-red-600">
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
                                            <div className="flex h-[36px] w-[35px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-[13px] text-slate-600">
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
                                                <span className="mt-2 whitespace-nowrap text-[10px] text-slate-600">
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
                                            className="flex h-[30px] cursor-pointer items-center gap-2 rounded-md border border-slate-300 px-2.5 text-[10px] text-slate-800 transition hover:bg-slate-50"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={form.specialties[specialty]}
                                                onChange={() => updateSpecialty(specialty)}
                                                className="h-[15px] w-[15px] accent-blue-700"
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
                                            className={`flex min-h-[54px] items-center justify-between ${
                                                index !== Object.entries(form.hours).length - 1
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
                                                    className={`w-[80px] text-[13px] font-medium ${
                                                        schedule.enabled
                                                            ? "text-slate-950"
                                                            : "text-slate-400"
                                                    }`}
                                                >
                          {day}
                        </span>
                                            </div>

                                            {schedule.enabled ? (
                                                <div className="flex items-center gap-3">
                                                    <label className="relative">
                                                        <input
                                                            type="time"
                                                            value={schedule.from}
                                                            onChange={(e) =>
                                                                updateHour(day, "from", e.target.value)
                                                            }
                                                            className="h-[30px] w-[84px] rounded-md border border-slate-300 bg-white px-2 text-[10px] text-slate-700 outline-none focus:border-blue-600"
                                                        />
                                                    </label>

                                                    <span className="text-[10px] text-slate-600">
                            to
                          </span>

                                                    <label className="relative">
                                                        <input
                                                            type="time"
                                                            value={schedule.to}
                                                            onChange={(e) =>
                                                                updateHour(day, "to", e.target.value)
                                                            }
                                                            className="h-[30px] w-[84px] rounded-md border border-slate-300 bg-white px-2 text-[10px] text-slate-700 outline-none focus:border-blue-600"
                                                        />
                                                    </label>
                                                </div>
                                            ) : (
                                                <span className="mr-1 text-[10px] text-slate-400">
                          Closed
                        </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Section>

                            {saved && (
                                <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-[11px] text-green-700">
                                    Changes saved locally. Backend integration can be added
                                    later.
                                </div>
                            )}
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}