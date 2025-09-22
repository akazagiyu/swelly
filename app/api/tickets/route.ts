import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { isAdmin, ADMIN_CONFIG, TicketStatus, PriorityLevel } from "@/lib/adminConfig";
import { ticketStorage, EnhancedTicket } from "@/lib/ticketStorage";
import { sendTicketConfirmation, sendAdminNotification, sendTicketStatusUpdate, sendTicketResponse } from "@/lib/emailService";

export interface TicketSubmission {
  subject: string;
  category: string;
  priority: string;
  description: string;
  serverInfo: {
    serverId?: string;
    serverName?: string;
    userCount?: string;
  };
  contactEmail: string;
  discordUsername?: string;
  submittedAt: string;
  ticketId: string;
}

// In a real application, you would:
// 1. Save to a database
// 2. Send notification emails
// 3. Integrate with a ticketing system (like Zendesk, Freshdesk, etc.)
// 4. Send Discord webhook notifications to your support team

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['subject', 'category', 'description', 'contactEmail'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.contactEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate a unique ticket ID
    const ticketId = `SWL-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create enhanced ticket object
    const enhancedTicket: EnhancedTicket = {
      ticketId,
      subject: body.subject,
      category: body.category,
      priority: (body.priority || 'medium') as PriorityLevel,
      status: ADMIN_CONFIG.TICKET_STATUS.OPEN,
      description: body.description,
      serverInfo: body.serverInfo || {},
      contactEmail: body.contactEmail,
      discordUsername: body.discordUsername,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [],
      tags: [],
    };

    // Save ticket to storage
    ticketStorage.saveTicket(enhancedTicket);

    // Here you would typically:
    // 1. Save to database ✅ Now saved to ticketStorage
    
    // 2. Send email notification to user ✅ Now implemented
    try {
      await sendTicketConfirmation({
        ticketId: enhancedTicket.ticketId,
        subject: enhancedTicket.subject,
        category: enhancedTicket.category,
        priority: enhancedTicket.priority,
        description: enhancedTicket.description,
        contactEmail: enhancedTicket.contactEmail,
        submittedAt: enhancedTicket.submittedAt,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }
    
    // 3. Notify support team (Discord webhook, email, etc.) ✅ Enhanced
    try {
      await sendAdminNotification({
        ticketId: enhancedTicket.ticketId,
        subject: enhancedTicket.subject,
        category: enhancedTicket.category,
        priority: enhancedTicket.priority,
        description: enhancedTicket.description,
        contactEmail: enhancedTicket.contactEmail,
        submittedAt: enhancedTicket.submittedAt,
      });
    } catch (emailError) {
      console.error('Failed to send admin notification email:', emailError);
      // Don't fail the request if email fails
    }

    // For now, we'll just log it (in production, remove this)
    console.log('New support ticket submitted:', {
      ticketId: enhancedTicket.ticketId,
      subject: enhancedTicket.subject,
      category: enhancedTicket.category,
      priority: enhancedTicket.priority,
      email: enhancedTicket.contactEmail
    });

    // Send Discord webhook notification if configured
    const discordWebhookUrl = process.env.DISCORD_SUPPORT_WEBHOOK_URL;
    if (discordWebhookUrl) {
      try {
        const webhookPayload = {
          embeds: [{
            title: "🎫 New Support Ticket",
            color: enhancedTicket.priority === 'urgent' ? 0xFF0000 : 
                   enhancedTicket.priority === 'high' ? 0xFF8C00 :
                   enhancedTicket.priority === 'medium' ? 0xFFD700 : 0x00FF00,
            fields: [
              { name: "Ticket ID", value: enhancedTicket.ticketId, inline: true },
              { name: "Category", value: enhancedTicket.category, inline: true },
              { name: "Priority", value: enhancedTicket.priority, inline: true },
              { name: "Subject", value: enhancedTicket.subject, inline: false },
              { name: "Email", value: enhancedTicket.contactEmail, inline: true },
              { name: "Discord", value: enhancedTicket.discordUsername || "Not provided", inline: true },
              ...(enhancedTicket.serverInfo.serverId ? [{ name: "Server ID", value: enhancedTicket.serverInfo.serverId, inline: true }] : []),
              { name: "Description", value: enhancedTicket.description.length > 1000 ? enhancedTicket.description.substring(0, 1000) + "..." : enhancedTicket.description, inline: false }
            ],
            timestamp: enhancedTicket.submittedAt,
            footer: { text: "Swelly Support System" }
          }]
        };

        await fetch(discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookPayload)
        });
      } catch (webhookError) {
        console.error('Failed to send Discord webhook:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    return NextResponse.json({
      success: true,
      ticketId: enhancedTicket.ticketId,
      message: 'Ticket submitted successfully. You will receive a confirmation email shortly.'
    });

  } catch (error) {
    console.error('Error processing ticket submission:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle GET requests - return ticket details or admin ticket list
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('ticketId');
  const action = searchParams.get('action');
  
  // Check for admin actions
  if (action === 'admin-list' || action === 'stats') {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !isAdmin(session.user.id)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    if (action === 'admin-list') {
      const status = searchParams.get('status') as TicketStatus | null;
      const priority = searchParams.get('priority') as PriorityLevel | null;
      const search = searchParams.get('search');

      let tickets = ticketStorage.getAllTickets();

      if (status) {
        tickets = ticketStorage.getTicketsByStatus(status);
      }
      if (priority) {
        tickets = tickets.filter(t => t.priority === priority);
      }
      if (search) {
        tickets = ticketStorage.searchTickets(search);
      }

      return NextResponse.json({
        success: true,
        tickets: tickets.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()),
        total: tickets.length
      });
    }

    if (action === 'stats') {
      const stats = ticketStorage.getTicketStats();
      return NextResponse.json({
        success: true,
        stats
      });
    }
  }

  // Regular ticket lookup
  if (!ticketId) {
    return NextResponse.json(
      { error: 'Ticket ID is required' },
      { status: 400 }
    );
  }

  const ticket = ticketStorage.getTicket(ticketId);
  if (!ticket) {
    return NextResponse.json(
      { error: 'Ticket not found' },
      { status: 404 }
    );
  }

  // Return public ticket info (hide sensitive admin data for non-admin users)
  const publicTicket = {
    ticketId: ticket.ticketId,
    subject: ticket.subject,
    category: ticket.category,
    priority: ticket.priority,
    status: ticket.status,
    submittedAt: ticket.submittedAt,
    updatedAt: ticket.updatedAt,
    responses: ticket.responses,
  };

  return NextResponse.json({
    success: true,
    ticket: publicTicket
  });
}

// Handle PATCH requests for admin ticket updates
export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isAdmin(session.user.id)) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin access required.' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { ticketId, action, data } = body;

    if (!ticketId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: ticketId, action' },
        { status: 400 }
      );
    }

    const ticket = ticketStorage.getTicket(ticketId);
    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    let success = false;
    let message = '';

    switch (action) {
      case 'update-status':
        if (!data.status || !Object.values(ADMIN_CONFIG.TICKET_STATUS).includes(data.status)) {
          return NextResponse.json(
            { error: 'Invalid status' },
            { status: 400 }
          );
        }
        success = ticketStorage.updateTicketStatus(ticketId, data.status, session.user.id);
        message = `Ticket status updated to ${data.status}`;
        
        // Send email notification for status update
        if (success) {
          try {
            await sendTicketStatusUpdate({
              ticketId: ticket.ticketId,
              subject: ticket.subject,
              newStatus: data.status,
              updatedBy: session.user.name || session.user.id,
              contactEmail: ticket.contactEmail,
            });
          } catch (emailError) {
            console.error('Failed to send status update email:', emailError);
          }
        }
        break;

      case 'update-priority':
        if (!data.priority || !Object.values(ADMIN_CONFIG.PRIORITY_LEVELS).includes(data.priority)) {
          return NextResponse.json(
            { error: 'Invalid priority' },
            { status: 400 }
          );
        }
        success = ticketStorage.updateTicketPriority(ticketId, data.priority);
        message = `Ticket priority updated to ${data.priority}`;
        break;

      case 'add-response':
        if (!data.message) {
          return NextResponse.json(
            { error: 'Response message is required' },
            { status: 400 }
          );
        }
        success = ticketStorage.addResponse(ticketId, {
          message: data.message,
          author: session.user.name || session.user.id,
          authorType: 'admin'
        });
        message = 'Response added successfully';
        
        // Send email notification for new response
        if (success) {
          try {
            await sendTicketResponse({
              ticketId: ticket.ticketId,
              subject: ticket.subject,
              response: data.message,
              respondedBy: session.user.name || session.user.id,
              contactEmail: ticket.contactEmail,
            });
          } catch (emailError) {
            console.error('Failed to send response email:', emailError);
          }
        }
        break;

      case 'add-tags':
        if (!data.tags || !Array.isArray(data.tags)) {
          return NextResponse.json(
            { error: 'Tags array is required' },
            { status: 400 }
          );
        }
        success = ticketStorage.addTicketTags(ticketId, data.tags);
        message = 'Tags added successfully';
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update ticket' },
        { status: 500 }
      );
    }

    const updatedTicket = ticketStorage.getTicket(ticketId);
    return NextResponse.json({
      success: true,
      message,
      ticket: updatedTicket
    });

  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle DELETE requests for admin ticket deletion
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isAdmin(session.user.id)) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin access required.' },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('ticketId');

  if (!ticketId) {
    return NextResponse.json(
      { error: 'Ticket ID is required' },
      { status: 400 }
    );
  }

  const ticket = ticketStorage.getTicket(ticketId);
  if (!ticket) {
    return NextResponse.json(
      { error: 'Ticket not found' },
      { status: 404 }
    );
  }

  const success = ticketStorage.removeTicket(ticketId);
  if (!success) {
    return NextResponse.json(
      { error: 'Failed to delete ticket' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Ticket deleted successfully'
  });
}