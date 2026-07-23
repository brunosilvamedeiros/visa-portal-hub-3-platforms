import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#051424] text-white p-8 flex flex-col items-center justify-center space-y-4">
          <div className="bg-[#122131] border border-rose-500/30 p-6 rounded-2xl max-w-md w-full space-y-4 text-center">
            <h2 className="text-lg font-bold text-rose-400">Ops! Algo deu errado ao carregar a aplicação.</h2>
            <p className="text-xs text-slate-300 bg-[#051424] p-3 rounded border border-[#273647] font-mono text-left overflow-auto max-h-32">
              {this.state.error?.toString()}
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="bg-[#FAA61A] text-[#0A142F] font-bold text-xs px-4 py-2 rounded-xl"
            >
              Recarregar Aplicação
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
