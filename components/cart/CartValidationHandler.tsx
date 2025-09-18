'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

interface CartValidationError {
  message: string;
  reason: string;
  requiresAssessment?: boolean;
}

export function CartValidationHandler() {
  useEffect(() => {
    const handleCartValidationError = (event: CustomEvent<CartValidationError>) => {
      const { message, reason, requiresAssessment } = event.detail;
      
      // Show different toast types based on the error reason
      if (requiresAssessment) {
        toast.error('Assessment Required', {
          description: message,
          duration: 6000,
          action: {
            label: 'Complete Assessment',
            onClick: () => {
              // Navigate to assessment page
              window.location.href = '/assessment';
            },
          },
        });
      } else {
        toast.error('Unable to Add Item', {
          description: message,
          duration: 5000,
        });
      }
    };

    // Listen for cart validation errors
    window.addEventListener('cart-validation-error', handleCartValidationError as EventListener);

    return () => {
      window.removeEventListener('cart-validation-error', handleCartValidationError as EventListener);
    };
  }, []);

  return null; // This component doesn't render anything
}