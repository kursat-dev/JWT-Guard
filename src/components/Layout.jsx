import React from 'react';
import { ShieldCheck, Github } from 'lucide-react';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500/30 font-sans">
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10"></div>

            <header className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                            <ShieldCheck className="w-6 h-6 text-purple-400" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            JWT-Guard
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com/kursat-dev/JWT-Guard" className="text-slate-400 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12">
                {children}
            </main>

            <footer className="border-t border-white/5 py-8 mt-12">
                <div className="max-w-5xl mx-auto px-6 text-center text-slate-500 text-sm">
                    <p>Runs entirely in your browser. Tokens are never sent to any server.</p>
                    <p className="mt-2 text-slate-600">© {new Date().getFullYear()} JWT-Guard Security Analyzer</p>
                </div>
            </footer>
        </div>
    );
}
