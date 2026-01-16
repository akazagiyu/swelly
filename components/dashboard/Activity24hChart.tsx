"use client";

import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Activity24hChartProps {
  loading?: boolean;
}

/**
 * Mock 24-hour activity data
 * In production, fetch from your bot metrics API
 */
const generateActivity24h = () => {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    const baseGuilds = 15000 + Math.random() * 5000;
    const baseUsers = 2_800_000 + Math.random() * 1_000_000;
    
    data.push({
      time: hour.toLocaleTimeString("en-US", {
        hour: "2-digit",
        hour12: true,
        minute: "2-digit",
      }),
      guilds: Math.round(baseGuilds + (Math.sin(i / 5) * 2000)),
      users: Math.round(baseUsers + (Math.cos(i / 5) * 500_000)),
      commands: Math.round(45000 + Math.random() * 30000),
    });
  }
  return data;
};

/**
 * Custom tooltip for activity chart
 * Shows multi-series data with formatting
 */
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-white/20 rounded-lg p-4 shadow-lg">
        <p className="text-white/70 text-xs mb-2 font-semibold">{label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {(entry.value / 1000).toFixed(1)}K
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * Activity24hChart: Real-time 24-hour bot activity visualization
 * Shows: Guild connections, Active users, Commands executed
 * Enterprise-grade: Multi-series, responsive, accessible
 */
const Activity24hChart: React.FC<Activity24hChartProps> = ({ loading = false }) => {
  const data = useMemo(() => generateActivity24h(), []);

  // Calculate statistics
  const stats = useMemo(() => {
    const guilds = data.map((d) => d.guilds);
    const users = data.map((d) => d.users);
    const commands = data.map((d) => d.commands);

    return {
      peakGuilds: Math.max(...guilds),
      avgGuilds: Math.round(guilds.reduce((a, b) => a + b) / guilds.length),
      peakUsers: Math.max(...users),
      peakCommands: Math.max(...commands),
    };
  }, [data]);

  if (loading) {
    return (
      <div className="bg-blurple/5 backdrop-blur-sm rounded-xl p-6 border border-blurple/20 shadow-lg shadow-blurple/5">
        <div className="h-80 bg-white/10 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-blurple/5 backdrop-blur-sm rounded-xl p-6 border border-blurple/20 shadow-lg shadow-blurple/5">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">24-Hour Activity</h3>
        <p className="text-sm text-white/60">Real-time bot engagement and performance metrics</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="guildsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5865F2" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#5865F2" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7289DA" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7289DA" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            stroke="rgba(255, 255, 255, 0.4)"
            tick={{ fontSize: 12 }}
            interval={Math.floor(data.length / 6)}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.4)"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
            formatter={(value) => <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>{value}</span>}
          />

          <Area
            type="monotone"
            dataKey="guilds"
            name="Active Guilds"
            stroke="#5865F2"
            fill="url(#guildsGradient)"
            strokeWidth={2}
            isAnimationActive={true}
          />
          <Area
            type="monotone"
            dataKey="users"
            name="Total Users"
            stroke="#7289DA"
            fill="url(#usersGradient)"
            strokeWidth={2}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Statistics footer */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-blurple/20">
        <div>
          <p className="text-xs text-white/60 mb-1">Peak Guilds</p>
          <p className="text-lg font-bold text-blurple">{(stats.peakGuilds / 1000).toFixed(1)}K</p>
        </div>
        <div>
          <p className="text-xs text-white/60 mb-1">Avg Guilds</p>
          <p className="text-lg font-bold text-blurple">{(stats.avgGuilds / 1000).toFixed(1)}K</p>
        </div>
        <div>
          <p className="text-xs text-white/60 mb-1">Peak Users</p>
          <p className="text-lg font-bold" style={{color: '#7289DA'}}>{(stats.peakUsers / 1_000_000).toFixed(1)}M</p>
        </div>
        <div>
          <p className="text-xs text-white/60 mb-1">Peak Commands</p>
          <p className="text-lg font-bold text-blurple">{(stats.peakCommands / 1000).toFixed(0)}K</p>
        </div>
      </div>
    </div>
  );
};

export default Activity24hChart;
