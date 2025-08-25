'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: 'Dashboard',
      href: '/',
    },
    {
      label: 'Issues',
      href: '/issues/list',
    },
  ];

  return (
    <nav className="flex justify-between px-5 items-center border-b h-16">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-5">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              className={classNames({
                'text-zinc-900': href === currentPath,
                'text-zinc-500': href !== currentPath,
                'hover:text-zinc-800 transition-colors': true,
              })}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
