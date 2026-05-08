import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = { title: 'Livro de Reclamações — AZMAR' };

export default function ReclamacoesPage() {
  return (
    <LegalPageLayout title="Livro de Reclamações" lastUpdated="maio de 2025">
      <div className="space-y-6 text-[#94a3b8] text-sm leading-relaxed">
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">Livro de Reclamações Eletrónico</h2>
          <p>
            Ao abrigo do Decreto-Lei n.º 74/2017 e legislação aplicável, os
            consumidores têm direito a apresentar reclamações através do Livro
            de Reclamações Eletrónico.
          </p>
        </section>
        <section>
          <div className="p-5 rounded-xl bg-[rgba(37,99,176,0.08)] border border-[rgba(37,99,176,0.2)]">
            <p className="text-white font-semibold mb-2">Livro de Reclamações Online</p>
            <p className="mb-4">Para submeter uma reclamação, acede ao portal oficial:</p>
            <a
              href="https://www.livroreclamacoes.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn btn-ocean btn-sm"
            >
              livroreclamacoes.pt
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">Resolução Alternativa de Litígios</h2>
          <p>
            Em caso de litígio, o consumidor pode recorrer a uma entidade de
            Resolução Alternativa de Litígios (RAL). Para mais informações,
            consulta o portal do consumidor em{' '}
            <a
              href="https://www.consumidor.gov.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2dd4bf] hover:underline"
            >
              consumidor.gov.pt
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-3">Contacto direto</h2>
          <p>
            Antes de apresentar uma reclamação formal, convidamo-te a contactar
            a nossa equipa para resolvermos a situação de forma direta e rápida:
            <a href="mailto:geral@azmar.pt" className="text-[#2dd4bf] ml-1 hover:underline">
              geral@azmar.pt
            </a>
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
