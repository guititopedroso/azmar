import { useState } from 'react';
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
  message: z.string().min(10, 'Mensagem demasiado curta'),
  privacy: z.boolean().refine((v) => v === true, 'Aceita a política de privacidade'),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { privacy: false },
  });

  async function onSubmit(data: FormData) {
    setServerError('');
    try {
      await addDoc(collection(db, 'quote_requests'), {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        business_name: 'Contacto direto',
        message: data.message,
        status: 'new',
        service: 'contacto',
        created_at: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Erro ao enviar contacto:', err);
      setServerError('Erro técnico. Por favor tenta mais tarde.');
    }
  }

  if (submitted) {
    return (
      <div className="card text-center py-12">
        <div className="w-14 h-14 rounded-full bg-[rgba(45,212,191,0.12)] border border-[rgba(45,212,191,0.25)] flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-[#2dd4bf]" />
        </div>
        <h3 className="text-white text-xl mb-2">Mensagem enviada!</h3>
        <p className="text-[#94a3b8] text-sm">
          Respondemos em menos de 24 horas úteis.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="form-group">
        <label className="label" htmlFor="c-name">Nome *</label>
        <input id="c-name" className="input" placeholder="O teu nome" {...register('name')} />
        {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
      </div>
      <div className="form-group">
        <label className="label" htmlFor="c-email">Email *</label>
        <input id="c-email" type="email" className="input" placeholder="teu@email.com" {...register('email')} />
        {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label className="label" htmlFor="c-phone">Telefone</label>
        <input id="c-phone" className="input" placeholder="+351 9XX XXX XXX" {...register('phone')} />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="c-message">Mensagem *</label>
        <textarea id="c-message" className="textarea" placeholder="Escreve aqui a tua mensagem…" {...register('message')} />
        {errors.message && <span className="text-red-400 text-xs">{errors.message.message}</span>}
      </div>
      <div className="flex items-start gap-3">
        <input id="c-privacy" type="checkbox" className="mt-1 w-4 h-4 accent-[#2dd4bf] cursor-pointer" {...register('privacy')} />
        <label htmlFor="c-privacy" className="text-[#94a3b8] text-sm cursor-pointer">
          Aceito a{' '}
          <a href="/privacidade" className="text-[#2dd4bf] hover:underline" target="_blank">
            Política de Privacidade
          </a>
          . *
        </label>
      </div>
      {errors.privacy && <p className="text-red-400 text-xs">{errors.privacy.message}</p>}
      {serverError && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
          {serverError}
        </p>
      )}
      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> A enviar…</>
        ) : (
          <><Send className="w-4 h-4" /> Enviar Mensagem</>
        )}
      </button>
    </form>
  );
}
