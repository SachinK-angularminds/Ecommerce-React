import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store'; // Import your store
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import App from './App';

// Ensure the GoogleOAuthProvider is included in the test for Google OAuth components
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

  // Your test assertions go here
  expect(screen.getByText(/learn react/i)).toBeInTheDocument();
});
