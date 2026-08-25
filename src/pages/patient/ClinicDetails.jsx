import { useState } from 'react';
import { useNavigate } from 'react-router';
import './ClinicDetails.css';

// ─── Mock Data (will be replaced by API responses) ───
const clinicData = {
    id: 1,
    name: 'Downtown Smile Center',
    address: '123 Clinical Ave, Medical District, NY 10001',
    image: '/clinic-building.jpg',
    tags: ['General Dentistry', 'Orthodontics', 'Implants'],
    about: `Welcome to Downtown Smile Center, part of the Dr.Sna Dental network. We are committed to providing exceptional, patient-centered dental care in a state-of-the-art, hygienic environment. Our team of specialists utilizes the latest in medical technology to ensure your treatments are efficient, comfortable, and effective. From routine cleanings to complex restorative procedures, we prioritize your oral health and overall well-being.`,
    contact: {
        phone: '(555) 123-4567',
        email: 'contact@downtownsmile.com',
    },
    hours: [
        { day: 'Mon - Fri', time: '8:00 AM - 6:00 PM' },
        { day: 'Saturday', time: '9:00 AM - 2:00 PM' },
        { day: 'Sunday', time: 'Closed' },
    ],
};

const doctorsData = [
    {
        id: 1,
        name: 'Dr. Sarah Jenkins',
        specialty: 'Lead Orthodontist',
        rating: 4.8,
        image: '/doctor-sarah.jpg',
        description:
            'Specializing in Invisalign aligners and complex orthodontic corrections with 12 years of clinical experience.',
        availableSlots: {
            Today: [
                '10:00', '11:00', '12:00', '13:00',
                '14:00', '15:00', '16:00', '17:00',
            ],
            Tomorrow: [
                '10:00', '11:00', '12:00', '13:00',
                '14:00', '15:00', '16:00', '17:00',
            ],
            'Thu, Oct 26': [
                '11:00', '12:00', '13:00',
                '14:00', '16:00', '17:00',
            ],
        },
    },
    {
        id: 2,
        name: 'Dr. Michael Chen',
        specialty: 'Oral Surgeon',
        rating: 4.8,
        image: '/doctor-michael.jpg',
        description:
            'Expert in dental implants, wisdom teeth extraction, and complex oral surgeries. Board certified since 2015.',
        availableSlots: {
            Today: ['09:00', '10:00', '11:00', '14:00', '15:00'],
            Tomorrow: ['10:00', '11:00', '13:00', '14:00', '16:00'],
            'Thu, Oct 26': ['09:00', '11:00', '14:00', '15:00', '16:00'],
        },
    },
];

const reviewsData = [
    {
        id: 1,
        author: 'Emily Johnson',
        timeAgo: '2 weeks ago',
        rating: 4,
        avatarColor: '#dc2626',
        avatarInitial: 'E',
        text: '"Incredible experience! Dr. Jenkins was so patient and explained my treatment plan perfectly. The clinic is spotless and the front desk staff are incredibly welcoming."',
        reply: {
            author: 'Downtown Smile Center',
            text: 'Thank you, Emily! We\'re thrilled to hear you had a great experience with Dr. Jenkins and our team.',
        },
    },
    {
        id: 2,
        author: 'Mark Roberts',
        timeAgo: '1 month ago',
        rating: 4,
        avatarColor: '#2563eb',
        avatarInitial: 'M',
        text: '"Very professional and clean environment. Had my wisdom teeth removed by Dr. Chen and recovery was smoother than expected. Wait time was a bit long though."',
        reply: {
            author: 'Downtown Smile Center',
            text: 'Hi Mark, thanks for the feedback! Glad the extraction went well. We are working on optimizing our scheduling to reduce wait times.',
        },
    },
];

// ─── Sub-components ───

function Navbar() {
    const navigate = useNavigate();
    return (
        <header className="cd-navbar" id="clinic-details-navbar">
            <div className="cd-navbar-inner">
                <div className="cd-navbar-brand" onClick={() => navigate('/')}>
                    <span className="cd-brand-text">Dr.Sna Dental</span>
                </div>
                <div className="cd-navbar-avatar" id="user-avatar-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
            </div>
        </header>
    );
}

function StarRating({ rating, size = 14 }) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.3;
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(
                <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        } else if (i === fullStars && hasHalf) {
            stars.push(
                <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="none">
                    <defs>
                        <linearGradient id={`half-${i}`}>
                            <stop offset="50%" stopColor="#f59e0b" />
                            <stop offset="50%" stopColor="#d1d5db" />
                        </linearGradient>
                    </defs>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#half-${i})`} />
                </svg>
            );
        } else {
            stars.push(
                <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#d1d5db" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        }
    }
    return <span className="cd-star-rating">{stars}</span>;
}

function ClinicHero({ clinic }) {
    return (
        <section className="cd-hero" id="clinic-hero">
            <div className="cd-hero-image-wrap">
                <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="cd-hero-image"
                />
            </div>
            <div className="cd-hero-info">
                <h1 className="cd-hero-name" id="clinic-name">{clinic.name}</h1>
                <div className="cd-hero-address">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#22c55e" stroke="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span>{clinic.address}</span>
                </div>
                <div className="cd-hero-tags">
                    {clinic.tags.map((tag) => (
                        <span key={tag} className="cd-tag">{tag}</span>
                    ))}
                </div>
            </div>
            <button className="cd-book-btn" id="book-appointment-btn">
                Book Appointment <span className="cd-book-arrow">→</span>
            </button>
        </section>
    );
}

