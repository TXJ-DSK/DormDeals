import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { ListingDetail } from '../components/ListingDetail';
import * as listingService from '../services/listingService';

vi.mock('../services/listingService');

describe('ListingDetail', () => {
  it('displays loading state initially when no params', () => {
    vi.mocked(listingService.listingService.getListingById).mockImplementation(
      () => new Promise(() => {}), // Never resolves
    );

    render(
      <BrowserRouter>
        <ListingDetail />
      </BrowserRouter>,
    );

    expect(screen.getByText('Loading listing...')).toBeInTheDocument();
  });

  // Additional tests can be added when using full routing setup with Route and proper URL params
  // For now, the component is tested through integration tests in HomePage and other composed tests
});
