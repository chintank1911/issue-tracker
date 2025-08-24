import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { IssueStatusBadge } from '@/app/components';
import { Pencil2Icon } from '@radix-ui/react-icons';

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
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Box className="space-y-3">
        <Heading>{issue.title}</Heading>
        <Flex gap="3">
          <IssueStatusBadge status={issue.status} />
          <Text>{moment(issue.created_at).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </Flex>
        <Card className="prose max-w-full">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
