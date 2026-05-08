import { AlertTriangle } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <section className="relative pt-32 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-[#030d1a]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37,99,176,0.4) 0%, transparent 70%)',
          }}
        />
        <div className="container relative z-10 text-center">
          <div className="section-tag mx-auto">Legal</div>
          <h1 className="text-white mt-4 mb-4">{title}</h1>
          <p className="text-[#94a3b8] text-sm">
            Última atualização: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-sm">
          {/* Disclaimer banner */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[rgba(251,191,36,0.08)] border border-[rgba(251,191,36,0.2)] mb-10">
            <AlertTriangle className="w-5 h-5 text-[#fbbf24] shrink-0 mt-0.5" />
            <p className="text-[#94a3b8] text-sm">
              <strong className="text-[#fbbf24]">Nota importante:</strong> Este
              documento é um rascunho informativo e deve ser validado por um
              advogado ou contabilista antes da publicação final. Não substitui
              aconselhamento jurídico profissional.
            </p>
          </div>

          <div className="card prose-legal">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
