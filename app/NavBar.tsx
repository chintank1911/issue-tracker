'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import classNames from 'classnames';

import { AiFillBug } from 'react-icons/ai';
import { Box, DropdownMenu, Flex, Text, Avatar } from '@radix-ui/themes';

import { Skeleton } from '@/app/components';

const NavBar = () => {
  return (
    <nav className="px-5 border-b py-3">
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Link href="/">
            <AiFillBug />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
  );
};

const NavLinks = () => {
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
    <ul className="flex gap-6">
      {links.map(({ label, href }) => (
        <li key={label}>
          <Link
            className={classNames({
              'nav-link': true,
              '!text-zinc-900': href === currentPath,
            })}
            href={href}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  return (
    <Box>
      {status === 'loading' && (
        <Skeleton width="2rem" height="2rem" className="rounded-full" />
      )}
      {status === 'unauthenticated' && (
        <Link className="nav-link" href="/api/auth/signin">
          Login
        </Link>
      )}
      {status === 'authenticated' && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default NavBar;
