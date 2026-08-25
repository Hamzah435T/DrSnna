import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * ClinicAppointments – Calendar screen for managing appointments.
 */
export default function ClinicAppointments() {
    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [doctorFilters, setDoctorFilters] = useState({
        "dr_smith": true,
        "dr_adams": true,
        "dr_lee": true,
    });
    // ── Mock Data ────────────────────────────────────────────────────────────
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date(2023, 9, 22)); // Oct 22, 2023

    const [appointments, setAppointments] = useState([
        { id: 1, doctorId: "dr_lee", doctorName: "Dr. Lee", type: "Dental", date: "2023-10-25", startTime: "09:00", endTime: "10:00", dayIndex: 3, timeIndex: 9, color: "bg-purple-500" },
        { id: 2, doctorId: "dr_adams", doctorName: "Dr. Adams", type: "Surgery", date: "2023-10-25", startTime: "09:00", endTime: "10:00", dayIndex: 3, timeIndex: 9, color: "bg-blue-500" },
        { id: 4, doctorId: "dr_adams", doctorName: "Dr. Adams", type: "Impl...", date: "2023-10-23", startTime: "10:00", endTime: "11:00", dayIndex: 1, timeIndex: 10, color: "bg-blue-500" },
        { id: 5, doctorId: "dr_smith", doctorName: "Dr. Smith", type: "Follo...", date: "2023-10-23", startTime: "11:00", endTime: "12:00", dayIndex: 0, timeIndex: 11, color: "bg-emerald-500" },
        { id: 6, doctorId: "dr_smith", doctorName: "Dr. Smith", type: "", date: "2023-10-24", startTime: "12:00", endTime: "13:00", dayIndex: 2, timeIndex: 12, color: "bg-emerald-500" },
        { id: 7, doctorId: "dr_adams", doctorName: "Dr. Adams", type: "Con...", date: "2023-10-23", startTime: "13:00", endTime: "14:00", dayIndex: 1, timeIndex: 13, color: "bg-blue-500" },
        { id: 8, doctorId: "dr_smith", doctorName: "Dr. Smith", type: "Chec...", date: "2023-10-25", startTime: "13:00", endTime: "14:00", dayIndex: 3, timeIndex: 13, color: "bg-emerald-500" },
        
        // 9 New Appointments
        { id: 9, doctorId: "dr_lee", doctorName: "Dr. Lee", type: "Exam", date: "2023-10-26", startTime: "10:00", endTime: "11:00", dayIndex: 4, timeIndex: 10, color: "bg-purple-500" },
        { id: 10, doctorId: "dr_smith", doctorName: "Dr. Smith", type: "Consult", date: "2023-10-26", startTime: "11:00", endTime: "12:00", dayIndex: 4, timeIndex: 11, color: "bg-emerald-500" },
        { id: 11, doctorId: "dr_adams", doctorName: "Dr. Adams", type: "Surgery", date: "2023-10-27", startTime: "09:00", endTime: "10:00", dayIndex: 5, timeIndex: 9, color: "bg-blue-500" },
        { id: 12, doctorId: "dr_lee", doctorName: "Dr. Lee", type: "Cleaning", date: "2023-10-27", startTime: "13:00", endTime: "14:00", dayIndex: 5, timeIndex: 13, color: "bg-purple-500" },
        { id: 13, doctorId: "dr_smith", doctorName: "Dr. Smith", type: "Checkup", date: "2023-10-28", startTime: "14:00", endTime: "15:00", dayIndex: 6, timeIndex: 14, color: "bg-emerald-500" },
        { id: 14, doctorId: "dr_adams", doctorName: "Dr. Adams", type: "Followup", date: "2023-10-22", startTime: "15:00", endTime: "16:00", dayIndex: 0, timeIndex: 15, color: "bg-blue-500" },
        { id: 15, doctorId: "dr_lee", doctorName: "Dr. Lee", type: "Exam", date: "2023-10-24", startTime: "14:00", endTime: "15:00", dayIndex: 2, timeIndex: 14, color: "bg-purple-500" },
        { id: 16, doctorId: "dr_smith", doctorName: "Dr. Smith", type: "Consult", date: "2023-10-25", startTime: "15:00", endTime: "16:00", dayIndex: 3, timeIndex: 15, color: "bg-emerald-500" },
        { id: 17, doctorId: "dr_adams", doctorName: "Dr. Adams", type: "Checkup", date: "2023-10-26", startTime: "16:00", endTime: "17:00", dayIndex: 4, timeIndex: 16, color: "bg-blue-500" },
        
        // Add 2 more appointments to the same cell as id:4 (date: "2023-10-23", timeIndex: 10)
        { id: 18, doctorId: "dr_smith", doctorName: "Dr. Smith", type: "Checkup", date: "2023-10-23", startTime: "10:00", endTime: "11:00", dayIndex: 1, timeIndex: 10, color: "bg-emerald-500" },
        { id: 19, doctorId: "dr_lee", doctorName: "Dr. Lee", type: "Consult", date: "2023-10-23", startTime: "10:00", endTime: "11:00", dayIndex: 1, timeIndex: 10, color: "bg-purple-500" },
    ]);

    const handleDelete = () => {
        if (selectedAppointmentId) {
            setAppointments(prev => prev.filter(app => app.id !== selectedAppointmentId));
            setSelectedAppointmentId(null);
        }
    };

    const [sidebarPortalNode, setSidebarPortalNode] = useState(null);
    useEffect(() => {
        setSidebarPortalNode(document.getElementById("sidebar-bottom-portal"));
    }, []);

    // ── Calendar Configuration ───────────────────────────────────────────────
    const days = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(currentWeekStart);
        date.setDate(date.getDate() + i);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const dayNum = String(date.getDate()).padStart(2, '0');
        
        return {
            name: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
            date: date.getDate(),
            dateString: `${year}-${month}-${dayNum}`,
            active: date.toDateString() === new Date().toDateString()
        };
    });

    const times = [
        "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM",
        "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM",
        "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
    ];

    // Filter appointments based on toggles
    const visibleAppointments = appointments.filter(app => doctorFilters[app.doctorId]);

    // Function to calculate grid placement
    function getAppointmentsForCell(colIdx, timeIndex) {
        const dateStr = days[colIdx].dateString;
        return visibleAppointments.filter(app => app.date === dateStr && app.timeIndex === timeIndex);
    }

    const scrollContainerRef = useRef(null);

    // Auto-scroll to earliest appointment in the current week
    useEffect(() => {
        if (!scrollContainerRef.current) return;

        const currentWeekDateStrings = days.map(d => d.dateString);
        const currentWeekApps = visibleAppointments.filter(app => currentWeekDateStrings.includes(app.date));

        let earliestTimeIndex = 8; // Default to 8 AM
        if (currentWeekApps.length > 0) {
            earliestTimeIndex = Math.min(...currentWeekApps.map(app => app.timeIndex));
        }

        // 100px per row. Scroll with 20px padding
        const scrollPos = Math.max(0, earliestTimeIndex * 100 - 20);
        
        // Use a small timeout to allow grid rendering
        setTimeout(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ top: scrollPos, behavior: 'smooth' });
            }
        }, 50);
    }, [currentWeekStart, doctorFilters]);

    const sidebarUI = (
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
                    onClick={handleDelete} 
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

    return (
        <div className="flex flex-col h-full min-h-0 bg-white relative">
            {sidebarPortalNode && createPortal(sidebarUI, sidebarPortalNode)}

            {/* Header: Month & Year */}
            <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-1 text-gray-500">
                    <button onClick={() => {
                        const d = new Date(currentWeekStart);
                        d.setDate(d.getDate() - 7);
                        setCurrentWeekStart(d);
                    }} className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"><ChevronLeftIcon /></button>
                    <button onClick={() => {
                        const d = new Date(currentWeekStart);
                        d.setDate(d.getDate() + 7);
                        setCurrentWeekStart(d);
                    }} className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"><ChevronRightIcon /></button>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                    {currentWeekStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
            </div>

            {/* Calendar Grid */}
            <div ref={scrollContainerRef} className="flex-1 overflow-auto relative bg-white scroll-smooth">
                <div className="min-w-[800px] grid grid-cols-[60px_repeat(7,1fr)] grid-rows-[70px_repeat(24,100px)] relative">

                    {/* Top Left Empty Cell */}
                    <div className="border-b border-r border-gray-100 bg-white sticky top-0 left-0 z-30"></div>

                    {/* Day Headers */}
                    {days.map((day, i) => (
                        <div key={i} className="border-b border-r border-gray-100 flex flex-col items-center justify-center bg-white sticky top-0 z-20">
                            <span className={`text-xs font-semibold ${day.active ? 'text-blue-600' : 'text-gray-400'}`}>{day.name}</span>
                            <span className={`text-2xl font-bold mt-1 ${day.active ? 'bg-blue-800 text-white w-10 h-10 rounded-full flex items-center justify-center' : 'text-gray-800'}`}>
                                {day.date}
                            </span>
                        </div>
                    ))}

                    {/* Time Rows and Grid Cells */}
                    {times.map((time, rowIdx) => (
                        <div key={`time-row-${rowIdx}`} className="contents">
                            {/* Time Label */}
                            <div className="border-r border-b border-gray-100 flex items-start justify-center pt-2 bg-white sticky left-0 z-20">
                                <span className="text-[10px] font-semibold text-gray-400">{time}</span>
                            </div>

                            {/* Cells for this time */}
                            {days.map((_, colIdx) => {
                                const cellApps = getAppointmentsForCell(colIdx, rowIdx);
                                return (
                                    <div key={`cell-${rowIdx}-${colIdx}`} className="border-r border-b border-gray-100 relative p-1 group hover:bg-gray-50/50 transition-colors z-10">
                                        <div className="flex w-full h-full gap-1 relative">
                                            {cellApps.map(app => {
                                                const isSelected = selectedAppointmentId === app.id;
                                                const spanRows = app.span || 1;
                                                return (
                                                    <div
                                                        key={app.id}
                                                        onClick={() => setSelectedAppointmentId(app.id)}
                                                        className={`flex-1 rounded-md p-2 cursor-pointer text-white overflow-hidden transition-all duration-200 ${app.color} ${isSelected ? 'ring-2 ring-blue-900 shadow-lg scale-[1.02] z-30' : 'opacity-90 hover:opacity-100 z-20'}`}
                                                        style={{
                                                            height: `calc(${spanRows * 100}% + ${(spanRows - 1) * 8}px)`, // approximate height for spanning multiple rows
                                                            position: spanRows > 1 ? 'absolute' : 'relative',
                                                            top: spanRows > 1 ? '0' : 'auto',
                                                            left: spanRows > 1 ? '0' : 'auto',
                                                            right: spanRows > 1 ? '0' : 'auto',
                                                        }}
                                                    >
                                                        <p className="text-xs font-bold leading-tight">{app.doctorName} {app.type && `- ${app.type}`}</p>
                                                        <p className="text-[10px] opacity-90 mt-0.5">{app.startTime} - {app.endTime}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    {/* Red Line for current time */}
                    <div className="absolute top-[420px] left-[60px] right-0 h-[2px] bg-red-500 z-40 flex items-center pointer-events-none">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1"></div>
                    </div>
                </div>
            </div>

            {/* New Appointment Modal */}
            {isNewAppointmentOpen && (
                <NewAppointmentModal onClose={() => setIsNewAppointmentOpen(false)} />
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════════════════
   New Appointment Modal
   ══════════════════════════════════════════════════════════════════════════════ */
function NewAppointmentModal({ onClose }) {
    const doctors = [
        { id: "dr_smith", name: "Dr. A. Smith", spec: "General Practice", initials: "AS", color: "bg-emerald-500" },
        { id: "dr_adams", name: "Dr. J. Adams", spec: "Surgery", initials: "JA", color: "bg-blue-500" },
        { id: "dr_lee", name: "Dr. K. Lee", spec: "Dentistry", initials: "KL", color: "bg-purple-500" },
    ];

    const days = [
        { label: "TODAY, OCT 24" },
        { label: "TOMORROW, OCT 25" },
        { label: "THU, OCT 26" },
    ];

    const timeSlots = ["10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"];

    const [selectedDoc, setSelectedDoc] = useState("dr_lee");
    const [selectedTime, setSelectedTime] = useState({ dayIdx: 2, timeIdx: 7 });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-[800px] mx-4 flex flex-col overflow-hidden animate-[scaleIn_0.2s_ease-out]">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">New Appointment</h2>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                        <CloseIcon />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[70vh]">
                    {/* Section A: Select Doctor */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-gray-800 mb-4">Select Doctor</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {doctors.map(doc => (
                                <div
                                    key={doc.id}
                                    onClick={() => setSelectedDoc(doc.id)}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedDoc === doc.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${doc.color}`}>
                                        {doc.initials}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">{doc.name}</h4>
                                        <p className="text-xs text-gray-500">{doc.spec}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section B: Select Time */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 mb-4">Select Time</h3>
                        <div className="space-y-6">
                            {days.map((day, dIdx) => (
                                <div key={dIdx}>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{day.label}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {timeSlots.map((time, tIdx) => {
                                            const isSelected = selectedTime.dayIdx === dIdx && selectedTime.timeIdx === tIdx;
                                            return (
                                                <button
                                                    key={tIdx}
                                                    onClick={() => setSelectedTime({ dayIdx: dIdx, timeIdx: tIdx })}
                                                    className={`w-[85px] py-2.5 rounded-lg text-sm font-medium border transition-colors ${isSelected ? 'bg-blue-800 border-blue-800 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                                                >
                                                    {time}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                    <button onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-md shadow-blue-900/20 transition-all">
                        Schedule Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════════════════
   Icons
   ══════════════════════════════════════════════════════════════════════════════ */
function ChevronLeftIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
}
function ChevronRightIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;
}
function ChevronDownIcon() {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;
}
function CloseIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
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
