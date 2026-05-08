import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = { title: 'Política de Cookies — AZMAR' };

export default function CookiesPage() {
  return (
    <LegalPageLayout title="Política de Cookies" lastUpdated="maio de 2025">
      <div className="space-y-6 text-[#94a3b8] text-sm leading-relaxed">
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">O que são cookies?</h2>
          <p>Cookies são pequenos ficheiros de texto armazenados no teu dispositivo quando visitas um website. Servem para melhorar a experiência de navegação e permitir determinadas funcionalidades.</p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">Cookies que utilizamos</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-white">Cookies essenciais:</strong> Necessários para o funcionamento do site (ex: autenticação, sessão).</li>
            <li><strong className="text-white">Cookies de análise:</strong> Utilizados para compreender como os visitantes utilizam o site (podem ser desativados).</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">Como gerir cookies</h2>
          <p>Podes gerir ou desativar cookies nas definições do teu browser. Ao desativar cookies essenciais, algumas funcionalidades do site podem não funcionar corretamente.</p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">Contacto</h2>
          <p>Para questões sobre cookies, contacta-nos em geral@azmar.pt.</p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
