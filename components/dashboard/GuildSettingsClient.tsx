"use client";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type GuildSettings = {
  prefix: string;
  djRole: string;
  autoplay: boolean;
  volume: number;
};

export default function GuildSettingsClient({ guildId }: { guildId: string }) {
  const storageKey = useMemo(() => `swelly:guild:${guildId}:settings`, [guildId]);
  const [settings, setSettings] = useLocalStorage<GuildSettings>(storageKey, {
    prefix: "/",
    djRole: "",
    autoplay: true,
    volume: 70,
  });

  const [prefix, setPrefix] = useState(settings.prefix);
  const [djRole, setDjRole] = useState(settings.djRole);
  const [autoplay, setAutoplay] = useState(settings.autoplay);
  const [volume, setVolume] = useState(settings.volume);

  useEffect(() => {
    setPrefix(settings.prefix);
    setDjRole(settings.djRole);
    setAutoplay(settings.autoplay);
    setVolume(settings.volume);
  }, [settings]);

  const save = (patch: Partial<GuildSettings>, label: string) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    toast.success(`${label} saved`);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card" data-reveal-card>
        <h3 className="font-semibold">Prefix</h3>
        <p className="text-white/60 text-sm mb-2">Choose your command prefix (if applicable).</p>
        <div className="flex gap-2 items-center">
          <input
            className="bg-[#0f0f0f] border border-white/10 rounded px-2 py-1 w-24"
            value={prefix}
            maxLength={3}
            onChange={(e) => setPrefix(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => save({ prefix }, "Prefix")}>
            Save
          </button>
        </div>
      </div>

      <div className="card" data-reveal-card>
        <h3 className="font-semibold">DJ Role</h3>
        <p className="text-white/60 text-sm mb-2">Allow only members with this role to control playback.</p>
        <div className="flex gap-2 items-center">
          <input
            className="bg-[#0f0f0f] border border-white/10 rounded px-2 py-1"
            placeholder="@DJ"
            value={djRole}
            onChange={(e) => setDjRole(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => save({ djRole }, "DJ role")}>
            Save
          </button>
        </div>
      </div>

      <div className="card" data-reveal-card>
        <h3 className="font-semibold">Autoplay</h3>
        <p className="text-white/60 text-sm mb-2">Continue playing related tracks automatically.</p>
        <div className="flex gap-3 items-center">
          <input
            id="autoplay"
            type="checkbox"
            className="h-4 w-4"
            checked={autoplay}
            onChange={(e) => {
              const v = e.target.checked;
              setAutoplay(v);
              save({ autoplay: v }, "Autoplay");
            }}
          />
          <label htmlFor="autoplay">{autoplay ? "Enabled" : "Disabled"}</label>
        </div>
      </div>

      <div className="card" data-reveal-card>
        <h3 className="font-semibold">Volume</h3>
        <p className="text-white/60 text-sm mb-2">Default player volume.</p>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full"
          />
          <span className="w-10 text-right text-white/70 text-sm">{volume}</span>
          <button className="btn btn-primary" onClick={() => save({ volume }, "Volume")}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
