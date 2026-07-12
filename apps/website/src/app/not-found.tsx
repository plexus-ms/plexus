import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-auto flex-col items-center justify-center px-4 py-16 text-center">
      <p className="font-display text-sm font-bold tracking-widest text-accent-text uppercase dark:text-dark-accent">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink dark:text-dark-paper">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-ink-soft dark:text-dark-soft">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href="/"
        className="mt-8 font-display text-sm font-bold text-ink underline decoration-accent decoration-2 underline-offset-4 dark:text-dark-paper"
      >
        Go back home
      </Link>
    </div>
  );
}
