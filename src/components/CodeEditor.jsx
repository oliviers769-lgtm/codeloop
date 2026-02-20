import React, { useState } from 'react';
import { usePyodide } from '../hooks/usePyodide';

export default function CodeEditor({ initialCode = '', expectedOutput = null, onSuccess }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [successShown, setSuccessShown] = useState(false);
  const { status, runCode } = usePyodide();

  const handleRun = async () => {
    if (isRunning || status !== 'ready') return;
    setIsRunning(true);
    setOutput(null);
    setHasError(false);

    const result = await runCode(code);
    setIsRunning(false);

    if (result.error) {
      setOutput(result.error);
      setHasError(true);
      return;
    }

    setOutput(result.output || '(aucune sortie)');
    setHasError(false);

    // Check expected output if provided
    if (expectedOutput !== null) {
      const clean = (s) => s.trim().replace(/\s+/g, ' ');
      if (clean(result.output) === clean(expectedOutput)) {
        setSuccessShown(true);
        if (onSuccess) onSuccess();
      }
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(null);
    setHasError(false);
    setSuccessShown(false);
  };

  const s = {
    wrap: { marginTop: 16 },
    statusBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    statusDot: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: status === 'ready' ? '#10B981' : status === 'loading' ? '#F59E0B' : '#9CA3AF',
      fontWeight: 600,
    },
    dot: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: status === 'ready' ? '#10B981' : status === 'loading' ? '#F59E0B' : '#9CA3AF',
      animation: status === 'loading' ? 'pulse 1.2s ease-in-out infinite' : 'none',
    },
    editorWrap: {
      background: '#0F1117',
      borderRadius: 14,
      overflow: 'hidden',
      border: '1px solid #1E2030',
    },
    editorHeader: {
      background: '#161822',
      padding: '8px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    },
    editorDot: (color) => ({
      width: 10, height: 10, borderRadius: '50%', background: color,
    }),
    editorLabel: {
      fontSize: 11,
      color: '#4B5563',
      marginLeft: 6,
      fontFamily: 'monospace',
      letterSpacing: 0.5,
    },
    textarea: {
      width: '100%',
      background: '#0F1117',
      color: '#E2E8F0',
      fontFamily: "'Courier New', 'Consolas', monospace",
      fontSize: 14,
      lineHeight: 1.7,
      padding: '14px 16px',
      border: 'none',
      outline: 'none',
      resize: 'vertical',
      minHeight: 120,
      tabSize: 4,
    },
    btnRow: {
      display: 'flex',
      gap: 8,
      marginTop: 8,
    },
    runBtn: {
      flex: 1,
      padding: '12px',
      borderRadius: 12,
      background: status !== 'ready' || isRunning
        ? '#374151'
        : 'linear-gradient(135deg, #F97316, #FB923C)',
      color: '#fff',
      fontSize: 14,
      fontWeight: 700,
      border: 'none',
      cursor: status !== 'ready' || isRunning ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
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
    outputWrap: (error) => ({
      marginTop: 10,
      background: error ? '#1A0A0A' : '#0A1A0F',
      border: `1px solid ${error ? '#7F1D1D' : '#065F46'}`,
      borderRadius: 12,
      padding: '12px 16px',
      animation: 'fadeUp 0.3s ease both',
    }),
    outputLabel: (error) => ({
      fontSize: 11,
      fontWeight: 700,
      color: error ? '#EF4444' : '#10B981',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 6,
    }),
    outputText: (error) => ({
      fontFamily: "'Courier New', monospace",
      fontSize: 13,
      color: error ? '#FCA5A5' : '#A7F3D0',
      lineHeight: 1.6,
      whiteSpace: 'pre-wrap',
    }),
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
    successText: {
      color: '#065F46',
      fontWeight: 600,
      fontSize: 14,
    }
  };

  const statusLabels = {
    idle: 'Python...',
    loading: 'Chargement Python...',
    ready: 'Python prêt',
    error: 'Python indisponible',
  };

  return (
    <div style={s.wrap}>
      <div style={s.statusBar}>
        <div style={s.statusDot}>
          <div style={s.dot} />
          {statusLabels[status]}
        </div>
        {status === 'loading' && (
          <span style={{ fontSize: 11, color: '#9CA3AF' }}>
            Chargement unique ~3s
          </span>
        )}
      </div>

      <div style={s.editorWrap}>
        <div style={s.editorHeader}>
          <div style={s.editorDot('#FF5F57')} />
          <div style={s.editorDot('#FFBD2E')} />
          <div style={s.editorDot('#28C840')} />
          <span style={s.editorLabel}>main.py</span>
        </div>
        <textarea
          style={s.textarea}
          value={code}
          onChange={e => setCode(e.target.value)}
          onKeyDown={e => {
            // Tab inserts spaces
            if (e.key === 'Tab') {
              e.preventDefault();
              const start = e.target.selectionStart;
              const end = e.target.selectionEnd;
              const newCode = code.substring(0, start) + '    ' + code.substring(end);
              setCode(newCode);
              setTimeout(() => e.target.setSelectionRange(start + 4, start + 4), 0);
            }
          }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>

      <div style={s.btnRow}>
        <button style={s.runBtn} onClick={handleRun} disabled={status !== 'ready' || isRunning}>
          {isRunning ? '⏳ Exécution...' : status === 'loading' ? '⏳ Chargement...' : '▶ Exécuter'}
        </button>
        <button style={s.resetBtn} onClick={handleReset}>↺ Reset</button>
      </div>

      {output !== null && (
        <div style={s.outputWrap(hasError)}>
          <div style={s.outputLabel(hasError)}>
            {hasError ? '⚠ Erreur' : '◎ Sortie'}
          </div>
          <div style={s.outputText(hasError)}>{output}</div>
        </div>
      )}

      {successShown && (
        <div style={s.successBanner}>
          <span style={{ fontSize: 20 }}>✓</span>
          <span style={s.successText}>Résultat correct ! Tu peux passer à la suite.</span>
        </div>
      )}
    </div>
  );
}
