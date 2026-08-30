import { NavLink, Outlet, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, Newspaper, Bell, Settings, LogOut, Menu, X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from '../components/ui';
import api from '../services/api';

const items = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/actualites', label: 'Publications & formations', icon: Newspaper },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
  { to: '/admin/parametres', label: 'Paramètres', icon: Settings },
];

function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto">
          <LogOut size={22} />
        </div>
        <h2 className="mt-4 text-center font-display text-xl text-ink">Déconnexion</h2>
        <p className="mt-2 text-center text-sm text-ink-soft/80">
          Êtes-vous sûr de vouloir vous déconnecter ?
        </p>
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={onCancel}
            className="flex-1 rounded-lg border border-line py-2.5 text-sm font-semibold text-ink transition hover:bg-mist">
            Annuler
          </button>
          <button type="button" onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95">
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { user, loading, logout, isStaff } = useAuth();
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [visitedNotif, setVisitedNotif] = useState(false);

  useEffect(() => {
    const fetch = () =>
      api.get('/admin/dashboard')
        .then((r) => {
          const d = r.data.data;
          setUnreadCount((d.newRequests || 0) + (d.newMessages || 0));
        }).catch(() => {});
    fetch();
    const t = window.setInterval(fetch, 5000);
    return () => window.clearInterval(t);
  }, []);

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/connexion?next=/admin" replace />;
  if (!isStaff) return <Navigate to="/connexion?next=/admin" replace />;

  return (
    /* Layout : sidebar fixe sur lg+, overlay sur < lg */
    <div className="min-h-screen bg-[#f4f6f8]">
      {showLogoutModal && (
        <LogoutModal
          onConfirm={async () => { setShowLogoutModal(false); await logout(); }}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      {/* Overlay mobile/tablette */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-y-auto bg-ink text-white transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:w-64 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo centré en grand */}
        <div className="relative flex flex-col items-center justify-center border-b border-white/10 px-4 py-8">
          <img
            src="/logos.png"
            alt="Logo"
            className="h-28 w-28 rounded-2xl object-contain drop-shadow-lg"
          />
          <p className="mt-4 font-display text-lg font-bold text-white text-center">Cabinet Comptable</p>
          <button
            type="button"
            className="absolute right-3 top-3 rounded-md p-1.5 text-white/60 hover:text-white lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-1 flex-col gap-1 px-2 py-4">
          {items.map(({ to, label, icon: Icon, end }) => {
            const isNotif = to === '/admin/notifications';
            return (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => { setOpen(false); if (isNotif) setVisitedNotif(true); }}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition
                  ${isActive ? 'bg-sea text-white shadow-sm' : 'text-white/70 hover:bg-white/10 hover:text-white'}`
                }
              >
                <Icon size={16} className="shrink-0" />
                <span className="flex-1 truncate">{label}</span>
                {isNotif && unreadCount > 0 && !visitedNotif && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Déconnexion */}
        <div className="border-t border-white/10 px-2 py-3">
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/70 transition hover:bg-red-900/40 hover:text-red-300"
          >
            <LogOut size={16} className="shrink-0" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu principal — margin-left sur lg+ */}
      <div className="flex min-h-screen flex-col lg:ml-64">
        {/* Barre top — visible sur < lg */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md p-1.5 text-ink hover:bg-mist"
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} />
          </button>
          <img src="/logos.png" alt="Logo" className="h-8 w-8 rounded-lg object-contain" />
          <p className="font-display text-sm font-semibold text-ink sm:text-base">Cabinet Comptable</p>
          {/* Badge notif dans la barre mobile */}
          {unreadCount > 0 && !visitedNotif && (
            <NavLink to="/admin/notifications" onClick={() => setVisitedNotif(true)} className="ml-auto">
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-bold text-white">
                {unreadCount}
              </span>
            </NavLink>
          )}
        </header>

        {/* Zone contenu */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
