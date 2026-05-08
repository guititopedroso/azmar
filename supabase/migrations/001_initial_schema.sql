-- ============================================================
-- AZMAR — Supabase Database Migration
-- Schema v1.0 — Fase 1 MVP
-- ============================================================
-- Execute este ficheiro no SQL Editor do Supabase
-- Project Settings → SQL Editor → New Query
-- ============================================================

-- Extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- PROFILES (estende auth.users do Supabase)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text UNIQUE NOT NULL,
  role        text NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'team', 'client')),
  full_name   text,
  avatar_url  text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Trigger: cria perfil automaticamente quando utilizador é criado
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- ────────────────────────────────────────────────────────────
-- CLIENTS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clients (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name          text NOT NULL,
  business_name text NOT NULL,
  email         text NOT NULL,
  phone         text,
  nif           text,
  address       text,
  notes         text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- PACKAGES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS packages (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          text NOT NULL,
  slug          text UNIQUE NOT NULL,
  description   text,
  setup_price   numeric(10,2) NOT NULL DEFAULT 0,
  monthly_price numeric(10,2) NOT NULL DEFAULT 0,
  features      jsonb NOT NULL DEFAULT '[]',
  is_active     boolean NOT NULL DEFAULT true,
  is_featured   boolean NOT NULL DEFAULT false,
  badge         text,
  "order"       integer NOT NULL DEFAULT 0,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- Seed: Pacotes iniciais
INSERT INTO packages (name, slug, description, setup_price, monthly_price, features, is_active, is_featured, badge, "order")
VALUES
  (
    'Pack Start', 'start',
    'Para negócios que precisam de presença digital básica e profissional.',
    150, 25,
    '["Landing page simples", "Design responsivo", "Botão WhatsApp", "Google Maps", "Formulário de contacto", "SEO básico"]',
    true, false, null, 1
  ),
  (
    'Pack Business', 'business',
    'Website completo e imagem mais profissional para o teu negócio.',
    400, 60,
    '["Website até 5 páginas", "Home, Serviços, Sobre, Contactos", "Portefólio ou galeria", "Integração WhatsApp", "Google Maps", "SEO local básico", "Manutenção mensal", "Pequenas alterações incluídas"]',
    true, true, 'Mais popular', 2
  ),
  (
    'Pack Growth', 'growth',
    'Website, marketing e acompanhamento contínuo para crescer online.',
    750, 150,
    '["Website completo", "Branding básico", "Gestão de redes sociais", "Criação de conteúdos mensais", "Google Business", "Meta Ads setup", "Relatório mensal", "Manutenção completa", "Automações simples"]',
    true, false, 'Completo', 3
  )
ON CONFLICT (slug) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- SUBSCRIPTIONS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id     uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  package_id    uuid NOT NULL REFERENCES packages(id),
  status        text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'cancelled')),
  start_date    date NOT NULL DEFAULT CURRENT_DATE,
  next_billing  date,
  monthly_price numeric(10,2) NOT NULL DEFAULT 0,
  notes         text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- PAYMENTS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id       uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  subscription_id uuid REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount          numeric(10,2) NOT NULL,
  status          text NOT NULL DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue', 'cancelled')),
  method          text,
  paid_at         timestamptz,
  due_date        date,
  proof_url       text,
  description     text,
  notes           text,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- INVOICES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS invoices (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id       uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  payment_id      uuid REFERENCES payments(id) ON DELETE SET NULL,
  document_number text NOT NULL,
  amount          numeric(10,2) NOT NULL,
  status          text NOT NULL DEFAULT 'issued' CHECK (status IN ('issued', 'pending', 'overdue')),
  issued_at       date NOT NULL DEFAULT CURRENT_DATE,
  file_url        text,
  description     text,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- PORTFOLIO PROJECTS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              text NOT NULL,
  slug              text UNIQUE NOT NULL,
  category          text NOT NULL CHECK (category IN ('website', 'branding', 'marketing', 'social', 'event', 'sport')),
  short_description text NOT NULL DEFAULT '',
  problem           text,
  solution          text,
  result            text,
  cover_url         text,
  website_url       text,
  status            text NOT NULL DEFAULT 'hidden' CHECK (status IN ('public', 'hidden')),
  featured          boolean NOT NULL DEFAULT false,
  "order"           integer NOT NULL DEFAULT 0,
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- PORTFOLIO IMAGES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS portfolio_images (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id  uuid NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  url         text NOT NULL,
  alt         text,
  "order"     integer NOT NULL DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- REVIEWS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name   text NOT NULL,
  business_name text NOT NULL,
  photo_url     text,
  text          text NOT NULL,
  rating        integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  status        text NOT NULL DEFAULT 'pending' CHECK (status IN ('published', 'pending', 'hidden')),
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- QUOTE REQUESTS (Pedidos de orçamento)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quote_requests (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             text NOT NULL,
  email            text NOT NULL,
  phone            text,
  business_name    text NOT NULL,
  activity         text,
  location         text,
  current_website  text,
  social_links     text,
  service          text,
  package_interest text,
  budget           text,
  message          text,
  status           text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_proposal', 'closed', 'lost')),
  notes            text,
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- SUPPORT REQUESTS (Pedidos de cliente)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS support_requests (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id   uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  type        text NOT NULL CHECK (type IN ('site_change', 'new_post', 'technical', 'meeting', 'other')),
  subject     text NOT NULL,
  description text NOT NULL,
  priority    text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status      text NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'analysing', 'in_progress', 'done', 'closed')),
  attachments jsonb NOT NULL DEFAULT '[]',
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- FAQs
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
  id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  question   text NOT NULL,
  answer     text NOT NULL,
  "order"    integer NOT NULL DEFAULT 0,
  is_active  boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- SITE SETTINGS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  key         text PRIMARY KEY,
  value       text NOT NULL DEFAULT '',
  description text,
  updated_at  timestamptz DEFAULT now()
);

INSERT INTO site_settings (key, value, description) VALUES
  ('contact_email', 'geral@azmar.pt', 'Email principal de contacto'),
  ('contact_phone', '+351 912 345 678', 'Telefone principal'),
  ('whatsapp_number', '351912345678', 'Número WhatsApp (sem +)'),
  ('instagram_url', 'https://instagram.com/azmar.pt', 'URL Instagram'),
  ('linkedin_url', 'https://linkedin.com/company/azmar-pt', 'URL LinkedIn'),
  ('tiktok_url', '', 'URL TikTok'),
  ('location_text', 'Setúbal · Margem Sul · Lisboa · Portugal', 'Texto de localização')
ON CONFLICT (key) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- LEGAL PAGES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS legal_pages (
  id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug       text UNIQUE NOT NULL,
  title      text NOT NULL,
  content    text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

INSERT INTO legal_pages (slug, title, content) VALUES
  ('termos', 'Termos e Condições', 'Conteúdo a preencher.'),
  ('privacidade', 'Política de Privacidade', 'Conteúdo a preencher.'),
  ('cookies', 'Política de Cookies', 'Conteúdo a preencher.'),
  ('reclamacoes', 'Livro de Reclamações', 'Conteúdo a preencher.')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Activa RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Helper: verifica se o utilizador é admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role IN ('admin', 'team')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper: verifica se o utilizador é admin (apenas admin, não team)
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ── PROFILES ──────────────────────────────────────────────
CREATE POLICY "Próprio perfil" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admin vê todos os perfis" ON profiles
  FOR ALL USING (is_admin());

-- ── PACKAGES (públicos para leitura) ────────────────────────
CREATE POLICY "Pacotes públicos leitura" ON packages
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin gere pacotes" ON packages
  FOR ALL USING (is_admin());

-- ── CLIENTS ──────────────────────────────────────────────
CREATE POLICY "Cliente vê o seu perfil" ON clients
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admin gere clientes" ON clients
  FOR ALL USING (is_admin());

-- ── SUBSCRIPTIONS ─────────────────────────────────────────
CREATE POLICY "Cliente vê as suas subscrições" ON subscriptions
  FOR SELECT USING (
    client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())
  );

CREATE POLICY "Admin gere subscrições" ON subscriptions
  FOR ALL USING (is_admin());

-- ── PAYMENTS ─────────────────────────────────────────────
CREATE POLICY "Cliente vê os seus pagamentos" ON payments
  FOR SELECT USING (
    client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())
  );

