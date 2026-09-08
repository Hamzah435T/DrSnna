export const MOCK_STATS = {
    commission: { value: 48250.00, change: 14.8, isPositive: true },
    activeClinics: { value: 142, newThisMonth: 6 },
    pendingApprovals: 7,
    bookings: { value: 3840, change: 9.2, isPositive: true }
};

export const MOCK_CHART_DATA = [
    { name: 'MAY (31K)', actual: 31000, target: 33000 },
    { name: 'JUN (34.2K)', actual: 34200, target: 35000 },
    { name: 'JUL (37.8K)', actual: 37800, target: 38000 },
    { name: 'AUG (39.4K)', actual: 39400, target: 39000 },
    { name: 'SEP (42.0K)', actual: 42000, target: 41000 },
    { name: 'OCT (48.25K)', actual: 48250, target: 45000 },
];

export const MOCK_PENDING_CLINICS = [
    {
        id: 'CL-AMM-881',
        name: 'Al-Amal Dental Center',
        legalName: 'Al-Amal Specialized Oral Clinic LLC',
        registryNo: '#JO-AMM-99420',
        city: 'Amman',
        location: 'Amman, Jordan',
        branches: 3,
        doctors: 8,
        operatories: 14,
        currency: 'JOD',
        submitted: 'Oct 24, 2023 - 09:30 AM',
        initials: 'AA',
        initialsBg: 'bg-blue-100',
        initialsColor: 'text-blue-700',
        disciplines: ['Prosthodontics', 'Endodontics', 'Periodontal Surgery', 'Pediatric Dentistry', 'Dental Implantology', 'Clear Aligners'],
        taxNo: '102948192 - JOD',
        mohLicense: 'MOH-DENT - 2023-4180',
        defaultCommission: 12.0
    },
    {
        id: 'CL-IRB-109',
        name: 'Jordan Specialty Clinic',
        legalName: 'Jordan Specialty Clinic LLC',
        registryNo: '#JO-IRB-99421',
        city: 'Irbid',
        location: 'Irbid, Jordan',
        branches: 1,
        doctors: 4,
        operatories: 6,
        currency: 'JOD',
        submitted: 'Oct 23, 2023 - 04:15 PM',
        initials: 'JS',
        initialsBg: 'bg-teal-100',
        initialsColor: 'text-teal-700',
        disciplines: ['General Dentistry', 'Orthodontics'],
        taxNo: '102948193 - JOD',
        mohLicense: 'MOH-DENT - 2023-4181',
        defaultCommission: 12.0
    },
    {
        id: 'CL-ZRQ-302',
        name: 'Royal Ortho Hub',
        legalName: 'Royal Ortho Hub Est.',
        registryNo: '#JO-ZRQ-99422',
        city: 'Zarqa',
        location: 'Zarqa, Jordan',
        branches: 2,
        doctors: 6,
        operatories: 10,
        currency: 'USD',
        submitted: 'Oct 23, 2023 - 11:20 AM',
        initials: 'RO',
        initialsBg: 'bg-purple-100',
        initialsColor: 'text-purple-700',
        disciplines: ['Orthodontics', 'Oral Surgery'],
        taxNo: '102948194 - JOD',
        mohLicense: 'MOH-DENT - 2023-4182',
        defaultCommission: 12.0
    },
    {
        id: 'CL-AQB-051',
        name: 'Petra Dental Care',
        legalName: 'Petra Dental Care Clinic',
        registryNo: '#JO-AQB-99423',
        city: 'Aqaba',
        location: 'Aqaba, Jordan',
        branches: 1,
        doctors: 3,
        operatories: 4,
        currency: 'JOD',
        submitted: 'Oct 22, 2023 - 01:45 PM',
        initials: 'PD',
        initialsBg: 'bg-slate-200',
        initialsColor: 'text-slate-700',
        disciplines: ['General Dentistry', 'Pediatric Dentistry'],
        taxNo: '102948195 - JOD',
        mohLicense: 'MOH-DENT - 2023-4183',
        defaultCommission: 12.0
    }
];

export const MOCK_EXCHANGE_RATES = [
    { currency: 'USD', pair: 'USD / JOD', name: 'US Dollar', rate: 0.7090, change: '+ 0.0%', isPegged: true, color: 'text-slate-500' },
    { currency: 'EUR', pair: 'EUR / JOD', name: 'Euro', rate: 0.7685, change: '+0.14%', isPegged: false, color: 'text-emerald-600' },
    { currency: 'SAR', pair: 'SAR / JOD', name: 'Saudi Riyal', rate: 0.1890, change: '0.00%', isPegged: false, color: 'text-slate-500' },
    { currency: 'GBP', pair: 'GBP / JOD', name: 'British Pound', rate: 0.8950, change: '-0.08%', isPegged: false, color: 'text-rose-600' }
];

export const MOCK_TOP_CLINICS = [
    { rank: 1, name: 'SmileArt Studio', location: 'Amman', rate: '15% override rate', revenue: 12450, status: 'Top Contributor' },
    { rank: 2, name: 'Apex Dental Care', location: 'Irbid', rate: '12% standard rate', revenue: 9820, status: '+8% vs Sep' },
    { rank: 3, name: 'Little Teeth Clinic', location: 'Amman', rate: '15% rate', revenue: 7650, status: '+12% vs Sep' },
    { rank: 4, name: 'Aljubaiha Dental', location: 'Amman', rate: '10% rate', revenue: 6120, status: 'Consistent' }
];

export const MOCK_AUDIT_LOGS = [
    { id: 1, action: 'Dr. Tariq added to Aljubaiha Dental', detail: 'Credential verification completed by SuperAdmin', time: '24 mins ago', icon: 'UserPlus', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
    { id: 2, action: 'Jordan Dental Care approved', detail: 'Account activated & settlement channels linked', time: '2 hours ago', icon: 'CheckCircle', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { id: 3, action: 'Commission payout processed for Apex Dental', detail: 'Settlement reference #PO-88219 confirmed', time: '4 hours ago', icon: 'CreditCard', iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
    { id: 4, action: 'FX rate updated automatically', detail: 'EUR/JOD synced to 0.7685 from Central Bank API', time: '8 hours ago', icon: 'RefreshCw', iconBg: 'bg-slate-100', iconColor: 'text-slate-600' }
];
