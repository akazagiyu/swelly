// GET /api/discord-user/:id
// Server-side route that uses the BOT_TOKEN to fetch a Discord user's public profile
// and returns helpful avatar URLs.

function modFromString(numStr: string, m: number) {
  let r = 0;
  for (let i = 0; i < numStr.length; i++) {
    const c = numStr.charCodeAt(i) - 48; // '0' => 48
    if (c >= 0 && c <= 9) r = (r * 10 + c) % m;
  }
  return r;
}

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const id = ctx?.params?.id;
  if (!id || !/^\d{5,}$/.test(id)) {
    return new Response(JSON.stringify({ error: "Invalid or missing id" }), { status: 400 });
  }
  const token = process.env.BOT_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: "BOT_TOKEN not configured" }), { status: 500 });
  }

  const res = await fetch(`https://discord.com/api/v10/users/${id}`, {
    headers: { Authorization: `Bot ${token}` },
    // Prevent long builds from hanging if called at build-time by mistake
    next: { revalidate: 0 },
  });

  if (res.status === 404) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    return new Response(JSON.stringify({ error: "Failed to fetch user", status: res.status, details: txt }), { status: 502 });
  }

  const user = await res.json();
  const avatarHash: string | null = user.avatar ?? null;
  let avatarUrl: string | null = null;
  let defaultAvatarUrl: string | null = null;

  if (avatarHash) {
    const fmt = String(avatarHash).startsWith('a_') ? 'gif' : 'png';
    avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatarHash}.${fmt}?size=256`;
  } else {
    const idx = modFromString(String(id), 5);
    defaultAvatarUrl = `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
  }

  return new Response(
    JSON.stringify({
      id: user.id,
      username: user.username,
      global_name: user.global_name,
      discriminator: user.discriminator,
      avatar: user.avatar,
      banner: user.banner,
      avatarUrl,
      defaultAvatarUrl,
      cdn: 'https://cdn.discordapp.com',
    }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}
