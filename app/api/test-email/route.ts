import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { isAdmin } from "@/lib/adminConfig";
import { sendEmail } from "@/lib/emailService";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isAdmin(session.user.id)) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin access required.' },
      { status: 403 }
    );
  }

  try {
    const { testEmail } = await request.json();
    
    if (!testEmail) {
      return NextResponse.json(
        { error: 'Test email address is required' },
        { status: 400 }
      );
    }

    const testTemplate = {
      subject: 'Swelly Email Service Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #5865F2 0%, #7289DA 100%); color: white; padding: 2rem; text-align: center;">
            <h1>✅ Email Service Test</h1>
          </div>
          <div style="padding: 2rem;">
            <h2>Congratulations!</h2>
            <p>Your Resend email service is configured correctly and working properly.</p>
            <p><strong>Test Details:</strong></p>
            <ul>
              <li>Sent from: Swelly Support System</li>
              <li>Service: Resend API</li>
              <li>Time: ${new Date().toLocaleString()}</li>
              <li>Admin: ${session.user.name || session.user.id}</li>
            </ul>
            <p>You can now receive:</p>
            <ul>
              <li>✅ Ticket confirmation emails</li>
              <li>✅ Status update notifications</li>
              <li>✅ Response notifications</li>
              <li>✅ Admin notifications</li>
            </ul>
          </div>
          <div style="background: #f8f9fa; padding: 1rem; text-align: center; color: #666;">
            <p>This is a test email from the Swelly Support System</p>
          </div>
        </div>
      `,
      text: `
Email Service Test - Swelly Support

Congratulations! Your Resend email service is configured correctly and working properly.

Test Details:
- Sent from: Swelly Support System
- Service: Resend API
- Time: ${new Date().toLocaleString()}
- Admin: ${session.user.name || session.user.id}

You can now receive:
✅ Ticket confirmation emails
✅ Status update notifications  
✅ Response notifications
✅ Admin notifications

This is a test email from the Swelly Support System.
      `
    };

    const result = await sendEmail(testEmail, testTemplate);
    
    return NextResponse.json({
      success: result.success,
      message: result.success 
        ? 'Test email sent successfully! Check your inbox.' 
        : 'Failed to send test email. Check your Resend configuration.',
      error: result.error,
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error in email test:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}