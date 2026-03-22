import { useParams, Link } from 'react-router-dom';
import { categories, products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find(c => c.slug === slug);
  const catProducts = products.filter(p => p.categorySlug === slug);
  const otherCategories = categories.filter(c => c.slug !== slug);

  if (!category) {
    return (
      <div className="container page-enter" style={{ textAlign: 'center', padding: '120px 20px' }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: 16 }}>😔</span>
        <h2 className="heading-lg" style={{ marginBottom: 12 }}>Categoria não encontrada</h2>
        <Link to="/" className="btn btn-primary">Voltar ao Início</Link>
      </div>
    );
  }

  return (
    <div className="page-enter">
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-lighter) 0%, #FFF0F1 100%)',
        padding: '48px 0 40px',
      }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginBottom: 20,
          }}>
            <Link to="/" style={{ color: 'var(--primary)', fontWeight: 500 }}>Início</Link>
            <span>›</span>
            <span>{category.name}</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: '2.5rem' }}>{category.emoji}</span>
            <div>
              <h1 className="heading-lg" style={{ marginBottom: 4 }}>{category.name}</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.938rem' }}>
                {category.description} — {catProducts.length} {catProducts.length === 1 ? 'produto' : 'produtos'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: '48px 0 80px' }}>
        <div className="container">
          {catProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: 'var(--text-muted)' }}>Nenhum produto nesta categoria ainda.</p>
            </div>
          ) : (
            <div className="grid-products">
              {catProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Other categories */}
      <section style={{ background: 'var(--bg-warm)', padding: '56px 0' }}>
        <div className="container">
          <h3 className="heading-md" style={{ marginBottom: 24 }}>Outras categorias</h3>
          <div style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            paddingBottom: 8,
          }}>
            {otherCategories.map(c => (
              <Link
                key={c.slug}
                to={`/categoria/${c.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'white',
                  border: '1px solid var(--border)',
                  whiteSpace: 'nowrap',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'all var(--transition)',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--primary-lighter)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.background = 'white';
                }}
              >
                <span>{c.emoji}</span> {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
