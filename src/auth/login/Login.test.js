import {render, fireEvent, screen} from '@testing-library/react'
import Login from './Login'
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// // Mock the useNavigate and useDispatch hooks
// jest.mock('react-router-dom', () => ({
//   useNavigate: jest.fn(), // mock useNavigate
// }));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(), // mock useDispatch
}));


describe('Login Component', () => {
   let dispatchMock;
   let navigateMock;
 
   beforeEach(() => {
     // Reset the mocks before each test
     dispatchMock = jest.fn();
     navigateMock = jest.fn();
 
     useDispatch.mockReturnValue(dispatchMock); // Mock useDispatch to return a mock function
     useNavigate.mockReturnValue(navigateMock); // Mock useNavigate to return a mock function
   });
 
   test('should render login form', () => {
     render(<Login />);
 
     expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
     expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
   });
 
   test('should call navigate on successful google login', () => {
     render(<Login />);
 
     // Simulate Google login success
     const googleLoginButton = screen.getByText(/Sign in with Google/i); // Assuming this text is in the Google login button
     fireEvent.click(googleLoginButton);
 
     // Simulate Google login success callback
     const successCallback = googleLoginButton.props.onSuccess;
     successCallback({ credential: 'fakeCredential' });
 
     // Check if navigate was called
     expect(navigateMock).toHaveBeenCalledWith('/dashboard'); // Replace with the actual navigation route
   });
 
   test('should dispatch an action on form submit', () => {
     render(<Login />);
 
     const emailInput = screen.getByLabelText(/Email/i);
     const passwordInput = screen.getByLabelText(/Password/i);
     const submitButton = screen.getByText(/Sign in/i);
 
     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
     fireEvent.change(passwordInput, { target: { value: 'password123' } });
     fireEvent.click(submitButton);
 
     // Check if the dispatch function was called
     expect(dispatchMock).toHaveBeenCalled(); // Here you can add additional checks based on the actions dispatched
   });
 });