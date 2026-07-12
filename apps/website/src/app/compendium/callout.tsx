import { ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { cn } from '@plexus-ms/std';
import type { ReactNode } from 'react';

// Semantic colors are separate from the accent (brand kit § 5): notes use the
// ochre wash (informational, brand-adjacent); warnings use burnt orange because
// the accent owns the yellow band.
const styles = {
  note: {
    container: 'border-l-[3px] border-accent bg-accent-wash dark:border-dark-accent dark:bg-dark-raised',
    icon: 'text-accent-text dark:text-dark-accent',
    title: 'text-ink dark:text-dark-paper',
    body: 'text-ink-soft [--tw-prose-background:var(--color-accent-wash)] prose-a:text-accent-text prose-code:text-ink dark:text-dark-soft dark:prose-code:text-dark-paper',
  },
  warning: {
    container: 'border-l-[3px] border-warn bg-warn/10 dark:bg-dark-raised',
    icon: 'text-warn',
    title: 'text-ink dark:text-dark-paper',
    body: 'text-ink-soft [--tw-prose-underline:var(--color-warn)] [--tw-prose-background:transparent] prose-a:text-accent-text prose-code:text-ink dark:text-dark-soft dark:prose-code:text-dark-paper',
  },
};

const icons = {
  note: LightBulbIcon,
  warning: ExclamationTriangleIcon,
};

export function Callout({
  title,
  children,
  type = 'note',
}: {
  title: string;
  children: ReactNode;
  type?: keyof typeof styles;
}) {
  const Icon = icons[type];
  return (
    <div className={cn('my-8 flex p-6', styles[type].container)}>
      <Icon aria-hidden="true" className={cn('h-8 w-8 flex-none', styles[type].icon)} />
      <div className="ml-4 flex-auto">
        <p className={cn('not-prose font-display text-xl', styles[type].title)}>{title}</p>
        <div className={cn('prose mt-2.5', styles[type].body)}>{children}</div>
      </div>
    </div>
  );
}
