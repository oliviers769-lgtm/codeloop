import React, { useState, useRef, useEffect } from 'react';

export default function NavMenu({ onNavigate, onShowAuth, isAuthenticated, onSignOut, supabaseEnabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Ferme le menu si on clique ailleurs
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const s = {
    wrap: { position: 'relative' },
    btn: {
      width: 44, height: 44, borderRadius: 12,
      background: 'rgba(255,255,255,0.25)',
      border: '2px solid rgba(255,255,255,0.5)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 5, cursor: 'pointer', padding: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    },
    line: {
      width: 20, height: 2.5, borderRadius: 2,
      background: '#ffffff', display: 'block',
      boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
    },
    dropdown: {
      position: 'absolute', top: 48, right: 0,
      background: '#fff', borderRadius: 16,
      boxShadow: '0 8px 40px rgba(26,26,78,0.18)',
      minWidth: 220, zIndex: 200,
      overflow: 'hidden',
      animation: 'fadeUp 0.2s ease both',
    },
    section: {
      padding: '8px 0',
      borderBottom: '1px solid #F3F4F6',
    },
    item: {
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '11px 18px', cursor: 'pointer',
      fontSize: 14, fontWeight: 500, color: '#1F2937',
      background: 'none', border: 'none', width: '100%',
      textAlign: 'left', transition: 'background 0.15s ease',
    },
    itemIcon: { fontSize: 18, width: 24, textAlign: 'center' },
    label: {
      padding: '8px 18px 4px',
      fontSize: 11, fontWeight: 700, color: '#9CA3AF',
      letterSpacing: 1.5, textTransform: 'uppercase',
    },
    authItem: {
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '11px 18px', cursor: 'pointer',
      fontSize: 14, fontWeight: 600,
      color: isAuthenticated ? '#10B981' : '#F97316',
      background: 'none', border: 'none', width: '100%',
      textAlign: 'left',
    },
  };

  const go = (target, data) => {
    setOpen(false);
    onNavigate(target, data);
  };

  return (
    <div style={s.wrap} ref={ref}>
      <button style={s.btn} onClick={() => setOpen(!open)}>
        <span style={s.line} />
        <span style={s.line} />
        <span style={s.line} />
      </button>

      {open && (
        <div style={s.dropdown}>
          <div style={s.section}>
            <div style={s.label}>Navigation</div>
            <button style={s.item}
              onClick={() => go('home')}
              onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              <span style={s.itemIcon}>🏠</span> Accueil
            </button>
            <button style={s.item}
              onClick={() => go('about')}
              onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              <span style={s.itemIcon}>💡</span> Pourquoi ExpanceLoop
            </button>
          </div>

          <div style={s.section}>
            <div style={s.label}>Modules</div>
            {[
              { id: 'logique', icon: '🧠', label: 'Logique' },
              { id: 'python', icon: '🐍', label: 'Python' },
              { id: 'html-css', icon: '🎨', label: 'HTML & CSS' },
              { id: 'javascript', icon: '⚡', label: 'JavaScript' },
              { id: 'sql', icon: '🗄️', label: 'SQL' },
            ].map(m => (
              <button key={m.id} style={s.item}
                onClick={() => go('module', m.id)}
                onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                <span style={s.itemIcon}>{m.icon}</span> {m.label}
              </button>
            ))}
          </div>

          {/* BONUS */}
          <div style={{ ...s.section, borderTop: '1px solid #F3F4F6', paddingTop: 8 }}>
            <div style={{ ...s.label, color: '#10B981' }}>Bonus</div>
            <button style={{ ...s.item, color: '#065F46' }}
              onClick={() => go('tableur')}
              onMouseEnter={e => e.currentTarget.style.background = '#F0FDF4'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              <span style={s.itemIcon}>🦊</span> Le Tableur Apprivoisé
            </button>
          </div>

          {supabaseEnabled && (
            <div style={{ padding: '4px 0' }}>
              <button style={s.authItem}
                onClick={() => { setOpen(false); isAuthenticated ? onSignOut() : onShowAuth(); }}>
                <span style={s.itemIcon}>{isAuthenticated ? '✓' : '☁'}</span>
                {isAuthenticated ? 'Déconnexion' : 'Sauvegarder ma progression'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
