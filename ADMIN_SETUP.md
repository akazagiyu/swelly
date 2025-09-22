# Admin Ticket Management System

## Overview

The Swelly website now includes a comprehensive admin ticket management system that allows designated administrators to:

- View all support tickets
- Update ticket status and priority
- Respond to tickets
- Add tags for organization
- Delete tickets
- View ticket statistics
- Search and filter tickets

## Setup Instructions

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Discord Owner UID for Admin Access
OWNER_DISCORD_UID=your_discord_user_id_here

# For client-side admin check (optional, for navbar display)
NEXT_PUBLIC_OWNER_DISCORD_UID=your_discord_user_id_here

# Resend Email Service (for ticket notifications)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Admin Email for notifications (optional)
ADMIN_EMAIL=admin@yourdomain.com

# Discord Webhook for Support Notifications (optional)
DISCORD_SUPPORT_WEBHOOK_URL=your_discord_webhook_url_here
```

### 2. Getting Your Discord User ID

1. Open Discord and enable Developer Mode:
   - Go to Settings → Advanced → Enable Developer Mode
2. Right-click on your profile/username
3. Select "Copy User ID"
4. Paste this ID into your environment variables

### 3. Resend Email Setup

1. **Sign up for Resend:**
   - Go to [resend.com](https://resend.com)
   - Create an account and verify your email

2. **Get API Key:**
   - Go to your Resend dashboard
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key to `RESEND_API_KEY` in your `.env.local`

3. **Set up domain (optional but recommended):**
   - Add your domain in Resend dashboard
   - Verify DNS records
   - Use your domain email in `RESEND_FROM_EMAIL` (e.g., `support@yourdomain.com`)
   - If no custom domain, use `noreply@resend.dev` (default)

4. **Configure notifications:**
   - Set `ADMIN_EMAIL` to receive new ticket notifications
   - All users automatically get email confirmations and updates

### 4. Admin Access

Once configured:
- Only users with the specified Discord UID can access admin features
- Admin users will see an "Admin" link in the navigation bar
- Admin dashboard is accessible at `/admin/tickets`

## Features

### Admin Dashboard (`/admin/tickets`)

**Statistics Overview:**
- Total tickets count
- Tickets by status (open, in-progress, waiting-for-user, resolved, closed)
- Tickets by priority (low, medium, high, urgent)
- High priority ticket count

**Ticket Management:**
- View all tickets in a sortable list
- Filter by status, priority, or search terms
- Click on any ticket to view details

**Individual Ticket Actions:**
- Update ticket status (open → in-progress → resolved → closed)
- Change ticket priority (low, medium, high, urgent)
- Add admin responses to tickets
- Add tags for organization
- Delete tickets (with confirmation)

### API Endpoints

**Admin Endpoints (require authentication):**

- `GET /api/tickets?action=admin-list` - Get all tickets (with filters)
- `GET /api/tickets?action=stats` - Get ticket statistics
- `PATCH /api/tickets` - Update ticket (status, priority, responses, tags)
- `DELETE /api/tickets?ticketId=X` - Delete a ticket

**Public Endpoints:**

- `POST /api/tickets` - Submit new ticket
- `GET /api/tickets?ticketId=X` - Get public ticket details

### Security

- Middleware protection on `/admin/*` routes
- Server-side authentication checks for admin API endpoints
- Client-side admin status verification
- Unauthorized access redirects to home page

## Ticket Workflow

1. **User submits ticket** via support form
2. **Ticket appears in admin dashboard** with "open" status
3. **Admin can update status** to "in-progress" when working on it
4. **Admin can add responses** to communicate with user
5. **Status can be updated** to "waiting-for-user" if user action needed
6. **Finally marked as "resolved"** when issue is fixed
7. **Can be "closed"** when completely finished

## Data Storage

Currently uses in-memory storage for demonstration. In production, you should:

1. Replace `lib/ticketStorage.ts` with database operations
2. Implement proper data persistence
3. Add email notifications
4. Set up Discord webhook notifications
5. Add file attachment support

## Admin Permission Management

To add additional admins:

1. Get their Discord User IDs
2. Update `lib/adminConfig.ts`:

```typescript
OWNER_UIDS: [
  process.env.OWNER_DISCORD_UID,
  "additional_admin_discord_uid_here",
  "another_admin_discord_uid",
]
```

### Email Notifications

**Automatic Email Features:**

1. **Ticket Confirmation Email:**
   - Sent immediately when user submits a ticket
   - Includes ticket ID, details, and tracking link
   - Professional HTML template with Swelly branding

2. **Status Update Notifications:**
   - Sent when admin changes ticket status
   - Notifies user of progress updates
   - Includes current status and admin who made the change

3. **Response Notifications:**
   - Sent when admin responds to ticket
   - Includes the full response message
   - Link to view full conversation

4. **Admin Notifications:**
   - New ticket alerts sent to `ADMIN_EMAIL`
   - Includes all ticket details for quick review
   - Direct link to admin dashboard

**Email Templates:**
- Mobile-responsive HTML emails
- Consistent branding with Swelly colors
- Professional styling with proper typography
- Plain text fallbacks for all templates
- Accessible design with proper contrast

### Discord Notifications

When `DISCORD_SUPPORT_WEBHOOK_URL` is configured:
- New tickets automatically post to Discord channel
- Includes ticket details, priority, and category
- Color-coded by priority level
- Direct link to admin dashboard (when implemented)

## Development Notes

- Admin status check uses environment variable comparison
- All admin API routes are protected with authentication middleware
- Client-side components gracefully handle unauthorized access
- Responsive design works on mobile and desktop
- Real-time updates when multiple admins are working simultaneously