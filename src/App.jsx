import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import ServiceDetail from './pages/public/ServiceDetail';
import News from './pages/public/News';
import NewsDetail from './pages/public/NewsDetail';
import Contact from './pages/public/Contact';
import Demande from './pages/public/Demande';
import Legal from './pages/public/Legal';
import Privacy from './pages/public/Privacy';
import Formations from './pages/public/Formations';
import AcademicSupport from './pages/public/AcademicSupport';

import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';


import AdminDashboard from './pages/admin/Dashboard';
import {
  Staff,
  Dossiers as AdminDossiers,
  Documents as AdminDocuments,
  Tasks as AdminTasks,
  Quotes as AdminQuotes,
  Reports as AdminReports,
  Articles,
  Notifications as AdminNotifications,
  Stats,
  Settings,
  ActivityLog,
} from './pages/admin/Pages';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Zone publique */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="a-propos" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="formations" element={<Formations />} />
            <Route path="suivi-de-memoire" element={<AcademicSupport />} />
            <Route path="accompagnement-academique" element={<AcademicSupport />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="actualites" element={<News />} />
            <Route path="actualites/:slug" element={<NewsDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="demande" element={<Demande />} />
            <Route path="mentions-legales" element={<Legal />} />
            <Route path="confidentialite" element={<Privacy />} />
            <Route path="connexion" element={<Login />} />
            <Route path="mot-de-passe-oublie" element={<ForgotPassword />} />
          </Route>

          {/* Panel admin */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="personnel" element={<Staff />} />
            <Route path="dossiers" element={<AdminDossiers />} />
            <Route path="documents" element={<AdminDocuments />} />
            <Route path="taches" element={<AdminTasks />} />
            <Route path="devis" element={<AdminQuotes />} />
            <Route path="rapports" element={<AdminReports />} />
            <Route path="actualites" element={<Articles />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="statistiques" element={<Stats />} />
            <Route path="parametres" element={<Settings />} />
            <Route path="journal" element={<ActivityLog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
