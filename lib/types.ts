/**
 * Tipos TypeScript para o schema da base de dados AZMAR (Supabase/PostgreSQL)
 */

// ─── Enums ────────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'team' | 'client';

export type SubscriptionStatus = 'active' | 'suspended' | 'cancelled';

export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'cancelled';

export type InvoiceStatus = 'issued' | 'pending' | 'overdue';

export type ProjectCategory =
  | 'website'
  | 'branding'
  | 'marketing'
  | 'social'
  | 'event'
  | 'sport';

export type ProjectStatus = 'public' | 'hidden';

export type ReviewStatus = 'published' | 'pending' | 'hidden';

export type QuoteStatus =
  | 'new'
  | 'contacted'
  | 'in_proposal'
  | 'closed'
  | 'lost';

export type SupportRequestType =
  | 'site_change'
  | 'new_post'
  | 'technical'
  | 'meeting'
  | 'other';

export type SupportRequestStatus =
  | 'received'
  | 'analysing'
  | 'in_progress'
  | 'done'
  | 'closed';

export type SupportPriority = 'low' | 'medium' | 'high';

// ─── Tabelas ──────────────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  user_id: string;
  name: string;
  business_name: string;
  email: string;
  phone: string | null;
  nif: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  setup_price: number;
  monthly_price: number;
  features: string[];
  is_active: boolean;
  is_featured: boolean;
  order: number;
  badge: string | null; // ex: "Mais popular"
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  client_id: string;
  package_id: string;
  status: SubscriptionStatus;
  start_date: string;
  next_billing: string | null;
  monthly_price: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joins
  package?: Package;
  client?: Client;
}

export interface Payment {
  id: string;
  client_id: string;
  subscription_id: string | null;
  amount: number;
  status: PaymentStatus;
  method: string | null;
  paid_at: string | null;
  due_date: string | null;
  proof_url: string | null;
  description: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joins
  client?: Client;
}

export interface Invoice {
  id: string;
  client_id: string;
  payment_id: string | null;
  document_number: string;
  amount: number;
  status: InvoiceStatus;
  issued_at: string;
  file_url: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  // Joins
  client?: Client;
}

export interface PortfolioProject {
  id: string;
  name: string;
  slug: string;
  category: ProjectCategory;
  short_description: string;
  problem: string | null;
  solution: string | null;
  result: string | null;
  cover_url: string | null;
  website_url: string | null;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
  // Joins
  images?: PortfolioImage[];
}

export interface PortfolioImage {
  id: string;
  project_id: string;
  url: string;
  alt: string | null;
  order: number;
  created_at: string;
}

export interface Review {
  id: string;
  client_name: string;
  business_name: string;
  photo_url: string | null;
  text: string;
  rating: number;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  business_name: string;
  activity: string | null;
  location: string | null;
  current_website: string | null;
  social_links: string | null;
  service: string | null;
  package_interest: string | null;
  budget: string | null;
  message: string | null;
  status: QuoteStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupportRequest {
  id: string;
  client_id: string;
  type: SupportRequestType;
  subject: string;
  description: string;
  priority: SupportPriority;
  status: SupportRequestStatus;
  attachments: string[];
  created_at: string;
  updated_at: string;
  // Joins
  client?: Client;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  description: string | null;
  updated_at: string;
}

export interface LegalPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  updated_at: string;
}
