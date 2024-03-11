import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useQuery } from '@tanstack/react-query';
import { SimpleGrid, Button, Box, Flex } from '@chakra-ui/react';
import { NavLink, BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import BookCard from './components/BookCard';
import { Book } from './types/book';

const categoryQueryMap = {
  Trending: 'fiction', // Assuming "Trending" is mapped to popular fiction books
  Science: 'science+fiction', 
  History: 'subject:history', 
  Fantasy: 'subject:fantasy', 
  Biography: 'subject:biography',
};

function useQueryBooks(category) {
  return useQuery({
    queryKey: ['repoData', category],
    queryFn: () =>
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${category}&key=AIzaSyB1_P1PM_JYj1MwULw47d3REiqPBwGavbI`).then(res =>
        res.json(),
      ),
  });
}

function App() {
  const location = useLocation();
  const { signOut } = useAuthenticator((context) => [context.signOut]);

  // Determine the category based on the current path
  const categoryPath = location.pathname.substring(1).toLowerCase();
  const apiQuery = categoryQueryMap[categoryPath.charAt(0).toUpperCase() + categoryPath.slice(1)] || 'fiction';

  const { isPending, error, data } = useQueryBooks(apiQuery);

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const categories = Object.keys(categoryQueryMap);

  return (
    <Box>
      <Flex as="nav" justify="space-between" padding="4">
        <Box>
          {categories.map((category) => (
            <NavLink
              to={`/${category.toLowerCase()}`}
              key={category}
              style={({ isActive }) => ({
                marginRight: '8px',
                textDecoration: 'none',
                color: isActive ? 'blue' : 'black',
              })}
            >
              {category}
            </NavLink>
          ))}
        </Box>
        <Button colorScheme='cyan' onClick={signOut}>Sign Out</Button>
      </Flex>
      <Box as="main">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10">
          {data?.items?.map((book: Book) => <BookCard book={book} key={book.id} />)}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
}

