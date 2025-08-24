import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import moment from 'moment';

interface Props {
  params: { id: string };
}

const IssueDetailPage = async (props: Props) => {
  const {
    params: { id },
  } = props;
  const issueId = parseInt(id);

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{moment(issue.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
    </div>
  );
};

export default IssueDetailPage;
