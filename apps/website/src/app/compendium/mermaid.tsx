'use client';

import { useTheme } from 'next-themes';
import { useEffect, useId, useState } from 'react';

// Diagrams render in the browser: the runtime image has no headless browser for server-side rendering,
// and the dynamic import keeps mermaid's bundle off every page that has no diagram.
export function Mermaid({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme();
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
        });
        const rendered = await mermaid.render(id, chart);
        if (!cancelled) setSvg(rendered.svg);
      } catch {
        // A failed render leaves its scratch element behind — and the raw chart stays readable below.
        document.getElementById(id)?.remove();
        if (!cancelled) setSvg('');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  if (!svg) return <pre>{chart}</pre>;
  return (
    <div
      className="not-prose my-8 flex justify-center [&_svg]:h-auto [&_svg]:max-w-full"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: SVG produced by mermaid under securityLevel 'strict'
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
