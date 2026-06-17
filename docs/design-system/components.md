---
documento: Especificacao de Componentes
projeto: Portfolio Gabriel
autor: @designer (Diana)
fase: 2 — Fundacao
versao: 1.0
status: rascunho
criado_em: 2026-06-16
atualizado_em: 2026-06-16
dependencias:
  - docs/brief.md
  - docs/design-system/tokens.json
  - docs/design-system/tokens.css
---

# Especificacao de Componentes — Portfolio Gabriel

> Referencia visual direta dos prints do site portavia.framer.website (tema dark).
> Todos os componentes devem respeitar os tokens definidos em tokens.css.

---

## 1. Header / Navegacao

### Layout
- Barra fixa no topo, fundo transparente ou com blur (backdrop-filter)
- Logo/icone a esquerda
- Links centralizados: Home, About, Projects, Blogs
- Botao "Contact" a direita — estilo **outline** com borda `--color-border` e radius pill (`--radius-full`)
- Seletor de idioma (PT-BR / EN-US) integrado ao header

### Especificacoes
- Fonte dos links: Inter `--font-weight-medium`, `--text-sm`
- Espacamento entre links: `--space-6` (24px)
- Botao Contact: padding `--space-2` vertical, `--space-4` horizontal, borda 1px
- Em mobile: hamburger menu → drawer

---

## 2. Hero Section (Homepage)

### Layout
- Fundo escuro (dark) ou claro (light) — full viewport height
- Nome do usuario em texto menor acima: Antonio uppercase, `--text-lg`, `--font-weight-medium`, tracking wide
- Titulo split em duas palavras gigantes: "DIGITAL" a esquerda, "DESIGNER" a direita
  - Fonte: Antonio uppercase, `--text-5xl` ou maior (clamp responsivo)
  - Peso: `--font-weight-bold`
  - Letter-spacing: `--tracking-tight`
