import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, Button, Input, Card } from '../../components/ui';

const STAFF = ['assistant', 'accountant', 'accounting_manager', 'director', 'admin', 'super_admin'];

export default function Login() {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      const next = params.get('next');
      if (next) navigate(next);
      else if (STAFF.includes(user.role)) navigate('/admin');
      else {
        await logout();
        setError('Cet accès est réservé au personnel du cabinet.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Connexion impossible.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <Card className="w-full animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-lg object-contain" />
          <div>
            <h1 className="font-display text-2xl text-ink">Connexion</h1>
            <p className="text-xs text-ink-soft/70">Accédez à votre espace sécurisé.</p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          <Input label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          {error && <Alert tone="error">{error}</Alert>}
          <Button type="submit" className="w-full hover:-translate-y-0.5 transition-all duration-300" disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </Button>
        </form>
        <div className="mt-4 space-y-2 text-sm text-ink-soft/80">
          <p>
            <Link to="/mot-de-passe-oublie" className="text-sea hover:underline">Mot de passe oublié ?</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
