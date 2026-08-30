import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { Alert, Button, Input, Card } from '../../components/ui';

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const legacyToken = searchParams.get('token') || '';
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState(legacyToken);
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(legacyToken ? 2 : 1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const requestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setMessage(data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/reset-password', { email, code: resetCode, newPassword });
      setMessage(data.message);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Réinitialisation impossible.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Card>
        <h1 className="font-display text-3xl text-ink">Mot de passe oublié</h1>
        {step === 1 && !legacyToken && (
          <form className="mt-6 space-y-4" onSubmit={requestReset}>
            <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {error && <Alert tone="error">{error}</Alert>}
            <Button type="submit" disabled={loading}>Envoyer le code</Button>
          </form>
        )}
        {step === 2 && (
          <form className="mt-6 space-y-4" onSubmit={resetPassword}>
            {message && <Alert tone="success">{message}</Alert>}
            <Input label="Code de vérification" type="text" inputMode="numeric" pattern="[0-9]*" value={resetCode} onChange={(e) => setResetCode(e.target.value)} required minLength={6} maxLength={6} />
            <Input label="Nouveau mot de passe" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} />
            {error && <Alert tone="error">{error}</Alert>}
            <Button type="submit" disabled={loading}>Valider et mettre à jour</Button>
          </form>
        )}
        {step === 3 && (
          <div className="mt-6 space-y-4">
            <Alert tone="success">{message}</Alert>
            <Link to="/connexion" className="font-semibold text-sea">Retour à la connexion</Link>
          </div>
        )}
      </Card>
    </div>
  );
}
