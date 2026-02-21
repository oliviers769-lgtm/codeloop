import React, { useState, useRef, useEffect } from 'react';

export default function HtmlPreview({ initialHtml = '', initialCss = '', onSuccess, expectedCheck }) {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [activeTab, setActiveTab] = useState('html');
  const [preview, setPreview] = useState(false);
  const [successShown, setSuccessShown] = useState(false);
  const iframeRef = useRef(null);

  const buildDoc = () => `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<style>
  body { font-family: sans-serif; padding: 16px; margin: 0; }
  ${css}
</style>
</head>
<body>${html}</body>
</html>`;

  const handlePreview = () => {
    setPreview(true);
    // Check success condition
    if (expectedCheck && !successShown) {
      const combined = html + css;
      if (expectedCheck(combined)) {
        setSuccessShown(true);
        if (onSuccess) onSuccess();
      }
    }
  };

  useEffect(() => {
    if (preview && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      doc.open();
      doc.write(buildDoc());
      doc.close();
    }
  // eslint-disable-next-line
  }, [preview, html, css]);

  const s = {
    wrap: { marginTop: 16 },
    tabs: {
      display: 'flex',
      gap: 4,
      marginBottom: 0,
    },
    tab: (active) => ({
      padding: '8px 18px',
      borderRadius: '10px 10px 0 0',
      background: active ? '#0F1117' : '#E5E7EB',
      color: active ? '#E2E8F0' : '#6B7280',
      fontSize: 12,
      fontWeight: 700,
      cursor: 'pointer',
      border: 'none',
      letterSpacing: 0.5,
    }),
    editorWrap: {
      background: '#0F1117',
      borderRadius: '0 12px 12px 12px',
      overflow: 'hidden',
      border: '1px solid #1E2030',
    },
    textarea: {
      width: '100%',
      background: '#0F1117',
      color: '#E2E8F0',
      fontFamily: "'Courier New', 'Consolas', monospace",
      fontSize: 13,
      lineHeight: 1.7,
      padding: '14px 16px',
      border: 'none',
      outline: 'none',
      resize: 'vertical',
      minHeight: 110,
    },
    btnRow: {
      display: 'flex',
      gap: 8,
      marginTop: 8,
    },
    previewBtn: {
      flex: 1,
      padding: '12px',
      borderRadius: 12,
      background: 'linear-gradient(135deg, #EC4899, #F97316)',
      color: '#fff',
      fontSize: 14,
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
    },
    resetBtn: {
      padding: '12px 16px',
      borderRadius: 12,
      background: '#F3F4F6',
      color: '#6B7280',
      fontSize: 13,
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
    },
    previewWrap: {
      marginTop: 10,
      border: '2px solid #E5E7EB',
      borderRadius: 12,
      overflow: 'hidden',
      animation: 'fadeUp 0.3s ease both',
    },
    previewBar: {
      background: '#F9FAFB',
      padding: '7px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      borderBottom: '1px solid #E5E7EB',
    },
    previewDot: (c) => ({ width: 9, height: 9, borderRadius: '50%', background: c }),
    previewLabel: { fontSize: 11, color: '#9CA3AF', marginLeft: 4, fontFamily: 'monospace' },
    iframe: {
      width: '100%',
      height: 180,
      border: 'none',
      background: '#fff',
      display: 'block',
    },
    successBanner: {
      marginTop: 10,
      background: '#F0FDF4',
      border: '1px solid #10B981',
      borderRadius: 12,
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      animation: 'fadeUp 0.3s ease both',
    },
    successText: { color: '#065F46', fontWeight: 600, fontSize: 14 },
  };

  return (
    <div style={s.wrap}>
      <div style={s.tabs}>
        <button style={s.tab(activeTab === 'html')} onClick={() => setActiveTab('html')}>HTML</button>
        <button style={s.tab(activeTab === 'css')} onClick={() => setActiveTab('css')}>CSS</button>
      </div>
      <div style={s.editorWrap}>
        <textarea
          style={s.textarea}
          value={activeTab === 'html' ? html : css}
          onChange={e => activeTab === 'html' ? setHtml(e.target.value) : setCss(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={activeTab === 'html' ? '<h1>Ton titre ici</h1>' : 'h1 { color: red; }'}
        />
      </div>

      <div style={s.btnRow}>
        <button style={s.previewBtn} onClick={handlePreview}>
          👁 Prévisualiser
        </button>
        <button style={s.resetBtn} onClick={() => {
          setHtml(initialHtml); setCss(initialCss);
          setPreview(false); setSuccessShown(false);
        }}>↺ Reset</button>
      </div>

      {preview && (
        <div style={s.previewWrap}>
          <div style={s.previewBar}>
            <div style={s.previewDot('#FF5F57')} />
            <div style={s.previewDot('#FFBD2E')} />
            <div style={s.previewDot('#28C840')} />
            <span style={s.previewLabel}>aperçu</span>
          </div>
          <iframe ref={iframeRef} style={s.iframe} title="preview" sandbox="allow-scripts" />
        </div>
      )}

      {successShown && (
        <div style={s.successBanner}>
          <span style={{ fontSize: 20 }}>✓</span>
          <span style={s.successText}>Bien joué ! Ta page s'affiche correctement.</span>
        </div>
      )}
    </div>
  );
}
