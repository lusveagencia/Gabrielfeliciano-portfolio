---
documento: Regras de Seguranca
projeto: {Nome do Projeto}
autor: @seguranca (Soren)
fase: 2 — Fundacao
versao: 1.0
status: rascunho
criado_em: {YYYY-MM-DD}
atualizado_em: {YYYY-MM-DD}
dependencias: [brief.md, arquitetura.md]
stack: {stack do projeto}
---

# Regras de Seguranca: {Nome do Projeto}

---

## 1. Autenticacao e Sessao

- [ ] Metodo de auth: {magic link / OAuth / email+senha}
- [ ] MFA obrigatorio para: {roles criticos}
- [ ] Session timeout: {tempo} de inatividade
- [ ] Token rotation: {estrategia}
- [ ] Protecao contra brute force: {rate limiting}

---

## 2. Autorizacao (RLS / Roles)

- [ ] RLS habilitado em TODAS as tabelas com dados de usuario
- [ ] Politicas de acesso por role documentadas
- [ ] Principio do menor privilegio aplicado
- [ ] Service role key NUNCA exposta ao client
- [ ] Anon key com permissoes minimas

### Politicas Obrigatorias

```sql
-- Template: cada tabela com user_id
CREATE POLICY "own_data_only" ON {tabela}
  FOR ALL USING (auth.uid() = user_id);
```

---

## 3. Input Validation

- [ ] TODA input do usuario validada server-side (Zod/Yup)
- [ ] Parametrized queries (NUNCA concatenar SQL)
- [ ] File upload: validar tipo, tamanho, conteudo
- [ ] Rate limiting em endpoints publicos
- [ ] Sanitizacao de output (XSS prevention)

### Regras Especificas

| Campo | Validacao | Max Length |
|-------|-----------|-----------|
| email | formato email valido | 254 |
| nome | alphanumeric + espacos | 100 |
| {campo} | {regra} | {max} |

---

## 4. Secrets Management

- [ ] .env NUNCA commitado (verificar .gitignore)
- [ ] Secrets em variaveis de ambiente do deploy (Vercel/Railway)
- [ ] NENHUM secret hardcoded no codigo
- [ ] API keys com scope minimo necessario
- [ ] Rotacao de secrets: {periodicidade}

### Secrets do Projeto

| Secret | Onde Usar | Exposicao Client |
|--------|-----------|-----------------|
| SUPABASE_ANON_KEY | Client OK | Sim (seguro com RLS) |
| SUPABASE_SERVICE_ROLE | Server ONLY | NUNCA |
| {secret} | {onde} | {sim/nao} |

---

## 5. Headers de Seguranca

```typescript
// next.config.js ou middleware
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // CSP conforme necessidade do projeto
];
```

---

## 6. CORS

- [ ] Origins permitidos: {lista explicita, NUNCA "*" em prod}
- [ ] Methods permitidos: {GET, POST, etc.}
- [ ] Credentials: {true/false}

---

## 7. Logging de Seguranca

- [ ] Login attempts (sucesso e falha) logados
- [ ] Mudancas de permissao logadas
- [ ] Acesso a dados sensiveis logado
- [ ] NUNCA logar: senhas, tokens, dados de cartao, CPF completo

---

## 8. Dependencias

- [ ] npm audit sem vulnerabilidades Critical/High
- [ ] Dependencias atualizadas
- [ ] Lock file commitado (package-lock.json)
- [ ] Nenhuma dependencia abandonada (>2 anos sem update)

---

## Checklist Pre-Deploy

- [ ] .env.example atualizado (sem valores reais)
- [ ] RLS testado com diferentes roles
- [ ] Rate limiting configurado
- [ ] Headers de seguranca ativos
- [ ] HTTPS forcado
- [ ] Error messages genericas para usuario (sem stack traces)
- [ ] Secrets em env vars do provider (nao em codigo)
