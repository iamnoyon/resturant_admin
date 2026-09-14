"use client";

import CardLayout from "@/components/common/CardLayout";
import { useEffect, useState } from "react";
import { ClipboardList, Printer, X } from "lucide-react";
import { useSelector } from "react-redux";
import {
  useLazyGetOrderTokenListQuery,
  useUpdateTokenStatusMutation,
} from "@/store/admin/order";
import StatusProgress, {
  STATUS_BADGE,
  STATUS_FLOW,
} from "@/components/common/StatusProgress";
import useToaster from "@/components/hooks/useToaster";

const getNextStatus = (status) => {
  const index = STATUS_FLOW.findIndex((s) => s.key === status);
  if (index === -1 || index === STATUS_FLOW.length - 1) return null;
  return STATUS_FLOW[index + 1].key;
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const buildTicketsHtml = (orders, businessName) =>
  orders
    .map((order) => {
      const tokens = order.tokens || [];
      const rows = tokens
        .map(
          (token) => `
            <tr>
              <td class="qty">${escapeHtml(token.quantity)}x</td>
              <td class="name">${escapeHtml(token.productName)}</td>
              <td class="status">${escapeHtml(
                STATUS_FLOW.find((s) => s.key === token.status)?.label ||
                  token.status
              )}</td>
            </tr>`
        )
        .join("");

      return `
        <div class="ticket">
          <div class="center">
            <h1>${escapeHtml(businessName || "CloudCafe")}</h1>
            <p class="muted">Kitchen Token</p>
            <p class="token-no">#${
              escapeHtml(order.orderId ? order.orderId.split("-").pop() : "") || "—"
            }</p>
          </div>
          <div class="meta">
            <div><span>Order</span><strong>${escapeHtml(
              order.orderId || "—"
            )}</strong></div>
            <div><span>Table</span><strong>${escapeHtml(
              order.tableName || "—"
            )}</strong></div>
            <div><span>Date</span><strong>${escapeHtml(
              new Date().toLocaleString()
            )}</strong></div>
          </div>
          <table>
            <thead>
              <tr><th>Qty</th><th>Item</th><th>Status</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <p class="muted center footer">Total Items: ${escapeHtml(
            order.totalItems ?? tokens.length
          )}</p>
        </div>`;
    })
    .join('<div class="page-break"></div>');

const printHtml = (bodyHtml) => {
  const win = window.open("", "_blank", "width=400,height=640");
  if (!win) return;
  win.document.write(`<!DOCTYPE html>
    <html>
      <head>
        <title>Token Print</title>
        <style>
          * { box-sizing: border-box; }
          body { font-family: Arial, sans-serif; margin: 0; padding: 12px; color: #111; }
          .ticket { width: 100%; max-width: 320px; margin: 0 auto; }
          .center { text-align: center; }
          h1 { font-size: 18px; margin: 0; }
          .token-no { font-size: 24px; font-weight: bold; margin: 4px 0 0; }
          .muted { color: #666; font-size: 12px; margin: 2px 0; }
          .meta { margin: 10px 0; border-top: 1px dashed #999; border-bottom: 1px dashed #999; padding: 8px 0; font-size: 12px; }
          .meta div { display: flex; justify-content: space-between; margin: 2px 0; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; }
          th, td { text-align: left; padding: 4px 2px; border-bottom: 1px dotted #ccc; }
          .qty { width: 34px; }
          .status { width: 64px; text-align: right; text-transform: capitalize; }
          .footer { margin-top: 10px; }
          .page-break { page-break-after: always; }
        </style>
      </head>
      <body>${bodyHtml}</body>
    </html>`);
  win.document.close();
  win.focus();
  win.print();
};

const TokenPrint = () => {
  const business = useSelector((state) => state?.user?.business);
  const businessId = business?.id;
  const businessName = business?.businessName;

  const [triggerList, { data: orderList, isLoading }] =
    useLazyGetOrderTokenListQuery();
  const [updateTokenStatus, { isLoading: updatingStatus }] =
    useUpdateTokenStatusMutation();
  const { successToaster, errorToaster } = useToaster();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusClick = async (token) => {
    const nextStatus = getNextStatus(token.status);
    if (!nextStatus) return;
    try {
      const res = await updateTokenStatus({
        id: token.id,
        status: nextStatus,
      }).unwrap();
      successToaster(res?.message || "Token status updated");
      setSelectedOrder((prev) =>
        prev
          ? {
              ...prev,
              tokens: (prev.tokens || []).map((t) =>
                t.id === token.id ? { ...t, status: nextStatus } : t
              ),
            }
          : prev
      );
    } catch (err) {
      errorToaster(err?.data?.message || "Failed to update token status");
    }
  };

  useEffect(() => {
    if (!businessId) return;
    triggerList({ page: 1, limit: 100, businessId });
  }, [businessId, triggerList]);

  const orders = orderList?.dataSource || [];

  return (
    <div>
      <CardLayout title="Token Print" titleIcon={ClipboardList}>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 rounded-xl border border-gray-100 bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <ClipboardList size={40} className="mb-2" />
            <p className="text-sm">No tokens found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {orders.map((order, index) => {
              const tokens = order.tokens || [];
              const tokenNumber = order.orderId
                ? order.orderId.split("-").pop()
                : "";
              return (
                <div
                  key={order.orderId ?? index}
                  onClick={() => setSelectedOrder(order)}
                  className="flex cursor-pointer flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        Token No.
                      </p>
                      <p className="text-2xl font-bold leading-tight text-[#043570]">
                        {tokenNumber ? `#${tokenNumber}` : "—"}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        printHtml(buildTicketsHtml([order], businessName));
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#0A4D99] px-3 py-1.5 text-xs font-medium text-[#0A4D99] transition-colors hover:bg-[#0A4D99] hover:text-white cursor-pointer"
                    >
                      <Printer size={14} />
                      Print
                    </button>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
                    <span>{order.orderId || "—"}</span>
                    {order.tableName && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span>{order.tableName}</span>
                      </>
                    )}
                    <span className="text-gray-300">•</span>
                    <span>{order.totalQuantity ?? tokens.length} items</span>
                  </div>

                  <div className="mt-4">
                    <StatusProgress tokens={tokens} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardLayout>

      {selectedOrder && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="w-full max-w-md rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h3 className="font-['DM_Sans',sans-serif] text-lg font-semibold text-[#043570]">
                  Order Tokens
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  {selectedOrder.orderId || "—"}
                  {selectedOrder.tableName
                    ? ` • ${selectedOrder.tableName}`
                    : ""}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-5 py-3">
              {(selectedOrder.tokens || []).length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">
                  No tokens found
                </p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {selectedOrder.tokens.map((token) => {
                    const nextStatus = getNextStatus(token.status);
                    return (
                      <li
                        key={token.id}
                        className="flex items-center justify-between gap-3 py-2.5"
                      >
                        <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                          {token.productName}
                          <span className="ml-1 text-xs text-gray-400">
                            ×{token.quantity}
                          </span>
                        </span>
                        <button
                          type="button"
                          disabled={!nextStatus || updatingStatus}
                          onClick={() => handleStatusClick(token)}
                          title={
                            nextStatus
                              ? `Mark as ${nextStatus}`
                              : "Already served"
                          }
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize transition-colors ${
                            STATUS_BADGE[token.status] ||
                            "bg-gray-50 text-gray-600 border-gray-200"
                          } ${
                            nextStatus
                              ? "cursor-pointer hover:opacity-80"
                              : "cursor-not-allowed opacity-70"
                          }`}
                        >
                          {token.status}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenPrint;
