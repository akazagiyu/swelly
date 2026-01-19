// Static JSON-backed commands list
import { getAllCommands } from "@/lib/commands";
import CopyButton from "@/components/CopyButton";
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
      <div className="container py-10">
        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="card bg-gradient-to-br from-blurple/20 to-blurple/5 border border-blurple/30">
            <p className="text-xs text-white/60 uppercase font-semibold mb-1">Category</p>
            <p className="text-lg font-bold text-white">{cmd.category}</p>
          </div>
          {cmd.cooldown && (
            <div className="card bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
              <p className="text-xs text-white/60 uppercase font-semibold mb-1">⏱️ Cooldown</p>
              <p className="text-lg font-bold text-white">{cmd.cooldown}s</p>
            </div>
          )}
          {cmd.premiumOnly && (
            <div className="card bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30">
              <p className="text-xs text-white/60 uppercase font-semibold mb-1">💎 Premium</p>
              <p className="text-lg font-bold text-yellow-200">Required</p>
            </div>
          )}
          {cmd.voteOnly && (
            <div className="card bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <p className="text-xs text-white/60 uppercase font-semibold mb-1">🗳️ Vote</p>
              <p className="text-lg font-bold text-purple-200">Required</p>
            </div>
          )}
          {cmd.djMode && (
            <div className="card bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-600/30">
              <p className="text-xs text-white/60 uppercase font-semibold mb-1">🎧 DJ Mode</p>
              <p className="text-lg font-bold text-purple-300">Required</p>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {/* Usage Section */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold">Usage</h2>
                <CopyButton text={cmd.usage ?? `/${cmd.name}`} className="btn btn-outline btn-sm" />
              </div>
              <pre className="bg-[#0f0f0f] rounded p-4 text-sm overflow-auto border border-white/10">{cmd.usage ?? `/${cmd.name}`}</pre>
            </div>

            {/* Aliases Section */}
            {cmd.aliases && cmd.aliases.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-3">Aliases</h2>
                <div className="flex flex-wrap gap-2">
                  {cmd.aliases.map((alias) => (
                    <span key={alias} className="px-3 py-1 rounded-full bg-gradient-to-r from-mint-500/20 to-mint-500/10 border border-mint-500/30 text-mint-300 text-sm font-mono">
                      /{alias}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Permissions Section */}
            {cmd.permissions && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Required Permissions</h2>
                <div className="space-y-4">
                  {cmd.permissions.user && cmd.permissions.user.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400">👤</span>
                        <p className="font-semibold text-sm">User Permissions</p>
                      </div>
                      <ul className="space-y-1 ml-6">
                        {cmd.permissions.user.map((perm) => (
                          <li key={perm} className="text-sm text-white/70">
                            <span className="text-green-400">✓</span> {perm}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {cmd.permissions.bot && cmd.permissions.bot.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-400">🤖</span>
                        <p className="font-semibold text-sm">Bot Permissions</p>
                      </div>
                      <ul className="space-y-1 ml-6">
                        {cmd.permissions.bot.map((perm) => (
                          <li key={perm} className="text-sm text-white/70">
                            <span className="text-blue-400">✓</span> {perm}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {cmd.permissions.voice && cmd.permissions.voice.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-purple-400">🎙️</span>
                        <p className="font-semibold text-sm">Voice Requirements</p>
                      </div>
                      <ul className="space-y-1 ml-6">
                        {cmd.permissions.voice.map((req) => (
                          <li key={req} className="text-sm text-white/70">
                            <span className="text-purple-400">✓</span> {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Examples Section */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-3">Examples</h2>
              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blurple flex-shrink-0">→</span>
                  <code className="bg-white/5 px-2 py-1 rounded border border-white/10 text-white">{cmd.usage ?? `/${cmd.name}`}</code>
                </li>
                {cmd.usage && (
                  <li className="flex items-start gap-2">
                    <span className="text-blurple flex-shrink-0">→</span>
                    <code className="bg-white/5 px-2 py-1 rounded border border-white/10 text-white">{cmd.usage}</code>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-4">
            {/* Command Info Card */}
            <div className="card bg-gradient-to-br from-blurple/10 to-blurple/5 border border-blurple/20">
              <h3 className="font-semibold mb-3 text-blurple">Command Info</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-white/60 text-xs uppercase">Name</dt>
                  <dd className="text-white font-mono">/{cmd.name}</dd>
                </div>
                <div>
                  <dt className="text-white/60 text-xs uppercase">Category</dt>
                  <dd className="text-white">{cmd.category}</dd>
                </div>
                {cmd.aliases && cmd.aliases.length > 0 && (
                  <div>
                    <dt className="text-white/60 text-xs uppercase">Aliases</dt>
                    <dd className="text-white text-xs font-mono">{cmd.aliases.join(', ')}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Status Badges */}
            <div className="card">
              <h3 className="font-semibold mb-3">Requirements</h3>
              <div className="flex flex-col gap-2">
                {cmd.premiumOnly && (
                  <span className="text-xs uppercase tracking-wide bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded text-center font-semibold">
                    💎 Premium Only
                  </span>
                )}
                {cmd.voteOnly && (
                  <span className="text-xs uppercase tracking-wide bg-purple-500/20 text-purple-200 px-2 py-1 rounded text-center font-semibold">
                    🗳️ Vote Required
                  </span>
                )}
                {cmd.djMode && (
                  <span className="text-xs uppercase tracking-wide bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-center font-semibold">
                    🎧 DJ Mode
                  </span>
                )}
                {!cmd.premiumOnly && !cmd.voteOnly && !cmd.djMode && (
                  <span className="text-xs uppercase tracking-wide bg-green-500/20 text-green-200 px-2 py-1 rounded text-center font-semibold">
                    ✓ Free Command
                  </span>
                )}
              </div>
            </div>

            {/* Related Commands */}
            <div className="card">
              <h3 className="font-semibold mb-3">Related Commands</h3>
              <div className="flex flex-col gap-2">
                {getAllCommands()
                  .filter((c) => c.category === cmd.category && c.name !== cmd.name)
                  .slice(0, 6)
                  .map((c) => (
                    <Link
                      key={c.name}
                      href={`/commands/${c.name}`}
                      className="text-xs px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition"
                    >
                      /{c.name}
                    </Link>
                  ))}
              </div>
            </div>

            {/* CTA */}
            <Link href="/invite" className="btn btn-primary w-full">
              Invite Swelly
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
