import Link from 'next/link';
import { Waves } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030d1a] flex items-center justify-center p-6">
      <div
        className="fixed inset-0 opacity-15 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 30%, rgba(37,99,176,0.5) 0%, transparent 70%)',
        }}
      />
      <div className="text-center relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-[#2563b0] flex items-center justify-center">
            <Waves className="w-5 h-5 text-[#030d1a]" />
          </div>
          <span className="font-outfit font-bold text-xl tracking-wider text-white">AZMAR</span>
        </Link>
        <div className="font-outfit font-bold text-8xl text-[rgba(45,212,191,0.15)] mb-4">404</div>
        <h1 className="text-white text-3xl font-bold mb-4">Página não encontrada</h1>
        <p className="text-[#94a3b8] mb-8 max-w-md">
          A página que procuras não existe ou foi movida. Volta ao início e
          navega pelo nosso site.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-primary">
            Voltar ao início
          </Link>
          <Link href="/contactos" className="btn btn-secondary">
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}
