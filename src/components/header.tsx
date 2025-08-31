'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Store, Bike, UserCog, User } from 'lucide-react';
import { cn } from '@/lib/utils';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-primary"
      >
        <path d="M12 1v2" />
        <path d="M12 21v2" />
        <path d="M4.22 4.22l1.42 1.42" />
        <path d="M18.36 18.36l1.42 1.42" />
        <path d="M1 12h2" />
        <path d="M21 12h2" />
        <path d="M4.22 19.78l1.42-1.42" />
        <path d="M18.36 5.64l1.42-1.42" />
        <path d="M16 8.54c-2.43 1.13-5.57 1.13-8 0" />
        <path d="M15.11 12.89A5.5 5.5 0 0 0 12 12a5.5 5.5 0 0 0-3.11.89" />
        <path d="M12.78 17.11a2.5 2.5 0 0 0-1.56 0" />
      </svg>
      <span className="font-headline text-2xl font-bold text-primary">Vocal Local</span>
    </Link>
  );
}

const navLinks = [
  { href: '/', label: 'Customer', icon: User },
  { href: '/shop', label: 'Shop', icon: Store },
  { href: '/delivery', label: 'Delivery', icon: Bike },
  { href: '/admin', label: 'Admin', icon: UserCog },
];

function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link href={href} key={href} prefetch={false}>
            <Button
              variant={isActive ? 'default' : 'ghost'}
              className="w-full justify-start gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          </Link>
        );
      })}
    </>
  );
}

function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden items-center gap-2 md:flex">
      {navLinks.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link href={href} key={href} prefetch={false}>
            <Button
              variant="link"
              className={cn(
                'text-lg font-semibold text-muted-foreground',
                isActive && 'text-primary underline'
              )}
            >
              {label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
      <Logo />
      <DesktopNav />
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-4 p-4">
              <div className="mb-4">
                <Logo />
              </div>
              <NavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
