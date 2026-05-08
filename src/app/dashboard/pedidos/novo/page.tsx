'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const schema = z.object({
  type: z.enum(['site_change', 'new_post', 'technical', 'meeting', 'other']),
  subject: z.string().min(3, 'Assunto obrigatório'),
  description: z.string().min(10, 'Descrição muito curta'),
  priority: z.enum(['low', 'medium', 'high']),
});

type FormData = z.infer<typeof schema>;

const types = [
  { value: 'site_change', label: 'Alteração no site' },
  { value: 'new_post', label: 'Nova publicação' },
  { value: 'technical', label: 'Problema técnico' },
  { value: 'meeting', label: 'Pedido de reunião' },
  { value: 'other', label: 'Outro' },
];

const priorities = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Média' },
  { value: 'high', label: 'Alta' },
];

export default function NovoPedidoPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'site_change', priority: 'medium' },
  });

  async function onSubmit(data: FormData) {
    setServerError('');
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    const { data: client } = await supabase
      .from('clients')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!client) {
      setServerError('Perfil de cliente não encontrado. Contacta geral@azmar.pt.');
      return;
    }

    const { error } = await supabase.from('support_requests').insert({
      client_id: client.id,
      type: data.type,
      subject: data.subject,
      description: data.description,
      priority: data.priority,
      status: 'received',
      attachments: [],
    });

    if (error) {
      setServerError('Erro ao enviar pedido. Tenta novamente.');
      return;
    }
    router.push('/dashboard/pedidos');
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/pedidos" className="text-[#94a3b8] hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-white text-2xl font-bold">Novo Pedido de Suporte</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="card space-y-5">
          <div className="form-group">
            <label className="label">Tipo de pedido *</label>
            <select className="select" {...register('type')}>
              {types.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Prioridade *</label>
            <select className="select" {...register('priority')}>
              {priorities.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Assunto *</label>
            <input className="input" placeholder="Descreve brevemente o pedido" {...register('subject')} />
            {errors.subject && <span className="text-red-400 text-xs">{errors.subject.message}</span>}
          </div>

          <div className="form-group">
            <label className="label">Descrição detalhada *</label>
            <textarea className="textarea" placeholder="Explica o que precisas com o máximo de detalhe possível…" {...register('description')} />
            {errors.description && <span className="text-red-400 text-xs">{errors.description.message}</span>}
          </div>
        </div>

        {serverError && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
            {serverError}
          </p>
        )}

        <div className="flex gap-3">
          <Link href="/dashboard/pedidos" className="btn btn-secondary">
            Cancelar
          </Link>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> A enviar…</> : <><Send className="w-4 h-4" /> Enviar Pedido</>}
          </button>
        </div>
      </form>
    </div>
  );
}
