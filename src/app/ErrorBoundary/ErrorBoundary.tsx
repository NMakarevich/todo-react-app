import { Component, type ErrorInfo, Suspense } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '@app/ErrorBoundary/types.ts';
import Fallback from '@app/ErrorBoundary/ui/Fallback/Fallback.tsx';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error.message);
    console.log(errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Suspense>
          <Fallback message={this.state.error} />
        </Suspense>
      );
    }

    return this.props.children;
  }
}
