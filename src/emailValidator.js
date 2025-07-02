export function emailValidator(email) {
  // Check if email is a string and not empty
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Basic email regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Additional checks for common invalid patterns
  if (email.includes('..') || // consecutive dots
    email.startsWith('.') || email.endsWith('.') || // starts or ends with dot
    email.startsWith('@') || email.endsWith('@') || // starts or ends with @
    email.indexOf('@') !== email.lastIndexOf('@')) { // multiple @ symbols
    return false;
  }

  return emailRegex.test(email);
}
