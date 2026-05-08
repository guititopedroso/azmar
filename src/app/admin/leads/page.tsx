import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';

const statusOptions = ['new', 'contacted', 'in_proposal', 'closed', 'lost'];
const statusLabel: Record<string, string> = {
  new: 'Novo',
  contacted: 'Contactado',
  in_proposal: 'Em proposta',
  closed: 'Fechado',
  lost: 'Perdido',
};
const statusBadge: Record<string, string> = {
  new: 'badge-teal',
  contacted: 'badge-ocean',
  in_proposal: 'badge-yellow',
  closed: 'badge-green',
  lost: 'badge-red',
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { status } = await searchParams;

  let query = supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);

  const { data: leads } = await query;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-white text-2xl font-bold">Leads — Pedidos de Orçamento</h1>
        <span className="badge badge-teal">{leads?.length ?? 0} total</span>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <a
          href="/admin/leads"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !status ? 'bg-[#2dd4bf] text-[#030d1a]' : 'bg-[rgba(7,20,40,0.6)] text-[#94a3b8] border border-[rgba(30,80,160,0.25)] hover:text-white'
          }`}
        >
          Todos
        </a>
        {statusOptions.map((s) => (
          <a
            key={s}
            href={`/admin/leads?status=${s}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              status === s ? 'bg-[#2dd4bf] text-[#030d1a]' : 'bg-[rgba(7,20,40,0.6)] text-[#94a3b8] border border-[rgba(30,80,160,0.25)] hover:text-white'
            }`}
          >
            {statusLabel[s]}
          </a>
        ))}
      </div>

      {leads && leads.length > 0 ? (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="card">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`badge text-xs ${statusBadge[lead.status]}`}>
                      {statusLabel[lead.status]}
                    </span>
                    {lead.package_interest && (
                      <span className="badge badge-ocean text-xs">{lead.package_interest}</span>
                    )}
                    {lead.budget && (
                      <span className="badge badge-gray text-xs">{lead.budget}</span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold text-lg">
                    {lead.name} — {lead.business_name}
                  </h3>
                  <p className="text-[#94a3b8] text-sm">
                    {lead.email}
                    {lead.phone && ` · ${lead.phone}`}
                    {lead.location && ` · ${lead.location}`}
                  </p>
                </div>
                <div className="text-[#64748b] text-xs shrink-0">
                  {formatDate(lead.created_at)}
                </div>
              </div>

              {lead.message && (
                <p className="text-[#94a3b8] text-sm border-t border-[rgba(30,80,160,0.15)] pt-3 mb-3">
                  {lead.message}
                </p>
              )}

              {lead.notes && (
                <div className="text-sm text-[#2dd4bf] bg-[rgba(45,212,191,0.06)] border border-[rgba(45,212,191,0.15)] rounded-lg p-3">
                  <strong>Nota interna:</strong> {lead.notes}
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <a
                  href={`/admin/leads/${lead.id}`}
                  className="btn btn-secondary btn-sm"
                >
                  Ver detalhes
                </a>
                <a
                  href={`mailto:${lead.email}`}
                  className="btn btn-ghost btn-sm"
                >
                  Responder por email
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-14">
          <p className="text-[#94a3b8]">
            {status ? `Nenhuma lead com estado "${statusLabel[status]}".` : 'Nenhuma lead recebida.'}
          </p>
        </div>
      )}
    </div>
  );
}
