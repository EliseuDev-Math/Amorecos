import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Order() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="page-enter" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - var(--header-h))',
        padding: 20,
      }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <span style={{ fontSize: '4rem', display: 'block', marginBottom: 16 }}>🎉</span>
          <h1 className="heading-lg" style={{ marginBottom: 12 }}>Encomenda Enviada!</h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            lineHeight: 1.7,
            marginBottom: 32,
          }}>
            Obrigada por escolher a Amorecos! ❤️<br />
            Entraremos em contato em breve pelo email informado para confirmar os detalhes.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">Voltar ao Início</Link>
        </div>
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
            <span>Encomenda</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: '2rem' }}>📋</span>
            <div>
              <h1 className="heading-lg" style={{ marginBottom: 2 }}>Fazer Encomenda</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Preencha os dados e enviaremos a confirmação por email
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 0 80px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            alignItems: 'start',
          }} className="order-grid">

            {/* Cart Items */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: 20,
              }}>
                Itens do Carrinho ({items.length})
              </h3>

              {items.length === 0 ? (
                <div style={{
                  padding: '48px 24px',
                  textAlign: 'center',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-warm)',
                  border: '1px solid var(--border)',
                }}>
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 12 }}>🛒</span>
                  <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Seu carrinho está vazio</p>
                  <Link to="/" className="btn btn-primary btn-sm">Explorar Produtos</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.color}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        background: 'white',
                      }}
                    >
                      <div style={{
                        width: 52,
                        height: 52,
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--primary-lighter)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.6rem',
                        flexShrink: 0,
                      }}>{item.emoji}</div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          marginBottom: 4,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>{item.name}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: item.colorHex,
                            border: '1px solid #ddd',
                            display: 'inline-block',
                          }} />
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.color}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button
                          className="qty-btn"
                          style={{ width: 26, height: 26, fontSize: '0.8rem' }}
                          onClick={() => updateQuantity(item.productId, item.color, item.quantity - 1)}
                        >−</button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: 18, textAlign: 'center' }}>{item.quantity}</span>
                        <button
                          className="qty-btn"
                          style={{ width: 26, height: 26, fontSize: '0.8rem' }}
                          onClick={() => updateQuantity(item.productId, item.color, item.quantity + 1)}
                        >+</button>
                      </div>

                      <span style={{
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: 'var(--accent)',
                        minWidth: 70,
                        textAlign: 'right',
                      }}>R$ {(item.price * item.quantity).toFixed(2)}</span>

                      <button
                        onClick={() => removeItem(item.productId, item.color)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-warm)',
                          flexShrink: 0,
                        }}
                      >✕</button>
                    </div>
                  ))}

                  {/* Total */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-warm)',
                    border: '1px solid var(--border)',
                    marginTop: 4,
                  }}>
                    <span style={{ fontWeight: 600 }}>Total</span>
                    <span style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--accent)',
                    }}>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: 20,
              }}>Seus Dados</h3>

              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                padding: '28px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                background: 'white',
              }}>
                <div>
                  <label className="form-label">Nome completo *</label>
                  <input className="form-input" name="name" value={form.name} onChange={handleChange} required placeholder="Seu nome" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label className="form-label">Email *</label>
                    <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="seu@email.com" />
                  </div>
                  <div>
                    <label className="form-label">Telefone *</label>
                    <input className="form-input" name="phone" value={form.phone} onChange={handleChange} required placeholder="(00) 00000-0000" />
                  </div>
                </div>

                <div>
                  <label className="form-label">Endereço completo *</label>
                  <input className="form-input" name="address" value={form.address} onChange={handleChange} required placeholder="Rua, número, complemento" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label className="form-label">Cidade *</label>
                    <input className="form-input" name="city" value={form.city} onChange={handleChange} required placeholder="Sua cidade" />
                  </div>
                  <div>
                    <label className="form-label">Estado *</label>
                    <select className="form-input" name="state" value={form.state} onChange={handleChange} required>
                      <option value="">Selecione</option>
                      {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">Observações</label>
                  <textarea
                    className="form-input"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Alguma personalização ou observação especial?"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: 8 }}
                  disabled={items.length === 0}
                >
                  {items.length === 0 ? 'Adicione itens ao carrinho' : `Enviar Encomenda — R$ ${totalPrice.toFixed(2)}`}
                </button>

                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}>
                  Ao enviar, entraremos em contato para confirmar a encomenda e combinar o pagamento.
                </p>
              </form>
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              .order-grid {
                grid-template-columns: 1fr !important;
                gap: 32px !important;
              }
            }
          `}</style>
        </div>
      </section>
    </div>
  );
}
