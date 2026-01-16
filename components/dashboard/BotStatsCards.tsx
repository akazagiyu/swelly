"use client";

import React, { useMemo } from "react";
import { FaServer, FaUsers, FaMemory, FaCube } from "react-icons/fa";

interface BotStats {
  guilds: number;
  users: number;
  ramMB: number;
  shards: number;
  uptimePercent: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  trend?: number;
  description?: string;
  loading?: boolean;
}

/**
 * StatCard: Individual metric display with icon and optional trend indicator
 * Enterprise-grade: Type-safe, accessible, responsive
 */
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit = "",
  icon,
  trend,
  description,
  loading = false,
}) => {
  const trendColor = trend ? (trend > 0 ? "text-green-400" : "text-red-400") : "";
  const trendIcon = trend && trend > 0 ? "↑" : trend && trend < 0 ? "↓" : "";

  return (
    <div className="bg-blurple/5 backdrop-blur-sm rounded-xl p-6 border border-blurple/20 hover:border-blurple/40 transition-all duration-300 h-full shadow-lg shadow-blurple/5">
      {/* Header with icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl text-blurple">{icon}</div>
        {trend !== undefined && (
          <div className={`text-sm font-semibold ${trendColor}`}>
            {trendIcon} {Math.abs(trend)}%
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-white/70 mb-2">{title}</h3>

      {/* Main value */}
      {loading ? (
        <div className="h-10 bg-white/10 rounded animate-pulse mb-2" />
      ) : (
        <div className="mb-2">
          <p className="text-3xl md:text-4xl font-bold text-white">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {unit && <p className="text-xs text-white/60 mt-1">{unit}</p>}
        </div>
      )}

      {/* Description */}
      {description && <p className="text-xs text-white/50">{description}</p>}
    </div>
  );
};

/**
 * BotStatsCards: Dashboard header showing key metrics
 * Displays: Guilds, Users, Memory, Shards with real-time updates
 */
const BotStatsCards: React.FC<{ stats: BotStats | null; loading?: boolean }> = ({
  stats,
}) => {
  // Format large numbers for display
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  // Memoize calculations to prevent unnecessary renders
  const formattedStats = useMemo(
    () =>
      stats
        ? {
            guilds: formatNumber(stats.guilds),
            users: formatNumber(stats.users),
            ram: `${(stats.ramMB / 1024).toFixed(1)}GB`,
          }
        : null,
    [stats]
  );

  if (!formattedStats)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="h-10 bg-white/10 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Connected Guilds"
        value={formattedStats.guilds}
        unit="Active Discord servers"
        icon={<FaServer />}
        trend={2.3}
        description="Swelly is currently connected to thousands of Discord communities."
      />

      <StatCard
        title="Total Users"
        value={formattedStats.users}
        unit="Across all servers"
        icon={<FaUsers />}
        trend={1.8}
        description="Estimated users leveraging Swelly features."
      />

      <StatCard
        title="Memory Usage"
        value={formattedStats.ram}
        unit="Active memory"
        icon={<FaMemory />}
        description="Optimized resource allocation for peak performance."
      />

      <StatCard
        title="Shard Count"
        value={stats?.shards || 0}
        unit="Distributed instances"
        icon={<FaCube />}
        trend={0}
        description="Ensures reliability and low latency globally."
      />
    </div>
  );
};

export default BotStatsCards;
