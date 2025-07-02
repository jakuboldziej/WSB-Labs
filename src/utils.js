export function validateForm(name, email, message) {
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Imię musi mieć co najmniej 2 znaki');
  }

  if (!email || !email.includes('@')) {
    errors.push('Nieprawidłowy adres email');
  }

  if (!message || message.trim().length < 10) {
    errors.push('Wiadomość musi mieć co najmniej 10 znaków');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
