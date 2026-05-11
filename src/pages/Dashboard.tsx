import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { createClient } from '../lib/supabase/client';
import ClientSidebar from '../components/dashboard/ClientSidebar';
import { FileText, ExternalLink } from 'lucide-react';
=======
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LayoutDashboard, LogOut, User, Package, CreditCard, FileText } from 'lucide-react';
>>>>>>> 572032653bd0fa9c00e26a2eb908d50f51383728

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
<<<<<<< HEAD
    async function init() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          // Fallback para Demo se não houver Supabase configurado
          if (!import.meta.env.VITE_SUPABASE_URL) {
            console.log('Using mock user for demo');
            setUser({ email: 'cliente.demo@azmar.pt', id: 'mock-id' });
            setProfile({ full_name: 'Cliente Demo' });
            setLoading(false);
            return;
          }
          navigate('/login');
          return;
        }

        setUser(user);
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setProfile(profile);
      } catch (error) {
        console.error('Auth error:', error);
        // Fallback no erro também para manter a demo funcional
        setUser({ email: 'cliente.demo@azmar.pt', id: 'mock-id' });
        setProfile({ full_name: 'Cliente Demo' });
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [navigate]);
=======
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        setUser(user);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  async function handleLogout() {
    await signOut(auth);
    navigate('/login');
  }
>>>>>>> 572032653bd0fa9c00e26a2eb908d50f51383728

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030d1a] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030d1a] flex flex-col lg:flex-row">
      <ClientSidebar user={user} profile={profile} />

      <main className="grow p-6 lg:p-10 lg:ml-0 overflow-y-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pt-14 lg:pt-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-outfit">
              Olá, {profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}
            </h1>
            <p className="text-gray-400">Bem-vindo à sua área de cliente AZMAR.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Portal Ativo</span>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatusCard title="Subscrição" value="Pack Business" color="teal" />
          <StatusCard title="Próxima Fatura" value="15 Jun, 2026" color="blue" />
          <StatusCard title="Estado Técnica" value="Operacional" color="green" />
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white font-outfit">Documentos Recentes</h2>
            <button className="text-sm font-bold text-teal-400 hover:underline uppercase tracking-widest flex items-center gap-2">
              Ver todos <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-glass border-white/5 flex items-center justify-between p-5 group hover:border-teal-400/30 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-teal-400/10 transition-colors">
                    <FileText className="w-6 h-6 text-gray-400 group-hover:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Fatura #FT-2026-00{i}</p>
                    <p className="text-xs text-gray-500">Emitida em 01 Mai, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">€299,00</p>
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Liquidada</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusCard({ title, value, color }: { title: string, value: string, color: string }) {
  const colorMap: any = {
    teal: 'from-teal-400 to-teal-600',
    blue: 'from-blue-400 to-blue-600',
    green: 'from-emerald-400 to-emerald-600'
  };

  return (
    <div className="card-glass border-white/5 p-6 relative overflow-hidden group">
      <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${colorMap[color] || colorMap.teal}`}></div>
      <p className="text-[10px] font-bold text-gray-500 mb-3 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-bold text-white font-outfit group-hover:text-teal-400 transition-colors">{value}</p>
    </div>
  );
}
