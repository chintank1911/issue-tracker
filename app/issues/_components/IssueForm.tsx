'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';

import { Button, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';

import { issueSchema } from '../../validationSchemas';
import { ErrorMessage, Spinner } from '@/app/components';

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm = (props: Props) => {
  const { issue } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }

      router.push('/issues');
      router.refresh();
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  });

  return (
    <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
      <TextField.Root>
        <TextField.Input
          placeholder="Title"
          {...register('title')}
          defaultValue={issue?.title}
        />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button>
        {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default IssueForm;
