import { MapPin, Phone } from "lucide-react";
import { dummyReceipt } from "./ReceiptData";
import { PAPER_WIDTH } from "./receiptConfig";

export default function ReceiptView({
    data = dummyReceipt,
    paperWidth = PAPER_WIDTH,
}) {
    const { restaurant, invoiceNo, date, items, tax, discount, total } = data;

    const paperStyle = `
        .receipt { width: ${paperWidth}; }
        @page { size: ${paperWidth} auto; }
    `;

    return (
        <>
            <style>{paperStyle}</style>
            <div className="receipt">
            <div className="receipt-header">
                {restaurant.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={restaurant.logo}
                        alt={restaurant.name}
                        className="receipt-logo-circle"
                    />
                ) : null}
                <h1>{restaurant.name}</h1>
                {restaurant.address && (
                    <p className="receipt-info">
                        <MapPin size={12} className="receipt-info-icon" />
                        <span>{restaurant.address}</span>
                    </p>
                )}
                {restaurant.phone && (
                    <p className="receipt-info">
                        <Phone size={12} className="receipt-info-icon" />
                        <span>{restaurant.phone}</span>
                    </p>
                )}
            </div>

            <div className="dashed" />

            <div className="receipt-meta">
                <span>Invoice: {invoiceNo}</span>
                <span>Date: {date}</span>
            </div>

            <div className="dashed" />

            <div className="receipt-items">
                {items.map((it, i) => (
                    <div className="receipt-row" key={i}>
                        <span>
                            {it.qty}x {it.name}
                        </span>
                        <span>{it.qty * it.price}/-</span>
                    </div>
                ))}
            </div>

            <div className="receipt-totals mt-5">
                <div className="receipt-row">
                    <span>Tax (10%)</span>
                    <span>{tax}/-</span>
                </div>
                <div className="receipt-row">
                    <span>Discount</span>
                    <span>-{discount}/-</span>
                </div>
            </div>

            <div className="solid" />

            <div className="receipt-row total">
                <span>Total</span>
                <span className="font-bold">{total}/=</span>
            </div>

            <div className="center thank-you mt-5">THANK YOU</div>

            <div className="center muted">we look forward to serving you again!</div>

            <div className="center footer">
                <span className="footer-line" />
                <span>powered by CloudCafe</span>
                <span className="footer-line" />
            </div>
            </div>
        </>
    );
}
