# 📧 Resend Email Setup Guide for Swelly

## Quick Setup (5 minutes)

### 1. Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address

### 2. Get API Key
1. In your Resend dashboard, click **"API Keys"**
2. Click **"Create API Key"**
3. Name it "Swelly Support" 
4. Copy the API key (starts with `re_`)

### 3. Add to Environment Variables
Add to your `.env.local` file:

```env
# Resend Email Configuration
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@resend.dev
ADMIN_EMAIL=your_admin_email@example.com
```

### 4. Test Email Service
1. Start your development server: `npm run dev`
2. Sign in as admin and go to `/admin/tickets`
3. Click **"Test Email"** button
4. Enter your email address
5. Check your inbox for the test email

---

## Advanced Setup (Custom Domain)

### Why Use a Custom Domain?
- Better email deliverability
- Professional appearance (`support@yourdomain.com`)
- Higher trust from email providers
- Custom branding

### Setup Steps:

#### 1. Add Domain in Resend
1. Go to **Domains** in Resend dashboard
2. Click **"Add Domain"**
3. Enter your domain (e.g., `yourdomain.com`)

#### 2. Configure DNS Records
Add these DNS records to your domain provider:

```
Type: MX
Name: @
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10

Type: TXT
Name: @
Value: "v=spf1 include:amazonses.com ~all"

Type: CNAME
Name: [provided_by_resend]
Value: [provided_by_resend]
```

#### 3. Update Environment Variables
```env
RESEND_FROM_EMAIL=support@yourdomain.com
# or
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

#### 4. Verify Domain
- Wait for DNS propagation (can take up to 48 hours)
- Resend will automatically verify your domain
- Green checkmark indicates successful verification

---

## Email Features Included

### ✅ Automatic Emails

**1. Ticket Confirmation (User)**
- Sent immediately when ticket is submitted
- Contains ticket ID for tracking
- Professional HTML template
- Plain text fallback

**2. Status Updates (User)**
- Sent when admin changes ticket status
- Shows old → new status
- Includes admin who made the change

**3. Response Notifications (User)**
- Sent when admin responds to ticket
- Includes full response message
- Link to view ticket details

**4. Admin Notifications (Admin)**
- Sent to `ADMIN_EMAIL` for new tickets
- Contains all ticket details
- Direct link to admin dashboard

### 📧 Email Template Features
- **Mobile Responsive**: Works on all devices
- **Swelly Branding**: Consistent colors and styling
- **Professional Design**: Clean, readable layout
- **Accessibility**: Proper contrast and structure
- **Tracking Links**: Direct links to ticket status
- **Rich Formatting**: HTML with fallback text

---

## Troubleshooting

### Email Not Sending?

**Check API Key:**
```bash
# Test in browser console or API tool
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"from":"test@resend.dev","to":"your-email@example.com","subject":"Test","text":"Test email"}'
```

**Common Issues:**
1. **Invalid API Key**: Make sure it starts with `re_`
2. **Domain Not Verified**: Use `noreply@resend.dev` while setting up custom domain
3. **Environment Variables**: Restart dev server after adding `.env.local`
4. **Email in Spam**: Check spam folder, especially for first emails

**Debug Steps:**
1. Use the **"Test Email"** button in admin dashboard
2. Check browser console for error messages
3. Check server logs for Resend API responses
4. Verify email address is valid

### Custom Domain Issues?

**DNS Not Propagating:**
- Use [DNS Checker](https://dnschecker.org) to verify records
- Wait up to 48 hours for global propagation
- Contact your domain provider if records aren't updating

**Domain Not Verifying:**
- Double-check all DNS records match exactly
- Some providers require trailing dots in values
- MX record priority should be 10

---

## Environment Variables Reference

```env
# Required
RESEND_API_KEY=re_your_api_key_here

# Email addresses
RESEND_FROM_EMAIL=support@yourdomain.com  # Custom domain
# OR
RESEND_FROM_EMAIL=noreply@resend.dev      # Default (for testing)

# Admin notifications
ADMIN_EMAIL=admin@yourdomain.com

# Discord admin access (separate from email)
OWNER_DISCORD_UID=your_discord_user_id
NEXT_PUBLIC_OWNER_DISCORD_UID=your_discord_user_id
```

---

## Production Checklist

- [ ] Resend account created and verified
- [ ] API key generated and added to environment
- [ ] Custom domain added and verified (recommended)
- [ ] Test email sent successfully
- [ ] Admin email notifications working
- [ ] User confirmation emails working
- [ ] Status update emails working
- [ ] Response notification emails working
- [ ] Emails not going to spam folder
- [ ] Mobile email formatting verified

---

## Resend Pricing

**Free Tier:**
- 100 emails/day
- 3,000 emails/month
- Perfect for small projects

**Pro Tier ($20/month):**
- 50,000 emails/month
- Analytics and insights
- Custom domains
- Priority support

For most Swelly instances, the free tier is sufficient. Upgrade when you exceed the limits.

---

## Support

**Resend Support:**
- [Resend Documentation](https://resend.com/docs)
- [Resend Support](https://resend.com/support)

**Swelly Email Issues:**
- Check admin dashboard email test
- Review server logs for errors
- Verify environment variables
- Test with different email providers