import { useMemo, useState } from 'react';

import { useListings } from '../hooks/useListings';
import type { Listing } from '../types';
import { ListingGrid } from './ListingGrid';
import { Navbar } from './Navbar';

export const HomePage = () => {
  const { listings, loading, error } = useListings();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings: Listing[] = useMemo(() => {
    if (!searchQuery.trim()) {
      return listings;
    }

    const query = searchQuery.toLowerCase();
    return listings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query) ||
        listing.neighborhood.toLowerCase().includes(query),
    );
  }, [listings, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchValue={searchQuery} onSearchChange={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Marketplace'}
        </h1>

        <ListingGrid listings={filteredListings} isLoading={loading} error={error} />
      </main>
    </div>
  );
};
