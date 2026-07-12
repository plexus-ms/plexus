'use client';

import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Wordmark } from '@plexus-ms/brand/react';
import { cn } from '@plexus-ms/std';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeSelector } from './theme-selector';

const GITHUB_URL = 'https://github.com/plexus-ms';

const navigation = [
  { name: 'Compendium', href: '/compendium' },
  { name: 'GitHub', href: GITHUB_URL },
];

function GitHubIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-line bg-card transition duration-500 dark:border-dark-line',
        isScrolled ? 'dark:bg-dark/95 dark:backdrop-blur-sm' : 'dark:bg-transparent',
      )}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-8xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8"
      >
        <Link href="/" className="text-ink dark:text-dark-paper">
          <Wordmark tld=".ms" twotone className="font-display text-2xl font-bold" />
        </Link>
        <div className="flex items-center gap-x-6 lg:gap-x-8">
          <Link
            href="/compendium"
            className="hidden border-b-2 border-transparent pb-0.5 font-display text-sm/6 font-bold text-ink hover:border-accent lg:block dark:text-dark-paper"
          >
            Compendium
          </Link>
          <ThemeSelector />
          <Link href={GITHUB_URL} className="group hidden lg:block" aria-label="GitHub">
            <GitHubIcon className="h-6 w-6 fill-ink-soft group-hover:fill-ink dark:fill-dark-soft dark:group-hover:fill-dark-paper" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-ink-soft lg:hidden dark:text-dark-soft"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-card p-6 sm:max-w-sm sm:ring-1 sm:ring-line dark:bg-dark dark:sm:ring-dark-line">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-ink dark:text-dark-paper">
              <Wordmark tld=".ms" twotone className="font-display text-lg font-bold" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-ink-soft dark:text-dark-soft"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-line dark:divide-dark-line">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 font-display text-base/7 font-bold text-ink hover:bg-paper dark:text-dark-paper dark:hover:bg-dark-raised"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
