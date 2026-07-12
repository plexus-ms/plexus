import { cn } from '@plexus-ms/std';
import Link from 'next/link';

export type HeroContent = {
  intro: {
    eyebrow: string;
    slogan: string;
    description: string;
  };
  actions: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  testimonial: {
    quote: string;
    author: string;
    org: string;
  };
};

// Decorative SVG grid pattern. It is positioned with `absolute`, so it aligns to
// its nearest positioned ancestor. Render it inside the quote's `relative` column
// wrapper so it stays pixel-aligned to the quote (that alignment is intentional).
function HeroGrid() {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        'absolute -top-160 left-1 -z-10 h-256 w-702 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)] stroke-line dark:stroke-dark-line',
      )}
    >
      <defs>
        <pattern id="e87443c8-56e4-4c20-9111-55b82fa704e3" width={200} height={200} patternUnits="userSpaceOnUse">
          <path d="M0.5 0V200M200 0.5L0 0.499983" />
        </pattern>
      </defs>
      <rect fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)" width="100%" height="100%" strokeWidth={0} />
    </svg>
  );
}

/** The slogan with its last word in the event color — "Standardized, Boring, Yours." */
function AccentedSlogan({ slogan }: { slogan: string }) {
  const words = slogan.trim().split(' ');
  const last = words.pop();
  return (
    <>
      {words.join(' ')} <span className={cn('text-accent-text dark:text-dark-accent')}>{last}</span>
    </>
  );
}

export function HeroBody({ children }: { children: React.ReactNode }) {
  return <div className={cn('max-w-xl text-base/7 text-ink-soft dark:text-dark-soft')}>{children}</div>;
}

export function Hero({ content, children }: { content: HeroContent; children: React.ReactNode }) {
  const { eyebrow, slogan, description } = content.intro;
  const { primary, secondary } = content.actions;
  const { quote, author, org } = content.testimonial;
  return (
    <div className={cn('relative isolate min-h-screen overflow-hidden bg-card py-24 sm:py-32 dark:bg-dark')}>
      <div className={cn('mx-auto max-w-7xl px-6 lg:px-8')}>
        <div className={cn('mx-auto max-w-2xl lg:mx-0')}>
          <p
            className={cn(
              'font-display text-sm font-bold tracking-widest text-accent-text uppercase dark:text-dark-accent',
            )}
          >
            {eyebrow}
          </p>
          <h1
            className={cn(
              'mt-4 font-display text-4xl font-bold tracking-tight text-pretty text-ink sm:text-5xl dark:text-dark-paper',
            )}
          >
            <AccentedSlogan slogan={slogan} />
          </h1>
          <p className={cn('mt-6 text-xl/8 text-ink-soft dark:text-dark-soft')}>{description}</p>
          <div className={cn('mt-8 flex flex-wrap gap-4')}>
            <Link
              href={primary.href}
              className={cn(
                'border-[1.5px] border-ink bg-ink px-4.5 py-2.5 font-display text-sm font-bold text-card hover:bg-ink/85 dark:border-dark-paper dark:bg-dark-paper dark:text-dark dark:hover:bg-dark-paper/85',
              )}
            >
              {primary.label}
            </Link>
            <Link
              href={secondary.href}
              className={cn(
                'border-[1.5px] border-ink px-4.5 py-2.5 font-display text-sm font-bold text-ink hover:bg-paper dark:border-dark-paper dark:text-dark-paper dark:hover:bg-dark-raised',
              )}
            >
              {secondary.label}
            </Link>
          </div>
        </div>
        <div
          className={cn(
            'mx-auto mt-16 pt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12',
          )}
        >
          {/* This `relative` wrapper is the seam between Hero and Quote: it is the
              quote's grid cell and the positioning context the HeroGrid aligns to.
              HeroGrid is hero-owned (sibling of Quote), not nested inside Quote. */}
          <div className={cn('relative lg:order-last lg:col-span-5')}>
            <HeroGrid />
            <figure className={cn('border-l-[3px] border-accent pl-8 dark:border-dark-accent')}>
              <blockquote className={cn('text-xl/8 font-semibold tracking-tight text-ink italic dark:text-dark-paper')}>
                <p>{quote}</p>
              </blockquote>
              <figcaption className={cn('mt-6 font-display text-sm/6')}>
                <div className={cn('font-bold text-ink dark:text-dark-paper')}>{author}</div>
                <div className={cn('text-ink-soft dark:text-dark-soft')}>{org}</div>
              </figcaption>
            </figure>
          </div>
          <div className={cn('lg:col-span-7')}>{children}</div>
        </div>
      </div>
    </div>
  );
}
