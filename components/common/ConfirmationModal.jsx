'use client';

import { useEffect } from 'react';

const ConfirmationModal = ({
    isOpen,
    onClose,
    title,
    description,
    firstButtonText = 'Confirm',
    secondButtonText = 'Cancel',
    firstButtonAction,
    secondButtonAction,
    firstButtonVariant = 'primary',
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const variantClasses = {
        primary: 'bg-[#0A4D99] hover:bg-[#043570] text-white',
        danger: 'bg-[#EF4444] hover:bg-[#DC2626] text-white',
    };

    return (
        <div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="font-['DM_Sans',sans-serif] text-lg font-semibold text-[#043570]">
                    {title}
                </h3>
                {description && (
                    <p className="mt-2 font-['DM_Sans',sans-serif] text-sm text-[#595959]">
                        {description}
                    </p>
                )}
                <div className="mt-6 flex items-center justify-end gap-5">
                    <button
                        onClick={secondButtonAction || onClose}
                        className="rounded border border-gray-300 px-3 py-1.5 font-['DM_Sans',sans-serif] text-sm text-[#595959] transition-colors hover:bg-gray-100 hover:cursor-pointer"
                    >
                        {secondButtonText}
                    </button>
                    <button
                        onClick={firstButtonAction}
                        className={`rounded px-4 py-1.5 font-['DM_Sans',sans-serif] hover:cursor-pointer text-sm font-medium transition-colors ${variantClasses[firstButtonVariant]}`}
                    >
                        {firstButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
