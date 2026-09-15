import { useState } from "react";
import { useNavigate } from "react-router";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";

import { changeAdminPassword } from "../../api/authApi";
import { getAuth, saveAuth } from "../../auth/authStorage";

export default function AdminChangePassword() {
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (newPassword.length < 8 || newPassword.length > 12) {
            setError("Password must be between 8 and 12 characters.");
            return;
        }

        if (!/[0-9]/.test(newPassword)) {
            setError("Password must contain at least one number.");
            return;
        }

        if (!/[^a-zA-Z0-9]/.test(newPassword)) {
            setError(
                "Password must contain at least one special character."
            );
            return;
        }

        const auth = getAuth();

        if (!auth?.token) {
            navigate("/login", { replace: true });
            return;
        }

        try {
            setIsSubmitting(true);

            await changeAdminPassword({
                newPassword,
                confirmPassword,
                token: auth.token,
            });

            // The backend has now activated the account.
            saveAuth({
                ...auth,
                isActive: true,
            });

            setSuccess(
                "Password changed successfully. Redirecting..."
            );

            setTimeout(() => {
                navigate("/admin", { replace: true });
            }, 1000);
        } catch (error) {
            setError(
                error.message || "Failed to change password."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex min-h-screen w-full bg-slate-50 items-center justify-center px-6 py-10">
            <div className="w-full max-w-md">

                {/* Logo / Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        <img
                            src="/logo.png"
                            alt="DrSnna"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Change your password
                    </h1>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        For security reasons, you must change your
                        temporary password before continuing.
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

                    {error && (
                        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                            {success}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* New password */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="newPassword"
                                className="block text-xs font-semibold text-slate-700"
                            >
                                New password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="newPassword"
                                    type={
                                        showNewPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter your new password"
                                    required
                                    minLength={8}
                                    maxLength={12}
                                    className="w-full rounded-lg border-0 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNewPassword(
                                            !showNewPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showNewPassword ? (
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm password */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-xs font-semibold text-slate-700"
                            >
                                Confirm new password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Confirm your new password"
                                    required
                                    minLength={8}
                                    maxLength={12}
                                    className="w-full rounded-lg border-0 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Password requirements */}
                        <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                            <p className="mb-1 font-semibold text-slate-700">
                                Password requirements:
                            </p>

                            <ul className="list-disc space-y-1 pl-4">
                                <li>8–12 characters</li>
                                <li>At least one number</li>
                                <li>At least one special character</li>
                            </ul>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-500 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <LockKeyhole size={17} />

                            {isSubmitting
                                ? "Changing password..."
                                : "Change password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}