import { Form, NavLink } from "react-router";

/**
 * ClinicLayout – shared sidebar + content shell for every clinic page.
 *
 * Props
 * ─────
 * @param {string}       activePage   – key of the currently-active sidebar item
 * @param {function}     onNavigate   – (pageKey) => void  (wired up later when real routing lands)
 * @param {React.Node}   sidebarTopContent  - extra content injected between brand and nav
 * @param {React.Node}   sidebarBottomContent - extra content injected below nav
 */
export default function ClinicLayout({ children, sidebarTopContent }) {
    const navItems = [
        { key: "dashboard",    label: "Dashboard",    icon: DashboardIcon },
        { key: "doctors",      label: "Doctors",      icon: DoctorsIcon },
        { key: "appointments", label: "Appointments", icon: AppointmentsIcon },
        { key: "settings",     label: "Settings",     icon: SettingsIcon },
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* ─── Sidebar ─── */}
            <aside className="w-[200px] min-w-[200px] bg-white flex flex-col border-r border-gray-100">
                {/* Clinic branding */}
                <div className="px-5 pt-6 pb-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                        <ClinicBrandIcon />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-blue-600 leading-tight">Dr.Sna</p>
                        <p className="text-sm font-semibold text-gray-800 leading-tight">Admin</p>
                        <p className="text-[11px] text-blue-500 leading-tight">Clinical Management</p>
                    </div>
                </div>

                {sidebarTopContent && (
                    <div className="px-3 mb-2">
                        {sidebarTopContent}
                    </div>
                )}

                {/* Navigation links */}
                <nav className="flex-1 px-3 mt-2 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.key}
                            to={`/clinic/${item.key}`}
                            className={({ isActive }) => `
                                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                                ${isActive
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon active={isActive} />
                                    {item.label}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div id="sidebar-bottom-portal" className="px-3 mt-4 mb-2">
                </div>

                {/* Bottom actions */}
                <div className="px-3 pb-6 space-y-1 border-t border-gray-100 pt-4 mt-auto">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                        <SupportIcon />
                        Support
                    </button>
                    <Form method="post" action="/logout">
                        <button
                            type="submit"
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                        >
                            <LogoutIcon />
                            Logout
                        </button>
                    </Form>
                </div>
            </aside>

            {/* ─── Main content ─── */}
            <main className="flex-1 overflow-y-auto flex flex-col relative">
                {children}
            </main>
        </div>
    );
}


/* ──────────────────────────────────────
   Inline SVG icon components
   ────────────────────────────────────── */

function ClinicBrandIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
            <path d="M12 14v-4M10 12h4"/>
        </svg>
    );
}

function DashboardIcon({ active }) {
    const color = active ? "currentColor" : "#6B7280";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
    );
}

function DoctorsIcon({ active }) {
    const color = active ? "currentColor" : "#6B7280";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    );
}

function AppointmentsIcon({ active }) {
    const color = active ? "currentColor" : "#6B7280";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
    );
}

function SettingsIcon({ active }) {
    const color = active ? "currentColor" : "#6B7280";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
    );
}

function SupportIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
    );
}

function LogoutIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
    );
}
