'use client';

import { cn } from '@plexus-ms/std';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavSection } from './compendium';

type LinkClickHandler = React.MouseEventHandler<HTMLAnchorElement>;

function NavItemLink({
  href,
  onLinkClick,
  children,
}: {
  href: string;
  onLinkClick?: LinkClickHandler;
  children: React.ReactNode;
}) {
  const active = usePathname() === href;
  return (
    <Link
      href={href}
      onClick={onLinkClick}
      className={cn(
        'block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
        active
          ? 'font-semibold text-accent-text before:bg-accent dark:text-dark-accent dark:before:bg-dark-accent'
          : 'text-ink-soft before:hidden before:bg-line hover:text-ink hover:before:block dark:text-dark-soft dark:before:bg-dark-line dark:hover:text-dark-paper',
      )}
    >
      {children}
    </Link>
  );
}

function SectionHeading({ section, onLinkClick }: { section: NavSection; onLinkClick?: LinkClickHandler }) {
  const active = usePathname() === section.href;
  const className = cn(
    'font-display font-bold',
    active ? 'text-accent-text dark:text-dark-accent' : 'text-ink dark:text-dark-paper',
  );
  if (!section.href) return <h2 className={className}>{section.label}</h2>;
  return (
    <h2 className={className}>
      <Link href={section.href} onClick={onLinkClick}>
        {section.label}
      </Link>
    </h2>
  );
}

export function Sidebar({ sections, onLinkClick }: { sections: NavSection[]; onLinkClick?: LinkClickHandler }) {
  return (
    <nav aria-label="Compendium" className="text-base lg:text-sm">
      <ul className="space-y-9">
        {sections.map((section) => (
          <li key={section.label}>
            <SectionHeading section={section} onLinkClick={onLinkClick} />
            <ul className="mt-2 space-y-2 border-l-2 border-line/60 lg:mt-4 lg:space-y-4 lg:border-line dark:border-dark-line">
              {section.items.map(({ href, title }) => (
                <li key={href} className="relative">
                  <NavItemLink href={href} onLinkClick={onLinkClick}>
                    {title}
                  </NavItemLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
