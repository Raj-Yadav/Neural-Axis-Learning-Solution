import React from 'react';
import { render, screen } from '@testing-library/react';

test('test environment is configured correctly', () => {
  render(<div>Hello, Neural Axis!</div>);
  const element = screen.getByText(/Neural Axis/i);
  expect(element).toBeInTheDocument();
});
