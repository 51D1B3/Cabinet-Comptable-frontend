import { BookOpen, CheckCircle2, Clock, FileText, GraduationCap, MessageCircle, Presentation, Star, Users } from 'lucide-react';
import { Card, Button } from '../../components/ui';
import QuoteRequest from './QuoteRequest';

const ETAPES = [
  {
    step: '01',
    icon: BookOpen,
    title: 'Choix du sujet & problématique',
    text: 'Nous vous aidons à identifier un sujet pertinent, à formuler votre problématique et à délimiter votre champ d\'analyse.',
  },
  {
    step: '02',
    icon: FileText,
    title: 'Plan & structure du mémoire',
    text: 'Élaboration d\'un plan détaillé, structuré en parties et chapitres, conforme aux exigences académiques de votre institution.',
  },
  {
    step: '03',
    icon: GraduationCap,
    title: 'Recherche & rédaction',
    text: 'Accompagnement méthodologique pour la revue de littérature, la collecte de données et la rédaction de chaque chapitre.',
  },
  {
    step: '04',
    icon: Presentation,
    title: 'Correction & soutenance',
    text: 'Relecture approfondie, mise en forme selon les normes (APA, Chicago...), préparation du PowerPoint et simulation de soutenance.',
  },
];

const DOMAINES = [
  'Comptabilité générale',
  'Gestion financière',
  'Audit & contrôle de gestion',
  'Fiscalité des entreprises',
  'Marketing & management',
  'Gestion des ressources humaines',
  'Économie & développement',
  'Commerce international',
];

const TEMOIGNAGES = [
  {
    name: 'Aminata Sylla.',
    niveau: 'Licence 3 — FSEG',
    text: 'Grâce au suivi, j\'ai pu finir mon mémoire en 3 mois. Mon directeur a été impressionné par la qualité du plan.',
  },
  {
    name: 'Oumar Diallo.',
    niveau: 'Master 2 — ISCAM',
    text: 'Le cabinet m\'a aidé à trouver mon sujet, à structurer mes idées et à préparer ma soutenance. Mention très bien !',
  },
  {
    name: 'Fatoumata Sidibé.',
    niveau: 'BTS Comptabilité',
    text: 'Accompagnement sérieux, disponible et à l\'écoute. Le suivi hebdomadaire m\'a vraiment aidée à avancer.',
  },
];

const STATS = [
  { value: '200+', label: 'Mémoires accompagnés' },
  { value: '95%', label: 'Taux de réussite' },
  { value: '4', label: 'Niveaux couverts' },
  { value: '8', label: 'Domaines d\'expertise' },
];

