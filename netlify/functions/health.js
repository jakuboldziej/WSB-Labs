exports.handler = async () => {
  const startTime = Date.now();

  try {
    // Basic health checks
    const healthChecks = {
      timestamp: new Date().toISOString(),
      status: 'healthy',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'production',
      uptime: process.uptime(),
      responseTime: null,
      deployment: {
        branch: process.env.BRANCH || 'unknown',
        commitSha: process.env.COMMIT_REF || 'unknown',
        buildId: process.env.BUILD_ID || 'unknown'
      },
      checks: {
        memory: process.memoryUsage(),
        nodeVersion: process.version,
        platform: process.platform
      }
    };

    // Simulate basic application health check
    const isHealthy = true; // Add your actual health check logic here

    // Check if we have recent errors (this would come from monitoring)
    const hasRecentErrors = false; // Implement based on your error tracking

    if (!isHealthy || hasRecentErrors) {
      throw new Error('Application health check failed');
    }

    healthChecks.responseTime = Date.now() - startTime;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(healthChecks)
    };
  } catch (error) {
    return {
      statusCode: 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        status: 'unhealthy',
        error: error.message,
        responseTime: Date.now() - startTime,
        environment: process.env.NODE_ENV || 'production'
      })
    };
  }
};
