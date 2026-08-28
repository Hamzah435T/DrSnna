import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PatientNavbar from '../components/PatientNavbar';
import {
  Stethoscope,
  Search,
  MapPin,
  Star,
  Clock,
  DollarSign,
  ChevronDown,
  RotateCcw,
  X,
  ArrowRight,
  User,
  Calendar
} from 'lucide-react';

import { searchClinics } from '../api/patientApi';

const CITIES = [
  "All Cities", "Amman", "Irbid", "Zarqa", "Aqaba", "Salt",
  "Mafraq", "Ajloun", "Jerash", "Madaba", "Karak", "Tafilah", "Maan"
];
const DEFAULT_SPECIALTIES = [
  "All Specialties",
  "General Dentistry",
  "Orthodontics",
  "Oral Surgery",
  "Pediatric Dentistry",
  "Periodontics",
  "Cosmetic Dentistry",
  "Endodontics"
];

export default function PatientHomePage() {
  const navigate = useNavigate();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [availability, setAvailability] = useState('Anytime'); // 'Anytime' | 'Today'
  const [selectedStars, setSelectedStars] = useState(0); // 0 = All, 1..5 = Min Stars
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  const { minAvailableFee, maxAvailableFee } = useMemo(() => {
    if (clinics.length === 0) return { minAvailableFee: 0, maxAvailableFee: 50 };
    const fees = clinics.map(c => c.checkingFee || 0);
    return {
      minAvailableFee: Math.min(...fees),
      maxAvailableFee: Math.max(...fees)
    };
  }, [clinics]);

  const [maxFee, setMaxFee] = useState(50);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    setMaxFee(maxAvailableFee);
  }, [maxAvailableFee]);

  // Optimized debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
    }, 120);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setSelectedCity('All Cities');
    setSelectedSpecialty('All Specialties');
    setAvailability('Anytime');
    setSelectedStars(0);
    setMaxFee(maxAvailableFee);
    setSortBy('default');
  };

  // Active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (debouncedSearch) count++;
    if (selectedCity !== 'All Cities') count++;
    if (selectedSpecialty !== 'All Specialties') count++;
    if (availability !== 'Anytime') count++;
    if (selectedStars > 0) count++;
    if (maxFee < maxAvailableFee) count++;
    if (sortBy !== 'default') count++;
    return count;
  }, [debouncedSearch, selectedCity, selectedSpecialty, availability, selectedStars, maxFee, sortBy, maxAvailableFee]);

  // Accumulate custom specialties so they don't disappear when clinics are filtered
  const [customSpecialties, setCustomSpecialties] = useState(new Set());

  useEffect(() => {
    if (clinics.length > 0) {
      setCustomSpecialties(prev => {
        const nextSet = new Set(prev);
        let added = false;
        clinics.forEach(clinic => {
          clinic.specialties?.forEach(spec => {
            if (!DEFAULT_SPECIALTIES.includes(spec) && !nextSet.has(spec)) {
              nextSet.add(spec);
              added = true;
            }
          });
        });
        return added ? nextSet : prev;
      });
    }
  }, [clinics]);

  const dynamicSpecialties = useMemo(() => {
    return [...DEFAULT_SPECIALTIES, ...Array.from(customSpecialties)];
  }, [customSpecialties]);

  // Fetch from API
  useEffect(() => {
    async function loadClinics() {
      try {
        setLoading(true);
        
        let dateParams = {};
        if (availability === 'Today') {
          const today = new Date();
          // Format as YYYY-MM-DD in local time
          const localIsoDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
          dateParams = {
            date: localIsoDate,
            availableOnly: true
          };
        }

        const data = await searchClinics({
          name: debouncedSearch,
          city: selectedCity,
          specialty: selectedSpecialty,
          ...dateParams
        });
        setClinics(data);
      } catch (err) {
        console.error("Failed to load clinics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadClinics();
  }, [debouncedSearch, selectedCity, selectedSpecialty, availability]);

  // Fast Memoized Filtering
  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      if (clinic.checkingFee > maxFee) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'fee') return (a.checkingFee || 0) - (b.checkingFee || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [clinics, maxFee, sortBy]);

  const handleClinicClick = (clinicId) => {
    navigate(`/clinic-details/${clinicId}`);
  };

  const handleStarClick = (starCount) => {
    setSelectedStars(selectedStars === starCount ? 0 : starCount);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white pb-16">

      {/* 1. HEADER */}
      <PatientNavbar />

      {/* 2. HERO */}
      <section className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-2.5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Discover Top <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">Dental Clinics</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto">
            Connect with top-rated local dental specialists, compare consultation fees, and reserve instant online appointments seamlessly.
          </p>
        </div>
      </section>

      {/* 3. SINGLE TOP TOOLBAR */}
      <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md pt-4 pb-3 border-b border-slate-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md p-2.5 flex flex-wrap items-center justify-between gap-2.5">

            {/* Search Input */}
            <div className="relative min-w-[200px] flex-1 flex items-center">
              <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                id="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search clinic name, doctor..."
                aria-label="Search clinics by name, doctor, or keyword"
                className="w-full pl-9 pr-8 py-2 bg-slate-50 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* City Dropdown */}
            <div className="relative w-36 sm:w-40 flex items-center">
              <MapPin className="w-3.5 h-3.5 absolute left-2.5 text-blue-600 pointer-events-none z-10" />
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                aria-label="Filter clinics by City"
                className="w-full pl-8 pr-7 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 border border-slate-200 appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer transition-all"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city === 'All Cities' ? ' All Cities' : city}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Specialty Dropdown */}
            <div className="relative w-40 sm:w-44 flex items-center">
              <Stethoscope className="w-3.5 h-3.5 absolute left-2.5 text-blue-600 pointer-events-none z-10" />
              <select
                id="specialty-select"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                aria-label="Filter clinics by Dental Specialty"
                className="w-full pl-8 pr-7 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 border border-slate-200 appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer transition-all"
              >
                {dynamicSpecialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec === 'All Specialties' ? 'All Specialties' : spec}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Interactive 5-Star Rating Picker */}
            <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 mr-1">Rating:</span>
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  onClick={() => handleStarClick(starIndex)}
                  type="button"
                  aria-label={`Filter by ${starIndex} stars and above`}
                  title={`Filter ${starIndex}+ Stars`}
                  className="p-0.5 rounded transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-4 h-4 transition-colors ${starIndex <= selectedStars
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-300 hover:text-amber-300'
                      }`}
                  />
                </button>
              ))}
              {selectedStars > 0 && (
                <span className="text-[11px] font-extrabold text-amber-700 ml-1 bg-amber-100 px-1.5 py-0.2 rounded">
                  {selectedStars}.0+
                </span>
              )}
            </div>

            {/* Max Fee Slider */}
            <div className="flex items-center gap-2 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-600 shrink-0">Fee:</span>
              <span className="font-bold text-blue-600 shrink-0">{maxFee} JOD</span>
              <input
                type="range"
                id="fee-range-slider"
                min={minAvailableFee}
                max={maxAvailableFee}
                step="5"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                aria-label="Filter by Maximum consultation fee in JOD"
                className="w-16 accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Today Pill Toggle */}
            <button
              onClick={() => setAvailability(availability === 'Today' ? 'Anytime' : 'Today')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${availability === 'Today'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-2xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
            >
              <span> Today</span>
            </button>

            {/* Sort Selector */}
            <div className="relative flex items-center">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort clinics order"
                className="pl-3 pr-7 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 appearance-none focus:outline-none cursor-pointer transition-all"
              >
                <option value="default">Sort: Default</option>
                <option value="rating">Highest Rated</option>
                <option value="fee">Lowest Fee</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2 text-slate-400 pointer-events-none" />
            </div>

            {/* Reset All Action */}
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="px-2.5 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                title="Reset all active filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}

          </div>

        </div>
      </div>

      {/* 4. MAIN DISCOVERY GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Recommended Clinics
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {filteredClinics.length} Clinics
            </span>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
            >
              Reset Filters ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* CLINICS GRID */}
        {filteredClinics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClinics.map((clinic, cIdx) => (
              <article
                key={clinic.clinicId}
                onClick={() => handleClinicClick(clinic.clinicId)}
                className="group bg-white/70 backdrop-blur-md rounded-2xl border border-white/90 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200/90 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer backdrop-saturate-150"
              >
                {/* LCP Priority High Performance Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 aspect-video">
                  <img
                    src={'/clinic1.webp'}
                    alt={clinic.clinicName}
                    width="480"
                    height="270"
                    loading={cIdx === 0 ? "eager" : "lazy"}
                    fetchPriority={cIdx === 0 ? "high" : "auto"}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-80" />

                  {/* Fee Pill */}
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/75 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-0.5 border border-white/20">
                    <DollarSign className="w-3 h-3 text-emerald-400" />
                    <span>{clinic.checkingFee} JOD</span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 right-2.5 bg-white/85 backdrop-blur-md text-slate-900 px-2 py-0.5 rounded-full text-xs font-extrabold shadow-xs flex items-center gap-1 border border-white/60">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{clinic.rating ? clinic.rating.toFixed(1) : "0.0"}</span>
                  </div>

                  {/* Specialty Tags */}
                  <div className="absolute bottom-2 left-2.5 flex flex-wrap items-center gap-1">
                    {clinic.specialties?.slice(0, 3).map((spec, sIdx) => (
                      <span key={sIdx} className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-600 text-white shadow-xs">
                        {spec}
                      </span>
                    ))}
                    {clinic.specialties?.length > 3 && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-800/80 text-white shadow-xs backdrop-blur-sm">
                        more...
                      </span>
                    )}
                  </div>
                </div>

                {/* Enhanced Glassmorphism Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white/40 backdrop-blur-xs">
                  <div>
                    {/* Clinic Name */}
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-1 mb-1">
                      {clinic.clinicName}
                    </h3>

                    {/* Doctor Names */}
                    <div className="text-[11px] font-bold text-slate-900 mb-2 flex items-center gap-1.5 flex-wrap">
                      <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      {clinic.doctors?.length > 0 ? (
                        <>
                          {clinic.doctors.slice(0, 2).map((doc, dIdx) => (
                            <span key={dIdx}>{doc}{dIdx < clinic.doctors.length - 1 ? ', ' : ''}</span>
                          ))}
                          {clinic.doctors.length > 2 && (
                            <span className="text-slate-500 font-semibold italic">more...</span>
                          )}
                        </>
                      ) : (
                        <span className="text-slate-500 italic">No active doctors</span>
                      )}
                    </div>

                    {/* Address & Hours */}
                    <div className="space-y-1 text-[11px] text-slate-600 mb-2">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="line-clamp-1 font-medium">{clinic.detailedAddress || "No address provided"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-medium">{clinic.workingHours || "Hours not set"}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-1 mb-2.5">
                      {clinic.description || "No description available"}
                    </p>

                    {/* Service Badges */}
                    <div className="flex flex-wrap items-center gap-1">
                      {clinic.services?.slice(0, 2).map((srv, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-blue-50/80 text-blue-700 text-[10px] font-semibold border border-blue-200/60 backdrop-blur-xs"
                        >
                          {srv}
                        </span>
                      ))}
                      {clinic.services?.length > 2 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100/80 text-slate-600 text-[10px] font-bold border border-slate-200">
                          +{clinic.services.length - 2} More
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-blue-600 [text-shadow:0_0_8px_theme(colors.blue.400/50)]">
                      <Calendar className="w-3.5 h-3.5 shrink-0 drop-shadow-[0_0_4px_rgba(37,99,235,0.5)]" />
                      <span className="font-bold text-[11px]">
                        {clinic.nextAvailableSlot ? `Next available: ${clinic.nextAvailableSlot}` : "No upcoming slots"}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClinicClick(clinic.clinicId);
                      }}
                      className="py-1.5 px-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold rounded-lg text-xs flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              </article>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-10 text-center shadow-2xs my-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">No Matching Clinics Found</h3>
            <p className="text-xs text-slate-500 mb-4">
              Try adjusting your search keyword or star rating filter.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </main>

    </div>
  );
}
