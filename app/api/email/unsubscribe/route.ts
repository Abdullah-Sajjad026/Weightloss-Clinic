import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle unsubscribe requests
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Update marketing opt-in for all orders with this email
    await prisma.order.updateMany({
      where: { customerEmail: email },
      data: { marketingOptIn: false }
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from marketing emails'
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to process unsubscribe request' },
      { status: 500 }
    );
  }
}

// Handle subscribe requests (re-opt-in)
export async function PUT(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Update marketing opt-in for all orders with this email
    await prisma.order.updateMany({
      where: { customerEmail: email },
      data: { marketingOptIn: true }
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to marketing emails'
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscribe request' },
      { status: 500 }
    );
  }
}