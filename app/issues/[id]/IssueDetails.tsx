import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Issue } from '@prisma/client';
import moment from 'moment';

import { Card, Flex, Heading, Text } from '@radix-ui/themes';

import { IssueStatusBadge } from '@/app/components';

const IssueDetails = (props: { issue: Issue }) => {
  const { issue } = props;

  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{moment(issue.created_at).format('YYYY-MM-DD HH:mm:ss')}</Text>
      </Flex>
      <Card className="prose max-w-full">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
