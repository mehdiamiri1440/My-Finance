import 'react-native-gesture-handler';
import React from 'react';
import App from './App';
import ContextsProvider from './src/contexts';
import locales from './locales';

global.locales = locales.localize;

function Register() {
  return (
    <ContextsProvider>
      <App />
    </ContextsProvider>
  );
}

export default Register;
