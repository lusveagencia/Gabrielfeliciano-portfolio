# Checklist: Auditoria de Seguranca

> Usado por @seguranca na Fase 4 para auditoria completa do sistema.

---

## 1. Secrets e Credentials

- [ ] Nenhum secret/token/API key em codigo versionado
- [ ] .env no .gitignore
- [ ] Nenhum secret em logs ou console.log
- [ ] Service role keys NUNCA expostas ao client
- [ ] Nenhum secret em URLs (query params)
- [ ] git history limpo (sem secrets em commits antigos)

## 2. Autenticacao

- [ ] Senhas com hash forte (bcrypt/argon2, NUNCA md5/sha1)
- [ ] Protecao contra brute force (rate limiting em login)
- [ ] Session tokens com expiracao adequada
- [ ] Logout invalida a sessao no servidor
- [ ] Password reset seguro (token temporario, single-use)
- [ ] OAuth state parameter validado (CSRF protection)

## 3. Autorizacao (IDOR / Access Control)

- [ ] RLS habilitado em tabelas com dados de usuario
- [ ] Nenhum endpoint retorna dados de outros usuarios
- [ ] IDs em URLs/params nao permitem acesso a dados alheios
- [ ] Roles verificados server-side (nao apenas client)
- [ ] Admin routes protegidas por role check server-side
- [ ] API keys com scope minimo (least privilege)

## 4. Input Validation

- [ ] TODA input validada server-side (Zod, Yup, ou similar)
- [ ] Queries parametrizadas (NUNCA concatenacao SQL)
- [ ] File upload: tipo validado (magic bytes, nao apenas extensao)
- [ ] File upload: tamanho limitado
- [ ] Nenhum eval() ou Function() com input do usuario
- [ ] Path traversal prevenido (../ em file paths)

## 5. Output Encoding (XSS)

- [ ] HTML output escapado por padrao (React faz isso)
- [ ] Nenhum dangerouslySetInnerHTML com input nao sanitizado
- [ ] URLs validadas antes de render (previne javascript: protocol)
- [ ] CSP headers configurados
- [ ] Cookies com flags: HttpOnly, Secure, SameSite

## 6. CSRF

- [ ] State mutations usam POST/PUT/DELETE (nunca GET)
- [ ] CSRF tokens em formularios (se nao SPA puro)
- [ ] SameSite cookie attribute definido
- [ ] CORS restritivo (origins explicitos, nao "*")

## 7. Headers de Seguranca

- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY (ou CSP frame-ancestors)
- [ ] Strict-Transport-Security (HSTS)
- [ ] Referrer-Policy adequada
- [ ] Permissions-Policy restritivo

## 8. Dependencias

- [ ] npm audit: zero Critical, zero High
- [ ] Nenhuma dependencia abandonada (>2 anos)
- [ ] Lock file commitado
- [ ] Dependencias de dev nao no bundle de producao

## 9. Error Handling

- [ ] Erros genericos para usuario (sem stack traces)
- [ ] Erros detalhados apenas em logs internos
- [ ] 404/500 pages customizadas (sem info sensivel)
- [ ] Nenhuma exception nao tratada que crasha o app

## 10. AI-App Specific (se aplicavel)

- [ ] Client NAO decide preco, role, ou permissoes
- [ ] Server valida TUDO que client envia (nao confia)
- [ ] Nenhum dado sensivel em localStorage/sessionStorage
- [ ] API routes protegidas (auth check em TODA route)
- [ ] RLS policies testadas com cenarios adversariais

## Severidade dos Findings

| Severidade | Criterio | Acao |
|-----------|---------|------|
| **Critical** | Exploravel, impacto alto, sem mitigacao | BLOQUEAR |
| **High** | Exploravel, impacto medio-alto | BLOQUEAR |
| **Medium** | Requer condicoes, impacto medio | CORRIGIR |
| **Low** | Difícil explorar, impacto baixo | DOCUMENTAR |
| **Info** | Best practice, nao vulnerability | INFORMAR |

## Veredicto

- [ ] **APROVADO** — Zero Critical/High findings
- [ ] **VULNERABILIDADES** — Findings que devem ser corrigidos

### Findings
| # | Severidade | Descricao | Local | Fix |
|---|-----------|-----------|-------|-----|
| 1 | {C/H/M/L} | {descricao} | {arquivo:linha} | {como corrigir} |
