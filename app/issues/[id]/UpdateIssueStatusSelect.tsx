'use client';
import React from 'react';
import { Issue } from '@prisma/client';
import axios from 'axios';

import { Select } from '@radix-ui/themes';
import toast, { Toaster } from 'react-hot-toast';

import { statuses } from '../list/IssueStatusFilter';

const UpdateIssueStatusSelect = (props: { issue: Issue }) => {
  const { issue } = props;

  const statusOptions = statuses.filter(({ value }) => value);

  const changeStatus = (status: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        status,
      })
      .catch(() => {
        toast.error('Changes could not be saved.');
      });
  };

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={changeStatus}>
        <Select.Trigger placeholder="Status..."></Select.Trigger>
        <Select.Content>
          {statusOptions.map(({ label, value }) => (
            <Select.Item key={value} value={value!}>
              {label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default UpdateIssueStatusSelect;
