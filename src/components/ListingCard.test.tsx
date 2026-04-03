import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ListingCard } from '../components/ListingCard';
import type { Listing } from '../types';

const mockListing: Listing = {
  id: '1',
  title: 'Wooden Desk',
  description: 'A sturdy wooden desk in excellent condition',
  price: 150,
  neighborhood: 'Downtown',
  condition: 'excellent',
  imageUrl: 'https://example.com/desk.jpg',
  sellerId: 'user123',
  sellerContact: {
    email: 'seller@example.com',
    phone: '555-1234',
  },
  isAuction: false,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

describe('ListingCard', () => {
  it('renders listing information correctly', () => {
    render(
      <BrowserRouter>
        <ListingCard listing={mockListing} />
      </BrowserRouter>,
    );

    expect(screen.getByText('Wooden Desk')).toBeInTheDocument();
    expect(screen.getByText('$150')).toBeInTheDocument();
    expect(screen.getByText('Downtown')).toBeInTheDocument();
    expect(screen.getByText('excellent')).toBeInTheDocument();
  });

  it('displays auction badge when isAuction is true', () => {
    const auctionListing = { ...mockListing, isAuction: true };

    render(
      <BrowserRouter>
        <ListingCard listing={auctionListing} />
      </BrowserRouter>,
    );

    expect(screen.getByText('Auction')).toBeInTheDocument();
  });

  it('does not display auction badge when isAuction is false', () => {
    render(
      <BrowserRouter>
        <ListingCard listing={mockListing} />
      </BrowserRouter>,
    );

    expect(screen.queryByText('Auction')).not.toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(
      <BrowserRouter>
        <ListingCard listing={mockListing} />
      </BrowserRouter>,
    );

    const image = screen.getByAltText('Wooden Desk');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/desk.jpg');
  });

  it('links to listing detail page', () => {
    render(
      <BrowserRouter>
        <ListingCard listing={mockListing} />
      </BrowserRouter>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/listing/1');
  });
});
