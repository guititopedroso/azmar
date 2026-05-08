import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Waves, Loader2, Eye, EyeOff } from 'lucide-react';
import { createClient } from '../lib/supabase/client';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Password deve ter pelo menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setServerError('');
    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        setServerError(authError.message);
        return;
      }

      if (authData.user) {
        // Buscar o role do perfil
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (profileError) {
          console.error('Erro ao buscar perfil:', profileError);
          navigate('/dashboard'); // Fallback
          return;
        }

        if (profile.role === 'admin' || profile.role === 'team') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      setServerError('Erro técnico: ' + (err.message || 'Desconhecido'));
    }
  }

  return (
    <div className="min-h-screen bg-[#030d1a] flex items-center justify-center p-4">
      {/* Background */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 30%, rgba(37,99,176,0.5) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-teal-400 to-[#2563b0] flex items-center justify-center shadow-lg group-hover:shadow-teal-400/30 transition-all">
              <Waves className="w-6 h-6 text-[#030d1a]" />
            </div>
            <span className="font-outfit font-bold text-2xl tracking-wider text-white">
              AZMAR
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="card">
          <h1 className="text-white text-2xl font-bold mb-1">Área de Cliente</h1>
          <p className="text-[#94a3b8] text-sm mb-8">
            Entra na tua conta para aceder ao dashboard.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="form-group">
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="teu@email.com"
                autoComplete="email"
                {...register('email')}
              />
              {errors.email && (
                <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  className="input pr-12"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors"
                  aria-label={showPass ? 'Esconder password' : 'Mostrar password'}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>
              )}
            </div>

            {serverError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> A entrar…</>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#94a3b8] text-sm mt-6">
          <Link to="/" className="hover:text-white transition-colors">
            ← Voltar ao site
          </Link>
        </p>
        <p className="text-center text-[#475569] text-xs mt-4">
          Área restrita a clientes AZMAR.
          <br />
          Não tens conta? Fala connosco em{' '}
          <a href="mailto:geral@azmar.pt" className="text-[#2dd4bf] hover:underline">
            geral@azmar.pt
          </a>
        </p>
      </div>
    </div>
  );
}
