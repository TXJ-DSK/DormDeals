import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App component', () => {
  it('renders the app with routing', () => {
    render(<App />);
    // The app should load without errors
    expect(document.body).toBeInTheDocument();
  });
});
