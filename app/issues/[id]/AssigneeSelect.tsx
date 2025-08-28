'use client';
import React from 'react';
import { Issue, User } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { Select } from '@radix-ui/themes';
import toast, { Toaster } from 'react-hot-toast';

import { Skeleton } from '@/app/components';

const AssigneeSelect = (props: { issue: Issue }) => {
  const { issue } = props;
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  if (isLoading) {
    return <Skeleton height="2rem" />;
  }

  if (error) {
    return null;
  }

  return (
    <>
      <Select.Root
        onValueChange={async (userId) => {
          await axios
            .patch(`/api/issues/${issue.id}`, {
              assignedToUserId: userId || null,
            })
            .catch(() => {
              toast.error('Changes could not be saved.');
            });
        }}
        defaultValue={issue.assignedToUserId || ''}
      >
        <Select.Trigger placeholder="Assign..."></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map(({ id, name }) => (
              <Select.Item key={id} value={id}>
                {name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
