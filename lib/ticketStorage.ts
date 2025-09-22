import { TicketStatus, PriorityLevel } from './adminConfig';

export interface TicketResponse {
  id: string;
  message: string;
  author: string;
  authorType: 'user' | 'admin';
  timestamp: string;
}

export interface EnhancedTicket {
  ticketId: string;
  subject: string;
  category: string;
  priority: PriorityLevel;
  status: TicketStatus;
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

// In-memory storage for demo purposes
// In production, this would be replaced with a database
class TicketStorage {
  private tickets: Map<string, EnhancedTicket> = new Map();

  // Save a new ticket
  saveTicket(ticket: EnhancedTicket): void {
    this.tickets.set(ticket.ticketId, ticket);
  }

  // Get a ticket by ID
  getTicket(ticketId: string): EnhancedTicket | undefined {
    return this.tickets.get(ticketId);
  }

  // Get all tickets
  getAllTickets(): EnhancedTicket[] {
    return Array.from(this.tickets.values());
  }

  // Update ticket status
  updateTicketStatus(ticketId: string, status: TicketStatus, updatedBy?: string): boolean {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) return false;
    
    ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    if (updatedBy) {
      ticket.assignedTo = updatedBy;
    }
    
    this.tickets.set(ticketId, ticket);
    return true;
  }

  // Add response to ticket
  addResponse(ticketId: string, response: Omit<TicketResponse, 'id' | 'timestamp'>): boolean {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) return false;
    
    const newResponse: TicketResponse = {
      ...response,
      id: `resp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
    };
    
    ticket.responses.push(newResponse);
    ticket.updatedAt = new Date().toISOString();
    this.tickets.set(ticketId, ticket);
    return true;
  }

  // Update ticket priority
  updateTicketPriority(ticketId: string, priority: PriorityLevel): boolean {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) return false;
    
    ticket.priority = priority;
    ticket.updatedAt = new Date().toISOString();
    this.tickets.set(ticketId, ticket);
    return true;
  }

  // Add tags to ticket
  addTicketTags(ticketId: string, tags: string[]): boolean {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) return false;
    
    const uniqueTags = Array.from(new Set([...ticket.tags, ...tags]));
    ticket.tags = uniqueTags;
    ticket.updatedAt = new Date().toISOString();
    this.tickets.set(ticketId, ticket);
    return true;
  }

  // Remove ticket (soft delete)
  removeTicket(ticketId: string): boolean {
    return this.tickets.delete(ticketId);
  }

  // Get tickets by status
  getTicketsByStatus(status: TicketStatus): EnhancedTicket[] {
    return Array.from(this.tickets.values()).filter(ticket => ticket.status === status);
  }

  // Get tickets by priority
  getTicketsByPriority(priority: PriorityLevel): EnhancedTicket[] {
    return Array.from(this.tickets.values()).filter(ticket => ticket.priority === priority);
  }

  // Search tickets
  searchTickets(query: string): EnhancedTicket[] {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.tickets.values()).filter(ticket => 
      ticket.subject.toLowerCase().includes(lowercaseQuery) ||
      ticket.description.toLowerCase().includes(lowercaseQuery) ||
      ticket.ticketId.toLowerCase().includes(lowercaseQuery) ||
      ticket.contactEmail.toLowerCase().includes(lowercaseQuery) ||
      ticket.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Get ticket statistics
  getTicketStats(): {
    total: number;
    byStatus: Record<TicketStatus, number>;
    byPriority: Record<PriorityLevel, number>;
  } {
    const tickets = this.getAllTickets();
    const byStatus = {} as Record<TicketStatus, number>;
    const byPriority = {} as Record<PriorityLevel, number>;

    tickets.forEach(ticket => {
      byStatus[ticket.status] = (byStatus[ticket.status] || 0) + 1;
      byPriority[ticket.priority] = (byPriority[ticket.priority] || 0) + 1;
    });

    return {
      total: tickets.length,
      byStatus,
      byPriority,
    };
  }
}

// Export singleton instance
export const ticketStorage = new TicketStorage();