import React from 'react';
import { Box, Image, Text, Badge, Stack, Link } from '@chakra-ui/react';

function BookCard({ book }) {
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
        <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {book.volumeInfo.title}
        </Text>
        <Text>{book.volumeInfo.authors.join(', ')}</Text>
        <Text color="gray.500" isTruncated>
          {book.volumeInfo.publishedDate} • {book.volumeInfo.pageCount} pages
        </Text>
        <Stack direction="row" align="center">
          <Link href={book.volumeInfo.previewLink} isExternal>
            Preview
          </Link>
          <Link href={book.saleInfo.buyLink} isExternal>
            Buy
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}



export default BookCard;