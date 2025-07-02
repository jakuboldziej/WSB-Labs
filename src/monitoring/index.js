/**
 * Production monitoring and error tracking
 */

class ErrorTracker {
  constructor() {
    this.errors = [];
    this.maxErrors = 50;
    this.isProduction = import.meta.env.VITE_ENVIRONMENT === 'production';

    if (this.isProduction) {
      this.initErrorTracking();
    }
  }

  initErrorTracking() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.logError({
        type: 'javascript-error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString()
      });
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        type: 'unhandled-promise-rejection',
        message: event.reason?.message || event.reason,
        stack: event.reason?.stack,
        timestamp: new Date().toISOString()
      });
    });

    // React error boundary fallback
    this.setupReactErrorBoundary();
  }

  logError(errorInfo) {
    // Add to local storage for debugging
    this.errors.push(errorInfo);

    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // In production, you might want to send to external service
    if (this.isProduction) {
      console.error('Production Error:', errorInfo);

      // Example: Send to external error tracking service
      // this.sendToErrorService(errorInfo);
    }

    // Store in localStorage for health check reporting
    try {
      localStorage.setItem('app-errors', JSON.stringify(this.errors.slice(-5)));
    } catch (e) {
      // Handle localStorage quota exceeded
    }
  }

  sendToErrorService(errorInfo) {
    // Example implementation for external error tracking
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorInfo)
    // }).catch(() => {
    //   // Silently fail if error reporting fails
    // });
  }

  setupReactErrorBoundary() {
    // This would be implemented as a React Error Boundary component
    // For now, we'll just provide a global hook
    window.reportReactError = (error, errorInfo) => {
      this.logError({
        type: 'react-error-boundary',
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString()
      });
    };
  }

  getErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
    localStorage.removeItem('app-errors');
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.isProduction = import.meta.env.VITE_ENVIRONMENT === 'production';

    if (this.isProduction && 'performance' in window) {
      this.initPerformanceTracking();
    }
  }

  initPerformanceTracking() {
    // Core Web Vitals tracking
    this.trackCoreWebVitals();

    // Page load performance
    window.addEventListener('load', () => {
      setTimeout(() => this.trackPageLoad(), 0);
    });
  }

  trackCoreWebVitals() {
    // This is a simplified version - in production you'd use web-vitals library
    if ('performance' in window && 'observer' in window.PerformanceObserver.prototype) {
      // Track Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Browser doesn't support LCP
      }

      // Track First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
        });
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Browser doesn't support FID
      }
    }
  }

  trackPageLoad() {
    if ('performance' in window && 'timing' in window.performance) {
      const timing = window.performance.timing;

      this.metrics.pageLoad = {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart,
        domReady: timing.domComplete - timing.navigationStart,
        firstPaint: this.getFirstPaint(),
        timestamp: new Date().toISOString()
      };

      // Store metrics for health check reporting
      try {
        localStorage.setItem('app-performance', JSON.stringify(this.metrics));
      } catch (e) {
        // Handle localStorage quota exceeded
      }
    }
  }

  getFirstPaint() {
    if ('performance' in window && 'getEntriesByType' in window.performance) {
      const paintEntries = window.performance.getEntriesByType('paint');
      const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
      return firstPaint ? firstPaint.startTime : null;
    }
    return null;
  }

  getMetrics() {
    return this.metrics;
  }
}

// Initialize monitoring
const errorTracker = new ErrorTracker();
const performanceMonitor = new PerformanceMonitor();

// Export for use in health checks and debugging
window.appMonitoring = {
  errorTracker,
  performanceMonitor,
  getHealthData: () => ({
    errors: errorTracker.getErrors().slice(-3), // Last 3 errors
    performance: performanceMonitor.getMetrics(),
    timestamp: new Date().toISOString()
  })
};

export { errorTracker, performanceMonitor };
