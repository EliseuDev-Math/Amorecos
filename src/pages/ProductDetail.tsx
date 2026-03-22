import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container page-enter" style={{ textAlign: 'center', padding: '120px 20px' }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: 16 }}>😔</span>
        <h2 className="heading-lg" style={{ marginBottom: 12 }}>Produto não encontrado</h2>
        <Link to="/" className="btn btn-primary">Voltar ao Início</Link>
      </div>
    );
  }

  const color = product.colors[selectedColor];
  const related = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        emoji: product.emoji,
        price: product.price,
        color: color.name,
        colorHex: color.hex,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <section style={{ padding: '20px 0 0' }}>
        <div className="container">
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}>
            <Link to="/" style={{ color: 'var(--primary)', fontWeight: 500 }}>Início</Link>
            <span>›</span>
            <Link to={`/categoria/${product.categorySlug}`} style={{ color: 'var(--primary)', fontWeight: 500 }}>{product.category}</Link>
            <span>›</span>
            <span>{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product */}
      <section style={{ padding: '32px 0 64px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'start',
          }} className="product-grid">
            {/* Left: Image */}
            <div className="animate-fade-in-up" style={{
              background: 'linear-gradient(135deg, var(--primary-lighter) 0%, #FFF0F1 100%)',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '64px',
              minHeight: 360,
              position: 'relative',
            }}>
              <span className="emoji-display emoji-display-lg">{product.emoji}</span>
              <span className="badge badge-primary" style={{
                position: 'absolute',
                top: 20,
                left: 20,
              }}>{product.category}</span>
            </div>

            {/* Right: Info */}
            <div className="animate-fade-in-up delay-1">
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                marginBottom: 12,
              }}>{product.name}</h1>

              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                marginBottom: 20,
              }}>
                <span style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                }}>R$ {product.price.toFixed(2)}</span>
                <span style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                }}>ou 3x de R$ {(product.price / 3).toFixed(2)}</span>
              </div>

              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: 28,
              }}>{product.description}</p>

              <hr className="divider" />

              {/* Colors */}
              <div style={{ marginBottom: 28 }}>
                <p style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  marginBottom: 12,
                  color: 'var(--text-secondary)',
                }}>
                  Cor: <span style={{ color: 'var(--text-primary)' }}>{color.name}</span>
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {product.colors.map((c, i) => (
                    <button
                      key={c.hex}
                      onClick={() => setSelectedColor(i)}
                      title={c.name}
                      className="color-swatch"
                      style={{
                        background: c.hex,
                        boxShadow: i === selectedColor
                          ? '0 0 0 2.5px var(--primary)'
                          : '0 0 0 1.5px #ddd',
                        border: '3px solid white',
                        transform: i === selectedColor ? 'scale(1.15)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div style={{ marginBottom: 28 }}>
                <p style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  marginBottom: 12,
                  color: 'var(--text-secondary)',
                }}>Quantidade</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    minWidth: 32,
                    textAlign: 'center',
                  }}>{qty}</span>
                  <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                className="btn btn-primary btn-lg"
                onClick={handleAdd}
                style={{
                  width: '100%',
                  maxWidth: 360,
                  background: added ? '#2ecc71' : undefined,
                }}
              >
                {added ? '✓ Adicionado ao Carrinho!' : '🛒 Adicionar ao Carrinho'}
              </button>

              {/* Tags */}
              <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.tags.map(tag => (
                  <span key={tag} className="badge badge-primary">#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Responsive CSS */}
          <style>{`
            @media (max-width: 768px) {
              .product-grid {
                grid-template-columns: 1fr !important;
                gap: 24px !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: 'var(--bg-warm)', padding: '56px 0 72px' }}>
          <div className="container">
            <h3 className="heading-md" style={{ marginBottom: 28 }}>Produtos Relacionados</h3>
            <div className="grid-products">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
