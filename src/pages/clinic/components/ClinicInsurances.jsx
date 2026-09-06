import React, { useState, useMemo } from 'react';
import {
    ShieldCheck,
    ShieldPlus,
    Building2,
    Layers,
    Phone,
    Globe,
    Zap,
    Percent,
    Receipt,
    CheckCircle2,
    Plus,
    Search,
    MoreVertical,
    Edit3,
    Trash2,
    X,
    Check
} from 'lucide-react';

const INITIAL_INSURANCES = [
    {
        id: "1",
        name: "GIG Jordan",
        network: "Gulf Insurance Group",
        code: "GIG",
        badgeBg: "bg-blue-100",
        badgeText: "text-blue-700",
        coverageTier: "Gold, Silver, Platinum",
        copay: "10% Standard",
        phone: "0785609999",
        directBillingType: "Instant Pre-approval",
        portalUrl: "https://e-claims.gig.com.jo",
        instantPreApproval: true,
        status: "Active Agreement",
    },
    {
        id: "2",
        name: "MedNet Jordan",
        network: "Munich Re TPA Network",
        code: "MN",
        badgeBg: "bg-emerald-100",
        badgeText: "text-emerald-700",
        coverageTier: "Class A, B, VIP",
        copay: "15% Standard",
        phone: "0795658800",
        directBillingType: "Online Portal",
        portalUrl: "https://portal.mednet.jo",
        instantPreApproval: true,
        status: "Active Agreement",
    },
    {
        id: "3",
        name: "NatHealth",
        network: "National Health Insurance",
        code: "NH",
        badgeBg: "bg-indigo-100",
        badgeText: "text-indigo-700",
        coverageTier: "Prime, Premium",
        copay: "20% Specialist",
        phone: "0775682020",
        directBillingType: "Direct Network",
        portalUrl: "https://claims.nathealth.com.jo",
        instantPreApproval: true,
        status: "Active Agreement",
    },
    {
        id: "4",
        name: "Arab Orient Insurance",
        network: "Al-Nisr Al-Arabi",
        code: "AO",
        badgeBg: "bg-teal-100",
        badgeText: "text-teal-700",
        coverageTier: "Corporate Elite, Standard",
        copay: "10% Consultations",
        phone: "0785654000",
        directBillingType: "Synced Electronic",
        portalUrl: "https://orient-insurance.jo",
        instantPreApproval: true,
        status: "Active Agreement",
    },
];

const COLOR_PALETTES = [
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-emerald-100", text: "text-emerald-700" },
    { bg: "bg-indigo-100", text: "text-indigo-700" },
    { bg: "bg-teal-100", text: "text-teal-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
    { bg: "bg-amber-100", text: "text-amber-700" },
    { bg: "bg-rose-100", text: "text-rose-700" },
];

function generateCode(name) {
    if (!name) return "INS";
    const match = name.match(/\(([^)]+)\)/);
    if (match && match[1]) {
        return match[1].trim().slice(0, 4).toUpperCase();
    }
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
        return words[0].slice(0, 3).toUpperCase();
    }
    return words.map(w => w[0]).join('').slice(0, 3).toUpperCase();
}

/**
 * Validates Jordanian mobile numbers:
 * Must strictly start with 078, 079, or 077 and have exactly 10 digits.
 */
function validateJordanianPhone(phoneStr) {
    if (!phoneStr || !phoneStr.trim()) {
        return { isValid: false, error: "Phone number is required" };
    }
    const cleaned = phoneStr.replace(/[\s\-()]/g, "");

    // Check if it starts with 077, 078, or 079 and is 10 digits
    const regex = /^(077|078|079)\d{7}$/;
    if (!regex.test(cleaned)) {
        return {
            isValid: false,
            error: "Phone number must start with 078, 079, or 077 (10 digits)"
        };
    }
    return { isValid: true, cleaned, error: "" };
}

/**
 * Validates Co-Pay number: must be numbers only (0-100)
 */
function validateCopayNumber(copayStr) {
    if (!copayStr || !String(copayStr).trim()) {
        return { isValid: false, error: "Co-pay percentage is required" };
    }
    const cleaned = String(copayStr).replace(/[^0-9.]/g, "");
    const num = parseFloat(cleaned);
    if (isNaN(num) || num < 0 || num > 100) {
        return { isValid: false, error: "Co-pay must be a number between 0 and 100" };
    }
    return { isValid: true, value: num, error: "" };
}

