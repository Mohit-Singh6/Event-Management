"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
type Props = { children: ReactNode };
type State = { failed: boolean };

import { reportClientError } from "./healix-error-reporter.client";

export class HealixAutoErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    reportClientError(error, typeof location !== "undefined" ? location.pathname : undefined);
    if (errorInfo.componentStack) {
      reportClientError(new Error(errorInfo.componentStack), typeof location !== "undefined" ? location.pathname : undefined);
    }
  }

  render() {
    if (this.state.failed) {
      return (
        <main role="alert" style={{ minHeight: "100vh", display: "grid", placeContent: "center", gap: "1rem", padding: "2rem", textAlign: "center" }}>
          <p>An unexpected error occurred. The incident has been acknowledged and logged for resolution.</p>
          <button type="button" onClick={() => this.setState({ failed: false })}>Try again</button>
        </main>
      );
    }
    return this.props.children;
  }
}
