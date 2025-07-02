import { validateForm } from './utils';

describe('Form validation', () => {
  test('should pass validation for valid data', () => {
    const result = validateForm('Jan Kowalski', 'jan@example.com', 'To jest przykładowa wiadomość');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
  test('should fail validation for short name', () => {
    const result = validateForm('J', 'jan@example.com', 'To jest przykładowa wiadomość');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Imię musi mieć co najmniej 2 znaki');
  });
  test('should fail validation for invalid email', () => {
    const result = validateForm('Jan Kowalski', 'nieprawidlowyemail', 'To jest przykładowa wiadomość');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Nieprawidłowy adres email');
  });
});
