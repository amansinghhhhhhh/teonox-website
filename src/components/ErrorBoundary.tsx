import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    try {
      window.location.href = '/';
    } catch {
      window.location.reload();
    }
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#201A17] flex items-center justify-center p-6 font-['Sora',sans-serif]">
          <div className="max-w-md w-full bg-white rounded-2xl border border-[#EBE4DC] p-8 text-center shadow-lg space-y-5">
            <div className="w-14 h-14 bg-[#FFF0EB] text-[#F15A29] rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
              !
            </div>
            <h2 className="text-2xl font-bold text-[#111111]">
              Something went wrong
            </h2>
            <p className="text-[#555555] text-sm leading-relaxed">
              An unexpected display issue occurred. Click below to reload the page safely.
            </p>
            {this.state.error && (
              <div className="p-3 bg-[#F5F2ED] rounded-xl text-left text-xs font-mono text-[#888888] overflow-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}
            <button type="button"
              onClick={this.handleReset}
              className="w-full py-3.5 px-6 bg-[#F15A29] hover:bg-[#D9491D] text-white font-bold rounded-xl transition-colors shadow-md active:scale-95 cursor-pointer"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
