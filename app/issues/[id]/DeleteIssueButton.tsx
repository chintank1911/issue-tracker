import React from 'react';

import { Button } from '@radix-ui/themes';

const DeleteIssueButton = (props: { issueId: number }) => {
  const { issueId } = props;

  return <Button color="red">Delete Issue</Button>;
};

export default DeleteIssueButton;
