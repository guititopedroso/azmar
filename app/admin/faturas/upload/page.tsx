'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Upload, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const schema = z.object({
  client_id: z.string().min(1, 'Seleciona um cliente'),
  document_number: z.string().min(1, 'Número do documento obrigatório'),
  amount: z.string().min(1, 'Valor obrigatório'),
  issued_at: z.string().min(1, 'Data obrigatória'),
  status: z.enum(['issued', 'pending', 'overdue']),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function UploadFaturaPage() {
  const router = useRouter();
  const [clients, setClients] = useState<{ id: string; name: string; business_name: string }[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loadingClients, setLoadingClients] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'issued' },
  });

  // Carrega clientes ao montar
  useState(() => {
    (async () => {
      setLoadingClients(true);
      const supabase = createClient();
      const { data } = await supabase.from('clients').select('id, name, business_name').order('name');
      setClients(data ?? []);
      setLoadingClients(false);
    })();
  });

  async function onSubmit(data: FormData) {
    setServerError('');
    const supabase = createClient();
    let file_url: string | null = null;

    // Upload do PDF para Supabase Storage
    if (file) {
      const fileName = `${data.client_id}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('invoices')
        .upload(fileName, file, { contentType: 'application/pdf' });

      if (uploadError) {
        setServerError('Erro ao fazer upload do PDF. Verifica o ficheiro e tenta novamente.');
        return;
      }

      const { data: urlData } = supabase.storage.from('invoices').getPublicUrl(uploadData.path);
      file_url = urlData.publicUrl;
    }

    const { error } = await supabase.from('invoices').insert({
      client_id: data.client_id,
      document_number: data.document_number,
      amount: parseFloat(data.amount),
      issued_at: data.issued_at,
      status: data.status,
      description: data.description ?? null,
      file_url,
    });

    if (error) {
      setServerError('Erro ao guardar fatura. Tenta novamente.');
      return;
    }
    setSuccess(true);
    setTimeout(() => router.push('/admin/faturas'), 1500);
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-14">
          <div className="w-16 h-16 rounded-full bg-[rgba(45,212,191,0.12)] border border-[rgba(45,212,191,0.25)] flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-[#2dd4bf]" />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Fatura registada!</h2>
          <p className="text-[#94a3b8] text-sm">A redirecionar…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/faturas" className="text-[#94a3b8] hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-white text-2xl font-bold">Upload de Fatura PDF</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="card space-y-5">
          <div className="form-group">
            <label className="label">Cliente *</label>
            <select className="select" {...register('client_id')} disabled={loadingClients}>
              <option value="">Seleciona o cliente</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.business_name}
                </option>
              ))}
            </select>
            {errors.client_id && <span className="text-red-400 text-xs">{errors.client_id.message}</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="form-group">
              <label className="label">Número do documento *</label>
              <input className="input" placeholder="Ex: FT 2025/001" {...register('document_number')} />
              {errors.document_number && <span className="text-red-400 text-xs">{errors.document_number.message}</span>}
            </div>
            <div className="form-group">
              <label className="label">Valor (€) *</label>
              <input type="number" step="0.01" className="input" placeholder="0.00" {...register('amount')} />
              {errors.amount && <span className="text-red-400 text-xs">{errors.amount.message}</span>}
            </div>
            <div className="form-group">
              <label className="label">Data de emissão *</label>
              <input type="date" className="input" {...register('issued_at')} />
              {errors.issued_at && <span className="text-red-400 text-xs">{errors.issued_at.message}</span>}
            </div>
            <div className="form-group">
              <label className="label">Estado *</label>
              <select className="select" {...register('status')}>
                <option value="issued">Emitida</option>
                <option value="pending">Pendente</option>
                <option value="overdue">Em atraso</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="label">Descrição (opcional)</label>
            <input className="input" placeholder="Ex: Mensalidade Pack Business — Janeiro 2025" {...register('description')} />
          </div>

          {/* File upload */}
          <div className="form-group">
            <label className="label">Ficheiro PDF</label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                className="input cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[rgba(45,212,191,0.1)] file:text-[#2dd4bf] file:text-sm file:font-medium hover:file:bg-[rgba(45,212,191,0.2)]"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
            {file && (
              <p className="text-[#2dd4bf] text-xs mt-1.5">
                ✓ {file.name} ({(file.size / 1024).toFixed(0)} KB)
              </p>
            )}
          </div>
        </div>

        {serverError && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
            {serverError}
          </p>
        )}

        <div className="flex gap-3">
          <Link href="/admin/faturas" className="btn btn-secondary">Cancelar</Link>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> A guardar…</>
            ) : (
              <><Upload className="w-4 h-4" /> Guardar Fatura</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
