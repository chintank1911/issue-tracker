'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';

const DeleteIssueButton = (props: { issueId: number }) => {
  const { issueId } = props;

  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure want to delete this issue? This action cannot be undone.
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="outline" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={async () => {
                await axios.delete(`/api/issues/${issueId}`);
                router.push('/issues');
                router.refresh();
              }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
