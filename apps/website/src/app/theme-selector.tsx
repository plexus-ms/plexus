'use client';

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { cn } from '@plexus-ms/std';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const themes = [
  { name: 'Light', value: 'light', icon: SunIcon },
  { name: 'Dark', value: 'dark', icon: MoonIcon },
  { name: 'System', value: 'system', icon: ComputerDesktopIcon },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The selected theme is only known on the client; render a placeholder until mounted.
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-6 w-6" />;

  return (
    <Listbox as="div" value={theme} onChange={setTheme} className="relative z-10">
      <Label className="sr-only">Theme</Label>
      <ListboxButton
        className="flex h-6 w-6 items-center justify-center border border-line bg-card dark:border-dark-line dark:bg-dark-raised"
        aria-label="Theme"
      >
        <SunIcon className={cn('h-4 w-4 dark:hidden', theme === 'system' ? 'text-ink-soft' : 'text-accent-text')} />
        <MoonIcon
          className={cn('hidden h-4 w-4 dark:block', theme === 'system' ? 'text-dark-soft' : 'text-dark-accent')}
        />
      </ListboxButton>
      <ListboxOptions className="absolute top-full left-1/2 mt-3 w-36 -translate-x-1/2 space-y-1 border border-line bg-card p-3 text-sm font-medium shadow-md shadow-black/5 dark:border-dark-line dark:bg-dark-raised">
        {themes.map((option) => (
          <ListboxOption
            key={option.value}
            value={option.value}
            className={({ focus, selected }) =>
              cn(
                'flex cursor-pointer items-center p-1 select-none',
                selected && 'text-accent-text dark:text-dark-accent',
                focus && !selected && 'text-ink dark:text-dark-paper',
                !focus && !selected && 'text-ink-soft dark:text-dark-soft',
                focus && 'bg-paper dark:bg-dark/60',
              )
            }
          >
            {({ selected }) => (
              <>
                <div className="border border-line bg-card p-1 dark:border-dark-line dark:bg-dark-raised">
                  <option.icon
                    className={cn(
                      'h-4 w-4',
                      selected ? 'text-accent-text dark:text-dark-accent' : 'text-ink-soft dark:text-dark-soft',
                    )}
                  />
                </div>
                <div className="ml-3">{option.name}</div>
              </>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
