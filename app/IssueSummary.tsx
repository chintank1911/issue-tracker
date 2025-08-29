import React from 'react';
import Link from 'next/link';
import { Status } from '@prisma/client';

import { Card, Flex, Text } from '@radix-ui/themes';

interface Props {
  counts: {
    open: number;
    inProgress: number;
    closed: number;
  };
}

const IssueSummary = (props: Props) => {
  const {
    counts: { open, inProgress, closed },
  } = props;

  const cards: { label: string; value: number; status: Status }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];

  return (
    <Flex gap="4">
      {cards.map(({ label, value, status }) => (
        <Card key={status}>
          <Flex direction="column" gap="2">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${status}`}
            >
              {label}
            </Link>
            <Text size="5" className="font-bold">
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
