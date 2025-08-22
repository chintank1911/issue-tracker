import React from 'react';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
  const links = [
    {
      label: 'Dashboard',
      href: '/',
    },
    {
      label: 'Issues',
      href: '/issues',
    },
  ];

  return (
    <nav className="flex justify-between px-5 items-center border-b h-16">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-5">
        {links.map(({ label, href }) => (
          <li>
            <Link
              key={label}
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
