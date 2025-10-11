import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';

const BACKEND_URL = config.backendUrl;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing credentials',
          message: 'Please enter both email and password' 
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

    // Prepare data for backend
    const loginData = {
      email: email.toLowerCase(),
      password
    };

    // Call backend login API
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: data.error || 'Login failed',
          message: data.message || 'Invalid credentials',
          status: data.status
        },
        { status: response.status }
      );
    }

    // Return success response with token
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      access_token: data.access_token,
      token_type: data.token_type,
      user: data.user
    });

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Failed to login. Please try again.' 
      },
      { status: 500 }
    );
  }
}
