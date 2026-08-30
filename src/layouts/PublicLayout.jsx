import { Link, NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import api from '../services/api';

const links = [
  { to: '/', label: 'ACCUEIL' },
  { to: '/formations', label: 'FORMATIONS' },
  { to: '/accompagnement-academique', label: 'SUIVI DE MÉMOIRE' },
  { to: '/actualites', label: 'PUBLICATIONS' },
  { to: '/contact', label: 'CONTACT' },
];

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  useEffect(() => {
    api.get('/settings').then((r) => setSettings(r.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const whatsapp = settings?.whatsapp?.replace(/\D/g, '') || '22376928012';
  const waMsg = encodeURIComponent('Bonjour, je souhaite obtenir des informations sur vos services. Pouvez-vous m\'aider ?');
  const waLink = `https://wa.me/${whatsapp}?text=${waMsg}`;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">

      {/* ── Header fixe (ne défile pas) ── */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-line/60 bg-white/96 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="h-9 w-9 rounded-lg object-contain" />
            <span className="font-display text-base font-bold text-ink sm:text-lg">
              {settings?.cabinetName || 'Cabinet Comptable'}
            </span>
          </Link>

          {/* Nav desktop — centrée */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-xs font-bold tracking-wide transition-all duration-200 active:scale-95 xl:px-4 xl:text-sm ${
                    isActive
                      ? 'bg-sea text-white shadow-sm shadow-sea/30 scale-105'
                      : 'text-ink-soft hover:bg-sea/10 hover:text-sea hover:scale-105'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-3 lg:flex" />

          {/* Burger mobile */}
          <button
            type="button"
            className="rounded-md p-2 text-ink transition hover:bg-mist lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu mobile */}
        {open && (
          <>
            <div
              className="fixed inset-0 top-[57px] z-30 bg-ink/20 lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div className="relative z-40 border-t border-line bg-white px-4 pb-5 pt-3 lg:hidden">
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 text-sm font-bold tracking-wide transition ${
                        isActive ? 'bg-sea text-white' : 'text-ink hover:bg-sea/10 hover:text-sea'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-4 border-t border-line/60 pt-4">
                <a href={waLink} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </button>
                </a>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Espace pour compenser le header fixe */}
      <div className="h-[57px] shrink-0" />

      {/* Contenu */}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <Outlet context={{ settings }} />
      </main>

      {/* Footer — sans la ligne Mentions légales */}
      <footer className="mt-12 border-t border-line bg-ink text-white sm:mt-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-md object-contain" />
              <p className="font-display text-xl">{settings?.cabinetName || 'Cabinet Comptable'}</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              {settings?.tagline || 'Comptabilité, fiscalité et formation au service de votre activité.'}
            </p>
            <p className="mt-3 text-xs text-white/50">🇲🇱 {settings?.address || 'Kalanban Coura, Bamako, Mali'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Navigation</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-white/80">
              <Link to="/formations" className="hover:text-white transition">Formations</Link>
              <Link to="/accompagnement-academique" className="hover:text-white transition">Suivi de mémoire</Link>
              <Link to="/a-propos" className="hover:text-white transition">À propos</Link>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Contact</p>
            <div className="mt-3 space-y-2 text-sm text-white/80">
              <p>{settings?.address || 'Kalanban Coura, Bamako, Mali'}</p>
              {settings?.phone && (
                <p><a href={`tel:${settings.phone}`} className="hover:text-white">{settings.phone}</a></p>
              )}
              {settings?.email && (
                <p><a href={`mailto:${settings.email}`} className="hover:text-white break-all">{settings.email}</a></p>
              )}
              {settings?.hours && <p className="text-white/60">{settings.hours}</p>}
            </div>
          </div>
        </div>
        {/* Pas de barre Mentions légales · Confidentialité */}
      </footer>
    </div>
  );
}
