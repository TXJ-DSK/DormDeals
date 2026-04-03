import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import type { CreateListingInput, Listing } from '../types';
import { db } from './firebase';

const LISTINGS_COLLECTION = 'listings';

export const listingService = {
  async createListing(input: CreateListingInput, sellerId: string): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, LISTINGS_COLLECTION), {
        ...input,
        sellerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw new Error('Failed to create listing');
    }
  },

  async getAllListings(): Promise<Listing[]> {
    try {
      const snapshot = await getDocs(collection(db, LISTINGS_COLLECTION));
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt || new Date().toISOString(),
        updatedAt: doc.data().updatedAt || new Date().toISOString(),
      })) as Listing[];
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw new Error('Failed to fetch listings');
    }
  },

  async getListingById(id: string): Promise<Listing | null> {
    try {
      const docRef = doc(db, LISTINGS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt || new Date().toISOString(),
          updatedAt: docSnap.data().updatedAt || new Date().toISOString(),
        } as Listing;
      }
      return null;
    } catch (error) {
      console.error('Error fetching listing:', error);
      throw new Error('Failed to fetch listing');
    }
  },

  async getListingsBySeller(sellerId: string): Promise<Listing[]> {
    try {
      const q = query(
        collection(db, LISTINGS_COLLECTION),
        where('sellerId', '==', sellerId),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt || new Date().toISOString(),
        updatedAt: doc.data().updatedAt || new Date().toISOString(),
      })) as Listing[];
    } catch (error) {
      console.error('Error fetching seller listings:', error);
      throw new Error('Failed to fetch seller listings');
    }
  },

  async updateListing(id: string, updates: Partial<Listing>): Promise<void> {
    try {
      const docRef = doc(db, LISTINGS_COLLECTION, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating listing:', error);
      throw new Error('Failed to update listing');
    }
  },

  async deleteListing(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, LISTINGS_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw new Error('Failed to delete listing');
    }
  },
};
