"use client";
export default function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="">
        <div className="h-20 mb-4 rounded-md skeleton" />
        <div className="h-4 w-3/4 mb-2 rounded skeleton" />
        <div className="h-3 w-1/2 rounded skeleton" />
      </div>
    </div>
  );
}
