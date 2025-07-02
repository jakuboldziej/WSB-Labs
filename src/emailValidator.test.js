import { emailValidator } from './emailValidator';

describe('emailValidator', () => {
  test('returns true for a valid email', () => {
    expect(emailValidator('test@example.com')).toBe(true);
    expect(emailValidator('user.name+tag@domain.co')).toBe(true);
    expect(emailValidator('user_name@domain.com')).toBe(true);
  });

  test('returns false for an invalid email', () => {
    expect(emailValidator('plainaddress')).toBe(false);
    expect(emailValidator('missing@domain')).toBe(false);
    expect(emailValidator('@missingusername.com')).toBe(false);
    expect(emailValidator('username@.com')).toBe(false);
    expect(emailValidator('username@domain..com')).toBe(false);
  });

  test('returns false for empty or non-string input', () => {
    expect(emailValidator('')).toBe(false);
    expect(emailValidator(null)).toBe(false);
    expect(emailValidator(undefined)).toBe(false);
    expect(emailValidator(12345)).toBe(false);
  });
});