CREATE POLICY "Admin gere pagamentos" ON payments
  FOR ALL USING (is_admin());

-- ── INVOICES ─────────────────────────────────────────────
CREATE POLICY "Cliente vê as suas faturas" ON invoices
  FOR SELECT USING (
    client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())
  );

CREATE POLICY "Admin gere faturas" ON invoices
  FOR ALL USING (is_admin());

-- ── SUPPORT REQUESTS ─────────────────────────────────────
CREATE POLICY "Cliente vê os seus pedidos" ON support_requests
  FOR SELECT USING (
    client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())
  );

CREATE POLICY "Cliente cria pedidos" ON support_requests
  FOR INSERT WITH CHECK (
    client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())
  );

CREATE POLICY "Admin gere pedidos de suporte" ON support_requests
  FOR ALL USING (is_admin());

-- ── PORTFOLIO (público para leitura) ─────────────────────
CREATE POLICY "Projetos públicos visíveis" ON portfolio_projects
  FOR SELECT USING (status = 'public');

CREATE POLICY "Admin gere portfolio" ON portfolio_projects
  FOR ALL USING (is_admin());

CREATE POLICY "Imagens públicas visíveis" ON portfolio_images
  FOR SELECT USING (
    project_id IN (SELECT id FROM portfolio_projects WHERE status = 'public')
  );

