# Checklist: Fidelidade ao Design System

> Usado por @designer na Fase 4 para verificar se @dev implementou o Design System corretamente.

---

## Tokens e Cores

- [ ] Todas as cores usadas vem de tokens (nenhum hex/rgb hardcoded)
- [ ] Proporcao 60-30-10 respeitada (60% neutro, 30% surfaces, 10% accent)
- [ ] Cor accent usada apenas em areas pequenas e funcionais
- [ ] Neutrals tem temperatura (nao cinza puro #808080)
- [ ] Modo escuro (se aplicavel) usa versao dark dos tokens

## Tipografia

- [ ] Todas as font-sizes vem da escala modular definida
- [ ] Pesos usados conforme hierarquia (bold reservado para nivel 1)
- [ ] Line-height: ~1.5 body, ~1.1-1.2 headings
- [ ] Maximo 2 font-families no projeto
- [ ] Nenhuma font-size "inventada" fora da escala

## Espacamento

- [ ] Todos os espacamentos na escala 8px (4, 8, 12, 16, 24, 32, 48, 64)
- [ ] Nenhum valor magico de margin/padding
- [ ] Hierarquia de espacamento clara (tight dentro de grupos, large entre secoes)
- [ ] Whitespace generoso (nao apertado)

## Componentes

- [ ] Buttons: apenas 1 primary por view/secao
- [ ] Inputs: labels reais (nao apenas placeholder)
- [ ] Cards: radius e shadow conforme tokens
- [ ] Badges: tint suave (nao fill saturado)
- [ ] Icons: stroke consistente, estilo uniforme

## Estados e Interacao

- [ ] cursor:pointer em TODO elemento clicavel
- [ ] Hover state em todo elemento interativo
- [ ] Active state (pressed feedback)
- [ ] Focus-visible com ring visivel (acessibilidade)
- [ ] Disabled state visualmente distinto
- [ ] Transicoes 150-250ms eased (nunca linear, nunca >300ms)

## Acessibilidade (WCAG AA)

- [ ] Contraste texto/fundo >= 4.5:1 (body text)
- [ ] Contraste texto/fundo >= 3:1 (headings grandes)
- [ ] Navegacao por teclado funcional (Tab, Enter, Esc)
- [ ] Focus ring visivel em TODOS os elementos interativos
- [ ] Alt text em todas as imagens informativas
- [ ] Labels em todos os inputs de formulario
- [ ] Touch targets >= 44x44px em mobile

## Responsividade

- [ ] Layout funciona em 320px (menor mobile)
- [ ] Layout funciona em 360-414px (mobile comum)
- [ ] Layout funciona em 768px (tablet)
- [ ] Layout funciona em 1024-1440px (desktop)
- [ ] Nenhum overflow horizontal em nenhum breakpoint
- [ ] Cards/metrics refluem corretamente (4→2→1)
- [ ] Navegacao tem versao mobile (drawer ou bottom bar)
- [ ] Tabelas tem estrategia para mobile (scroll ou stack)

## Anti-AI-Slop

- [ ] NAO tem gradiente roxo/azul em fundo branco
- [ ] NAO tem cores neon ou oversaturadas em areas grandes
- [ ] NAO tem multiplos botoes primarios competindo
- [ ] NAO tem estetica generica "AI-made" sem personalidade
- [ ] Design reflete os 3 adjetivos da marca definidos no brief
- [ ] Hierarquia visual clara (exatamente 1 elemento hero por tela)

## Veredicto

- [ ] **FIEL** — Design System implementado corretamente
- [ ] **DESVIOS** — Lista de correcoes necessarias (listar abaixo)

### Desvios Encontrados
1. {desvio e como corrigir}
