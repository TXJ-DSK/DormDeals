import { Link } from 'react-router-dom';

import type { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <Link
      to={`/listing/${listing.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img
        src={listing.imageUrl}
        alt={listing.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {listing.title}
        </h3>
        <div className="flex justify-between items-start mb-3">
          <span className="text-2xl font-bold text-blue-600">${listing.price}</span>
          {listing.isAuction && (
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-semibold">
              Auction
            </span>
          )}
        </div>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <strong>Neighborhood:</strong> {listing.neighborhood}
          </p>
          <p>
            <strong>Condition:</strong>{' '}
            <span className="capitalize">{listing.condition}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
