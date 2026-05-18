import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("3D Canvas Error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center w-full h-full gap-3">
                    <p className="text-sm text-gray-500">3D view encountered an error.</p>
                    <button
                        className="text-xs px-3 py-1.5 rounded-lg bg-black text-white"
                        onClick={() => this.setState({ hasError: false, error: null })}
                    >
                        Retry
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
