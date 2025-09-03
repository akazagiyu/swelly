"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import LoginInline from "@/components/auth/LoginInline";

export default function ProfilePage() {
  const { status, data } = useSession();
  if (status === "loading") return <div className="container py-12">Loading…</div>;
  if (status !== "authenticated") return (
    <div className="container py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="text-white/70 mb-6">Login with Discord to view your profile.</p>
      <LoginInline />
    </div>
  );
  const user = data.user!;
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="card flex items-center gap-4">
        {user.image && <Image src={user.image} width={64} height={64} alt={user.name ?? "User"} className="rounded-full" />}
        <div>
          <div className="font-semibold">{user.name}</div>
          <div className="text-white/60 text-sm">ID: {user.id ?? "N/A"}</div>
        </div>
      </div>
    </div>
  );
}
