import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { listingService } from '../services/listingService';
import type { Listing } from '../types';

export const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      try {
        const fetchedListing = await listingService.getListingById(id);
        if (fetchedListing) {
          setListing(fetchedListing);
        } else {
          setError('Listing not found');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch listing';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-gray-600">Loading listing...</p>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-red-600">{error || 'Listing not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="text-blue-600 hover:text-blue-800 mb-6 font-semibold"
      >
        ← Back to Marketplace
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-96 object-cover"
        />

        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{listing.title}</h1>
            {listing.isAuction && (
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded font-semibold">
                Auction
              </span>
            )}
          </div>

          <div className="text-4xl font-bold text-blue-600 mb-6">${listing.price}</div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-gray-600">Neighborhood</p>
              <p className="text-lg font-semibold text-gray-800">
                {listing.neighborhood}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-gray-600">Condition</p>
              <p className="text-lg font-semibold text-gray-800 capitalize">
                {listing.condition}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
          </div>

          <div className="border-t pt-6">
            {!showContact ? (
              <button
                onClick={() => setShowContact(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 w-full"
              >
                Contact Seller
              </button>
            ) : (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Seller Contact Information
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${listing.sellerContact.email}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {listing.sellerContact.email}
                  </a>
                </p>
                {listing.sellerContact.phone && (
                  <p className="text-gray-700">
                    <strong>Phone:</strong>{' '}
                    <a
                      href={`tel:${listing.sellerContact.phone}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {listing.sellerContact.phone}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
