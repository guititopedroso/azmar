import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contactos — AZMAR',
  description:
    'Contacta a AZMAR por email, telefone ou WhatsApp. Trabalhamos em Setúbal, Margem Sul, Lisboa e remotamente em Portugal.',
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'geral@azmar.pt',
    href: 'mailto:geral@azmar.pt',
  },
  {
    icon: Phone,
    label: 'Telefone / WhatsApp',
    value: '+351 912 345 678',
    href: 'tel:+351912345678',
  },
  {
    icon: MapPin,
    label: 'Localização',
    value: 'Setúbal, Portugal',
    href: null,
  },
  {
    icon: Clock,
    label: 'Horário de contacto',
    value: 'Seg – Sex: 9h – 18h',
    href: null,
  },
];

export default function ContactosPage() {
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
          <div className="section-tag mx-auto">Estamos aqui</div>
          <h1 className="text-white mt-4 mb-5">
            Fala connosco,{' '}
            <span className="gradient-text">sem compromisso</span>
          </h1>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            Trabalhamos com negócios locais em Setúbal, Margem Sul, Lisboa e
            também com clientes em formato remoto.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Left: Info */}
            <div>
              <h2 className="text-white text-2xl mb-8">Informações de contacto</h2>

              <div className="space-y-5 mb-10">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[rgba(45,212,191,0.08)] border border-[rgba(45,212,191,0.15)] flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#2dd4bf]" />
                    </div>
                    <div>
                      <div className="text-[#94a3b8] text-xs mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white font-medium hover:text-[#2dd4bf] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-white font-medium">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div>
                <p className="text-[#94a3b8] text-sm mb-4">Redes sociais</p>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/azmar.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(7,20,40,0.6)] border border-[rgba(30,80,160,0.25)] text-[#94a3b8] hover:text-white hover:border-[rgba(45,212,191,0.3)] transition-all text-sm"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
                    Instagram
                  </a>
                  <a
                    href="https://linkedin.com/company/azmar-pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(7,20,40,0.6)] border border-[rgba(30,80,160,0.25)] text-[#94a3b8] hover:text-white hover:border-[rgba(45,212,191,0.3)] transition-all text-sm"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-10 rounded-2xl overflow-hidden border border-[rgba(30,80,160,0.25)] h-60 bg-gradient-to-br from-[#0d2244] to-[#071428] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[#2dd4bf] mx-auto mb-2" />
                  <p className="text-white font-medium">Setúbal, Portugal</p>
                  <p className="text-[#94a3b8] text-sm mt-1">
                    Área de atuação: Setúbal · Margem Sul · Lisboa · Portugal
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <h2 className="text-white text-2xl mb-8">Envia uma mensagem rápida</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
