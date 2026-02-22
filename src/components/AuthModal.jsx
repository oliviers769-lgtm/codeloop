import React from 'react';
import InfinityLogo from './InfinityLogo';

export default function AuthModal({ email, setEmail, onSend, onClose, view }) {
  const s = {
    overlay: {
      position: 'fixed', inset: 0,
      background: 'rgba(26,26,78,0.55)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
      animation: 'fadeIn 0.2s ease both',
    },
    card: {
      background: '#fff', borderRadius: 24,
      padding: '2.5rem 2rem', maxWidth: 400, width: '100%',
      boxShadow: '0 20px 60px rgba(26,26,78,0.2)',
      animation: 'fadeUp 0.3s ease both',
      position: 'relative',
    },
    closeBtn: {
      position: 'absolute', top: 16, right: 16,
      background: '#F3F4F6', border: 'none', borderRadius: '50%',
      width: 32, height: 32, cursor: 'pointer',
      color: '#6B7280', fontSize: 16,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    title: {
      fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700,
      color: '#1A1A4E', marginBottom: 8, marginTop: 16,
    },
    sub: { color: '#6B7280', fontSize: 14, lineHeight: 1.6, marginBottom: 24 },
    input: {
      width: '100%', padding: '13px 16px',
      borderRadius: 12, border: '2px solid #E5E7EB',
      fontSize: 15, color: '#1F2937', outline: 'none',
      marginBottom: 12, fontFamily: 'DM Sans, sans-serif',
      transition: 'border-color 0.2s ease',
    },
    btn: {
      width: '100%', padding: '14px',
      borderRadius: 12,
      background: 'linear-gradient(135deg, #F97316, #FB923C)',
      color: '#fff', fontSize: 15, fontWeight: 700,
      border: 'none', cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(249,115,22,0.3)',
    },
    sentBox: {
      textAlign: 'center', padding: '1rem 0',
    },
    sentIcon: { fontSize: 48, marginBottom: 16 },
    sentTitle: {
      fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 700,
      color: '#1A1A4E', marginBottom: 8,
    },
    sentSub: { color: '#6B7280', fontSize: 14, lineHeight: 1.6 },
    note: {
      fontSize: 12, color: '#9CA3AF', textAlign: 'center',
      marginTop: 12, lineHeight: 1.5,
    }
  };

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.card}>
        <button style={s.closeBtn} onClick={onClose}>✕</button>

        {view === 'sent' ? (
          <div style={s.sentBox}>
            <div style={s.sentIcon}>📬</div>
            <div style={s.sentTitle}>Vérifie ta boîte mail</div>
            <p style={s.sentSub}>
              On t'a envoyé un lien de connexion à <strong>{email}</strong>.<br/>
              Clique dessus pour synchroniser ta progression sur tous tes appareils.
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <InfinityLogo size={44} />
            </div>
            <div style={s.title}>Sauvegarde ta progression</div>
            <p style={s.sub}>
              Entre ton email et on t'envoie un lien magique.<br/>
              Pas de mot de passe. Pas de compte à créer.
            </p>
            <input
              style={s.input}
              type="email"
              placeholder="ton@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={e => e.target.style.borderColor = '#F97316'}
              onBlur={e => e.target.style.borderColor = '#E5E7EB'}
              onKeyDown={e => e.key === 'Enter' && onSend(email)}
              autoComplete="email"
            />
            <button style={s.btn} onClick={() => onSend(email)}
              disabled={!email.includes('@')}>
              Envoyer le lien →
            </button>
            <p style={s.note}>
              Uniquement pour sauvegarder ta progression.<br/>
              Pas de newsletter, pas de spam.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
