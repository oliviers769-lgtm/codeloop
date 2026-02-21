import { useState, useEffect, useRef, useCallback } from 'react';

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";

export function usePyodide() {
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const pyodideRef = useRef(null);

  useEffect(() => {
    // Load Pyodide script once
    if (document.getElementById('pyodide-script')) return;
    setStatus('loading');
    const script = document.createElement('script');
    script.id = 'pyodide-script';
    script.src = PYODIDE_URL;
    script.onload = async () => {
      try {
        // eslint-disable-next-line no-undef
        pyodideRef.current = await loadPyodide({
          stdout: () => {},
          stderr: () => {},
        });
        setStatus('ready');
      } catch (e) {
        setStatus('error');
      }
    };
    script.onerror = () => setStatus('error');
    document.head.appendChild(script);
  }, []);

  const runCode = useCallback(async (code) => {
    if (status !== 'ready' || !pyodideRef.current) {
      return { output: '', error: 'Python pas encore chargé. Patiente une seconde.' };
    }
    const lines = [];
    try {
      pyodideRef.current.setStdout({ batched: (s) => lines.push(s) });
      pyodideRef.current.setStderr({ batched: (s) => lines.push('⚠ ' + s) });
      await pyodideRef.current.runPythonAsync(code);
      return { output: lines.join('\n'), error: null };
    } catch (e) {
      // Format error nicely for beginners
      const raw = e.message || String(e);
      const friendly = formatError(raw);
      return { output: '', error: friendly };
    }
  }, [status]);

  return { status, runCode };
}

function formatError(raw) {
  if (raw.includes('SyntaxError')) {
    const match = raw.match(/SyntaxError: (.+)/);
    return `Erreur de syntaxe : ${match ? match[1] : raw}\n\nVérifie la ponctuation et les deux-points (:).`;
  }
  if (raw.includes('NameError')) {
    const match = raw.match(/NameError: name '(.+)' is not defined/);
    return match
      ? `Variable inconnue : "${match[1]}" n'a pas été définie.\n\nVérifie l'orthographe ou définis cette variable avant de l'utiliser.`
      : `Variable inconnue. Vérifie que tu as bien défini toutes tes variables.`;
  }
  if (raw.includes('IndentationError')) {
    return `Erreur d'indentation : le code n'est pas aligné correctement.\n\nVérifie les espaces en début de ligne après un if, for, ou def.`;
  }
  if (raw.includes('TypeError')) {
    return `Erreur de type : tu essaies d'utiliser une valeur d'un mauvais type.\n\nPar exemple, additionner un nombre et du texte sans conversion.`;
  }
  if (raw.includes('ZeroDivisionError')) {
    return `Division par zéro : impossible de diviser par 0.`;
  }
  // Generic fallback
  const last = raw.split('\n').filter(Boolean).pop();
  return last || raw;
}
