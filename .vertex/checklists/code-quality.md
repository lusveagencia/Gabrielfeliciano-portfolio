# Checklist: Qualidade de Codigo

> Usado por @revisor na Fase 4 para code review geral.

---

## 1. Funcionalidade

- [ ] Todas as acceptance criteria atendidas
- [ ] Features funcionam end-to-end (nao apenas happy path)
- [ ] Edge cases tratados (listas vazias, null, erro de rede)
- [ ] Estados cobertos: loading, error, empty, success, ideal
- [ ] Formularios validam input (client + server)

## 2. Qualidade de Codigo

- [ ] Codigo legivel e autodocumentado (nomes claros)
- [ ] DRY respeitado (sem duplicacao significativa)
- [ ] Funcoes pequenas e focadas (single responsibility)
- [ ] Imports organizados e sem circular dependencies
- [ ] Nenhum TODO/FIXME critico pendente
- [ ] Console.log de debug removidos
- [ ] Codigo morto removido (nao comentado)

## 3. TypeScript (se aplicavel)

- [ ] Zero erros de tipo (tsc --noEmit passa)
- [ ] Nenhum `any` desnecessario
- [ ] Interfaces/types bem definidas
- [ ] Props de componentes tipadas
- [ ] Retornos de funcoes com tipo explicito quando nao-trivial

## 4. Testes

- [ ] Testes unitarios para logica de negocio
- [ ] Testes de integracao para fluxos criticos
- [ ] Testes passam (zero failing)
- [ ] Edge cases cobertos nos testes
- [ ] Mocks nao escondem bugs reais

## 5. Performance

- [ ] Nenhuma N+1 query (verificar Supabase calls em loops)
- [ ] Imagens otimizadas (next/image ou equivalente)
- [ ] Bundle size razoavel (nao importando bibliotecas inteiras)
- [ ] Lazy loading onde aplicavel (code splitting)
- [ ] Nenhum re-render desnecessario (React profiler se aplicavel)
- [ ] Database queries com indices quando necessario

## 6. Error Handling

- [ ] Try/catch em operacoes async criticas
- [ ] Erros nao sao engolidos silenciosamente
- [ ] Mensagens de erro uteis para o usuario
- [ ] Fallbacks visuais para erros (error boundaries, estados de erro)
- [ ] Network errors tratados (offline, timeout)

## 7. Seguranca (basico — @seguranca faz audit completo)

- [ ] Nenhum secret hardcoded
- [ ] Input validada antes de usar
- [ ] Nenhum dangerouslySetInnerHTML com dados nao sanitizados
- [ ] Auth verificada em rotas protegidas

## 8. Lint e Formatacao

- [ ] ESLint passa sem erros
- [ ] Prettier/formatacao consistente
- [ ] Nenhum warning ignorado sem motivo documentado

## 9. Assinatura de Documentos

- [ ] Todos os documentos em `docs/` possuem frontmatter YAML de assinatura
- [ ] Campos obrigatorios preenchidos: documento, projeto, autor, fase, versao, status, criado_em, atualizado_em, dependencias
- [ ] Versoes consistentes (documentos editados apos criacao tem versao > 1.0)
- [ ] Campo `atualizado_em` reflete data da ultima edicao real
- [ ] Campo `dependencias` lista corretamente os artefatos consultados

## Veredicto

- [ ] **APROVADO** — Codigo pronto para deploy
- [ ] **CORRIGIR** — Issues menores, listados abaixo
- [ ] **BLOQUEAR** — Issue critico encontrado

### Issues Encontrados
| # | Severidade | Descricao | Arquivo | Sugestao |
|---|-----------|-----------|---------|----------|
| 1 | {alta/media/baixa} | {descricao} | {path} | {como resolver} |
