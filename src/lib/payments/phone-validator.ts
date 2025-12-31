/**
 * Phone Number Validation for Ghana MTN Mobile Money
 */

export interface PhoneValidationResult {
  isValid: boolean;
  formatted: string;
  error?: string;
}

/**
 * Validate and format Ghana MTN Mobile Money number
 * Valid prefixes: 024, 054, 055, 059
 */
export function validateMTNPhoneNumber(phone: string): PhoneValidationResult {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');

  // Check if empty
  if (!digitsOnly) {
    return {
      isValid: false,
      formatted: phone,
      error: 'Phone number is required',
    };
  }

  // Check length
  if (digitsOnly.length !== 10) {
    return {
      isValid: false,
      formatted: digitsOnly,
      error: 'Phone number must be 10 digits',
    };
  }

  // Check MTN prefixes
  const mtnPrefixes = ['024', '054', '055', '059'];
  const prefix = digitsOnly.substring(0, 3);

  if (!mtnPrefixes.includes(prefix)) {
    return {
      isValid: false,
      formatted: digitsOnly,
      error: 'Invalid MTN number. Must start with 024, 054, 055, or 059',
    };
  }

  // Format: 024 123 4567
  const formatted = `${prefix} ${digitsOnly.substring(3, 6)} ${digitsOnly.substring(6)}`;

  return {
    isValid: true,
    formatted,
  };
}

/**
 * Format phone number for display
 */
export function formatPhoneForDisplay(phone: string): string {
  const validation = validateMTNPhoneNumber(phone);
  if (validation.isValid) {
    return validation.formatted;
  }
  // Return original if invalid, but cleaned
  return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
}

/**
 * Format phone number for API (digits only)
 */
export function formatPhoneForAPI(phone: string): string {
  return phone.replace(/\D/g, '');
}

