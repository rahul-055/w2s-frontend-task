import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../components/auth/login';

describe('LoginForm Component', () => {
  const authValFn = jest.fn();

  it('renders the login form with username and password fields', () => {
    render(<LoginForm setAuthVal={authValFn} />);

    // Check if username and password fields are rendered
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('displays validation errors for invalid input', async () => {
    render(<LoginForm setAuthVal={() => {}} />);

    // Click on the submit button without filling the form
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    // Check if validation errors are displayed
    await waitFor(() => {
      expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    render(<LoginForm setAuthVal={() => {}} />);

    // Fill the form
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'test_user' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    // Click on the submit button
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    // Ensure that no validation errors are shown
    await waitFor(() => {
      expect(screen.queryByText(/Username is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();
    });
  });
});
