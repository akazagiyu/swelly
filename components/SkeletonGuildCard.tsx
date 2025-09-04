"use client";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SkeletonGuildCard() {
  return (
    <div className="card flex items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className="h-12 w-12 rounded-md bg-white/6 animate-pulse" />
        <div className="min-w-0">
          <div className="h-4 w-36 rounded bg-white/6 animate-pulse mb-2" />
          <div className="h-3 w-28 rounded bg-white/6 animate-pulse" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-10 w-28 rounded-md skeleton flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      </div>
    </div>
  );
}
