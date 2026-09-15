import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Services = lazy(() => import('./pages/public/Services'));
const ServiceDetail = lazy(() => import('./pages/public/ServiceDetail'));
const News = lazy(() => import('./pages/public/News'));
const NewsDetail = lazy(() => import('./pages/public/NewsDetail'));
const Contact = lazy(() => import('./pages/public/Contact'));
const Demande = lazy(() => import('./pages/public/Demande'));
const Legal = lazy(() => import('./pages/public/Legal'));
const Privacy = lazy(() => import('./pages/public/Privacy'));
const Formations = lazy(() => import('./pages/public/Formations'));
const AcademicSupport = lazy(() => import('./pages/public/AcademicSupport'));
const Login = lazy(() => import('./pages/auth/Login'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminPages = lazy(() => import('./pages/admin/Pages').then((module) => ({
  default: ({ name }) => {
    const Component = module[name];
    return Component ? <Component /> : null;
  },
})));

function AdminPage({ name }) {
  return <AdminPages name={name} />;
}

function PageLoader() {
  return <div className="min-h-[40vh]" aria-label="Chargement" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
            <Route path="personnel" element={<AdminPage name="Staff" />} />
            <Route path="dossiers" element={<AdminPage name="Dossiers" />} />
            <Route path="documents" element={<AdminPage name="Documents" />} />
            <Route path="taches" element={<AdminPage name="Tasks" />} />
            <Route path="devis" element={<AdminPage name="Quotes" />} />
            <Route path="rapports" element={<AdminPage name="Reports" />} />
            <Route path="actualites" element={<AdminPage name="Articles" />} />
            <Route path="notifications" element={<AdminPage name="Notifications" />} />
            <Route path="statistiques" element={<AdminPage name="Stats" />} />
            <Route path="parametres" element={<AdminPage name="Settings" />} />
            <Route path="journal" element={<AdminPage name="ActivityLog" />} />
          </Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
