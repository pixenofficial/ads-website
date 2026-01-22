
export type UserRole = 'buyer' | 'seller';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  username: string;
  avatar_url?: string;
  email: string;
  created_at: string;
}

export interface SellerProfile extends Profile {
  country: string;
  address: string;
  contact_number: string;
  whatsapp_number: string;
  subscription_type: 'silver' | 'gold' | null;
  subscription_expiry: string | null;
}

export interface Ad {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  images: string[];
  created_at: string;
  status: 'active' | 'sold' | 'expired';
  views: number;
  clicks: number;
  seller?: SellerProfile;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  package: 'silver' | 'gold';
  status: 'completed' | 'failed';
  payment_method: string;
  created_at: string;
}

export interface Stats {
  total_ads: number;
  total_views: number;
  total_clicks: number;
  contacts: number;
}
