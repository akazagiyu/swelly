import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Check if Resend is configured
const isEmailConfigured = () => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Email notifications will be skipped.');
    return false;
  }
  return true;
};

// Get the from email address
const getFromEmail = () => {
  return process.env.RESEND_FROM_EMAIL || 'noreply@yourdomain.com';
};

// Email templates
export const emailTemplates = {
  ticketConfirmation: (data: {
    ticketId: string;
    subject: string;
    category: string;
    priority: string;
    description: string;
    contactEmail: string;
    submittedAt: string;
  }) => ({
    subject: `Support Ticket Created - ${data.ticketId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Support Ticket Confirmation</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #5865F2 0%, #7289DA 100%); color: white; padding: 2rem; text-align: center; }
          .header h1 { margin: 0; font-size: 1.5rem; }
          .content { padding: 2rem; }
          .ticket-info { background: #f8f9fa; border-left: 4px solid #5865F2; padding: 1rem; margin: 1rem 0; }
          .ticket-id { background: #e7f3ff; border: 1px solid #b3d7ff; padding: 0.75rem; border-radius: 4px; font-family: monospace; font-weight: bold; text-align: center; margin: 1rem 0; }
          .footer { background: #f8f9fa; padding: 1rem 2rem; border-top: 1px solid #e9ecef; font-size: 0.9rem; color: #666; }
          .button { display: inline-block; background: #5865F2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 1rem 0; }
          .status-badge { display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: bold; }
          .priority-high { background: #fee2e2; color: #dc2626; }
          .priority-medium { background: #fef3c7; color: #d97706; }
          .priority-low { background: #dcfce7; color: #16a34a; }
          .priority-urgent { background: #fecaca; color: #b91c1c; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎫 Support Ticket Created</h1>
            <p>Your support request has been received</p>
          </div>
          
          <div class="content">
            <h2>Hello!</h2>
            <p>Thank you for contacting Swelly support. We've received your ticket and our team will review it shortly.</p>
            
            <div class="ticket-id">
              Ticket ID: ${data.ticketId}
            </div>
            
            <div class="ticket-info">
              <h3>Ticket Details:</h3>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>Category:</strong> ${data.category}</p>
              <p><strong>Priority:</strong> <span class="status-badge priority-${data.priority}">${data.priority.toUpperCase()}</span></p>
              <p><strong>Submitted:</strong> ${new Date(data.submittedAt).toLocaleString()}</p>
              <p><strong>Description:</strong></p>
              <p style="background: white; padding: 1rem; border-radius: 4px; border: 1px solid #e9ecef;">${data.description}</p>
            </div>
            
            <h3>What happens next?</h3>
            <ul>
              <li>Our support team will review your ticket within 24 hours</li>
              <li>You'll receive email updates when there are responses or status changes</li>
              <li>You can track your ticket status anytime using the ticket ID</li>
            </ul>
            
            <a href="${process.env.NEXTAUTH_URL}/ticket-status?id=${data.ticketId}" class="button">
              Track Your Ticket
            </a>
            
            <p>If you have any urgent questions, you can also reach us on our <a href="https://discord.gg/swelly">Discord server</a>.</p>
          </div>
          
          <div class="footer">
            <p>This is an automated message from Swelly Support.</p>
            <p>© 2025 Swelly. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Support Ticket Created - ${data.ticketId}

Hello!

Thank you for contacting Swelly support. We've received your ticket and our team will review it shortly.

Ticket ID: ${data.ticketId}

Ticket Details:
- Subject: ${data.subject}
- Category: ${data.category}
- Priority: ${data.priority.toUpperCase()}
- Submitted: ${new Date(data.submittedAt).toLocaleString()}
- Description: ${data.description}

What happens next?
- Our support team will review your ticket within 24 hours
- You'll receive email updates when there are responses or status changes
- You can track your ticket status anytime using the ticket ID

Track your ticket: ${process.env.NEXTAUTH_URL}/ticket-status?id=${data.ticketId}

If you have any urgent questions, you can also reach us on our Discord server.

This is an automated message from Swelly Support.
© 2025 Swelly. All rights reserved.
    `
  }),

  ticketStatusUpdate: (data: {
    ticketId: string;
    subject: string;
    newStatus: string;
    updatedBy: string;
    contactEmail: string;
  }) => ({
    subject: `Ticket Status Updated - ${data.ticketId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ticket Status Update</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #5865F2 0%, #7289DA 100%); color: white; padding: 2rem; text-align: center; }
          .content { padding: 2rem; }
          .status-update { background: #e7f3ff; border: 1px solid #b3d7ff; padding: 1rem; border-radius: 4px; margin: 1rem 0; text-align: center; }
          .footer { background: #f8f9fa; padding: 1rem 2rem; border-top: 1px solid #e9ecef; font-size: 0.9rem; color: #666; }
          .button { display: inline-block; background: #5865F2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 1rem 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📬 Ticket Status Updated</h1>
          </div>
          
          <div class="content">
            <h2>Your ticket status has been updated</h2>
            
            <div class="status-update">
              <p><strong>Ticket ID:</strong> ${data.ticketId}</p>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>New Status:</strong> <strong>${data.newStatus.replace('-', ' ').toUpperCase()}</strong></p>
              <p><strong>Updated by:</strong> ${data.updatedBy}</p>
            </div>
            
            <a href="${process.env.NEXTAUTH_URL}/ticket-status?id=${data.ticketId}" class="button">
              View Ticket Details
            </a>
          </div>
          
          <div class="footer">
            <p>This is an automated message from Swelly Support.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Ticket Status Updated - ${data.ticketId}

Your ticket status has been updated.

Ticket ID: ${data.ticketId}
Subject: ${data.subject}
New Status: ${data.newStatus.replace('-', ' ').toUpperCase()}
Updated by: ${data.updatedBy}

View ticket details: ${process.env.NEXTAUTH_URL}/ticket-status?id=${data.ticketId}

This is an automated message from Swelly Support.
    `
  }),

  ticketResponse: (data: {
    ticketId: string;
    subject: string;
    response: string;
    respondedBy: string;
    contactEmail: string;
  }) => ({
    subject: `New Response to Your Ticket - ${data.ticketId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Ticket Response</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #5865F2 0%, #7289DA 100%); color: white; padding: 2rem; text-align: center; }
          .content { padding: 2rem; }
          .response { background: #f8f9fa; border-left: 4px solid #5865F2; padding: 1rem; margin: 1rem 0; }
          .footer { background: #f8f9fa; padding: 1rem 2rem; border-top: 1px solid #e9ecef; font-size: 0.9rem; color: #666; }
          .button { display: inline-block; background: #5865F2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 1rem 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💬 New Response to Your Ticket</h1>
          </div>
          
          <div class="content">
            <h2>Our team has responded to your ticket</h2>
            <p><strong>Ticket ID:</strong> ${data.ticketId}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            
            <div class="response">
              <p><strong>Response from ${data.respondedBy}:</strong></p>
              <p>${data.response}</p>
            </div>
            
            <a href="${process.env.NEXTAUTH_URL}/ticket-status?id=${data.ticketId}" class="button">
              View Full Conversation
            </a>
          </div>
          
          <div class="footer">
            <p>This is an automated message from Swelly Support.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
New Response to Your Ticket - ${data.ticketId}

Our team has responded to your ticket.

Ticket ID: ${data.ticketId}
Subject: ${data.subject}

Response from ${data.respondedBy}:
${data.response}

View full conversation: ${process.env.NEXTAUTH_URL}/ticket-status?id=${data.ticketId}

This is an automated message from Swelly Support.
    `
  })
};

