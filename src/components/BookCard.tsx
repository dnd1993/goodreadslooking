import React from 'react';
import { Box, Image, Text, Badge, Stack, Link as ChakraLink, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { userByUsername } from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { updateUser } from '../graphql/mutations';

import { BookCardProps } from '../types/book';

function BookCard({ book, username }: BookCardProps) {
  const client = generateClient();
  const updateToReadList = async () => {
    console.log('click', book.id, username);
    const userData = await client.graphql({
        query: userByUsername,
        variables: {
          username: username,
        },
    });
    console.log(userData)
    const currentUser = userData.data.userByUsername.items[0];
    const updatedToReadList = currentUser.toRead || [];
    updatedToReadList.push(book.id);
    const updateResult = await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: currentUser.id,
            toRead: updatedToReadList,
          },
        },
    });
    console.log('Update result:', updateResult);
  }  
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
        <Button colorScheme='blue' onClick={updateToReadList}>To Read</Button>
      </Box>
    </Box>
  );
}

export default BookCard;
