import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
serve(async (req)=>{
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    const { bookingData } = await req.json();
    // Validate required fields
    if (!bookingData.name || !bookingData.email || !bookingData.aircraft || !bookingData.aircraftId) {
      return new Response(JSON.stringify({
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Format time slots
    const timeSlots = {
      'morning': 'Morning (8:00 AM - 12:00 PM)',
      'afternoon': 'Afternoon (12:00 PM - 5:00 PM)',
      'evening': 'Evening (5:00 PM - 8:00 PM)'
    };
    const formattedTime = timeSlots[bookingData.preferredTime] || bookingData.preferredTime;
    // Format experience level
    const experienceLevels = {
      'none': 'No flying experience',
      'some': 'Some flying experience',
      'student': 'Current student pilot',
      'licensed': 'Licensed pilot'
    };
    const formattedExperience = experienceLevels[bookingData.experience] || bookingData.experience;
    // Format phone number for HTML display
    const phoneDigits = bookingData.phone.replace(/\D/g, '');
    const formattedPhone = phoneDigits.length === 10 ? `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}` : bookingData.phone;
    // HTML email content
    const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
    <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin: 0; font-size: 28px;">New Discovery Flight Request</h1>
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
            <td style="padding: 8px 0; color: #111827;">${formattedPhone}</td>
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
            <td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 16px;">${bookingData.aircraft} (${bookingData.aircraftId.toUpperCase()})</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #374151; font-weight: 600;">Date:</td>
            <td style="padding: 8px 0; color: #111827;">${bookingData.preferredDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #374151; font-weight: 600;">Time:</td>
            <td style="padding: 8px 0; color: #111827;">${formattedTime}</td>
          </tr>
        </table>
      </div>

      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 25px;">
        <h3 style="color: #92400e; margin: 0 0 10px 0;">Next Steps</h3>
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
      </div>
    </div>
  </div>`;
    // Text email content
    const textContent = `
  [BOOKING_REQUEST]
  type=discovery_flight
  aircraft_id=${bookingData.aircraftId.toUpperCase()}
  aircraft_name=${bookingData.aircraft}
  booking_id=${Date.now()}-${bookingData.aircraftId.toUpperCase()}
  timestamp=${new Date().toISOString()}

  [CUSTOMER_DATA]
  name=${bookingData.name}
  email=${bookingData.email}
  phone=${bookingData.phone}
  experience_level=${formattedExperience}

  [FLIGHT_DETAILS]
  aircraft=${bookingData.aircraft}
  aircraft_identifier=${bookingData.aircraftId.toUpperCase()}
  preferred_date=${bookingData.preferredDate}
  preferred_time=${bookingData.preferredTime}
  formatted_date=${bookingData.preferredDate}
  formatted_time=${formattedTime}

  [METADATA]
  submission_timestamp=${new Date().toISOString()}
  submission_date=${new Date().toLocaleDateString()}
  submission_time=${new Date().toLocaleTimeString()}
  status=pending_confirmation

  [ACTION_REQUIRED]
  task=contact_customer
  deadline=24_hours
  priority=high
  `;
    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Flight School <onboarding@resend.dev>',
        to: [
          'tedwillis@gmail.com'
        ],
        subject: `Discovery Flight Request - ${bookingData.aircraftId.toUpperCase()} (${bookingData.aircraft}) - ${bookingData.name}`,
        html: htmlContent,
        text: textContent
      })
    });
    if (emailResponse.ok) {
      const emailResult = await emailResponse.json();
      return new Response(JSON.stringify({
        success: true,
        id: emailResult.id
      }), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    } else {
      const emailError = await emailResponse.text();
      return new Response(JSON.stringify({
        error: 'Failed to send email',
        details: emailError
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});