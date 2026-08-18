"use client";
import { useCallback } from "react";

export default function useDownloadReceipt() {
    return useCallback(() => {
        if (typeof window === "undefined") return;
        const prevTitle = document.title;
        document.title = "Invoice";
        window.print();
        document.title = prevTitle;
    }, []);
}
