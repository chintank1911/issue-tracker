import React from 'react';
import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = (props: Props) => {
  const { status } = props;

  const { label, color } = statusMap[status];

  return <Badge color={color}>{label}</Badge>;
};

export default IssueStatusBadge;
