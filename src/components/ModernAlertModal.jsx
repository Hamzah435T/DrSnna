import React, { useEffect } from "react";

/**
 * ModernAlertModal - A sleek, accessible replacement for native browser alerts.
 *
 * @param {boolean} isOpen - Whether the alert is visible
 * @param {string} title - Optional title (defaults based on type)
 * @param {string} message - The main alert text
 * @param {'error' | 'warning' | 'info' | 'success'} type - Visual styling type
 * @param {string} buttonText - Text for the confirm button
 * @param {() => void} onClose - Callback when dismissed
 */
export default function ModernAlertModal({
    isOpen,
    title,
    message,
    type = "warning",
    buttonText = "Understood",
    showCancel = false,
    cancelText = "Cancel",
    confirmText,
    onConfirm,
    onClose
}) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "Enter" && showCancel && onConfirm) {
                onConfirm();
            } else if (e.key === "Enter" && !showCancel) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, showCancel, onConfirm]);

    if (!isOpen) return null;

    const defaultTitles = {
        error: "Action Failed",
        warning: "Warning",
        info: "Notice",
        success: "Success",
        danger: "Confirm Deletion"
    };

    const displayTitle = title || defaultTitles[type] || "Notice";

    const typeConfigs = {
        warning: {
            bgIcon: "bg-amber-50 text-amber-600 border-amber-200 ring-amber-100/60",
            buttonClass: "bg-[#0f3460] hover:bg-[#1a4a85] text-white shadow-[#0f3460]/20",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            )
        },
        danger: {
            bgIcon: "bg-rose-50 text-rose-600 border-rose-200 ring-rose-100/60",
            buttonClass: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
            )
        },
        error: {
            bgIcon: "bg-rose-50 text-rose-600 border-rose-200 ring-rose-100/60",
            buttonClass: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
            )
        },
        info: {
            bgIcon: "bg-blue-50 text-blue-600 border-blue-200 ring-blue-100/60",
            buttonClass: "bg-blue-900 hover:bg-blue-800 text-white shadow-blue-900/20",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
            )
        },
        success: {
            bgIcon: "bg-emerald-50 text-emerald-600 border-emerald-200 ring-emerald-100/60",
            buttonClass: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            )
        }
    };

    const config = typeConfigs[type] || typeConfigs.warning;
    const finalConfirmText = confirmText || buttonText;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[3px] animate-[fadeIn_0.15s_ease-out]"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-[420px] rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col items-center text-center animate-[scaleIn_0.2s_ease-out] relative"
            >
                {/* Close 'x' button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Status Icon with soft glow ring */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ring-4 mb-4 transition-transform hover:scale-105 duration-200 ${config.bgIcon}`}>
                    {config.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                    {displayTitle}
                </h3>

                {/* Message Body */}
                <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-[340px]">
                    {message}
                </p>

                {/* Action buttons */}
                <div className="w-full mt-6 flex gap-3">
                    {showCancel && (
                        <button
                            onClick={onClose}
                            className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all active:scale-[0.98] cursor-pointer"
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        onClick={onConfirm || onClose}
                        autoFocus
                        className={`flex-1 py-2.5 px-5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md active:scale-[0.98] cursor-pointer ${config.buttonClass}`}
                    >
                        {finalConfirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