function AboutSection({ clinic }) {
    return (
        <section className="cd-about-contact-grid" id="about-contact-section">
            <div className="cd-about" id="about-clinic">
                <h2 className="cd-section-title">About Our Clinic</h2>
                <p className="cd-about-text">{clinic.about}</p>
            </div>

            <div className="cd-contact" id="contact-hours">
                <h2 className="cd-section-title">Contact & Hours</h2>
                <div className="cd-contact-items">
                    <div className="cd-contact-item">
                        <div className="cd-contact-icon cd-contact-icon-phone">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <div className="cd-contact-detail">
                            <span className="cd-contact-label">Phone</span>
                            <span className="cd-contact-value">{clinic.contact.phone}</span>
                        </div>
                    </div>
                    <div className="cd-contact-item">
                        <div className="cd-contact-icon cd-contact-icon-email">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <div className="cd-contact-detail">
                            <span className="cd-contact-label">Email</span>
                            <span className="cd-contact-value">{clinic.contact.email}</span>
                        </div>
                    </div>
                </div>
                <div className="cd-hours-table">
                    {clinic.hours.map((h) => (
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

function TimeSlotGrid({ slots, dayTabs, activeDay, onDayChange }) {
    const currentSlots = slots[activeDay] || [];
    // Generate colors for time slot buttons - alternating row colors
    const getSlotColor = (index) => {
        const row = Math.floor(index / 2);
        const colors = ['cd-slot-blue', 'cd-slot-green', 'cd-slot-orange', 'cd-slot-red'];
        return colors[row % colors.length];
    };

    return (
        <div className="cd-timeslot-section">
            <p className="cd-timeslot-label">SELECT A TIME FOR CONSULTATION</p>
            <div className="cd-day-tabs">
                {dayTabs.map((day) => (
                    <button
                        key={day}
                        className={`cd-day-tab ${activeDay === day ? 'cd-day-tab-active' : ''}`}
                        onClick={() => onDayChange(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>
            <div className="cd-slots-grid">
                {currentSlots.map((time, idx) => (
                    <button
                        key={time}
                        className={`cd-slot-btn ${getSlotColor(idx)}`}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );
}

function DoctorCard({ doctor }) {
    const [showSlots, setShowSlots] = useState(doctor.id === 1);
    const dayTabs = Object.keys(doctor.availableSlots);
    const [activeDay, setActiveDay] = useState(dayTabs[0]);

    return (
        <div className="cd-doctor-card" id={`doctor-card-${doctor.id}`}>
            <div className="cd-doctor-header">
                <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="cd-doctor-avatar"
                />
                <div className="cd-doctor-info">
                    <div className="cd-doctor-name-row">
                        <h3 className="cd-doctor-name">{doctor.name}</h3>
                        <div className="cd-doctor-rating-badge">
                            <StarRating rating={doctor.rating} size={12} />
                            <span className="cd-rating-number">{doctor.rating}</span>
                        </div>
                    </div>
                    <span className="cd-doctor-specialty">{doctor.specialty}</span>
                    <p className="cd-doctor-desc">{doctor.description}</p>
                </div>
            </div>
            <button
                className="cd-toggle-times"
                onClick={() => setShowSlots(!showSlots)}
                id={`toggle-times-${doctor.id}`}
            >
                {showSlots ? 'Hide' : 'View'} Available Times{' '}
                <span className={`cd-toggle-arrow ${showSlots ? 'cd-arrow-up' : ''}`}>▾</span>
            </button>
            {showSlots && (
                <TimeSlotGrid
                    slots={doctor.availableSlots}
                    dayTabs={dayTabs}
                    activeDay={activeDay}
                    onDayChange={setActiveDay}
                />
            )}
        </div>
    );
}

function ReviewCard({ review }) {
    return (
        <div className="cd-review-card" id={`review-${review.id}`}>
            <div className="cd-review-header">
                <div className="cd-review-author-row">
                    <div
                        className="cd-review-avatar"
                        style={{ backgroundColor: review.avatarColor }}
                    >
                        {review.avatarInitial}
                    </div>
                    <div className="cd-review-author-info">
                        <span className="cd-review-author">{review.author}</span>
                        <span className="cd-review-time">{review.timeAgo}</span>
                    </div>
                </div>
                <StarRating rating={review.rating} size={13} />
            </div>
            <p className="cd-review-text">{review.text}</p>
            {review.reply && (
                <div className="cd-review-reply">
                    <div className="cd-reply-author-row">
                        <div className="cd-reply-icon">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#22c55e" stroke="none">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </div>
                        <span className="cd-reply-author">{review.reply.author}</span>
                    </div>
                    <p className="cd-reply-text">{review.reply.text}</p>
                </div>
            )}
        </div>
    );
}

// ─── Main Page Component ───

export default function ClinicDetails() {
    return (
        <div className="cd-page">
            <Navbar />

            <main className="cd-main">
                <ClinicHero clinic={clinicData} />

                <div className="cd-divider" />

                <AboutSection clinic={clinicData} />

                <div className="cd-divider" />

                <section className="cd-doctors-section" id="our-doctors">
                    <h2 className="cd-section-title">Our Doctors</h2>
                    <div className="cd-doctors-list">
                        {doctorsData.map((doc) => (
                            <DoctorCard key={doc.id} doctor={doc} />
                        ))}
                    </div>
                </section>

                <div className="cd-divider" />

                <section className="cd-reviews-section" id="reviews-section">
                    <h2 className="cd-section-title">Reviews & Replies</h2>
                    <div className="cd-reviews-grid">
                        {reviewsData.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                    <div className="cd-reviews-footer">
                        <button className="cd-view-all-btn" id="view-all-reviews-btn">
                            View All Reviews
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
