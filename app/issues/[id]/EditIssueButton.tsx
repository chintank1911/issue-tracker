import React from 'react';
import Link from 'next/link';

import { Button } from '@radix-ui/themes';
import { Pencil2Icon } from '@radix-ui/react-icons';

const EditIssueButton = (props: { issueId: number }) => {
  const { issueId } = props;

  return (
    <Button asChild>
      <Link href={`/issues/edit/${issueId}`}>
        <Pencil2Icon />
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditIssueButton;
