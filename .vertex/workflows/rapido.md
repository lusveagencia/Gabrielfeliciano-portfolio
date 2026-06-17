# Workflow Rapido — Landing Pages e Sites Institucionais

> Para projetos simples: landing pages, sites institucionais, portfolios, one-pagers.

## Quando Usar

- Landing page de produto/servico
- Site institucional de empresa
- Portfolio pessoal
- One-page com formulario de contato
- Pagina de captura (lead gen)

## Agentes Ativos

| Agente | Participa | Motivo |
|--------|-----------|--------|
| @estrategista | Sim (light) | Brief simplificado |
| @arquiteto | Nao | Stack padrao suficiente |
| @designer | Sim | Design System essencial |
| @dev | Sim | Implementacao |
| @seguranca | Nao | Regras basicas da Constitution bastam |
| @juridico | Parcial | Apenas cookie consent + privacy policy |
| @revisor | Sim (light) | Review de design + basico |

## Fluxo

```
@estrategista (brief light, 15min)
    │
    ▼
@designer (Design System: tokens + palette + tipo)
    │
    ▼
@dev (implementacao)
    │
    ▼
@revisor (review light: design fidelity + responsividade + acessibilidade)
```

## Fase 1: Descoberta (Light)

@estrategista produz brief simplificado:
- Quem e o publico?
- Qual o objetivo da pagina? (conversao, informacao, portfolio)
- Quais secoes sao necessarias?
- Qual o tom da marca? (3 adjetivos)
- Referencias visuais (se houver)

**Nao precisa:** requisitos funcionais complexos, analise de mercado profunda

## Fase 2: Fundacao (Parcial)

Apenas @designer atua:
- Cria tokens (cores, tipografia, espacamento)
- Define palette baseada nos 3 adjetivos da marca
- Produz tokens.css pronto para uso

@juridico define apenas:
- Texto de cookie consent
- Link para politica de privacidade (template basico)

**Nao precisa:** docs/arquitetura.md, docs/regras-seguranca.md completo

## Fase 3: Construcao

@dev implementa usando:
- Stack padrao: Next.js + Tailwind (ou o que o usuario preferir)
- Tokens do Design System
- Responsividade obrigatoria
- SEO basico (meta tags, OG, sitemap)

## Fase 4: Validacao (Light)

@revisor verifica apenas:
- Design fidelity (tokens respeitados?)
- Responsividade (320px ate 1920px sem quebra?)
- Acessibilidade basica (contraste, alt em imagens, labels em forms)
- Performance (Lighthouse > 90)
- Links funcionando

**Nao precisa:** auditoria de seguranca completa, compliance LGPD extenso

## Duracao Estimada

- Brief: 15 min
- Design System: 30 min
- Implementacao: 2-4h (depende da complexidade)
- Review: 15 min
- **Total: ~3-5h**
