import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { HomePage } from '../components/HomePage';
import * as authModule from '../hooks/useAuth';
import * as listingsModule from '../hooks/useListings';
import type { Listing } from '../types';

vi.mock('../hooks/useAuth');
vi.mock('../hooks/useListings');

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Wooden Desk',
    description: 'A sturdy wooden desk',
    price: 150,
    neighborhood: 'Downtown',
    condition: 'excellent',
    imageUrl: 'https://example.com/desk.jpg',
    sellerId: 'user1',
    sellerContact: { email: 'seller1@example.com' },
    isAuction: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Comfortable Chair',
    description: 'A comfortable office chair',
    price: 75,
    neighborhood: 'Campus',
    condition: 'good',
    imageUrl: 'https://example.com/chair.jpg',
    sellerId: 'user2',
    sellerContact: { email: 'seller2@example.com' },
    isAuction: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'Bed Frame',
    description: 'A sturdy bed frame',
    price: 200,
    neighborhood: 'Downtown',
    condition: 'fair',
    imageUrl: 'https://example.com/bed.jpg',
    sellerId: 'user3',
    sellerContact: { email: 'seller3@example.com' },
    isAuction: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

describe('HomePage Search Filter', () => {
  beforeEach(() => {
    vi.mocked(authModule.useAuth).mockReturnValue({
      user: null,
      loading: false,
      error: null,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
    });

    vi.mocked(listingsModule.useListings).mockReturnValue({
      listings: mockListings,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it('renders search input', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    expect(screen.getByPlaceholderText(/Search by furniture type/i)).toBeInTheDocument();
  });

  it('displays all listings initially', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    expect(screen.getByText('Wooden Desk')).toBeInTheDocument();
    expect(screen.getByText('Comfortable Chair')).toBeInTheDocument();
    expect(screen.getByText('Bed Frame')).toBeInTheDocument();
  });

  it('filters listings by furniture type in title', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const searchInput = screen.getByPlaceholderText(/Search by furniture type/i);
    await user.type(searchInput, 'desk');

    expect(screen.getByText('Wooden Desk')).toBeInTheDocument();
    expect(screen.queryByText('Comfortable Chair')).not.toBeInTheDocument();
    expect(screen.queryByText('Bed Frame')).not.toBeInTheDocument();
  });

  it('filters listings by furniture type case-insensitively', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const searchInput = screen.getByPlaceholderText(/Search by furniture type/i);
    await user.type(searchInput, 'CHAIR');

    expect(screen.getByText('Comfortable Chair')).toBeInTheDocument();
    expect(screen.queryByText('Wooden Desk')).not.toBeInTheDocument();
    expect(screen.queryByText('Bed Frame')).not.toBeInTheDocument();
  });

  it('filters by description content', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const searchInput = screen.getByPlaceholderText(/Search by furniture type/i);
    await user.type(searchInput, 'sturdy');

    expect(screen.getByText('Wooden Desk')).toBeInTheDocument();
    expect(screen.getByText('Bed Frame')).toBeInTheDocument();
    expect(screen.queryByText('Comfortable Chair')).not.toBeInTheDocument();
  });

  it('filters by neighborhood', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const searchInput = screen.getByPlaceholderText(/Search by furniture type/i);
    await user.type(searchInput, 'Downtown');

    expect(screen.getByText('Wooden Desk')).toBeInTheDocument();
    expect(screen.getByText('Bed Frame')).toBeInTheDocument();
    expect(screen.queryByText('Comfortable Chair')).not.toBeInTheDocument();
  });

  it('returns all listings when search is cleared', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const searchInput = screen.getByPlaceholderText(
      /Search by furniture type/i,
    ) as HTMLInputElement;
    await user.type(searchInput, 'desk');

    expect(screen.queryByText('Comfortable Chair')).not.toBeInTheDocument();

    await user.clear(searchInput);

    expect(screen.getByText('Wooden Desk')).toBeInTheDocument();
    expect(screen.getByText('Comfortable Chair')).toBeInTheDocument();
    expect(screen.getByText('Bed Frame')).toBeInTheDocument();
  });

  it('shows no results message when filter finds nothing', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    const searchInput = screen.getByPlaceholderText(/Search by furniture type/i);
    await user.type(searchInput, 'nonexistent');

    expect(
      screen.getByText('No listings found. Be the first to create one!'),
    ).toBeInTheDocument();
  });
});
