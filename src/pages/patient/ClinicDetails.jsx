import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import PatientNavbar from '../../components/PatientNavbar';
import { fetchClinicDetails, fetchAvailability } from '../../api/patientApi';
import './ClinicDetails.css';

// ─── Helpers ───

const DAY_ORDER = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const DAY_SHORT = { MONDAY: 'Mon', TUESDAY: 'Tue', WEDNESDAY: 'Wed', THURSDAY: 'Thu', FRIDAY: 'Fri', SATURDAY: 'Sat', SUNDAY: 'Sun' };

function formatTime12h(time24) {
    if (!time24) return '';
    const [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

/** Merge consecutive days with same hours into grouped rows */
function mergeClinicHours(clinicHours) {
    const dayMap = {};
    for (const h of clinicHours) {
        if (h.dayOfWeek) {
            dayMap[h.dayOfWeek] = { start: h.startTime, end: h.endTime };
        }
    }

    const DAY_ORDER = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const DAY_SHORT = { SUNDAY: 'Sun', MONDAY: 'Mon', TUESDAY: 'Tue', WEDNESDAY: 'Wed', THURSDAY: 'Thu', FRIDAY: 'Fri', SATURDAY: 'Sat' };

    const timeGroups = {};
    for (const day of DAY_ORDER) {
        const hours = dayMap[day];
        const timeStr = hours ? `${formatTime12h(hours.start)} - ${formatTime12h(hours.end)}` : 'Closed';
        if (!timeGroups[timeStr]) timeGroups[timeStr] = [];
        timeGroups[timeStr].push(day);
    }

    const rows = [];

    for (const [timeStr, days] of Object.entries(timeGroups)) {
        let labelParts = [];
        let rangeStart = days[0];
        let prevDayIndex = DAY_ORDER.indexOf(days[0]);

        for (let i = 1; i <= days.length; i++) {
            const currentDay = days[i];
            const currentIndex = DAY_ORDER.indexOf(currentDay);

            if (currentDay && currentIndex === prevDayIndex + 1) {
                prevDayIndex = currentIndex;
            } else {
                const rangeEnd = DAY_ORDER[prevDayIndex];
                if (rangeStart === rangeEnd) {
                    labelParts.push(DAY_SHORT[rangeStart]);
                } else {
                    labelParts.push(`${DAY_SHORT[rangeStart]} - ${DAY_SHORT[rangeEnd]}`);
                }

                rangeStart = currentDay;
                prevDayIndex = currentIndex;
            }
        }

        rows.push({ day: labelParts.join(', '), time: timeStr });
    }

    const openRows = rows.filter(r => r.time !== 'Closed');
    const closedRows = rows.filter(r => r.time === 'Closed');
    return [...openRows, ...closedRows];
}

function timeAgo(dateStr) {
    if (!dateStr) return '';
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffHrs = Math.floor(diffMin / 60);
    if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
}

function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

const AVATAR_COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#ec4899'];
function colorFromName(name) {
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}



/** Get exactly the next 7 dates, starting from today */
function getUpcomingDates() {
    const dates = [];
    const today = new Date();

    for (let offset = 0; offset < 7; offset++) {
        const d = new Date(today);
        d.setDate(today.getDate() + offset);
        dates.push(d);
    }
    return dates;
}

function formatDateLabel(date) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
}

function formatDateForApi(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// ─── Sub-components ───

function StarRating({ rating, size = 14 }) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.3;
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(
                <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#eab308" stroke="#eab308" strokeWidth="1">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        } else if (i === fullStars && hasHalf) {
            stars.push(
                <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="1">
                    <defs>
                        <linearGradient id={`half-${i}`}>
                            <stop offset="50%" stopColor="#eab308" />
                            <stop offset="50%" stopColor="#e2e8f0" />
                        </linearGradient>
                    </defs>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#half-${i})`} />
                </svg>
            );
        } else {
            stars.push(
                <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        }
    }
    return <span className="cd-star-rating">{stars}</span>;
}

function ClinicHero({ clinic }) {
    const navigate = useNavigate();
    return (
        <section className="cd-hero cd-card" id="clinic-hero">
            <div className="cd-hero-image-wrap">
                <img
                    src={clinic.imageUrl || '/clinic-building.jpg'}
                    alt={clinic.clinicName}
                    className="cd-hero-image"
                    onError={(e) => {
                        e.currentTarget.src = '/clinic-building.jpg';
                    }}
                />
            </div>
            <div className="cd-hero-info">
                <h1 className="cd-hero-name" id="clinic-name">{clinic.clinicName}</h1>
                <div className="cd-hero-address">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{clinic.detailedAddress || 'No address provided'}</span>
                </div>
                <div className="cd-hero-tags">
                    {clinic.specialties?.map((tag) => (
                        <span key={tag} className="cd-tag">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="cd-hero-actions" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
                <div className="cd-hero-fee">
                    <span className="cd-hero-fee-label">Checking Fee:</span>
                    <span className="cd-hero-fee-value">
                        {clinic.checkingFee != null ? `${clinic.checkingFee} JOD` : 'Free'}
                    </span>
                </div>
                <button
                    onClick={() => navigate(`/book-appointment/${clinic.clinicId}`)}
                    className="cd-book-btn"
                    style={{
                        padding: '10px 18px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    Book Appointment <span className="cd-book-arrow">→</span>
                </button>
            </div>
        </section>
    );
}

function AboutSection({ clinic, mergedHours }) {
    return (
        <section className="cd-about-contact-grid" id="about-contact-section">
            <div className="cd-about cd-card" id="about-clinic">
                <h2 className="cd-section-title">About Our Clinic</h2>
                <p className="cd-about-text">
                    {clinic.description
                        ? (clinic.description.endsWith('.') ? clinic.description : `${clinic.description}.`)
                        : 'No description available.'}
                </p>
            </div>

            <div className="cd-contact cd-card" id="contact-hours">
                <h2 className="cd-section-title">Contact & Hours</h2>
                <div className="cd-contact-items">
                    {/* Phone */}
                    <div className="cd-contact-item">
                        <div className="cd-contact-icon cd-contact-icon-phone">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <div className="cd-contact-detail">
                            <span className="cd-contact-label">Phone</span>
                            <span className="cd-contact-value">{clinic.phoneNumber || 'Not provided'}</span>
                        </div>
                    </div>
                    {/* Email */}
                    <div className="cd-contact-item">
                        <div className="cd-contact-icon cd-contact-icon-email">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <div className="cd-contact-detail">
                            <span className="cd-contact-label">Email</span>
                            <span className="cd-contact-value">{clinic.email || 'Not provided'}</span>
                        </div>
                    </div>

                    {/* Social Links */}
                    {clinic.socialLinks && (
                        <div className="cd-contact-item">
                            <div className="cd-contact-icon cd-contact-icon-email">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                </svg>
                            </div>
                            <div className="cd-contact-detail">
                                <span className="cd-contact-label">Social</span>
                                <span className="cd-contact-value">{clinic.socialLinks}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="cd-hours-table">
                    {mergedHours.map((h) => (
                        <div key={h.day} className="cd-hours-row">
                            <span className="cd-hours-day">{h.day}</span>
                            <span className={`cd-hours-time ${h.time === 'Closed' ? 'cd-hours-closed' : ''}`}>
                                {h.time}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TimeSlotGrid({ clinicId, doctorId, activeDates, selectedAppointment, onSelectAppointment }) {
    const [slotsByDate, setSlotsByDate] = useState({});
    const [loadingSlots, setLoadingSlots] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        Promise.all(
            activeDates.map(date =>
                fetchAvailability(clinicId, formatDateForApi(date), doctorId)
                    .then(slots => ({ date: formatDateForApi(date), label: formatDateLabel(date), slots }))
                    .catch(() => ({ date: formatDateForApi(date), label: formatDateLabel(date), slots: [] }))
            )
        ).then(results => {
            if (cancelled) return;
            const map = {};
            for (const r of results) {
                map[r.label] = r.slots.map(s => ({
                    time: s.time?.substring(0, 5),
                    available: s.available,
                    date: r.date,
                    scheduleId: s.scheduleId
                }));
            }
            setSlotsByDate(map);
            setLoadingSlots(false);
        });

        return () => { cancelled = true; };
    }, [clinicId, doctorId, activeDates]);

    const handleSlotClick = (day, time) => {
        if (selectedAppointment?.doctorId === doctorId && selectedAppointment?.day === day && selectedAppointment?.time === time) {
            onSelectAppointment(null);
        } else {
            const slot = slotsByDate[day]?.find(s => s.time === time);
            onSelectAppointment({ doctorId, day, time, date: slot?.date, scheduleId: slot?.scheduleId });
        }
    };

    const days = Object.keys(slotsByDate);

    if (loadingSlots) {
        return (
            <div className="cd-timeslot-section">
                <p className="cd-timeslot-label">Loading availability...</p>
            </div>
        );
    }

    if (days.length === 0) {
        return (
            <div className="cd-timeslot-section">
                <p className="cd-timeslot-label">No available days found</p>
            </div>
        );
    }

    return (
        <div className="cd-timeslot-section">
            <p className="cd-timeslot-label">SELECT A TIME FOR CONSULTATION</p>
            <div className="cd-days-scroll-wrapper" ref={scrollRef}>
                <div className="cd-days-container" style={{ minWidth: days.length > 3 ? `${days.length * 210}px` : undefined }}>
                    {days.map(day => (
                        <div key={day} className="cd-day-column">
                            <div className="cd-day-header">{day}</div>
                            <div className="cd-day-slots">
                                {slotsByDate[day].length === 0 ? (
                                    <span style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8', fontSize: '13px', padding: '12px 0' }}>
                                        No slots
                                    </span>
                                ) : (
                                    slotsByDate[day].map(slot => {
                                        const isAvailable = slot.available;
                                        const isSelected = selectedAppointment?.doctorId === doctorId && selectedAppointment?.day === day && selectedAppointment?.time === slot.time;
                                        const isAnotherSelected = selectedAppointment !== null && !isSelected;

                                        let slotClass = 'cd-slot-unavailable';
                                        if (isAvailable) {
                                            if (isSelected) {
                                                slotClass = 'cd-slot-selected';
                                            } else if (isAnotherSelected) {
                                                slotClass = 'cd-slot-unselected';
                                            } else {
                                                slotClass = 'cd-slot-available';
                                            }
                                        }

                                        return (
                                            <button
                                                key={slot.time}
                                                className={`cd-slot-btn ${slotClass}`}
                                                disabled={!isAvailable}
                                                onClick={() => handleSlotClick(day, slot.time)}
                                            >
                                                {slot.time}
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function DoctorCard({ doctor, clinicId, selectedAppointment, onSelectAppointment }) {
    const navigate = useNavigate();
    const [showSlots, setShowSlots] = useState(false);

    // Static rating mock for now
    const mockRating = 4.8;

    const activeDates = useMemo(() => getUpcomingDates(), []);

    const isSelectedDoctor = selectedAppointment?.doctorId === doctor.doctorId;

    const handleBookClick = () => {
        navigate(`/book-appointment/${clinicId}`, {
            state: {
                clinicId,
                doctorId: doctor.doctorId,
                doctorName: doctor.fullName,
                doctorSpecialty: doctor.specialty,
                selectedDate: isSelectedDoctor ? selectedAppointment?.date : undefined,
                selectedTime: isSelectedDoctor ? selectedAppointment?.time : undefined,
                selectedDay: isSelectedDoctor ? selectedAppointment?.day : undefined
            }
        });
    };

    return (
        <div className="cd-doctor-card cd-card" id={`doctor-card-${doctor.doctorId}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="cd-doctor-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0, flex: 1 }}>
                    <div
                        className="cd-doctor-avatar"
                        style={{
                            backgroundColor: colorFromName(doctor.fullName),
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontSize: '24px', fontWeight: 700
                        }}
                    >
                        {getInitials(doctor.fullName)}
                    </div>
                    <div className="cd-doctor-info">
                        <div className="cd-doctor-name-row">
                            <h3 className="cd-doctor-name">{doctor.fullName}</h3>
                            <div className="cd-doctor-rating-badge">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="#eab308" stroke="none">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <span className="cd-rating-number">{mockRating}</span>
                            </div>
                        </div>
                        <span className="cd-doctor-specialty">{doctor.specialty || 'General Dentist'}</span>
                        <p className="cd-doctor-desc">{doctor.bio || 'No bio available.'}</p>
                    </div>
                </div>

                {/* Book Appointment Button (Top Right) */}
                <div style={{ flexShrink: 0, marginLeft: '16px', marginTop: '30px' }}>
                    <button
                        className="cd-book-btn"
                        onClick={handleBookClick}
                        style={{
                            padding: '12px 20px',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            opacity: 1,
                            cursor: 'pointer',
                            boxShadow: isSelectedDoctor ? '0 0 15px 2px rgba(14, 165, 233, 0.4)' : 'none',
                            transform: isSelectedDoctor ? 'scale(1.05)' : 'scale(1)'
                        }}
                    >
                        Book Appointment <span className="cd-book-arrow">→</span>
                    </button>
                </div>
            </div>
            <button
                className="cd-toggle-times"
                onClick={() => setShowSlots(!showSlots)}
                id={`toggle-times-${doctor.doctorId}`}
                style={{ marginTop: '16px' }}
            >
                {showSlots ? 'Hide' : 'View'} Available Times{' '}
                <span className={`cd-toggle-arrow ${showSlots ? 'cd-arrow-up' : ''}`}>▾</span>
            </button>
            {showSlots && (
                <TimeSlotGrid
                    clinicId={clinicId}
                    doctorId={doctor.doctorId}
                    activeDates={activeDates}
                    selectedAppointment={selectedAppointment}
                    onSelectAppointment={onSelectAppointment}
                />
            )}
        </div>
    );
}

function ReviewCard({ review, clinicName }) {
    return (
        <div className="cd-review-card cd-card" id={`review-${review.reviewId}`}>
            <div className="cd-review-header">
                <div className="cd-review-author-row">
                    <div
                        className="cd-review-avatar"
                        style={{ backgroundColor: colorFromName(review.patientName) }}
                    >
                        {getInitials(review.patientName)}
                    </div>
                    <div className="cd-review-author-info">
                        <span className="cd-review-author">{review.patientName}</span>
                        <span className="cd-review-time">{timeAgo(review.createdAt)}</span>
                    </div>
                </div>
                <StarRating rating={review.rating} size={13} />
            </div>
            <p className="cd-review-text">"{review.comment}"</p>
            {review.reply && (
                <div className="cd-review-reply">
                    <div className="cd-reply-author-row">
                        <div className="cd-reply-icon">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <span className="cd-reply-author">{clinicName}</span>
                    </div>
                    <p className="cd-reply-text">{review.reply}</p>
                </div>
            )}
        </div>
    );
}

// ─── Main Page Component ───

export default function ClinicDetails() {
    const { id: clinicId } = useParams();
    const [clinic, setClinic] = useState(null);
    const [loading, setLoading] = useState(Boolean(clinicId));
    const [error, setError] = useState(clinicId ? null : 'No clinic ID provided');
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        if (!clinicId) return;

        fetchClinicDetails(clinicId)
            .then(data => {
                setClinic(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [clinicId]);

    const clinicHours = clinic?.clinicHours;
    const mergedHours = useMemo(() => {
        if (!clinicHours) return [];
        return mergeClinicHours(clinicHours);
    }, [clinicHours]);

    if (loading) {
        return (
            <div className="cd-page">
                <PatientNavbar />
                <main className="cd-main">
                    <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748b', fontSize: '16px' }}>
                        Loading clinic details...
                    </div>
                </main>
            </div>
        );
    }

    if (error || !clinic) {
        return (
            <div className="cd-page">
                <PatientNavbar />
                <main className="cd-main">
                    <div style={{ textAlign: 'center', padding: '80px 0', color: '#dc2626', fontSize: '16px' }}>
                        {error || 'Clinic not found'}
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="cd-page">
            <PatientNavbar />

            <main className="cd-main">
                <ClinicHero clinic={clinic} />

                <AboutSection clinic={clinic} mergedHours={mergedHours} />

                <section className="cd-doctors-section" id="our-doctors">
                    <h2 className="cd-section-title">Our Doctors</h2>
                    <div className="cd-doctors-list">
                        {clinic.doctors?.filter(doc => doc.isActive !== false).map((doc) => (
                            <DoctorCard
                                key={doc.doctorId}
                                doctor={doc}
                                clinicId={clinicId}
                                selectedAppointment={selectedAppointment}
                                onSelectAppointment={setSelectedAppointment}
                            />
                        ))}
                        {(!clinic.doctors || clinic.doctors.length === 0) && (
                            <div className="cd-card" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                                No doctors are currently available at this clinic.
                            </div>
                        )}
                    </div>
                </section>

                <section className="cd-reviews-section" id="reviews-section">
                    <h2 className="cd-section-title">Reviews & Replies</h2>
                    {clinic.reviews?.length > 0 ? (
                        <div className="cd-reviews-grid">
                            {clinic.reviews.map((review) => (
                                <ReviewCard key={review.reviewId} review={review} clinicName={clinic.clinicName} />
                            ))}
                        </div>
                    ) : (
                        <div className="cd-card" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                            No reviews yet. Be the first to review this clinic!
                        </div>
                    )}
                    {clinic.reviews?.length > 0 && (
                        <div className="cd-reviews-footer">
                            <button className="cd-view-all-btn" id="view-all-reviews-btn">
                                View All Reviews
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}