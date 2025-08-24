import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { riskAssessmentSchema } from '@/lib/validations/risk-assessment'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received payload:', JSON.stringify(body, null, 2))
    
    // Validate the request body
    const validatedData = riskAssessmentSchema.parse(body)
    console.log('Validated data:', JSON.stringify(validatedData, null, 2))
    
    // Create the risk assessment record
    const riskAssessment = await prisma.riskAssessment.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        heightFeet: validatedData.heightFeet,
        heightInches: validatedData.heightInches,
        heightCm: validatedData.heightCm,
        weightStone: validatedData.weightStone,
        weightPounds: validatedData.weightPounds,
        weightKg: validatedData.weightKg,
        unitSystem: validatedData.unitSystem,
        responses: validatedData.responses,
        status: 'PENDING',
      },
    })
    
    return NextResponse.json({ 
      success: true, 
      id: riskAssessment.id,
      message: 'Risk assessment submitted successfully' 
    })
  } catch (error) {
    console.error('Error creating risk assessment:', error)
    console.error('Error details:', error)
    
    if (error && typeof error === 'object' && 'issues' in error) {
      // Zod validation error
      console.error('Zod validation error:', error.issues)
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to submit risk assessment', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const where = status ? { status: status.toUpperCase() as any } : {}
    
    const assessments = await prisma.riskAssessment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        createdAt: true,
        reviewedAt: true,
        reviewedBy: true,
      },
    })
    
    return NextResponse.json({ assessments })
  } catch (error) {
    console.error('Error fetching risk assessments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch risk assessments' },
      { status: 500 }
    )
  }
}