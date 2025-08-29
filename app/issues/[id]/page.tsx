import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import prisma from '@/prisma/client';

import { Box, Flex, Grid } from '@radix-ui/themes';

import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import UpdateIssueStatusSelect from './UpdateIssueStatusSelect';

interface Props {
  params: { id: string };
}

const IssueDetailPage = async (props: Props) => {
  const session = await getServerSession(authOptions);

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
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="space-y-3 md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex gap="4" direction="column">
            <AssigneeSelect issue={issue} />
            <UpdateIssueStatusSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
