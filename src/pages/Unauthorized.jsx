import { Link, useNavigate } from "react-router"; // استخدم "react-router-dom" إذا كنت تستخدم النسخة الشائعة

export default function Unauthorized({ onGoBack }) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onGoBack) {
            onGoBack();
        } else {
            navigate('/'); // التوجيه المباشر لصفحة الـ Landing
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white font-sans">
            {/* Left side: Brand Banner */}
            <div
                className="relative hidden w-5/12 flex-col justify-between overflow-hidden p-12 text-white lg:flex bg-cover bg-center"
                style={{ backgroundImage: "url('/bg.png')" }}
            >
                {/* Overlay لدمج اللون الأزرق مع الصورة وجعل النص واضح */}
                <div className="absolute inset-0 bg-blue-500/70 backdrop-blur-[2px]" />

                {/* Visual Elements */}
                <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-xl pointer-events-none" />

                {/* Logo */}
                <Link
                    to="/"
                    className="relative z-10 flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity w-fit"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-md overflow-hidden">
                        <img src="/logo.png" alt="logo" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">DrSna</span>
                </Link>

                {/* Hero Text */}
                <div className="relative z-10 max-w-md space-y-4">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
                        Book your dental visit <br />
                        in just a few clicks.
                    </h1>
                    <p className="text-sm text-blue-100 leading-relaxed">
                        DrSna connects you with trusted dental clinics in your area — pick a time, confirm, and you're set.
                    </p>

                    <div className="mt-8 flex h-24 w-44 flex-col justify-between rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/20 shadow-inner">
                        <div className="h-2 w-16 rounded bg-white/40" />
                        <div className="flex items-center justify-between">
                            <div className="h-2 w-20 rounded bg-white/30" />
                            <div className="h-7 w-7 rounded-full bg-white/20" />
                        </div>
                    </div>
                </div>

                {/* Footer النص السفلي */}
                <div className="relative z-10 text-xs text-blue-100/80">
                    © DrSna — appointments made simple
                </div>
            </div>

            {/* Right side: Unauthorized Message */}
            <div className="flex flex-1 items-center justify-center bg-white p-8">
                <div className="flex w-full max-w-[460px] flex-col items-center text-center">

                    <div className="mb-4 flex h-[68px] w-[68px] items-center justify-center rounded-[18px] bg-rose-100">
                        <svg className="h-[34px] w-[34px] stroke-rose-600" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>

                    <h2 className="mb-4 text-2xl font-bold text-slate-900">
                        You don't have permission to access this page.
                    </h2>

                    <div className="mb-7 w-full rounded-[14px] border border-amber-200 bg-amber-50 p-4 text-left">
                        <p className="mb-1.5 text-[15px] font-bold text-amber-900">
                            You are currently viewing a page that does not belong to you
                        </p>
                        <p className="text-xs leading-relaxed text-amber-800">
                            You attempted to access another user's private data or records. You do not have sufficient permissions to view this resource on the DrSna platform.
                        </p>
                    </div>

                    {/* Centered Back Button */}
                    <button
                        onClick={handleBack}
                        className="w-[260px] cursor-pointer rounded-xl bg-[#207ecb] px-7 py-3.5 text-base font-semibold text-white shadow-md shadow-[#207ecb]/30 transition hover:bg-[#1b76be] active:scale-[0.98]"
                    >
                        Go Back
                    </button>

                </div>
            </div>
        </div>
    );
}