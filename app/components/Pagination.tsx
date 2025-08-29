import React from 'react';

import { Button, Flex, Text } from '@radix-ui/themes';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = (props: Props) => {
  const { itemCount, pageSize, currentPage } = props;

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) {
    return null;
  }

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button variant="soft" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button variant="soft" disabled={currentPage === pageSize}>
        <ChevronRightIcon />
      </Button>
      <Button variant="soft" disabled={currentPage === pageSize}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
