"use client";
import { useSession } from "next-auth/react";
import LoginInline from "@/components/auth/LoginInline";

export default function DashboardPage() {
  const { status } = useSession();
  if (status === "loading") return <div className="container py-12">Loading…</div>;
  if (status !== "authenticated")
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-white/70 mb-6">Login with Discord to manage your servers.</p>
        <LoginInline />
      </div>
    );

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card">
          <div className="font-semibold mb-2">Prefix</div>
          <div className="flex gap-2"><input className="bg-[#0f0f0f] border border-white/10 rounded px-2 py-1" defaultValue="/" /><button className="btn btn-primary">Save</button></div>
        </div>
        <div className="card">
          <div className="font-semibold mb-2">DJ Role</div>
          <div className="flex gap-2"><input className="bg-[#0f0f0f] border border-white/10 rounded px-2 py-1" placeholder="@DJ" /><button className="btn btn-primary">Save</button></div>
        </div>
        <div className="card">
          <div className="font-semibold mb-2">Autoplay</div>
          <button className="btn btn-outline">Toggle</button>
        </div>
        <div className="card">
          <div className="font-semibold mb-2">Volume</div>
          <input type="range" defaultValue={80} />
        </div>
      </div>
    </div>
  );
}
