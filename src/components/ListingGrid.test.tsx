import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ListingGrid } from '../components/ListingGrid';
import type { Listing } from '../types';

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Desk 1',
    description: 'Description 1',
    price: 100,
    neighborhood: 'Downtown',
    condition: 'good',
    imageUrl: 'https://example.com/desk1.jpg',
    sellerId: 'user1',
    sellerContact: { email: 'seller1@example.com' },
    isAuction: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Chair 1',
    description: 'Description 2',
    price: 50,
    neighborhood: 'Campus',
    condition: 'excellent',
    imageUrl: 'https://example.com/chair1.jpg',
    sellerId: 'user2',
    sellerContact: { email: 'seller2@example.com' },
    isAuction: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

describe('ListingGrid', () => {
  it('renders loading state', () => {
    render(<ListingGrid listings={[]} isLoading={true} error={null} />);
    expect(screen.getByText('Loading listings...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<ListingGrid listings={[]} isLoading={false} error="Test error" />);
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  it('renders empty state when no listings', () => {
    render(<ListingGrid listings={[]} isLoading={false} error={null} />);
    expect(
      screen.getByText('No listings found. Be the first to create one!'),
    ).toBeInTheDocument();
  });

  it('renders all listings', () => {
    render(
      <BrowserRouter>
        <ListingGrid listings={mockListings} isLoading={false} error={null} />
      </BrowserRouter>,
    );

    expect(screen.getByText('Desk 1')).toBeInTheDocument();
    expect(screen.getByText('Chair 1')).toBeInTheDocument();
  });

  it('creates responsive grid layout', () => {
    const { container } = render(
      <BrowserRouter>
        <ListingGrid listings={mockListings} isLoading={false} error={null} />
      </BrowserRouter>,
    );

    const gridContainer = container.querySelector('div[class*="grid"]');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer?.className).toContain('grid-cols-1');
    expect(gridContainer?.className).toContain('sm:grid-cols-2');
    expect(gridContainer?.className).toContain('lg:grid-cols-3');
  });
});
