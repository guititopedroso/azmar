import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Waves, Loader2, Eye, EyeOff, ShieldCheck, ChevronRight } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

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
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      if (user) {
        // Buscar o role do perfil no Firestore
        const docRef = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.error('Perfil não encontrado no Firestore');
          navigate('/dashboard'); // Fallback
          return;
        }

        const profile = docSnap.data();

        if (profile.role === 'admin' || profile.role === 'team') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      let message = 'Erro técnico: ' + (err.message || 'Desconhecido');
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = 'Email ou password incorretos.';
      }
      setServerError(message);
    }
  }

  return (
    <div className="min-h-screen bg-[#030d1a] flex items-center justify-center p-4">
      {/* Background with higher opacity for premium look */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 30%, rgba(37,99,176,0.4) 0%, transparent 80%)',
        }}
      />

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-teal-400 to-[#2563b0] flex items-center justify-center shadow-lg group-hover:shadow-teal-400/30 transition-all duration-300">
              <Waves className="w-7 h-7 text-[#030d1a]" />
            </div>
            <span className="font-outfit font-bold text-3xl tracking-wider text-white">
              AZMAR
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="card-glass border-white/10 p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-teal-400 to-[#2563b0]"></div>
          
          <div className="mb-8">
            <h1 className="text-white text-2xl font-bold mb-2 font-outfit">Área de Cliente</h1>
            <p className="text-gray-400 text-sm">
              Entra na tua conta para aceder ao dashboard e faturas.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="form-group">
              <label className="label" htmlFor="email">Email de Acesso</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="teu@email.com"
                {...register('email')}
              />
              {errors.email && (
                <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <div className="flex justify-between items-center mb-1">
                <label className="label mb-0" htmlFor="password">Password</label>
                <Link to="/recovery" className="text-[10px] font-bold text-teal-400 hover:underline uppercase tracking-widest">Esqueci-me</Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  className="input pr-12"
                  placeholder="••••••••"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>
              )}
            </div>

            {serverError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-in shake duration-300">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full py-4 text-lg"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> A validar…</>
              ) : (
                'Entrar na Conta'
              )}
            </button>
          </form>

          {/* Admin Bypass for Demo - Highly Visible as requested */}
          <div className="mt-10 pt-8 border-t border-white/5 space-y-4">
            <p className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">Acesso Administrativo</p>
            <button 
              onClick={() => navigate('/admin')}
              className="w-full group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-teal-400/30 hover:bg-teal-400/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">Entrar como Admin</p>
                  <p className="text-[10px] text-gray-500">Acesso à gestão da AZMAR (Demo)</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>

        <div className="text-center mt-8 space-y-4">
          <Link to="/" className="text-sm text-gray-500 hover:text-white transition-all flex items-center justify-center gap-2">
             ← Voltar à página inicial
          </Link>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest leading-relaxed">
            Área de acesso restrito a clientes e equipa AZMAR.
            <br />
            © 2024 AZMAR Digital Agency.
          </p>
        </div>
      </div>
    </div>
  );
}
