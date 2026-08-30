import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { Alert, Button, Input, Select, Textarea, Card } from '../../components/ui';

const TYPES = {
  quote: {
    title: 'Demander un devis',
    subtitle: 'Décrivez votre besoin et nous vous recontacterons sous 24 heures.',
    success: 'Demande de devis envoyée. Nous vous répondrons sous 24 h à l\'adresse e-mail indiquée.',
  },
  service: {
    title: 'Demander un accompagnement',
    subtitle: 'Expliquez-nous votre situation. Un conseiller vous contactera rapidement.',
    success: 'Demande enregistrée. Un conseiller vous répondra sous 24 h à l\'adresse e-mail indiquée.',
  },
  academic: {
    title: 'Suivi de mémoire — Inscription',
    subtitle: 'Remplissez ce formulaire pour démarrer votre accompagnement académique.',
    success: 'Inscription au suivi de mémoire enregistrée. Nous vous contacterons sous 24 h.',
  },
};

export default function QuoteRequest({ type = 'service', initialService = '' }) {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    sector: '',
    serviceSlug: searchParams.get('service') || initialService || '',
    need: '',
    budget: '',
    deadline: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    Promise.all([api.get('/services'), api.get('/sectors')])
      .then(([sv, sec]) => {
        setServices(sv.data.data || []);
        setSectors(sec.data.data || []);
      })
      .catch(() => {});
  }, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const reset = () => {
    setForm({ firstName: '', lastName: '', company: '', sector: '', serviceSlug: '', need: '', budget: '', deadline: '', phone: '', email: '' });
    setFile(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) {
      setStatus({ type: 'error', message: 'L\'adresse e-mail est obligatoire.' });
      return;
    }
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v) data.append(k, v); });
      data.append('type', type);
      if (file) data.append('attachment', file);
      await api.post('/requests', data);
      setStatus({ type: 'success', message: TYPES[type]?.success || 'Demande enregistrée.' });
      setSubmitted(true);
      reset();
    } catch (err) {
      const msg = err.response?.data?.message;
      if (err.code === 'ERR_NETWORK' || !err.response) {
        setStatus({ type: 'error', message: 'Impossible de joindre le serveur. Vérifiez votre connexion ou réessayez plus tard.' });
      } else {
        setStatus({ type: 'error', message: msg || 'Une erreur est survenue. Réessayez.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const meta = TYPES[type] || TYPES.service;

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-3xl">✓</div>
        <h2 className="mt-4 font-display text-2xl text-ink">Demande envoyée !</h2>
        <p className="mt-2 text-sm text-ink-soft/85">{meta.success}</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-sea underline"
        >
          Faire une nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">{meta.title}</h1>
      <p className="mt-3 text-sm text-ink-soft/85 sm:text-base">{meta.subtitle}</p>
      <Card className="mt-8">
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Prénom *" name="firstName" value={form.firstName} onChange={onChange} required autoComplete="given-name" />
            <Input label="Nom *" name="lastName" value={form.lastName} onChange={onChange} required autoComplete="family-name" />
          </div>
          {type !== 'academic' && <Input label="Entreprise / Établissement" name="company" value={form.company} onChange={onChange} autoComplete="organization" />}
          {type === 'academic' && (
            <Input label="E-mail *" type="email" name="email" value={form.email} onChange={onChange} required autoComplete="email" placeholder="votre@email.com" />
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {sectors.length > 0 && (
              <Select label="Secteur d'activité" name="sector" value={form.sector} onChange={onChange}>
                <option value="">Sélectionner…</option>
                {sectors.map((s) => (
                  <option key={s.id} value={s.slug}>{s.name}</option>
                ))}
              </Select>
            )}
            {services.length > 0 && (
              <Select label="Service concerné" name="serviceSlug" value={form.serviceSlug} onChange={onChange}>
                <option value="">Sélectionner…</option>
                {services.map((s) => (
                  <option key={s.id} value={s.slug}>{s.name}</option>
                ))}
              </Select>
            )}
          </div>
          <Textarea
            label="Décrivez votre besoin *"
            name="need"
            rows={4}
            value={form.need}
            onChange={onChange}
            required
            placeholder={type === 'academic'
              ? 'Ex. : Je prépare un mémoire en gestion financière, j\'ai besoin d\'aide pour la problématique et le plan…'
              : 'Ex. : Je cherche un suivi comptable mensuel pour mon entreprise de 5 salariés…'}
          />
          {type !== 'academic' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Budget éventuel" name="budget" value={form.budget} onChange={onChange} placeholder="Ex. : 50 000 FCFA/mois" />
              <Input label="Délai souhaité" name="deadline" value={form.deadline || ''} onChange={onChange} placeholder="Ex. : Dans 2 semaines" />
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {type !== 'academic' && <Input label="Téléphone *" name="phone" type="tel" value={form.phone || ''} onChange={onChange} required autoComplete="tel" placeholder="+223 XX XX XX XX" />}
            {type !== 'academic' && <Input label="E-mail *" type="email" name="email" value={form.email} onChange={onChange} required autoComplete="email" placeholder="votre@email.com" />}
          </div>
          <Input label="Document joint (facultatif)" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} accept=".pdf,.doc,.docx,.jpg,.png" />
          {status.message && (
            <Alert tone={status.type === 'success' ? 'success' : 'error'}>{status.message}</Alert>
          )}
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? 'Envoi en cours…' : 'Envoyer ma demande'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
