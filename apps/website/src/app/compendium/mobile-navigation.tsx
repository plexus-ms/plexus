'use client';

import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import type { NavSection } from './compendium';
import { Sidebar } from './sidebar';

export function MobileNavigation({ sections }: { sections: NavSection[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-18 z-40 flex items-center gap-3 border-b border-line bg-card/95 px-4 py-3 backdrop-blur-sm sm:px-6 lg:hidden dark:border-dark-line dark:bg-dark/95">
      <button type="button" onClick={() => setIsOpen(true)} aria-label="Open navigation">
        <Bars3Icon className="h-6 w-6 stroke-ink-soft dark:stroke-dark-soft" />
      </button>
      <span className="font-display text-sm font-bold text-ink dark:text-dark-paper">Compendium</span>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-ink/50 pr-10 backdrop-blur-sm lg:hidden"
        aria-label="Navigation"
      >
        <DialogPanel className="min-h-full w-full max-w-xs bg-card px-4 pt-5 pb-12 sm:px-6 dark:bg-dark">
          <div className="flex items-center">
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close navigation">
              <XMarkIcon className="h-6 w-6 stroke-ink-soft dark:stroke-dark-soft" />
            </button>
            <span className="ml-6 font-display font-bold text-ink dark:text-dark-paper">Compendium</span>
          </div>
          <div className="mt-5 px-1">
            <Sidebar sections={sections} onLinkClick={() => setIsOpen(false)} />
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
