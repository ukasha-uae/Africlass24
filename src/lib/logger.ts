/**
 * Centralized Logging Service
 * 
 * Replaces console.log/error/warn with environment-aware logging
 * - Development: Logs to console
 * - Production: Sends to error tracking service (Sentry)
 * - Can be extended to send to analytics/logging service
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private sentryClient: any = null;

  /**
   * Initialize error tracking service (Sentry)
   */
  initErrorTracking(dsn?: string) {
    if (this.isDevelopment || !dsn) {
      return;
    }

    // Sentry is initialized via sentry.client.config.ts
    // This method is kept for backward compatibility
    try {
      // Sentry types available after @sentry/nextjs installation
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        this.sentryClient = (window as any).Sentry;
      }
    } catch (error) {
      console.warn('Failed to initialize error tracking:', error);
    }
  }

  /**
   * Log debug messages (only in development)
   */
  debug(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, context || '');
    }
  }

  /**
   * Log info messages
   */
  info(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, context || '');
    }
    // In production, could send to analytics
  }

  /**
   * Log warnings
   */
  warn(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, context || '');
    } else if (this.sentryClient) {
      this.sentryClient.captureMessage(message, {
        level: 'warning',
        extra: context,
      });
    }
  }

  /**
   * Log errors
   */
  error(message: string, error?: Error | unknown, context?: LogContext) {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error, context || '');
    } else if (this.sentryClient) {
      if (error instanceof Error) {
        this.sentryClient.captureException(error, {
          extra: {
            message,
            ...context,
          },
        });
      } else {
        this.sentryClient.captureMessage(message, {
          level: 'error',
          extra: {
            error,
            ...context,
          },
        });
      }
    }
  }

  /**
   * Track user actions/events (for analytics)
   */
  track(event: string, properties?: LogContext) {
    if (this.isDevelopment) {
      console.debug(`[TRACK] ${event}`, properties || '');
    }
    // In production, send to analytics service
    // Example: analytics.track(event, properties);
  }

  /**
   * Set user context for error tracking
   */
  setUser(userId: string, email?: string, username?: string) {
    if (this.sentryClient) {
      this.sentryClient.setUser({
        id: userId,
        email,
        username,
      });
    }
  }

  /**
   * Clear user context
   */
  clearUser() {
    if (this.sentryClient) {
      this.sentryClient.setUser(null);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Initialize in browser environment
if (typeof window !== 'undefined') {
  // Initialize with DSN from environment variable
  const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (sentryDsn) {
    logger.initErrorTracking(sentryDsn);
  }
}

