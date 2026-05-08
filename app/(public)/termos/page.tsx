import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Termos e Condições — AZMAR',
  description: 'Termos e condições de utilização dos serviços da AZMAR.',
};

export default function TermosPage() {
  return (
    <LegalPageLayout title="Termos e Condições" lastUpdated="maio de 2025">
      <div className="space-y-6 text-[#94a3b8] text-sm leading-relaxed">
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">1. Identificação</h2>
          <p>
            A AZMAR é uma empresa de prestação de serviços digitais, sediada em
            Setúbal, Portugal. Para efeitos de contacto: geral@azmar.pt.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">2. Objeto</h2>
          <p>
            Os presentes Termos e Condições regulam a prestação de serviços
            digitais pela AZMAR ao cliente, nomeadamente criação de websites,
            marketing digital, branding, gestão de redes sociais, manutenção
            digital e automações.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">3. Contratação</h2>
          <p>
            A contratação de serviços é formalizada através de proposta
            comercial escrita aceite pelo cliente. O início dos trabalhos
            ocorre após confirmação formal por ambas as partes.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">4. Pagamentos</h2>
          <p>
            Os pagamentos são efetuados conforme as condições descritas em cada
            proposta. Em caso de atraso, a AZMAR reserva-se o direito de
            suspender os serviços até regularização da situação.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">5. Cancelamento</h2>
          <p>
            As subscrições mensais podem ser canceladas com aviso prévio de 30
            dias. O setup inicial não é reembolsável após o início dos
            trabalhos.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">6. Propriedade intelectual</h2>
          <p>
            Após liquidação integral dos serviços, os conteúdos criados pela
            AZMAR para o cliente são transferidos para propriedade do cliente.
            A AZMAR reserva o direito de exibir o trabalho no seu portefólio,
            salvo indicação contrária.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">7. Responsabilidade</h2>
          <p>
            A AZMAR não se responsabiliza por perdas indiretas decorrentes da
            utilização ou não-utilização dos serviços prestados. A
            responsabilidade total da AZMAR é limitada ao valor pago pelo
            cliente no período em causa.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">8. Lei aplicável</h2>
          <p>
            Os presentes Termos regem-se pela legislação portuguesa. Qualquer
            litígio será resolvido nos tribunais competentes da comarca de
            Setúbal.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
