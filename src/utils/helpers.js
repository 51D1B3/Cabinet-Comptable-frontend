export const STATUS_LABELS = {
  created: 'Créé',
  documents_requested: 'Documents demandés',
  documents_partial: 'Documents partiellement reçus',
  in_review: 'En vérification',
  processing: 'Traitement en cours',
  validation: 'En validation',
  completed: 'Terminé',
  archived: 'Archivé',
  blocked: 'Bloqué',
  pending: 'En attente',
  requested: 'Demandé',
  received: 'Reçu',
  accepted: 'Accepté',
  rejected: 'Rejeté',
  confirmed: 'Confirmé',
  cancelled: 'Annulé',
  new: 'Nouveau',
  sent: 'Envoyé',
  todo: 'À faire',
  done: 'Terminée',
};

export function statusLabel(status) {
  return STATUS_LABELS[status] || status || '—';
}

export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function formatDate(value) {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return value;
  }
}

export function getSafeImageUrl(value, fallback = '/image5.png') {
  if (typeof value !== 'string') {
    return fallback;
  }

  const cleaned = value.trim();
  if (!cleaned || cleaned === 'null' || cleaned === 'undefined') {
    return fallback;
  }

  if (cleaned.startsWith('http://') || cleaned.startsWith('https://') || cleaned.startsWith('/')) {
    return cleaned;
  }

  return fallback;
}
