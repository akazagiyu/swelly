import { NextResponse } from "next/server";

type ShardStatus = "operational" | "partial" | "outage";

export async function GET() {
  // Mock data; in production, fetch from your bot API
  const total = 54;
  const shards = Array.from({ length: total }, (_, i) => {
    // Faux variation: every 17th shard partial, every 29th outage
    let status: ShardStatus = "operational";
    if (i % 29 === 0) status = "outage";
    else if (i % 17 === 0) status = "partial";
    const guilds = 300 + (i * 23) % 700;
    const ping = 35 + (i * 7) % 40;
    return { id: i, status, guilds, ping };
  });
  const guildsTotal = shards.reduce((a, s) => a + s.guilds, 0);
  const usersTotal = Math.round(guildsTotal * 185.4); // mock multiplier
  const ramMB = 56000 + (total * 80);
  const data = {
    online: true,
    uptime: "3d 12h 05m",
    uptimePercent: 99.95,
    latencyMs: 48,
    shardsCount: shards.length,
    shards,
    totals: { guilds: guildsTotal, users: usersTotal, ramMB },
  };
  return NextResponse.json(data, { headers: { "Cache-Control": "s-maxage=10, stale-while-revalidate=30" } });
}
