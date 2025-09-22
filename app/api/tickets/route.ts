import { NextRequest, NextResponse } from "next/server";

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

    // Create ticket object
    const ticket: TicketSubmission = {
      ticketId,
      subject: body.subject,
      category: body.category,
      priority: body.priority || 'medium',
      description: body.description,
      serverInfo: body.serverInfo || {},
      contactEmail: body.contactEmail,
      discordUsername: body.discordUsername,
      submittedAt: new Date().toISOString(),
    };

    // Here you would typically:
    // 1. Save to database
    // await saveTicketToDatabase(ticket);
    
    // 2. Send email notification to user
    // await sendConfirmationEmail(ticket);
    
    // 3. Notify support team (Discord webhook, email, etc.)
    // await notifySupportTeam(ticket);

    // For now, we'll just log it (in production, remove this)
    console.log('New support ticket submitted:', {
      ticketId: ticket.ticketId,
      subject: ticket.subject,
      category: ticket.category,
      priority: ticket.priority,
      email: ticket.contactEmail
    });

    // Send Discord webhook notification if configured
    const discordWebhookUrl = process.env.DISCORD_SUPPORT_WEBHOOK_URL;
    if (discordWebhookUrl) {
      try {
        const webhookPayload = {
          embeds: [{
            title: "🎫 New Support Ticket",
            color: ticket.priority === 'urgent' ? 0xFF0000 : 
                   ticket.priority === 'high' ? 0xFF8C00 :
                   ticket.priority === 'medium' ? 0xFFD700 : 0x00FF00,
            fields: [
              { name: "Ticket ID", value: ticket.ticketId, inline: true },
              { name: "Category", value: ticket.category, inline: true },
              { name: "Priority", value: ticket.priority, inline: true },
              { name: "Subject", value: ticket.subject, inline: false },
              { name: "Email", value: ticket.contactEmail, inline: true },
              { name: "Discord", value: ticket.discordUsername || "Not provided", inline: true },
              ...(ticket.serverInfo.serverId ? [{ name: "Server ID", value: ticket.serverInfo.serverId, inline: true }] : []),
              { name: "Description", value: ticket.description.length > 1000 ? ticket.description.substring(0, 1000) + "..." : ticket.description, inline: false }
            ],
            timestamp: ticket.submittedAt,
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
      ticketId: ticket.ticketId,
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

// Handle GET requests (could return ticket status if you have a ticket ID)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('ticketId');

  if (!ticketId) {
    return NextResponse.json(
      { error: 'Ticket ID is required' },
      { status: 400 }
    );
  }

  // In a real app, you would fetch from database
  // const ticket = await getTicketFromDatabase(ticketId);

  return NextResponse.json({
    message: 'Ticket lookup not implemented yet',
    ticketId
  });
}