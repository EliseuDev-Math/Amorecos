import { Link } from 'react-router-dom';
import { categories, products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featured = products.filter((_, i) => [0, 2, 5, 8, 15, 17].includes(i));

  return (
    <div className="page-enter">
      {/* ===== HERO ===== */}
      <section style={{
        background: 'linear-gradient(160deg, #FFFFFF 0%, var(--primary-lighter) 40%, #FFD4D8 100%)',
        padding: '80px 0 64px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255,66,85,0.06)',
          top: -60,
          right: -60,
        }} />
        <div style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,66,85,0.04)',
          bottom: -40,
          left: -40,
        }} />

        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 48,
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Text */}
          <div style={{ flex: 1 }}>
            <span className="section-label animate-fade-in-up">✨ Artesanato com amor</span>
            <h1 className="heading-xl animate-fade-in-up delay-1" style={{
              marginBottom: 20,
            }}>
              Peças únicas feitas{' '}
              <span style={{ color: 'var(--primary)' }}>à mão</span>{' '}
              com todo carinho
            </h1>
            <p className="animate-fade-in-up delay-2" style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: 480,
              marginBottom: 32,
            }}>
              Amigurumis, biscuit, adesivos, miçangas e muito mais.
              Cada peça é criada com dedicação para tornar seu dia mais especial. 🌸
            </p>
            <div className="animate-fade-in-up delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/categoria/amigurumi" className="btn btn-primary btn-lg">
                Ver Produtos
              </Link>
              <Link to="/encomenda" className="btn btn-secondary btn-lg">
                Fazer Encomenda
              </Link>
            </div>
          </div>

          {/* Logo image */}
          <div className="animate-fade-in-up delay-2 hero-image-wrap" style={{
            flexShrink: 0,
          }}>
            <div style={{
              width: 320,
              height: 320,
              borderRadius: '50%',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(255,66,85,0.15)',
              overflow: 'hidden',
              animation: 'float 5s ease-in-out infinite',
            }}>
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Amorecos"
                style={{
                  width: '88%',
                  height: '88%',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-image-wrap { display: none !important; }
          }
        `}</style>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
          }}>
            {[
              { icon: '🧶', title: 'Feito à Mão', desc: 'Cada peça é única e artesanal' },
              { icon: '💝', title: 'Com Muito Amor', desc: 'Dedicação em cada detalhe' },
              { icon: '📦', title: 'Entrega Segura', desc: 'Enviamos para todo o Brasil' },
              { icon: '🎨', title: 'Personalizado', desc: 'Cores e modelos sob encomenda' },
            ].map((f, i) => (
              <div key={i} className="animate-fade-in-up" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '20px 24px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-warm)',
                border: '1px solid var(--border-light)',
                animationDelay: `${i * 0.1}s`,
              }}>
                <span style={{ fontSize: '2rem', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '0.938rem', marginBottom: 2 }}>{f.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section" style={{ background: 'var(--bg-warm)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label">Explore</span>
            <h2 className="heading-lg">Nossas Categorias</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: 16,
          }}>
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                to={`/categoria/${cat.slug}`}
                className="animate-fade-in-up"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  padding: '28px 16px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'white',
                  border: '1px solid var(--border)',
                  textAlign: 'center',
                  transition: 'all var(--transition)',
                  animationDelay: `${i * 0.08}s`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '2.5rem' }}>{cat.emoji}</span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                }}>{cat.name}</h3>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.4,
                }}>{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 40,
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <div>
              <span className="section-label">Destaques</span>
              <h2 className="heading-lg">Produtos em Destaque</h2>
            </div>
            <Link to="/categoria/amigurumi" className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>
              Ver todos →
            </Link>
          </div>

          <div className="grid-products">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" style={{ background: 'var(--bg-warm)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label">Feedback</span>
            <h2 className="heading-lg">O que dizem nossos clientes</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {[
              { name: 'Maria Clara', text: 'A vaquinha de amigurumi ficou PERFEITA! Minha filha amou. O acabamento é impecável.', stars: 5 },
              { name: 'Ana Paula', text: 'Os brincos de biscuit são lindos demais! Super leves e o acabamento é maravilhoso.', stars: 5 },
              { name: 'Juliana Santos', text: 'O kit de adesivos é muito fofo, já decorei todo meu notebook. Amei cada detalhe!', stars: 5 },
            ].map((t, i) => (
              <div
                key={i}
                className="animate-fade-in-up"
                style={{
                  padding: '28px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'white',
                  border: '1px solid var(--border)',
                  animationDelay: `${i * 0.12}s`,
                }}
              >
                <div style={{ marginBottom: 12 }}>
                  {'⭐'.repeat(t.stars)}
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: 16,
                  fontStyle: 'italic',
                }}>"{t.text}"</p>
                <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
        padding: '72px 0',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: 16,
          }}>
            Quer uma peça especial? 💌
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '1.05rem',
            marginBottom: 32,
            maxWidth: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Faça sua encomenda personalizada e receba uma peça única feita com todo carinho!
          </p>
          <Link to="/encomenda" className="btn btn-lg" style={{
            background: 'white',
            color: 'var(--accent)',
            fontWeight: 700,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}>
            Fazer Minha Encomenda
          </Link>
        </div>
      </section>
    </div>
  );
}
