import React, { useRef } from 'react';
import { Copy, X } from 'lucide-react';

export default function JWTInput({ value, onChange }) {
    const textareaRef = useRef(null);

    const handleClear = () => {
        onChange('');
        textareaRef.current?.focus();
    };

    return (
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Input Token
                </label>
                {value && (
                    <button
                        onClick={handleClear}
                        className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-white/5"
                    >
                        <X className="w-3 h-3" /> Clear
                    </button>
                )}
            </div>
            <div className="relative group">
                <textarea
                    ref={textareaRef}
                    className="w-full h-40 bg-slate-900/50 border border-white/10 rounded-2xl p-6 font-mono text-sm leading-relaxed text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all resize-none placeholder-slate-700 shadow-inner"
                    placeholder="Paste your JWT here (eyJhbGciOiJIUzI1NiIs...)"
                    value={value}
                    onChange={(e) => onChange(e.target.value.trim())}
                    spellCheck="false"
                />
                <div className="absolute bottom-4 right-4 text-xs text-slate-600 pointer-events-none">
                    {value.length > 0 ? `${value.length} chars` : ''}
                </div>
            </div>
        </div>
    );
}