// Email sending functions
export const sendEmail = async (to: string, template: { subject: string; html: string; text: string }) => {
  if (!isEmailConfigured()) {
    console.log(`Email would be sent to ${to}: ${template.subject}`);
    return { success: false, error: 'Resend not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Swelly Support <${getFromEmail()}>`,
      to: [to],
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (error) {
      console.error('Resend API error:', error);
      return { success: false, error: error.message };
    }

    console.log('Email sent successfully via Resend:', data?.id);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const sendTicketConfirmation = async (ticketData: {
  ticketId: string;
  subject: string;
  category: string;
  priority: string;
  description: string;
  contactEmail: string;
  submittedAt: string;
}) => {
  const template = emailTemplates.ticketConfirmation(ticketData);
  return await sendEmail(ticketData.contactEmail, template);
};

export const sendTicketStatusUpdate = async (updateData: {
  ticketId: string;
  subject: string;
  newStatus: string;
  updatedBy: string;
  contactEmail: string;
}) => {
  const template = emailTemplates.ticketStatusUpdate(updateData);
  return await sendEmail(updateData.contactEmail, template);
};

export const sendTicketResponse = async (responseData: {
  ticketId: string;
  subject: string;
  response: string;
  respondedBy: string;
  contactEmail: string;
}) => {
  const template = emailTemplates.ticketResponse(responseData);
  return await sendEmail(responseData.contactEmail, template);
};

// Admin notification email
export const sendAdminNotification = async (ticketData: {
  ticketId: string;
  subject: string;
  category: string;
  priority: string;
  description: string;
  contactEmail: string;
  submittedAt: string;
}) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.log('Admin email not configured, skipping admin notification');
    return { success: false, error: 'Admin email not configured' };
  }

  const template = {
    subject: `New Support Ticket: ${ticketData.subject} [${ticketData.ticketId}]`,
    html: `
      <h2>New Support Ticket Submitted</h2>
      <p><strong>Ticket ID:</strong> ${ticketData.ticketId}</p>
      <p><strong>Subject:</strong> ${ticketData.subject}</p>
      <p><strong>Category:</strong> ${ticketData.category}</p>
      <p><strong>Priority:</strong> ${ticketData.priority}</p>
      <p><strong>Contact:</strong> ${ticketData.contactEmail}</p>
      <p><strong>Submitted:</strong> ${new Date(ticketData.submittedAt).toLocaleString()}</p>
      <p><strong>Description:</strong></p>
      <blockquote>${ticketData.description}</blockquote>
      <p><a href="${process.env.NEXTAUTH_URL}/admin/tickets">View in Admin Dashboard</a></p>
    `,
    text: `
New Support Ticket Submitted

Ticket ID: ${ticketData.ticketId}
Subject: ${ticketData.subject}
Category: ${ticketData.category}
Priority: ${ticketData.priority}
Contact: ${ticketData.contactEmail}
Submitted: ${new Date(ticketData.submittedAt).toLocaleString()}

Description:
${ticketData.description}

View in Admin Dashboard: ${process.env.NEXTAUTH_URL}/admin/tickets
    `
  };

  return await sendEmail(adminEmail, template);
};