// src/component/AdmissionForm.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from './Form';

// Mock fetch globally
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          error: false,
          percent: 85.23,
          interpretation: 'Excellent chance of admission',
        }),
    })
  );
});

afterAll(() => {
  global.fetch.mockRestore();
});

describe('AdmissionForm component', () => {
  test('renders the form with all input fields and a submit button', () => {
    render(<Form />);

    expect(screen.getByLabelText(/GRE Score/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/TOEFL Score/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/University Rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Statement of Purpose/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Letter of Recommendation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CGPA/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Research Experience/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Predict Admission Chance/i })).toBeInTheDocument();
  });

  test('submits the form with valid inputs and shows result', async () => {
    render(<Form />);

    fireEvent.change(screen.getByLabelText(/GRE Score/i), { target: { value: '320' } });
    fireEvent.change(screen.getByLabelText(/TOEFL Score/i), { target: { value: '115' } });
    fireEvent.change(screen.getByLabelText(/University Rating/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/Statement of Purpose/i), { target: { value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/Letter of Recommendation/i), { target: { value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/CGPA/i), { target: { value: '9.2' } });
    fireEvent.click(screen.getByLabelText(/Research Experience/i));

    fireEvent.click(screen.getByRole('button', { name: /Predict Admission Chance/i }));

    // Wait for result message
    const resultText = await screen.findByText(/Your estimated admission chance:/i);
    expect(resultText).toBeInTheDocument();

    // Optional: check percent value appears correctly
    expect(screen.getByText(/85.23%/)).toBeInTheDocument();
    expect(screen.getByText(/Excellent chance of admission/)).toBeInTheDocument();
  });
});
