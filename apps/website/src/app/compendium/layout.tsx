import { getNavigation } from './compendium';
import { MobileNavigation } from './mobile-navigation';
import { Sidebar } from './sidebar';

export default async function CompendiumLayout({ children }: { children: React.ReactNode }) {
  const sections = await getNavigation();
  return (
    <>
      <MobileNavigation sections={sections} />
      <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-paper dark:hidden" />
          <div className="absolute top-16 right-0 bottom-0 hidden h-12 w-px bg-linear-to-t from-dark-line dark:block" />
          <div className="absolute top-28 right-0 bottom-0 hidden w-px bg-dark-line dark:block" />
          <div className="sticky top-18 -ml-0.5 h-[calc(100vh-4.5rem)] w-64 overflow-x-hidden overflow-y-auto py-16 pr-8 pl-0.5 xl:w-72 xl:pr-16">
            <Sidebar sections={sections} />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
