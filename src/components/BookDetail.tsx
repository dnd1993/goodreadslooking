import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Text, Image, VStack, Link, Button } from '@chakra-ui/react';
import { stripHtml } from '../utils/stripHtml';
import { useNavigate } from 'react-router-dom';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ['book', id],
    queryFn: () => fetch(`https://www.googleapis.com/books/v1/volumes/${id}`).then(res => res.json()),
  });
  

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error.message}</Box>;

  const book = data;

  return (
    <VStack spacing={4} padding={5}>
      <Button onClick={() => navigate(-1)} colorScheme="teal">Back</Button>
      <Image src={book.volumeInfo.imageLinks?.thumbnail} alt={`Cover of ${book.volumeInfo.title}`} boxSize="200px" objectFit="cover" />
      <Text fontSize="2xl">{book.volumeInfo.title}</Text>
      {book.volumeInfo.authors && <Text>by {book.volumeInfo.authors.join(', ')}</Text>}
      <Text>{book.volumeInfo.publishedDate}</Text>
      <Text>{book.volumeInfo.pageCount} pages</Text>
      <Text>{stripHtml(book.volumeInfo.description)}</Text>
      <Link href={book.volumeInfo.previewLink} isExternal>
        <Button colorScheme="teal">Preview</Button>
      </Link>
    </VStack>
  );
}

export default BookDetail;
