"use client";

import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface PopularCommand {
  name: string;
  usage: number;
  trend: number;
}

interface PopularCommandsChartProps {
  commands?: PopularCommand[];
  loading?: boolean;
}

/**
 * Top 10 most-used commands mock data
 * In production, fetch from your bot metrics API
 */
const defaultTopCommands: PopularCommand[] = [
  { name: "play", usage: 2_840_000, trend: 12 },
  { name: "skip", usage: 1_920_000, trend: 8 },
  { name: "queue", usage: 1_650_000, trend: 5 },
  { name: "pause", usage: 1_420_000, trend: 3 },
  { name: "nowplaying", usage: 1_280_000, trend: -2 },
  { name: "volume", usage: 980_000, trend: 6 },
  { name: "shuffle", usage: 850_000, trend: 11 },
  { name: "repeat", usage: 720_000, trend: 4 },
  { name: "search", usage: 580_000, trend: 15 },
  { name: "playlist", usage: 450_000, trend: 9 },
];

/**
 * Color gradient for bars (Discord Blurple themed)
 */
const getBarColor = (index: number): string => {
  const colors = [
    "#5865F2", // Discord Blurple
    "#7289DA", // Discord Light Blurple
    "#4752C4", // Discord Dark Blurple
    "#40444B", // Discord Dark Gray
    "#36393F", // Discord Darker Gray
    "#2C2F33", // Discord Darkest Gray
    "#5865F2", // Discord Blurple (repeat for cycling)
    "#7289DA",
    "#4752C4",
    "#40444B",
  ];
  return colors[index % colors.length];
};

/**
 * Custom tooltip for commands chart
 */
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { trend: number } }>;
}) => {
  if (active && payload && payload[0]) {
    const data = payload[0];
    const trend = data.payload.trend;
    const trendColor = trend > 0 ? "text-green-400" : trend < 0 ? "text-red-400" : "text-white/60";
    const trendIcon = trend > 0 ? "↑" : trend < 0 ? "↓" : "→";

    return (
      <div className="bg-slate-900 border border-white/20 rounded-lg p-3 shadow-lg">
        <p className="text-white text-sm font-semibold">{(data.value / 1_000_000).toFixed(1)}M executions</p>
        <p className={`text-xs ${trendColor}`}>
          {trendIcon} {Math.abs(trend)}% weekly
        </p>
      </div>
    );
  }
  return null;
};

/**
 * PopularCommandsChart: Top 10 most-used bot commands
 * Enterprise-grade: Ranked display, trend indicators, responsive
 */
const PopularCommandsChart: React.FC<PopularCommandsChartProps> = ({
  commands = defaultTopCommands,
  loading = false,
}) => {
  const data = useMemo(
    () =>
      commands.map((cmd, idx) => ({
        rank: idx + 1,
        name: cmd.name,
        usage: cmd.usage,
        trend: cmd.trend,
      })),
    [commands]
  );

  const totalExecutions = useMemo(() => data.reduce((sum, cmd) => sum + cmd.usage, 0), [data]);

  if (loading) {
    return (
      <div className="bg-blurple/5 backdrop-blur-sm rounded-xl p-6 border border-blurple/20 shadow-lg shadow-blurple/5">
        <div className="h-96 bg-white/10 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-blurple/5 backdrop-blur-sm rounded-xl p-6 border border-blurple/20 shadow-lg shadow-blurple/5">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Top 10 Commands</h3>
        <p className="text-sm text-white/60">
          Most executed commands this week ({(totalExecutions / 1_000_000).toFixed(1)}M total executions)
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="rgba(255, 255, 255, 0.4)"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.4)"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.05)" }} />

          <Bar dataKey="usage" radius={[8, 8, 0, 0]} isAnimationActive={true}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Top 3 Spotlight */}
      <div className="mt-8 pt-6 border-t border-blurple/20">
        <p className="text-xs font-semibold text-white/60 mb-3 uppercase">Top Performers</p>
        <div className="space-y-2">
          {data.slice(0, 3).map((cmd) => {
            const percentage = (cmd.usage / totalExecutions) * 100;
            const trendColor = cmd.trend > 0 ? "text-green-400" : cmd.trend < 0 ? "text-red-400" : "text-white/60";
            const trendIcon = cmd.trend > 0 ? "↑" : cmd.trend < 0 ? "↓" : "→";

            return (
              <div key={cmd.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-blurple">{cmd.rank}</span>
                  <div>
                    <p className="text-sm font-medium text-white capitalize">{cmd.name}</p>
                    <div className="w-40 h-2 bg-white/10 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(to right, #5865F2, #7289DA)', width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{(cmd.usage / 1_000_000).toFixed(1)}M</p>
                  <p className={`text-xs ${trendColor}`}>
                    {trendIcon} {Math.abs(cmd.trend)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCommandsChart;
