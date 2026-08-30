import { Link } from 'react-router-dom';
import { Card, Button } from '../../components/ui';
import { GraduationCap, MessageCircle } from 'lucide-react';

/**
 * La création de compte est réservée aux étudiants en suivi de mémoire.
 * Le formulaire est géré directement dans AcademicSupport.jsx (QuoteRequest type="academic").
 * Cette page redirige les visiteurs vers la bonne page.
 */
export default function Register() {
  const waMsg = encodeURIComponent('Bonjour, je souhaite m\'inscrire au suivi de mémoire. Pouvez-vous m\'aider ?');
  const waLink = `https://wa.me/22376928012?text=${waMsg}`;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg items-center px-4 py-12">
      <Card className="w-full animate-slide-up text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sea/10 text-sea">
          <GraduationCap size={28} />
        </div>
        <h1 className="mt-4 font-display text-2xl text-ink">Inscription</h1>
        <p className="mt-3 text-sm text-ink-soft/80 max-w-sm mx-auto">
          L'inscription est réservée aux étudiants inscrits à notre programme de <strong>suivi de mémoire</strong>.
          Remplissez le formulaire dédié sur la page Suivi de mémoire pour démarrer votre accompagnement.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/accompagnement-academique#inscription">
            <Button className="hover:-translate-y-0.5 transition-all duration-300">
              <GraduationCap size={16} /> S'inscrire au suivi de mémoire
            </Button>
          </Link>
          <a href={waLink} target="_blank" rel="noreferrer">
            <Button variant="outline" className="border-emerald-500 text-emerald-700 hover:bg-emerald-50 hover:-translate-y-0.5 transition-all duration-300">
              <MessageCircle size={16} /> Nous contacter sur WhatsApp
            </Button>
          </a>
        </div>
        <p className="mt-6 text-sm text-ink-soft/70">
          Déjà inscrit ?{' '}
          <Link to="/connexion" className="font-semibold text-sea hover:underline">Se connecter</Link>
        </p>
      </Card>
    </div>
  );
}
