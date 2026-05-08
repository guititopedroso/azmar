-- Seed das definições do site
INSERT INTO site_settings (key, value, description) VALUES
  ('contact_email', 'geral@azmar.pt', 'Email principal de contacto'),
  ('contact_phone', '+351 912 345 678', 'Telefone de contacto'),
  ('whatsapp_number', '351912345678', 'Número WhatsApp (sem +)'),
  ('instagram_url', 'https://instagram.com/azmar.pt', 'URL do Instagram'),
  ('linkedin_url', 'https://linkedin.com/company/azmar-pt', 'URL do LinkedIn'),
  ('tiktok_url', '', 'URL do TikTok'),
  ('location_text', 'Setúbal · Margem Sul · Lisboa · Portugal', 'Texto de localização no site')
ON CONFLICT (key) DO NOTHING;

-- Seed de FAQs iniciais
INSERT INTO faqs (question, answer, "order", is_active) VALUES
  ('Qual é o tempo médio para criar um website?', 'Dependendo da complexidade, entre 5 a 15 dias úteis. Websites simples (landing pages) ficam prontos em 5-7 dias. Websites mais completos com 5+ páginas podem levar 2-3 semanas.', 1, true),
  ('Fico com o website quando o contrato terminar?', 'Sim, o website é teu. Utilizamos plataformas abertas e podes levar o site para onde quiseres. Recomendamos manter o nosso plano de manutenção para atualizações e suporte contínuo.', 2, true),
  ('O que está incluído na mensalidade?', 'A mensalidade inclui: alojamento web, domínio .pt ou .com, certificado SSL (HTTPS), backups automáticos, suporte por email e WhatsApp, e pequenas atualizações de conteúdo (textos, imagens).', 3, true),
  ('Posso cancelar a qualquer momento?', 'Sim, sem fidelização obrigatória. Pede o cancelamento com 30 dias de antecedência. Não há penalizações.', 4, true),
  ('Trabalham com negócios fora de Setúbal?', 'Sim! Trabalhamos com clientes em toda Portugal em formato 100% remoto. A maioria das reuniões é por videochamada.', 5, true),
  ('Fazem loja online (e-commerce)?', 'Sim, desenvolvemos lojas online com carrinho de compras, pagamentos online e gestão de produtos. Fala connosco para uma proposta.', 6, true)
ON CONFLICT DO NOTHING;
