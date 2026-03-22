import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleOrder = () => {
    closeCart();
    navigate('/encomenda');
  };

  return (
    <>
      {/* Overlay */}
      <div className="overlay" onClick={closeCart} />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 420,
          background: 'white',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s ease-out',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.4rem' }}>🛒</span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              fontWeight: 600,
            }}>Meu Carrinho</h2>
          </div>
          <button
            onClick={closeCart}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: 'var(--text-muted)',
              transition: 'all var(--transition)',
              background: 'var(--bg-warm)',
            }}
          >✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-muted)',
            }}>
              <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: 16 }}>🛒</span>
              <p style={{ fontSize: '1.05rem', fontWeight: 500 }}>Seu carrinho está vazio</p>
              <p style={{ fontSize: '0.875rem', marginTop: 6 }}>Adicione produtos para começar!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.color}`}
                  style={{
                    display: 'flex',
                    gap: 14,
                    padding: 14,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-warm)',
                  }}
                >
                  {/* Emoji */}
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 'var(--radius-sm)',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    flexShrink: 0,
                  }}>{item.emoji}</div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      marginBottom: 3,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>{item.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          background: item.colorHex,
                          border: '1.5px solid #ddd',
                          display: 'inline-block',
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.color}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Qty controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button
                          className="qty-btn"
                          style={{ width: 28, height: 28, fontSize: '0.85rem' }}
                          onClick={() => updateQuantity(item.productId, item.color, item.quantity - 1)}
                        >−</button>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                        <button
                          className="qty-btn"
                          style={{ width: 28, height: 28, fontSize: '0.85rem' }}
                          onClick={() => updateQuantity(item.productId, item.color, item.quantity + 1)}
                        >+</button>
                      </div>

                      <span style={{
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: 'var(--accent)',
                      }}>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.productId, item.color)}
                    style={{
                      alignSelf: 'flex-start',
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      flexShrink: 0,
                    }}
                    title="Remover"
                  >✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-warm)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}>
              <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Total</span>
              <span style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                color: 'var(--accent)',
              }}>R$ {totalPrice.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleOrder}>
              Fazer Encomenda
            </button>
          </div>
        )}
      </div>
    </>
  );
}
