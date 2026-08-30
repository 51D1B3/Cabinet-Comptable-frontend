import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { Alert, Button, Input, Textarea, Card } from '../../components/ui';
import { Mail, MapPin, MessageCircle, Phone, Clock } from 'lucide-react';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const isAppointment = searchParams.get('mode') === 'appointment';
  const [settings, setSettings] = useState(null);
  useEffect(() => {
    api.get('/settings').then((r) => setSettings(r.data.data)).catch(() => {});
  }, []);

  const [form, setForm] = useState({ firstName: '', lastName: '', company: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const reset = () => setForm({ firstName: '', lastName: '', company: '', email: '', subject: '', message: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim()) {
      setStatus({ type: 'error', message: 'L\'adresse e-mail est obligatoire.' });
      return;
    }
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const data = new FormData();
      data.append('firstName', form.firstName);
      data.append('lastName', form.lastName);
      data.append('company', form.company);
      data.append('email', form.email);
      data.append('subject', form.subject || 'Demande de contact');
      data.append('message', form.message || form.subject || 'Demande de contact');
      data.append('type', isAppointment ? 'appointment' : 'contact');
      data.append('consent', 'true');
      const response = await api.post('/contact', data);
      setStatus({
        type: response.data.emailSent === false ? 'error' : 'success',
        message: response.data.emailSent === false
          ? 'Votre message est enregistré, mais l’e-mail n’a pas pu être envoyé. Le serveur SMTP doit être configuré.'
          : 'Votre demande a bien été envoyée. Nous vous répondrons sous 24 h.',
      });
      setSubmitted(true);
      reset();
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || !err.response) {
        setStatus({ type: 'error', message: 'Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.' });
      } else {
        setStatus({ type: 'error', message: err.response?.data?.message || 'Envoi impossible. Contactez-nous par WhatsApp.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const whatsappNum = settings?.whatsapp?.replace(/\D/g, '') || '22376928012';
  const waMsg = encodeURIComponent('Bonjour, je souhaite obtenir des informations sur vos services de cabinet comptable. Pouvez-vous m\'aider ?');
  const waLink = `https://wa.me/${whatsappNum}?text=${waMsg}`;
  const buildMailtoLink = (email, subject, body) => `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const defaultEmailBody = 'Bonjour,\n\nJe souhaite obtenir des informations sur vos services. Merci de me recontacter au plus vite.\n\nCordialement,';

  const cards = [
    { href: waLink, icon: MessageCircle, title: 'WhatsApp', sub: 'Réponse rapide — message prédéfini', external: true },
    settings?.phone
      ? { href: `tel:${settings.phone}`, icon: Phone, title: 'Téléphone', sub: settings.phone }
      : { href: 'tel:+22376928012', icon: Phone, title: 'Téléphone', sub: '+223 76 92 80 12' },
    settings?.email
      ? { href: buildMailtoLink(settings.email, 'Demande de contact - Cabinet Comptable', defaultEmailBody), icon: Mail, title: 'E-mail', sub: settings.email }
      : { href: buildMailtoLink('hd684500@gmail.com', 'Demande de contact - Cabinet Comptable', defaultEmailBody), icon: Mail, title: 'E-mail', sub: 'hd684500@gmail.com' },
    { icon: MapPin, title: 'Adresse', sub: settings?.address || 'Kalanban Coura, Bamako, Mali' },
    { icon: Clock, title: 'Horaires', sub: settings?.hours || 'Lun–Ven 8h–17h' },
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="animate-slide-up">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Nous joindre</p>
        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">{isAppointment ? 'Prendre rendez-vous' : 'Contactez-nous'}</h1>
        <p className="mt-3 text-sm text-ink-soft/85 sm:text-base">
          Pour toute question sur nos services, formations ou le suivi de mémoire, nous sommes disponibles.
        </p>
      </div>

      {/* Cartes de contact */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          const inner = (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sea/10 text-sea">
                <Icon size={18} />
              </div>
              <p className="mt-3 text-sm font-semibold text-ink">{c.title}</p>
              <p className="mt-0.5 text-xs text-ink-soft/75 break-all">{c.sub}</p>
            </>
          );
          if (c.href) {
            const isWa = c.title === 'WhatsApp';
            return (
              <a
                key={c.title}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noreferrer' : undefined}
                className={`animate-slide-up rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  isWa
                    ? 'border-line bg-white text-ink hover:border-emerald-300 hover:bg-emerald-50'
                    : 'border-line bg-white hover:border-sea/40 hover:bg-sea/5'
                }`}
              >
                {inner}
              </a>
            );
          }
          return (
            <div key={c.title} className="animate-slide-up rounded-xl border border-line bg-white p-5 shadow-sm">
              {inner}
            </div>
          );
        })}
      </div>

      {/* Formulaire simplifié */}
      <Card className="mt-10 animate-slide-up">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Formulaire</p>
        <h2 className="mt-1 font-display text-xl text-ink">{isAppointment ? 'Demandez votre rendez-vous' : 'Envoyez-nous un message'}</h2>
        <p className="mt-1 text-sm text-ink-soft/75">Nous vous répondons à votre adresse e-mail sous 24 h.</p>

        {submitted ? (
          <div className="mt-6 rounded-xl bg-emerald-50 py-8 text-center border border-emerald-200">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">✓</div>
            <h3 className="mt-4 font-display text-lg text-ink">Demande envoyée !</h3>
            <p className="mt-2 text-sm text-ink-soft/80">Nous vous répondrons sous 24 h à l'adresse e-mail indiquée.</p>
            <button onClick={() => setSubmitted(false)} className="mt-4 text-sm font-semibold text-sea underline">
              Envoyer une autre demande
            </button>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Prénom *" name="firstName" value={form.firstName} onChange={onChange} required autoComplete="given-name" />
              <Input label="Nom *" name="lastName" value={form.lastName} onChange={onChange} required autoComplete="family-name" />
            </div>
            <Input label="Entreprise / Établissement" name="company" value={form.company} onChange={onChange} autoComplete="organization" />
            <Input label="E-mail *" type="email" name="email" value={form.email} onChange={onChange} required autoComplete="email" placeholder="votre@email.com" />
            {isAppointment && <Textarea label="Message *" name="message" value={form.message} onChange={onChange} required rows={5} placeholder="Indiquez vos disponibilités et votre besoin..." />}
            {!isAppointment && <Input label="Objet de votre demande" name="subject" value={form.subject} onChange={onChange} placeholder="Ex. : Renseignement formation, Suivi de mémoire…" />}
            {status.message && (
              <Alert tone={status.type === 'success' ? 'success' : 'error'}>{status.message}</Alert>
            )}
            <Button type="submit" disabled={loading} className="w-full sm:w-auto hover:-translate-y-0.5 transition-all duration-300">
              {loading ? 'Envoi en cours…' : isAppointment ? 'Envoyer le message' : 'Envoyer ma demande'}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
