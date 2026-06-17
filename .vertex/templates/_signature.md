# Padrao de Assinatura de Documentos Vertex

> Todo documento gerado por um agente Vertex DEVE incluir este bloco de metadados
> como frontmatter YAML no topo do arquivo, ANTES do titulo.

## Formato

```yaml
---
documento: {Tipo do Documento}
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

## Campos

| Campo | Descricao | Exemplo |
|-------|-----------|---------|
| `documento` | Tipo/titulo do artefato | Brief, Arquitetura, Design System, Regras de Seguranca |
| `projeto` | Nome do projeto conforme brief | MeuApp |
| `autor` | Agente + persona entre parenteses | @estrategista (Ester) |
| `fase` | Numero e nome da fase do workflow | 1 — Descoberta |
| `versao` | Versionamento semantico simples | 1.0, 1.1, 2.0 |
| `status` | Estado atual do documento | rascunho, em-revisao, aprovado, atualizado |
| `criado_em` | Data de criacao (ISO 8601) | 2026-05-24 |
| `atualizado_em` | Data da ultima edicao (ISO 8601) | 2026-05-24 |
| `dependencias` | Documentos consultados para produzir este | [brief.md, arquitetura.md] |

## Regras

1. O bloco DEVE ser a primeira coisa no arquivo (antes do `# Titulo`)
2. `criado_em` NUNCA muda apos a criacao
3. `atualizado_em` SEMPRE reflete a data da ultima edicao
4. `versao` incrementa a cada edicao significativa (1.0 → 1.1 para ajustes, 2.0 para reescrita)
5. `status` segue o ciclo: rascunho → em-revisao → aprovado
6. Se o documento for editado apos aprovado, `status` vira `atualizado` e passa por re-aprovacao
7. `dependencias` lista os artefatos que o agente consultou para produzir o documento

## Assinaturas por Agente

| Agente | Persona | Documentos |
|--------|---------|-----------|
| @estrategista | Ester | brief.md, requisitos.md |
| @arquiteto | Ariel | arquitetura.md |
| @designer | Diana | design-system/ (tokens.json, tokens.css, showcase.html) |
| @seguranca | Soren | regras-seguranca.md |
| @juridico | Juno | regras-lgpd.md |
| @revisor | Rex | relatorio-validacao.md |
| @dev | Dex | (implementa, nao gera docs — mas assina commits) |
