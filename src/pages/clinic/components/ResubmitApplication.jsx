import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { Building2, FileText, Mail, MapPin, Lock, Loader2 } from 'lucide-react';
import { resubmitApplication } from '../../../api/clinicProfileApi';
import { clearAuth } from '../../../auth/authStorage';

const CITIES = [
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

export default function ResubmitApplication() {
    const { profile } = useOutletContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        clinicName: profile?.clinicName || '',
        clinicLicenseNumber: profile?.clinicLicenseNumber || profile?.taxRegistration || '',
        email: profile?.email || '',
        city: profile?.city || 'AMMAN',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await resubmitApplication(formData);
            if (formData.email !== profile?.email || formData.password) {
                clearAuth();
                window.location.href = '/login?message=Application+resubmitted+successfully.+Please+log+in+again.';
            } else {
                window.location.href = '/clinic'; // Redirect to dashboard root to see pending status
            }
        } catch (err) {
            setError(err.message || 'Failed to resubmit application');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 border-b border-slate-200 bg-slate-50">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-2">Resubmit Application</h2>
                    <p className="text-slate-600">Please review and update your registration details to resubmit your clinic application for approval.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Clinic Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">Clinic name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Building2 className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    name="clinicName"
                                    value={formData.clinicName}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-colors text-slate-800"
                                    placeholder="Bright Smiles Dental Clinic"
                                />
                            </div>
                        </div>

                        {/* Clinic License Number */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">Clinic license number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FileText className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    name="clinicLicenseNumber"
                                    value={formData.clinicLicenseNumber}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-colors text-slate-800"
                                    placeholder="CLN-2026-00451"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-colors text-slate-800"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">City</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-slate-400" />
                                </div>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-colors text-slate-800 appearance-none bg-white"
                                >
                                    {CITIES.map(city => (
                                        <option key={city.value} value={city.value}>{city.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-700 block">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-colors text-slate-800"
                                    placeholder="Leave blank to keep current password"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                <span className="text-red-500">*</span> Password must be 8-12 characters long and contains at least one uppercase letter, in addition to symbols and numbers.
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-700 block">Confirm password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    disabled={!formData.password}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-colors text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
                                    placeholder="Re-enter your password"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/clinic')}
                            className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400"
                        >
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
