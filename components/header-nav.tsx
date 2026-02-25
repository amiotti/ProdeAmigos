'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';

type NavItem = {
  href: string;
  label: string;
};

function isActivePath(pathname: string, href: string) {
  if (pathname === href) return true;
  if (href === '/inicio') return pathname === '/inicio';
  return pathname.startsWith(`${href}/`);
}

export function HeaderNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    if (detailsRef.current?.open) {
      detailsRef.current.open = false;
    }
  }, [pathname]);

  const currentLabel = useMemo(
    () => items.find((item) => isActivePath(pathname, item.href))?.label ?? 'Secciones',
    [items, pathname],
  );

  return (
    <>
      <nav className="nav nav-desktop">
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <Link key={item.href} href={item.href} className={`nav-link${active ? ' is-active' : ''}`}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <details className="mobile-nav" ref={detailsRef}>
        <summary className="mobile-nav-trigger" aria-label="Abrir menú de secciones">
          <span className="mobile-nav-trigger-left">
            <span className="mobile-nav-trigger-icon" aria-hidden="true">
              ☰
            </span>
            <span>Secciones</span>
          </span>
          <span className="mobile-nav-trigger-current">{currentLabel}</span>
        </summary>
        <nav className="mobile-nav-panel" aria-label="Secciones">
          {items.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav-link${active ? ' is-active' : ''}`}
                onClick={() => {
                  if (detailsRef.current) detailsRef.current.open = false;
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </details>
    </>
  );
}
