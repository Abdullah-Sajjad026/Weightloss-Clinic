// Cart validation utilities for assessment-required products
import { productRequiresAssessment } from './assessment-config';

export interface ValidationResult {
  allowed: boolean;
  reason?: string;
  message?: string;
  requiresAssessment?: boolean;
}

// Check if a product requires assessment using configurable system
export function requiresAssessment(
  productName: string, 
  productId?: string,
  category?: string
): boolean {
  return productRequiresAssessment(productName, productId, category);
}

// Validate if user can add item to cart
export async function validateCartItem(
  productName: string, 
  productId?: string, 
  userEmail?: string,
  category?: string
): Promise<ValidationResult> {
  
  // If product doesn't require assessment, allow it
  if (!requiresAssessment(productName, productId, category)) {
    return { allowed: true };
  }

  // If no email provided for assessment-required product
  if (!userEmail) {
    return {
      allowed: false,
      requiresAssessment: true,
      reason: 'NO_EMAIL',
      message: 'Please verify your assessment status before adding this item to cart.'
    };
  }

  try {
    // Check assessment status
    const response = await fetch('/api/assessment/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail }),
    });

    const data = await response.json();

    if (data.eligible) {
      return { allowed: true };
    }

    // Return specific failure reason
    return {
      allowed: false,
      requiresAssessment: true,
      reason: data.reason,
      message: data.message || 'Assessment verification required for this product.'
    };

  } catch (error) {
    console.error('Cart validation error:', error);
    return {
      allowed: false,
      requiresAssessment: true,
      reason: 'VERIFICATION_ERROR',
      message: 'Unable to verify assessment status. Please try again.'
    };
  }
}

// Get user-friendly message for validation failure
export function getValidationMessage(result: ValidationResult): string {
  switch (result.reason) {
    case 'NO_EMAIL':
      return 'Please verify your email and assessment status before adding this prescription item.';
    case 'NO_ASSESSMENT':
      return 'You need to complete a medical assessment before purchasing this item.';
    case 'NOT_APPROVED':
      return 'Your assessment is pending medical review. You\'ll be notified once approved.';
    case 'NOT_AUTHORIZED':
      return 'This item requires medical authorization. Please contact our medical team.';
    case 'EXPIRED':
      return 'Your authorization has expired. Please complete a new assessment.';
    case 'VERIFICATION_ERROR':
      return 'Unable to verify your assessment status. Please try again or contact support.';
    default:
      return result.message || 'Assessment verification required for this item.';
  }
}