import { useState } from "react";
import ClinicLayout from "./components/ClinicLayout";
import ClinicAppointments from "./components/ClinicAppointments";
import ClinicDoctors from "./components/ClinicDoctors";

/**
 * ClinicDashboard – root page for the /clinic route.
 *
 * Uses ClinicLayout for the sidebar shell and renders
 * the active sub-page in the main content area.
 */
export default function ClinicDashboard() {
    const [activePage, setActivePage] = useState("appointments");

    // Appointments Screen State
    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [deleteTrigger, setDeleteTrigger] = useState(0);
    const [doctorFilters, setDoctorFilters] = useState({
        "dr_smith": true,
        "dr_adams": true,
        "dr_lee": true,
    });

    let sidebarTop = null;
    let sidebarBottom = null;

    if (activePage === "appointments") {
        sidebarBottom = (
            <div className="flex flex-col gap-5 mt-4 mb-2">
                {/* Action Buttons */}
                <div className="flex flex-col gap-2 px-1">
                    <button 
                        onClick={() => setIsNewAppointmentOpen(true)} 
                        className="w-full bg-blue-800 text-white rounded-full py-2.5 px-2 flex items-center justify-center gap-1.5 font-semibold shadow-md cursor-pointer hover:bg-blue-700 transition-colors text-[13px] whitespace-nowrap"
                    >
                        <span className="text-lg leading-none mb-0.5">+</span> New Appointment
                    </button>
                    <button 
                        onClick={() => { if(selectedAppointmentId) setDeleteTrigger(t=>t+1) }} 
                        className={`w-full rounded-full py-2.5 px-2 flex items-center justify-center gap-1.5 font-semibold transition-all text-[13px] whitespace-nowrap ${
                            selectedAppointmentId 
                                ? 'bg-red-500 text-white shadow-md hover:bg-red-600 cursor-pointer' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-70'
                        }`}
                    >
                        <TrashIcon className="w-4 h-4" /> Delete Selected
                    </button>
                </div>

                {/* Schedule View */}
                <div>
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Schedule View</h3>
                    <div className="flex flex-col gap-1.5">
                        <DoctorToggle 
                            name="Dr. A. Smith" 
                            color="bg-emerald-500" 
                            checked={doctorFilters["dr_smith"]} 
                            onChange={(v) => setDoctorFilters(f => ({...f, "dr_smith": v}))} 
                        />
                        <DoctorToggle 
                            name="Dr. J. Adams" 
                            color="bg-blue-500" 
                            checked={doctorFilters["dr_adams"]} 
                            onChange={(v) => setDoctorFilters(f => ({...f, "dr_adams": v}))} 
                        />
                        <DoctorToggle 
                            name="Dr. K. Lee" 
                            color="bg-purple-500" 
                            checked={doctorFilters["dr_lee"]} 
                            onChange={(v) => setDoctorFilters(f => ({...f, "dr_lee": v}))} 
                        />
                    </div>
                </div>
            </div>
        );
    }

    function renderPage() {
        switch (activePage) {
            case "doctors":
                return <ClinicDoctors />;
            case "appointments":
                return (
                    <ClinicAppointments 
                        isNewAppointmentOpen={isNewAppointmentOpen}
                        setIsNewAppointmentOpen={setIsNewAppointmentOpen}
                        selectedAppointmentId={selectedAppointmentId}
                        setSelectedAppointmentId={setSelectedAppointmentId}
                        deleteTrigger={deleteTrigger}
                        doctorFilters={doctorFilters}
                    />
                );
            // TODO: Implement other pages
            // case "dashboard":
            //     return <ClinicOverview />;
            // case "settings":
            //     return <ClinicSettings />;
            default:
                return (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        <p>{activePage.charAt(0).toUpperCase() + activePage.slice(1)} — coming soon</p>
                    </div>
                );
        }
    }

    return (
        <ClinicLayout 
            activePage={activePage} 
            onNavigate={setActivePage} 
            sidebarTopContent={sidebarTop}
            sidebarBottomContent={sidebarBottom}
        >
            {renderPage()}
        </ClinicLayout>
    );
}

function DoctorToggle({ name, color, checked, onChange }) {
    return (
        <label className="flex items-center justify-between px-2 py-1.5 cursor-pointer group">
            <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{name}</span>
            </div>
            <input 
                type="checkbox" 
                className="hidden" 
                checked={checked} 
                onChange={(e) => onChange(e.target.checked)} 
            />
            <div className={`w-9 h-5 rounded-full relative transition-colors flex items-center ${checked ? color : 'bg-gray-200'}`}>
                <div className={`absolute left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${checked ? 'translate-x-[16px]' : 'translate-x-0'}`}></div>
            </div>
        </label>
    );
}

function TrashIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
    );
}
