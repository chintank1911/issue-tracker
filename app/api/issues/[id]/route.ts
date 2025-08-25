import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import { issueSchema } from '@/app/validationSchemas';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues?.at?.(0)?.message },
      { status: 400 }
    );
  }

  const issueId = parseInt(params.id);
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    data: validation.data,
    where: { id: issueId },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issueId = parseInt(params.id);
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: issueId },
  });

  return NextResponse.json({});
}
