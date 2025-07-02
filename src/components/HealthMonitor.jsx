import { useState, useEffect } from 'react';
import { getEnvironment } from '../utils/env';

// eslint-disable-next-line react-refresh/only-export-components
export const useHealthCheck = () => {
  const [healthStatus, setHealthStatus] = useState({
    status: 'unknown',
    lastCheck: null,
    responseTime: null,
    error: null
  });
  const checkHealth = async () => {
    const startTime = Date.now();

    try {
      const env = getEnvironment();
      const isDevelopment = env.DEV;

      if (isDevelopment) {
        // In development mode, use mock data since Netlify functions aren't available
        const mockData = {
          timestamp: new Date().toISOString(),
          status: 'healthy',
          version: '1.0.0-dev',
          environment: 'development',
          responseTime: Date.now() - startTime,
          deployment: {
            branch: 'local',
            commitSha: 'development',
            buildId: 'local-dev'
          },
          checks: {
            nodeVersion: '18.x.x',
            platform: 'development'
          }
        };

        setHealthStatus({
          status: 'healthy',
          lastCheck: new Date().toISOString(),
          responseTime: Date.now() - startTime,
          error: null,
          data: mockData
        });

        return true;
      }

      // In production, try to fetch from actual health endpoint
      const response = await fetch('/.netlify/functions/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Health endpoint returned non-JSON response');
      }

      const data = await response.json();
      const responseTime = Date.now() - startTime;

      setHealthStatus({
        status: 'healthy',
        lastCheck: new Date().toISOString(),
        responseTime,
        error: null,
        data
      });

      return true;
    } catch (error) {
      setHealthStatus({
        status: 'unhealthy',
        lastCheck: new Date().toISOString(),
        responseTime: Date.now() - startTime,
        error: error.message
      });

      return false;
    }
  };

  useEffect(() => {
    // Initial health check
    checkHealth();

    // Set up periodic health checks
    const env = getEnvironment();
    const interval = setInterval(
      checkHealth,
      parseInt(env.VITE_HEALTH_CHECK_INTERVAL) || 30000
    );

    return () => clearInterval(interval);
  }, []);

  return { healthStatus, checkHealth };
};

export const HealthMonitor = () => {
  const { healthStatus, checkHealth } = useHealthCheck();

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'unhealthy': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return '✅';
      case 'unhealthy': return '❌';
      default: return '⚠️';
    }
  };

  const env = getEnvironment();

  if (env.VITE_ENVIRONMENT === 'production' && !env.VITE_ENABLE_DEBUG) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">Health Status</h3>
        <button
          onClick={checkHealth}
          className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-1 text-xs">
        {env.DEV && (
          <div className="flex justify-between mb-2 p-1 bg-yellow-100 rounded">
            <span className="text-yellow-800 font-semibold">Development Mode</span>
            <span className="text-yellow-600">Mock Data</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Status:</span>
          <span className={`font-semibold ${getStatusColor(healthStatus.status)}`}>
            {getStatusIcon(healthStatus.status)} {healthStatus.status}
          </span>
        </div>

        {healthStatus.responseTime && (
          <div className="flex justify-between">
            <span>Response Time:</span>
            <span>{healthStatus.responseTime}ms</span>
          </div>
        )}

        {healthStatus.data?.environment && (
          <div className="flex justify-between">
            <span>Environment:</span>
            <span className="capitalize">{healthStatus.data.environment}</span>
          </div>
        )}

        {healthStatus.lastCheck && (
          <div className="flex justify-between">
            <span>Last Check:</span>
            <span>{new Date(healthStatus.lastCheck).toLocaleTimeString()}</span>
          </div>
        )}

        {healthStatus.error && (
          <div className="text-red-500 text-xs mt-2">
            Error: {healthStatus.error}
          </div>
        )}
      </div>
    </div>
  );
};
