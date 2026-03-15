import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Brain, LogIn, AlertCircle } from 'lucide-react';

export default function Login() {
    const { loginWithGoogle } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleGoogleLogin() {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            console.error("Failed to sign in:", err);
            setError('Failed to sign in. Please try again or check your configuration.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden items-center justify-center p-4 transition-colors duration-200">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex flex-col p-8 border border-slate-200 dark:border-slate-700/50 relative overflow-hidden">

                {/* Glow Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-[-10%] w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

                <div className="flex flex-col items-center justify-center text-center z-10 space-y-2 mb-8 mt-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl shadow-sm mb-4">
                        <Brain size={48} className="animate-pulse" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Welcome Back</h1>
                    <p className="text-slate-500 dark:text-slate-400">Sign in to continue to your Research Assistant</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-900/50 flex items-start text-sm z-10 transition-all duration-300 shadow-sm">
                        <AlertCircle size={18} className="mr-2 mt-0.5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="flex flex-col gap-4 w-full z-10">
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="flex items-center justify-center w-full bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3 font-medium transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-70 group"
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="group-hover:-translate-y-[1px] transition-transform duration-200">
                            {loading ? 'Signing In...' : 'Continue with Google'}
                        </span>
                    </button>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700/50 flex justify-center z-10">
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        Generative AI Research Assistant
                    </div>
                </div>
            </div>
        </div>
    );
}
