import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/prisma/client';

import { issueSchema } from '../../validationSchemas';
import authOptions from '@/app/auth/authOptions';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues?.at?.(0)?.message },
      { status: 400 }
    );
  }

  const newIssue = await prisma.issue.create({
    data: validation.data,
  });

  return NextResponse.json(newIssue, { status: 201 });
}
