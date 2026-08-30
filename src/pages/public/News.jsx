import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Card, Spinner, EmptyState } from '../../components/ui';
import { formatDate, getSafeImageUrl } from '../../utils/helpers';
import { Calendar, GraduationCap, Megaphone, Newspaper } from 'lucide-react';

const CAT_ICON = {
  formation: GraduationCap,
  formations: GraduationCap,
  annonce: Megaphone,
  annonces: Megaphone,
};
const CAT_COLOR = {
  formation: 'text-sea bg-sea/10',
  formations: 'text-sea bg-sea/10',
  annonce: 'text-accent bg-accent/10',
  annonces: 'text-accent bg-accent/10',
};

export default function News() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/articles').then((r) => setArticles(r.data.data || [])).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))]
    .filter((cat) => cat && !['Fiscalité', 'Fiscalite'].includes(String(cat).trim()));
  const filtered = filter ? articles.filter((a) => a.category === filter) : articles;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sea">Publications</p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
        Actualités & annonces du cabinet
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft/85">
        Formations à venir, conseils, annonces et informations utiles publiées par le cabinet.
      </p>

      {/* Filtres par catégorie */}
      {categories.length > 1 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('')}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${!filter ? 'border-sea bg-sea text-white' : 'border-line bg-white/70 text-ink-soft hover:border-sea'}`}
          >
            Tout
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${filter === cat ? 'border-sea bg-sea text-white' : 'border-line bg-white/70 text-ink-soft hover:border-sea'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="Aucune publication" description="Les prochaines actualités et annonces apparaîtront ici." />
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => {
            const catKey = String(a.category || '').toLowerCase();
            const Icon = CAT_ICON[catKey] || Newspaper;
            const colorClass = CAT_COLOR[catKey] || 'text-ink-soft bg-mist';
            return (
              <Link key={a.id} to={`/actualites/${a.slug}`} className="group block">
                <Card className="flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-md">
                  {/* Image */}
                  {getSafeImageUrl(a.imageUrl, null) ? (
                    <img
                      src={getSafeImageUrl(a.imageUrl, '/image5.png')}
                      alt={a.title}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = '/image5.png';
                      }}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-32 w-full items-center justify-center bg-mist">
                      <Icon size={36} className="text-sea/40" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}>
                        <Icon size={11} />
                        {a.category}
                      </span>
                      <span className="ml-auto text-xs text-ink-soft/50 flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(a.publishedAt || a.createdAt)}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-lg text-ink group-hover:text-sea sm:text-xl">{a.title}</h2>
                    {a.summary && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft/80 line-clamp-3">{a.summary}</p>
                    )}
                    <p className="mt-3 text-sm font-semibold text-sea">Lire la suite →</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
