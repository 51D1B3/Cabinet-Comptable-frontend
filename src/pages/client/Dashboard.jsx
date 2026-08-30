import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Badge, Card, PageHeader, Spinner, EmptyState } from '../../components/ui';
import { statusLabel } from '../../utils/helpers';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/client/dashboard').then((r) => setData(r.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (!data) return <EmptyState title="Impossible de charger le tableau de bord" />;

  return (
    <div>
      <PageHeader
        title={`Bonjour ${data.user?.firstName || ''}`}
        subtitle="Voici ce qui nécessite votre attention."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-xs uppercase text-ink-soft/60">Notifications</p>
          <p className="mt-2 font-display text-3xl">{data.unreadNotifications || 0}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase text-ink-soft/60">Rendez-vous à venir</p>
          <p className="mt-2 font-display text-3xl">{(data.upcomingAppointments || []).length}</p>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="font-display text-xl">Prochains rendez-vous</h2>
          <div className="mt-4 space-y-3">
            {(data.upcomingAppointments || []).length === 0 && (
              <p className="text-sm text-ink-soft/70">Aucun rendez-vous à venir.</p>
            )}
            {(data.upcomingAppointments || []).map((a) => (
              <div key={a.id} className="flex items-center justify-between border-b border-line/60 pb-2 text-sm">
                <span>{a.date} · {a.startTime}</span>
                <Badge tone="info">{statusLabel(a.status)}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
