export const config = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'WSB-Labs',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.VITE_ENVIRONMENT || 'development'
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  },
  monitoring: {
    healthCheckInterval: parseInt(import.meta.env.VITE_HEALTH_CHECK_INTERVAL) || 30000,
    healthCheckTimeout: parseInt(import.meta.env.VITE_HEALTH_CHECK_TIMEOUT) || 5000
  },
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debug: import.meta.env.VITE_ENABLE_DEBUG === 'true'
  }
};

export default config;
