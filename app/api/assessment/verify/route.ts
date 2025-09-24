import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Check if email has completed and approved assessment for Mounjaro
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find the most recent assessment for this email
    const assessment = await prisma.riskAssessment.findFirst({
      where: {
        email: email.toLowerCase().trim(),
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!assessment) {
      return NextResponse.json({
        eligible: false,
        reason: 'NO_ASSESSMENT',
        message: 'No assessment found for this email address.'
      });
    }

    // Check if assessment is approved and authorized for Mounjaro
    if (assessment.status !== 'APPROVED') {
      return NextResponse.json({
        eligible: false,
        reason: 'NOT_APPROVED',
        message: 'Assessment is pending medical review.',
        status: assessment.status
      });
    }

    if (!assessment.canPurchaseMounjaro && !assessment.authorizedWegovyDose) {
      return NextResponse.json({
        eligible: false,
        reason: 'NOT_AUTHORIZED',
        message: 'Not authorized for injection purchase.',
        status: assessment.status
      });
    }

    // Check if authorization has expired
    if (assessment.authorizationExpiry && assessment.authorizationExpiry < new Date()) {
      return NextResponse.json({
        eligible: false,
        reason: 'EXPIRED',
        message: 'Authorization has expired. Please complete a new assessment.',
        expiredAt: assessment.authorizationExpiry
      });
    }

    // All checks passed - user is eligible
    return NextResponse.json({
      eligible: true,
      message: 'Eligible for injection purchase',
      assessmentDate: assessment.createdAt,
      approvedBy: assessment.reviewedBy,
      approvedAt: assessment.reviewedAt,
      expiresAt: assessment.authorizationExpiry,
      authorizedMounjaroDose: assessment.authorizedMounjaroDose,
      authorizedWegovyDose: assessment.authorizedWegovyDose
    });

  } catch (error) {
    console.error('Assessment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify assessment' },
      { status: 500 }
    );
  }
}

// Get assessment status without sensitive details (for public use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const assessment = await prisma.riskAssessment.findFirst({
      where: {
        email: email.toLowerCase().trim(),
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        status: true,
        canPurchaseMounjaro: true,
        authorizedMounjaroDose: true,
        authorizedWegovyDose: true,
        authorizationExpiry: true,
        createdAt: true,
        reviewedAt: true
      }
    });

    if (!assessment) {
      return NextResponse.json({
        hasAssessment: false,
        eligible: false
      });
    }

    const isEligible = assessment.status === 'APPROVED' && 
                      (assessment.canPurchaseMounjaro || assessment.authorizedWegovyDose) &&
                      (!assessment.authorizationExpiry || assessment.authorizationExpiry > new Date());

    return NextResponse.json({
      hasAssessment: true,
      eligible: isEligible,
      status: assessment.status,
      assessmentDate: assessment.createdAt,
      approvedAt: assessment.reviewedAt,
      expiresAt: assessment.authorizationExpiry,
      authorizedMounjaroDose: assessment.authorizedMounjaroDose,
      authorizedWegovyDose: assessment.authorizedWegovyDose
    });

  } catch (error) {
    console.error('Assessment status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check assessment status' },
      { status: 500 }
    );
  }
}