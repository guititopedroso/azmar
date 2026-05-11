import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LayoutDashboard, LogOut, User, Package, CreditCard, FileText } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030d1a] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030d1a] flex">
      {/* Sidebar Simples */}
      <aside className="w-64 border-r border-white/5 bg-[#071428] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-lg bg-teal-400 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-[#030d1a]" />
          </div>
          <span className="font-bold text-white tracking-wider">AZMAR</span>
        </div>

        <nav className="space-y-1 grow">
          <SidebarLink icon={<LayoutDashboard className="w-5 h-5" />} label="Visão Geral" active />
          <SidebarLink icon={<Package className="w-5 h-5" />} label="Subscrições" />
          <SidebarLink icon={<CreditCard className="w-5 h-5" />} label="Pagamentos" />
          <SidebarLink icon={<FileText className="w-5 h-5" />} label="Faturas" />
          <SidebarLink icon={<User className="w-5 h-5" />} label="Perfil" />
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="grow p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-outfit">Olá, {user?.email?.split('@')[0]}</h1>
            <p className="text-gray-400">Bem-vindo à sua área de cliente AZMAR.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <User className="w-6 h-6 text-teal-400" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard title="Subscrição Ativa" value="Plano Premium" color="teal" />
          <StatusCard title="Próximo Pagamento" value="15 Mai, 2026" color="blue" />
          <StatusCard title="Faturas Pendentes" value="0" color="green" />
        </div>

        <div className="mt-10 card bg-[#0a1c38]/50 border-white/5">
          <h2 className="text-xl font-bold text-white mb-6 font-outfit">Últimas Atividades</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Fatura #FT-2026-00{i}</p>
                    <p className="text-xs text-gray-500">01 Mai, 2026</p>
                  </div>
                </div>
                <span className="text-teal-400 font-semibold">€299,00</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-teal-400/10 text-teal-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  );
}

function StatusCard({ title, value, color }: { title: string, value: string, color: string }) {
  return (
    <div className="p-6 rounded-2xl bg-[#0a1c38] border border-white/5">
      <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-semibold">{title}</p>
      <p className="text-2xl font-bold text-white font-outfit">{value}</p>
      <div className={`h-1 w-12 rounded-full mt-4 ${color === 'teal' ? 'bg-teal-400' : color === 'blue' ? 'bg-blue-400' : 'bg-green-400'
        }`}></div>
    </div>
  );
}
