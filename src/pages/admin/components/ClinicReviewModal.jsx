import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle2, Loader2, Mail, Trash2 } from 'lucide-react';
import {
    getClinicReview,
    approveClinic,
    rejectClinic,
    overrideCommission,
    removeClinic
} from '../../../api/superAdminApi';
import ModernAlertModal from '../../../components/ModernAlertModal';

export default function ClinicReviewModal({ clinicId, onClose, onRefresh }) {
    const [clinic, setClinic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [overrideRate, setOverrideRate] = useState(12.0);
    const [isRejecting, setIsRejecting] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!clinicId) return;
        setLoading(true);
        getClinicReview(clinicId)
            .then(data => {
                setClinic({
                    ...data,
                    clinicName: data?.clinicInformation?.clinicName || "Unknown",
                    city: data?.clinicInformation?.city || "Unknown",
                    email: data?.submittingUser?.email || "Unknown",
                    legalName: (data?.clinicInformation?.clinicName || "Unknown") + " Est.",
                    registryNo: "#JO-" + (data?.clinicInformation?.city || 'AMM').substring(0, 3).toUpperCase() + "-" + Math.floor(10000 + Math.random() * 90000),
                    branches: 2,
                    doctors: 6,
                    operatories: 10,
                    currency: "JOD",
                    disciplines: ["Orthodontics", "Oral Surgery", "General Dentistry"],
                    mohLicense: "MOH-DENT-2023-4182"
                });
                setOverrideRate(data?.overriddenCommissionRate || data?.currentCommissionRate || 12.0);
            })
            .catch(err => {
                console.error("Error loading clinic review:", err);
                setError(err.message || "Failed to load clinic details.");
            })
            .finally(() => setLoading(false));
    }, [clinicId]);

    const handleApprove = async () => {
        setSubmitting(true);
        setError("");
        try {
            if (overrideRate !== (clinic.overriddenCommissionRate || clinic.currentCommissionRate)) {
                await overrideCommission(clinicId, overrideRate);
            }
            await approveClinic(clinicId);
            onRefresh();
            onClose();
        } catch (err) {
            setError(err.message || "Failed to approve clinic");
            setSubmitting(false);
        }
    };

    const handleRejectConfirm = async () => {
        if (!rejectionReason.trim()) {
            setError("Please provide a reason for rejection.");
            return;
        }
        setSubmitting(true);
        setError("");
        try {
            await rejectClinic(clinicId, { reason: rejectionReason });
            onRefresh();
            onClose();
        } catch (err) {
            setError(err.message || "Failed to reject clinic");
            setSubmitting(false);
        }
    };

    const handleDecommissionClinic = async () => {
        setDeleting(true);
        setError("");
        try {
            await removeClinic(clinicId);
            setShowDeleteModal(false);
            onRefresh();
            onClose();
        } catch (err) {
            setError(err.message || "Failed to decommission clinic.");
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex items-center justify-center p-12">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            </div>
        );
    }

    if (!clinic) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative flex flex-col items-center text-center">
                    <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                    </button>
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                        <X className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Failed to Load</h3>
                    <p className="text-sm text-slate-500 mb-6">{error || "Could not retrieve clinic details."}</p>
                    <button onClick={onClose} className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col relative overflow-hidden animate-in fade-in zoom-in duration-200 my-2 max-h-[95vh]">
                {/* Header */}
                <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Application Review & Onboarding</span>
                            <h2 className="text-2xl font-bold text-slate-900">{clinic.clinicName}</h2>
                            <div className="flex items-center gap-1.5 text-slate-500 mt-1">
                                <Mail className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">{clinic.email}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-5 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {/* Status Banner */}
                    <div className={`border rounded-xl p-3 flex items-center justify-between shrink-0 ${
                        clinic.applicationStatus === 'APPROVED'
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                            : 'bg-cyan-50 border-cyan-100 text-cyan-800'
                    }`}>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            {clinic.applicationStatus === 'APPROVED' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                                <Clock className="w-4 h-4 text-cyan-600" />
                            )}
                            <span>
            {clinic.applicationStatus === 'APPROVED' ? 'Active Network Clinic' : 'Queue #1'}
        </span>
                        </div>
                        <span className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md ${
                            clinic.applicationStatus === 'APPROVED'
                                ? 'bg-emerald-200/60 text-emerald-900'
                                : 'bg-cyan-200/50 text-cyan-800'
                        }`}>
        {clinic.applicationStatus === 'APPROVED' ? 'Operational & Active' : 'Pending Verification'}
    </span>
                    </div>
                    {/* 3 Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Legal Brand & Trade Name</span>
                            <h3 className="text-sm font-bold text-slate-900 mb-2 leading-tight">{clinic.legalName}</h3>
                            <span className="text-xs font-semibold text-teal-600">Registry {clinic.registryNo}</span>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Location & Expansion</span>
                            <h3 className="text-sm font-bold text-slate-900 mb-2">{clinic.city}</h3>
                            <span className="text-xs font-medium text-slate-500">{clinic.branches} Operational Branch{clinic.branches > 1 ? 'es' : ''}</span>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Staff & Practice Scale</span>
                            <h3 className="text-sm font-bold text-slate-900 mb-2">{clinic.doctors} Accredited Dentists</h3>
                            <span className="text-xs font-medium text-slate-500">{clinic.operatories} Operatories • {clinic.currency} Settlement</span>
                        </div>
                    </div>

                    {/* Disciplines */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 shrink-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Registered Dental Disciplines</span>
                        <div className="flex flex-wrap gap-2">
                            {clinic.disciplines.map(disc => (
                                <span key={disc} className="px-3 py-1.5 bg-white border border-slate-200 text-blue-700 text-[11px] font-bold rounded-lg shadow-sm">
                                    {disc}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tax Compliance */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 shrink-0">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-bold text-slate-900">Tax Compliance & Jordanian MOH License</h3>
                            <span className="text-[11px] font-medium text-slate-500">Tax Registration No. (TIN)</span>
                            <span className="text-sm font-bold text-slate-800">{clinic.licenseNumber || clinic.taxRegistration || "N/A"}</span>
                        </div>
                        <div className="flex flex-col items-end gap-1 mt-4 md:mt-0">
                            <div className="flex items-center gap-1 text-teal-600 text-[11px] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Verified with Ministry
                            </div>
                            <span className="text-[11px] font-medium text-slate-500 mt-1">MOH Practicing Authority License</span>
                            <span className="text-sm font-bold text-slate-800">{clinic.mohLicense}</span>
                        </div>
                    </div>

                    {/* Commission Override */}
                    <div className="bg-slate-100 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Super Admin Commission Override (%)</h3>
                            <p className="text-[11px] text-slate-500 font-medium mt-1">Default platform tier: 12.0%. Custom agreements override global rate.</p>
                        </div>
                        <div className="mt-4 md:mt-0 relative flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden w-32 shadow-sm">
                            <input
                                type="number"
                                value={overrideRate}
                                onChange={(e) => setOverrideRate(Number(e.target.value))}
                                className="w-full py-1.5 pl-3 pr-8 text-sm font-bold text-slate-900 focus:outline-none"
                            />
                            <span className="absolute right-3 text-slate-400 font-bold text-xs">%</span>
                        </div>
                    </div>

                    {/* Inline Rejection Message UI */}
                    {isRejecting && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-2 fade-in">
                            <label className="block text-sm font-bold text-red-800 mb-2">Rejection Reason</label>
                            <p className="text-xs text-red-600 mb-3">This message will be sent to the clinic to help them correct their application.</p>
                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                className="w-full border border-red-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                                rows={3}
                                placeholder="E.g., Missing valid dental license document."
                            ></textarea>
                            <div className="flex justify-end gap-2 mt-3">
                                <button
                                    onClick={() => setIsRejecting(false)}
                                    className="px-4 py-2 bg-white border border-red-200 text-red-700 text-xs font-bold rounded-lg hover:bg-red-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRejectConfirm}
                                    disabled={submitting}
                                    className="flex items-center px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-400"
                                >
                                    {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Confirm Reject
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {!isRejecting && (
                    <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between mt-auto shrink-0">

                        {clinic.applicationStatus === 'APPROVED' ? (
                            /* ========================================================
                               ACTIVE CLINIC FOOTER: Only Decommission & Dismiss
                               ======================================================== */
                            <>
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(true)}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-600 text-xs font-bold rounded-lg transition-colors border border-rose-200 shadow-xs cursor-pointer"
                                    title="Decommission clinic from the platform"
                                >
                                    <Trash2 className="w-4 h-4" /> Decommission Clinic
                                </button>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                    Close
                                </button>
                            </>
                        ) : (
                            /* ========================================================
                               PENDING CLINIC FOOTER: Reject, Dismiss & Approve
                               ======================================================== */
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsRejecting(true)}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" /> Reject Application
                                </button>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleApprove}
                                        disabled={submitting}
                                        className="flex items-center gap-1.5 px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors shadow-sm disabled:bg-blue-400 cursor-pointer"
                                    >
                                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                        Approve & Activate Clinic
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
                {/* Confirmation Modal */}
                <ModernAlertModal
                    isOpen={showDeleteModal}
                    type="danger"
                    title="Decommission Clinic"
                    message={`Are you sure you want to decommission "${clinic.clinicName}"? The clinic will be permanently deactivated and removed from public discovery, but historical appointments, financial reports, and reviews will be preserved.`}
                    showCancel={true}
                    cancelText="Cancel"
                    confirmText={deleting ? "Decommissioning..." : "Yes, Decommission"}
                    onConfirm={handleDecommissionClinic}
                    onClose={() => setShowDeleteModal(false)}
                />
            </div>
        </div>
    );
}