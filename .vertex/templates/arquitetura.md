---
documento: Arquitetura
projeto: {Nome do Projeto}
autor: @arquiteto (Ariel)
fase: 2 — Fundacao
versao: 1.0
status: rascunho
criado_em: {YYYY-MM-DD}
atualizado_em: {YYYY-MM-DD}
dependencias: [brief.md]
---

# Arquitetura: {Nome do Projeto}

---

## 1. Stack Tecnologico

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Frontend | {ex: Next.js 14} | {por que} |
| Styling | {ex: Tailwind CSS} | {por que} |
| Backend | {ex: Supabase} | {por que} |
| Database | {ex: PostgreSQL (Supabase)} | {por que} |
| Auth | {ex: Supabase Auth} | {por que} |
| Deploy | {ex: Vercel} | {por que} |
| Linguagem | {ex: TypeScript} | {por que} |

---

## 2. Database Schema

### Tabelas Principais

```sql
-- {tabela1}
CREATE TABLE {tabela1} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  -- campos...
);

-- {tabela2}
CREATE TABLE {tabela2} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  -- campos...
);
```

### Relacoes

```
{tabela1} 1:N {tabela2}
{tabela2} N:1 {tabela3}
```

### RLS (Row Level Security)

```sql
-- Exemplo: usuarios so veem seus proprios dados
ALTER TABLE {tabela1} ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_data" ON {tabela1}
  FOR ALL USING (auth.uid() = user_id);
```

---

## 3. API / Endpoints

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | /api/{recurso} | {descricao} | {sim/nao} |
| POST | /api/{recurso} | {descricao} | {sim/nao} |

---

## 4. Estrutura de Pastas

```
src/
├── app/                    # Routes (App Router)
│   ├── (auth)/            # Rotas autenticadas
│   ├── (public)/          # Rotas publicas
│   └── api/               # API routes
├── components/
│   ├── ui/                # Design System components
│   └── features/          # Feature-specific components
├── lib/
│   ├── supabase/          # Client e server clients
│   ├── utils/             # Utilidades
│   └── hooks/             # Custom hooks
├── types/                  # TypeScript types
└── styles/
    └── tokens.css         # Design System tokens
```

---

## 5. Autenticacao e Autorizacao

**Metodo:** {ex: Supabase Auth com magic link + OAuth}
**Roles:** {ex: admin, user, viewer}
**Protecao de rotas:** {ex: middleware Next.js}

---

## 6. Deploy e Infra

**Ambiente:** {ex: Vercel (frontend) + Supabase (backend)}
**CI/CD:** {ex: GitHub Actions ou Vercel auto-deploy}
**Environments:** {dev, staging, prod}

---

## 7. Decisoes Arquiteturais

| Decisao | Alternativa Rejeitada | Motivo |
|---------|----------------------|--------|
| {decisao 1} | {alternativa} | {por que rejeitou} |
| {decisao 2} | {alternativa} | {por que rejeitou} |
