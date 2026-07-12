import { cn } from '@plexus-ms/std';

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'prose max-w-none dark:text-dark-soft dark:prose-invert',
        // headings (scroll offset clears the sticky header, plus the mobile docs bar below lg)
        'prose-headings:scroll-mt-30 prose-headings:font-display prose-headings:font-bold prose-headings:text-ink lg:prose-headings:scroll-mt-24 dark:prose-headings:text-dark-paper',
        // body
        'text-ink-soft prose-strong:text-ink dark:prose-strong:text-dark-paper',
        // lead
        'prose-lead:text-ink-soft dark:prose-lead:text-dark-soft',
        // links
        'prose-a:font-semibold prose-a:text-accent-text dark:prose-a:text-dark-accent',
        // link underline
        'dark:[--tw-prose-background:var(--color-dark)] prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,var(--color-accent))] prose-a:hover:[--tw-prose-underline-size:6px] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,var(--color-accent-text))] dark:prose-a:hover:[--tw-prose-underline-size:6px]',
        // pre
        'prose-pre:rounded-xl prose-pre:bg-dark prose-pre:shadow-lg dark:prose-pre:bg-dark-raised dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-dark-line',
        // blockquotes (§ requirements in the standard) — the kit's requirement callout
        'prose-blockquote:border-l-[3px] prose-blockquote:border-accent prose-blockquote:bg-accent-wash prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:not-italic dark:prose-blockquote:border-dark-accent dark:prose-blockquote:bg-dark-raised',
        // hr
        'dark:prose-hr:border-dark-line',
      )}
    >
      {children}
    </div>
  );
}
