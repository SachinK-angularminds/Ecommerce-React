import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { BrowserRouter, useNavigate } from 'react-router-dom';
import * as reactRedux from 'react-redux'
import { Provider } from "react-redux";
import { store } from "../../store";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Mocking react-router-dom's useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mocking redux-related hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// In your Jest setup file or test file
const originalWarn = console.warn;

beforeAll(() => {
  console.warn = (message) => {
    // Ignore the React Router warnings by checking for a specific message
    if (
      message.includes('React Router Future Flag Warning: React Router will begin wrapping state updates') ||
      message.includes('Relative route resolution within Splat routes is changing')
    ) {
      return; // Do nothing if it's one of the warnings you want to ignore
    }
    originalWarn(message); // Call the original console.warn for other warnings
  };
});

afterAll(() => {
  console.warn = originalWarn; // Restore the original console.warn after tests
});


// mocking redux related hooks
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const LoginComponent=()=>{
 return(render(
    <GoogleOAuthProvider clientId="913971445307-2j2t8nnv3b0dev03osja3mnltlknn3nm.apps.googleusercontent.com">
        <Login />
    </GoogleOAuthProvider>
));
}

describe("Login Component", () => {
  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
    useSelectorMock.mockImplementation(selector => selector(mockStore));
})
afterEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
})

const useSelectorMock = reactRedux.useSelector;
const useDispatchMock = reactRedux.useDispatch;

  test("should render login form", () => {
    LoginComponent()

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('validation for email if entered wrong data', () => {
    //rendering login component
    LoginComponent()

    //getting data and clicking the submit button
    const emailInput=screen.getByLabelText(/Email/i)
    fireEvent.change(emailInput, { target: { value: "test@example" } })

    const submitButton = screen.getByText(/Sign in/i);
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/Enter Valid Mail Address./i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('validation for password if entered wrong data', () => {
    //rendering login component
    LoginComponent()

    //getting data and clicking the submit button
    const passwordInput=screen.getByLabelText(/password/i)
    fireEvent.change(passwordInput, { target: { value: "sdfse" } })

    const submitButton = screen.getByText(/Sign in/i);
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/Enter Valid Password./i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('inserting valid data and submitting the form', async() => {
    const mockLogin = jest.fn();
    
    //rendering login component
    render(
      <GoogleOAuthProvider clientId="913971445307-2j2t8nnv3b0dev03osja3mnltlknn3nm.apps.googleusercontent.com">
          <Login submit = {mockLogin} />
      </GoogleOAuthProvider>
  )
    //getting data and clicking the submit button
    const emailInput=screen.getByLabelText(/Email/i)
    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    const passwordInput=screen.getByLabelText(/password/i)
    fireEvent.change(passwordInput, { target: { value: "sskS@123" } })

    const submitButton = screen.getByText(/Sign in/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalledTimes(1);
      expect(handleSubmitMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'validPassword123',
      });
    });
  });

  // test("should call navigate on successful google login", () => {
  //   render(
  //     <Provider store={store}>
  //       <GoogleOAuthProvider clientId="913971445307-2j2t8nnv3b0dev03osja3mnltlknn3nm.apps.googleusercontent.com">
  //         <BrowserRouter>
  //           <App />
  //         </BrowserRouter>
  //       </GoogleOAuthProvider>
  //     </Provider>
  //   );

  //   // Simulate Google login success
  //   const googleLoginButton = screen.getByText(/Sign in with Google/i); // Assuming this text is in the Google login button
  //   fireEvent.click(googleLoginButton);

  //   // Simulate Google login success callback
  //   const successCallback = googleLoginButton.props.onSuccess;
  //   successCallback({ credential: "fakeCredential" });

  //   // Check if navigate was called
  //   expect(navigateMock).toHaveBeenCalledWith("/dashboard"); // Replace with the actual navigation route
  // });

  // test("should dispatch an action on form submit", () => {
  //   render(
  //     <Provider store={store}>
  //       <GoogleOAuthProvider clientId="913971445307-2j2t8nnv3b0dev03osja3mnltlknn3nm.apps.googleusercontent.com">
  //         <BrowserRouter>
  //           <App />
  //         </BrowserRouter>
  //       </GoogleOAuthProvider>
  //     </Provider>
  //   );

  //   const emailInput = screen.getByLabelText(/Email/i);
  //   const passwordInput = screen.getByLabelText(/Password/i);
  //   const submitButton = screen.getByText(/Sign in/i);

  //   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "password123" } });
  //   fireEvent.click(submitButton);

  //   // Check if the dispatch function was called
  //   expect(dispatchMock).toHaveBeenCalled(); // Here you can add additional checks based on the actions dispatched
  // });
});
