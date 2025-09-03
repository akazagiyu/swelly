import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import GuildSettingsClient from "@/components/dashboard/GuildSettingsClient";

export const metadata = { title: "Server Settings" };

export default function GuildSettingsPage({ params }: { params: { guildId: string } }) {
  const { guildId } = params;
  return (
    <>
      <PageHeader
        title="Server Settings"
        subtitle={`Configure preferences for guild ${guildId}.`}
        right={<span className="text-xs bg-white/10 px-2 py-1 rounded">ID: {guildId}</span>}
      />
      <div className="container py-10">
        <GuildSettingsClient guildId={guildId} />
        <div className="card mt-6">
          <h3 className="font-semibold">Back</h3>
          <p className="text-white/60 text-sm mb-2">Return to your servers list.</p>
          <Link href="/servers" className="btn btn-outline">My Servers</Link>
        </div>
      </div>
    </>
  );
}
