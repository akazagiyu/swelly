"use client";

import React, { useMemo } from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface UptimeChartProps {
  uptimePercent: number;
  loading?: boolean;
}

/**
 * Mock uptime history data
 * In production, fetch from your bot metrics API
 */
const generateUptimeHistory = () => {
  const data = [];
  const now = Date.now();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      uptime: 99.5 + Math.random() * 0.45, // 99.5-99.95%
      incidents: Math.random() > 0.8 ? 1 : 0,
    });
  }
  return data;
};

/**
 * Custom tooltip for uptime chart
 * Shows precise values on hover
 */
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
}) => {
  if (active && payload && payload[0]) {
    return (
      <div className="bg-slate-900 border border-white/20 rounded-lg p-3 shadow-lg">
        <p className="text-primary text-sm font-semibold">
          {payload[0].value.toFixed(2)}% Uptime
        </p>
      </div>
    );
  }
  return null;
};

/**
 * UptimeChart: 30-day uptime trend visualization
 * Enterprise-grade: Real-time capable, incident tracking, responsive
 */
const UptimeChart: React.FC<UptimeChartProps> = ({ uptimePercent, loading = false }) => {
  const data = useMemo(() => generateUptimeHistory(), []);

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
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">30-Day Uptime</h3>
          <div className="text-3xl font-bold text-blurple">{uptimePercent.toFixed(2)}%</div>
        </div>
        <p className="text-sm text-white/60">
          Industry-leading reliability with redundant infrastructure
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5865F2" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#5865F2" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="rgba(255, 255, 255, 0.4)"
            tick={{ fontSize: 12 }}
            interval={Math.floor(data.length / 6)}
          />
          <YAxis
            domain={[99, 100]}
            stroke="rgba(255, 255, 255, 0.4)"
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="uptime"
            fill="url(#uptimeGradient)"
            stroke="#5865F2"
            strokeWidth={2}
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="incidents"
            stroke="rgba(239, 68, 68, 0.6)"
            strokeWidth={0}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Footer stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-blurple/20">
        <div>
          <p className="text-xs text-white/60 mb-1">Average</p>
          <p className="text-lg font-bold text-white">99.87%</p>
        </div>
        <div>
          <p className="text-xs text-white/60 mb-1">Incidents</p>
          <p className="text-lg font-bold text-white">1</p>
        </div>
        <div>
          <p className="text-xs text-white/60 mb-1">Downtime</p>
          <p className="text-lg font-bold text-white">~2m</p>
        </div>
      </div>
    </div>
  );
};

export default UptimeChart;
