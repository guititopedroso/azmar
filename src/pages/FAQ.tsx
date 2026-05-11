import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Quanto custa criar um website com a AZMAR?',
    a: 'O valor depende do tipo de projeto. O nosso Pack Start começa a partir de 150€ de setup + 25€/mês. Para projetos mais completos, o Pack Business começa em 400€ + 60€/mês e o Pack Growth em 750€ + 150€/mês. Para projetos específicos ou personalizados, fazemos sempre uma proposta à medida.',
  },
  {
    q: 'Trabalham apenas em Setúbal?',
    a: 'Não. Embora sejamos sediados em Setúbal e trabalhemos muito na Margem Sul e Lisboa, prestamos serviços a clientes em todo o Portugal, em formato remoto. A distância não é um obstáculo.',
  },
  {
    q: 'Fazem manutenção mensal?',
    a: 'Sim. Todos os nossos pacotes de website incluem a opção de manutenção mensal. Isso inclui atualizações, backups, verificação de links, pequenas alterações de conteúdo e apoio técnico.',
  },
  {
    q: 'Posso pedir só o website sem marketing?',
    a: 'Sim, claro. Podes contratar apenas a criação do website. Os serviços de marketing, redes sociais e branding são complementares e podem ser adicionados depois.',
  },
  {
    q: 'Fazem gestão de redes sociais?',
    a: 'Sim. A gestão de redes sociais está incluída no Pack Growth e pode ser adicionada como serviço avulso nos outros pacotes. Inclui criação de conteúdos, publicações regulares e planeamento de conteúdo.',
  },
  {
    q: 'Os pacotes têm fidelização?',
    a: 'Não aplicamos fidelização obrigatória. Trabalhamos com base na confiança e na qualidade do serviço. Podes cancelar a subscrição mensal com aviso prévio. As condições específicas são sempre descritas na proposta.',
  },
  {
    q: 'Quanto tempo demora a criar um site?',
    a: 'Depende da complexidade do projeto. Uma landing page simples pode ficar pronta em 5 a 7 dias úteis. Um website completo com várias páginas pode demorar entre 2 a 4 semanas. Após o briefing inicial, damos sempre uma estimativa de prazo.',
  },
  {
    q: 'Posso alterar conteúdos depois do site estar pronto?',
    a: 'Sim. Nos pacotes com manutenção incluída, pequenas alterações de conteúdo (textos, imagens, horários, etc.) estão incluídas. Para alterações maiores, fazemos orçamento separado.',
  },
  {
    q: 'A AZMAR trata do domínio e email profissional?',
    a: 'Podemos ajudar com o registo do domínio e configuração do email profissional. Dependendo do que já tens, orientamos ou tratamos de tudo. Estes serviços podem ter custo adicional conforme o caso.',
  },
  {
    q: 'Fazem anúncios pagos (Meta Ads)?',
    a: 'Sim. A criação e setup de Meta Ads (Facebook e Instagram) está incluído no Pack Growth. Para os outros pacotes, pode ser adicionado como serviço avulso. A gestão de budget de anúncios é da responsabilidade do cliente.',
  },
  {
    q: 'As faturas ficam disponíveis na área de cliente?',
    a: 'Sim. Na área de cliente tens acesso a todos os documentos de faturação. As faturas são emitidas externamente através de software certificado e disponibilizadas em PDF na tua área.',
  },
  {
    q: 'Posso cancelar uma subscrição?',
    a: 'Sim. Podes cancelar com aviso prévio de 30 dias. Não há penalizações por cancelamento, desde que respeitado o aviso prévio estabelecido na proposta. O website e conteúdos criados pela AZMAR ficam sujeitos às condições descritas nos Termos e Condições.',
  },
];

export default function FAQ() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#030d1a]" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37,99,176,0.5) 0%, transparent 70%)',
          }}
        />
        <div className="container relative z-10 text-center">
          <div className="section-tag mx-auto">Perguntas Frequentes</div>
          <h1 className="text-white mt-4 mb-5">
            Tens{' '}
            <span className="gradient-text">dúvidas?</span>
          </h1>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            Aqui encontras respostas às perguntas mais comuns. Se não encontrares
            o que procuras,{' '}
            <Link to="/contactos" className="text-[#2dd4bf] hover:underline font-medium">
              fala connosco
            </Link>.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section">
        <div className="container-sm">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>

          <div className="text-center mt-20 p-10 rounded-3xl bg-[rgba(37,99,176,0.05)] border border-[rgba(30,80,160,0.15)]">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#2dd4bf]/20 to-[#2563b0]/20 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-[#2dd4bf]" />
            </div>
            <h3 className="text-white text-xl mb-3">Ainda tens dúvidas?</h3>
            <p className="text-[#94a3b8] mb-8 max-w-sm mx-auto">
              Não encontraste a resposta que procuravas? A nossa equipa está pronta para ajudar.
            </p>
            <Link to="/contactos" className="btn btn-primary btn-lg">
              Falar com a equipa
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`card cursor-pointer transition-all duration-300 ${isOpen ? 'border-[rgba(45,212,191,0.3)] shadow-[0_0_30px_rgba(45,212,191,0.05)]' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between gap-4">
        <span className={`font-semibold text-base transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#e2e8f0]'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#2dd4bf] text-[#030d1a] rotate-180' : 'bg-white/5 text-[#2dd4bf]'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-5 mt-5 border-t border-[rgba(30,80,160,0.2)] text-[#94a3b8] text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
