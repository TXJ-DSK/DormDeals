import { useEffect, useState } from 'react';

import { listingService } from '../services/listingService';
import type { Listing } from '../types';

export const useListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedListings = await listingService.getAllListings();
      setListings(fetchedListings);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch listings';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return {
    listings,
    loading,
    error,
    refetch: fetchListings,
  };
};
