import { Link } from 'react-router-dom';
import { Target, Heart, Zap, ArrowRight } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Foco em resultados',
    desc: 'Não criamos apenas sites bonitos. Criamos soluções que geram contactos e clientes reais para o teu negócio.',
  },
  {
    icon: Heart,
    title: 'Proximidade',
    desc: 'Tratamos cada cliente como se fosse o único. Conhecemos o teu negócio, o teu mercado e os teus objetivos.',
  },
  {
    icon: Zap,
    title: 'Simplicidade',
    desc: 'Sem complicações. Falamos a tua língua e entregamos soluções simples de usar e fáceis de entender.',
  },
];

export default function About() {
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
          <div className="section-tag mx-auto">Quem somos</div>
          <h1 className="text-white mt-4 mb-5">
            Feitos em Setúbal,{' '}
            <span className="gradient-text">pensados para crescer</span>
          </h1>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            A AZMAR nasceu da vontade de ajudar negócios locais a competir
            digitalmente com as ferramentas certas, ao alcance de qualquer
            empresa.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container-sm">
          <div className="card mb-10">
            <h2 className="text-white text-2xl mb-5">A nossa história</h2>
            <div className="space-y-4 text-[#94a3b8]">
              <p>
                A AZMAR nasceu em Setúbal com um propósito claro: democratizar
                o acesso a ferramentas digitais de qualidade para pequenos
                negócios locais. Vimos muitos negócios fantásticos que
                continuavam invisíveis online — ou com websites antigos que não
                os representavam.
              </p>
              <p>
                O nome AZMAR combina a essência do nosso território —
                <strong className="text-white"> o azul do mar</strong>, do rio
                Sado e da costa de Setúbal — com a ambição de criar algo que
                funcione tão bem visualmente quanto na prática.
              </p>
              <p>
                Hoje trabalhamos com restaurantes, ginásios, barbearias, clubes
                desportivos e muitos outros negócios — em Setúbal, na Margem
                Sul, em Lisboa e por todo o Portugal em formato remoto.
              </p>
            </div>
          </div>

          {/* Values */}
          <h2 className="text-white text-2xl mb-6">Os nossos valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {values.map((v) => (
              <div key={v.title} className="card text-center">
                <div className="w-12 h-12 rounded-xl bg-[rgba(45,212,191,0.08)] border border-[rgba(45,212,191,0.15)] flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-5 h-5 text-[#2dd4bf]" />
                </div>
                <h3 className="text-white text-base mb-2">{v.title}</h3>
                <p className="text-[#94a3b8] text-sm">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/orcamento" className="btn btn-primary btn-lg">
              Trabalha connosco
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
