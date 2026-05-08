'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Waves } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/servicos', label: 'Serviços' },
  { href: '/pacotes', label: 'Pacotes' },
  { href: '/portfolio', label: 'Portefólio' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contactos', label: 'Contactos' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha menu ao mudar de rota
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#030d1a]/95 backdrop-blur-xl border-b border-[rgba(30,80,160,0.2)] shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-[#2563b0] flex items-center justify-center shadow-lg group-hover:shadow-teal-400/30 transition-all duration-300">
              <Waves className="w-5 h-5 text-[#030d1a]" />
            </div>
            <span className="font-outfit font-bold text-xl tracking-wider text-white">
              AZMAR
            </span>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-white bg-white/8'
                    : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Login Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                'text-[#94a3b8] hover:text-white hover:bg-white/5'
              )}
            >
              Área Cliente
            </Link>
            <Link href="/orcamento" className="btn btn-primary btn-sm">
              Pedir Orçamento
            </Link>
          </div>

          {/* Hamburger Mobile */}
          <button
            className="lg:hidden text-[#94a3b8] hover:text-white transition-colors p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="lg:hidden bg-[#071428]/98 backdrop-blur-xl border-t border-[rgba(30,80,160,0.2)]">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  pathname === link.href
                    ? 'text-white bg-white/8'
                    : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[rgba(30,80,160,0.2)]">
              <Link href="/login" className="btn btn-secondary btn-sm text-center">
                Área Cliente
              </Link>
              <Link href="/orcamento" className="btn btn-primary btn-sm text-center">
                Pedir Orçamento
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
