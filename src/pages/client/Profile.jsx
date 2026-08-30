import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { Alert, Button, Input, Card, PageHeader } from '../../components/ui';

export default function Profile() {
  const { user, refresh } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await api.patch('/profile', form);
      await refresh();
      setMessage('Profil mis à jour.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Mon profil" subtitle={user?.email} />
      <Card className="max-w-xl">
        <form className="space-y-4" onSubmit={onSave}>
          <Input label="Prénom" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
          <Input label="Nom" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
          <Input label="Téléphone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input label="E-mail" value={user?.email || ''} disabled />
          {message && <Alert tone="success">{message}</Alert>}
          <Button type="submit" disabled={loading}>{loading ? 'Enregistrement…' : 'Enregistrer'}</Button>
        </form>
      </Card>
    </div>
  );
}
