import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { label: 'Início', path: '/' },
    ...categories.map(c => ({ label: c.name, path: `/categoria/${c.slug}` })),
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--header-h)',
      zIndex: 80,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'white',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      <div className="container" style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}>
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="Amorecos"
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <span style={{
            fontFamily: 'var(--font-brand)',
            fontSize: '1.5rem',
            color: 'var(--primary)',
          }}>Amorecos</span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          flex: 1,
          justifyContent: 'center',
          overflow: 'hidden',
        }} className="hidden-mobile">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--primary-lighter)' : 'transparent',
                  transition: 'all var(--transition)',
                  whiteSpace: 'nowrap',
                }}
              >{link.label}</Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* Cart button */}
          <button
            onClick={toggleCart}
            style={{
              position: 'relative',
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              background: 'var(--bg-warm)',
              transition: 'all var(--transition)',
            }}
          >
            🛒
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'var(--accent)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse-soft 0.4s ease',
              }}>{totalItems}</span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile"
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              background: menuOpen ? 'var(--primary-lighter)' : 'var(--bg-warm)',
              transition: 'all var(--transition)',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: 'var(--header-h)',
          left: 0,
          right: 0,
          background: 'white',
          borderBottom: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)',
          padding: '12px 0',
          animation: 'slideDown 0.25s ease-out',
        }}>
          <div className="container">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.938rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--primary)' : 'var(--text-primary)',
                    background: isActive ? 'var(--primary-lighter)' : 'transparent',
                    transition: 'all var(--transition)',
                    marginBottom: 2,
                  }}
                >{link.label}</Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Responsive CSS injected */}
      <style>{`
        .hidden-mobile { display: flex !important; }
        .show-mobile { display: none !important; }
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
