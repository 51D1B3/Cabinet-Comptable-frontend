import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Button, Spinner } from '../../components/ui';
import { getSafeImageUrl } from '../../utils/helpers';
import { ArrowRight, BookOpen, Calendar, CheckCircle2, Clock, GraduationCap, MapPin, MessageCircle, Star, X } from 'lucide-react';

/* ── Modal inscription ── */
function InscriptionModal({ formation, onClose }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) {
      setError('Prénom, nom et e-mail sont obligatoires.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/inscriptions', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        articleId: formation.id,
        articleTitle: formation.title,
      });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-start justify-between gap-3 border-b border-line bg-sea/5 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sea">Inscription</p>
            <h2 className="mt-0.5 font-display text-lg text-ink leading-tight">{formation.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-0.5 rounded-full p-1.5 text-ink-soft/60 hover:bg-line hover:text-ink transition"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          {done ? (
            /* ── Succès ── */
            <div className="flex flex-col items-center py-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-3xl">
                ✓
              </div>
              <h3 className="mt-4 font-display text-xl text-ink">Inscription confirmée !</h3>
              <p className="mt-2 text-sm text-ink-soft/80">
                Votre inscription à <strong>{formation.title}</strong> a bien été enregistrée.
                Nous vous contacterons à <strong>{form.email}</strong> pour confirmer les détails.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-lg bg-sea px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sea-dark"
              >
                Fermer
              </button>
            </div>
          ) : (
            /* ── Formulaire ── */
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <p className="text-sm text-ink-soft/75">
                Remplissez ce formulaire pour vous inscrire. Notre équipe vous contactera pour confirmer votre place.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink">Prénom *</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="Ex. : Aminata"
                    className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-sea focus:ring-1 focus:ring-sea transition"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-ink">Nom *</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Ex. : Koné"
                    className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-sea focus:ring-1 focus:ring-sea transition"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">E-mail *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="votre@email.com"
                  className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-sea focus:ring-1 focus:ring-sea transition"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Téléphone (optionnel)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+223 XX XX XX XX"
                  className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-sea focus:ring-1 focus:ring-sea transition"
                />
              </div>
              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-sea py-3 text-sm font-semibold text-white transition hover:bg-sea-dark hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Envoi en cours…' : 'Confirmer mon inscription'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const STATIC_FORMATIONS = [
  {
    id: 's1',
    title: 'Comptabilité générale — Niveau débutant',
    summary: 'Maîtrisez les bases de la comptabilité : bilan, compte de résultat, écritures comptables et déclarations fiscales courantes. Formation pratique sur cas réels.',
    duration: '4 semaines',
    mode: 'Présentiel & en ligne',
    level: 'Débutant',
    price: 'Sur devis',
    slug: 'comptabilite-generale-debutant',
    certificate: true,
    image: '/image2.png',
  },
  {
    id: 's2',
    title: 'Logiciel Sage Comptabilité',
    summary: 'Formation complète sur Sage 100 Comptabilité : saisie, lettrage, rapprochement bancaire, bilans automatisés. Certification incluse.',
    duration: '2 semaines',
    mode: 'Présentiel',
    level: 'Intermédiaire',
    price: 'Sur devis',
    slug: 'sage-comptabilite',
    certificate: true,
    image: '/image1.jpg',
  },
  {
    id: 's3',
    title: 'Fiscalité des entreprises au Mali',
    summary: 'TVA, impôt sur les sociétés, patente, déclarations DGI. Formation dispensée par des fiscalistes expérimentés sur les textes en vigueur.',
    duration: '3 semaines',
    mode: 'Présentiel',
    level: 'Intermédiaire',
    price: 'Sur devis',
    slug: 'fiscalite-entreprises-mali',
    certificate: false,
    image: '/fond.png',
  },
  {
    id: 's4',
    title: 'Gestion et pilotage d\'entreprise',
    summary: 'Tableaux de bord, analyse financière, gestion de trésorerie, budget prévisionnel. Acquérez les outils pour piloter votre activité efficacement.',
    duration: '3 semaines',
    mode: 'Présentiel & en ligne',
    level: 'Avancé',
    price: 'Sur devis',
    slug: 'gestion-pilotage-entreprise',
    certificate: true,
    image: '/image5.png',
  },
  {
    id: 's5',
    title: 'Excel pour la comptabilité et la gestion',
    summary: 'Tableaux croisés dynamiques, formules avancées, automatisation de rapports comptables. Formation très pratique, orientée métiers financiers.',
    duration: '1 semaine',
    mode: 'Présentiel & en ligne',
    level: 'Tous niveaux',
    price: 'Sur devis',
    slug: 'excel-comptabilite-gestion',
    certificate: false,
    image: '/fond.png',
  },
  {
    id: 's6',
    title: 'Audit interne & contrôle de gestion',
    summary: 'Techniques d\'audit, cartographie des risques, contrôle interne, tableau de bord prospectif. Destiné aux futurs auditeurs et contrôleurs de gestion.',
    duration: '4 semaines',
    mode: 'Présentiel',
    level: 'Avancé',
    price: 'Sur devis',
    slug: 'audit-controle-gestion',
    certificate: true,
    image: '/img-accounting-team.jpg',
  },
];

