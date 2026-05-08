import type { Metadata } from 'next';
import { Suspense } from 'react';
import OrcamentoForm from './OrcamentoForm';

export const metadata: Metadata = {
  title: 'Pedir Orçamento — AZMAR',
  description:
    'Pede um orçamento gratuito para criação de website, marketing digital, branding ou outros serviços digitais para o teu negócio local.',
};

export default function OrcamentoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-[#030d1a]" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37,99,176,0.5) 0%, transparent 70%)',
          }}
        />
        <div className="container relative z-10 text-center">
          <div className="section-tag mx-auto">Sem compromisso</div>
          <h1 className="text-white mt-4 mb-5">
            Pede o teu{' '}
            <span className="gradient-text">orçamento gratuito</span>
          </h1>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            Preenche o formulário e a equipa AZMAR entra em contacto contigo
            em menos de 48 horas com uma proposta personalizada.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section-sm">
        <div className="container-sm">
          <Suspense fallback={<div className="text-[#94a3b8]">A carregar...</div>}>
            <OrcamentoForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
