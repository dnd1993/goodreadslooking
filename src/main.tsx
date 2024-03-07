import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import {createUser} from './graphql/mutations.ts';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { signUp } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

const client = generateClient();

export default function AuthenticatorWithEmail() {
  const services = {
    async handleSignUp(formData) {
      console.log('form data', formData);
      let { username, password, options } = formData;
      username = username.toLowerCase();
      options.userAttributes.email = options.userAttributes.email.toLowerCase();
      
      const newUser = await client.graphql({
        query: createUser,
        variables: {
          input: {
            username,
            email: options.userAttributes.email
          }
        }
      })
      console.log(newUser)
      return await signUp({
        username,
        password,
        options,
        autoSignIn: {
          enabled: true,
        },
      })
    }
  }

  return (
    <Authenticator services={services} initialState='signUp'>
      <App />
    </Authenticator>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticatorWithEmail />
  </React.StrictMode>,
)
