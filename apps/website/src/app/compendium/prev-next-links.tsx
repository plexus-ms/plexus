import { cn } from '@plexus-ms/std';
import Link from 'next/link';
import type { NavItem, NavSection } from './compendium';

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z" />
    </svg>
  );
}

function PageLink({ title, href, dir }: { title: string; href: string; dir: 'previous' | 'next' }) {
  return (
    <div className={cn(dir === 'next' && 'ml-auto text-right')}>
      <dt className="font-display text-sm font-bold text-ink dark:text-dark-paper">
        {dir === 'next' ? 'Next' : 'Previous'}
      </dt>
      <dd className="mt-1">
        <Link
          href={href}
          className={cn(
            'flex items-center gap-x-1 text-base font-semibold text-ink-soft hover:text-accent-text dark:text-dark-soft dark:hover:text-dark-accent',
            dir === 'previous' && 'flex-row-reverse',
          )}
        >
          {title}
          <ArrowIcon className={cn('h-4 w-4 flex-none fill-current', dir === 'previous' && '-scale-x-100')} />
        </Link>
      </dd>
    </div>
  );
}

// Flat reading order: matches the sidebar top to bottom, section index pages included.
export function flattenNavigation(sections: NavSection[]): NavItem[] {
  return sections.flatMap((section) => [
    ...(section.href ? [{ href: section.href, title: section.label }] : []),
    ...section.items,
  ]);
}

export function PrevNextLinks({ sections, href }: { sections: NavSection[]; href: string }) {
  const links = flattenNavigation(sections);
  const index = links.findIndex((link) => link.href === href);
  const previous = index > 0 ? links[index - 1] : undefined;
  const next = index > -1 ? links[index + 1] : undefined;
  if (!previous && !next) return null;

  return (
    <dl className="mt-12 flex border-t border-line pt-6 dark:border-dark-line">
      {previous && <PageLink dir="previous" {...previous} />}
      {next && <PageLink dir="next" {...next} />}
    </dl>
  );
}
