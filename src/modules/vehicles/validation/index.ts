import { Vehicle, VehicleVariant, VehicleFeature, VehicleSEO } from '../types';

export interface ValidationResult {
  success: boolean;
  errors: string[];
}

export function validateFeature(data: any): ValidationResult {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') {
    return { success: false, errors: ['Feature must be an object'] };
  }

  if (typeof data.id !== 'string' || !data.id) errors.push('Feature ID is required');
  if (typeof data.name !== 'string' || !data.name) errors.push('Feature name is required');
  if (typeof data.description !== 'string') errors.push('Feature description must be a string');
  
  const validCategories = ['Safety', 'Comfort', 'Performance', 'Technology', 'Design'];
  if (!validCategories.includes(data.category)) {
    errors.push(`Feature category must be one of: ${validCategories.join(', ')}`);
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

export function validateVariant(data: any): ValidationResult {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') {
    return { success: false, errors: ['Variant must be an object'] };
  }

  if (typeof data.id !== 'string' || !data.id) errors.push('Variant ID is required');
  if (typeof data.vehicleId !== 'string' || !data.vehicleId) errors.push('Vehicle ID is required');
  if (typeof data.variantName !== 'string' || !data.variantName) errors.push('Variant name is required');
  
  const validFuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'CNG'];
  if (!validFuelTypes.includes(data.fuelType)) {
    errors.push(`Fuel type must be one of: ${validFuelTypes.join(', ')}`);
  }

  const validTransmissions = ['Manual', 'Automatic'];
  if (!validTransmissions.includes(data.transmission)) {
    errors.push(`Transmission must be one of: ${validTransmissions.join(', ')}`);
  }

  if (typeof data.exShowroomPrice !== 'number' || data.exShowroomPrice <= 0) {
    errors.push('Ex-showroom price must be a positive number');
  }
  if (typeof data.onRoadPrice !== 'number' || data.onRoadPrice <= 0) {
    errors.push('On-road price must be a positive number');
  }
  if (!Array.isArray(data.features)) {
    errors.push('Features must be an array of strings');
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

export function validateSEOData(data: any): ValidationResult {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') {
    return { success: false, errors: ['SEO data must be an object'] };
  }

  if (typeof data.title !== 'string' || !data.title) errors.push('SEO title is required');
  else if (data.title.length > 60) errors.push('SEO title should not exceed 60 characters');

  if (typeof data.metaDescription !== 'string' || !data.metaDescription) {
    errors.push('SEO meta description is required');
  } else if (data.metaDescription.length < 120 || data.metaDescription.length > 160) {
    // Soft recommendation or warning
  }

  if (typeof data.canonicalUrl !== 'string' || !data.canonicalUrl) {
    errors.push('Canonical URL is required');
  }

  if (!data.openGraph || typeof data.openGraph !== 'object') {
    errors.push('Open Graph metadata is required');
  } else {
    if (!data.openGraph.title) errors.push('Open Graph title is required');
    if (!data.openGraph.description) errors.push('Open Graph description is required');
    if (!data.openGraph.image) errors.push('Open Graph image is required');
  }

  if (!data.twitterCards || typeof data.twitterCards !== 'object') {
    errors.push('Twitter Card metadata is required');
  }

  if (!Array.isArray(data.faqSchema)) {
    errors.push('FAQ Schema must be an array');
  } else {
    data.faqSchema.forEach((faq: any, idx: number) => {
      if (!faq.question || typeof faq.question !== 'string') errors.push(`FAQ ${idx} question is required`);
      if (!faq.answer || typeof faq.answer !== 'string') errors.push(`FAQ ${idx} answer is required`);
    });
  }

  if (!data.vehicleSchema || typeof data.vehicleSchema !== 'object') {
    errors.push('Vehicle Schema LD is required');
  }

  if (!Array.isArray(data.breadcrumbSchema)) {
    errors.push('Breadcrumb Schema must be an array');
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

export function validateVehicle(data: any): ValidationResult {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') {
    return { success: false, errors: ['Vehicle data must be an object'] };
  }

  if (typeof data.vehicleId !== 'string' || !data.vehicleId) errors.push('Vehicle ID is required');
  if (typeof data.slug !== 'string' || !data.slug) errors.push('Slug is required');
  if (typeof data.name !== 'string' || !data.name) errors.push('Name is required');
  if (typeof data.modelCode !== 'string' || !data.modelCode) errors.push('Model Code is required');

  const validTypes = ['Hatchback', 'SUV', 'MPV', 'Sedan', 'Utility'];
  if (!validTypes.includes(data.vehicleType)) {
    errors.push(`Vehicle Type must be one of: ${validTypes.join(', ')}`);
  }

  if (!Array.isArray(data.fuelType) || data.fuelType.length === 0) {
    errors.push('At least one Fuel Type is required');
  }
  if (!Array.isArray(data.transmission) || data.transmission.length === 0) {
    errors.push('At least one Transmission Type is required');
  }
  if (!Array.isArray(data.seatingCapacity) || data.seatingCapacity.length === 0) {
    errors.push('At least one seating capacity option is required');
  }

  if (typeof data.startingPrice !== 'number' || data.startingPrice <= 0) {
    errors.push('Starting Price must be a positive number');
  }

  if (typeof data.heroImage !== 'string' || !data.heroImage) errors.push('Hero image path is required');

  if (!Array.isArray(data.colors) || data.colors.length === 0) {
    errors.push('At least one color option is required');
  } else {
    data.colors.forEach((color: any, idx: number) => {
      if (!color.name) errors.push(`Color ${idx} name is required`);
      if (!color.hex) errors.push(`Color ${idx} hex code is required`);
    });
  }

  if (!Array.isArray(data.variants)) {
    errors.push('Variants must be an array');
  } else {
    data.variants.forEach((variant: any, idx: number) => {
      const variantRes = validateVariant(variant);
      if (!variantRes.success) {
        errors.push(`Variant ${variant.variantName || idx} is invalid: ${variantRes.errors.join('; ')}`);
      }
    });
  }

  if (!Array.isArray(data.features)) {
    errors.push('Features must be an array');
  } else {
    data.features.forEach((feat: any, idx: number) => {
      const featRes = validateFeature(feat);
      if (!featRes.success) {
        errors.push(`Feature ${feat.name || idx} is invalid: ${featRes.errors.join('; ')}`);
      }
    });
  }

  const seoRes = validateSEOData(data.seo);
  if (!seoRes.success) {
    errors.push(`SEO is invalid: ${seoRes.errors.join('; ')}`);
  }

  const validStatuses = ['ACTIVE', 'INACTIVE', 'ARCHIVED'];
  if (!validStatuses.includes(data.status)) {
    errors.push('Status must be ACTIVE, INACTIVE, or ARCHIVED');
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
