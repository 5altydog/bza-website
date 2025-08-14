import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

interface BookingData {
  name: string
  email: string
  phone: string
  aircraft: string
  preferredDate: string
  preferredTime: string
  experience: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { bookingData }: { bookingData: BookingData } = await req.json()

    // Validate required fields
    if (!bookingData.name || !bookingData.email || !bookingData.aircraft) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Format the booking time
    const timeSlots = {
      'morning': 'Morning (8:00 AM - 12:00 PM)',
      'afternoon': 'Afternoon (12:00 PM - 5:00 PM)', 
      'evening': 'Evening (5:00 PM - 8:00 PM)'
    }
    const formattedTime = timeSlots[bookingData.preferredTime as keyof typeof timeSlots] || bookingData.preferredTime

    // Format experience level
    const experienceLevels = {
      'none': 'No flying experience',
      'some': 'Some flying experience',
      'student': 'Current student pilot',
      'licensed': 'Licensed pilot'
    }
    const formattedExperience = experienceLevels[bookingData.experience as keyof typeof experienceLevels] || bookingData.experience

    // Create HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
        <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 28px;"> New Discovery Flight Request</h1>
            <p style="color: #666; margin: 10px 0 0 0;">Flight School Booking System</p>
          </div>
          
          <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 20px; margin-bottom: 25px;">
            <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 22px;">Customer Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #374151; font-weight: 600; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #111827;">${bookingData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #374151; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0; color: #111827;">${bookingData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #374151; font-weight: 600;">Phone:</td>
                <td style="padding: 8px 0; color: #111827;">${bookingData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #374151; font-weight: 600;">Experience:</td>
                <td style="padding: 8px 0; color: #111827;">${formattedExperience}</td>
              </tr>
            </table>
          </div>

          <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin-bottom: 25px;">
            <h2 style="color: #0c4a6e; margin: 0 0 15px 0; font-size: 22px;">Flight Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #374151; font-weight: 600; width: 120px;">Aircraft:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 16px;">${bookingData.aircraft}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #374151; font-weight: 600;">Date:</td>
                <td style="padding: 8px 0; color: #111827;">${new Date(bookingData.preferredDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #374151; font-weight: 600;">Time:</td>
                <td style="padding: 8px 0; color: #111827;">${formattedTime}</td>
              </tr>
            </table>
          </div>

          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #92400e; margin: 0 0 10px 0;">ð Next Steps</h3>
            <ul style="color: #78350f; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 5px;">Contact customer within 24 hours</li>
              <li style="margin-bottom: 5px;">Confirm aircraft availability for requested date/time</li>
              <li style="margin-bottom: 5px;">Schedule discovery flight and send confirmation</li>
            </ul>
          </div>

          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              This email was sent automatically from your Flight School website booking system.
            </p>
            <p style="color: #9ca3af; margin: 5px 0 0 0; font-size: 12px;">
              Submitted on ${new Date().toLocaleString('en-US', { 
                timeZone: 'America/Los_Angeles',
                dateStyle: 'full',
                timeStyle: 'short'
              })} PST
            </p>
          </div>
        </div>
      </div>
    `

    // Create plain text version
    const textContent = `
NEW DISCOVERY FLIGHT REQUEST

Customer Information:
- Name: ${bookingData.name}
- Email: ${bookingData.email}  
- Phone: ${bookingData.phone}
- Experience: ${formattedExperience}

Flight Details:
- Aircraft: ${bookingData.aircraft}
- Date: ${new Date(bookingData.preferredDate).toLocaleDateString()}
- Time: ${formattedTime}

Submitted: ${new Date().toLocaleString()}

Please contact the customer within 24 hours to confirm their discovery flight.
    `

    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Flight School <noreply@flybz.net>',
        to: ['ted@flybz.net'],
        subject: `=é New Discovery Flight Request - ${bookingData.aircraft} - ${bookingData.name}`,
        html: htmlContent,
        text: textContent,
      }),
    })

    if (res.ok) {
      const data = await res.json()
      return new Response(JSON.stringify({ success: true, id: data.id }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } else {
      const error = await res.text()
      return new Response(JSON.stringify({ error: 'Failed to send email', details: error }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})