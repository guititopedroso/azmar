import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search
} from 'lucide-react';
import { createClient } from '../../lib/supabase/client';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Bell, label: 'Leads', path: '/admin/leads' },
    { icon: Users, label: 'Clientes', path: '/admin/clientes' },
    { icon: FileText, label: 'Faturas', path: '/admin/faturas' },
    { icon: ImageIcon, label: 'Portfólio', path: '/admin/portfolio' },
    { icon: Settings, label: 'Configurações', path: '/admin/config' },
  ];

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-[#030d1a] flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#071428] border-r border-white/5 transition-all duration-300 flex flex-col sticky top-0 h-screen z-30`}
      >
        {/* Logo Area */}
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-400 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-[#030d1a]" />
              </div>
              <span className="font-bold text-white tracking-wider">AZMAR</span>
            </Link>
          )}
          {!isSidebarOpen && (
            <div className="w-8 h-8 rounded-lg bg-teal-400 flex items-center justify-center mx-auto">
              <LayoutDashboard className="w-5 h-5 text-[#030d1a]" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="grow px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-teal-400/10 text-teal-400 shadow-[inset_0_0_20px_rgba(45,212,191,0.05)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 mx-auto" />}
            {isSidebarOpen && <span className="font-medium">Recolher</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0 mx-auto lg:mx-0" />
            {isSidebarOpen && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="grow flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-[#071428]/50 backdrop-blur-md border-bottom border-white/5 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4 grow max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Pesquisar clientes, faturas..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-teal-400/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-teal-400 rounded-full border-2 border-[#071428]"></span>
            </button>
            <div className="h-8 w-px bg-white/10 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">Admin</p>
                <p className="text-xs text-gray-500">Gestor AZMAR</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-400 to-[#2563b0] flex items-center justify-center font-bold text-[#030d1a]">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 grow overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
