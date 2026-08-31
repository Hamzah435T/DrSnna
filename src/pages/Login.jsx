import { Form, useActionData, useNavigation, useSearchParams, Link } from "react-router";

export default function Login() {
    const actionData = useActionData();
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();

    const registered = searchParams.get("registered");

    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="flex min-h-screen w-full bg-white font-sans text-slate-800">
            {/* القسم الأيسر: الهوية البصرية (5/12) */}
            <div className="relative hidden w-5/12 flex-col justify-between overflow-hidden p-12 text-white lg:flex bg-cover bg-center"
                style={{ backgroundImage: "url('/bg.png')" }}>

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
                    <span className="text-xl font-bold tracking-tight">DrSnna</span>
                </Link>

                {/* Hero Text */}
                <div className="relative z-10 max-w-md space-y-4">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
                        Book your dental visit <br />
                        in just a few clicks.
                    </h1>
                    <p className="text-sm text-blue-100 leading-relaxed">
                        SmileDesk connects you with trusted dental clinics in your area — pick a time, confirm, and you're set.
                    </p>

                    <div className="mt-8 flex h-24 w-44 flex-col justify-between rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/20 shadow-inner">
                        <div className="h-2 w-16 rounded bg-white/40" />
                        <div className="flex items-center justify-between">
                            <div className="h-2 w-20 rounded bg-white/30" />
                            <div className="h-7 w-7 rounded-full bg-white/20" />
                        </div>
                    </div>
                </div>

                {/* Footer النص السفلي الظاهر بالصورة */}
                <div className="relative z-10 text-xs text-blue-100/80">
                    © SmileDesk — appointments made simple
                </div>
            </div>

            {/* القسم الأيمن: تسجيل الدخول (7/12) */}
            <div className="flex w-full lg:w-7/12 items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Login</h1>
                    </div>

                    {registered === "true" && (
                        <p className="rounded-lg bg-emerald-50 p-3 text-xs text-emerald-700 border border-emerald-200">
                            Your account was created successfully, but we
                            couldn't log you in automatically. Please log in
                            manually.
                        </p>
                    )}

                    <Form method="post" className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">Email</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">Password</label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                minLength={8}
                                maxLength={20}
                                className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                            />
                        </div>

                        {actionData?.error && (
                            <p className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
                                {actionData.error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 cursor-pointer transition-all mt-2"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </Form>

                    {/* الخط الفاصل ورابط إنشاء الحساب */}
                    <div className="relative flex items-center justify-center border-t border-slate-200 pt-4">
                        <span className="bg-white px-2 text-xs text-slate-400">or</span>
                    </div>

                    <div className="text-center text-xs text-slate-500">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer">
                            Create one
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}