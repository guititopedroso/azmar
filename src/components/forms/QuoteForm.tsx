import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Loader2, Send } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  business_name: z.string().min(2, 'Nome do negócio obrigatório'),
  activity: z.string().optional(),
  location: z.string().optional(),
  current_website: z.string().optional(),
  social_links: z.string().optional(),
  service: z.string().optional(),
  package_interest: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
  privacy: z.boolean().refine((v) => v === true, 'Deves aceitar a política de privacidade'),
});

type FormData = z.infer<typeof schema>;

const services = [
  { value: 'website', label: 'Criação de Website' },
  { value: 'marketing', label: 'Marketing Digital' },
  { value: 'social', label: 'Redes Sociais' },
  { value: 'branding', label: 'Branding' },
  { value: 'google', label: 'Google Business / SEO' },
  { value: 'manutencao', label: 'Manutenção Digital' },
  { value: 'outro', label: 'Outro' },
];

const packagesOptions = [
  { value: 'start', label: 'Pack Start' },
  { value: 'business', label: 'Pack Business' },
  { value: 'growth', label: 'Pack Growth' },
  { value: 'nao_sei', label: 'Ainda não sei' },
];

const budgetOptions = [
  { value: 'ate_300', label: 'Até 300€' },
  { value: '300_700', label: '300€ – 700€' },
  { value: '700_1500', label: '700€ – 1.500€' },
  { value: 'mais_1500', label: 'Mais de 1.500€' },
  { value: 'nao_sei', label: 'Ainda não sei' },
];

export default function QuoteForm() {
  const [searchParams] = useSearchParams();
  const defaultPack = searchParams.get('pack') ?? '';
  const defaultService = searchParams.get('servico') ?? '';

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      package_interest: defaultPack,
      service: defaultService,
      privacy: false,
    },
  });

  async function onSubmit(data: FormData) {
    setServerError('');
    try {
      await addDoc(collection(db, 'quote_requests'), {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        business_name: data.business_name,
        activity: data.activity ?? null,
        location: data.location ?? null,
        current_website: data.current_website ?? null,
        social_links: data.social_links ?? null,
        service: data.service ?? null,
        package_interest: data.package_interest ?? null,
        budget: data.budget ?? null,
        message: data.message ?? null,
        status: 'new',
        created_at: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Erro ao enviar pedido:', err);
      setServerError('Erro técnico. Por favor tenta mais tarde.');
    }
  }

  if (submitted) {
    return (
      <div className="card text-center py-14 px-8">
        <div className="w-16 h-16 rounded-full bg-[rgba(45,212,191,0.12)] border border-[rgba(45,212,191,0.25)] flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-[#2dd4bf]" />
        </div>
        <h2 className="text-white text-2xl mb-3">Pedido enviado!</h2>
        <p className="text-[#94a3b8] max-w-md mx-auto">
          Obrigado pelo teu pedido. A equipa AZMAR irá analisar a informação e
          entrar em contacto contigo brevemente.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
      {/* Dados pessoais */}
      <div className="card-glass">
        <h2 className="text-white text-xl font-bold mb-8 font-outfit">
          1. Os teus dados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          <div className="form-group">
            <label className="label" htmlFor="name">Nome *</label>
            <input id="name" className="input" placeholder="O teu nome" {...register('name')} />
            {errors.name && (
              <span className="text-red-400 text-xs mt-1">{errors.name.message}</span>
            )}
          </div>
          <div className="form-group">
            <label className="label" htmlFor="email">Email *</label>
            <input id="email" type="email" className="input" placeholder="teu@email.com" {...register('email')} />
            {errors.email && (
              <span className="text-red-400 text-xs mt-1">{errors.email.message}</span>
            )}
          </div>
          <div className="form-group">
            <label className="label" htmlFor="phone">Telefone / WhatsApp</label>
            <input id="phone" className="input" placeholder="+351 9XX XXX XXX" {...register('phone')} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="business_name">Nome do negócio *</label>
            <input id="business_name" className="input" placeholder="Nome do teu negócio" {...register('business_name')} />
            {errors.business_name && (
              <span className="text-red-400 text-xs mt-1">{errors.business_name.message}</span>
            )}
          </div>
          <div className="form-group">
            <label className="label" htmlFor="activity">Área de atividade</label>
            <input id="activity" className="input" placeholder="Ex: Restaurante, Ginásio, Barbearia…" {...register('activity')} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="location">Localização</label>
            <input id="location" className="input" placeholder="Ex: Setúbal, Lisboa…" {...register('location')} />
          </div>
        </div>
      </div>

      {/* Presença digital atual */}
      <div className="card-glass">
        <h2 className="text-white text-xl font-bold mb-8 font-outfit">
          2. Presença digital atual
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          <div className="form-group">
            <label className="label" htmlFor="current_website">Website atual (se existir)</label>
            <input id="current_website" className="input" placeholder="https://…" {...register('current_website')} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="social_links">Instagram / Facebook (se existir)</label>
            <input id="social_links" className="input" placeholder="@teuinstagram ou link" {...register('social_links')} />
          </div>
        </div>
      </div>

      {/* Serviço e pacote */}
      <div className="card-glass">
        <h2 className="text-white text-xl font-bold mb-8 font-outfit">
          3. O que precisas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          <div className="form-group">
            <label className="label" htmlFor="service">Serviço pretendido</label>
            <select id="service" className="select" {...register('service')}>
              <option value="">Seleciona um serviço</option>
              {services.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="label" htmlFor="package_interest">Pacote de interesse</label>
            <select id="package_interest" className="select" {...register('package_interest')}>
              <option value="">Seleciona um pacote</option>
              {packagesOptions.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group sm:col-span-2">
            <label className="label" htmlFor="budget">Orçamento estimado</label>
            <select id="budget" className="select" {...register('budget')}>
              <option value="">Seleciona um intervalo</option>
              {budgetOptions.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mensagem */}
      <div className="card-glass">
        <h2 className="text-white text-xl font-bold mb-8 font-outfit">4. Mensagem</h2>
        <div className="form-group">
          <label className="label" htmlFor="message">
            Conta-nos mais sobre o teu projeto (opcional)
          </label>
          <textarea
            id="message"
            className="textarea"
            placeholder="Descreve o teu negócio, o que precisas, dúvidas que tenhas…"
            {...register('message')}
          />
        </div>
      </div>

      {/* Privacy + Submit */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <input
            id="privacy"
            type="checkbox"
            className="mt-1 w-4 h-4 accent-[#2dd4bf] cursor-pointer"
            {...register('privacy')}
          />
          <label htmlFor="privacy" className="text-[#94a3b8] text-sm cursor-pointer">
            Concordo com a{' '}
            <a href="/privacidade" className="text-[#2dd4bf] hover:underline" target="_blank">
              Política de Privacidade
            </a>{' '}
            da AZMAR e autorizo o contacto para resposta a este pedido. *
          </label>
        </div>
        {errors.privacy && (
          <p className="text-red-400 text-xs">{errors.privacy.message}</p>
        )}

        {serverError && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-lg w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              A enviar…
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Enviar Pedido de Orçamento
            </>
          )}
        </button>
      </div>
    </form>
  );
}
