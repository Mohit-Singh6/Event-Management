import { reportServerError } from "./healix-error-reporter.server";
export function register() {
  if (typeof process === "undefined" || process.env.NEXT_RUNTIME !== "nodejs") return;
  process.on("uncaughtExceptionMonitor", (error) => {
    void reportServerError(error, "process", "uncaughtException");
  });
  process.on("unhandledRejection", (reason) => {
    void reportServerError(reason, "process", "unhandledRejection");
  });
}
import type { Instrumentation } from "next";
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  await reportServerError(error, request.path, request.method, context.routeType);
};