CREATE POLICY "Admin gere imagens" ON portfolio_images
  FOR ALL USING (is_admin());

-- ── REVIEWS ──────────────────────────────────────────────
CREATE POLICY "Reviews publicadas visíveis" ON reviews
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin gere reviews" ON reviews
  FOR ALL USING (is_admin());

-- ── QUOTE REQUESTS ────────────────────────────────────────
CREATE POLICY "Qualquer pessoa pode submeter lead" ON quote_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin vê todas as leads" ON quote_requests
  FOR ALL USING (is_admin());

-- ── FAQs (público) ────────────────────────────────────────
CREATE POLICY "FAQs ativas visíveis" ON faqs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin gere FAQs" ON faqs
  FOR ALL USING (is_admin());

-- ── SITE SETTINGS (público leitura) ──────────────────────
CREATE POLICY "Settings públicas leitura" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Admin gere settings" ON site_settings
  FOR ALL USING (is_super_admin());

-- ── LEGAL PAGES (público leitura) ────────────────────────
CREATE POLICY "Legal pages públicas" ON legal_pages
  FOR SELECT USING (true);

CREATE POLICY "Admin gere páginas legais" ON legal_pages
  FOR ALL USING (is_admin());

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
-- Cria buckets no Supabase Storage (executa no SQL Editor)

INSERT INTO storage.buckets (id, name, public) VALUES
  ('portfolio', 'portfolio', true),
  ('invoices', 'invoices', false),
  ('payments', 'payments', false),
  ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage
CREATE POLICY "Portfolio público" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');

CREATE POLICY "Admin upload portfolio" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND is_admin());

CREATE POLICY "Cliente download faturas" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'invoices'
    AND (
      is_admin()
      OR (auth.uid() IS NOT NULL)  -- Refinado por RLS de invoices
    )
  );

CREATE POLICY "Admin upload faturas" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'invoices' AND is_admin());

CREATE POLICY "Admin upload comprovativos" ON storage.objects
  FOR ALL USING (bucket_id = 'payments' AND is_admin());

-- ============================================================
-- FIM DA MIGRAÇÃO
-- ============================================================
