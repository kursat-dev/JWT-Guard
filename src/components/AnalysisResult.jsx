import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, ShieldAlert, Lock, Calendar, Key, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function AnalysisResult({ result }) {
    if (!result.isValid) {
        if (!result.error) return null;
        return (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 flex items-center gap-3 animate-in fade-in">
                <XCircle className="w-5 h-5 shrink-0" />
                <span className="font-medium">Invalid Token Format</span>
                <span className="text-red-300/60 text-sm">({result.error})</span>
            </div>
        );
    }

    const { vulnerabilities, meta, header, payload } = result;

    const threatLevel = vulnerabilities.some(v => v.severity === 'CRITICAL') ? 'CRITICAL'
        : vulnerabilities.some(v => v.severity === 'HIGH') ? 'HIGH'
            : vulnerabilities.some(v => v.severity === 'MEDIUM') ? 'MEDIUM'
                : vulnerabilities.some(v => v.severity === 'LOW') ? 'LOW'
                    : 'SAFE';

    const Theme = {
        CRITICAL: { color: 'red', icon: ShieldAlert, bg: 'bg-red-500', border: 'border-red-500' },
        HIGH: { color: 'orange', icon: AlertTriangle, bg: 'bg-orange-500', border: 'border-orange-500' },
        MEDIUM: { color: 'yellow', icon: AlertTriangle, bg: 'bg-yellow-500', border: 'border-yellow-500' },
        LOW: { color: 'blue', icon: Info, bg: 'bg-blue-500', border: 'border-blue-500' },
        SAFE: { color: 'emerald', icon: CheckCircle, bg: 'bg-emerald-500', border: 'border-emerald-500' },
    }[threatLevel] || { color: 'slate', icon: CheckCircle }; // Fallback

    const StatusIcon = Theme.icon;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">

            {/* Status Header */}
            <div className={twMerge(
                "p-6 rounded-2xl border backdrop-blur-sm shadow-xl flex items-center justify-between gap-6 transition-colors",
                `bg-${Theme.color}-500/5 border-${Theme.color}-500/20 shadow-${Theme.color}-900/10`
            )}>
                <div className="flex items-center gap-4">
                    <div className={twMerge("p-3 rounded-xl", `bg-${Theme.color}-500/10`)}>
                        <StatusIcon className={twMerge("w-8 h-8", `text-${Theme.color}-400`)} />
                    </div>
                    <div>
                        <h2 className={twMerge("text-2xl font-bold tracking-tight", `text-${Theme.color}-400`)}>
                            {threatLevel === 'SAFE' ? 'Secure Token' : `${threatLevel} Risk Detected`}
                        </h2>
                        <p className={twMerge("text-sm mt-1", `text-${Theme.color}-200/60`)}>
                            {threatLevel === 'SAFE'
                                ? 'No common vulnerabilities found.'
                                : `Found ${vulnerabilities.length} issue${vulnerabilities.length > 1 ? 's' : ''}. INVESTIGATE IMMEDIATELY.`}
                        </p>
                    </div>
                </div>
                <div className="text-right hidden sm:block">
                    <span className={twMerge("px-4 py-1.5 rounded-full text-sm font-bold border", `bg-${Theme.color}-500/10 border-${Theme.color}-500/20 text-${Theme.color}-300`)}>
                        SCORE: {threatLevel === 'SAFE' ? '10/10' : threatLevel === 'CRITICAL' ? '0/10' : '5/10'}
                    </span>
                </div>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetaItem icon={Lock} label="Algorithm" value={meta.algorithm} />
                <MetaItem icon={Calendar} label="Expires" value={meta.expiration ? meta.expiration.toLocaleTimeString() : 'Never'} sub={meta.expiration?.toLocaleDateString()} />
                <MetaItem icon={Key} label="Type" value={header.typ || 'JWT'} />
                <MetaItem icon={ShieldAlert} label="Issues" value={vulnerabilities.length} />
            </div>

            {/* Vulnerabilities List */}
            {vulnerabilities.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-red-400" />
                        Security Findings
                    </h3>
                    <div className="space-y-3">
                        {vulnerabilities.map((v, i) => (
                            <div key={i} className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex gap-4 hover:border-white/10 transition-colors">
                                <div className={twMerge("w-1 h-full rounded-full min-h-[40px]",
                                    v.severity === 'CRITICAL' ? 'bg-red-500' :
                                        v.severity === 'HIGH' ? 'bg-orange-500' :
                                            v.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-blue-500'
                                )}></div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={twMerge("text-xs font-bold px-2 py-0.5 rounded border",
                                            v.severity === 'CRITICAL' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                                v.severity === 'HIGH' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                                                    v.severity === 'MEDIUM' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                        )}>{v.severity}</span>
                                        <span className="font-semibold text-slate-200">{v.title}</span>
                                    </div>
                                    <p className="text-slate-400 text-sm">{v.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Decoded Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CodeSection title="Header" data={header} />
                <CodeSection title="Payload" data={payload} />
            </div>

        </div>
    );
}

function MetaItem({ icon: Icon, label, value, sub }) {
    return (
        <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4 flex items-center gap-4">
            <div className="p-2.5 bg-slate-800 rounded-lg text-slate-400">
                <Icon className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
                <p className="text-slate-200 font-medium truncate" title={value}>{value}</p>
                {sub && <p className="text-xs text-slate-500 truncate">{sub}</p>}
            </div>
        </div>
    );
}

function CodeSection({ title, data }) {
    return (
        <div className="flex flex-col h-full bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <h3 className="font-semibold text-slate-300">{title}</h3>
                <span className="text-xs text-slate-500 font-mono">JSON</span>
            </div>
            <div className="relative flex-1 group">
                <pre className="p-6 text-sm font-mono text-blue-300 overflow-auto h-full max-h-[400px]">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    );
}


