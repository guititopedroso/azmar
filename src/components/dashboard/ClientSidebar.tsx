import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  CreditCard,
  FileText,
  History,
  MessageSquare,
  LogOut,
  Waves,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn, getInitials } from '@/lib/utils';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/subscricoes', icon: Package, label: 'Subscrições' },
  { href: '/dashboard/pagamentos', icon: CreditCard, label: 'Pagamentos' },
  { href: '/dashboard/faturas', icon: FileText, label: 'Faturas' },
  { href: '/dashboard/pedidos', icon: MessageSquare, label: 'Pedidos' },
  { href: '/dashboard/historico', icon: History, label: 'Histórico' },
];

interface Props {
  user: User;
  profile: any | null;
}

export default function ClientSidebar({ user, profile }: Props) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await signOut(auth);
    navigate('/');
  }

  const displayName = profile?.full_name ?? user.email ?? 'Cliente';
  const initials = getInitials(displayName);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-[#071428] border border-[rgba(30,80,160,0.3)] flex items-center justify-center text-[#94a3b8] hover:text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#071428] border-r border-[rgba(30,80,160,0.2)] flex flex-col z-40 transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[rgba(30,80,160,0.2)]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-teal-400 to-[#2563b0] flex items-center justify-center">
              <Waves className="w-4 h-4 text-[#030d1a]" />
            </div>
            <span className="font-outfit font-bold text-lg tracking-wider text-white">
              AZMAR
            </span>
          </Link>
        </div>

        {/* User info */}
        <div className="p-6 border-b border-[rgba(30,80,160,0.2)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#2563b0] to-[#2dd4bf] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-white font-medium text-sm truncate">{displayName}</div>
              <div className="text-[#64748b] text-xs truncate">{user.email}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="text-[#475569] text-xs font-semibold uppercase tracking-widest mb-3 px-2">
            Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                      active
                        ? 'bg-[rgba(45,212,191,0.1)] text-[#2dd4bf] border border-[rgba(45,212,191,0.2)]'
                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                    )}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[rgba(30,80,160,0.2)]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#94a3b8] hover:text-white hover:bg-white/5 transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            Terminar sessão
          </button>
        </div>
      </aside>
    </>
  );
}
