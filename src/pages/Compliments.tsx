import { ExternalLink, Heart } from 'lucide-react';
import LegalPageLayout from '../components/layout/LegalPageLayout';

export default function Compliments() {
  return (
    <LegalPageLayout title="Livro de Elogios" lastUpdated="maio de 2025">
      <div className="space-y-6 text-[#94a3b8] text-sm leading-relaxed">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            </div>
            <h2 className="text-white text-lg font-semibold">Valorizamos o teu feedback</h2>
          </div>
          <p>
            Na AZMAR, trabalhamos diariamente para superar as expetativas dos nossos clientes. 
            Se ficaste satisfeito com o nosso trabalho, o teu elogio é a melhor forma de motivar a nossa equipa.
          </p>
        </section>

        <section>
          <div className="p-5 rounded-xl bg-[rgba(45,212,191,0.08)] border border-[rgba(45,212,191,0.2)]">
            <p className="text-white font-semibold mb-2">Livro de Elogios Online</p>
            <p className="mb-4">Podes registar o teu elogio no portal oficial do Livro de Elogios:</p>
            <a
              href="https://www.livrodeelogios.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn btn-primary btn-sm"
            >
              livrodeelogios.pt
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-white text-lg font-semibold mb-3">Obrigado pela confiança</h2>
          <p>
            Cada projeto é único e dedicamos o máximo esforço para garantir que o resultado final 
            ajuda realmente o teu negócio a crescer. Se preferires, podes também deixar um 
            testemunho direto enviando um email para:
            <a href="mailto:geral@azmar.pt" className="text-[#2dd4bf] ml-1 hover:underline">
              geral@azmar.pt
            </a>
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
