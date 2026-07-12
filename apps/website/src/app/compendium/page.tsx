import type { Metadata } from 'next';
import Link from 'next/link';
import { getNavigation, readDoc } from './compendium';
import { Prose } from './prose';
import { QuickLink, QuickLinks } from './quick-links';
import { compileDoc } from './render';

export const metadata: Metadata = {
  title: 'Compendium – Plexus.ms',
  description: 'High level documentation, general approaches and principles used across Plexus.',
};

export default async function CompendiumPage() {
  const [readme, sections] = await Promise.all([readDoc('README.md'), getNavigation()]);
  const { content, frontmatter } = await compileDoc(readme, 'md', 'README.md');

  return (
    <div className="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
      <article>
        <header className="mb-9">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-dark-paper">
            {frontmatter.title}
          </h1>
        </header>
        <Prose>
          {content}
          <h2>Contents</h2>
          {sections.map((section) => (
            <section key={section.label}>
              <h3>
                {section.href ? (
                  <Link
                    href={section.href}
                    className="text-ink shadow-none hover:text-accent-text dark:text-dark-paper dark:hover:text-dark-accent"
                  >
                    {section.label}
                  </Link>
                ) : (
                  section.label
                )}
              </h3>
              {section.description && <p>{section.description}</p>}
              <QuickLinks>
                {section.items.map((item) => (
                  <QuickLink key={item.href} {...item} />
                ))}
              </QuickLinks>
            </section>
          ))}
        </Prose>
      </article>
    </div>
  );
}
