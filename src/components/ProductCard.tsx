import { Link } from 'react-router-dom';
import type { Product } from '../data/products';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  return (
    <Link
      to={`/produto/${product.id}`}
      className="card animate-fade-in-up"
      style={{
        display: 'flex',
        flexDirection: 'column',
        animationDelay: `${index * 0.08}s`,
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Image area */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-lighter) 0%, #FFF0F1 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        position: 'relative',
      }}>
        <span className="emoji-display">{product.emoji}</span>
        {/* Category badge */}
        <span className="badge badge-primary" style={{
          position: 'absolute',
          top: 12,
          left: 12,
          fontSize: '0.7rem',
        }}>{product.category}</span>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px 20px' }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: 6,
          lineHeight: 1.3,
        }}>{product.name}</h3>

        <p style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginBottom: 12,
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{product.description}</p>

        {/* Bottom: price + colors */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--accent)',
          }}>R$ {product.price.toFixed(2)}</span>

          <div style={{ display: 'flex', gap: 3 }}>
            {product.colors.slice(0, 4).map(c => (
              <span
                key={c.hex}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: c.hex,
                  border: '1.5px solid rgba(0,0,0,0.1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
