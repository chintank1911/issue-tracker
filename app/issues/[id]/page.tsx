import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

import { Card, Flex, Heading, Text } from '@radix-ui/themes';

import IssueStatusBadge from '../../components/IssueStatusBadge';

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
    <div className="space-y-3">
      <Heading>{issue.title}</Heading>
      <Flex gap="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{moment(issue.created_at).format('YYYY-MM-DD HH:mm:ss')}</Text>
      </Flex>
      <Card className="prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
