import { useState } from "react";
import { Form, useActionData, Link } from "react-router";

export default function Register() {
    const [mode, setMode] = useState("PATIENT");

    const actionData = useActionData();

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

                <Link
                    to="/"
                    className="relative z-10 flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity w-fit"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-md overflow-hidden">
                        <img src="logo.png" alt="logo" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">DrSnna</span>
                </Link>

                {/* Hero Text */}
                <div className="relative z-10 max-w-md space-y-4">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
                        Join a growing networkof patients and clinics. <br />

                    </h1>
                    <p className="text-sm text-blue-100 leading-relaxed">
                        Whether you're booking your next cleaning or listing your practice, getting started only takes a minute.
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

            {/* القسم الأيمن: التسجيل (7/12) */}
            <div className="flex w-full lg:w-7/12 items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-6">

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Register</h1>
                    </div>

                    {/* أزرار التبديل Patient / clinic */}
                    <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold text-slate-600">
                        <button
                            type="button"
                            onClick={() => setMode("PATIENT")}
                            className={`flex-1 rounded-md py-2.5 text-center transition-all cursor-pointer ${
                                mode === "PATIENT"
                                    ? "bg-white text-slate-900 shadow-sm font-semibold"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                            }`}
                        >
                            Patient
                        </button>

                        <button
                            type="button"
                            onClick={() => setMode("CLINIC")}
                            className={`flex-1 rounded-md py-2.5 text-center transition-all cursor-pointer ${
                                mode === "CLINIC"
                                    ? "bg-white text-slate-900 shadow-sm font-semibold"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                            }`}
                        >
                            Clinic
                        </button>
                    </div>

                    {/* عرض الأخطاء إن وجدت */}
                    {actionData?.error && (
                        <p className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
                            {actionData.error}
                        </p>
                    )}

                    <Form method="post" className="space-y-4">
                        <input
                            type="hidden"
                            name="mode"
                            value={mode}
                        />

                        {mode === "PATIENT" && (
                            <>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">
                                        Full name
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Ibraheem Hamzah"
                                        required
                                        className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                    />
                                </div>
                            </>
                        )}

                        {mode === "CLINIC" && (
                            <>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">
                                        Clinic name
                                    </label>

                                    <input
                                        type="text"
                                        name="clinicName"
                                        placeholder="Bright Smiles Dental Clinic"
                                        required
                                        className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">
                                        Clinic license number
                                    </label>

                                    <input
                                        type="text"
                                        name="clinicLicenseNumber"
                                        placeholder="CLN-2026-00451"
                                        required
                                        className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                    />
                                </div>
                            </>
                        )}

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">
                                City
                            </label>

                            <select
                                name="city"
                                defaultValue=""
                                required
                                className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer"
                            >
                                <option value="" disabled>
                                    Select your city
                                </option>

                                <option value="AMMAN">Amman</option>
                                <option value="IRBID">Irbid</option>
                                <option value="ZARQA">Zarqa</option>
                                <option value="Balqa">Balqa</option>
                                <option value="Mafraq">Mafraq</option>
                                <option value="Karak">Karak</option>
                                <option value="Madaba">Madaba</option>
                                <option value="Maan">Maan</option>
                                <option value="Tafelah">Tafelah</option>
                                <option value="Jerash">Jerash</option>
                                <option value="Ajloun">Ajloun</option>
                                <option value="AQABA">AQABA</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                required
                                minLength={8}
                                maxLength={12}
                                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,12}$"
                                className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                            />
                        </div>
                        <div>
                            <p style={{ color: '#4a5568', fontSize: '14px' }}>
                                <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                                It must contain at least one uppercase letter, in addition to symbols and numbers.
                            </p>                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">
                                Confirm password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter your password"
                                required
                                minLength={8}
                                maxLength={12}
                                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,12}$"
                                className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 active:bg-blue-700 cursor-pointer transition-all mt-2"
                        >
                            Register
                        </button>
                    </Form>

                    {/* الخط الفاصل ورابط تسجيل الدخول */}
                    <div className="relative flex items-center justify-center border-t border-slate-200 pt-4">
                        <span className="bg-white px-2 text-xs text-slate-400">or</span>
                    </div>

                    <div className="text-center text-xs text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}