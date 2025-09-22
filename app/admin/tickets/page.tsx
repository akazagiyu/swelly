'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import { FaTicketAlt, FaSearch, FaTrash, FaReply, FaTags, FaExclamationTriangle, FaChartBar } from 'react-icons/fa';

interface TicketResponse {
  id: string;
  message: string;
  author: string;
  authorType: 'user' | 'admin';
  timestamp: string;
}

interface AdminTicket {
  ticketId: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'waiting-for-user' | 'resolved' | 'closed';
  description: string;
  serverInfo: {
    serverId?: string;
    serverName?: string;
    userCount?: string;
  };
  contactEmail: string;
  discordUsername?: string;
  submittedAt: string;
  updatedAt: string;
  assignedTo?: string;
  responses: TicketResponse[];
  tags: string[];
}

interface TicketStats {
  total: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<AdminTicket | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  });
  const [showNewResponse, setShowNewResponse] = useState(false);
  const [newResponse, setNewResponse] = useState('');
  const [newTags, setNewTags] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [showEmailTest, setShowEmailTest] = useState(false);

  // Check if user is admin (this would normally be done server-side)
  const isAdmin = session?.user?.id && process.env.NEXT_PUBLIC_OWNER_DISCORD_UID === session.user.id;

  const fetchTickets = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      params.append('action', 'admin-list');
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.search) params.append('search', filters.search);

      const response = await fetch(`/api/tickets?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setTickets(data.tickets);
      }
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/tickets?action=stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }, []);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || !isAdmin) return;
    
    const loadData = async () => {
      await fetchTickets();
      await fetchStats();
    };
    
    loadData();
  }, [session, status, isAdmin, fetchTickets, fetchStats]);

  // Auto-refresh for real-time updates
  useEffect(() => {
    if (!session || !isAdmin) return;
    
    const interval = setInterval(() => {
      fetchTickets();
      fetchStats();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [session, isAdmin, fetchTickets, fetchStats]);

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId,
          action: 'update-status',
          data: { status }
        })
      });

      const data = await response.json();
      if (data.success) {
        fetchTickets();
        if (selectedTicket?.ticketId === ticketId) {
          setSelectedTicket(data.ticket);
        }
      }
    } catch (error) {
      console.error('Failed to update ticket status:', error);
    }
  };

  const updateTicketPriority = async (ticketId: string, priority: string) => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId,
          action: 'update-priority',
          data: { priority }
        })
      });

      const data = await response.json();
      if (data.success) {
        fetchTickets();
        if (selectedTicket?.ticketId === ticketId) {
          setSelectedTicket(data.ticket);
        }
      }
    } catch (error) {
      console.error('Failed to update ticket priority:', error);
    }
  };

  const addResponse = async (ticketId: string, message: string) => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId,
          action: 'add-response',
          data: { message }
        })
      });

      const data = await response.json();
      if (data.success) {
        fetchTickets();
        setSelectedTicket(data.ticket);
        setNewResponse('');
        setShowNewResponse(false);
      }
    } catch (error) {
      console.error('Failed to add response:', error);
    }
  };

  const addTags = async (ticketId: string, tags: string[]) => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId,
          action: 'add-tags',
          data: { tags }
        })
      });

      const data = await response.json();
      if (data.success) {
        fetchTickets();
        setSelectedTicket(data.ticket);
        setNewTags('');
      }
    } catch (error) {
      console.error('Failed to add tags:', error);
    }
  };

  const testEmailService = async () => {
    if (!testEmail.trim()) return;
    
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testEmail })
      });

      const data = await response.json();
      if (data.success) {
        alert('Test email sent successfully! Check your inbox.');
      } else {
        alert(`Failed to send test email: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to test email:', error);
      alert('Failed to test email service.');
    } finally {
      setTestEmail('');
      setShowEmailTest(false);
    }
  };

  const deleteTicket = async (ticketId: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    
    try {
      const response = await fetch(`/api/tickets?ticketId=${ticketId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        fetchTickets();
        if (selectedTicket?.ticketId === ticketId) {
          setSelectedTicket(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete ticket:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-500 bg-red-50';
      case 'high': return 'text-orange-500 bg-orange-50';
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      case 'low': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-500 bg-blue-50';
      case 'in-progress': return 'text-purple-500 bg-purple-50';
      case 'waiting-for-user': return 'text-yellow-500 bg-yellow-50';
      case 'resolved': return 'text-green-500 bg-green-50';
      case 'closed': return 'text-gray-500 bg-gray-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p>Please sign in to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <FaExclamationTriangle className="mx-auto text-6xl text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You don&apos;t have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <FaTicketAlt className="text-4xl text-purple-400" />
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <FaChartBar className="text-2xl text-blue-400" />
                <div>
                  <p className="text-sm text-gray-300">Total Tickets</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div>
                <p className="text-sm text-gray-300 mb-2">By Status</p>
                {Object.entries(stats.byStatus).map(([status, count]) => (
                  <div key={status} className="flex justify-between text-sm">
                    <span className="capitalize">{status.replace('-', ' ')}</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div>
                <p className="text-sm text-gray-300 mb-2">By Priority</p>
                {Object.entries(stats.byPriority).map(([priority, count]) => (
                  <div key={priority} className="flex justify-between text-sm">
                    <span className="capitalize">{priority}</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-2xl text-red-400" />
                <div>
                  <p className="text-sm text-gray-300">High Priority</p>
                  <p className="text-2xl font-bold">{(stats.byPriority.high || 0) + (stats.byPriority.urgent || 0)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ticket List */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Support Tickets</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEmailTest(!showEmailTest)}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
                  >
                    Test Email
                  </button>
                  <button
                    onClick={() => fetchTickets()}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {/* Email Test Panel */}
              {showEmailTest && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Test Email Service</h3>
                  <p className="text-sm text-green-300/70 mb-3">
                    Send a test email to verify your Resend configuration is working correctly.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter test email address..."
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-400"
                    />
                    <button
                      onClick={testEmailService}
                      disabled={!testEmail.trim()}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors"
                    >
                      Send Test
                    </button>
                    <button
                      onClick={() => setShowEmailTest(false)}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">All Statuses</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="waiting-for-user">Waiting for User</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Priority</label>
                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Search</label>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tickets..."
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Ticket List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.ticketId}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedTicket?.ticketId === ticket.ticketId
                        ? 'bg-purple-600/20 border-purple-400'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{ticket.subject}</h3>
                        <p className="text-sm text-gray-300">#{ticket.ticketId}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{ticket.description.substring(0, 100)}...</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{ticket.contactEmail}</span>
                      <span>{new Date(ticket.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                {tickets.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No tickets found matching your criteria.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="lg:col-span-1">
            {selectedTicket ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Ticket Details</h3>
                  <button
                    onClick={() => deleteTicket(selectedTicket.ticketId)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete Ticket"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Subject</label>
                    <p className="font-semibold">{selectedTicket.subject}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Status</label>
                      <select
                        value={selectedTicket.status}
                        onChange={(e) => updateTicketStatus(selectedTicket.ticketId, e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="waiting-for-user">Waiting for User</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Priority</label>
                      <select
                        value={selectedTicket.priority}
                        onChange={(e) => updateTicketPriority(selectedTicket.ticketId, e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Description</label>
                    <p className="text-sm bg-white/5 p-3 rounded border border-white/10">
                      {selectedTicket.description}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Contact</label>
                    <p className="text-sm">{selectedTicket.contactEmail}</p>
                    {selectedTicket.discordUsername && (
                      <p className="text-sm text-gray-300">Discord: {selectedTicket.discordUsername}</p>
                    )}
                  </div>

                  {selectedTicket.tags.length > 0 && (
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Tags</label>
                      <div className="flex flex-wrap gap-1">
                        {selectedTicket.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FaTags className="text-sm" />
                      <input
                        type="text"
                        placeholder="Add tags (comma separated)"
                        value={newTags}
                        onChange={(e) => setNewTags(e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && newTags.trim()) {
                            addTags(selectedTicket.ticketId, newTags.split(',').map(tag => tag.trim()));
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Responses */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm text-gray-300">Responses</label>
                      <button
                        onClick={() => setShowNewResponse(!showNewResponse)}
                        className="p-1 text-purple-400 hover:text-purple-300 transition-colors"
                        title="Add Response"
                      >
                        <FaReply />
                      </button>
                    </div>
                    
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedTicket.responses.map((response) => (
                        <div key={response.id} className="bg-white/5 p-3 rounded border border-white/10">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold">
                              {response.author} ({response.authorType})
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(response.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm">{response.message}</p>
                        </div>
                      ))}
                    </div>

                    {showNewResponse && (
                      <div className="mt-2">
                        <textarea
                          placeholder="Type your response..."
                          value={newResponse}
                          onChange={(e) => setNewResponse(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm resize-none"
                          rows={3}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => {
                              if (newResponse.trim()) {
                                addResponse(selectedTicket.ticketId, newResponse);
                              }
                            }}
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
                          >
                            Send Response
                          </button>
                          <button
                            onClick={() => {
                              setShowNewResponse(false);
                              setNewResponse('');
                            }}
                            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
                <FaTicketAlt className="mx-auto text-4xl text-gray-400 mb-4" />
                <p className="text-gray-300">Select a ticket to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}