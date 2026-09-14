"use client";

export const STATUS_FLOW = [
  { key: "cooking", label: "Cooking", bar: "bg-amber-500" },
  { key: "ready", label: "Ready", bar: "bg-blue-500" },
  { key: "served", label: "Served", bar: "bg-green-500" },
];

export const STATUS_BADGE = {
  cooking: "bg-amber-50 text-amber-700 border-amber-200",
  ready: "bg-blue-50 text-blue-700 border-blue-200",
  served: "bg-green-50 text-green-700 border-green-200",
};

const StatusProgress = ({ tokens = [], onView, className = "" }) => {
  const total = tokens.length || 0;
  const counts = STATUS_FLOW.map((status) => ({
    ...status,
    count: tokens.filter((t) => t.status === status.key).length,
  }));

  return (
    <div
      onClick={onView}
      className={`w-full ${onView ? "cursor-pointer" : ""} ${className}`}
    >
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
        {counts.map((status) =>
          status.count > 0 ? (
            <div
              key={status.key}
              className={`h-full ${status.bar} transition-all`}
              style={{ width: `${(status.count / total) * 100}%` }}
            />
          ) : null
        )}
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-3">
        {counts.map((status) => (
          <span
            key={status.key}
            className="flex items-center gap-1 text-[11px] text-gray-500"
          >
            <span className={`h-2 w-2 rounded-full ${status.bar}`} />
            {status.label} {status.count}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StatusProgress;
