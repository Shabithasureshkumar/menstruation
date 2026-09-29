import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Changing this value resets the boundary (e.g. the current route). */
  resetKey?: unknown;
  /** Smaller inline fallback for a single section instead of the whole page. */
  compact?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  resetKey: unknown;
}

/**
 * Catches render errors so one failing view never blanks the whole app. The
 * fallback shows a generic message only — no error text or patient data.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, resetKey: this.props.resetKey };

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  static getDerivedStateFromProps(props: ErrorBoundaryProps, state: ErrorBoundaryState): Partial<ErrorBoundaryState> | null {
    if (props.resetKey !== state.resetKey) return { hasError: false, resetKey: props.resetKey };
    return null;
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] Render error:', error, info.componentStack);
    }
  }

  private handleRetry = () => this.setState({ hasError: false });

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div
        role="alert"
        className={`w-full bg-white border border-[#F1DDE8] rounded-[1.6rem] shadow-card text-center ${
          this.props.compact ? 'p-5' : 'p-8 sm:p-10 my-6'
        }`}
      >
        <h2 className="text-lg font-black text-[#17152B]">Something went wrong</h2>
        <p className="text-sm text-[#68708A] mt-1.5 max-w-md mx-auto">
          This section couldn't be displayed. Your saved data has not been changed.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={this.handleRetry}
            className="min-h-[44px] px-5 rounded-full bg-[#F43F8F] hover:bg-[#E11D48] text-white text-sm font-bold transition-colors cursor-pointer"
          >
            Try again
          </button>
          {!this.props.compact && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="min-h-[44px] px-5 rounded-full hover:bg-gray-100 text-sm font-bold text-[#68708A] transition-colors cursor-pointer"
            >
              Reload page
            </button>
          )}
        </div>
      </div>
    );
  }
}
