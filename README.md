# AZMAR — Setup Guide

## 🚀 Início Rápido

### 1. Instala as dependências

```bash
npm install
```

### 2. Configura as variáveis de ambiente

```bash
cp .env.example .env.local
```

Abre `.env.local` e preenche com os teus valores:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
AZMAR_CONTACT_EMAIL=geral@azmar.pt
RESEND_API_KEY=re_...   # opcional na Fase 1
```

### 3. Configura o Supabase

#### a) Cria um projeto em [supabase.com](https://supabase.com)

#### b) Executa o schema SQL

No Supabase Dashboard → **SQL Editor** → **New Query**, cola o conteúdo de:

```
supabase/migrations/001_initial_schema.sql
```

Clica **Run**. Isto cria todas as tabelas, RLS policies e Storage buckets.

#### c) Configura a autenticação

No Supabase Dashboard → **Authentication** → **URL Configuration**:
- **Site URL**: `http://localhost:3000` (dev) ou o teu domínio de produção
- **Redirect URLs**: adiciona `http://localhost:3000/**`

#### d) Cria o primeiro utilizador Admin

No Supabase Dashboard → **Authentication** → **Users** → **Add User**:
- Email: o teu email de admin
- Password: uma password segura

Depois no **SQL Editor**, executa:
```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'teu-email@exemplo.com';
```

### 4. Corre o servidor de desenvolvimento

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## 📁 Estrutura do Projeto

```
azmar/
├── app/
│   ├── (public)/           # Páginas públicas
│   ├── login/              # Página de login
│   ├── dashboard/          # Área de cliente
│   └── admin/              # Painel admin
├── components/
│   ├── layout/             # Header, Footer, etc.
│   ├── dashboard/          # Sidebar do cliente
│   └── admin/              # Sidebar do admin
├── lib/
│   ├── supabase/           # Clientes Supabase
│   ├── types.ts            # Tipos TypeScript
│   └── utils.ts            # Utilitários
└── supabase/
    └── migrations/         # SQL migrations
```

---

## 🔑 Tipos de Utilizador

| Role | Acesso |
|---|---|
| `admin` | Tudo — painel admin completo |
| `team` | Painel admin (sem definições críticas) |
| `client` | Apenas o seu dashboard pessoal |

---

## 🌊 Storage Buckets (Supabase)

| Bucket | Acesso | Uso |
|---|---|---|
| `portfolio` | Público | Imagens de projetos |
| `invoices` | Privado | PDFs de faturas |
| `payments` | Privado | Comprovativos de pagamento |
| `avatars` | Público | Fotos de perfil |

---

## 🚢 Deploy em Vercel

1. Push do código para GitHub
2. Importa o projeto no [Vercel](https://vercel.com)
3. Configura as variáveis de ambiente (as mesmas do `.env.local`)
4. Adiciona o domínio em produção nas configurações do Supabase Auth

---

## 📋 Fase 1 MVP — Funcionalidades

### Páginas Públicas
- ✅ Home (Hero, Serviços, Para quem, Como funciona, Pacotes, Reviews, CTA)
- ✅ Serviços
- ✅ Pacotes (com tabela comparativa)
- ✅ Portefólio (com filtros por categoria)
- ✅ Pedir Orçamento (formulário completo)
- ✅ Contactos (mapa + formulário rápido)
- ✅ Sobre a AZMAR
- ✅ FAQ
- ✅ Termos e Condições
- ✅ Política de Privacidade
- ✅ Política de Cookies
- ✅ Livro de Reclamações

### Área de Cliente
- ✅ Login (email + password)
- ✅ Dashboard (visão geral)
- ✅ Subscrições
- ✅ Pagamentos
- ✅ Faturas (download PDF)
- ✅ Pedidos de suporte
- ✅ Histórico

### Painel Admin
- ✅ Dashboard (métricas)
- ✅ Gestão de clientes
- ✅ Gestão de portefólio
- ✅ Gestão de leads
- ✅ Gestão de pagamentos (manual)
- ✅ Upload de faturas PDF
- ✅ Gestão de pedidos de suporte

---

## 🔜 Fase 2 (próximo)

- Reviews (CRUD admin + formulário público)
- FAQ editável no admin
- Notificações por email (Resend)
- Gestão de conteúdo do site
- Animações avançadas
- SEO avançado + Open Graph imagens
