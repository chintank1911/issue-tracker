import React from 'react';
import NextLink from 'next/link';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import moment from 'moment';

import { Table } from '@radix-ui/themes';
import { ArrowUpIcon } from '@radix-ui/react-icons';

import IssueActions from './IssueActions';
import { IssueStatusBadge, Link } from '@/app/components';

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    {
      label: 'Created',
      value: 'created_at',
      className: 'hidden md:table-cell',
    },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns.some(({ value }) => value === searchParams.orderBy)
    ? {
        [searchParams.orderBy]: 'asc',
      }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(({ label, value, className }) => (
              <Table.ColumnHeaderCell key={value} className={className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: value },
                  }}
                >
                  {label}
                </NextLink>
                {value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {moment(issue.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
