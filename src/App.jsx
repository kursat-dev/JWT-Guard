import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import JWTInput from './components/JWTInput';
import AnalysisResult from './components/AnalysisResult';
import { analyzeJWT } from './utils/jwtAnalyzer';

function App() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState({
    isValid: false,
    vulnerabilities: [],
    meta: { algorithm: 'Unknown' },
    header: {},
    payload: {}
  });

  useEffect(() => {
    let isMounted = true;

    // Simple debounce to avoid spamming on every keystroke
    const timeoutId = setTimeout(async () => {
      if (!token.trim()) {
        if (isMounted) setResult({ isValid: false, vulnerabilities: [], meta: {}, header: {}, payload: {} });
        return;
      }

      try {
        const res = await analyzeJWT(token);
        if (isMounted) setResult(res);
      } catch (error) {
        console.error(error);
      }
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [token]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Analyze your <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">JWT Security</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Paste a JSON Web Token to instantly decode it and detect common security vulnerabilities like weak secrets, "none" algorithm, and expiration issues.
          </p>
        </div>

        <JWTInput value={token} onChange={setToken} />

        <AnalysisResult result={result} />
      </div>
    </Layout>
  );
}

export default App;
