import { ImageResponse } from 'next/og';
// no request context needed
import { getAllCommands } from '@/lib/commands';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Swelly Commands';

export default async function GET() {
  const { width, height } = size;
  const count = getAllCommands().length;

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 48,
          background: 'linear-gradient(135deg, #0d0d10, #1a0202, #140606)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{ width: 24, height: 24, borderRadius: 8, background: 'linear-gradient(90deg,#ef4444,#f97316)' }}
          />
          <div style={{ fontSize: 44, color: '#fff', fontWeight: 800 }}>Swelly</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: '#fff' }}>Commands</div>
          <div style={{ fontSize: 28, color: '#e5e7eb' }}>{typeof count === 'number' ? `${count} available commands` : 'Explore powerful music commands'}</div>
        </div>
        <div style={{ display: 'flex', gap: 16, color: '#e5e7eb', fontSize: 24 }}>
          <div>Play • Pause • Queue • Skip • Volume • Loop • Lyrics</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
