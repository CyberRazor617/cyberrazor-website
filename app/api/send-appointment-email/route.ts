import { NextRequest, NextResponse } from 'next/server';

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

    // For now, we'll simulate email sending since EmailJS requires client-side calls
    // In production, you would use a server-side email service like SendGrid, AWS SES, or similar
    console.log('Appointment booking received:', {
      appointmentNumber,
      name,
      email,
      phone,
      company,
      message,
      date: formattedDate,
      time
    });

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Log the appointment details (in production, this would be saved to a database)
    console.log(`Appointment ${appointmentNumber} booked for ${name} on ${formattedDate} at ${time}`);

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
