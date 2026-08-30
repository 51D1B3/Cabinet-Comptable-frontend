import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { PageHeader, Spinner, Badge } from '../../components/ui';
import { formatDate, statusLabel } from '../../utils/helpers';
import { Bell, BookOpen, MessageSquare, GraduationCap } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [inscriptions, setInscriptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/admin/dashboard'),
      api.get('/admin/inscriptions').catch(() => ({ data: { data: { total: 0, byFormation: [] } } })),
    ])
      .then(([dash, ins]) => {
        setData(dash.data.data);
        setInscriptions(ins.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  const kpis = [
    {
      label: 'Notifications',
      value: (data?.newRequests ?? 0) + (data?.newMessages ?? 0),
      to: '/admin/notifications',
      icon: Bell,
      color: 'bg-red-50 text-red-600',
    },
    {
      label: 'Publications',
      value: data?.articlesCount ?? 0,
      to: '/admin/actualites',
      icon: BookOpen,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Inscriptions formations',
      value: inscriptions?.total ?? 0,
      to: '#inscriptions',
      icon: GraduationCap,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Messages non lus',
      value: data?.newMessages ?? 0,
      to: '/admin/notifications',
      icon: MessageSquare,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Vue d'ensemble du cabinet." />

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          const isAnchor = k.to.startsWith('#');
          const Wrapper = ({ children }) => isAnchor
            ? <a href={k.to}>{children}</a>
            : <Link to={k.to}>{children}</Link>;
          return (
            <Wrapper key={k.label}>
              <div className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sea/40 hover:shadow-md sm:gap-4 sm:p-5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${k.color}`}>
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-ink-soft/60 sm:text-xs">{k.label}</p>
                  <p className="mt-0.5 font-display text-2xl font-bold text-ink sm:text-3xl">{k.value}</p>
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>

      {/* Bloc Inscriptions par formation */}
      <div id="inscriptions" className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <GraduationCap size={18} />
            </div>
            <h2 className="font-display text-lg text-ink">Inscriptions aux formations</h2>
          </div>
          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-700">
            {inscriptions?.total ?? 0} au total
          </span>
        </div>

        {(inscriptions?.byFormation || []).length === 0 ? (
          <div className="flex flex-col items-center py-8 text-center">
            <span className="text-3xl">🎓</span>
            <p className="mt-2 text-sm text-ink-soft/60">Aucune inscription pour le moment.</p>
            <p className="mt-1 text-xs text-ink-soft/40">Les inscriptions apparaîtront ici dès qu'une formation sera publiée et qu'un visiteur s'inscrit.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {inscriptions.byFormation.map((group) => (
              <div key={group.articleId} className="overflow-hidden rounded-xl border border-line">
                {/* En-tête de la formation */}
                <div className="flex items-center justify-between gap-3 bg-mist/50 px-4 py-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <BookOpen size={15} className="shrink-0 text-sea" />
                    <p className="truncate text-sm font-semibold text-ink">{group.articleTitle}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-sea px-3 py-0.5 text-xs font-bold text-white">
                    {group.count} inscrit{group.count > 1 ? 's' : ''}
                  </span>
                </div>
                {/* Liste des inscrits */}
                <div className="divide-y divide-line/50">
                  {group.inscriptions.slice(0, 5).map((ins) => (
                    <div key={ins.id} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sea/10 text-sea text-xs font-bold">
                          {ins.firstName?.charAt(0)}{ins.lastName?.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-ink text-xs sm:text-sm">{ins.firstName} {ins.lastName}</p>
                          <p className="truncate text-[11px] text-sea">{ins.email}</p>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        {ins.phone && <p className="text-[11px] text-ink-soft/60">{ins.phone}</p>}
                        <p className="text-[10px] text-ink-soft/40">{formatDate(ins.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                  {group.count > 5 && (
                    <p className="px-4 py-2 text-xs text-ink-soft/50 italic">
                      + {group.count - 5} autre{group.count - 5 > 1 ? 's' : ''} inscrit{group.count - 5 > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Demandes récentes */}
      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-ink">Demandes récentes</h2>
          <Link to="/admin/notifications" className="text-xs font-semibold text-sea hover:underline">
            Voir tout →
          </Link>
        </div>
        {(data?.recentRequests || []).length === 0 ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="text-3xl">📭</span>
            <p className="mt-2 text-sm text-ink-soft/60">Aucune demande reçue pour le moment.</p>
          </div>
        ) : (
          <div className="divide-y divide-line/50">
            {(data?.recentRequests || []).map((r) => (
              <div key={r.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink truncate">{r.firstName} {r.lastName}</p>
                  <p className="text-xs text-sea truncate">{r.email}</p>
                  <p className="mt-0.5 text-xs text-ink-soft/60 truncate">{r.need?.slice(0, 55)}</p>
                </div>
                <div className="shrink-0 text-right">
                  <Badge>{statusLabel(r.status)}</Badge>
                  <p className="mt-1 text-[10px] text-ink-soft/50">{formatDate(r.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
