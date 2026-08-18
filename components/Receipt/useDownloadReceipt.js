"use client";
import { useCallback } from "react";

export default function useDownloadReceipt() {
    return useCallback((receiptData) => {
        if (typeof window === "undefined") return;

        const printWindow = window.open("", "_blank", "width=400,height=600");
        if (!printWindow) return;

        const { restaurant, invoiceNo, date, items, tax, discount, total } = receiptData;

        const itemsHTML = items
            .map(
                (it) =>
                    `<div style="margin:4px 0;">
                        <div style="font-weight:700;color:#000;">${it.name}</div>
                        <div style="display:flex;justify-content:space-between;font-weight:700;color:#000;">
                            <span>${it.qty}x ${it.price}</span>
                            <span>${it.qty * it.price}/-</span>
                        </div>
                    </div>`
            )
            .join("");

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Invoice</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: ui-monospace, "Courier New", monospace;
                        font-size: 12px;
                        color: #000;
                        background: #fff;
                        width: 80mm;
                        margin: 0 auto;
                    }
                    .receipt { margin: 0 auto; padding: 2px 4px 8px; }
                    .receipt-header { text-align: center; }
                    .receipt-header img {
                        display: block; margin: 0 auto 6px;
                        width: 60px; height: 60px; object-fit: cover; border-radius: 50%;
                    }
                    .receipt-header h1 { font-size: 22px; font-weight: 700; text-transform: uppercase; margin: 0; }
                    .receipt-info { display: flex; align-items: center; justify-content: center; gap: 4px; font-weight: 700; font-size: 11px; }
                    .dashed { border-top: 1px dashed #000; margin: 6px 0; }
                    .solid { border-top: 1px solid #000; margin: 6px 0; }
                    .receipt-meta { display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; }
                    .receipt-row { display: flex; justify-content: space-between; margin: 2px 0; font-weight: 700; }
                    .receipt-row.total { font-size: 16px; font-weight: 900; }
                    .center { text-align: center; }
                    .thank-you { font-size: 22px; font-weight: 800; letter-spacing: 1px; margin: 8px 0; }
                    .muted { font-size: 11px; font-weight: 700; }
                    .footer { display: flex; align-items: center; justify-content: center; gap: 2px; font-size: 11px; }
                    .footer-line { display: inline-block; width: 20px; border-top: 1px solid #888; }
                    @media print {
                        @page { size: 80mm auto; margin: 2mm; }
                    }
                </style>
            </head>
            <body>
                <div class="receipt">
                    <div class="receipt-header">
                        ${restaurant.logo ? `<img src="${restaurant.logo}" alt="${restaurant.name}" />` : ""}
                        <h1>${restaurant.name}</h1>
                        <p class="receipt-info"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span>${restaurant.address}</span></p>
                        <p class="receipt-info"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>${restaurant.phone}</span></p>
                    </div>
                    <div class="dashed"></div>
                    <div style="font-weight:700;font-size:11px;color:#000;">
                        <div>Date: ${date}</div>
                        <div>Invoice: ${invoiceNo}</div>
                    </div>
                    <div class="dashed"></div>
                    <div>${itemsHTML}</div>
                    <div style="margin-top:16px;">
                        <div class="receipt-row"><span>Tax (15%)</span><span>${tax}/-</span></div>
                        <div class="receipt-row"><span>Discount</span><span>-${discount}/-</span></div>
                    </div>
                    <div class="solid"></div>
                    <div class="receipt-row total"><span>Total</span><span>${total}/=</span></div>
                    <div class="center thank-you" style="margin-top:16px;">THANK YOU</div>
                    <div class="center muted">we look forward to serving you again!</div>
                    <div class="center footer" style="margin-top:8px;">
                        <span class="footer-line"></span>
                        <span>powered by CloudCafe</span>
                        <span class="footer-line"></span>
                    </div>
                </div>
            </body>
            </html>
        `);

        printWindow.document.close();

        const images = printWindow.document.querySelectorAll("img");
        if (images.length > 0) {
            let loaded = 0;
            const onDone = () => {
                loaded++;
                if (loaded >= images.length) {
                    printWindow.print();
                    printWindow.close();
                }
            };
            images.forEach((img) => {
                if (img.complete) onDone();
                else {
                    img.onload = onDone;
                    img.onerror = onDone;
                }
            });
        } else {
            printWindow.print();
            printWindow.close();
        }
    }, []);
}
