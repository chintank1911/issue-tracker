import prisma from '@/prisma/client';

import IssueSummary from './IssueSummary';

export default async function Home() {
  const result = await prisma.issue.groupBy({
    by: ['status'],
    _count: true,
  });

  const counts = result.reduce((acc, row) => {
    acc[row.status] = row._count;
    return acc;
  }, {} as Record<string, number>);

  return (
    <IssueSummary
      open={counts.OPEN || 0}
      inProgress={counts.IN_PROGRESS || 0}
      closed={counts.CLOSED || 0}
    />
  );
}
