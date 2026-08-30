import { useEffect, useState } from 'react';
import api from '../../services/api';
import {
  Alert, Badge, Button, Input, Select, Textarea, Card, PageHeader, Spinner, EmptyState,
} from '../../components/ui';
import { statusLabel, formatDate } from '../../utils/helpers';
import { useAuth } from '../../contexts/AuthContext';

export function Clients() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get('/admin/clients').then((r) => setItems(r.data.data)).finally(() => setLoading(false));
  }, []);
  if (loading) return <Spinner />;
  return (
    <div>
      <PageHeader title="Clients" />
      {items.length === 0 ? <EmptyState title="Aucun client" /> : (
        <div className="space-y-2">
          {items.map((c) => (
            <Card key={c.id} className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-medium">{c.user?.firstName} {c.user?.lastName}</p>
                <p className="text-sm text-ink-soft/70">{c.user?.email} · {c.company?.name || 'Sans entreprise'}</p>
              </div>
              <Badge>{c.status}</Badge>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export function Companies() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get('/admin/companies').then((r) => setItems(r.data.data)).finally(() => setLoading(false));
  }, []);
  if (loading) return <Spinner />;
  return (
    <div>
      <PageHeader title="Entreprises" />
      <div className="space-y-2">
        {items.map((c) => (
          <Card key={c.id}>
            <p className="font-medium">{c.name}</p>
            <p className="text-sm text-ink-soft/70">{c.legalForm} · {c.identificationNumber} · {c.sector}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Staff() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', role: 'accountant', title: '', specialty: '',
  });
  const [msg, setMsg] = useState('');
  const load = () => api.get('/admin/staff').then((r) => setItems(r.data.data));
  useEffect(() => { load(); }, []);
  const onCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/staff', form);
      setMsg('Collaborateur créé.');
      await load();
    } catch {
      setMsg(err.response?.data?.message || 'Erreur');
    }
  };
  return (
    <div>
      <PageHeader title="Personnel" />
      <Card className="mb-6">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onCreate}>
          <Input label="Prénom" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
          <Input label="Nom" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
          <Input label="E-mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Téléphone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input label="Mot de passe" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <Select label="Rôle" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            {['assistant', 'accountant', 'accounting_manager', 'director', 'admin'].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </Select>
          <Input label="Fonction" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input label="Spécialité" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} />
          {msg && <Alert className="sm:col-span-2">{msg}</Alert>}
          <div className="sm:col-span-2"><Button type="submit">Ajouter</Button></div>
        </form>
      </Card>
      <div className="space-y-2">
        {items.map((s) => (
          <Card key={s.id}>
            <p className="font-medium">{s.user?.firstName} {s.user?.lastName}</p>
            <p className="text-sm text-ink-soft/70">{s.title} · {s.user?.role} · {s.user?.email}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Dossiers() {
  const [dossiers, setDossiers] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ clientId: '', type: 'comptabilite', title: '', year: 2026 });
  const [reqForm, setReqForm] = useState({ dossierId: '', title: '', description: '', dueDate: '' });
  const [msg, setMsg] = useState('');

  const load = () => api.get('/dossiers').then((r) => setDossiers(r.data.data));
  useEffect(() => {
    load();
    api.get('/admin/clients').then((r) => setClients(r.data.data));
  }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post('/admin/dossiers', form);
    setMsg('Dossier créé.');
    await load();
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/admin/dossiers/${id}/status`, { status });
    await load();
  };

  const createRequest = async (e) => {
    e.preventDefault();
    await api.post('/admin/document-requests', reqForm);
    setMsg('Demande de document créée.');
  };

  return (
    <div>
      <PageHeader title="Dossiers" />
      {msg && <Alert tone="success" className="mb-4">{msg}</Alert>}
      <Card className="mb-4">
        <h2 className="font-display text-lg">Nouveau dossier</h2>
        <form className="mt-3 grid gap-3 sm:grid-cols-2" onSubmit={create}>
          <Select label="Client" value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })} required>
            <option value="">Choisir…</option>
            {clients.map((c) => (
              <option key={c.id} value={c.userId}>{c.user?.firstName} {c.user?.lastName}</option>
            ))}
          </Select>
          <Input label="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
          <Input label="Année" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
          <div className="sm:col-span-2"><Button type="submit">Créer</Button></div>
        </form>
      </Card>
      <Card className="mb-6">
        <h2 className="font-display text-lg">Demander une pièce</h2>
        <form className="mt-3 grid gap-3 sm:grid-cols-2" onSubmit={createRequest}>
          <Select label="Dossier" value={reqForm.dossierId} onChange={(e) => setReqForm({ ...reqForm, dossierId: e.target.value })} required>
            <option value="">Choisir…</option>
            {dossiers.map((d) => <option key={d.id} value={d.id}>{d.title}</option>)}
          </Select>
          <Input label="Titre" value={reqForm.title} onChange={(e) => setReqForm({ ...reqForm, title: e.target.value })} required />
          <Input label="Échéance" type="date" value={reqForm.dueDate} onChange={(e) => setReqForm({ ...reqForm, dueDate: e.target.value })} />
          <Textarea label="Description" value={reqForm.description} onChange={(e) => setReqForm({ ...reqForm, description: e.target.value })} />
          <div className="sm:col-span-2"><Button type="submit">Demander</Button></div>
        </form>
      </Card>
      <div className="space-y-2">
        {dossiers.map((d) => (
          <Card key={d.id}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium">{d.title}</p>
                <p className="text-xs text-ink-soft/70">{d.type} · {d.year}</p>
              </div>
              <Badge tone="info">{statusLabel(d.status)}</Badge>
            </div>
            <Select
              className="mt-3 max-w-xs"
              label="Changer le statut"
              value={d.status}
              onChange={(e) => updateStatus(d.id, e.target.value)}
            >
              {['created', 'documents_requested', 'documents_partial', 'in_review', 'processing', 'validation', 'completed', 'archived', 'blocked'].map((s) => (
                <option key={s} value={s}>{statusLabel(s)}</option>
              ))}
            </Select>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Documents() {
  const [docs, setDocs] = useState([]);
  const load = () => api.get('/documents').then((r) => setDocs(r.data.data));
  useEffect(() => { load(); }, []);
  const setStatus = async (id, status) => {
    await api.patch(`/admin/documents/${id}/status`, {
      status,
      rejectionReason: status === 'rejected' ? 'Document non conforme' : undefined,
    });
    await load();
  };
  return (
    <div>
      <PageHeader title="Documents" />
      <div className="space-y-2">
        {docs.map((d) => (
          <Card key={d.id} className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium">{d.title}</p>
              <p className="text-xs text-ink-soft/70">{d.category} · {formatDate(d.createdAt)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge>{statusLabel(d.status)}</Badge>
              <Button variant="outline" onClick={() => setStatus(d.id, 'accepted')}>Accepter</Button>
              <Button variant="danger" onClick={() => setStatus(d.id, 'rejected')}>Rejeter</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Requests() {
  const [requests, setRequests] = useState([]);
  const [contacts, setContacts] = useState([]);
  const load = () =>
    Promise.all([api.get('/admin/requests'), api.get('/admin/contact-messages')]).then(([r, c]) => {
      setRequests(r.data.data);
      setContacts(c.data.data);
    });
  useEffect(() => { load(); }, []);
  return (
    <div>
      <PageHeader title="Demandes" />
      <h2 className="mb-3 font-display text-xl">Prestations / devis</h2>
      <div className="mb-8 space-y-2">
        {requests.map((r) => (
          <Card key={r.id}>
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-medium">{r.firstName} {r.lastName} · {r.type}</p>
                <p className="text-sm text-ink-soft/80">{r.need}</p>
                <p className="text-xs text-ink-soft/60">{r.email} · {formatDate(r.createdAt)}</p>
              </div>
              <Select
                value={r.status}
                onChange={async (e) => {
                  await api.patch(`/admin/requests/${r.id}/status`, { status: e.target.value });
                  await load();
                }}
              >
                {['new', 'analyzing', 'exchange', 'proposal_sent', 'accepted', 'refused', 'postponed'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </div>
          </Card>
        ))}
      </div>
      <h2 className="mb-3 font-display text-xl">Messages contact</h2>
      <div className="space-y-2">
        {contacts.map((c) => (
          <Card key={c.id}>
            <p className="font-medium">{c.firstName} {c.lastName} · {c.subject}</p>
            <p className="text-sm text-ink-soft/80">{c.message}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '', priority: 'medium' });
  const load = () => api.get('/tasks').then((r) => setTasks(r.data.data));
  useEffect(() => { load(); }, []);
  return (
    <div>
      <PageHeader title="Tâches" />
      <Card className="mb-4">
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await api.post('/admin/tasks', form);
            await load();
          }}
        >
          <Input label="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input label="Échéance" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          <Textarea className="sm:col-span-2" label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Button type="submit">Créer</Button>
        </form>
      </Card>
      <div className="space-y-2">
        {tasks.map((t) => (
          <Card key={t.id} className="flex justify-between gap-2">
            <div>
              <p className="font-medium">{t.title}</p>
              <p className="text-xs text-ink-soft/70">{formatDate(t.dueDate)}</p>
            </div>
            <Select
              value={t.status}
              onChange={async (e) => {
                await api.patch(`/admin/tasks/${t.id}`, { status: e.target.value });
                await load();
              }}
            >
              {['todo', 'in_progress', 'waiting_client', 'done', 'cancelled'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Appointments() {
  const [items, setItems] = useState([]);
  const load = () => api.get('/appointments').then((r) => setItems(r.data.data));
  useEffect(() => { load(); }, []);
  return (
    <div>
      <PageHeader title="Rendez-vous" />
      <div className="space-y-2">
        {items.map((a) => (
          <Card key={a.id} className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-medium">{a.requesterName}</p>
              <p className="text-sm">{a.date} {a.startTime} · {a.motif}</p>
            </div>
            <div className="flex gap-2">
              <Badge>{statusLabel(a.status)}</Badge>
              <Button variant="outline" onClick={async () => { await api.patch(`/admin/appointments/${a.id}/status`, { status: 'confirmed' }); await load(); }}>Confirmer</Button>
              <Button variant="ghost" onClick={async () => { await api.patch(`/admin/appointments/${a.id}/status`, { status: 'cancelled' }); await load(); }}>Annuler</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Messages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  useEffect(() => {
    api.get('/conversations').then((r) => setConversations(r.data.data));
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      api.get('/conversations').then((r) => setConversations(r.data.data));
      if (selected) {
        api.get(`/conversations/${selected.id}/messages`).then(({ data }) => setMessages(data.data));
      }
    }, 3000);
    return () => window.clearInterval(interval);
  }, [selected]);
  const open = async (c) => {
    setSelected(c);
    const { data } = await api.get(`/conversations/${c.id}/messages`);
    setMessages(data.data);
  };
  return (
    <div>
      <PageHeader title="Messages" />
      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <div className="space-y-2">
          {conversations.map((c) => (
            <button key={c.id} type="button" onClick={() => open(c)} className="w-full rounded-lg border border-line bg-white px-3 py-2 text-left text-sm transition hover:border-emerald-400 hover:bg-emerald-50">
              {c.subject}
            </button>
          ))}
        </div>
        <Card>
          {!selected ? <p className="text-sm text-ink-soft/70">Sélectionnez une conversation</p> : (
            <>
              <h2 className="font-display text-xl">{selected.subject}</h2>
              <div className="mt-4 max-h-80 space-y-2 overflow-y-auto">
                {messages.map((m) => (
                  <div key={m.id} className={`rounded-md px-3 py-2 text-sm ${m.senderId === user?.id ? 'bg-sea text-white ml-8' : 'bg-mist mr-8'}`}>
                    {m.content}
                  </div>
                ))}
              </div>
              <form
                className="mt-4 flex gap-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const { data } = await api.post(`/conversations/${selected.id}/messages`, { content });
                  setMessages((m) => [...m, data.data]);
                  setContent('');
                }}
              >
                <Input className="flex-1" value={content} onChange={(e) => setContent(e.target.value)} />
                <Button type="submit">Répondre</Button>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ clientId: '', description: '', amount: '', serviceSlug: '' });
  const load = () => api.get('/quotes').then((r) => setQuotes(r.data.data));
  useEffect(() => {
    load();
    api.get('/admin/clients').then((r) => setClients(r.data.data));
  }, []);
  return (
    <div>
      <PageHeader title="Devis" />
      <Card className="mb-4">
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await api.post('/admin/quotes', form);
            await load();
          }}
        >
          <Select label="Client" value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })}>
            <option value="">Choisir…</option>
            {clients.map((c) => <option key={c.id} value={c.userId}>{c.user?.firstName} {c.user?.lastName}</option>)}
          </Select>
          <Input label="Montant" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          <Textarea className="sm:col-span-2" label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Button type="submit">Envoyer le devis</Button>
        </form>
      </Card>
      <div className="space-y-2">
        {quotes.map((q) => (
          <Card key={q.id} className="flex justify-between">
            <div>
              <p className="font-medium">{q.number}</p>
              <p className="text-sm">{q.description}</p>
            </div>
            <Badge>{statusLabel(q.status)}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Reports() {
  const [reports, setReports] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ title: '', category: 'rapport', clientId: '' });
  const [file, setFile] = useState(null);
  const load = () => api.get('/reports').then((r) => setReports(r.data.data));
  useEffect(() => {
    load();
    api.get('/admin/clients').then((r) => setClients(r.data.data));
  }, []);
  return (
    <div>
      <PageHeader title="Rapports" />
      <Card className="mb-4">
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const data = new FormData();
            Object.entries(form).forEach(([k, v]) => data.append(k, v));
            data.append('file', file);
            await api.post('/admin/reports', data);
            await load();
          }}
        >
          <Input label="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Select label="Client" value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })}>
            <option value="">Choisir…</option>
            {clients.map((c) => <option key={c.id} value={c.userId}>{c.user?.firstName} {c.user?.lastName}</option>)}
          </Select>
          <Input label="Fichier" type="file" onChange={(e) => setFile(e.target.files?.[0])} required />
          <Button type="submit">Publier</Button>
        </form>
      </Card>
      <div className="space-y-2">
        {reports.map((r) => (
          <Card key={r.id}>
            <p className="font-medium">{r.title}</p>
            <p className="text-xs text-ink-soft/70">{formatDate(r.createdAt)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* -- Modal confirmation suppression article -- */
function DeleteArticleModal({ title, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="mx-4 w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto text-xl">!</div>
        <h2 className="mt-4 text-center font-display text-xl text-ink">Supprimer la publication ?</h2>
        <p className="mt-2 text-center text-sm text-ink-soft/80">
          Voulez-vous vraiment supprimer <strong>« {title} »</strong> ? Cette action est irréversible.
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
            onClick={(e) => { e.stopPropagation(); onConfirm(); }}
            className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export function Articles() {
  const [items, setItems] = useState([]);
  const [confirmation, setConfirmation] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({
    title: '', summary: '', content: '-', category: 'Formation', software: 'Sage 100', status: 'published',
  });

  const load = () => api.get('/articles').then((r) => setItems(r.data.data));

  const removeArticle = async (id) => {
    try {
      await api.delete(`/admin/articles/${id}`);
      await load();
      setConfirmation('Publication supprimée.');
      window.setTimeout(() => setConfirmation(''), 4000);
    } catch {
      setConfirmation('Erreur lors de la suppression.');
      window.setTimeout(() => setConfirmation(''), 4000);
    } finally {
      setDeleteTarget(null);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      {deleteTarget && (
        <DeleteArticleModal
          title={deleteTarget.title}
          onConfirm={() => removeArticle(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      <PageHeader title="Publications & formations" />
      {confirmation && (
        <Alert className="fixed right-5 top-5 z-50 max-w-sm shadow-lg" tone="success">{confirmation}</Alert>
      )}
      <Card className="mb-4">
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const platformImageMap = {
                'Sage 100': '/sage.png',
                Odoo: '/odoo.png',
              };
              const payload = new FormData();
              payload.append('title', form.title);
              payload.append('summary', form.summary || '');
              payload.append('content', '-');
              payload.append('category', form.category);
              payload.append('status', 'published');
              payload.append('software', form.software || 'Sage 100');
              payload.append('imageUrl', imageFile ? '' : (platformImageMap[form.software] || '/image5.png'));
              if (imageFile) payload.append('image', imageFile);
              await api.post('/admin/articles', payload);
              const title = form.title;
              setForm({ title: '', summary: '', content: '-', category: 'Formation', software: 'Sage 100', status: 'published' });
              setImageFile(null);
              setImageFileName('');
              await load();
              setConfirmation(`Publication « ${title} » créée avec succès et visible publiquement.`);
            } catch (err) {
              setConfirmation(err.response?.data?.message || 'La publication n’a pas pu être créée.');
            }
            window.setTimeout(() => setConfirmation(''), 4000);
          }}
        >
          <Input
            label="Titre *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            placeholder="Ex. : Formation Sage 100 Comptabilité"
          />
          <Select
            label="Logiciel / type de formation"
            value={form.software}
            onChange={(e) => setForm({ ...form, software: e.target.value })}
          >
            <option value="Sage 100">Sage 100</option>
            <option value="Odoo">Odoo</option>
          </Select>
          <Input
            label="Résumé"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            placeholder="Courte description visible sur la carte"
          />
          <Select
            label="Type"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="Formation">Formation</option>
            <option value="Conseil">Conseil</option>
          </Select>

          {/* Champ image personnalisé sans texte de navigateur inutile */}
          <div>
            <p className="mb-1.5 text-sm font-medium text-ink">Image de la publication</p>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-line bg-mist/30 px-4 py-3 transition hover:border-sea hover:bg-sea/5">
              <span className="text-lg">Image</span>
              <span className="text-sm text-ink-soft/80">
                {imageFileName || 'Cliquez pour choisir une image (JPG, PNG, WEBP)'}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImageFile(file);
                  setImageFileName(file ? file.name : '');
                }}
              />
            </label>
            {imageFileName && (
              <button
                type="button"
                onClick={() => { setImageFile(null); setImageFileName(''); }}
                className="mt-1.5 text-xs text-red-500 hover:underline"
              >
                Retirer l'image
              </button>
            )}
          </div>

          <Button type="submit" className="w-full sm:w-auto">Publier</Button>
        </form>
      </Card>

      <div className="space-y-2">
        {items.length === 0 && (
          <p className="py-6 text-center text-sm text-ink-soft/60">Aucune publication pour le moment.</p>
        )}
        {items.map((a) => (
          <Card key={a.id} className="flex items-center gap-4">
            {a.imageUrl && (
              <img
                src={a.imageUrl}
                alt=""
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-ink truncate">{a.title}</p>
              <p className="text-xs text-ink-soft/60">{a.category} · {formatDate(a.publishedAt || a.createdAt)}</p>
            </div>
            <button
              type="button"
              onClick={() => setDeleteTarget({ id: a.id, title: a.title })}
              aria-label={`Supprimer ${a.title}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:bg-red-600 hover:text-white active:scale-95"
            >
              <span aria-hidden="true" className="text-base font-bold">×</span>
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Faqs() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ category: 'Général', question: '', answer: '' });
  const load = () => api.get('/faqs').then((r) => setItems(r.data.data));
  useEffect(() => { load(); }, []);
  return (
    <div>
      <PageHeader title="FAQ" />
      <Card className="mb-4">
        <form
          className="space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            await api.post('/admin/faqs', form);
            setForm({ category: 'Général', question: '', answer: '' });
            await load();
          }}
        >
          <Input label="Catégorie" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Input label="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
          <Textarea label="Réponse" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
          <Button type="submit">Ajouter</Button>
        </form>
      </Card>
      <div className="space-y-2">
        {items.map((f) => (
          <Card key={f.id}>
            <p className="text-xs text-sea">{f.category}</p>
            <p className="font-medium">{f.question}</p>
            <p className="text-sm text-ink-soft/80">{f.answer}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Notifications() {
  const { user } = useAuth();

  const [notifs, setNotifs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replySent, setReplySent] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type, id, label }
  const [confirmation, setConfirmation] = useState('');

  /* -- IDs lus persistés par item dans localStorage -- */
  const [readIds, setReadIds] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('notif_read_ids') || '[]')); }
    catch { return new Set(); }
  });

  const markRead = (id) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      next.add(String(id));
      localStorage.setItem('notif_read_ids', JSON.stringify([...next]));
      return next;
    });
  };

  const load = async () => {
    const [n, r, c, conv] = await Promise.all([
      api.get('/notifications').catch(() => ({ data: { data: [] } })),
      api.get('/admin/requests').catch(() => ({ data: { data: [] } })),
      api.get('/admin/contact-messages').catch(() => ({ data: { data: [] } })),
      api.get('/conversations').catch(() => ({ data: { data: [] } })),
    ]);
    setNotifs(n.data.data || []);
    setRequests(r.data.data || []);
    setContacts(c.data.data || []);
    setConversations(conv.data.data || []);
  };

  useEffect(() => {
    load();
    const interval = window.setInterval(load, 5000);
    return () => window.clearInterval(interval);
  }, []);

  /* -- Suppression depuis la BDD -- */
  const deleteItem = async () => {
    if (!deleteConfirm) return;
    try {
      const { type, id } = deleteConfirm;
      if (type === 'request') await api.delete(`/admin/requests/${id}`);
      else if (type === 'contact') await api.delete(`/admin/contact-messages/${id}`);
      else if (type === 'notif') await api.delete(`/notifications/${id}`);
      // Retirer localement
      if (type === 'request') setRequests((p) => p.filter((r) => r.id !== id));
      if (type === 'contact') setContacts((p) => p.filter((c) => c.id !== id));
      if (type === 'notif') setNotifs((p) => p.filter((n) => n.id !== id));
      if (type === 'conversation') setConversations((p) => p.filter((c) => c.id !== id));
      if (selected?.item?.id === id) setSelected(null);
      // Retirer badge
      markRead(`${type === 'notif' ? 'notif_' : type === 'request' ? 'req_' : type === 'contact' ? 'contact_' : 'conv_'}${id}`);
      setConfirmation('Supprimé.');
      window.setTimeout(() => setConfirmation(''), 3000);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const openConversation = async (conv) => {
    setSelected({ type: 'conversation', item: conv });
    setReplySent(false);
    setReplyContent('');
    markRead('conv_' + conv.id);
    const { data } = await api.get(`/conversations/${conv.id}/messages`);
    setMessages(data.data || []);
  };

  const openRequest = (req) => {
    markRead('req_' + req.id);
    setSelected({ type: 'request', item: req });
    setReplySent(false);
  };

  const openContact = (c) => {
    markRead('contact_' + c.id);
    setSelected({ type: 'contact', item: c });
    setReplySent(false);
  };

  const openNotif = (n) => {
    markRead('notif_' + n.id);
    setSelected({ type: 'notif', item: n });
    api.patch(`/notifications/${n.id}/read`).catch(() => {});
  };

  const sendReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    if (selected?.type === 'conversation') {
      await api.post(`/conversations/${selected.item.id}/messages`, { content: replyContent });
      const { data } = await api.get(`/conversations/${selected.item.id}/messages`);
      setMessages(data.data || []);
    }
    setReplyContent('');
    setReplySent(true);
  };

  const buildReplyMailto = (email, name, subject) => {
    const greeting = name ? `Bonjour ${name},` : 'Bonjour,';
    const body = `${greeting}\n\nNous avons bien reçu votre message. Nous vous répondrons dans les meilleurs délais.\n\nCordialement,\nL'équipe du Cabinet Comptable`;
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const allItems = [
    ...notifs.map((n) => ({ _type: 'notif', _id: 'notif_' + n.id, _date: n.createdAt, _email: null, _title: n.title, _preview: n.content, raw: n })),
    ...requests.map((r) => ({ _type: 'request', _id: 'req_' + r.id, _date: r.createdAt, _email: r.email, _title: 'Demande reçue', _preview: r.need?.slice(0, 80) || '', raw: r })),
    ...contacts.map((c) => ({ _type: 'contact', _id: 'contact_' + c.id, _date: c.createdAt, _email: c.email, _title: 'Message reçu', _preview: c.message?.slice(0, 80) || c.subject || '', raw: c })),
    ...conversations.map((c) => ({ _type: 'conversation', _id: 'conv_' + c.id, _date: c.lastMessageAt || c.createdAt, _email: null, _title: `Conversation · ${c.subject || 'Sans objet'}`, _preview: c.unreadCount > 0 ? `${c.unreadCount} message(s) non lu(s)` : 'Conversation ouverte', raw: c, unread: (c.unreadCount || 0) > 0 })),
  ].sort((a, b) => new Date(b._date) - new Date(a._date));

  const TYPE_COLORS = {
    notif: 'bg-blue-100 text-blue-700',
    request: 'bg-amber-100 text-amber-700',
    contact: 'bg-purple-100 text-purple-700',
    conversation: 'bg-emerald-100 text-emerald-700',
  };

  const isUnread = (item) => {
    if (readIds.has(item._id)) return false;
    if (item._type === 'notif') return !item.raw.read;
    if (item._type === 'conversation') return item.unread;
    if (item._type === 'request') return item.raw.status === 'new';
    if (item._type === 'contact') return !item.raw.readAt;
    return false;
  };

  return (
    <div>
      {/* Modal suppression */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto text-xl">!</div>
            <h2 className="mt-4 text-center font-display text-xl text-ink">Supprimer ?</h2>
            <p className="mt-2 text-center text-sm text-ink-soft/80">
              Supprimer <strong>« {deleteConfirm.label} »</strong> ? Cette action est irréversible.
            </p>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-lg border border-line py-2.5 text-sm font-semibold text-ink hover:bg-mist transition">Annuler</button>
              <button type="button" onClick={deleteItem} className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition active:scale-95">Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {confirmation && <div className="fixed right-5 top-5 z-50 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">{confirmation}</div>}

      <PageHeader title="Notifications" subtitle="Tous les messages, demandes et alertes." />

      <div className="notif-grid grid gap-4 lg:grid-cols-[340px_1fr]">
        {/* -- Liste gauche -- */}
        <div className="notif-list space-y-1.5 overflow-y-auto max-h-[78vh] pr-1">
          {allItems.length === 0 && (
            <div className="flex flex-col items-center py-12 text-center">
              <span className="text-4xl">!</span>
              <p className="mt-3 text-sm text-ink-soft/60">Aucune notification pour le moment.</p>
            </div>
          )}
          {allItems.map((item) => {
            const unread = isUnread(item);
            const badgeCount = unread ? (item._type === 'conversation' ? (item.raw.unreadCount || 1) : 1) : 0;
            const isActive = selected?.item?.id === item.raw?.id;
            return (
              <div
                key={item._id}
                className={`group relative flex items-start gap-3 rounded-xl border p-3 transition cursor-pointer ${
                  isActive ? 'border-sea bg-sea/5 shadow-sm' : unread ? 'border-sea/30 bg-white' : 'border-line bg-white/60 opacity-80'
                } hover:border-sea/40 hover:bg-sea/5 hover:opacity-100`}
                onClick={() => {
                  if (item._type === 'conversation') openConversation(item.raw);
                  else if (item._type === 'request') openRequest(item.raw);
                  else if (item._type === 'contact') openContact(item.raw);
                  else openNotif(item.raw);
                }}
              >
                {/* Corps */}
                <div className="flex-1 min-w-0">
                  {item._email && (
                    <a
                      href={buildReplyMailto(item._email, item.raw?.firstName || item.raw?.lastName || '', 'Réponse à votre message - Cabinet Comptable')}
                      onClick={(e) => e.stopPropagation()}
                      className="mb-0.5 block truncate text-[11px] font-bold text-sea hover:underline"
                    >
                      ? {item._email}
                    </a>
                  )}
                  <p className={`text-xs truncate ${unread ? 'font-bold text-ink' : 'font-medium text-ink/70'}`}>{item._title}</p>
                  <p className="truncate text-[11px] text-ink-soft/60 mt-0.5">{item._preview}</p>
                  <p className="text-[10px] text-ink-soft/40 mt-1">{formatDate(item._date)}</p>
                </div>

                {/* Badge + bouton supprimer */}
                <div className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
                  {badgeCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
                      {badgeCount}
                    </span>
                  )}
                  <button
                    type="button"
                    aria-label="Supprimer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm({ type: item._type, id: item.raw.id, label: item._title });
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-transparent text-ink-soft/30 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* -- Panneau détail droit -- */}
        <div className="rounded-2xl border border-line bg-white p-6 min-h-[400px] flex flex-col">
          {!selected ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center py-12">
              <span className="text-5xl">@</span>
              <p className="mt-4 font-display text-lg text-ink">Sélectionnez une notification</p>
              <p className="mt-1 text-sm text-ink-soft/60">Cliquez sur un élément à gauche pour voir les détails et répondre.</p>
            </div>
          ) : selected.type === 'notif' ? (
            <div>
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${TYPE_COLORS.notif}`}>Notification</span>
              <h2 className="mt-3 font-display text-xl text-ink">{selected.item.title}</h2>
              <p className="mt-3 text-sm text-ink-soft/80 leading-relaxed">{selected.item.content}</p>
              <p className="mt-4 text-xs text-ink-soft/40">{formatDate(selected.item.createdAt)}</p>
            </div>
          ) : selected.type === 'request' ? (
            <div>
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${TYPE_COLORS.request}`}>Demande</span>
              <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
                <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide">Expéditeur</p>
                <a href={buildReplyMailto(selected.item.email, selected.item.firstName || '', 'Réponse à votre demande - Cabinet Comptable')} className="text-sm text-sea hover:underline font-medium block">{selected.item.email}</a>
              </div>
              <div className="mt-4 space-y-1.5 text-sm">
                {selected.item.need && <p><span className="font-semibold text-ink-soft/70">Message :</span> {selected.item.need}</p>}
                <p className="text-xs text-ink-soft/40">{formatDate(selected.item.createdAt)}</p>
              </div>
              <div className="mt-5 border-t border-line pt-4">
                <a href={buildReplyMailto(selected.item.email, selected.item.firstName || '', 'Réponse à votre demande - Cabinet Comptable')}
                  className="inline-flex items-center gap-2 rounded-lg bg-sea px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sea-dark hover:-translate-y-0.5">
                  Répondre à {selected.item.email}
                </a>
              </div>
            </div>
          ) : selected.type === 'contact' ? (
            <div>
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${TYPE_COLORS.contact}`}>Contact</span>
              <div className="mt-3 rounded-xl bg-purple-50 border border-purple-200 px-4 py-3">
                <p className="text-xs text-purple-700 font-semibold uppercase tracking-wide">Expéditeur</p>
                <a href={buildReplyMailto(selected.item.email, selected.item.firstName || '', 'Réponse à votre message - Cabinet Comptable')} className="text-sm text-sea hover:underline font-medium block">{selected.item.email}</a>
              </div>
              <div className="mt-4 space-y-1.5 text-sm">
                <p><span className="font-semibold text-ink-soft/70">Message :</span> {selected.item.message || selected.item.subject}</p>
                <p className="text-xs text-ink-soft/40">{formatDate(selected.item.createdAt)}</p>
              </div>
              <div className="mt-5 border-t border-line pt-4">
                <a href={buildReplyMailto(selected.item.email, selected.item.firstName || '', 'Réponse à votre message - Cabinet Comptable')}
                  className="inline-flex items-center gap-2 rounded-lg bg-sea px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sea-dark hover:-translate-y-0.5">
                  Répondre à {selected.item.email}
                </a>
              </div>
            </div>
          ) : selected.type === 'conversation' ? (
            <div className="flex flex-1 flex-col">
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${TYPE_COLORS.conversation}`}>Message</span>
              <h2 className="mt-3 font-display text-xl text-ink">{selected.item.subject}</h2>
              <div className="mt-4 flex-1 overflow-y-auto max-h-72 space-y-2 rounded-xl bg-mist/40 p-3">
                {messages.length === 0 && <p className="text-xs text-ink-soft/60 text-center py-4">Aucun message.</p>}
                {messages.map((m) => (
                  <div key={m.id} className={`rounded-xl px-3.5 py-2.5 text-sm max-w-[85%] ${m.senderId === user?.id ? 'ml-auto bg-sea text-white' : 'bg-white border border-line text-ink'}`}>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-[10px] font-semibold ${m.senderId === user?.id ? 'text-white/70' : 'text-sea'}`}>
                        {m.senderId === user?.id ? 'Vous' : 'Client'}
                      </span>
                      {m.senderId !== user?.id && !m.readBy?.includes(user?.id) && (
                        <span className="flex h-2 w-2 rounded-full bg-red-500" />
                      )}
                    </div>
                    <p>{m.content}</p>
                    <p className={`mt-1 text-[10px] ${m.senderId === user?.id ? 'text-white/60' : 'text-ink-soft/50'}`}>{formatDate(m.createdAt)}</p>
                  </div>
                ))}
              </div>
              <form className="mt-3 flex gap-2" onSubmit={sendReply}>
                <input type="text" value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder="Votre réponse…" className="flex-1 rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-sea focus:ring-1 focus:ring-sea" />
                <button type="submit" disabled={!replyContent.trim()} className="rounded-lg bg-sea px-4 py-2 text-sm font-semibold text-white hover:bg-sea-dark disabled:opacity-40 transition">Envoyer</button>
              </form>
              {replySent && <p className="mt-1.5 text-xs text-emerald-600 font-medium">✓ Réponse envoyée.</p>}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function Stats() {
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get('/admin/stats').then((r) => setData(r.data.data));
  }, []);
  if (!data) return <Spinner />;
  return (
    <div>
      <PageHeader title="Statistiques" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(data).filter(([, v]) => typeof v !== 'object').map(([k, v]) => (
          <Card key={k}>
            <p className="text-xs uppercase text-ink-soft/60">{k}</p>
            <p className="mt-2 font-display text-3xl">{v}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function LogoutConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
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

export function Settings() {
  const { user, refresh, logout } = useAuth();
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    api.get('/settings').then((r) => setForm({ ...r.data.data, adminEmail: user?.email || r.data.data?.email || '' }));
  }, [user?.email]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, email: form.email || form.adminEmail || '', adminEmail: form.adminEmail };
      const { data } = await api.patch('/admin/settings', payload);
      setForm({ ...data.data, adminEmail: form.adminEmail || data.data.email || user?.email || '' });
      setMsg('Enregistré.');
      await refresh();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Erreur lors de la sauvegarde.');
    }
  };

  if (!form) return <Spinner />;
  return (
    <div>
      {showLogoutModal && (
        <LogoutConfirmModal
          onConfirm={async () => {
            setShowLogoutModal(false);
            await logout();
          }}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      <PageHeader
        title="Paramètres"
        actions={
          <Button variant="outline" onClick={() => setShowLogoutModal(true)}>
            Déconnexion
          </Button>
        }
      />
      <Card className="max-w-2xl">
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={onSubmit}
        >
          {['cabinetName', 'tagline', 'phone', 'whatsapp', 'address', 'hours'].map((k) => (
            <Input key={k} className={k === 'tagline' || k === 'address' ? 'sm:col-span-2' : ''} label={k} value={form[k] || ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
          ))}
          <Input className="sm:col-span-2" label="Email du cabinet" type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input className="sm:col-span-2" label="Email du compte administrateur" type="email" value={form.adminEmail || ''} onChange={(e) => setForm({ ...form, adminEmail: e.target.value })} />
          {msg && <Alert className="sm:col-span-2" tone={msg.includes('Erreur') ? 'error' : 'success'}>{msg}</Alert>}
          <Button type="submit">Enregistrer</Button>
        </form>
      </Card>
    </div>
  );
}

export function ActivityLog() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get('/admin/activity-logs').then((r) => setItems(r.data.data));
  }, []);
  return (
    <div>
      <PageHeader title="Journal d'activité" />
      <div className="space-y-2">
        {items.map((l) => (
          <Card key={l.id} className="text-sm">
            <p className="font-medium">{l.action} · {l.objectType}</p>
            <p className="text-xs text-ink-soft/70">{formatDate(l.createdAt || l.at)} · user {l.userId?.slice(0, 8)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