const AVANTAGES = [
  'Formateurs professionnels en exercice',
  'Cas pratiques tirés d\'entreprises réelles',
  'Petits groupes (max 15 participants)',
  'Support de cours fourni',
  'Certificat de participation délivré',
  'Suivi post-formation disponible',
];

export default function Formations() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalFormation, setModalFormation] = useState(null); // formation sélectionnée pour inscription

  useEffect(() => {
    api.get('/articles').then((response) => {
      const filtered = (response.data.data || []).filter((article) =>
        ['formation', 'formations'].includes(String(article.category).toLowerCase())
      );
      setFormations(filtered);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const displayFormations = formations.length > 0 ? formations : STATIC_FORMATIONS;
  const isStatic = formations.length === 0;

  return (
    <div className="min-w-0 overflow-x-hidden">
      {/* Modal inscription */}
      {modalFormation && (
        <InscriptionModal
          formation={modalFormation}
          onClose={() => setModalFormation(null)}
        />
      )}

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(5,20,36,0.92) 0%, rgba(5,20,36,0.68) 50%, rgba(15,107,107,0.28) 100%), url(/fond.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24 md:py-32">
          <p className="animate-slide-up text-xs font-semibold uppercase tracking-[0.2em] text-white/65">Apprendre pour progresser</p>
          <h1 className="animate-slide-up animation-delay-100 mt-3 max-w-2xl font-display text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Formations professionnelles
          </h1>
          <p className="animate-slide-up animation-delay-200 mt-5 max-w-xl text-sm text-white/80 sm:text-base md:text-lg">
            Comptabilité, gestion, fiscalité, outils informatiques — des formations pratiques dispensées par des professionnels en exercice pour accélérer votre carrière.
          </p>
          <div className="animate-slide-up animation-delay-300 mt-8 flex flex-wrap gap-3">
            <a href="#formations-liste">
              <Button className="bg-white !text-ink shadow-lg hover:-translate-y-1 hover:bg-sand transition-all duration-300">
                <GraduationCap size={16} /> Voir le catalogue
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" className="border-white/50 bg-ink/40 text-white hover:-translate-y-1 hover:bg-ink/60 transition-all duration-300">
                <MessageCircle size={16} /> Renseignements
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Points forts */}
      <section className="border-b border-line bg-white/60 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Star, label: 'Formateurs experts', sub: 'Professionnels en exercice' },
              { icon: BookOpen, label: 'Contenu pratique', sub: 'Cas réels, exercices concrets' },
              { icon: Clock, label: 'Horaires flexibles', sub: 'Matin, soir, week-end' },
              { icon: GraduationCap, label: 'Certificat délivré', sub: 'Pour les formations éligibles' },
            ].map(({ icon: Icon, label, sub }, i) => (
              <div
                key={label}
                className="animate-slide-up card-hover flex items-start gap-3 rounded-xl border border-line bg-white p-5 shadow-sm"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sea/10 text-sea">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{label}</p>
                  <p className="mt-0.5 text-xs text-ink-soft/75">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo formateur + avantages */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="animate-slide-up overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/image2.png"
              alt="Séance de formation au cabinet"
              className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-96"
            />
          </div>
          <div className="animate-slide-up animation-delay-200">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Nos atouts</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              Pourquoi se former avec nous ?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft/85">
              Nos formations sont conçues pour être immédiatement applicables sur le terrain. Pas de théorie creuse — des compétences concrètes que vous utilisez dès le lendemain.
            </p>
            <ul className="mt-6 space-y-2.5">
              {AVANTAGES.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-soft/90">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-sea" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/contact">
                <Button className="hover:-translate-y-0.5 transition-all duration-300">
                  Demander un devis <ArrowRight size={15} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue formations */}
      <div id="formations-liste" className="border-t border-line bg-mist/30 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Catalogue</p>
              <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">Nos formations</h2>
              <p className="mt-2 text-sm text-ink-soft/75">
                {isStatic ? 'Catalogue actuel — Contactez-nous pour les prochaines sessions.' : 'Sessions disponibles — Places limitées.'}
              </p>
            </div>
            {loading && <Spinner />}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {displayFormations.map((formation, i) => (
              <div
                key={formation.id}
                className="animate-slide-up card-hover overflow-hidden rounded-xl border border-line bg-white shadow-sm flex flex-col"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Image de la formation */}
                <div className="overflow-hidden">
                  <img
                    src={getSafeImageUrl(formation.imageUrl || formation.image, '/image5.png')}
                    alt={formation.title || 'Formation'}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = '/image5.png';
                    }}
                    className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-sea">Formation</span>
                    {formation.certificate && (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        ✓ Certificat
                      </span>
                    )}
                    {formation.level && (
                      <span className="rounded-full bg-sea/10 px-2.5 py-0.5 text-xs font-semibold text-sea">
                        {formation.level}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 font-display text-xl text-ink sm:text-2xl">{formation.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft/80">{formation.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-soft/70">
                    {formation.duration && (
                      <span className="inline-flex items-center gap-1"><Clock size={12} /> {formation.duration}</span>
                    )}
                    {formation.mode && (
                      <span className="inline-flex items-center gap-1"><MapPin size={12} /> {formation.mode}</span>
                    )}
                    {formation.startDate && (
                      <span className="inline-flex items-center gap-1 font-semibold text-sea"><Calendar size={12} /> {formation.startDate}</span>
                    )}
                    {formation.price && (
                      <span className="font-semibold text-sea">{formation.price}</span>
                    )}
                  </div>
                  {formation.seats && (
                    <p className="mt-2 text-sm font-semibold text-accent">⚠ Plus que {formation.seats} places</p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-3 border-t border-line pt-4">
                    {!isStatic && (
                      <Link to={`/actualites/${formation.slug}`}>
                        <Button variant="outline" className="text-sm hover:-translate-y-0.5 transition-all duration-200">
                          Détails <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </Link>
                    )}
                    {/* Bouton S'inscrire : ouvre modal si formation réelle, sinon contact */}
                    {isStatic ? (
                      <Link to="/contact">
                        <Button className="text-sm hover:-translate-y-0.5 transition-all duration-200">
                          S'inscrire
                        </Button>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setModalFormation(formation)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-sea px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sea-dark hover:-translate-y-0.5 active:scale-95"
                      >
                        <GraduationCap size={15} /> S'inscrire
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA bas */}
          <div className="mt-12 overflow-hidden rounded-2xl bg-sea">
            <div className="relative">
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'url(/fond.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="relative flex flex-col gap-6 px-8 py-10 text-white md:flex-row md:items-center md:justify-between md:px-12">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl">Vous ne trouvez pas votre formation ?</h2>
                  <p className="mt-2 text-sm text-white/80">
                    Nous organisons des formations sur mesure pour votre entreprise ou votre équipe. Contactez-nous pour un programme personnalisé.
                  </p>
                </div>
                <Link to="/contact" className="shrink-0">
                  <Button className="bg-white !text-sea hover:bg-sand shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lien suivi mémoire */}
      <section className="border-t border-line py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="overflow-hidden rounded-2xl border border-line">
            <div className="grid md:grid-cols-2">
              <div className="overflow-hidden">
                <img
                  src="/image5.png"
                  alt="Suivi de mémoire"
                  className="h-56 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-full md:min-h-[260px]"
                />
              </div>
              <div className="flex flex-col justify-center bg-mist/50 px-8 py-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sea/10 text-sea mb-4">
                  <BookOpen size={24} />
                </div>
                <h2 className="font-display text-xl text-ink sm:text-2xl">Suivi de mémoire</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft/80">
                  Étudiant en BTS, Licence ou Master ? Nos encadreurs spécialisés vous accompagnent de la problématique à la soutenance, avec une méthode rigoureuse et un suivi personnalisé.
                </p>
                <div className="mt-6">
                  <Link to="/accompagnement-academique">
                    <Button className="hover:-translate-y-0.5 transition-all duration-300">
                      Découvrir le suivi <ArrowRight size={15} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

