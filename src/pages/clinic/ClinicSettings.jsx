import React, { useState } from 'react';

export default function ClinicSettings() {
    const [activeTab, setActiveTab] = useState('general');

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h1 className="text-xl font-bold text-gray-900 mb-4">Clinic Settings</h1>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-100 mb-6">
                <button
                    onClick={() => setActiveTab('general')}
                    className={`pb-3 text-sm font-semibold ${activeTab === 'general' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400'}`}
                >
                    General Information & Social
                </button>
                <button
                    onClick={() => setActiveTab('services')}
                    className={`pb-3 text-sm font-semibold ${activeTab === 'services' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400'}`}
                >
                    Intro, Specialties & Services
                </button>
            </div>

            {activeTab === 'general' ? (
                <form className="space-y-4 max-w-lg">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Clinic Name</label>
                        <input type="text" defaultValue="Dr.Sna Dental Clinic" className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-blue-600" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
                        <input type="text" defaultValue="Amman, Jordan - Rainbow Street" className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-blue-600" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                        <input type="text" defaultValue="+962 7 9000 0000" className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-blue-600" />
                    </div>
                    <button type="button" className="bg-blue-600 text-white text-sm px-5 py-2.5 rounded-xl font-medium">Save Changes</button>
                </form>
            ) : (
                <form className="space-y-4 max-w-lg">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Clinic Introduction</label>
                        <textarea rows="3" defaultValue="Leading dental clinic in Jordan..." className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-blue-600" />
                    </div>
                    <button type="button" className="bg-blue-600 text-white text-sm px-5 py-2.5 rounded-xl font-medium">Save Services & Intro</button>
                </form>
            )}
        </div>
    );
}