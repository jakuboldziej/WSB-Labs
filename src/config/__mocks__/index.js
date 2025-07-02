// Mock config for Jest tests
export const config = {
  app: {
    name: 'WSB-Labs',
    version: '1.0.0',
    environment: 'test'
  },
  api: {
    baseUrl: 'http://localhost:3000'
  },
  monitoring: {
    healthCheckInterval: 30000,
    healthCheckTimeout: 5000
  },
  features: {
    analytics: false,
    debug: true
  }
};
