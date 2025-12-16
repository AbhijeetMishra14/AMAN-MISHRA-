/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // Check if it's between 10-15 digits (international standard)
  return cleaned.length >= 10 && cleaned.length <= 15;
};

/**
 * Sanitize string input to prevent XSS
 * @param {string} str - String to sanitize
 * @returns {string}
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

/**
 * Validate form data
 * @param {Object} data - Form data to validate
 * @param {string[]} requiredFields - List of required field names
 * @returns {Object} Validation result
 */
export const validateFormData = (data, requiredFields = []) => {
  const errors = {};

  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      errors[field] = `${field} is required`;
    }
  });

  // Validate email if present
  if (data.email && !isValidEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Validate phone if present
  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Invalid phone number format';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default {
  isValidEmail,
  isValidPhone,
  sanitizeString,
  validateFormData
};
