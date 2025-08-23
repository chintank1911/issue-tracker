'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { createIssueSchema } from '../../validationSchemas';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          const response = await axios.post('/api/issues', data);

          if (response.status === 201) {
            router.push('/issues');
          }
        } catch (error) {
          console.log(error);
        }
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register('title')} />
      </TextField.Root>
      {errors.title && (
        <Text color="red" as="p">
          {errors.title.message}
        </Text>
      )}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      {errors.description && (
        <Text color="red" as="p">
          {errors.description.message}
        </Text>
      )}
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
