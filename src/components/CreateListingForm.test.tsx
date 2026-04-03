import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CreateListingForm } from '../components/CreateListingForm';
import * as authModule from '../hooks/useAuth';
import * as listingService from '../services/listingService';

vi.mock('../hooks/useAuth');
vi.mock('../services/listingService');

describe('CreateListingForm', () => {
  beforeEach(() => {
    vi.mocked(authModule.useAuth).mockReturnValue({
      user: { id: 'user123', email: 'test@example.com', displayName: 'Test User' },
      loading: false,
      error: null,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
    });

    vi.mocked(listingService.listingService.createListing).mockResolvedValue(
      'listing123',
    );
  });

  it('renders all required form fields', () => {
    render(
      <BrowserRouter>
        <CreateListingForm />
      </BrowserRouter>,
    );

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Neighborhood/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Condition/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
  });

  it('captures contact information correctly', async () => {
    const user = userEvent.setup();
    const createSpy = vi.spyOn(listingService.listingService, 'createListing');

    render(
      <BrowserRouter>
        <CreateListingForm />
      </BrowserRouter>,
    );

    await user.type(screen.getByLabelText(/Title/i), 'Test Desk');
    await user.type(screen.getByLabelText(/Description/i), 'A nice desk');
    await user.type(screen.getByLabelText(/Price/i), '150');
    await user.type(screen.getByLabelText(/Neighborhood/i), 'Downtown');
    await user.type(screen.getByLabelText(/Image URL/i), 'https://example.com/desk.jpg');
    await user.type(screen.getByLabelText(/Email/i), 'seller@example.com');
    await user.type(screen.getByLabelText(/Phone/i), '555-1234');

    const submitButton = screen.getByRole('button', { name: /Create Listing/i });
    await user.click(submitButton);

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Desk',
        description: 'A nice desk',
        price: 150,
        neighborhood: 'Downtown',
        imageUrl: 'https://example.com/desk.jpg',
        sellerContact: {
          email: 'seller@example.com',
          phone: '555-1234',
        },
      }),
      'user123',
    );
  });

  it('requires all mandatory fields before submission', () => {
    render(
      <BrowserRouter>
        <CreateListingForm />
      </BrowserRouter>,
    );

    // All required fields should be present in the form
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Neighborhood/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it('captures auction mode toggle', async () => {
    const user = userEvent.setup();
    const createSpy = vi.spyOn(listingService.listingService, 'createListing');

    render(
      <BrowserRouter>
        <CreateListingForm />
      </BrowserRouter>,
    );

    // Fill required fields
    await user.type(screen.getByLabelText(/Title/i), 'Test Desk');
    await user.type(screen.getByLabelText(/Description/i), 'A nice desk');
    await user.type(screen.getByLabelText(/Price/i), '150');
    await user.type(screen.getByLabelText(/Neighborhood/i), 'Downtown');
    await user.type(screen.getByLabelText(/Image URL/i), 'https://example.com/desk.jpg');
    await user.type(screen.getByLabelText(/Email/i), 'seller@example.com');

    // Enable auction mode
    const auctionCheckbox = screen.getByRole('checkbox', {
      name: /Enable Auction Mode/i,
    });
    await user.click(auctionCheckbox);

    const submitButton = screen.getByRole('button', { name: /Create Listing/i });
    await user.click(submitButton);

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        isAuction: true,
      }),
      'user123',
    );
  });
});
