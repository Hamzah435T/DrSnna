import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  User,
  Stethoscope,
  MessageSquare
} from 'lucide-react';

const MOCK_CLINIC_DETAILS = {
  "amman-smile-care": {
    clinic_id: "amman-smile-care",
    name: "Amman Smile Dental Center",
    doctor: "Dr. Tariq Al-Mansoor",
    doctorTitle: "Senior Orthodontist",
    doctorExperience: "14 Years Experience",
    city: "Amman",
    address: "7th Circle, Zahran St., Building 42, Amman",
    phone: "+962 6 555 1234",
    specialty: "Orthodontics",
    rating: 5.0,
    reviewCount: 142,
    fee: 25,
    workingHours: "09:00 AM - 07:00 PM",
    description: "Amman Smile Dental Center is a premier orthodontic and smile design center equipped with 3D intraoral scanners and laser dental equipment.",
    services: [
      { name: "Invisible Aligners", price: "800 JOD", duration: "12 - 18 Months" },
      { name: "Traditional Braces", price: "450 JOD", duration: "12 - 24 Months" },
      { name: "3D Digital Scan & Consultation", price: "25 JOD", duration: "30 Mins" }
    ],
    availableSlots: ["Today 04:30 PM", "Tomorrow 11:00 AM", "Aug 26 10:00 AM"],
    reviews: [
      { id: 1, author: "Samer N.", rating: 5, date: "2 days ago", comment: "Dr. Tariq is extremely professional! The 3D scan was quick and painless." }
    ],
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=75&w=1200"
  }
};

export default function ClinicDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const clinic = MOCK_CLINIC_DETAILS[id] || MOCK_CLINIC_DETAILS["amman-smile-care"];
  const [selectedSlot, setSelectedSlot] = useState(clinic.availableSlots[0]);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = () => {
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/patient')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Clinics</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Profile
            </span>
          </div>
        </div>
      </header>

      {/* HERO BANNER */}
      <div className="relative bg-slate-900 text-white h-64 sm:h-80 w-full overflow-hidden">
        <img
          src={clinic.image}
          alt={clinic.name}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                  {clinic.specialty}
                </span>
                <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" /> {clinic.rating.toFixed(1)} ({clinic.reviewCount})
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {clinic.name}
              </h1>
              <p className="text-slate-300 text-xs mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                {clinic.address}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-white flex items-center gap-3 shrink-0">
              <div>
                <p className="text-[10px] text-slate-300">Consultation Fee</p>
                <p className="text-xl font-bold text-emerald-400">{clinic.fee} JOD</p>
              </div>
              <div className="h-7 w-px bg-white/20" />
              <div>
                <p className="text-[10px] text-slate-300">Working Hours</p>
                <p className="text-xs font-semibold text-slate-100">{clinic.workingHours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {bookingSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-xs">Reservation Confirmed!</p>
              <p className="text-[11px] text-emerald-700">Slot reserved for <span className="font-semibold">{selectedSlot}</span> at {clinic.name}.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Doctor Info & Services */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{clinic.doctor}</h3>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded border border-blue-200">
                    {clinic.doctorExperience}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{clinic.doctorTitle}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{clinic.description}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-blue-600" />
                <span>Services & Treatments</span>
              </h3>

              <div className="divide-y divide-slate-100">
                {clinic.services.map((srv, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-800">{srv.name}</p>
                      <p className="text-[10px] text-slate-400">Duration: {srv.duration}</p>
                    </div>
                    <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-100">
                      {srv.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Booking Slots */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-md sticky top-20 space-y-4">
              
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Reserve Appointment</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Select an available time slot</p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {clinic.availableSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedSlot === slot
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{slot}</span>
                    {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>

              <button
                onClick={handleBook}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-xs text-xs transition-all cursor-pointer mt-2"
              >
                Confirm Reservation ({selectedSlot})
              </button>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
