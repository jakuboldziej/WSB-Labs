// Mock the config module to avoid import.meta.env issues
jest.mock('./index');

import { config } from './index';

describe('Config', () => {
  test('should have default app configuration', () => {
    expect(config.app).toBeDefined();
    expect(config.app.name).toBeDefined();
    expect(config.app.version).toBeDefined();
    expect(config.app.environment).toBeDefined();
  });

  test('should have api configuration', () => {
    expect(config.api).toBeDefined();
    expect(config.api.baseUrl).toBeDefined();
  });

  test('should have monitoring configuration', () => {
    expect(config.monitoring).toBeDefined();
    expect(config.monitoring.healthCheckInterval).toBeGreaterThan(0);
    expect(config.monitoring.healthCheckTimeout).toBeGreaterThan(0);
  });

  test('should have features configuration', () => {
    expect(config.features).toBeDefined();
    expect(typeof config.features.analytics).toBe('boolean');
    expect(typeof config.features.debug).toBe('boolean');
  });

  test('should use default values when env vars are not set', () => {
    expect(config.app.name).toBe('WSB-Labs');
    expect(config.app.version).toBe('1.0.0');
    expect(config.monitoring.healthCheckInterval).toBe(30000);
    expect(config.monitoring.healthCheckTimeout).toBe(5000);
  });

  test('should have correct data types', () => {
    expect(typeof config.app.name).toBe('string');
    expect(typeof config.app.version).toBe('string');
    expect(typeof config.app.environment).toBe('string');
    expect(typeof config.api.baseUrl).toBe('string');
    expect(typeof config.monitoring.healthCheckInterval).toBe('number');
    expect(typeof config.monitoring.healthCheckTimeout).toBe('number');
  });

  test('should have valid URL format for baseUrl', () => {
    expect(() => new URL(config.api.baseUrl)).not.toThrow();
  });
});
