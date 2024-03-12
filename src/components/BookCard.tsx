import React from 'react';
import { Box, Image, Text, Badge, Stack, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { BookCardProps } from '../types/book';

function BookCard({ book }: BookCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
      <Box display="flex" flexDirection="column" alignItems="start">
        <Image src={book.volumeInfo.imageLinks.thumbnail} alt={`Cover of ${book.volumeInfo.title}`} mb="4"/>
        <Box display="flex" alignItems="baseline">
          {book.volumeInfo.categories.map((category) => (
            <Badge borderRadius="full" px="2" colorScheme="teal" key={category}>
              {category}
            </Badge>
          ))}
        </Box>
        <RouterLink to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
          <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated color="blue.600" _hover={{ textDecor: 'underline' }}>
            {book.volumeInfo.title}
          </Text>
        </RouterLink>
        <Text>{book.volumeInfo.authors.join(', ')}</Text>
        <Text color="gray.500" isTruncated>
          {book.volumeInfo.publishedDate} • {book.volumeInfo.pageCount} pages
        </Text>
        <Stack direction="row" align="center">
          <ChakraLink href={book.volumeInfo.previewLink} isExternal>
            Preview
          </ChakraLink>
          <ChakraLink href={book.saleInfo.buyLink} isExternal>
            Buy
          </ChakraLink>
        </Stack>
      </Box>
    </Box>
  );
}

export default BookCard;
