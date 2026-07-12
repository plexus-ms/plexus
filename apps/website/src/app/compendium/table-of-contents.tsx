'use client';

import { cn } from '@plexus-ms/std';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { DocHeading } from './render';

interface TocSection extends DocHeading {
  children: DocHeading[];
}

function groupHeadings(headings: DocHeading[]): TocSection[] {
  const sections: TocSection[] = [];
  for (const heading of headings) {
    if (heading.depth === 3 && sections.length > 0) {
      sections[sections.length - 1].children.push(heading);
    } else {
      sections.push({ ...heading, children: [] });
    }
  }
  return sections;
}

export function TableOfContents({ headings }: { headings: DocHeading[] }) {
  const [currentId, setCurrentId] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrentId(entry.target.id);
        }
      },
      { rootMargin: '-80px 0% -70% 0%' },
    );
    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [headings]);

  const sections = groupHeadings(headings);
  const isActive = (section: TocSection | DocHeading) =>
    section.id === currentId || ('children' in section && section.children.some((child) => child.id === currentId));

  return (
    <div className="no-scrollbar hidden xl:sticky xl:top-18 xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
      <nav aria-labelledby="on-this-page-title" className="w-56">
        {sections.length > 0 && (
          <>
            <h2 id="on-this-page-title" className="font-display text-sm font-bold text-ink dark:text-dark-paper">
              On this page
            </h2>
            <ol className="mt-4 space-y-3 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <h3>
                    <Link
                      href={`#${section.id}`}
                      className={cn(
                        isActive(section)
                          ? 'text-accent-text dark:text-dark-accent'
                          : 'font-normal text-ink-soft hover:text-ink dark:text-dark-soft dark:hover:text-dark-paper',
                      )}
                    >
                      {section.text}
                    </Link>
                  </h3>
                  {section.children.length > 0 && (
                    <ol className="mt-2 space-y-3 pl-5 text-ink-soft dark:text-dark-soft">
                      {section.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`#${child.id}`}
                            className={cn(
                              child.id === currentId
                                ? 'text-accent-text dark:text-dark-accent'
                                : 'hover:text-ink dark:hover:text-dark-paper',
                            )}
                          >
                            {child.text}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </>
        )}
      </nav>
    </div>
  );
}
