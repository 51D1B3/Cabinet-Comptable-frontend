import { NavLink, Outlet, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Bell,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from '../components/ui';

/* ── Modal confirmation déconnexion ── */
function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto">
          <LogOut size={22} />
        </div>
        <h2 className="mt-4 text-center font-display text-xl text-ink">Déconnexion</h2>
        <p className="mt-2 text-center text-sm text-ink-soft/80">
          Êtes-vous sûr de vouloir vous déconnecter de votre espace client ?
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-line py-2.5 text-sm font-semibold text-ink transition hover:bg-mist"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}

const items = [
  { to: '/client', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/client/notifications', label: 'Notifications', icon: Bell },
  { to: '/client/profil', label: 'Mon profil', icon: User },
];

export default function ClientLayout() {
  const { user, loading, logout, isStaff } = useAuth();
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/connexion?next=/client" replace />;
  if (isStaff) return <Navigate to="/admin" replace />;

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
  };

  return (
    <div className="min-h-screen bg-mist/40 lg:grid lg:grid-cols-[240px_1fr]">
      {showLogoutModal && (
        <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogoutModal(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col overflow-y-auto border-r border-line bg-ink text-white transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-md object-contain bg-white/10 p-0.5" />
            <div>
              <p className="font-display text-sm font-semibold">Espace client</p>
              <p className="mt-0.5 text-xs text-white/60">{user.firstName} {user.lastName}</p>
            </div>
          </div>
          <button type="button" className="lg:hidden text-white/70" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 px-2 pb-4">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition ${
                  isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 px-2 py-3">
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-white/75 transition hover:bg-red-900/40 hover:text-red-300"
          >
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Contenu principal */}
      <div className="min-w-0">
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-sand/90 px-4 py-3 backdrop-blur lg:hidden">
          <button type="button" onClick={() => setOpen(true)} aria-label="Menu">
            <Menu size={20} />
          </button>
          <img src="/logo.png" alt="Logo" className="h-7 w-7 rounded object-contain" />
          <p className="font-display text-base font-semibold">Cabinet Comptable</p>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
