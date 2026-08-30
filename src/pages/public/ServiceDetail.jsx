import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import { Button, Card, Spinner, Alert } from '../../components/ui';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/services/${slug}`)
      .then((r) => setService(r.data.data))
      .catch(() => setError('Service introuvable.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Spinner />;
  if (error || !service) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Alert tone="error">{error || 'Service introuvable.'}</Alert>
        <Link to="/services" className="mt-4 inline-block text-sea">
          Retour aux services
        </Link>
      </div>
    );
  }

  const list = (items) =>
    (items || []).map((item) => (
      <li key={item} className="text-sm text-ink-soft/85">
        • {item}
      </li>
    ));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-sea">{service.category}</p>
      <h1 className="mt-2 font-display text-4xl text-ink">{service.name}</h1>
      <p className="mt-4 max-w-3xl text-ink-soft/85">{service.description}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-display text-xl">Objectifs</h2>
          <ul className="mt-3 space-y-1">{list(service.objectives)}</ul>
        </Card>
        <Card>
          <h2 className="font-display text-xl">Problèmes traités</h2>
          <ul className="mt-3 space-y-1">{list(service.problems)}</ul>
        </Card>
        <Card>
          <h2 className="font-display text-xl">Avantages</h2>
          <ul className="mt-3 space-y-1">{list(service.advantages)}</ul>
        </Card>
        <Card>
          <h2 className="font-display text-xl">Processus</h2>
          <ul className="mt-3 space-y-1">{list(service.process)}</ul>
        </Card>
      </div>

      {service.requiredDocuments?.length > 0 && (
        <Card className="mt-6">
          <h2 className="font-display text-xl">Documents éventuellement nécessaires</h2>
          <ul className="mt-3 space-y-1">{list(service.requiredDocuments)}</ul>
          {service.frequency && (
            <p className="mt-4 text-sm text-ink-soft/70">Fréquence : {service.frequency}</p>
          )}
        </Card>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to={`/demande?service=${service.slug}`}>
          <Button>Demander ce service</Button>
        </Link>
          <Link to="/demande">
            <Button variant="outline">Demander un accompagnement</Button>
        </Link>
      </div>
    </div>
  );
}
