import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, BookOpen, GraduationCap, Users, CheckCircle2, TrendingUp, Award } from 'lucide-react';
import api from '../../services/api';
import { Button, Card } from '../../components/ui';
import { formatDate, getSafeImageUrl } from '../../utils/helpers';

const steps = [
  { title: 'Écoute du besoin', text: 'Nous clarifions votre situation et les priorités.' },
  { title: 'Ouverture du dossier', text: 'Un responsable suit votre dossier de bout en bout.' },
  { title: 'Collecte & traitement', text: 'Pièces demandées, vérifiées, puis traitées.' },
  { title: 'Restitution & suivi', text: 'Documents finalisés et statut visible en ligne.' },
];

const FIXED_STATS = [
  { value: '500+', label: 'Clients accompagnés', icon: Users },
  { value: '200+', label: 'Mémoires réussis', icon: Award },
  { value: '10+', label: 'Années d\'expérience', icon: TrendingUp },
  { value: '95%', label: 'Taux de satisfaction', icon: CheckCircle2 },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get('/settings').catch(() => ({ data: { data: null } })),
      api.get('/articles').catch(() => ({ data: { data: [] } })),
    ])
      .then(([s, a]) => {
        setSettings(s.data.data);
        setArticles((a.data.data || []).slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* Ne jamais bloquer l'affichage — on affiche la page même sans données */

  if (loading) {
    /* Afficher la page hero même pendant le chargement */
  }

  const formations = articles.filter((article) => String(article.category).toLowerCase() === 'formation');

  return (
    <div className="min-w-0 overflow-x-hidden">

      {/* Hero — fond.png + boutons Formations / Suivi de mémoire à gauche */}
      <section className="relative overflow-hidden border-b border-line min-h-[420px] sm:min-h-[520px] md:min-h-[600px]">
        {/* Image de fond */}
        <img
          src="/fond.png"
          alt="Cabinet Comptable"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Overlay léger */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/40 to-transparent" />

        {/* Contenu — boutons à gauche */}
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 md:py-36 lg:px-8">
          <div className="max-w-xs sm:max-w-sm">
            <div className="animate-slide-up flex flex-col gap-4">
              <Link to="/formations">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl bg-sea px-6 py-4 text-left text-sm font-bold tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-sea-dark hover:-translate-y-1 hover:shadow-xl active:scale-95"
                >
                  <GraduationCap size={20} className="shrink-0" />
                  <span>FORMATIONS</span>
                </button>
              </Link>
              <Link to="/accompagnement-academique">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl bg-ink/70 border border-white/30 px-6 py-4 text-left text-sm font-bold tracking-wide text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-ink hover:-translate-y-1 hover:shadow-xl active:scale-95"
                >
                  <BookOpen size={20} className="shrink-0" />
                  <span>SUIVI DE MÉMOIRE</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats fixes — toujours visibles */}
      <section className="border-b border-line bg-sea">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-2 gap-4 text-white md:grid-cols-4">
            {FIXED_STATS.map(({ value, label, icon: Icon }, i) => (
              <div
                key={label}
                className="animate-slide-up flex flex-col items-center gap-2 text-center"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <Icon size={20} />
                </div>
                <p className="font-display text-3xl font-bold sm:text-4xl">{value}</p>
                <p className="text-xs text-white/70 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 piliers */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Ce que nous faisons</p>
          <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">Trois expertises, un seul cabinet</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: 'Formations pratiques',
              text: 'Comptabilité, fiscalité, gestion, logiciels — des formations dispensées par des professionnels en exercice, avec certificat.',
              link: '/formations',
              cta: 'Voir les formations',
            },
            {
              icon: BarChart3,
              title: 'Comptabilité & gestion',
              text: 'Tenue comptable, bilans, déclarations fiscales, tableaux de bord — un suivi rigoureux adapté à votre activité.',
              link: '/services',
              cta: 'Nos services',
            },
            {
              icon: BookOpen,
              title: 'Suivi de mémoire',
              text: 'Du choix du sujet à la soutenance, nos encadreurs guident les étudiants de BTS, Licence et Master.',
              link: '/accompagnement-academique',
              cta: 'Être accompagné',
            },
          ].map(({ icon: Icon, title, text, link, cta }, i) => (
            <div
              key={title}
              className="animate-slide-up card-hover flex flex-col gap-4 rounded-xl border border-line bg-white p-6 shadow-sm"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sea/10 text-sea">
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-xl text-ink">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft/80">{text}</p>
              </div>
              <Link to={link} className="inline-flex items-center gap-1 text-sm font-semibold text-sea hover:text-sea-dark">
                {cta} <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Photo + texte cabinet */}
      <section className="border-y border-line bg-mist/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="animate-slide-up">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Notre cabinet</p>
              <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl md:text-4xl">
                Un cabinet de confiance au service de votre réussite
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft/85">
                Notre cabinet accompagne les entreprises, associations et étudiants depuis plus de 10 ans. Nous combinons une expertise comptable rigoureuse avec une approche pédagogique adaptée à chaque profil.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft/85">
                Que vous soyez chef d'entreprise cherchant à externaliser votre comptabilité, ou étudiant préparant votre mémoire de fin de cycle, nous avons la solution adaptée à votre situation.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  'Équipe pluridisciplinaire (comptables, fiscalistes, enseignants)',
                  'Portail numérique pour suivre vos dossiers en temps réel',
                  'Premier entretien de diagnostic gratuit et sans engagement',
                  'Accompagnement en présentiel et à distance',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-soft/90">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-sea" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/a-propos">
                  <Button variant="outline" className="border-sea text-sea hover:bg-sea hover:text-white transition-all duration-300">
                    En savoir plus
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button className="hover:-translate-y-0.5 transition-all duration-300">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-slide-up animation-delay-200 overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/image2.jpg"
                alt="L'équipe du cabinet comptable"
                className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section photo réunion équipe */}
      <section className="border-y border-line">
        <div className="grid md:grid-cols-2">
          <div className="overflow-hidden">
            <img
              src="/image3.jpg"
              alt="Réunion d'équipe au cabinet"
              className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-full md:min-h-[320px]"
            />
          </div>
          <div className="bg-ink flex flex-col justify-center px-8 py-12 text-white sm:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Pourquoi nous choisir</p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl">Une expertise reconnue en Afrique de l'Ouest</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Notre cabinet est partenaire agréé de solutions comptables de référence. Nos équipes se forment continuellement aux dernières évolutions fiscales et réglementaires pour vous garantir un conseil à jour.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              {[
                { value: 'SYSCOHADA', label: 'Normes maîtrisées' },
                { value: 'DGI Mali', label: 'Déclarations conformes' },
                { value: 'Sage / QuickBooks', label: 'Logiciels certifiés' },
                { value: 'BTS → Doctorat', label: 'Tous niveaux académiques' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-semibold text-white">{value}</p>
                  <p className="text-xs text-white/60">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/services">
                <Button className="bg-white !text-ink hover:bg-sand transition-all duration-300 hover:-translate-y-0.5">
                  Voir nos services <ArrowRight size={15} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Formations */}
      {formations.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">À venir</p>
              <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">Prochaines formations</h2>
            </div>
            <Link to="/formations" className="inline-flex items-center gap-1 text-sm font-semibold text-sea hover:text-sea-dark">
              Toutes <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {formations.slice(0, 3).map((formation, i) => (
              <Card
                key={formation.id}
                className="animate-slide-up card-hover overflow-hidden p-0"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="overflow-hidden">
                  <img
                    src={getSafeImageUrl(formation.imageUrl, '/image5.png')}
                    alt={formation.title || 'Formation'}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = '/image5.png';
                    }}
                    className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-ink sm:text-xl">{formation.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft/80">{formation.summary}</p>
                  {formation.startDate && (
                    <p className="mt-3 text-xs font-semibold text-sea">Début : {formation.startDate}</p>
                  )}
                  <Link to="/contact" className="mt-4 inline-flex items-center text-sm font-semibold text-sea hover:text-sea-dark">
                    En savoir plus <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Notre méthode */}
      <section className="border-y border-line bg-ink py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Comment ça marche</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl">Notre méthode en 4 étapes</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="animate-slide-up relative rounded-xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <p className="font-display text-4xl font-bold text-white/10">0{i + 1}</p>
                <h3 className="mt-3 font-display text-lg sm:text-xl">{step.title}</h3>
                <p className="mt-2 text-sm text-white/65">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section photo équipe accounting */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="animate-slide-up overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/img-accounting-team.jpg"
              alt="Équipe comptable en réunion"
              className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-80"
            />
          </div>
          <div className="animate-slide-up animation-delay-200">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Suivi de mémoire</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              Étudiant en fin de cycle ? On vous accompagne.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft/85">
              Du BTS au Doctorat, nos encadreurs spécialisés en comptabilité, gestion et économie vous guident à chaque étape de votre mémoire : problématique, plan, rédaction, mise en forme et soutenance.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: 'BTS', sub: 'Comptabilité, Gestion' },
                { label: 'Licence & Master', sub: 'Finance, Audit, Économie' },
                { label: 'Doctorat', sub: 'Thèse & recherche' },
                { label: 'À distance', sub: 'Suivi en ligne disponible' },
              ].map(({ label, sub }) => (
                <div key={label} className="rounded-lg border border-line bg-white p-3">
                  <p className="text-sm font-semibold text-ink">{label}</p>
                  <p className="text-xs text-ink-soft/70">{sub}</p>
                </div>
              ))}
            </div>
            <Link to="/accompagnement-academique" className="mt-6 inline-block">
              <Button className="hover:-translate-y-0.5 transition-all duration-300">
                Découvrir le suivi <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mot du fondateur */}
      <section className="border-y border-line bg-mist/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <div className="animate-slide-up flex flex-col items-center gap-4 md:items-start">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/img-fondateur.png"
                  alt="Le fondateur du cabinet"
                  className="h-64 w-52 object-cover object-top transition-transform duration-700 hover:scale-105 md:h-80 md:w-64"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="font-display text-lg text-ink font-semibold">{settings?.founderName || 'Le Fondateur'}</p>
                <p className="text-xs text-sea font-semibold mt-0.5">{settings?.founderTitle || 'Directeur & Formateur'}</p>
              </div>
            </div>
            <div className="animate-slide-up animation-delay-200">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Mot du fondateur</p>
              <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl md:text-4xl">
                "Votre réussite est notre priorité"
              </h2>
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft/85">
                <p>
                  Notre cabinet est né d'une conviction simple : chaque entrepreneur, chaque étudiant mérite un accompagnement sérieux, accessible et humain. Trop souvent, la comptabilité est perçue comme un fardeau. Nous la transformons en outil de pilotage et de sérénité.
                </p>
                <p>
                  Qu'il s'agisse de tenir votre comptabilité, de préparer vos déclarations fiscales ou d'accompagner votre mémoire jusqu'à la soutenance, notre équipe s'engage à vous offrir le meilleur de son expertise, avec rigueur et bienveillance.
                </p>
                <p className="font-medium text-ink">
                  Ensemble, construisons vos succès de demain.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact">
                  <Button className="hover:-translate-y-0.5 transition-all duration-300">
                    Nous contacter
                  </Button>
                </Link>
                <Link to="/a-propos">
                  <Button variant="outline" className="border-sea text-sea hover:bg-sea hover:text-white transition-all duration-300">
                    En savoir plus <ArrowRight size={15} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actualités */}
      {articles.length > 0 && (
        <section className="border-t border-line bg-white/50 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Blog</p>
                <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">Actualités</h2>
              </div>
              <Link to="/actualites" className="text-sm font-semibold text-sea hover:text-sea-dark">
                Toutes les actualités
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {articles.map((a, i) => (
                <Link key={a.id} to={`/actualites/${a.slug}`}>
                  <div
                    className="animate-slide-up card-hover overflow-hidden rounded-xl border border-line bg-white shadow-sm"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="overflow-hidden">
                      <img
                        src={getSafeImageUrl(a.imageUrl, '/image5.png')}
                        alt={a.title || 'Publication'}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = '/image5.png';
                        }}
                        className="h-36 w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-ink-soft/60">{formatDate(a.publishedAt || a.createdAt)}</p>
                      <h3 className="mt-2 font-display text-lg text-ink sm:text-xl">{a.title}</h3>
                      <p className="mt-2 text-sm text-ink-soft/80 line-clamp-2">{a.summary}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="overflow-hidden rounded-2xl bg-sea">
          <div className="relative">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'url(/image2.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="relative px-8 py-12 text-white md:px-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <h2 className="font-display text-2xl sm:text-3xl">Prêt à nous faire confiance ?</h2>
                  <p className="mt-3 text-sm text-white/80">
                    Notre équipe est disponible pour répondre à vos questions et vous accompagner. Premier entretien gratuit et sans engagement.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <Link to="/contact?mode=appointment">
                    <Button className="bg-white !text-sea hover:bg-sand shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                      Nous contacter
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
