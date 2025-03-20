import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store'; 
import { BrowserRouter } from 'react-router-dom'; 
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import App from './App';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <GoogleOAuthProvider clientId="913971445307-2j2t8nnv3b0dev03osja3mnltlknn3nm.apps.googleusercontent.com">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  );

  expect(screen.getByText(/Login with Upstox/i)).toBeInTheDocument();
});