export default function ClinicInsurances() {
    const [insurances, setInsurances] = useState(INITIAL_INSURANCES);
    const [searchQuery, setSearchQuery] = useState("");
    const [openMenuId, setOpenMenuId] = useState(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        coverageTier: "",
        copay: "",
        phone: "",
        portalUrl: "",
        instantPreApproval: false,
    });
    const [errors, setErrors] = useState({});

    // Toast State
    const [toast, setToast] = useState(null);

    const showToast = (title, message) => {
        setToast({ title, message });
        setTimeout(() => {
            setToast(null);
        }, 4000);
    };

    const handleOpenModal = (item = null) => {
        setOpenMenuId(null);
        setErrors({});
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name || "",
                coverageTier: item.coverageTier || "",
                copay: item.copay ? String(item.copay).replace(/[^0-9.]/g, "") : "",
                phone: item.phone || "",
                portalUrl: item.portalUrl || "",
                instantPreApproval: item.instantPreApproval ?? true,
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: "",
                coverageTier: "",
                copay: "", // Starts completely empty / blank
                phone: "",
                portalUrl: "",
                instantPreApproval: false,
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setErrors({});
    };

    const handleSave = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.name.trim()) {
            validationErrors.name = "Insurance company name is required";
        }

        if (!formData.coverageTier.trim()) {
            validationErrors.coverageTier = "Coverage tiers are required";
        }

        const copayCheck = validateCopayNumber(formData.copay);
        if (!copayCheck.isValid) {
            validationErrors.copay = copayCheck.error;
        }

        const phoneCheck = validateJordanianPhone(formData.phone);
        if (!phoneCheck.isValid) {
            validationErrors.phone = phoneCheck.error;
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formattedCopay = `${copayCheck.value}% Standard`;
        const formattedPhone = phoneCheck.cleaned;

        if (editingItem) {
            // Update existing
            const updated = insurances.map(item => {
                if (item.id === editingItem.id) {
                    return {
                        ...item,
                        name: formData.name.trim(),
                        coverageTier: formData.coverageTier.trim(),
                        copay: formattedCopay,
                        phone: formattedPhone,
                        portalUrl: formData.portalUrl.trim(),
                        instantPreApproval: formData.instantPreApproval,
                        directBillingType: formData.instantPreApproval ? "Instant Pre-approval" : (item.directBillingType || "Online Portal"),
                    };
                }
                return item;
            });
            setInsurances(updated);
            showToast("Insurance Updated", `"${formData.name}" has been successfully updated.`);
        } else {
            // Create new
            const paletteIndex = insurances.length % COLOR_PALETTES.length;
            const chosenPalette = COLOR_PALETTES[paletteIndex];
            const newCode = generateCode(formData.name);

            const newItem = {
                id: Date.now().toString(),
                name: formData.name.trim(),
                network: formData.name.includes("(") ? formData.name.split("(")[0].trim() : "Healthcare Network",
                code: newCode,
                badgeBg: chosenPalette.bg,
                badgeText: chosenPalette.text,
                coverageTier: formData.coverageTier.trim(),
                copay: formattedCopay,
                phone: formattedPhone,
                portalUrl: formData.portalUrl.trim(),
                instantPreApproval: formData.instantPreApproval,
                directBillingType: formData.instantPreApproval ? "Instant Pre-approval" : "Online Portal",
                status: "Active Agreement",
            };
            setInsurances(prev => [...prev, newItem]);
            showToast("Insurance Added", `"${formData.name}" has been added successfully.`);
        }

        handleCloseModal();
    };

    const handleDelete = (id) => {
        const itemToDelete = insurances.find(i => i.id === id);
        setInsurances(prev => prev.filter(i => i.id !== id));
        setOpenMenuId(null);
        showToast("Insurance Removed", itemToDelete ? `"${itemToDelete.name}" was removed.` : "Insurance company removed.");
    };

    // Filter partners based on search query
    const filteredInsurances = useMemo(() => {
        if (!searchQuery.trim()) return insurances;
        const query = searchQuery.toLowerCase();
        return insurances.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.network?.toLowerCase().includes(query) ||
            item.coverageTier?.toLowerCase().includes(query) ||
            item.code?.toLowerCase().includes(query) ||
            item.phone?.includes(query)
        );
    }, [insurances, searchQuery]);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* ─── Breadcrumb & Main Header (Cleaned up text) ─── */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-blue-600 uppercase mb-1">
                        <span>CLINIC PROFILE</span>
                        <span className="text-gray-300 font-normal">/</span>
                        <span className="text-blue-500">NETWORK AFFILIATIONS</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Insurance Companies
                    </h1>
                </div>

                {/* Right Header Actions */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search provider or policy..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all placeholder:text-gray-400 text-gray-800"
                        />
                    </div>

                    {/* Add Insurance Company Button */}
                    <button
                        type="button"
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
                    >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Add Insurance Company</span>
                    </button>
                </div>
            </div>

            {/* ─── Top 3 Summary KPI Cards ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {/* Active Providers Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs flex items-center justify-between transition-all hover:shadow-xs">
                    <div>
                        <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                            ACTIVE PROVIDERS
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            {insurances.length} Companies
                        </h3>
                        <div className="flex items-center gap-1.5 mt-2 text-emerald-600 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>100% Verified Claims</span>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
                    </div>
                </div>

                {/* Direct Billing Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs flex items-center justify-between transition-all hover:shadow-xs">
                    <div>
                        <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                            DIRECT BILLING
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            Enabled
                        </h3>
                        <p className="text-xs font-medium text-gray-400 mt-2">
                            Electronic portal synced
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                        <Receipt className="w-6 h-6 stroke-[1.8]" />
                    </div>
                </div>

                {/* Default Co-Pay Rate Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs flex items-center justify-between transition-all hover:shadow-xs">
                    <div>
                        <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                            DEFAULT CO-PAY RATE
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            10% – 20%
                        </h3>
                        <p className="text-xs font-medium text-gray-400 mt-2">
                            Based on tiered coverage
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                        <Percent className="w-5 h-5 stroke-[2.2]" />
                    </div>
                </div>
            </div>

            {/* ─── Accepted Insurance Partners Section (Cleaned text) ─── */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">
                        Accepted Insurance Partners
                    </h2>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredInsurances.map((partner) => (
                        <div
                            key={partner.id}
                            className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between relative group"
                        >
                            <div>
                                {/* Card Header */}
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-11 h-11 rounded-xl ${partner.badgeBg || "bg-blue-100"} ${partner.badgeText || "text-blue-700"
                                                } flex items-center justify-center font-bold text-sm tracking-wider shrink-0 shadow-2xs`}
                                        >
                                            {partner.code || "INS"}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base leading-snug">
                                                {partner.name}
                                            </h4>
                                            <p className="text-xs text-gray-400 font-medium">
                                                {partner.network || "Health Partner"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 3-dot Action Menu */}
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenMenuId(openMenuId === partner.id ? null : partner.id)
                                            }
                                            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                                            title="More options"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>

                                        {openMenuId === partner.id && (
                                            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20 animate-[fadeIn_0.15s_ease-out]">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setOpenMenuId(null);
                                                        handleOpenModal(partner);
                                                    }}
                                                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setOpenMenuId(null);
                                                        handleDelete(partner.id);
                                                    }}
                                                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Key-Value Details */}
                                <div className="space-y-2.5 text-xs text-gray-600 border-t border-gray-50 pt-3.5 mb-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-gray-400 font-medium shrink-0">Coverage Tier:</span>
                                        <span className="font-semibold text-gray-800 text-right truncate">
                                            {partner.coverageTier}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-gray-400 font-medium shrink-0">Co-Pay / Deductible:</span>
                                        <span className="font-semibold text-gray-800 text-right">
                                            {partner.copay}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-gray-400 font-medium shrink-0">Approval Hotline:</span>
                                        <span className="font-semibold text-gray-800 font-mono text-right">
                                            {partner.phone}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-gray-400 font-medium shrink-0">Direct Billing:</span>
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            <span>
                                                {partner.directBillingType ||
                                                    (partner.instantPreApproval ? "Instant Pre-approval" : "Online Portal")}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="flex items-center justify-between pt-3.5 border-t border-gray-100">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50/90 text-emerald-600 border border-emerald-100/60">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span>Active Agreement</span>
                                </span>
                                <div className="flex items-center gap-1 text-xs font-semibold">
                                    <button
                                        type="button"
                                        onClick={() => handleOpenModal(partner)}
                                        className="text-gray-500 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(partner.id)}
                                        className="text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Placeholder Add Card */}
                    <button
                        type="button"
                        onClick={() => handleOpenModal()}
                        className="border-2 border-dashed border-gray-200 hover:border-blue-400 bg-white/40 hover:bg-blue-50/20 rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-200 min-h-[250px] group"
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-blue-100 text-blue-500 flex items-center justify-center mb-3 transition-colors">
                            <Plus className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">
                            Add New Insurance Company
                        </h4>
                        <p className="text-xs text-gray-400 max-w-[220px] mt-1 font-medium leading-relaxed">
                            Link medical insurance providers and set accepted plans for your clinic
                        </p>
                    </button>
                </div>
            </div>

            {/* ─── Add / Edit Insurance Modal (Clean & Minimal with Strict Validation) ─── */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-7 relative border border-gray-100 animate-[scaleIn_0.2s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                    <ShieldPlus className="w-5 h-5 stroke-[2]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                                        {editingItem ? "Edit Insurance Company" : "Add Insurance Company"}
                                    </h3>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSave} className="space-y-4 mt-5" noValidate>
                            {/* Company Name */}
                            <div>
                                <label className="flex items-center gap-1 text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5">
                                    <span>INSURANCE COMPANY NAME</span>
                                    <span className="text-red-500 shrink-0">*</span>
                                </label>
                                <div className="relative">
                                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Jordan Insurance Company (JIC)"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if (errors.name) setErrors({ ...errors, name: "" });
                                        }}
                                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${errors.name ? "border-red-400 focus:ring-red-400/20" : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                                            } rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-gray-800 placeholder:text-gray-400`}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>
                                )}
                            </div>

                            {/* Accepted Coverage Tiers */}
                            <div>
                                <label className="flex items-center gap-1 text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5">
                                    <span>ACCEPTED COVERAGE TIERS / CLASSES</span>
                                    <span className="text-red-500 shrink-0">*</span>
                                </label>
                                <div className="relative">
                                    <Layers className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Class A, Class B, VIP, Corporate Gold"
                                        value={formData.coverageTier}
                                        onChange={(e) => {
                                            setFormData({ ...formData, coverageTier: e.target.value });
                                            if (errors.coverageTier) setErrors({ ...errors, coverageTier: "" });
                                        }}
                                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${errors.coverageTier ? "border-red-400 focus:ring-red-400/20" : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                                            } rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-gray-800 placeholder:text-gray-400`}
                                    />
                                </div>
                                {errors.coverageTier && (
                                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.coverageTier}</p>
                                )}
                            </div>

                            {/* 2-Column: Co-Pay & Pre-Approval Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
                                {/* Co-Pay (%) - Number Only, Empty by Default */}
                                <div>
                                    <label className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5 h-5 whitespace-nowrap">
                                        <span className="truncate">DEFAULT PATIENT CO-PAY (%)</span>
                                        <span className="text-red-500 shrink-0">*</span>
                                    </label>
                                    <div className="relative">
                                        <Percent className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="e.g. 10"
                                            value={formData.copay}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9.]/g, '');
                                                setFormData({ ...formData, copay: val });
                                                if (errors.copay) setErrors({ ...errors, copay: "" });
                                            }}
                                            className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${errors.copay ? "border-red-400 focus:ring-red-400/20" : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                                                } rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-gray-800 placeholder:text-gray-400`}
                                        />
                                    </div>
                                    {errors.copay && (
                                        <p className="text-xs text-red-500 mt-1 font-medium">{errors.copay}</p>
                                    )}
                                </div>

                                {/* Phone - Strictly Jordan 078 / 079 / 077 */}
                                <div>
                                    <label className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5 h-5 whitespace-nowrap">
                                        <span className="truncate">Approval Phone</span>
                                        <span className="text-red-500 shrink-0">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input
                                            type="tel"
                                            placeholder="078xxxxxxx"
                                            maxLength={12}
                                            value={formData.phone}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9]/g, '');
                                                setFormData({ ...formData, phone: val });
                                                if (errors.phone) setErrors({ ...errors, phone: "" });
                                            }}
                                            className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${errors.phone ? "border-red-400 focus:ring-red-400/20" : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                                                } rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-gray-800 placeholder:text-gray-400 font-mono`}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-xs text-red-500 mt-1 font-medium leading-tight">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            {/* Claims Portal URL */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5">
                                    CLAIMS PORTAL / E-APPROVAL URL (OPTIONAL)
                                </label>
                                <div className="relative">
                                    <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="https://e-approval.jic.jo"
                                        value={formData.portalUrl}
                                        onChange={(e) => setFormData({ ...formData, portalUrl: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Feature Toggle Box */}
                            <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3.5 flex items-center justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-7 h-7 rounded-lg bg-blue-100/70 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                                        <Zap className="w-4 h-4 fill-blue-600 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 leading-snug">
                                            Enable Instant Electronic Pre-approval
                                        </p>
                                        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                            Allow instant patient eligibility lookup during appointment booking
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            instantPreApproval: !formData.instantPreApproval,
                                        })
                                    }
                                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${formData.instantPreApproval ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${formData.instantPreApproval ? "translate-x-5" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                                >
                                    <Check className="w-4 h-4 stroke-[2.5]" />
                                    <span>
                                        {editingItem ? "Update Insurance Company" : "Save Insurance Company"}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ─── Interactive Toast Notification ─── */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-gray-800 animate-[scaleIn_0.2s_ease-out]">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white">{toast.title}</p>
                        <p className="text-xs text-gray-300">{toast.message}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setToast(null)}
                        className="ml-2 text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}
        </div>
    );
}
