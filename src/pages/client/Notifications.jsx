import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Button, Card, PageHeader, Spinner, EmptyState } from '../../components/ui';
import { formatDate } from '../../utils/helpers';

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => api.get('/notifications').then((r) => setItems(r.data.data));

  useEffect(() => {
    load().finally(() => setLoading(false));
    const interval = window.setInterval(load, 3000);
    return () => window.clearInterval(interval);
  }, []);

  const markRead = async (id) => {
    await api.patch(`/notifications/${id}/read`);
    await load();
  };

  const markAll = async () => {
    await api.patch('/notifications/read-all');
    await load();
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Alertes dossiers, documents et messages."
        actions={<Button variant="outline" onClick={markAll}>Tout marquer lu</Button>}
      />
      {items.length === 0 ? (
        <EmptyState title="Aucune notification" />
      ) : (
        <div className="space-y-2">
          {items.map((n) => (
            <Card key={n.id} className={n.read ? 'opacity-70' : 'border-sea/30'}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{n.title}</p>
                  <p className="text-sm text-ink-soft/80">{n.content}</p>
                  <p className="mt-1 text-xs text-ink-soft/60">{n.category} · {formatDate(n.createdAt)}</p>
                </div>
                {!n.read && (
                  <Button variant="ghost" onClick={() => markRead(n.id)}>Marquer lu</Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
