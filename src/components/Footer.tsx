import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export default function Footer() {
  const socials = [
    { icon: '📷', label: 'Instagram', url: '#' },
    { icon: '📘', label: 'Facebook', url: '#' },
    { icon: '💬', label: 'WhatsApp', url: '#' },
    { icon: '📧', label: 'Email', url: 'mailto:contato@amorecos.com' },
  ];

  return (
    <footer style={{
      background: 'var(--text-primary)',
      color: 'rgba(255,255,255,0.7)',
      paddingTop: 64,
      paddingBottom: 0,
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 48,
          paddingBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Amorecos"
                style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '1.4rem',
                color: 'var(--primary)',
              }}>Amorecos</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 20 }}>
              Artesanato feito com amor e carinho. Cada peça é única e especial, criada à mão para encantar.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.url}
                  title={s.label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    transition: 'all var(--transition)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--primary)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              color: 'white',
              fontSize: '1.05rem',
              fontWeight: 600,
              marginBottom: 16,
            }}>Categorias</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {categories.map(c => (
                <Link
                  key={c.slug}
                  to={`/categoria/${c.slug}`}
                  style={{
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all var(--transition)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  <span>{c.emoji}</span> {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              color: 'white',
              fontSize: '1.05rem',
              fontWeight: 600,
              marginBottom: 16,
            }}>Informações</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.875rem' }}>
              <Link to="/encomenda" style={{ transition: 'color 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
              >Como Encomendar</Link>
              <span>Frete para todo o Brasil</span>
              <span>Peças sob encomenda</span>
              <span>Pagamento seguro</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              color: 'white',
              fontSize: '1.05rem',
              fontWeight: 600,
              marginBottom: 16,
            }}>Contato</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.875rem' }}>
              <span>📧 contato@amorecos.com</span>
              <span>💬 (00) 00000-0000</span>
              <span>📷 @amorecos.art</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '24px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          fontSize: '0.8rem',
        }}>
          <span>© 2025 Amorecos. Feito com ❤️</span>
          <span>Artesanato com amor</span>
        </div>
      </div>
    </footer>
  );
}
