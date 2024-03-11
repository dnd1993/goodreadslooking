import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  useQuery
} from '@tanstack/react-query';
import { SimpleGrid } from '@chakra-ui/react';
import BookCard from './components/BookCard';

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://www.googleapis.com/books/v1/volumes?q=fiction&key=AIzaSyB1_P1PM_JYj1MwULw47d3REiqPBwGavbI').then((res) =>
        res.json(),
      ),
  })

  const { signOut } = useAuthenticator((context) => [context.signOut]);

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  
  return (
    <>
      <button onClick={signOut}>Sign Out</button>
      <h1>Good Reads Looking App</h1>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10">
        {data.items.map(book => <BookCard book={book} key={book.id} />)}
      </SimpleGrid>
    </>
  )
}

export default App
