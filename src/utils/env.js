// Environment utilities that can be mocked in tests
export const getEnvironment = () => {
  // Check if we're in a test environment first
  if (typeof globalThis !== 'undefined' && typeof globalThis.process !== 'undefined' && globalThis.process?.env?.NODE_ENV === 'test') {
    return {
      DEV: true,
      VITE_HEALTH_CHECK_INTERVAL: '30000',
      VITE_HEALTH_CHECK_TIMEOUT: '5000',
      VITE_ENVIRONMENT: 'test',
      VITE_ENABLE_DEBUG: 'true'
    };
  }

  // In browser/Vite environment
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env;
  }

  // Fallback for other environments
  return {
    DEV: false,
    VITE_HEALTH_CHECK_INTERVAL: '30000',
    VITE_HEALTH_CHECK_TIMEOUT: '5000',
    VITE_ENVIRONMENT: 'production',
    VITE_ENABLE_DEBUG: 'false'
  };
};
