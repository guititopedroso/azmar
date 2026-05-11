'use client';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  FileText,
  Briefcase,
  MessageSquare,
  Star,
  TrendingUp,
  Settings,
  LogOut,
  Waves,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface NavItem {
  href: string;
  icon: any;
  label: string;
  exact?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Geral',
    items: [
      { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    ],
  },
  {
    label: 'Negócio',
    items: [
      { href: '/admin/clientes', icon: Users, label: 'Clientes' },
      { href: '/admin/pacotes', icon: Package, label: 'Pacotes' },
      { href: '/admin/subscricoes', icon: TrendingUp, label: 'Subscrições' },
      { href: '/admin/pagamentos', icon: CreditCard, label: 'Pagamentos' },
      { href: '/admin/faturas', icon: FileText, label: 'Faturas' },
    ],
  },
  {
    label: 'Conteúdo',
    items: [
      { href: '/admin/portfolio', icon: Briefcase, label: 'Portefólio' },
      { href: '/admin/leads', icon: TrendingUp, label: 'Leads' },
      { href: '/admin/pedidos', icon: MessageSquare, label: 'Pedidos' },
      { href: '/admin/reviews', icon: Star, label: 'Reviews' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { href: '/admin/definicoes', icon: Settings, label: 'Definições' },
    ],
  },
];

interface Props {
  user: User;
  role: string;
}

export default function AdminSidebar({ user, role }: Props) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    navigate('/');
  }

  function isActive(href: string, exact = false) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-[#071428] border border-[rgba(30,80,160,0.3)] flex items-center justify-center text-[#94a3b8]"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#071428] border-r border-[rgba(30,80,160,0.2)] flex flex-col z-40 transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[rgba(30,80,160,0.2)]">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-teal-400 to-[#2563b0] flex items-center justify-center">
              <Waves className="w-4 h-4 text-[#030d1a]" />
            </div>
            <div>
              <span className="font-outfit font-bold text-lg tracking-wider text-white">AZMAR</span>
              <div className="text-[#2dd4bf] text-[10px] font-semibold uppercase tracking-widest -mt-0.5">
                {role === 'admin' ? 'Admin' : 'Equipa'}
              </div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 overflow-y-auto space-y-6">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[#475569] text-[10px] font-semibold uppercase tracking-widest mb-2 px-2">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href, item.exact);
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
            </div>
          ))}
        </nav>

        {/* User + logout */}
        <div className="p-4 border-t border-[rgba(30,80,160,0.2)] space-y-1">
          <div className="px-3 py-2 text-xs text-[#64748b] truncate">{user.email}</div>
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
