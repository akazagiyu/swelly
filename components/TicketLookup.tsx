"use client";

import { useState } from "react";
import { FaSearch, FaSpinner, FaCheckCircle, FaClock, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

interface TicketStatus {
  ticketId: string;
  subject: string;
  category: string;
  priority: string;
  status: 'open' | 'in-progress' | 'waiting-response' | 'resolved' | 'closed';
  submittedAt: string;
  lastUpdated: string;
  messages?: Array<{
    id: string;
    from: 'user' | 'support';
    message: string;
    timestamp: string;
  }>;
}

const statusConfig = {
  'open': {
    label: 'Open',
    icon: <FaClock className="w-4 h-4" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    description: 'Your ticket has been received and is waiting to be assigned.'
  },
  'in-progress': {
    label: 'In Progress',
    icon: <FaSpinner className="w-4 h-4 animate-spin" />,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    description: 'Our support team is actively working on your issue.'
  },
  'waiting-response': {
    label: 'Waiting for Response',
    icon: <FaExclamationTriangle className="w-4 h-4" />,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    description: 'We need more information from you to resolve this issue.'
  },
  'resolved': {
    label: 'Resolved',
    icon: <FaCheckCircle className="w-4 h-4" />,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    description: 'Your issue has been resolved. The ticket will auto-close in 24 hours.'
  },
  'closed': {
    label: 'Closed',
    icon: <FaTimesCircle className="w-4 h-4" />,
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    description: 'This ticket has been closed.'
  }
};

const priorityColors = {
  'low': 'text-green-400',
  'medium': 'text-yellow-400',
  'high': 'text-orange-400',
  'urgent': 'text-red-400'
};

export default function TicketLookup() {
  const [ticketId, setTicketId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ticket, setTicket] = useState<TicketStatus | null>(null);
  const [error, setError] = useState("");

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticketId.trim()) {
      setError("Please enter a ticket ID");
      return;
    }

    setIsLoading(true);
    setError("");
    setTicket(null);

    try {
      const response = await fetch(`/api/tickets?ticketId=${encodeURIComponent(ticketId.trim())}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Ticket not found. Please check your ticket ID and try again.");
        } else {
          setError("Failed to lookup ticket. Please try again later.");
        }
        return;
      }

      // For demo purposes, we'll simulate a ticket response
      // In a real app, this would come from your database
      if (ticketId.toUpperCase().startsWith('SWL-')) {
        const mockTicket: TicketStatus = {
          ticketId: ticketId.toUpperCase(),
          subject: "Bot not responding to commands",
          category: "bug",
          priority: "medium",
          status: Math.random() > 0.5 ? 'in-progress' : 'open',
          submittedAt: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
          lastUpdated: new Date(Date.now() - Math.random() * 86400000).toISOString(),
          messages: [
            {
              id: '1',
              from: 'user',
              message: 'The bot is not responding to any commands in our server. We tried /play and /help but nothing happens.',
              timestamp: new Date(Date.now() - Math.random() * 86400000 * 2).toISOString()
            },
            {
              id: '2',
              from: 'support',
              message: 'Thank you for your report. We are investigating this issue. Can you please provide your server ID?',
              timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString()
            }
          ]
        };
        setTicket(mockTicket);
      } else {
        setError("Invalid ticket ID format. Ticket IDs start with 'SWL-'.");
      }
    } catch (err) {
      console.error("Lookup error:", err);
      setError("Failed to lookup ticket. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeSince = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Less than an hour ago';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Form */}
      <div className="card p-6 mb-8">
        <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="ticketId" className="block text-sm font-medium text-white/90 mb-2">
              Ticket ID
            </label>
            <input
              id="ticketId"
              type="text"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              placeholder="SWL-1234567890-ABCDE"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <div className="sm:self-end">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                  Looking up...
                </>
              ) : (
                <>
                  <FaSearch className="w-4 h-4 mr-2" />
                  Look Up Ticket
                </>
              )}
            </button>
          </div>
        </form>
        
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
            {error}
          </div>
        )}
      </div>

      {/* Ticket Details */}
      {ticket && (
        <div className="space-y-6">
          {/* Status Overview */}
          <div className="card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{ticket.subject}</h2>
                <p className="text-white/60">Ticket ID: {ticket.ticketId}</p>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${statusConfig[ticket.status].bgColor} ${statusConfig[ticket.status].color}`}>
                {statusConfig[ticket.status].icon}
                <span className="font-medium">{statusConfig[ticket.status].label}</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <div className="text-white/60 text-sm">Category</div>
                <div className="font-medium capitalize">{ticket.category}</div>
              </div>
              <div>
                <div className="text-white/60 text-sm">Priority</div>
                <div className={`font-medium capitalize ${priorityColors[ticket.priority as keyof typeof priorityColors]}`}>
                  {ticket.priority}
                </div>
              </div>
              <div>
                <div className="text-white/60 text-sm">Submitted</div>
                <div className="font-medium">{getTimeSince(ticket.submittedAt)}</div>
              </div>
              <div>
                <div className="text-white/60 text-sm">Last Updated</div>
                <div className="font-medium">{getTimeSince(ticket.lastUpdated)}</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-white/70">{statusConfig[ticket.status].description}</p>
            </div>
          </div>

          {/* Messages */}
          {ticket.messages && ticket.messages.length > 0 && (
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Conversation</h3>
              <div className="space-y-4">
                {ticket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.from === 'user' 
                        ? 'bg-primary/20 ml-8' 
                        : 'bg-white/5 mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium ${
                        message.from === 'user' ? 'text-primary' : 'text-green-400'
                      }`}>
                        {message.from === 'user' ? 'You' : 'Support Team'}
                      </span>
                      <span className="text-white/50 text-sm">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-white/80">{message.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Need to Add More Information?</h3>
            <p className="text-white/70 mb-4">
              If you have additional details or the issue has changed, you can reply to your ticket.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="btn btn-primary">
                Reply to Ticket
              </button>
              <a href="/support" className="btn btn-outline">
                Create New Ticket
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Help Text */}
      {!ticket && !isLoading && (
        <div className="text-center text-white/60">
          <p className="mb-2">Enter your ticket ID above to check the status of your support request.</p>
          <p className="text-sm">
            Ticket IDs are sent to your email when you create a support ticket and start with &quot;SWL-&quot;.
          </p>
        </div>
      )}
    </div>
  );
}