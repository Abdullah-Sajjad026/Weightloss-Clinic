import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get a specific order by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
        orderStatusHistory: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });

  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// Update order status
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status, notes, updatedBy, medicalReviewStatus, medicalNotes, trackingNumber } = body;

    // Validate status
    const validStatuses = [
      'PENDING', 'MEDICAL_REVIEW', 'APPROVED', 'REJECTED', 
      'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'
    ];
    
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid order status' },
        { status: 400 }
      );
    }

    // Build update data
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (status) {
      updateData.status = status;
    }

    if (medicalReviewStatus) {
      updateData.medicalReviewStatus = medicalReviewStatus;
      updateData.reviewedAt = new Date();
      updateData.reviewedBy = updatedBy;
    }

    if (medicalNotes) {
      updateData.medicalNotes = medicalNotes;
    }

    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }

    // Set delivery date if status is DELIVERED
    if (status === 'DELIVERED') {
      updateData.deliveredAt = new Date();
    }

    // Update order and create status history entry
    const updatedOrder = await prisma.$transaction(async (tx) => {
      // Update the order
      const order = await tx.order.update({
        where: { id },
        data: updateData,
        include: {
          orderItems: true,
          orderStatusHistory: {
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      // Create status history entry if status changed
      if (status) {
        await tx.orderStatusHistory.create({
          data: {
            orderId: id,
            status: status,
            notes: notes || `Order status updated to ${status}`,
            updatedBy: updatedBy,
          }
        });
      }

      return order;
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder
    });

  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

// Delete order (admin only - mark as cancelled)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { reason, updatedBy } = body;

    const updatedOrder = await prisma.$transaction(async (tx) => {
      // Update order status to CANCELLED
      const order = await tx.order.update({
        where: { id },
        data: {
          status: 'CANCELLED',
          updatedAt: new Date(),
        }
      });

      // Create status history entry
      await tx.orderStatusHistory.create({
        data: {
          orderId: id,
          status: 'CANCELLED',
          notes: reason || 'Order cancelled',
          updatedBy: updatedBy,
        }
      });

      return order;
    });

    return NextResponse.json({
      success: true,
      message: 'Order cancelled successfully'
    });

  } catch (error) {
    console.error('Order cancellation error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel order' },
      { status: 500 }
    );
  }
}