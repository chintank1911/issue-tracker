import React from 'react';
import prisma from '@/prisma/client';

import { Flex, Grid } from '@radix-ui/themes';

import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';

export default async function Home() {
  const result = await prisma.issue.groupBy({
    by: ['status'],
    _count: true,
  });

  const { OPEN, IN_PROGRESS, CLOSED } = result.reduce((acc, row) => {
    acc[row.status] = row._count;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          counts={{ open: OPEN, inProgress: IN_PROGRESS, closed: CLOSED }}
        />
        <IssueChart
          counts={{ open: OPEN, inProgress: IN_PROGRESS, closed: CLOSED }}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
