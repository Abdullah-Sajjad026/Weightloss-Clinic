import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const assessment = await prisma.riskAssessment.findUnique({
      where: { id },
    })
    
    if (!assessment) {
      return NextResponse.json(
        { error: 'Risk assessment not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ assessment })
  } catch (error) {
    console.error('Error fetching risk assessment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch risk assessment' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const { 
      status, 
      adminNotes, 
      reviewedBy, 
      canPurchaseMounjaro, 
      authorizedMounjaroDose,
      authorizedWegovyDose,
      authorizationExpiry 
    } = body
    
    const assessment = await prisma.riskAssessment.update({
      where: { id },
      data: {
        status,
        adminNotes,
        reviewedBy,
        reviewedAt: status !== 'PENDING' ? new Date() : null,
        canPurchaseMounjaro: canPurchaseMounjaro || false,
        authorizedMounjaroDose: authorizedMounjaroDose || null,
        authorizedWegovyDose: authorizedWegovyDose || null,
        authorizationExpiry: authorizationExpiry ? new Date(authorizationExpiry) : null,
      },
    })
    
    return NextResponse.json({ 
      success: true, 
      assessment,
      message: 'Risk assessment updated successfully' 
    })
  } catch (error) {
    console.error('Error updating risk assessment:', error)
    return NextResponse.json(
      { error: 'Failed to update risk assessment' },
      { status: 500 }
    )
  }
}