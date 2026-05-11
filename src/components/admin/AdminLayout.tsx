import { ReactNode, useState, useEffect, useRef } from 'react';
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
  Search,
  MessageSquare,
  Clock,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const notificationRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Bell, label: 'Leads', path: '/admin/leads' },
    { icon: Users, label: 'Clientes', path: '/admin/clientes' },
    { icon: FileText, label: 'Faturas', path: '/admin/faturas' },
    { icon: ImageIcon, label: 'Portfólio', path: '/admin/portfolio' },
    { icon: Settings, label: 'Configurações', path: '/admin/config' },
  ];

  // Mock notifications
  const [notifications] = useState([
    { id: 1, title: 'Nova Lead: Padaria Central', time: 'Há 5 min', type: 'lead', unread: true },
    { id: 2, title: 'Fatura Paga: Restaurante Sabor', time: 'Há 2 horas', type: 'invoice', unread: true },
    { id: 3, title: 'Novo Projeto: Clínica Sorriso', time: 'Há 1 dia', type: 'portfolio', unread: false },
  ]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      navigate('/login');
    }
  }

  return (
    <div className="min-h-screen bg-[#030d1a] flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#071428] border-r border-white/5 transition-all duration-300 flex flex-col sticky top-0 h-screen z-30`}
      >
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
        <header className="h-20 bg-[#071428]/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-6 grow max-w-xl">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-all text-sm font-medium group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="hidden md:block">Voltar ao Site</span>
            </button>
            <div className="h-6 w-px bg-white/10 hidden md:block"></div>
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
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isNotificationsOpen ? 'bg-teal-400 text-[#030d1a]' : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <Bell className="w-5 h-5" />
                {notifications.some(n => n.unread) && (
                  <span className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full border-2 ${
                    isNotificationsOpen ? 'bg-white border-teal-400' : 'bg-teal-400 border-[#071428]'
                  }`}></span>
                )}
              </button>

              {/* Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-[#071428] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/2">
                    <span className="text-sm font-bold text-white font-outfit">Notificações</span>
                    <span className="text-[10px] font-bold text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-full">3 Novas</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`p-4 border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer flex gap-3 ${
                          notif.unread ? 'bg-teal-400/2' : ''
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                          notif.type === 'lead' ? 'bg-teal-400/10 text-teal-400' : 
                          notif.type === 'invoice' ? 'bg-blue-400/10 text-blue-400' : 
                          'bg-purple-400/10 text-purple-400'
                        }`}>
                          {notif.type === 'lead' ? <MessageSquare className="w-5 h-5" /> : 
                           notif.type === 'invoice' ? <FileText className="w-5 h-5" /> : 
                           <ImageIcon className="w-5 h-5" />}
                        </div>
                        <div className="grow min-w-0">
                          <p className={`text-sm mb-1 truncate ${notif.unread ? 'text-white font-bold' : 'text-gray-400'}`}>
                            {notif.title}
                          </p>
                          <p className="text-[10px] text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notif.time}
                          </p>
                        </div>
                        {notif.unread && (
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Link 
                    to="/admin/leads" 
                    onClick={() => setIsNotificationsOpen(false)}
                    className="p-4 block text-center text-xs font-bold text-teal-400 hover:bg-white/5 transition-all"
                  >
                    Ver todas as leads
                  </Link>
                </div>
              )}
            </div>

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
