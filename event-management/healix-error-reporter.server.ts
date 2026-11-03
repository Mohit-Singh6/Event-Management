// @healix:auto-error-tracking
const WEBHOOK_URL = "https://healix.mohits.site/api/telemetry/ingest/94eeff3a-8408-4475-b4a3-233082e364df";
const SERVICE_NAME = "Event-Management";

function errorDetails(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error && error.stack ? error.stack : message;
  return { message, stack };
}

export function reportServerError(
  error: unknown,
  route?: string,
  method?: string,
  routeType?: string,
) {
  try {
    const details = errorDetails(error);
    void fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceName: SERVICE_NAME,
        message: "[server] " + details.message,
        stackTrace: details.stack,
        environment: "server",
        route,
        method,
        routeType,
        endpoint: route,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});
  } catch {}
}

export function healixErrorTrackingMiddleware(error: unknown, request: { path?: string; method?: string; originalUrl?: string }, _response: unknown, next: (error?: unknown) => void) {
  reportServerError(error, request.originalUrl || request.path, request.method);
  next(error);
}

export function installProcessErrorHandlers() {
  if (typeof process === "undefined") return;
  process.on("uncaughtExceptionMonitor", (error) => reportServerError(error, "process", "uncaughtException"));
  process.on("unhandledRejection", (reason) => reportServerError(reason, "process", "unhandledRejection"));
}

installProcessErrorHandlers();
