import React from 'react';
import UserContextProvider from "./contexts/UserContext";
import LandingPage from './components/landing/landing.component';

const App = () => (
  <UserContextProvider>
    <LandingPage />
  </UserContextProvider>
);

export default App;
