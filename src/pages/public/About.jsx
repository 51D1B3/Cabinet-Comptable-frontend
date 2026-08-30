import { Link } from 'react-router-dom';
import { Button } from '../../components/ui';
import { CheckCircle2, Target, Eye, Heart, Shield, ArrowRight } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Rigueur', text: 'Chaque pièce et chaque déclaration sont traitées avec méthode et précision.' },
  { icon: Shield, title: 'Confidentialité', text: 'Vos données comptables restent strictement protégées et jamais partagées.' },
  { icon: Heart, title: 'Proximité', text: 'Un interlocuteur dédié, des échanges traçables et une relation de confiance durable.' },
  { icon: Eye, title: 'Clarté', text: 'Vous savez toujours où en est votre dossier, en temps réel via notre portail.' },
];

const CHIFFRES = [
  { value: '10+', label: 'Années d\'expérience' },
  { value: '500+', label: 'Clients accompagnés' },
  { value: '200+', label: 'Mémoires réussis' },
  { value: '95%', label: 'Taux de satisfaction' },
];

const EQUIPE_HIGHLIGHTS = [
  { role: 'Expert-comptable', desc: 'Tenue comptable, bilans, déclarations fiscales SYSCOHADA' },
  { role: 'Fiscaliste', desc: 'Optimisation fiscale, relations DGI, audit fiscal' },
  { role: 'Conseiller en gestion', desc: 'Tableaux de bord, budgets prévisionnels, analyse financière' },
  { role: 'Encadreur académique', desc: 'Suivi mémoires BTS, Licence, Master, Doctorat' },
];

