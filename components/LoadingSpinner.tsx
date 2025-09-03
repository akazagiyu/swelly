import Image from "next/image";

export default function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <div role="status" aria-live="polite" className="flex items-center justify-center">
      <Image src="/loading.svg" alt="Loading" width={size} height={size} className="animate-spin" />
    </div>
  );
}
