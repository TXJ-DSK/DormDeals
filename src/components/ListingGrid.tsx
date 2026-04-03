import type { Listing } from '../types';
import { ListingCard } from './ListingCard';

interface ListingGridProps {
  listings: Listing[];
  isLoading: boolean;
  error: string | null;
}

export const ListingGrid = ({ listings, isLoading, error }: ListingGridProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No listings found. Be the first to create one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};
