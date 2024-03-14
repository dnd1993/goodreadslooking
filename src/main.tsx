import React from 'react';
import ReactDOM from 'react-dom/client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ChakraProvider } from '@chakra-ui/react';

import App from './App.tsx'

import {createUser} from './graphql/mutations.ts';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { signUp, SignUpInput } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';


const queryClient = new QueryClient()

const client = generateClient();

export default function AuthenticatorWithEmail() {
  const services = {
    async handleSignUp({ username, password, options }: SignUpInput) {
      try {
        // attempt to sign up the user with Cognito.
        const signUpResponse = await signUp({
          username,
          password,
          options,
        });
  
        // If signUp is successful, proceed to create the user in the database.
        const email = options?.userAttributes?.email;
        if (email) {
          const newUser = await client.graphql({
            query: createUser,
            variables: {
              input: {
                username,
                email
              }
            }
          });
          console.log('New user created in the database:', newUser);
        }
  
        return signUpResponse;
      } catch (error) {
        console.error('Sign up error:', error);
        throw error;
      }
    }
  }
  

  return (
    <Authenticator services={services} initialState='signUp'>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </Authenticator>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticatorWithEmail />
  </React.StrictMode>,
)