- Foto centralizada entre as duas palavras, com `--radius-lg` e leve sombra
- Circulo accent lime (`--color-primary` no dark = #d0ff71) com icone de wave/mao
- Ponto verde pequeno como indicador de status (online/disponivel) — accent lime, 12px, circular
- Subtitulo: Inter `--text-base`, `--color-text-secondary`

### Toggle de Tema
- Posicao: **centro-inferior** da viewport (fixed)
- Estilo: toggle compacto, ponto accent lime
- Funcionalidade: next-themes, alterna data-theme

### Animacoes (GSAP)
- Texto entra com stagger (letra por letra ou palavra por palavra)
- Foto escala de 0.8 → 1.0 com fade
- Circulo lime rota levemente ou pulsa
- ScrollTrigger: elementos fazem parallax suave ao scrollar

---

## 3. Cards de Servicos (What I Can Do)

### Layout
- Grid de 4 cards
- Cada card: fundo `--color-surface-raised` (dark: #222), borda 1px `--color-border`, radius `--radius-lg` (16px)
- Titulo do servico: Antonio uppercase, `--text-xl`, `--font-weight-bold`
- Lista de subitens: Inter `--text-sm`, `--color-text-secondary`
- Padding interno: `--space-6` (24px)

### Hover
- Leve lift (translateY -4px) + shadow `--shadow-md`
- Transicao: `--duration-normal` `--ease-default`

---

## 4. Cards de Testimonials

### Layout — Grid 3x2 misto
Dois tipos de cards no mesmo grid:

#### Card de Depoimento
- Fundo: `--color-surface-raised` (dark: #222, light: #fff)
- Borda: 1px `--color-border`
- Radius: `--radius-lg` (16px)
- Padding: `--space-6` (24px)
- Conteudo:
  - Estrelas: 5 estrelas douradas/amarelas (#fbbf24 / --color-warning-400) no topo
  - Texto do depoimento: Inter `--text-sm`, `--color-text-primary`
  - Rodape: avatar circular (40px) + nome (Inter `--font-weight-semibold` `--text-sm`) + cargo (Inter `--text-xs` `--color-text-secondary`)

#### Card de Metrica (destaque)
- **Fundo: accent lime** (`--color-primary`, dark: #d0ff71)
- Texto: **preto** (#111 ou --color-neutral-950) — contraste invertido
- Radius: `--radius-lg` (16px)
- Padding: `--space-6` (24px)
- Conteudo:
  - Texto descritivo pequeno: `--text-sm`, preto
  - Numero grande: Antonio `--text-4xl`, `--font-weight-bold`, preto
  - Label: `--text-sm`, preto

#### Card de Metrica (neutro, ex: "98% Satisfaction Rate")
- Fundo: `--color-surface-raised`
- Ponto verde pequeno (indicador) no topo
- Texto "I've worked with 50+ happy clients": Inter `--text-sm`
- Numero grande: Antonio `--text-4xl`, `--font-weight-bold`
- Label abaixo: Inter `--text-sm`, `--color-text-secondary`

### Responsivo
- Desktop: 3 colunas
- Tablet: 2 colunas
- Mobile: 1 coluna

---

## 5. Pagina de Projeto Individual

### Layout
- Imagem/GIF grande central — ocupa boa parte da viewport
  - Radius: `--radius-lg` (16px)
  - Pode ter overlay gradient escuro na parte inferior
- Badge de categoria: pill shape (`--radius-full`)
  - Fundo: accent lime (`--color-primary`)
  - Texto: preto (`--color-neutral-950`)
  - Fonte: Inter `--text-xs`, `--font-weight-medium`
  - Padding: `--space-1` vertical, `--space-3` horizontal
- Titulo: Antonio uppercase, `--text-3xl` a `--text-4xl`, `--font-weight-bold`, `--color-text-primary`
- Descricao: Inter `--text-base`, `--color-text-secondary`, max-width ~600px centralizado
- Secoes narrativas: Problema / Solucao / Desafio
- Metadados: ano, industria, cliente, duracao — layout em linha ou grid 2x2

---

## 6. Formulario de Contato (Let's Work Together)

### Header
- Titulo: "LET'S WORK TOGETHER" — Antonio uppercase, `--text-3xl`, `--font-weight-bold`
- Subtitulo: Inter `--text-base`, `--color-text-secondary`

### Campos
- **Labels** em cor accent lime (`--color-primary`, dark: #d0ff71, light: #5e67e6)
  - Fonte: Inter `--text-sm`, `--font-weight-medium`
- **Inputs/Textarea:**
  - Fundo: `--color-surface` (dark: #1a1a1a, light: #f2f2f2)
  - Borda: 1px `--color-border`
  - Radius: `--radius-lg` (16px)
  - Padding: `--space-3` vertical, `--space-4` horizontal
  - Texto: Inter `--text-base`, `--color-text-primary`
  - Placeholder: `--color-text-muted`
  - Focus: borda `--color-primary` + focus ring

### Layout dos campos
- **Linha 1:** Name + Email (lado a lado, 50/50)
- **Linha 2:** Service Needed (select full-width com dropdown arrow)
- **Linha 3:** What Can I Help You... (textarea full-width, altura maior)

### Botao Submit
- Estilo: **outline/ghost** — NAO filled
- Borda: 2px accent lime (`--color-primary`)
- Texto: accent lime, Antonio uppercase `--text-base`, `--font-weight-bold`
- Fundo: transparente
- Radius: `--radius-full` (pill)
- Padding: `--space-3` vertical, `--space-8` horizontal
- Hover: fundo lime com texto preto (inversao)
- Transicao: `--duration-normal` `--ease-default`

---

## 7. Cards de Blog

### Layout
- Grid 2 colunas (desktop), 1 coluna (mobile)
- Imagem grande no topo: radius `--radius-lg`, aspect-ratio 16/9 ou similar
- Abaixo da imagem:
  - Badge de categoria: pill com **borda** 1px `--color-border`, fundo transparente
    - Texto: Inter `--text-xs`, `--color-text-primary`
  - Data: Inter `--text-xs`, `--color-text-secondary`, ao lado do badge
  - Titulo: Antonio uppercase, `--text-xl`, `--font-weight-bold`
  - Descricao: Inter `--text-sm`, `--color-text-secondary`, 2-3 linhas max

### CTA "Browse All Insights"
- Estilo: **outline** — borda 2px accent lime, texto lime, fundo transparente
- Radius: `--radius-full` (pill)
- Fonte: Antonio uppercase, `--font-weight-bold`
- Hover: fill lime + texto preto
- Centralizado abaixo dos cards

---

## 8. Botoes — Padroes Globais

### Primary Outline (padrao dominante no site)
- Borda: 2px `--color-primary`
- Texto: `--color-primary`
- Fundo: transparente
- Radius: `--radius-full` (pill)
- Hover: fundo `--color-primary`, texto preto/escuro
- Active: escala 0.97
- Focus: focus ring `--color-focus-ring`
- Transicao: `--duration-normal` `--ease-default`

### Secondary (header "Contact")
- Borda: 1px `--color-border`
- Texto: `--color-text-primary`
- Fundo: transparente
- Radius: `--radius-full` (pill)
- Hover: fundo `--color-surface`

### Ghost (links/text buttons)
- Sem borda, sem fundo
- Texto: `--color-text-primary`
- Hover: texto `--color-primary`
- Underline animado opcional

---

## 9. Badges

### Badge Filled (em projetos)
- Fundo: `--color-primary` (lime no dark, indigo no light)
- Texto: preto (dark) ou branco (light)
- Radius: `--radius-full`
- Padding: `--space-1` vertical, `--space-3` horizontal
- Fonte: Inter `--text-xs`, `--font-weight-medium`

### Badge Outline (em blog)
- Fundo: transparente
- Borda: 1px `--color-border`
- Texto: `--color-text-primary`
- Radius: `--radius-full`
- Padding: `--space-1` vertical, `--space-3` horizontal

---

## 10. Toggle de Tema (Dark/Light)

### Posicao
- **Centro-inferior** da viewport — `position: fixed`, `bottom: --space-6`, `left: 50%`, `transform: translateX(-50%)`
- Z-index alto para ficar sobre o conteudo

### Estilo
- Toggle pill compacto
- Indicador circular accent lime
- Fundo: `--color-surface` com borda `--color-border`
- Transicao suave do indicador ao alternar

---

## 11. Secao About Me (Homepage)

### Estatisticas
- 3 numeros grandes: Anos de Experiencia, Projetos Completos, Clientes
- Numero: Antonio `--text-3xl`, `--font-weight-bold`
- Label: Inter `--text-sm`, `--color-text-secondary`
- Animacao: contador incremental ao entrar na viewport (GSAP)

### Contato Direto
- Telefone e email clicaveis
- Icone + texto, Inter `--text-base`

---

## 12. FAQ Accordion

### Layout
- Lista vertical, full-width
- Cada item: borda bottom 1px `--color-border`
- Pergunta: Inter `--text-lg`, `--font-weight-medium`, clicavel
- Icone de toggle: + / × ou chevron, accent lime
- Resposta: Inter `--text-base`, `--color-text-secondary`, padding top `--space-4`
- Animacao: altura expande/colapsa suavemente, `--duration-normal`

---

## 13. Footer

### Layout
- Fundo: `--color-surface` ou mesmo do body
- Links de navegacao: mesmos do header
- Contato: email + telefone
- Redes sociais: icones com hover accent
- Fonte: Inter `--text-sm`
- Espacamento generoso, layout em colunas

---

## Regras Gerais de Componentes

1. **Todos os cards** usam `--radius-lg` (16px), borda 1px `--color-border`, padding `--space-6`
2. **Titulos de secao** sempre em Antonio uppercase, com subtitulo em Inter abaixo
3. **Botoes principais** sao outline/pill, NAO filled (exceto hover state)
4. **Accent lime** aparece em: labels de form, badges filled, botoes outline, cards de destaque, indicadores
5. **Accent indigo** (light mode) substitui o lime em todos os mesmos pontos
6. **Hover em cards**: lift sutil (translateY) + shadow increase
7. **Transicoes**: sempre eased, nunca linear, `--duration-normal` (200ms)
8. **Responsivo**: grids refluem naturalmente (auto-fit/minmax)
