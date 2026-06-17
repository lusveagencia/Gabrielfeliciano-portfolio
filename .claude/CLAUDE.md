# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Framework Vertex

Vertex e um framework de orquestracao de agentes de IA para desenvolvimento de sistemas, apps, sites e landing pages. Ele define um fluxo natural em 4 fases com 7 especialistas e handoffs claros.

## Agentes

Ative agentes com `@nome` ou via slash commands `/vertex:{nome}`:

| Agente | Persona | Escopo |
|--------|---------|--------|
| `@estrategista` | Ester | Discovery, brief, requisitos |
| `@arquiteto` | Ariel | Arquitetura, stack, database, API |
| `@designer` | Diana | Design System, UI/UX, tokens, acessibilidade |
| `@dev` | Dex | Implementacao full-stack |
| `@seguranca` | Soren | Cybersecurity, OWASP, auditoria |
| `@juridico` | Juno | LGPD, protecao de dados, compliance |
| `@revisor` | Rex | QA final, orquestra validacoes |

## Fluxo de Desenvolvimento

```
Fase 1: Descoberta (@estrategista)
    → Gate: usuario aprova brief
Fase 2: Fundacao (@arquiteto → @designer → @seguranca → @juridico)
    → Gate: todos artefatos aprovados
Fase 3: Construcao (@dev)
    → Gate: feature completa
Fase 4: Validacao (@revisor orquestra @seguranca + @juridico + @designer)
    → Gate: APROVADO / CORRIGIR / BLOQUEAR
```

## Modos de Projeto

| Modo | Quando | Agentes |
|------|--------|---------|
| rapido | Landing page, site institucional | @estrategista, @designer, @dev, @revisor |
| padrao | Web app, SaaS, dashboard | Todos os 7 |
| critico | Fintech, saude, e-commerce | Todos + @seguranca continuo |

Modo configurado em `.vertex/config.yaml`.

## Constitution (Regras Inegociaveis)

Documento completo: `.vertex/constitution.md`

Resumo critico:
1. NUNCA incluir secrets/tokens/API keys em codigo
2. NUNCA confiar em dados do cliente — validar server-side
3. NUNCA coletar dados sem consentimento (LGPD)
4. NUNCA inventar cores/espacamentos fora do Design System
5. SEMPRE usar tokens definidos pelo @designer
6. SEMPRE WCAG AA (contraste 4.5:1, navegacao por teclado)
7. SEMPRE tratar erros adequadamente
8. SEMPRE gerar handoff ao passar trabalho para outro agente

## Entry Point

Use `/vertex` para iniciar. O framework:
- Detecta estado existente (retoma de onde parou)
- Lembra preferencias do usuario/empresa entre sessoes
- Conduz uma pergunta por vez com menus interativos
- Detecta modo do projeto silenciosamente pela descricao

## Estrutura

```
.vertex/
├── config.yaml          # Configuracao do projeto
├── constitution.md      # Regras inegociaveis
├── state.yaml           # Estado corrente do projeto (gitignored, runtime)
├── preferences.yaml     # Preferencias usuario/empresa (persiste)
├── agents/              # Definicao dos 7 agentes
├── workflows/           # Fluxos: rapido, padrao, critico
├── templates/           # Templates de documentos (inclui _signature.md)
├── checklists/          # Checklists de validacao
├── handoffs/            # Runtime (gitignored)
└── gates/               # Resultados de gates (gitignored)

docs/                    # Artefatos do projeto
├── brief.md             # Brief (@estrategista)
├── requisitos.md        # Requisitos (@estrategista)
├── arquitetura.md       # Arquitetura (@arquiteto)
├── regras-seguranca.md  # Regras seg (@seguranca)
├── regras-lgpd.md       # Regras LGPD (@juridico)
└── design-system/       # Design System (@designer)
    ├── tokens.json      # W3C Design Tokens
    ├── tokens.css       # CSS Custom Properties
    └── showcase.html    # Vitrine interativa
```

## Assinatura de Documentos

Todo documento gerado por um agente DEVE incluir frontmatter YAML no topo:

```yaml
---
documento: {Tipo}
projeto: {Nome do Projeto}
autor: @{agente} ({Persona})
fase: {N} — {Nome da Fase}
versao: 1.0
status: rascunho | em-revisao | aprovado | atualizado
criado_em: {YYYY-MM-DD}
atualizado_em: {YYYY-MM-DD}
dependencias: []
---
```

Regras: `criado_em` nunca muda, `atualizado_em` sempre reflete ultima edicao, `versao` incrementa a cada edicao. Padrao completo em `.vertex/templates/_signature.md`.

## Interacao

Padrao de interacao (todos os agentes seguem):
- Uma pergunta por vez — nunca walls of text
- AskUserQuestion para decisoes (2-4 opcoes com descricao)
- Texto livre APENAS para descricoes abertas
- Maximo 4-5 linhas antes de pergunta ou acao
- Deteccao silenciosa quando obvio (nao perguntar o que pode inferir)
- Atualizar `state.yaml` a cada transicao
- Ler `preferences.yaml` e usar o que ja sabe

## Handoff Protocol

Ao passar trabalho para outro agente, gerar `.vertex/handoffs/{data}-{origem}-to-{destino}.md`:

```markdown
---
documento: Handoff
projeto: {Nome do Projeto}
autor: @{origem} ({Persona})
fase: {N} — {Nome da Fase}
versao: 1.0
status: aprovado
criado_em: {YYYY-MM-DD}
atualizado_em: {YYYY-MM-DD}
dependencias: [{artefatos produzidos}]
destino: @{destino}
---

# Handoff: @origem → @destino
## Projeto: {nome}
## Fase: {numero}
## Entregaveis Produzidos: {lista com versoes}
## Decisoes Tomadas: {lista}
## Proxima Acao: {o que fazer}
```

## Comandos dos Agentes

Cada agente tem comandos com prefixo `*`:
- `*help` — mostrar comandos disponiveis
- `*brief`, `*requisitos` — @estrategista
- `*arquitetura`, `*stack`, `*schema` — @arquiteto
- `*design-system`, `*tokens`, `*showcase` — @designer
- `*develop`, `*test`, `*lint`, `*build` — @dev
- `*regras-seguranca`, `*auditoria`, `*scan` — @seguranca
- `*regras-lgpd`, `*auditoria-lgpd`, `*mapeamento-dados` — @juridico
- `*revisar`, `*gate`, `*aprovado`, `*corrigir` — @revisor

## Quality Gates

| Gate | Quem Valida | Outcomes |
|------|-------------|----------|
| G1: Brief | Usuario | Aprovado / Refazer |
| G2: Fundacao | Usuario | Aprovado / Ajustar |
| G3: Seguranca | @seguranca | APROVADO / VULNERABILIDADES |
| G4: LGPD | @juridico | CONFORME / NAO-CONFORME |
| G5: Design | @designer | FIEL / DESVIOS |
| G6: Codigo | @revisor | APROVADO / CORRIGIR / BLOQUEAR |

## Dev Constraints

Quando @dev esta implementando, DEVE seguir:
- `docs/arquitetura.md` — estrutura e stack
- `docs/design-system/tokens.css` — todas as cores/espacamentos/tipografia
- `docs/regras-seguranca.md` — patterns de seguranca
- `docs/regras-lgpd.md` — tratamento de dados

## Git

- Commits convencionais: feat:, fix:, docs:, chore:, refactor:
- @dev pode: git add, commit, branch, checkout (LOCAL)
- Push/PR: decisao do usuario (sem restricao por agente no Vertex)
