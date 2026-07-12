import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

// In-content anchors: internal hrefs (site routes produced by the markdownLinks remark plugin,
// plus same-page #anchors) get client-side routing via next/link; external URLs stay plain <a>.
export function DocLink({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) {
  const internal = href.startsWith('/') || href.startsWith('#');
  return internal ? <Link href={href} {...props} /> : <a href={href} {...props} />;
}
