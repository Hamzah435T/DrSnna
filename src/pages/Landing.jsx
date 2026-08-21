import { useState } from 'react';
import { Form, useNavigate } from "react-router";

export default function Landing() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'General', 'Orthodontics', 'Pediatric', 'Emergency'];

    const clinics = [
        {
            id: 1,
            name: 'Bright Smiles Dental Clinic',
            tags: ['General', 'Cleaning'],
            rating: 4.9,
            reviewsCount: 212,
            distance: '1.4 km away',
        },
        {
            id: 2,
            name: 'Al-Noor Orthodontic Center',
            tags: ['Orthodontics', 'Braces'],
            rating: 4.8,
            reviewsCount: 96,
            distance: '2.1 km away',
        },
        {
            id: 3,
            name: 'Little Teeth Pediatric Dentistry',
            tags: ['Pediatric', 'Sedation'],
            rating: 4.7,
            reviewsCount: 58,
            distance: '3.6 km away',
        },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800">
            {/* Top Navbar */}
            <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.5 2 6 4.5 6 7.5c0 2 .8 4.2 1.3 6.5.6 2.6 1.7 6 4.7 6s4.1-3.4 4.7-6C17.2 11.7 18 9.5 18 7.5 18 4.5 15.5 2 12 2zm0 15c-1.5 0-2.3-2-2.7-4.2C8.8 10.6 8 8.8 8 7.5 8 5.6 9.8 4 12 4s4 1.6 4 3.5c0 1.3-.8 3.1-1.3 5.3-.4 2.2-1.2 4.2-2.7 4.2z"/>
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-sky-950 tracking-tight">DrSna</span>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl relative">
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search dentists, clinics, or treatments"
                            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-100/70 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                        />
                    </div>

                    {/* Right Actions & Auth Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Login / Register Buttons */}
                        <div className="hidden sm:flex items-center gap-2">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
                            >
                                Log in
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="px-3.5 py-1.5 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition shadow-sm"
                            >
                                Register
                            </button>
                        </div>

                        {/* Logout Button */}
                        <Form method="post" action="/logout">
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-3.5 py-1.5 rounded-lg font-semibold text-xs shadow-sm hover:bg-red-700 transition-colors cursor-pointer"
                            >
                                Log out
                            </button>
                        </Form>

                        {/* User Avatar */}
                        <div className="w-9 h-9 rounded-xl bg-sky-700 text-white font-semibold text-xs flex items-center justify-center shadow-sm">
                            AL
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Layout */}
            <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Feed & Clinics) */}
                <section className="lg:col-span-2 space-y-6">
                    {/* Welcome Banner */}
                    <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Good morning, Ali</h1>
                            <p className="text-sm text-slate-500 mt-1">
                                You have one upcoming appointment and 3 clinics near you accepting new patients.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/register')}
                            className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-medium text-sm transition shadow-sm"
                        >
                            + Book new appointment
                        </button>
                    </div>

                    {/* Dentists Near You Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold text-slate-800">Dentists near you</h2>
                            <button className="text-xs font-semibold text-sky-600 hover:text-sky-700">See all</button>
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full border transition font-medium ${
                                        activeCategory === cat
                                            ? 'bg-sky-600 text-white border-sky-600'
                                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Clinics List */}
                        <div className="space-y-3">
                            {clinics.map((clinic) => (
                                <div
                                    key={clinic.id}
                                    className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-sm transition"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C8.5 2 6 4.5 6 7.5c0 2 .8 4.2 1.3 6.5.6 2.6 1.7 6 4.7 6s4.1-3.4 4.7-6C17.2 11.7 18 9.5 18 7.5 18 4.5 15.5 2 12 2zm0 15c-1.5 0-2.3-2-2.7-4.2C8.8 10.6 8 8.8 8 7.5 8 5.6 9.8 4 12 4s4 1.6 4 3.5c0 1.3-.8 3.1-1.3 5.3-.4 2.2-1.2 4.2-2.7 4.2z"/>
                                            </svg>
                                        </div>

                                        <div className="space-y-1.5">
                                            <h3 className="font-bold text-slate-800 text-sm sm:text-base">{clinic.name}</h3>
                                            <div className="flex flex-wrap gap-1.5">
                                                {clinic.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 text-xs font-medium border border-sky-100"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-0.5">
                                                <span className="text-amber-500 font-semibold">★ {clinic.rating}</span>
                                                <span>({clinic.reviewsCount} reviews)</span>
                                                <span>•</span>
                                                <span>{clinic.distance}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate('/register')}
                                        className="self-end sm:self-center px-4 py-2 rounded-xl border border-sky-600 text-sky-600 font-medium text-xs sm:text-sm hover:bg-sky-50 transition"
                                    >
                                        View availability
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Right Column (Widgets) */}
                <aside className="space-y-5">
                    {/* Upcoming Appointment Card */}
                    <div className="bg-sky-600 text-white rounded-2xl p-5 shadow-sm space-y-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] tracking-wider uppercase font-semibold">
                            Upcoming
                        </span>
                        <div>
                            <h3 className="font-bold text-base">Bright Smiles Dental Clinic</h3>
                            <p className="text-xs text-sky-100 mt-1">Thursday, Aug 21 • 10:30 AM • Routine cleaning</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                            <button className="py-2 bg-white text-sky-700 font-semibold rounded-xl text-xs hover:bg-sky-50 transition shadow-sm">
                                Reschedule
                            </button>
                            <button className="py-2 bg-sky-700/80 text-white font-semibold rounded-xl text-xs hover:bg-sky-700 transition">
                                Cancel
                            </button>
                        </div>
                    </div>

                    {/* Mini Calendar Widget */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-3">
                        <div className="flex items-center justify-between text-slate-800">
                            <h4 className="font-bold text-sm">August 2026</h4>
                            <button className="text-slate-400 hover:text-slate-600 text-sm">›</button>
                        </div>

                        <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-slate-400 pb-1">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs">
                            <span className="py-1.5 text-slate-400">16</span>
                            <span className="py-1.5 text-slate-400">17</span>
                            <span className="py-1.5 rounded-lg border border-sky-200 text-sky-700 font-medium">18</span>
                            <span className="py-1.5 rounded-lg border border-sky-200 text-sky-700 font-medium">19</span>
                            <span className="py-1.5 rounded-lg bg-sky-600 text-white font-bold shadow-sm">20</span>
                            <span className="py-1.5 rounded-lg border border-sky-200 text-sky-700 font-medium">21</span>
                            <span className="py-1.5 text-slate-600">22</span>

                            <span className="py-1.5 rounded-lg border border-sky-200 text-sky-700 font-medium">23</span>
                            <span className="py-1.5 rounded-lg border border-sky-200 text-sky-700 font-medium">24</span>
                            <span className="py-1.5 text-slate-600">25</span>
                            <span className="py-1.5 rounded-lg border border-sky-200 text-sky-700 font-medium">26</span>
                            <span className="py-1.5 rounded-lg border border-sky-200 text-sky-700 font-medium">27</span>
                            <span className="py-1.5 text-slate-600">28</span>
                            <span className="py-1.5 rounded-lg border border-sky-200 text-sky-700 font-medium">29</span>
                        </div>
                    </div>

                    {/* Dental Tip Widget */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div className="text-xs space-y-1">
                            <h5 className="font-bold text-slate-800">Dental tip of the day</h5>
                            <p className="text-slate-500 leading-relaxed">
                                Replace your toothbrush every 3 months — worn bristles clean less effectively.
                            </p>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}