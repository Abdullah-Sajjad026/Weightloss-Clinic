// Assessment requirement configuration
// This can be easily modified to change which products require assessment

export interface AssessmentConfig {
  // Global setting for injection assessment requirements
  requireAssessmentForAllInjections: boolean;
  
  // Specific product requirements (overrides global setting)
  specificProductRequirements: {
    [productId: string]: boolean;
  };
  
  // Product name patterns that require assessment
  requiredPatterns: string[];
  
  // Product categories that require assessment
  requiredCategories: ('injections' | 'pills-tablets' | 'bariatric-surgery')[];
}

// Current configuration - easily adjustable
export const assessmentConfig: AssessmentConfig = {
  // Set to true to require assessment for ALL injections
  // Set to false to only require for specific products (Mounjaro)
  requireAssessmentForAllInjections: false,
  
  // Specific products that always require assessment regardless of global setting
  specificProductRequirements: {
    'mounjaro': true,
    'tirzepatide': true,
  },
  
  // Product name patterns that require assessment (case-insensitive)
  requiredPatterns: [
    'mounjaro',
    'tirzepatide',
    // Add more patterns as needed:
    // 'wegovy',
    // 'semaglutide',
    // 'ozempic'
  ],
  
  // Categories that require assessment (if requireAssessmentForAllInjections is true)
  requiredCategories: ['injections']
};

// Helper function to check if a product requires assessment
export function productRequiresAssessment(
  productName: string, 
  productId?: string, 
  category?: string
): boolean {
  const config = assessmentConfig;
  const name = productName.toLowerCase();
  const id = productId?.toLowerCase();
  
  // Check specific product requirements first (highest priority)
  if (id && config.specificProductRequirements[id]) {
    return true;
  }
  
  // Check name patterns
  for (const pattern of config.requiredPatterns) {
    if (name.includes(pattern.toLowerCase())) {
      return true;
    }
  }
  
  // Check global injection requirement
  if (config.requireAssessmentForAllInjections && category === 'injections') {
    return true;
  }
  
  // Check category requirements
  if (category && config.requiredCategories.includes(category as any)) {
    return true;
  }
  
  return false;
}

// Configuration presets for easy switching
export const configurationPresets = {
  // Only Mounjaro requires assessment (current setup)
  MOUNJARO_ONLY: {
    requireAssessmentForAllInjections: false,
    specificProductRequirements: {
      'mounjaro': true,
      'tirzepatide': true,
    },
    requiredPatterns: ['mounjaro', 'tirzepatide'],
    requiredCategories: []
  } as AssessmentConfig,
  
  // All injections require assessment
  ALL_INJECTIONS: {
    requireAssessmentForAllInjections: true,
    specificProductRequirements: {},
    requiredPatterns: [],
    requiredCategories: ['injections']
  } as AssessmentConfig,
  
  // All GLP-1 medications require assessment
  ALL_GLP1: {
    requireAssessmentForAllInjections: false,
    specificProductRequirements: {},
    requiredPatterns: [
      'mounjaro', 'tirzepatide', 
      'wegovy', 'semaglutide', 
      'ozempic', 'saxenda'
    ],
    requiredCategories: []
  } as AssessmentConfig,
  
  // All prescription products require assessment
  ALL_PRESCRIPTIONS: {
    requireAssessmentForAllInjections: true,
    specificProductRequirements: {},
    requiredPatterns: [],
    requiredCategories: ['injections', 'pills-tablets']
  } as AssessmentConfig
};

// Function to apply a preset configuration
export function applyConfigurationPreset(preset: keyof typeof configurationPresets) {
  Object.assign(assessmentConfig, configurationPresets[preset]);
}