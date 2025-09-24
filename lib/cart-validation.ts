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
  category?: string,
  variant?: string // The specific dose being added
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

    if (!data.eligible) {
      // Return specific failure reason
      return {
        allowed: false,
        requiresAssessment: true,
        reason: data.reason,
        message: data.message || 'Assessment verification required for this product.'
      };
    }

    // Check dose-specific authorization if variant (dose) is provided
    if (variant) {
      const name = productName.toLowerCase();
      let authorizedDose: string | undefined;
      
      if (name.includes('mounjaro')) {
        authorizedDose = data.authorizedMounjaroDose;
      } else if (name.includes('wegovy')) {
        authorizedDose = data.authorizedWegovyDose;
      }
      
      // If we have a specific authorized dose, check if the variant matches
      if (authorizedDose && variant !== authorizedDose) {
        return {
          allowed: false,
          reason: 'WRONG_DOSE',
          message: `You are only authorized for ${authorizedDose}. Please select the correct dose.`,
          requiresAssessment: false,
        };
      }
    }

    return { allowed: true };

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