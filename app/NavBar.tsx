'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import classNames from 'classnames';

import { AiFillBug } from 'react-icons/ai';
import { Box, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import * as Avatar from '@radix-ui/react-avatar';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

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
    <nav className="px-5 border-b py-3">
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Link href="/">
            <AiFillBug />
          </Link>
          <ul className="flex gap-6">
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
        </Flex>
        <Box>
          {status === 'authenticated' && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                {/* <Avatar
                  src={session.user!.image!}
                  fallback="?"
                  size="2"
                  radius="full"
                  className="cursor-pointer"
                /> */}
                <Avatar.Root className="AvatarRoot">
                  <Avatar.Image
                    className="cursor-pointer"
                    src={session.user!.image!}
                    alt="profile"
                  />
                  <Avatar.Fallback className="cursor-pointer" delayMs={600}>
                    {session.user?.name?.[0]}
                  </Avatar.Fallback>
                </Avatar.Root>
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
          {status === 'unauthenticated' && (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default NavBar;
