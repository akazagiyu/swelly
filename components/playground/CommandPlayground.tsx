"use client";

import React, { useState, useCallback, useMemo } from "react";
import { FaPlay, FaTerminal, FaCopy, FaRandom, FaChartBar, FaTimes, FaCheckCircle, FaExclamationCircle, FaGem, FaVoteYea, FaHeadphones, FaShieldAlt } from "react-icons/fa";
import type { Command } from "@/components/CommandSearch";
import { motion, AnimatePresence } from "framer-motion";

interface CommandPlaygroundProps {
  commands: Command[];
}

interface ExecutionResult {
  id: string;
  command: string;
  args: string[];
  output: string;
  executionTime: number;
  success: boolean;
  timestamp: Date;
  category: string;
}

/**
 * CommandPlayground: Interactive command simulator
 * Allows users to try commands and see realistic responses
 * Unique feature: Live execution visualization with stats
 */
export const CommandPlayground: React.FC<CommandPlaygroundProps> = ({ commands: allCommands }) => {
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(allCommands[0] || null);
  const [showCommandDetails, setShowCommandDetails] = useState(false);
  const [args, setArgs] = useState<string>("");
  const [executions, setExecutions] = useState<ExecutionResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showStats, setShowStats] = useState(false);

  // Filter commands by search and category
  const filteredCommands = useMemo(() => {
    return allCommands.filter((cmd) => {
      const matchesSearch = cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cmd.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || cmd.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, allCommands]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["all", ...Array.from(new Set(allCommands.map(c => c.category)))];
    return cats;
  }, [allCommands]);

  // Generate realistic command output
  const generateOutput = useCallback((cmd: Command, args: string[]): string => {
    const responses: Record<string, string[]> = {
      play: [
        `🎵 Now playing: ${args[0] || "Shape of You - Ed Sheeran"}`,
        `⏱️  Duration: 3:23`,
        `📊 Queue position: 1/15`,
        `✅ Added to queue`
      ],
      skip: [
        `⏭️  Skipped current track`,
        `🎵 Now playing: ${args[0] || "next song in queue"}`,
        `⏱️  Duration: 4:12`
      ],
      queue: [
        `📋 Queue (${Math.floor(Math.random() * 20) + 1} songs):`,
        `1. Shape of You - Ed Sheeran (3:23)`,
        `2. Blinding Lights - The Weeknd (3:20)`,
        `3. Anti-Hero - Taylor Swift (3:21)`,
        `4. Bohemian Rhapsody - Queen (5:55)`,
        `... and ${Math.floor(Math.random() * 15)} more`
      ],
      pause: [
        `⏸️  Playback paused`,
        `🎵 Current track: ${args[0] || "Shape of You - Ed Sheeran"}`,
        `⏱️  Position: 1:45 / 3:23`
      ],
      nowplaying: [
        `🎵 Now Playing:`,
        `${args[0] || "Shape of You - Ed Sheeran"}`,
        `By: Ed Sheeran`,
        `Album: ÷ (Divide)`,
        `⏱️  1:45 / 3:23`,
        `👥 Listening: ${Math.floor(Math.random() * 500) + 50} members`
      ],
      volume: [
        `🔊 Volume set to ${args[0] || "80"}%`,
        `Current: ${args[0] || "80"} → 100`
      ],
      shuffle: [
        `🔀 Shuffle ${args[0] === "off" ? "disabled" : "enabled"}`,
        `Queue randomized with ${Math.floor(Math.random() * 50) + 10} songs`
      ],
      repeat: [
        `🔁 Repeat mode: ${args[0] || "one"}`,
        `Playing: Shape of You - Ed Sheeran`
      ],
      search: [
        `🔍 Search results for "${args[0] || "pop music"}":`,
        `1. Shape of You - Ed Sheeran`,
        `2. Blinding Lights - The Weeknd`,
        `3. Anti-Hero - Taylor Swift`,
        `4. As It Was - Harry Styles`,
        `5. Levitating - Dua Lipa`
      ],
      playlist: [
        `📚 Playlist: "${args[0] || "My Favorites"}"`,
        `${Math.floor(Math.random() * 100) + 10} songs`,
        `Duration: ${Math.floor(Math.random() * 8) + 2}h ${Math.floor(Math.random() * 60)}m`,
        `✅ Loaded successfully`
      ],
      stop: [
        `⏹️  Music stopped`,
        `Queue cleared`
      ],
    };

    const commandType = cmd.name.toLowerCase();
    const outputLines = responses[commandType] || [
      `✅ ${cmd.name} executed successfully`,
      `📊 Result: ${args[0] ? `with args: ${args.join(", ")}` : "no additional arguments"}`,
      `⏱️  Processing time: ${Math.floor(Math.random() * 500) + 50}ms`
    ];

    return outputLines.join("\n");
  }, []);

  // Simulate command execution
  const executeCommand = useCallback(async () => {
    if (!selectedCommand) return;

    setIsExecuting(true);
    const startTime = Date.now();

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 200));

    const executionTime = Date.now() - startTime;
    const success = Math.random() > 0.08; // 92% success rate for realism
    const parsedArgs = args.trim() ? args.split(" ") : [];
    const output = success 
      ? generateOutput(selectedCommand, parsedArgs)
      : `❌ Error: ${["Command timed out", "Invalid arguments", "Permission denied"][Math.floor(Math.random() * 3)]}`;

    const result: ExecutionResult = {
      id: `exec-${Date.now()}`,
      command: selectedCommand.name,
      args: parsedArgs,
      output,
      executionTime,
      success,
      timestamp: new Date(),
      category: selectedCommand.category,
    };

    setExecutions(prev => [result, ...prev.slice(0, 49)]); // Keep last 50
    setIsExecuting(false);
  }, [selectedCommand, args, generateOutput]);

  // Copy command to clipboard
  const copyCommand = useCallback((cmd: string, cmdArgs?: string) => {
    const fullCommand = cmdArgs ? `${cmd} ${cmdArgs}` : cmd;
    navigator.clipboard.writeText(`//${fullCommand}`);
  }, []);

  // Get execution stats
  const stats = useMemo(() => {
    if (executions.length === 0) return null;

    const successful = executions.filter(e => e.success).length;
    const avgTime = Math.round(executions.reduce((sum, e) => sum + e.executionTime, 0) / executions.length);
    const successRate = Math.round((successful / executions.length) * 100);
    const byCategory = Object.entries(
      executions.reduce((acc, e) => ({
        ...acc,
        [e.category]: (acc[e.category as keyof typeof acc] || 0) + 1
      }), {} as Record<string, number>)
    );

    return { successful, avgTime, successRate, total: executions.length, byCategory };
  }, [executions]);

  const handleRandomCommand = useCallback(() => {
    const random = filteredCommands[Math.floor(Math.random() * filteredCommands.length)];
    if (random) {
      setSelectedCommand(random);
      setArgs("");
    }
  }, [filteredCommands]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blurple/5 to-slate-900 py-12">
      <div className="container max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blurple/20 border border-blurple/40 mb-6">
            <FaTerminal className="text-blurple" />
            <span className="text-blurple font-semibold">Interactive Playground</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider mb-4 text-blurple">
            Try Swelly Commands
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Simulate running commands and see realistic responses. No bot setup required!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Command Browser (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-blurple/5 backdrop-blur-sm rounded-xl p-6 border border-blurple/20 shadow-lg shadow-blurple/5 h-full flex flex-col">
              <h2 className="text-lg font-semibold text-white mb-4">Commands</h2>

              {/* Search */}
              <input
                type="text"
                placeholder="Search commands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 mb-4 focus:outline-none focus:border-blurple/50"
              />

              {/* Category Filter */}
              <div className="mb-4">
                <label className="text-sm text-white/60 mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-blurple text-white"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Command List */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {filteredCommands.map((cmd) => (
                  <motion.div
                    key={cmd.name}
                    whileHover={{ x: 4 }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all group flex items-center justify-between ${
                      selectedCommand?.name === cmd.name
                        ? "bg-blurple/20 border border-blurple/40"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedCommand(cmd);
                        setArgs("");
                      }}
                      className="flex-1 text-left"
                    >
                      <div className="font-medium text-white">/{cmd.name}</div>
                      <div className="text-xs text-white/50 truncate">{cmd.description}</div>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCommand(cmd);
                        setShowCommandDetails(true);
                      }}
                      className="ml-2 px-2 py-1 rounded text-xs bg-blurple/20 text-blurple hover:bg-blurple/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    >
                      Info
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Random Button */}
              <button
                onClick={handleRandomCommand}
                className="w-full mt-4 px-4 py-2 rounded-lg bg-blurple/20 border border-blurple/40 text-blurple hover:bg-blurple/30 transition-all flex items-center justify-center gap-2 font-medium"
              >
                <FaRandom className="w-4 h-4" />
                Random
              </button>
            </div>
          </motion.div>

          {/* Simulator (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {/* Command Input */}
              {selectedCommand && (
                <div className="bg-blurple/5 backdrop-blur-sm rounded-xl p-6 border border-blurple/20 shadow-lg shadow-blurple/5">
                  <h2 className="text-lg font-semibold text-white mb-4">
                    /{selectedCommand.name}
                  </h2>
                  <p className="text-white/70 mb-4">{selectedCommand.description}</p>

                  {/* Arguments Input */}
                  <div className="mb-4">
                    <label className="text-sm text-white/60 mb-2 block">Arguments (Optional)</label>
                    <input
                      type="text"
                      placeholder={`e.g., ${selectedCommand.name === "play" ? "artist name" : "query"}`}
                      value={args}
                      onChange={(e) => setArgs(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && executeCommand()}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blurple/50"
                    />
                  </div>

                  {/* Execute Button */}
                  <button
                    onClick={executeCommand}
                    disabled={isExecuting}
                    className="w-full px-6 py-3 rounded-lg bg-blurple hover:bg-blurple/90 disabled:opacity-50 text-white font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    {isExecuting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <FaPlay className="w-4 h-4" />
                        Execute Command
                      </>
                    )}
                  </button>

                  {/* Copy to Clipboard */}
                  {executions.length > 0 && executions[0]?.success && (
                    <button
                      onClick={() => copyCommand(selectedCommand.name, args)}
                      className="w-full mt-3 px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 font-medium flex items-center justify-center gap-2 transition-all"
                    >
                      <FaCopy className="w-4 h-4" />
                      Copy Command
                    </button>
                  )}
                </div>
              )}

              {/* Execution Results */}
              <div className="bg-blurple/5 backdrop-blur-sm rounded-xl p-6 border border-blurple/20 shadow-lg shadow-blurple/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FaTerminal className="text-blurple" />
                    Output
                  </h3>
                  {stats && (
                    <button
                      onClick={() => setShowStats(!showStats)}
                      className="text-blurple hover:text-blurple/80 transition"
                    >
                      <FaChartBar className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Stats Panel */}
                <AnimatePresence>
                  {showStats && stats && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-white/60">Success Rate</div>
                          <div className="text-2xl font-bold text-blurple">{stats.successRate}%</div>
                        </div>
                        <div>
                          <div className="text-white/60">Avg Time</div>
                          <div className="text-2xl font-bold text-blurple">{stats.avgTime}ms</div>
                        </div>
                        <div>
                          <div className="text-white/60">Total Executions</div>
                          <div className="text-2xl font-bold text-blurple">{stats.total}</div>
                        </div>
                        <div>
                          <div className="text-white/60">Successful</div>
                          <div className="text-2xl font-bold text-blurple">{stats.successful}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Output Display */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {executions.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-white/50">Execute a command to see output</p>
                    </div>
                  ) : (
                    executions.map((exec) => (
                      <motion.div
                        key={exec.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-lg font-mono text-sm border ${
                          exec.success
                            ? "bg-white/5 border-white/10"
                            : "bg-red-500/5 border-red-500/20"
                        }`}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <span className={exec.success ? "text-green-400" : "text-red-400"}>
                            {exec.success ? "✓" : "✗"}
                          </span>
                          <div className="flex-1">
                            <div className="text-white/80">
                              {exec.command} {exec.args.length > 0 && <span className="text-white/50">{exec.args.join(" ")}</span>}
                            </div>
                            <div className="text-white/50 text-xs">
                              {exec.executionTime}ms • {exec.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-white/70 whitespace-pre-wrap text-xs">
                          {exec.output}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-sm text-white/70">
                  💡 <strong>Tip:</strong> Try combining commands to learn workflows. Commands have a 92% success rate to simulate real-world behavior.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Command Details Modal */}
        <AnimatePresence>
          {showCommandDetails && selectedCommand && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowCommandDetails(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-blurple/30 shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blurple/20 to-transparent border-b border-blurple/20 p-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-blurple mb-2">/{selectedCommand.name}</h2>
                    <p className="text-white/70">{selectedCommand.description}</p>
                  </div>
                  <button
                    onClick={() => setShowCommandDetails(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-white text-xl" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Category & Usage */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-sm text-white/60 mb-1">Category</div>
                      <div className="text-lg font-semibold text-blurple">{selectedCommand.category}</div>
                    </div>
                    {selectedCommand.usage && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-sm text-white/60 mb-1">Usage</div>
                        <div className="text-lg font-mono text-white/80">{selectedCommand.usage}</div>
                      </div>
                    )}
                  </div>

                  {/* Aliases */}
                  {selectedCommand.aliases && selectedCommand.aliases.length > 0 && (
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-sm text-white/60 mb-3">Aliases</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCommand.aliases.map((alias) => (
                          <span
                            key={alias}
                            className="px-3 py-1 bg-blurple/20 border border-blurple/40 rounded-full text-sm text-blurple font-mono"
                          >
                            /{alias}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedCommand.cooldown && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center gap-3">
                        <FaExclamationCircle className="text-orange-400 text-xl" />
                        <div>
                          <div className="text-sm text-white/60">Cooldown</div>
                          <div className="font-semibold text-white">{selectedCommand.cooldown}s</div>
                        </div>
                      </div>
                    )}

                    {selectedCommand.premiumOnly && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center gap-3">
                        <FaGem className="text-yellow-400 text-xl" />
                        <div>
                          <div className="text-sm text-white/60">Premium Only</div>
                          <div className="font-semibold text-white">Exclusive Feature</div>
                        </div>
                      </div>
                    )}

                    {selectedCommand.voteOnly && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center gap-3">
                        <FaVoteYea className="text-purple-400 text-xl" />
                        <div>
                          <div className="text-sm text-white/60">Vote Required</div>
                          <div className="font-semibold text-white">Top.gg Vote</div>
                        </div>
                      </div>
                    )}

                    {selectedCommand.djMode && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center gap-3">
                        <FaHeadphones className="text-blue-400 text-xl" />
                        <div>
                          <div className="text-sm text-white/60">DJ Mode</div>
                          <div className="font-semibold text-white">DJ Only</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Permissions */}
                  {selectedCommand.permissions && (
                    <div className="space-y-4">
                      {selectedCommand.permissions.user && selectedCommand.permissions.user.length > 0 && (
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <div className="text-sm text-white/60 mb-3 flex items-center gap-2">
                            <FaCheckCircle className="text-green-400" />
                            User Permissions
                          </div>
                          <div className="space-y-1">
                            {selectedCommand.permissions.user.map((perm) => (
                              <div key={perm} className="text-white/80 flex items-center gap-2">
                                <span className="text-blurple">•</span>
                                <code className="bg-black/30 px-2 py-1 rounded text-xs">{perm}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedCommand.permissions.bot && selectedCommand.permissions.bot.length > 0 && (
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <div className="text-sm text-white/60 mb-3 flex items-center gap-2">
                            <FaShieldAlt className="text-blue-400" />
                            Bot Permissions
                          </div>
                          <div className="space-y-1">
                            {selectedCommand.permissions.bot.map((perm) => (
                              <div key={perm} className="text-white/80 flex items-center gap-2">
                                <span className="text-blurple">•</span>
                                <code className="bg-black/30 px-2 py-1 rounded text-xs">{perm}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedCommand.permissions.voice && selectedCommand.permissions.voice.length > 0 && (
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <div className="text-sm text-white/60 mb-3 flex items-center gap-2">
                            <FaHeadphones className="text-purple-400" />
                            Voice Requirements
                          </div>
                          <div className="space-y-1">
                            {selectedCommand.permissions.voice.map((req) => (
                              <div key={req} className="text-white/80 flex items-center gap-2">
                                <span className="text-blurple">•</span>
                                <code className="bg-black/30 px-2 py-1 rounded text-xs">{req}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Call to Action */}
                  <button
                    onClick={() => setShowCommandDetails(false)}
                    className="w-full px-6 py-3 rounded-lg bg-blurple hover:bg-blurple/90 text-white font-semibold transition-all"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommandPlayground;
