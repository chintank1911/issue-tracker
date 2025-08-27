'use client';
import React, { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import axios from 'axios';

import { Select } from '@radix-ui/themes';

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchAndSetUsers = async () => {
    const { data } = await axios.get<User[]>('/api/users');
    setUsers(data);
  };

  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..."></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map(({ id, name }) => (
            <Select.Item key={id} value={id}>
              {name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