export default function AcademicSupport() {
  return (
    <div className="min-w-0 overflow-x-hidden">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(5,20,36,0.92) 0%, rgba(5,20,36,0.68) 50%, rgba(15,107,107,0.30) 100%), url(/image5.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24 md:py-32">
          <p className="animate-slide-up text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Accompagnement académique
          </p>
          <h1 className="animate-slide-up animation-delay-100 mt-3 max-w-2xl font-display text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Suivi de mémoire &amp; travaux académiques
          </h1>
          <p className="animate-slide-up animation-delay-200 mt-5 max-w-xl text-sm text-white/85 sm:text-base md:text-lg">
            Du choix du sujet à la soutenance, des experts en comptabilité, gestion et économie vous accompagnent pas à pas pour réussir votre mémoire de fin de cycle.
          </p>
          <div className="animate-slide-up animation-delay-300 mt-8 flex flex-wrap gap-3">
            <a href="#inscription">
              <Button className="bg-white !text-ink shadow-lg hover:-translate-y-1 hover:bg-sand hover:shadow-xl transition-all duration-300">
                <GraduationCap size={16} /> S'inscrire au suivi
              </Button>
            </a>
            <a href="/contact?mode=appointment">
              <Button variant="outline" className="border-white/50 bg-ink/40 text-white hover:-translate-y-1 hover:bg-ink/60 transition-all duration-300">
                <MessageCircle size={16} /> Poser une question
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats animées */}
      <section className="border-b border-line bg-sea py-8 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className="animate-slide-up text-center"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <p className="font-display text-3xl font-bold sm:text-4xl">{value}</p>
                <p className="mt-1 text-sm text-white/75">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Points forts */}
      <section className="border-b border-line bg-white/50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, label: 'Encadreurs spécialisés', sub: 'Comptabilité, gestion, économie' },
              { icon: Clock, label: 'Suivi régulier', sub: 'Séances hebdomadaires en présentiel ou à distance' },
              { icon: Star, label: 'Tous niveaux', sub: 'BTS, Licence, Master, Doctorat' },
              { icon: CheckCircle2, label: 'Résultats prouvés', sub: 'Nombreux étudiants accompagnés avec succès' },
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

      {/* Photo + texte intro */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="animate-slide-up">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Notre approche</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl md:text-4xl">
              Un encadrement personnalisé, pas un service standardisé
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft/85">
              Chaque étudiant a un parcours unique. C'est pourquoi nous commençons par comprendre votre thème, vos contraintes et les exigences de votre institution avant de vous proposer un plan de suivi adapté.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft/85">
              Nos encadreurs sont des professionnels en activité — comptables, auditeurs, enseignants — qui connaissent les attentes académiques et les réalités du terrain. Ils vous transmettent une méthode rigoureuse et applicable.
            </p>
            <ul className="mt-6 space-y-2">
              {[
                'Séances individuelles ou en petit groupe',
                'Disponibilité en présentiel et à distance',
                'Retours détaillés sur chaque chapitre remis',
                'Suivi de progression via notre portail',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-soft/90">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-sea" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-slide-up animation-delay-200 overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/img-accounting.png"
              alt="Encadreur guidant un étudiant sur son mémoire"
              className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-96"
            />
          </div>
        </div>
      </section>

      {/* Les 4 étapes */}
      <section className="border-y border-line bg-mist/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Notre méthode</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">Comment se déroule le suivi ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-soft/80">
              Un processus structuré en 4 étapes pour vous guider de A à Z dans la rédaction de votre mémoire.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map(({ step, icon: Icon, title, text }, i) => (
              <div
                key={step}
                className="animate-slide-up card-hover relative rounded-xl border border-line bg-white p-6 shadow-sm"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-4xl font-bold text-sea/15">{step}</span>
                <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sea/10 text-sea">
                  <Icon size={20} />
                </div>
                <h3 className="mt-3 font-display text-lg text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft/80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo salle de formation ACR */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="animate-slide-up order-2 overflow-hidden rounded-2xl shadow-xl md:order-1">
            <img
              src="/image2.png"
              alt="Salle de formation ACR Accounting Academy"
              className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-96"
            />
          </div>
          <div className="animate-slide-up animation-delay-200 order-1 md:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Notre environnement</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              Un cadre professionnel et équipé
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft/85">
              Nos espaces de suivi sont conçus pour favoriser la concentration et la productivité. Salles informatiques, ressources documentaires, accès WiFi — tout est réuni pour que vos séances de travail soient efficaces.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft/85">
              Les séances en présentiel se déroulent dans nos locaux à Bamako. Pour les étudiants à distance, nous utilisons des outils collaboratifs performants pour maintenir un suivi de qualité identique.
            </p>
          </div>
        </div>
      </section>

      {/* Domaines couverts */}
      <section className="border-y border-line bg-mist/50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Disciplines couvertes</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">Domaines d'intervention</h2>
            <p className="mt-2 max-w-xl text-sm text-ink-soft/80">
              Nos encadreurs couvrent l'ensemble des filières des sciences économiques, de gestion et du commerce.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {DOMAINES.map((d, i) => (
              <span
                key={d}
                className="animate-slide-up rounded-full border border-sea/30 bg-white px-4 py-2 text-sm font-medium text-sea transition hover:bg-sea hover:text-white"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div className="animate-slide-up">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Ce qui est inclus</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">Une formule complète</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft/80">
              Notre accompagnement ne se limite pas à la correction. Nous travaillons avec vous à chaque étape pour garantir un mémoire de qualité, original et conforme aux exigences de votre institution.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Aide au choix du sujet et formulation de la problématique',
                'Construction du plan détaillé',
                'Orientation bibliographique et revue de littérature',
                'Accompagnement à la rédaction chapitre par chapitre',
                'Correction orthographique, syntaxique et de style',
                'Mise en forme selon les normes (APA, Chicago, etc.)',
                'Création du diaporama de soutenance (PowerPoint)',
                'Simulation et préparation à la soutenance orale',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-soft/90">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sea" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-slide-up animation-delay-200 space-y-4">
            <Card className="card-hover border-sea/30 bg-sea/5">
              <p className="text-xs font-semibold uppercase tracking-wide text-sea">Formule Essentielle</p>
              <h3 className="mt-2 font-display text-xl text-ink">Suivi partiel</h3>
              <p className="mt-2 text-sm text-ink-soft/80">
                Pour les étudiants qui ont besoin d'aide sur une partie spécifique : plan, rédaction d'un chapitre ou préparation à la soutenance.
              </p>
              <a href="#inscription">
                <Button variant="outline" className="mt-4 border-sea text-sea hover:bg-sea hover:text-white transition-all duration-300">
                  Choisir cette formule
                </Button>
              </a>
            </Card>
            <Card className="card-hover border-sea bg-sea text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Formule Complète</p>
              <h3 className="mt-2 font-display text-xl">Suivi intégral</h3>
              <p className="mt-2 text-sm text-white/85">
                Du sujet à la soutenance. Accompagnement continu avec séances régulières, corrections et préparation complète. Recommandé pour les mémoires de fin de cycle.
              </p>
              <a href="#inscription">
                <Button className="mt-4 bg-white !text-sea hover:bg-sand transition-all duration-300">
                  Choisir cette formule
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="border-y border-line bg-white/50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Témoignages</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">Ce qu'ils disent</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-soft/80">
              Des étudiants de BTS au Doctorat témoignent de leur expérience avec notre cabinet.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {TEMOIGNAGES.map((t, i) => (
              <div
                key={t.name}
                className="animate-slide-up card-hover rounded-xl border border-line bg-white p-6 shadow-sm"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <p className="text-amber-400 text-lg">★★★★★</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft italic">« {t.text} »</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sea/10 text-sea font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-ink-soft/70">{t.niveau}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formule visuelle avec photo */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <div className="relative">
            <img
              src="/image5.png"
              alt="Conseiller et étudiant travaillant ensemble"
              className="h-64 w-full object-cover sm:h-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-ink/30 flex items-center">
              <div className="px-8 sm:px-12">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Prêt à commencer ?</p>
                <h2 className="mt-2 font-display text-2xl text-white sm:text-3xl md:text-4xl">
                  Votre réussite commence ici
                </h2>
                <p className="mt-3 max-w-md text-sm text-white/80">
                  Inscrivez-vous dès aujourd'hui et bénéficiez d'un premier entretien d'orientation gratuit avec l'un de nos encadreurs.
                </p>
                <a href="#inscription" className="mt-5 inline-block">
                  <Button className="bg-white !text-ink hover:bg-sand shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <GraduationCap size={16} /> S'inscrire maintenant
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire d'inscription */}
      <div id="inscription" className="border-t border-line bg-mist/30 py-4">
        <QuoteRequest type="academic" initialService="suivi-de-memoire" />
      </div>
    </div>
  );
}

