import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const { signOut } = useAuthenticator((context) => [context.signOut]);
  return (
    <>
      <button onClick={signOut}>Sign Out</button>
      <h1>Good Reads Looking App</h1>
    </>
  )
}

export default App
