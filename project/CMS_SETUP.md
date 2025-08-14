# Flight School CMS Setup Guide

This guide will help you set up the Content Management System (CMS) for your flight school website using Supabase.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. Node.js and npm installed
3. The project dependencies installed (`npm install`)

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose your organization
4. Enter project name (e.g., "flight-school-cms")
5. Create a strong database password
6. Select a region close to your users
7. Click "Create new project"

## Step 2: Set up Database Schema

1. In your Supabase dashboard, go to "SQL Editor"
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste it into the SQL editor and run it
4. This will create all necessary tables and sample data

## Step 3: Configure Environment Variables

1. In your Supabase project dashboard, go to "Settings" > "API"
2. Copy the Project URL and anon/public key
3. Create a `.env.local` file in your project root:

```bash
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual Supabase credentials.

## Step 4: Create Admin User

1. In Supabase dashboard, go to "Authentication" > "Users"
2. Click "Invite a user" or "Add user"
3. Enter your email and a secure password
4. After the user is created, copy the User ID
5. Go to "Table Editor" > "admin_users"
6. Click "Insert" > "Insert row"
7. Add a new row with:
   - `user_id`: The copied User ID
   - `email`: Your email address
   - `is_active`: true

## Step 5: Test the Setup

1. Run your development server: `npm run dev`
2. Visit `http://localhost:5173/admin`
3. Log in with your admin credentials
4. You should see the admin dashboard

## Using the CMS

### Aircraft Management

- **Add Aircraft**: Click "Add Aircraft" to create new aircraft listings
- **Edit Aircraft**: Click the edit icon to modify existing aircraft
- **Toggle Visibility**: Use the eye icon to show/hide aircraft on the website
- **Delete Aircraft**: Use the trash icon to permanently remove aircraft

### Hero Section Content

- **Title**: The main headline on your homepage
- **Subtitle**: The descriptive text below the title
- **Button Text**: Text for the call-to-action button
- **Background Image**: URL to your hero background image
- **Preview**: See how changes will look before saving

### Site Settings

- **Contact Phone**: Your business phone number
- **Contact Email**: Your business email address
- **Location Name**: Your business location
- **Google Maps Link**: Link to your location on Google Maps

## Image Management

Currently, the system expects you to:

1. Upload images to your `public` folder
2. Reference them with paths like `/image-name.jpg`
3. Or use external image URLs

### Recommended Image Specifications

- **Aircraft Images**: 800x600px, high quality, JPG format
- **Hero Background**: 1920x1080px or larger, landscape orientation, JPG format
- **File Size**: Keep under 1MB for good performance

## Database Schema

### Tables Created

1. **aircraft**: Stores aircraft information and pricing
2. **hero_content**: Manages homepage hero section content
3. **site_settings**: Stores contact information and site settings
4. **admin_users**: Controls admin access permissions

### Row Level Security

- Public users can only read active content
- Admin users have full access to manage content
- All tables have RLS enabled for security

## Troubleshooting

### Can't Access Admin Panel

1. Check that your user exists in the `admin_users` table
2. Verify the `is_active` field is set to `true`
3. Ensure environment variables are correctly set

### Images Not Loading

1. Verify image paths start with `/` for public folder images
2. Check that images exist in the `public` directory
3. For external images, ensure URLs are complete and accessible

### Database Connection Issues

1. Verify Supabase credentials in `.env.local`
2. Check that your Supabase project is not paused
3. Ensure RLS policies are properly configured

## Production Deployment

1. Set environment variables in your hosting platform
2. Ensure your domain is added to Supabase Auth settings:
   - Go to Authentication > URL Configuration
   - Add your production domain to allowed origins
3. Update any hardcoded URLs to use environment variables

## Security Best Practices

1. Use strong passwords for admin accounts
2. Regularly update your Supabase project
3. Monitor the admin_users table for unauthorized access
4. Enable 2FA on your Supabase account
5. Use HTTPS in production

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Review the Supabase dashboard for any error logs
3. Verify all environment variables are set correctly
4. Ensure your database schema matches the migration file

## Advanced Features

### Adding Custom Fields

To add new fields to aircraft or other content:

1. Modify the database schema
2. Update the TypeScript interfaces in `src/lib/supabase.ts`
3. Update the admin forms and display components

### Email Notifications

The existing Supabase function for booking emails can be enhanced to send notifications when content is updated.

### Image Upload

Consider integrating Supabase Storage for direct image uploads from the admin panel instead of manual file management.