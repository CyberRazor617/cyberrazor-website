import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';

const BACKEND_URL = config.backendUrl;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, password } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          message: 'Please fill in all required fields' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format',
          message: 'Please enter a valid email address' 
        },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Weak password',
          message: 'Password must be at least 6 characters long' 
        },
        { status: 400 }
      );
    }

    // Create username from first and last name
    const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${Date.now()}`;

    // Prepare data for backend
    const signupData = {
      username,
      email: email.toLowerCase(),
      password,
      company: company || ''
    };

    // Call backend signup API
    const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: data.error || 'Signup failed',
          message: data.message || 'Failed to create account' 
        },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: data.message || 'Account created successfully! Please check your email for approval.',
      user: data.user
    });

  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Failed to create account. Please try again.' 
      },
      { status: 500 }
    );
  }
}
