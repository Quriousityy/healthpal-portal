
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-sage-100 text-sage-800",
      expired: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-sage-100 text-sage-800",
      rejected: "bg-red-100 text-red-800",
      processing: "bg-blue-100 text-blue-800",
    };
    return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <span
      className={cn(
        "px-3 py-1 inline-flex items-center rounded-full text-xs font-medium",
        getStatusColor(status),
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
