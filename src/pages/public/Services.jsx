import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Card, Spinner } from '../../components/ui';
import { ArrowRight, BarChart3, BookOpen, CheckCircle2, FileSearch, MessageCircle, Scale, TrendingUp, Users } from 'lucide-react';

const PILLARS = [
  {
    icon: BarChart3,
    title: 'Comptabilité',
    text: 'Tenue comptable complète, bilans, comptes de résultat et états financiers selon le SYSCOHADA.',
    slug: 'comptabilite',
    detail: 'Externalisation complète ou partielle, reporting mensuel clair, archivage sécurisé.',
  },
  {
    icon: TrendingUp,
    title: 'Gestion & pilotage',
    text: 'Tableaux de bord, analyse de performance, budget prévisionnel et gestion de trésorerie.',
    slug: 'gestion-pilotage',
    detail: 'Indicateurs clés adaptés à votre secteur, alertes automatiques, prévisions à 12 mois.',
  },
  {
    icon: Scale,
    title: 'Fiscalité',
    text: 'Déclarations fiscales, optimisation, gestion des obligations auprès de la DGI.',
    slug: 'fiscalite',
    detail: 'TVA, IS, patente, déclarations annuelles — conformité garantie et zéro pénalité.',
  },
  {
    icon: FileSearch,
    title: 'Audit & conseil',
    text: 'Audit interne, contrôle de gestion, conseil stratégique et diagnostic financier.',
    slug: 'audit-conseil',
    detail: 'Cartographie des risques, recommandations actionnables, suivi de mise en œuvre.',
  },
  {
    icon: FileSearch,
    title: 'Autres services',
    text: 'Autres services de conseil et d\'accompagnement.',
    slug: 'autres-services',
    detail: 'Nous proposons également des services personnalisés selon vos besoins spécifiques.',
  },
];

const ENGAGEMENTS = [
  'Reporting mensuel clair et compréhensible',
  'Suivi des échéances fiscales et comptables',
  'Accès au portail client pour consulter vos dossiers',
  'Interlocuteur dédié pour chaque client',
  'Confidentialité stricte de vos données',
  'Tarifs transparents sans surprise',
];

const SECTORS = [
  'Education',
  'Commerce & distribution',
  'BTP & immobilier',
  'Restauration & hôtellerie',
  'Santé & cliniques',
  'ONG & associations',
  'Professions libérales',
  'Agriculture & agro-industrie',
  'Transport & logistique',
  'Autres',
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/services')
      .then((r) => setServices(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-w-0 overflow-x-hidden">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(5,20,36,0.93) 0%, rgba(5,20,36,0.70) 55%, rgba(15,107,107,0.28) 100%), url(/fond.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24 md:py-32">
          <p className="animate-slide-up text-xs font-semibold uppercase tracking-[0.2em] text-white/65">Cabinet comptable</p>
          <h1 className="animate-slide-up animation-delay-100 mt-3 max-w-2xl font-display text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Comptabilité &amp; gestion
          </h1>
          <p className="animate-slide-up animation-delay-200 mt-5 max-w-xl text-sm text-white/80 sm:text-base md:text-lg">
            Des services professionnels pour externaliser votre comptabilité, maîtriser votre fiscalité et piloter votre activité en toute sérénité.
          </p>
          <div className="animate-slide-up animation-delay-300 mt-8 flex flex-wrap gap-3">
            <Link to="/contact?mode=appointment">
              <button className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-lg transition hover:-translate-y-1 hover:bg-sand">
                <MessageCircle size={16} /> Prendre rendez-vous
              </button>
            </Link>
            <a href="#nos-services">
              <button className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-ink/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-ink/60">
                Voir les services <ArrowRight size={15} />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* 4 piliers */}
      <section id="nos-services" className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Nos domaines</p>
          <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">Ce que nous faisons</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-soft/80">
            Quatre expertises complémentaires pour couvrir l'ensemble de vos besoins comptables, fiscaux et de gestion.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, text, detail, slug }, i) => (
            <Link key={title} to={`/services/${slug}`}>
              <div
                className="animate-slide-up card-hover group flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-sm"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sea/10 text-sea transition group-hover:bg-sea group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h2 className="mt-4 font-display text-xl text-ink">{title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft/80">{text}</p>
                <p className="mt-3 text-xs text-ink-soft/60">{detail}</p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-sea">
                  En savoir plus <ArrowRight size={15} className="ml-1 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Photo + engagements */}
      <section className="border-y border-line bg-mist/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="animate-slide-up">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Nos engagements</p>
              <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">Pourquoi nous choisir ?</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft/80">
                Nous ne sommes pas seulement votre comptable. Nous sommes un partenaire de confiance qui vous accompagne dans la durée, avec transparence et réactivité.
              </p>
              <ul className="mt-6 space-y-3">
                {ENGAGEMENTS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-soft/90">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sea" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-slide-up animation-delay-200 overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/image5.png"
                alt="Conseiller accompagnant un client"
                className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Entretien gratuit */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="animate-slide-up overflow-hidden rounded-2xl shadow-xl order-2 md:order-1">
            <img
                src="/image2.png"
              alt="Premier entretien au cabinet"
              className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-80"
            />
          </div>
          <div className="animate-slide-up animation-delay-200 order-1 md:order-2">
            <div className="rounded-2xl border border-sea/30 bg-sea/5 p-7 sm:p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sea/10 text-sea mb-4">
                <Users size={24} />
              </div>
              <h3 className="font-display text-2xl text-ink">Un premier entretien gratuit</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft/80">
                Avant toute mission, nous prenons le temps de comprendre votre activité, votre secteur et vos besoins spécifiques. Cet entretien de diagnostic est offert et sans engagement.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  'Analyse de votre situation comptable actuelle',
                  'Identification des risques fiscaux',
                  'Recommandations concrètes et immédiates',
                  'Devis personnalisé et transparent',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-soft/85">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-sea" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact?mode=appointment">
                  <span className="inline-flex items-center gap-2 rounded-md bg-sea px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sea-dark hover:-translate-y-0.5">
                    <MessageCircle size={16} /> Prendre rendez-vous
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secteurs */}
      <section className="border-y border-line bg-mist/40 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Nos clients</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">Secteurs accompagnés</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-soft/80">
              Nous adaptons notre expertise aux spécificités de chaque secteur d'activité.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SECTORS.map((sector, i) => (
              <span
                key={sector}
                className="animate-slide-up rounded-full border border-sea/30 bg-white px-4 py-2 text-sm font-medium text-sea transition hover:bg-sea hover:text-white"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services depuis la base de données */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : services.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Catalogue</p>
            <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">Nos prestations</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <Link key={s.id} to={`/services/${s.slug}`}>
                <Card
                  className="animate-slide-up card-hover h-full"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-sea">{s.category}</p>
                  <h2 className="mt-2 font-display text-xl text-ink sm:text-2xl">{s.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft/80">{s.summary}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-sea">
                    Voir le détail <ArrowRight size={14} className="ml-1" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <div className="mx-auto max-w-6xl px-4 py-12 text-center">
          <BookOpen className="mx-auto text-sea/40" size={40} />
          <p className="mt-3 text-sm text-ink-soft/70">
            Le catalogue détaillé sera bientôt disponible. Contactez-nous pour un devis personnalisé.
          </p>
          <Link to="/contact" className="mt-4 inline-block">
            <button className="rounded-md bg-sea px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sea-dark">
              Demander un devis
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

