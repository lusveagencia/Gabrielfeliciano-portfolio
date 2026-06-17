# Workflow Padrao — Web Apps, SaaS e Dashboards

> Para projetos de media complexidade: web apps, dashboards, SaaS, sistemas internos.

## Quando Usar

- Web application com autenticacao
- Dashboard com dados e graficos
- SaaS product (MVP ou completo)
- Sistema interno de empresa
- E-commerce simples (sem pagamento critico)
- Plataforma com CRUD e roles

## Agentes Ativos

| Agente | Participa | Fase |
|--------|-----------|------|
| @estrategista | Sim | Fase 1 |
| @arquiteto | Sim | Fase 2 |
| @designer | Sim | Fase 2 + Fase 4 |
| @dev | Sim | Fase 3 |
| @seguranca | Sim | Fase 2 + Fase 4 |
| @juridico | Sim | Fase 2 + Fase 4 |
| @revisor | Sim | Fase 4 |

## Fluxo Completo

```
FASE 1: DESCOBERTA
@estrategista
├── Brief completo
├── Requisitos funcionais e nao-funcionais
└── Gate: usuario aprova brief
        │
        ▼
FASE 2: FUNDACAO (sequencial)
@arquiteto → docs/arquitetura.md
@designer  → docs/design-system/ (tokens + showcase)
@seguranca → docs/regras-seguranca.md
@juridico  → docs/regras-lgpd.md
└── Gate: todos os artefatos produzidos e revisados
        │
        ▼
FASE 3: CONSTRUCAO (iterativa)
@dev
├── Feature 1 → implementar → testar
├── Feature 2 → implementar → testar
├── Feature N → implementar → testar
└── Gate: declara feature/sprint completa
        │
        ▼
FASE 4: VALIDACAO (orquestrada)
@revisor (orchestrates)
├── Code review + testes + criteria
├── @seguranca → auditoria OWASP
├── @juridico → compliance LGPD
├── @designer → fidelidade Design System
└── Gate: APROVADO / CORRIGIR / BLOQUEAR
```

## Fase 1: Descoberta

@estrategista produz:
- **docs/brief.md** — contexto completo do projeto
  - Problema que resolve
  - Publico-alvo (personas se aplicavel)
  - Objetivos de negocio
  - Concorrentes/referencias
  - Constraints (prazo, budget, tech)
- **docs/requisitos.md** — requisitos detalhados
  - Funcionais (features, user stories)
  - Nao-funcionais (performance, seguranca, escalabilidade)
  - Integrações necessarias (APIs, servicos)

**Gate:** Usuario revisa e aprova o brief.

## Fase 2: Fundacao

Sequencia obrigatoria (cada agente depende do anterior):

1. **@arquiteto** produz `docs/arquitetura.md`:
   - Tech stack com justificativa
   - Database schema (tabelas, relacoes, RLS)
   - API endpoints (REST ou tRPC)
   - Folder structure
   - Auth strategy (Supabase Auth, NextAuth, etc.)
   - Deployment strategy

2. **@designer** produz `docs/design-system/`:
   - tokens.json (W3C Design Tokens)
   - tokens.css (CSS custom properties)
   - showcase.html (componentes visuais)
   - Metodologia: Strategy → Structure → System → Composition → Refinement

3. **@seguranca** produz `docs/regras-seguranca.md`:
   - Regras especificas para o stack escolhido
   - Configuracao de RLS (Row Level Security)
   - Auth/authz patterns obrigatorios
   - Headers de seguranca
   - Input validation rules
   - Secrets management policy

4. **@juridico** produz `docs/regras-lgpd.md`:
   - Mapeamento de dados pessoais
   - Base legal por dado
   - Requisitos de consentimento
   - Politica de retencao
   - Direitos do titular
   - Cookie policy

**Gate:** Todos os artefatos existem e foram revisados.

## Fase 3: Construcao

@dev trabalha iterativamente:
- Implementa feature por feature
- Segue constraints de todos os docs da Fase 2
- Testa cada feature antes de seguir
- Faz commits atomicos e descritivos

**Constraints que @dev DEVE seguir:**
- Arquitetura: conforme docs/arquitetura.md
- Visual: conforme docs/design-system/tokens.css (NUNCA valores magicos)
- Seguranca: conforme docs/regras-seguranca.md
- LGPD: conforme docs/regras-lgpd.md

**Gate:** @dev declara feature/sprint completa.

## Fase 4: Validacao

@revisor orquestra:

1. **Code Review** (proprio @revisor):
   - Qualidade de codigo
   - Cobertura de testes
   - Performance
   - Error handling
   - Acceptance criteria

2. **Seguranca** (@seguranca):
   - Auditoria 7-step completa
   - OWASP Top 10 scan
   - AI-app pitfalls check
   - Produce: APROVADO ou Remediation Guide

3. **LGPD** (@juridico):
   - Verificacao de compliance
   - Cookie consent funcional?
   - Exclusao de dados funcional?
   - Produce: CONFORME ou lista de correcoes

4. **Design Fidelity** (@designer):
   - Tokens respeitados?
   - Acessibilidade WCAG AA?
   - Anti-slop check (sem estetica IA generica)?
   - Responsividade funcional?
   - Produce: FIEL ou lista de desvios

**Gate Final:**
- Se TODOS aprovam → **APROVADO** (pronto para deploy)
- Se issues menores → **CORRIGIR** (volta para @dev com lista)
- Se issue critico → **BLOQUEAR** (volta para @dev com urgencia)

## Ciclo de Correcao

```
@revisor CORRIGIR → @dev corrige → @revisor re-valida (max 3 ciclos)
```

Se apos 3 ciclos ainda ha issues: escalar para o usuario.
