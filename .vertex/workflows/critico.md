# Workflow Critico — Sistemas com Dados Sensiveis

> Para projetos de alta criticidade: fintech, saude, e-commerce com pagamento, sistemas com dados sensiveis.

## Quando Usar

- Fintech / sistema financeiro
- Saude / dados medicos (HIPAA-like)
- E-commerce com gateway de pagamento
- Sistema governamental
- Plataforma com dados de menores
- Qualquer sistema onde breach = processo judicial

## Diferencas do Modo Padrao

| Aspecto | Padrao | Critico |
|---------|--------|---------|
| @seguranca | Fase 2 + Fase 4 | **TODAS as fases** (continuous) |
| @juridico | Fase 2 + Fase 4 | Fase 2 + **por feature** + Fase 4 |
| Auditoria | 1x no final | **Por feature** |
| Penetration test | Nao | **Obrigatorio** |
| Secrets rotation | Recomendado | **Obrigatorio** |
| RLS | Definido | **Testado com casos adversariais** |
| Logs de audit | Recomendado | **Obrigatorio** (quem fez o que, quando) |

## Agentes Ativos

| Agente | Participa | Fase | Extra |
|--------|-----------|------|-------|
| @estrategista | Sim | Fase 1 | Inclui analise de risco |
| @arquiteto | Sim | Fase 2 | Inclui threat modeling |
| @designer | Sim | Fase 2 + 4 | Foco extra em UX de seguranca |
| @dev | Sim | Fase 3 | Segue regras rigorosas |
| @seguranca | Sim | **TODAS** | Continuous security |
| @juridico | Sim | Fase 2 + 3 + 4 | Valida por feature |
| @revisor | Sim | Fase 4 | Gate mais rigoroso |

## Fluxo

```
FASE 1: DESCOBERTA + RISCO
@estrategista + @seguranca (threat landscape)
        │
        ▼
FASE 2: FUNDACAO + THREAT MODEL
@arquiteto (inclui threat modeling)
@designer (UX de seguranca: 2FA flows, session warnings)
@seguranca (regras rigorosas + pentest checklist)
@juridico (LGPD completo + DPA + incident response plan)
        │
        ▼
FASE 3: CONSTRUCAO COM SECURITY GATES
@dev implementa feature
    ├── @seguranca valida CADA feature (mini-audit)
    ├── @juridico valida features com dados pessoais
    └── Repete por feature
        │
        ▼
FASE 4: VALIDACAO COMPLETA
@revisor orquestra
├── Code review rigoroso
├── @seguranca → auditoria COMPLETA + pentest checklist
├── @juridico → compliance TOTAL + simulacao de exercicio de direitos
├── @designer → fidelidade + UX de seguranca
└── Gate: so APROVADO se ZERO issues Critical/High
```

## Requisitos Extras por Fase

### Fase 1 Extra: Analise de Risco
@estrategista inclui no brief:
- Classificacao de dados (publicos, pessoais, sensiveis, criticos)
- Impacto de breach (financeiro, reputacional, legal)
- Regulamentacoes aplicaveis (LGPD, PCI-DSS, etc.)
- Stakeholders de seguranca

### Fase 2 Extra: Threat Modeling
@arquiteto inclui na arquitetura:
- Diagrama de trust boundaries
- Threat model (STRIDE ou similar)
- Pontos de falha e mitigacoes
- Plano de backup e disaster recovery

@seguranca produz regras RIGOROSAS:
- Pentest checklist especifico
- Rate limiting obrigatorio
- Brute force protection
- Session management (timeout, rotation)
- Input validation whitelist (nao blacklist)
- Output encoding por contexto (HTML, JS, URL, SQL)
- CSP headers configurados
- CORS restritivo

@juridico produz LGPD COMPLETO:
- DPIA (Data Protection Impact Assessment) se aplicavel
- Data Processing Agreement (DPA) com terceiros
- Incident Response Plan (72h ANPD notification)
- Records of Processing Activities (ROPA)
- Nomeacao de DPO (se > 10k titulares)

### Fase 3 Extra: Security por Feature
Cada feature que toca dados sensiveis:
1. @dev implementa
2. @seguranca faz mini-audit (IDOR check, auth check, input validation)
3. @juridico valida se dados pessoais estao sendo tratados conforme LGPD
4. So entao @dev segue para proxima feature

### Fase 4 Extra: Gate Rigoroso
- **ZERO** findings Critical ou High para aprovar
- Pentest checklist 100% coberto
- Exercicio de direitos do titular simulado (delete, export, correct)
- Auditoria de logs (todos os eventos de seguranca logados)
- Secrets em vault (nao em .env de producao)

## Criterio de Aprovacao

No modo critico, @revisor so emite **APROVADO** quando:
- @seguranca: ZERO Critical, ZERO High
- @juridico: CONFORME (100%)
- @designer: FIEL + UX de seguranca OK
- Code review: ZERO issues graves
- Testes: cobertura > 80%
- Performance: dentro dos limites

Qualquer Critical = **BLOQUEAR** imediato.
