"use client";

import { useEffect } from "react";
import { reportClientError } from "./healix-error-reporter.client";

export default function GlobalError({ error, retry, reset }: { error: Error & { digest?: string }; retry?: () => void; reset?: () => void }) {
  useEffect(() => {
    reportClientError(error, typeof location !== "undefined" ? location.pathname : undefined);
  }, [error]);
  const retryAction = retry ?? reset ?? (() => window.location.reload());

  return (
    <html>
      <body>
        <main role="alert" style={{ minHeight: "100vh", display: "grid", placeContent: "center", gap: "1rem", padding: "2rem", textAlign: "center" }}>
          <p>An unexpected error occurred. The incident has been acknowledged and logged for resolution.</p>
          <button type="button" onClick={() => retryAction()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
