import Link from 'next/link';

export function QuickLinks({ children }: { children: React.ReactNode }) {
  return <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">{children}</div>;
}

export function QuickLink({ title, description, href }: { title: string; description?: string; href: string }) {
  return (
    <div className="group relative border border-line bg-card transition-colors hover:border-accent hover:bg-accent-wash dark:border-dark-line dark:bg-dark-raised dark:hover:border-dark-accent dark:hover:bg-dark-raised">
      <div className="relative overflow-hidden p-6">
        <h2 className="font-display text-base font-bold text-ink dark:text-dark-paper">
          <Link href={href}>
            <span className="absolute -inset-px" />
            {title}
          </Link>
        </h2>
        {description && <p className="mt-1 text-sm text-ink-soft dark:text-dark-soft">{description}</p>}
      </div>
    </div>
  );
}