export default function About() {
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
          <p className="animate-slide-up text-xs font-semibold uppercase tracking-[0.2em] text-white/65">À propos</p>
          <h1 className="animate-slide-up animation-delay-100 mt-3 max-w-2xl font-display text-3xl text-white sm:text-4xl md:text-5xl">
            Un cabinet comptable proche de vos enjeux
          </h1>
          <p className="animate-slide-up animation-delay-200 mt-4 max-w-xl text-sm text-white/80 sm:text-base">
            Depuis plus de 10 ans, nous accompagnons entreprises, associations et étudiants avec rigueur, transparence et engagement.
          </p>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="border-b border-line bg-sea">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-2 gap-4 text-white md:grid-cols-4">
            {CHIFFRES.map(({ value, label }, i) => (
              <div
                key={label}
                className="animate-slide-up text-center"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <p className="font-display text-3xl font-bold sm:text-4xl">{value}</p>
                <p className="mt-1 text-xs text-white/70 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission + Photo */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-slide-up">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Notre histoire</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl md:text-4xl">
              Cabinet Comptable — votre partenaire de confiance
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft/85">
              Notre cabinet accompagne les entreprises, associations et professionnels dans leur comptabilité, leur fiscalité et leur pilotage financier. Nous avons bâti une plateforme numérique qui remplace les échanges dispersés par un environnement structuré, sécurisé et traçable.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft/85">
              Au fil des années, nous avons étendu notre mission à la formation professionnelle et à l'encadrement académique, répondant aux besoins croissants des entreprises maliennes et des étudiants en fin de cycle.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button className="hover:-translate-y-0.5 transition-all duration-300">
                  Nous contacter
                </Button>
              </Link>
                <Link to="/contact?mode=appointment">
                  <Button variant="outline" className="border-sea text-sea hover:bg-sea hover:text-white transition-all duration-300">
                    Prendre rendez-vous
                </Button>
              </Link>
            </div>
          </div>
          <div className="animate-slide-up animation-delay-200 overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/image2.jpg"
              alt="L'équipe du cabinet en réunion"
              className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-80"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-line bg-mist/40 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="animate-slide-up card-hover rounded-xl border border-line bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sea/10 text-sea mb-4">
                <Target size={24} />
              </div>
              <h2 className="font-display text-2xl text-ink">Mission</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft/85">
                Rendre le suivi comptable compréhensible pour le client : ce qui est attendu, ce qui est traité, ce qui reste à faire. Nous mettons la transparence au centre de chaque relation client.
              </p>
            </div>
            <div className="animate-slide-up animation-delay-100 card-hover rounded-xl border border-line bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sea/10 text-sea mb-4">
                <Eye size={24} />
              </div>
              <h2 className="font-display text-2xl text-ink">Vision</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft/85">
                Devenir le portail de référence pour la collaboration entre le cabinet et ses clients en Afrique de l'Ouest, en combinant expertise comptable, formation de qualité et accompagnement académique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo équipe + profils */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="animate-slide-up order-2 overflow-hidden rounded-2xl shadow-xl md:order-1">
            <img
              src="/image3.jpg"
              alt="Formateur avec les étudiants"
              className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-96"
            />
          </div>
          <div className="animate-slide-up animation-delay-200 order-1 md:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Compétences</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              Une équipe pluridisciplinaire
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft/85">
              Notre force réside dans la diversité de nos expertises. Comptables, fiscalistes, auditeurs et enseignants travaillent en équipe pour vous offrir un accompagnement global.
            </p>
            <div className="mt-6 space-y-3">
              {EQUIPE_HIGHLIGHTS.map((item, i) => (
                <div
                  key={item.role}
                  className="animate-slide-up flex items-start gap-3 rounded-lg border border-line bg-white p-4"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-sea" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.role}</p>
                    <p className="text-xs text-ink-soft/75">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="border-y border-line bg-mist/40 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Ce qui nous définit</p>
            <h2 className="font-display text-2xl text-ink sm:text-3xl mt-2">Nos valeurs</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="animate-slide-up card-hover rounded-xl border border-line bg-white p-6 shadow-sm text-center"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sea/10 text-sea mb-3">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl text-ink">{title}</h3>
                <p className="mt-2 text-sm text-ink-soft/80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo + Engagements */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="animate-slide-up">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Notre promesse</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">Engagements clients</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft/85">
              Nous ne faisons pas de promesses non vérifiables. Chaque engagement ci-dessous est mesuré et visible directement dans votre espace client.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Transparence complète sur l\'avancement de vos dossiers',
                'Demandes de pièces avec échéances explicites et rappels',
                'Conservation et traçabilité de tous les échanges',
                'Respect strict de la confidentialité de vos données',
                'Réponse sous 24h ouvrables à toute demande',
                'Reporting mensuel clair et compréhensible',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-soft/90">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-sea" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button className="hover:-translate-y-0.5 transition-all duration-300">Prendre rendez-vous</Button>
              </Link>
            </div>
          </div>
          <div className="animate-slide-up animation-delay-200 overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/image5.png"
              alt="Bureau professionnel du cabinet"
              className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-96"
            />
          </div>
        </div>
      </section>

      {/* Le fondateur */}
      <section className="border-t border-line bg-mist/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <div className="animate-slide-up flex flex-col items-center gap-3">
              <div className="overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
                <img
                  src="/img-fondateur.png"
                  alt="Le fondateur du cabinet"
                  className="h-72 w-56 object-cover object-top transition-transform duration-700 hover:scale-105 md:h-96 md:w-72"
                />
              </div>
              <div className="text-center">
                <p className="font-display text-xl text-ink font-semibold">Le Fondateur</p>
                <p className="text-sm text-sea font-semibold mt-0.5">Directeur & Formateur</p>
              </div>
            </div>
            <div className="animate-slide-up animation-delay-200">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Mot du fondateur</p>
              <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl md:text-4xl">
                "Votre réussite est notre priorité"
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-soft/85">
                <p>
                  Notre cabinet est né d'une conviction profonde : chaque entrepreneur, chaque étudiant mérite un accompagnement sérieux, accessible et humain. La comptabilité, souvent perçue comme une contrainte, peut devenir un véritable outil de pilotage et de sérénité financière.
                </p>
                <p>
                  Qu'il s'agisse de tenir votre comptabilité, de préparer vos déclarations fiscales auprès de la DGI, ou d'accompagner votre mémoire jusqu'à la soutenance, notre équipe s'engage à vous offrir le meilleur de son expertise, avec rigueur, proximité et bienveillance.
                </p>
                <p className="font-semibold text-ink text-base">
                  Ensemble, construisons vos succès de demain.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/contact">
                  <Button className="hover:-translate-y-0.5 transition-all duration-300">
                    Nous contacter <ArrowRight size={15} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

