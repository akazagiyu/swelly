// Static JSON-backed commands list
import { getAllCommands } from "@/lib/commands";
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

type Props = { params: { name: string } };

export async function generateStaticParams() {
  return getAllCommands().map((c) => ({ name: c.name }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cmd = getAllCommands().find((c) => c.name === params.name);
  const title = cmd ? `/${cmd.name} — ${cmd.category} command` : "Command";
  const description = cmd?.description || "Command details";
  return { title, description };
}

export default function CommandDetailPage({ params }: Props) {
  const cmd = getAllCommands().find((c) => c.name === params.name);
  if (!cmd) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-bold mb-4">Command not found</h1>
        <Link href="/commands" className="btn btn-outline">Back to Commands</Link>
      </div>
    );
  }
  return (
    <>
  <PageHeader title={cmd.name} subtitle={cmd.description} backHref="/commands" />
      <div className="container py-10 grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="card">
          <h2 className="font-semibold mb-2">Usage</h2>
          <pre className="bg-[#0f0f0f] rounded p-3 text-sm overflow-auto">{cmd.usage ?? `/${cmd.name}`}</pre>
          <h2 className="font-semibold mt-6 mb-2">Examples</h2>
          <ul className="text-sm text-white/80 space-y-2">
            <li>• /{cmd.name}</li>
            {cmd.usage && <li>• {cmd.usage}</li>}
          </ul>
        </div>
        <aside className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-2">More commands</h3>
            <div className="flex flex-wrap gap-2">
              {getAllCommands().slice(0, 8).map((c) => (
                <Link key={c.name} href={`/commands/${c.name}`} className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20">
                  /{c.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/invite" className="btn btn-primary w-full">Invite Swelly</Link>
        </aside>
      </div>
    </>
  );
}
