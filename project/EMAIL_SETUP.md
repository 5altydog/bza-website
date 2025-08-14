# Email Booking System Setup Guide

Your flight school website now sends beautiful HTML emails to `ted@flybz.net` whenever someone submits a booking form.

## 📧 Email Service Setup

### Step 1: Create Resend Account

1. Go to https://resend.com and sign up for a free account
2. Free tier includes 3,000 emails/month and 100 emails/day
3. Verify your email address

### Step 2: Add Your Domain (Recommended)

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain** 
3. Add `flybz.net` (your domain)
4. Follow DNS setup instructions to verify domain
5. This allows emails to come from `noreply@flybz.net` instead of Resend's domain

### Step 3: Get API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it "Flight School Bookings" 
4. Copy the API key (starts with `re_`)

### Step 4: Configure Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Edge Functions** 
3. Click **Environment Variables**
4. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (paste the `re_` key)

### Step 5: Deploy the Edge Function

1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link your project: `supabase link --project-ref your-project-id`
4. Deploy the function:
   ```bash
   supabase functions deploy send-booking-email
   ```

## 📨 What Happens When Someone Books

### Email Content Includes:
- **Customer Information**: Name, email, phone, experience level
- **Flight Details**: Aircraft selected, preferred date/time
- **Professional Formatting**: Beautiful HTML email with your branding
- **Next Steps**: Reminder to contact customer within 24 hours

### Email Subject:
`🛩️ New Discovery Flight Request - [Aircraft Name] - [Customer Name]`

### Example:
`🛩️ New Discovery Flight Request - Cessna 172S G1000 - John Smith`

## 🧪 Testing

### Test Booking Flow:
1. Go to your website: `http://localhost:5178`
2. Click on any aircraft card
3. Fill out and submit the booking form
4. Check `ted@flybz.net` for the email

### Console Logging:
- Open browser console (F12) when testing
- Look for "Email sent successfully" or error messages
- Check Supabase **Edge Functions** logs for any issues

## 🔧 Customization Options

### Change Recipient Email:
In `supabase/functions/send-booking-email/index.ts`, line 106:
```typescript
to: ['your-new-email@example.com'],
```

### Modify Email Template:
- Edit the `htmlContent` variable in the function
- Change colors, layout, or add your logo
- Update sender name/email in the `from` field

### Add Multiple Recipients:
```typescript
to: ['ted@flybz.net', 'manager@flybz.net', 'instructor@flybz.net'],
```

## 📊 Email Analytics

### Resend Dashboard Shows:
- Email delivery status
- Open rates and click rates
- Bounce and complaint rates
- Delivery logs and errors

### Supabase Logs Show:
- Function execution logs
- Any errors in email sending
- Performance metrics

## 🚨 Troubleshooting

### Email Not Received:
1. Check spam/junk folder
2. Verify Resend API key is correct
3. Check Supabase Edge Function logs
4. Ensure function is properly deployed

### Function Errors:
1. Check environment variable is set in Supabase
2. Verify Resend account is active
3. Check domain verification status
4. Review function logs in Supabase dashboard

### Common Issues:
- **Domain not verified**: Emails may be marked as spam
- **API key expired**: Generate new key in Resend
- **Rate limits**: Free tier has daily limits

## 💰 Cost Information

### Resend Pricing:
- **Free**: 3,000 emails/month, 100/day
- **Pro**: $20/month for 50,000 emails
- **Business**: $85/month for 200,000 emails

### Supabase Edge Functions:
- **Free**: 500,000 invocations/month
- Booking emails count as function invocations

## 🔄 Email Template Preview

The email includes:
- ✈️ Flight school branding header
- 📋 Customer contact information in organized table
- 🛩️ Flight details with aircraft and scheduling
- ⏰ Next steps for follow-up
- 📅 Timestamp of submission

Professional, mobile-responsive design that looks great in all email clients.

## 🎯 Production Considerations

1. **Domain Setup**: Use your own domain for professional emails
2. **Backup Recipients**: Add multiple email addresses
3. **Email Validation**: Consider additional form validation
4. **Response Templates**: Create templates for customer responses
5. **CRM Integration**: Connect to your booking management system

Your flight school now has a professional email booking system that will help you capture and respond to leads effectively!