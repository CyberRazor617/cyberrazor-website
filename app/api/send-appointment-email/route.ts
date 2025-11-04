import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      message,
      date,
      time,
      appointmentNumber
    } = body;

    // Format the date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL || 'nds.shapater@gmail.com',
        pass: process.env.SMTP_PASSWORD || 'boae pdlt helr bsic'
      }
    });

    // Email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #667eea; }
            .appointment-number { font-size: 24px; color: #667eea; font-weight: bold; text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔒 New Appointment Booking</h1>
              <p>CyberRazor Security Consultation</p>
            </div>
            <div class="content">
              <div class="appointment-number">
                Appointment #${appointmentNumber}
              </div>
              
              <div class="appointment-details">
                <h2>Contact Information</h2>
                <div class="detail-row">
                  <span class="detail-label">Name:</span> ${name}
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span> ${email}
                </div>
                <div class="detail-row">
                  <span class="detail-label">Phone:</span> ${phone}
                </div>
                ${company ? `<div class="detail-row">
                  <span class="detail-label">Company:</span> ${company}
                </div>` : ''}
              </div>

              <div class="appointment-details">
                <h2>Appointment Schedule</h2>
                <div class="detail-row">
                  <span class="detail-label">Date:</span> ${formattedDate}
                </div>
                <div class="detail-row">
                  <span class="detail-label">Time:</span> ${time}
                </div>
              </div>

              ${message ? `<div class="appointment-details">
                <h2>Message</h2>
                <p>${message}</p>
              </div>` : ''}

              <p style="text-align: center; color: #666; margin-top: 30px;">
                Please contact the client to confirm the appointment details.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: '"CyberRazor Appointments" <nds.shapater@gmail.com>',
      to: 'nds.shapater@gmail.com',
      subject: `New Appointment Booking - ${appointmentNumber}`,
      html: emailHtml
    });

    console.log(`Appointment ${appointmentNumber} booked and email sent successfully`);

    return NextResponse.json({ 
      success: true, 
      message: 'Appointment booked successfully. Our team will contact you shortly.',
      appointmentNumber 
    });

  } catch (error) {
    console.error('Error processing appointment:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to book appointment. Please try again.' 
      },
      { status: 500 }
    );
  }
}
