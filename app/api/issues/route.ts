import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import { issueSchema } from '../../validationSchemas';

export async function POST(request: NextRequest) {
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
