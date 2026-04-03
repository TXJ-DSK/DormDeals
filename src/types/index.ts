export type Condition = 'excellent' | 'good' | 'fair' | 'poor';

export interface SellerContact {
  email: string;
  phone?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  neighborhood: string;
  condition: Condition;
  imageUrl: string;
  sellerId: string;
  sellerContact: SellerContact;
  isAuction: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
}

export interface CreateListingInput {
  title: string;
  description: string;
  price: number;
  neighborhood: string;
  condition: Condition;
  imageUrl: string;
  sellerContact: SellerContact;
  isAuction: boolean;
}
