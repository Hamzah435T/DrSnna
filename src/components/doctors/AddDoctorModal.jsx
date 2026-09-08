import  { useState } from 'react';
import { UserPlus, Mail,  Info, Send, X, RefreshCw, Check } from 'lucide-react';
import { createDoctor } from '../../services/doctorService';

export const AddDoctorModal = ({
                                   isOpen,
                                   onClose,
                                   onSuccess,
                                   specialties = []
                               }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [bio, setBio] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const toggleSpecialty = (s) => {
        setSelectedSpecialties(prev =>
            prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (selectedSpecialties.length === 0) {
            setError("Please select at least one specialty.");
            setLoading(false);
            return;
        }

        try {
            await createDoctor({
                fullName: fullName.trim(),
                email: email.trim(),
                specialty: selectedSpecialties.join(', '),
                bio: bio.trim(),
                sendEmailNotification: true,
            });

            // Reset form
            setFullName('');
            setEmail('');
            setSelectedSpecialties([]);
            setBio('');

            onSuccess();
            onClose();
        } catch (err) {
            setError(err.message || 'An error occurred while adding the doctor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-[fadeIn_0.15s_ease-out]"
            onClick={onClose}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-[16px] shadow-2xl w-full max-w-[540px] mx-4 overflow-hidden animate-[scaleIn_0.2s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-7 pb-5">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100/50">
                            <UserPlus className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-[17px] font-bold text-slate-900">Add New Doctor</h2>
                            <p className="text-xs text-slate-500 mt-0.5">Add a healthcare practitioner to your clinic roster.</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-7 py-2 flex flex-col gap-5">
                    {/* Full Name */}
                    <label className="block">
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">Doctor Full Name <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <UserPlus className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
                                placeholder="Dr. Tariq Haddad"
                                required
                            />
                        </div>
                    </label>

                    {/* Email Address */}
                    <div className="bg-[#f8faff] border border-blue-100 rounded-2xl p-4 -mx-1">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1">Doctor Email Address <span className="text-red-500">*</span></span>
                            <div className="flex items-center gap-1.5 bg-blue-100/50 text-blue-700 px-2 py-1 rounded-md text-[10px] font-bold">
                                <RefreshCw className="w-3 h-3" />
                                Auto-Notification
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-500">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-blue-200 bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400 shadow-sm shadow-blue-500/5"
                                placeholder="tariq.haddad@gmail.com"
                                required
                            />
                        </div>
                        <div className="mt-3 text-[10px] text-blue-700/90 flex items-start gap-1.5">
                            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span className="font-medium leading-relaxed">
                                <span className="font-bold">Email Notification:</span> When this doctor is added, the system automatically sends a notification email to this address to verify their roster placement and login access.
                            </span>
                        </div>
                    </div>

                    {/* Specialty - Checkboxes as requested */}
                    <div className="block">
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">Medical Specialty <span className="text-red-500">*</span></span>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {(specialties.length > 0 ? specialties : ['Orthodontics', 'General Dentistry', 'Pediatric Dentistry', 'Endodontics', 'Oral Surgery']).map(spec => {
                                const isSelected = selectedSpecialties.includes(spec);
                                return (
                                    <button
                                        key={spec}
                                        type="button"
                                        onClick={() => toggleSpecialty(spec)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${isSelected
                                            ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                        } flex items-center gap-1.5 cursor-pointer`}
                                    >
                                        <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300 bg-white'}`}>
                                            {isSelected && (
                                                <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                                            )}
                                        </div>
                                        {spec}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bio */}
                    <label className="block mb-2">
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 block">Doctor Bio & Credentials</span>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={3}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
                            placeholder="Specialist in clear aligners and orthodontic diagnostics with 7+ years of clinical practice in Amman."
                        />
                    </label>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
                            <Info className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-7 pt-4 flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[10px] text-slate-500 font-medium leading-tight max-w-[140px]">Doctor will receive automated onboarding email</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-[11px] font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2.5 text-[11px] font-bold text-white bg-[#2563eb] rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <Send className="w-3.5 h-3.5" />
                                    Add Doctor & Send Email
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};