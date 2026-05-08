-- ============================================================
-- AZMAR — Fix RLS Policies para Admin
-- Execute no SQL Editor do Supabase
-- ============================================================

-- O problema: o admin usa o service_role ou anon key do browser
-- e as policies atuais podem estar a bloquear.
-- Esta migração garante que admins acedem a tudo.

-- Recria a função is_admin de forma mais robusta
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role IN ('admin', 'team')
  );
EXCEPTION WHEN OTHERS THEN
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Garante que os admins podem fazer INSERT em clients
DROP POLICY IF EXISTS "Admin gere clientes" ON clients;
CREATE POLICY "Admin gere clientes" ON clients
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem fazer INSERT em payments
DROP POLICY IF EXISTS "Admin gere pagamentos" ON payments;
CREATE POLICY "Admin gere pagamentos" ON payments
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem fazer INSERT em invoices
DROP POLICY IF EXISTS "Admin gere faturas" ON invoices;
CREATE POLICY "Admin gere faturas" ON invoices
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem fazer INSERT em portfolio_projects
DROP POLICY IF EXISTS "Admin gere portfolio" ON portfolio_projects;
CREATE POLICY "Admin gere portfolio" ON portfolio_projects
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem fazer INSERT em portfolio_images
DROP POLICY IF EXISTS "Admin gere imagens" ON portfolio_images;
CREATE POLICY "Admin gere imagens" ON portfolio_images
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem gerir quote_requests
DROP POLICY IF EXISTS "Admin vê todas as leads" ON quote_requests;
CREATE POLICY "Admin vê todas as leads" ON quote_requests
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem gerir support_requests
DROP POLICY IF EXISTS "Admin gere pedidos de suporte" ON support_requests;
CREATE POLICY "Admin gere pedidos de suporte" ON support_requests
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem gerir subscriptions
DROP POLICY IF EXISTS "Admin gere subscrições" ON subscriptions;
CREATE POLICY "Admin gere subscrições" ON subscriptions
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem gerir reviews
DROP POLICY IF EXISTS "Admin gere reviews" ON reviews;
CREATE POLICY "Admin gere reviews" ON reviews
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem gerir FAQs
DROP POLICY IF EXISTS "Admin gere FAQs" ON faqs;
CREATE POLICY "Admin gere FAQs" ON faqs
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem gerir packages
DROP POLICY IF EXISTS "Admin gere pacotes" ON packages;
CREATE POLICY "Admin gere pacotes" ON packages
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem gerir site_settings
DROP POLICY IF EXISTS "Admin gere settings" ON site_settings;
CREATE POLICY "Admin gere settings" ON site_settings
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem gerir legal_pages
DROP POLICY IF EXISTS "Admin gere páginas legais" ON legal_pages;
CREATE POLICY "Admin gere páginas legais" ON legal_pages
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Garante que os admins podem gerir profiles
DROP POLICY IF EXISTS "Admin vê todos os perfis" ON profiles;
CREATE POLICY "Admin vê todos os perfis" ON profiles
  FOR ALL USING (is_admin())
  WITH CHECK (is_admin());

-- Storage: Admin pode fazer tudo
DROP POLICY IF EXISTS "Admin upload portfolio" ON storage.objects;
CREATE POLICY "Admin upload portfolio" ON storage.objects
  FOR ALL USING (bucket_id = 'portfolio' AND is_admin())
  WITH CHECK (bucket_id = 'portfolio' AND is_admin());

DROP POLICY IF EXISTS "Admin upload faturas" ON storage.objects;
CREATE POLICY "Admin upload faturas" ON storage.objects
  FOR ALL USING (bucket_id = 'invoices' AND is_admin())
  WITH CHECK (bucket_id = 'invoices' AND is_admin());

DROP POLICY IF EXISTS "Admin upload comprovativos" ON storage.objects;
CREATE POLICY "Admin upload comprovativos" ON storage.objects
  FOR ALL USING (bucket_id = 'payments' AND is_admin())
  WITH CHECK (bucket_id = 'payments' AND is_admin());
