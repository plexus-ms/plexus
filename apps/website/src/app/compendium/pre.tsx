import type { ComponentProps } from 'react';
import { Mermaid } from './mermaid';

// Mermaid fences arrive as a bare marker pre (see render.ts); everything else is shiki output, passed through.
export function Pre({
  'data-mermaid-chart': chart,
  ...props
}: ComponentProps<'pre'> & { 'data-mermaid-chart'?: string }) {
  if (chart) return <Mermaid chart={chart} />;
  return <pre {...props} />;
}
