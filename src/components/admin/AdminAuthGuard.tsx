import React, { useState, useEffect } from 'react';
import { ShieldAlert, Lock, ArrowRight, Loader2 } from 'lucide-react';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se já está autorizado nesta sessão
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthorized(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'algura2026') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthorized(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030d1a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#030d1a] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-400/20">
              <Lock className="w-8 h-8 text-teal-400" />
            </div>
            <h1 className="text-2xl font-bold text-white font-outfit">Painel Administrativo</h1>
            <p className="text-gray-400 mt-2">Introduz a password de acesso restrito.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                autoFocus
                type="password"
                placeholder="Password de Administração"
                className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-teal-400 transition-all`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-4 bg-teal-400 text-[#030d1a] rounded-xl font-bold hover:bg-teal-300 transition-all flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm text-center animate-bounce">
                Password incorreta. Tenta novamente.
              </p>
            )}
          </form>

          <div className="mt-12 flex items-center gap-2 justify-center text-[10px] text-gray-600 uppercase tracking-widest font-bold">
            <ShieldAlert className="w-3 h-3" />
            Acesso Restrito · AZMAR Agency
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
