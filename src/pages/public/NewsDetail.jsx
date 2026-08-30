import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import { Alert, Spinner } from '../../components/ui';
import { formatDate, getSafeImageUrl } from '../../utils/helpers';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

export default function NewsDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/articles/${slug}`)
      .then((r) => setArticle(r.data.data))
      .catch(() => setError('Publication introuvable.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Spinner />;

  if (error || !article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Alert tone="error">{error || 'Publication introuvable.'}</Alert>
        <Link to="/actualites" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sea">
          <ArrowLeft size={15} /> Retour aux publications
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      {/* Retour */}
      <Link to="/actualites" className="inline-flex items-center gap-1 text-sm font-semibold text-sea hover:underline">
        <ArrowLeft size={15} /> Toutes les publications
      </Link>

      {/* Meta */}
      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-ink-soft/60">
        {article.category && (
          <span className="inline-flex items-center gap-1 rounded-full border border-sea/30 bg-sea/5 px-2.5 py-0.5 font-semibold text-sea">
            <Tag size={11} /> {article.category}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Calendar size={11} />
          {formatDate(article.publishedAt || article.createdAt)}
        </span>
        {article.authorName && <span>Par {article.authorName}</span>}
      </div>

      {/* Titre */}
      <h1 className="mt-4 font-display text-3xl text-ink sm:text-4xl md:text-5xl">{article.title}</h1>

      {/* Résumé */}
      {article.summary && (
        <p className="mt-4 text-base leading-relaxed text-ink-soft/85 sm:text-lg">{article.summary}</p>
      )}

      {/* Image principale — affichée en grand si présente */}
      {getSafeImageUrl(article.imageUrl, null) && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-mist">
          <img
            src={getSafeImageUrl(article.imageUrl, '/image5.png')}
            alt={article.title}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = '/image5.png';
            }}
            className="w-full object-contain"
            style={{ maxHeight: '70vh' }}
          />
        </div>
      )}

      {/* Contenu */}
      {article.content && (
        <div className="mt-8 text-sm leading-loose text-ink-soft/90 whitespace-pre-wrap sm:text-base">
          {article.content}
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 border-t border-line pt-6">
        <Link to="/actualites" className="inline-flex items-center gap-1 text-sm font-semibold text-sea hover:underline">
          <ArrowLeft size={15} /> Retour aux publications
        </Link>
      </div>
    </article>
  );
}
