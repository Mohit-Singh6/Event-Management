// @healix:auto-error-tracking
const WEBHOOK_URL = "https://healix.mohits.site/api/telemetry/ingest/94eeff3a-8408-4475-b4a3-233082e364df";
const SERVICE_NAME = "Event-Management";

function errorDetails(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error && error.stack ? error.stack : message;
  return { message, stack };
}

export function reportClientError(
  error: unknown,
  route?: string,
  url?: string,
) {
  try {
    const details = errorDetails(error);
    const payload = JSON.stringify({
      serviceName: SERVICE_NAME,
      message: "[client] " + details.message,
      stackTrace: details.stack,
      environment: "client",
      route: route || (typeof location !== "undefined" ? location.pathname : undefined),
      url: url || (typeof location !== "undefined" ? location.href : undefined),
      endpoint: route || (typeof location !== "undefined" ? location.pathname : undefined),
      timestamp: new Date().toISOString(),
    });
    if (typeof navigator !== "undefined" && navigator.sendBeacon &&
        navigator.sendBeacon(WEBHOOK_URL, new Blob([payload], { type: "application/json" }))) return;
    void fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

if (typeof window !== "undefined") {
  const trackedWindow = window as Window & { __healixErrorTrackingInstalled?: boolean };
  if (!trackedWindow.__healixErrorTrackingInstalled) {
    trackedWindow.__healixErrorTrackingInstalled = true;
    window.addEventListener("error", (event) => {
      reportClientError(event.error ?? new Error(event.message), location.pathname, location.href);
    });
    window.addEventListener("unhandledrejection", (event) => {
      reportClientError(event.reason, location.pathname, location.href);
    });
  }
}
