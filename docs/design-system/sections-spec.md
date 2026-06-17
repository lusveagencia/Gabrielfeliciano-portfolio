---
documento: Especificacao de Secoes (Homepage)
projeto: Portfolio Gabriel
autor: @designer (Diana)
fase: 2 — Fundacao
versao: 1.3
status: aprovado
criado_em: 2026-06-16
atualizado_em: 2026-06-16
dependencias:
  - docs/brief.md
  - docs/design-system/tokens.css
  - docs/design-system/components.md
---

# Especificacao de Secoes — Homepage (app/page.tsx)

> Documento de referencia para o @dev. Cada secao esta descrita com arquitetura de componentes, layout, animacoes e micro-interacoes. Seguir a risca.

---

## 0. Efeito Global — `<NoiseBackground />`

### Proposito
Textura de ruido (TV static grain) sobre todo o site para dar profundidade e evitar superficies "flat" demais.

### Implementacao
- `div` com `position: fixed`, `inset: 0`, `pointer-events: none`, `z-index: 50`
- `opacity: 0.03` (sutil, quase imperceptivel mas faz diferenca)
- Background: SVG inline ou `background-image` com pattern de noise
- Deve cobrir toda a viewport e ficar ACIMA de todo o conteudo sem bloquear interacao

### Tecnica sugerida
```
SVG com filter feTurbulence (type="fractalNoise", baseFrequency="0.65")
ou
background-image com data URI de um PNG de noise tileable
```

---

## 1. Header — `<Header />` (Menu Pilula Magico)

### Visual Base
- Formato: **pilula** (`rounded-full`)
- Posicao: `fixed`, `z-50`, centralizado no topo (`left-1/2`, `-translate-x-1/2`, `mt-6`)
- Fundo: translucido com blur (`backdrop-blur-md`, `bg-surface/80` ou similar)
- Borda: 1px `--color-border` sutil

### Elementos (estado expandido — padrao)
```
[ Avatar ] | Home | About | Projects | Blogs | [ Contact ]
```

- **Avatar:** Foto circular do Gabriel (~32px), borda sutil
- **Links:** Inter `--text-sm`, `--font-weight-medium`, espacamento `--space-6`
- **Botao Contact:** Estilo outline pill com hover effect avancado (ver abaixo)

### Hover do Botao Contact — "Fill from Bottom-Left"
- O botao tem `overflow-hidden`
- Ao hover, uma camada de cor (accent) **cresce a partir do canto inferior esquerdo** ate cobrir todo o botao
- Tecnica: pseudo-elemento `::before` com `transform-origin: bottom left`, escala de 0 → 1 no hover
- Texto muda de cor quando coberto (accent → preto/escuro)
- Transicao suave: `--duration-normal` `--ease-default`

### Animacao de Scroll (GSAP + ScrollTrigger)

**Ao rolar para BAIXO:**
1. O menu **encolhe** (anima a largura de ~600px → ~200px)
2. Os links (Home, About, Projects, Blogs) e o botao Contact **desaparecem** (opacity 0, scale down)
3. Sobram VISIVEIS apenas:
   - Avatar do Gabriel
   - Texto **"Available for work"** (Inter `--text-xs`, `--font-weight-medium`)
   - **Ponto verde pulsando** (`animate-pulse` do Tailwind, cor accent lime, ~8px circular)
4. A pilula fica compacta e minimalista

**Ao rolar para CIMA:**
1. O menu **expande** de volta para largura original
2. Links e botao Contact reaparecem com fade + scale suave
3. "Available for work" e o ponto verde desaparecem

**Parametros do ScrollTrigger:**
- `start`: quando sair do hero (ex: "top -100px")
- `end`: "+=100"
- `scrub: true` ou animacao toggle (testar o que fica mais fluido)
- Sem jank — usar `will-change: width` e animar propriedades GPU-friendly

---

## 2. Hero Section — `<HeroSection />`

### Tipografia e Layout

Estrutura do texto centralizado:

```
         GABRIEL FELICIANO              ← Linha 1 (menor)
   DIGITAL  [ FOTO ]  DESIGNER         ← Linha 2 (gigante, com foto no meio)
   I'm a Brazil-based digital designer  ← Subtitulo
   and Framer developer
```

#### Linha 1 — Nome
- Fonte: Antonio uppercase
- Tamanho: `--text-xl` a `--text-2xl` (menor que a Linha 2)
- Peso: `--font-weight-medium`
- Tracking: `--tracking-wide`
- Cor: `--color-text-secondary`

#### Linha 2 — Titulo Split com Foto
- "DIGITAL" a esquerda + "DESIGNER" a direita
- Fonte: Antonio uppercase
- Tamanho: `--text-5xl` ou maior — usar `clamp()` para responsivo
  - Sugestao: `clamp(3rem, 8vw, 7rem)` ou similar
- Peso: `--font-weight-bold`
- Tracking: `--tracking-tight`
- Cor: `--color-text-primary`
- **A foto fica no "buraco" entre as duas palavras** (ver arquitetura abaixo)

#### Subtitulo
- Fonte: Inter
- Tamanho: `--text-base` a `--text-lg`
- Cor: `--color-text-secondary`
- Alinhamento: centralizado ou a direita (como no Portavia)

### ARQUITETURA DA FOTO (CRITICO)

A foto no meio do texto NAO e uma imagem estatica comum. E o **CardFlutuante** — um elemento `position: sticky` que vai acompanhar o scroll e descer para as proximas secoes.

#### Mecanismo:
1. Na **Linha 2**, existe um espaco vazio (placeholder/buraco) no fluxo do texto, entre "DIGITAL" e "DESIGNER"
2. A imagem real esta em um **container separado** com `position: sticky` (ou absolute posicionado para alinhar perfeitamente com o buraco)
3. No hero, a foto parece fazer parte do texto
4. Ao scrollar, a foto "gruda" e desce junto com o viewport, criando efeito de parallax/flutuante

#### Container da Foto:
- `position: sticky`, `top: [valor calculado]`
- Largura: ~250-350px (responsivo)
- Altura: proporcional
- Z-index adequado para ficar entre o texto

#### Estilo da Foto:
- Cantos: `rounded-3xl` (radius grande, ~24px)
- Shadow: `--shadow-lg` sutil
- Possivel borda 1px `--color-border` sutil

### Badge Flutuante — "Hi 👋"

#### Posicao
- Canto **inferior esquerdo** da foto
- Parcialmente sobreposto (offset negativo)

#### Visual
- Circulo com fundo accent (`--color-primary`, lime no dark)
- Tamanho: ~60-80px
- Dentro: texto "Hi" + icone wave "👋"

#### Animacao em Loop
Ciclo infinito alternando entre "Hi" e "👋":

```
Estado 1: "Hi" visivel, opacidade 1
          → "Hi" sobe e desaparece (translateY negativo + opacity 0)
Estado 2: "👋" sobe e aparece (translateY 0 + opacity 1)
          → "👋" sobe e desaparece
Estado 3: "Hi" volta subindo de baixo
          → Repete infinitamente
```

- Duracao do ciclo: ~3-4 segundos
- Implementar com keyframes Tailwind (`@keyframes` no tailwind.config) ou GSAP timeline
- Easing: `--ease-default`

### Animacao de Entrada do Hero (GSAP)

Ao carregar a pagina:
1. **Linha 1** (nome): fade in + translateY de 20px → 0, delay 0
2. **"DIGITAL"**: slide in da esquerda, delay 0.2s
3. **"DESIGNER"**: slide in da direita, delay 0.2s
4. **Foto**: scale de 0.8 → 1.0 + fade, delay 0.3s
5. **Subtitulo**: fade in + translateY, delay 0.5s
6. **Badge "Hi"**: bounce in (scale 0 → 1 com ease-spring), delay 0.6s
7. **Header**: slide down do topo, delay 0.4s

Stagger suave entre elementos. Total da animacao: ~1.2-1.5 segundos.

---

## Toggle de Tema — Posicao Global

- `position: fixed`, `bottom: --space-6` (24px), `left: 50%`, `transform: translateX(-50%)`
- Z-index alto (acima do conteudo, abaixo do noise)
- Visivel em TODAS as paginas, nao apenas no hero
- Estilo: toggle pill compacto com indicador circular accent
- Implementacao: next-themes

---

## Seletor de Idioma

- Integrado ao header ou proximo ao toggle de tema
- Estilo: discreto, talvez apenas "PT" / "EN" com separador
- Troca sem reload (next-intl)

---

## 3. Services Section — `<ServicesSection />`

### Arquitetura de Layout (Grid)

- Secao ocupa **100vh**
- Layout: **2 colunas** (`grid-cols-2`)

#### Lado Esquerdo — Conteudo
Contem os textos e o accordion.

#### Lado Direito — "Zona Fantasma" (CRITICO)
- **Div vazia estrutural** — apenas espaco
- NAO colocar imagem aqui
- **REGRA DE OURO:** a imagem grande e gerenciada pelo container sticky pai (CardFlutuante)
- O lado direito serve para manter a estrutura do grid, permitindo que o CardFlutuante "pouse" aqui visualmente

### Conteudo do Lado Esquerdo

#### Titulo
- Texto: **"WHAT I CAN DO FOR YOU"**
- Fonte: Antonio uppercase, tipografia grande (`--text-3xl` a `--text-4xl`), `--font-weight-bold`
- Cor: `--color-text-primary`

#### Subtitulo
- Texto: "As a digital designer, I am a visual storyteller, crafting experiences that connect deeply and spark creativity."
- Fonte: Inter `--text-base`, `--color-text-secondary`

#### Accordion (4 itens expansiveis)

Cada item tem titulo clicavel e lista de subitens que expande/colapsa:

**1. UI/UX Design**
- Wireframing and prototyping
- User Interface design for web and mobile apps
- Usability testing and user feedback analysis
- Interaction design and micro-animations

**2. Graphic Design**
- Logo and brand identity design
- Social media graphics and ad creatives
- Infographics and data visualization
- Custom illustrations and icons

**3. Web Design**
- Responsive website design
- Landing page design and optimization
- Webflow development and customization
- Website maintenance and updates

**4. Branding**
- Brand strategy and identity development
- Visual style guide creation
- Typography and color scheme selection
- Brand storytelling and messaging

### Efeito "Mouse Follow Image Reveal" (Awwwards Style)

Ao passar o mouse sobre os titulos do accordion, uma imagem aparece ao lado do cursor.

#### Mecanismo

1. **Elemento `<img>` fixo** na tela:
   - `position: fixed`
   - `pointer-events: none` ← **CRITICO** (previne flickering — sem isso a imagem entra na frente do cursor e dispara mouseleave repetidamente)
   - `z-index: 50`
   - Estado inicial: `opacity: 0`, `scale: 0.5`

2. **GSAP `quickTo()`**: Atrelar posicoes X e Y da imagem ao `mousemove` do usuario de forma extremamente fluida

3. **Interacao:**

   **`mouseenter` em titulo do accordion:**
   - Atualizar `src` da imagem fixa de acordo com o item (4 imagens diferentes, uma por servico — placeholders inicialmente)
   - Aplicar leve inclinacao aleatoria (`rotate: 5deg` a `-5deg`)
   - Animar: `opacity: 0 → 1`, `scale: 0.5 → 1` com GSAP
   
   **`mouseleave` do titulo:**
   - Animar: `opacity: 1 → 0`, `scale: 1 → 0.8` suavemente

4. **Tamanho da imagem follower:** ~200-300px, com `rounded-xl` e leve shadow

#### Performance
- `pointer-events: none` na imagem e OBRIGATORIO
- Usar `gsap.quickTo()` para suavidade (nao setar posicao diretamente)
- `will-change: transform, opacity` no elemento imagem

### Responsivo
- Desktop: grid 2 colunas
- Tablet: 2 colunas mais estreitas (imagem follower pode ser desativada)
- Mobile: 1 coluna (lado direito desaparece), sem efeito mouse follower (touch devices)

---

## 4. About Section — `<AboutSection />`

### Layout
- Secao ocupa **100vh**
- Grid de **2 colunas** (`grid-cols-1 md:grid-cols-2`)

#### Lado Direito — "Zona Fantasma"
- Div estrutural vazia
- O CardFlutuante sticky "pousa" aqui visualmente (vindo da Secao 2)

#### Lado Esquerdo — Conteudo

##### Titulo
- Texto: **"ABOUT ME"**
- Fonte: Antonio uppercase, `--text-3xl` a `--text-4xl`, `--font-weight-bold`
- Cor: `--color-text-primary`

##### Subtitulo
- Texto: "Hi, I'm Duncan — a digital designer and Framer developer passionate about crafting meaningful and impactful digital experiences."
- Fonte: Inter `--text-base`, `--color-text-secondary`

##### Grid de Estatisticas (Numbers)
- Layout: **3 colunas** lado a lado
- Cada coluna:
  - **Numero em destaque:** cor accent (`--color-primary`, lime no dark / indigo no light)
  - Fonte: Antonio `--text-3xl` a `--text-4xl`, `--font-weight-bold`
  - **Label abaixo:** Inter `--text-sm`, `--color-text-secondary`

| Numero | Label |
|--------|-------|
| 12 | Years of Experience |
| 270 | Completed Projects |
| 50+ | Clients on Worldwide |

##### Contato (2 colunas curtas)
- Abaixo das estatisticas
- **Coluna 1:** "Call Today:" (label) + numero de telefone (cor azulada/accent)
- **Coluna 2:** "Email:" (label) + email (cor azulada/accent)
- Links clicaveis (`tel:` e `mailto:`)

##### Redes Sociais
- Icones minimalistas em SVG: **X, Instagram, Behance, Dribbble**
- Alinhados horizontalmente
- Cor: `--color-text-secondary`, hover → `--color-primary`
- Tamanho: ~20-24px, gap `--space-4`

##### Botao "MY STORY"
- Estilo: **reutilizar exatamente o mesmo hover do botao Contact do header**
- `overflow-hidden`, preenchimento expandindo do bottom-left
- Borda accent, radius pill (`--radius-full`)
- Navega para `/about`

### Animacao de Contagem GSAP (Number Counter)

#### Trigger
- ScrollTrigger dispara quando a secao entra na viewport
- **`once: true`** ← CRITICO (a animacao so roda UMA VEZ, na primeira visualizacao)
- Se o usuario scrollar para cima e voltar, os numeros permanecem no valor final
- Razao: repetir a contagem toda vez que volta parece amador, nao premium

#### Mecanismo
```javascript
// Para cada numero:
const obj = { val: 0 };
gsap.to(obj, {
  val: targetValue, // 12, 270 ou 50
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: sectionRef,
    start: "top 80%",
    once: true  // ← NUNCA remover
  },
  onUpdate: () => {
    element.textContent = Math.floor(obj.val);
    // Para "50+": Math.floor(obj.val) + "+"
  }
});
```

#### Stagger
- Os 3 numeros nao devem animar simultaneamente
- Stagger de ~0.2s entre eles (12 começa, depois 270, depois 50+)
- Duracao total: ~2.5s

---

## 5. Card 3D Sticky — Finalizacao do Efeito (Componente Pai / Layout)

> Este efeito e gerenciado no **layout pai**, nao dentro das secoes individuais.
> O CardFlutuante e um unico elemento sticky que acompanha o scroll por 3 secoes.

### Jornada Completa do Card

#### Secao 1 (Hero) → Secao 2 (Services)
- Card comeca no "buraco" entre "DIGITAL" e "DESIGNER"
- Ao scrollar, desce para a **direita** da Secao 2 (zona fantasma)
- Rotacao 3D durante o trajeto
- **Primeiro Swap:** no ponto cego de 90 graus, troca a imagem do src (hero photo → services photo)

#### Secao 2 (Services) → Secao 3 (About) — NOVO
- Card sai da direita (Sec2) e vai para a **direita** (Sec3)
- Permanece na zona fantasma do grid

##### O Segundo Swap
- Durante o trajeto Sec2 → Sec3, o card sofre **nova rotacao 3D**
- Quando passa pelo ponto cego de **90 graus** (exato meio da transicao):
  - Altera o `src` para **voltar a imagem original do Hero** (foto do Gabriel)
- Tecnica: mesma do primeiro swap — `rotateY(0 → 90 → 180)`, troca src no frame 90deg

##### O Pouso Final Inclinado
- No fim do scroll da Secao 3, a imagem **NAO fica reta** (0deg)
- Estaciona com **charme 3D**, levemente inclinada:
  ```css
  transform: rotateY(-12deg) rotateX(5deg);
  ```
- Cria sensacao de "foto apoiada", nao flat
- Sombra sutil que acompanha a inclinacao

### Timeline GSAP Completa

```
Scroll Position:    | Hero    | Services  | About     |
Card Y Position:    | centro  |  direita  |  direita  |
Card rotateY:       |  0deg   | 0→90→180  | 180→270→348 |
Card src:           | hero.jpg| swap@90°→services.jpg | swap@270°→hero.jpg |
Card final state:   |         |           | rotateY(-12deg) rotateX(5deg) |
```

### Performance
- Usar `will-change: transform` no card
- Animar apenas `transform` e `opacity` (GPU-friendly)
- `perspective: 1200px` no container pai para 3D
- Sem bibliotecas extras alem do GSAP
- `backface-visibility: hidden` opcional para evitar render da face traseira

### Responsivo
- Desktop: efeito 3D completo com swaps
- Tablet: simplificar (menos rotacao, mesmos swaps)
- Mobile: card pode ficar estatico ou com parallax simples (sem rotacao 3D)

---

## 6. Featured Projects — `<FeaturedProjects />`

### Cabecalho da Secao

- **Titulo:** "FEATURED PROJECTS"
  - Fonte: Antonio uppercase, `--text-3xl` a `--text-4xl`, `--font-weight-bold`
  - Cor: `--color-text-primary`
- **Descricao:** "These selected projects reflect my passion for blending strategy with creativity — solving real problems through thoughtful design and impactful storytelling."
  - Fonte: Inter `--text-base`, `--color-text-secondary`
  - Largura contida: `max-w-2xl` (manter elegancia, nao esticar o texto)

### Dados dos Projetos

Array `projectsData` com 3-4 projetos mockados:

```typescript
interface Project {
  id: string;
  category: string;   // ex: "Branding", "UI/UX Design", "Graphic Design"
  title: string;       // ex: "BLACK GEOMETRIC PRISMS"
  subtitle: string;    // descricao curta
  image: string;       // path da imagem (placeholder inicialmente)
}
```

### Arquitetura DOM — Stacked Cards (CRITICO)

#### O Segredo do CSS
Cada `.project-card` DEVE ter `position: sticky`:

```css
.project-card {
  position: sticky;
  top: 24px;  /* ou top: 40px, ajustar conforme header */
  height: 80vh;
  border-radius: var(--radius-xl); /* rounded-3xl */
  overflow: hidden;
}
```

#### Comportamento
- Ao rolar a pagina, o card **trava no topo da tela**
- O **proximo card desliza por cima** dele
- Cria efeito de "empilhamento" — cada card novo cobre o anterior

#### Z-Index (CRITICO — previne bug visual)
- Cada card DEVE ter z-index **crescente**:
  - Card 1: `z-index: 1`
  - Card 2: `z-index: 2`
  - Card 3: `z-index: 3`
  - Card 4: `z-index: 4`
- Se o z-index estiver invertido, o card desliza por BAIXO e estraga a ilusao
- Implementar: `style={{ zIndex: index + 1 }}`

#### Visual de Cada Card
- Imagem grande cobrindo todo o card: `object-cover`, `h-[80vh]`, `rounded-3xl`
- Conteudo centralizado (`position: absolute`, flex, `justify-center`, `items-center`):
  - **Pilula de Categoria:** badge pill com fundo accent lime (`--color-primary`), texto preto
    - Fonte: Inter `--text-xs`, `--font-weight-medium`
    - Radius: `--radius-full`
  - **Titulo Gigante:** Antonio uppercase, `--text-4xl` a `--text-5xl`, branco, `--font-weight-bold`
    - Text shadow sutil para legibilidade sobre imagem
  - **Subtitulo:** Inter `--text-base`, branco/semi-transparente
- Overlay gradient escuro na imagem (de baixo pra cima) para garantir leitura do texto

### Efeito Zoom-Out (GSAP ScrollTrigger)

Conforme o proximo card rola por cima do card atual:

```javascript
// Para cada card EXCETO o ultimo:
gsap.to(card, {
  scale: 0.95,
  filter: "brightness(0.7)",  // ou opacity sutil
  scrollTrigger: {
    trigger: nextCard,         // o card seguinte e o trigger
    start: "top bottom",       // quando o proximo card entra na viewport
    end: "top top",            // quando o proximo card chega no topo
    scrub: true                // vinculado ao scroll
  }
});
```

- O card atual **encolhe** de `scale(1)` → `scale(0.95)`
- Simultaneamente **escurece** levemente (`brightness(0.7)` ou opacity)
- `scrub: true` — vinculado ao scroll, nao animacao independente
- O ultimo card NAO recebe esse efeito (ele e o topo da pilha)

### Cursor Customizado (Hover Effect)

#### Elemento
- `div` fixa fora do fluxo: `position: fixed`, `pointer-events: none`, `z-50`
- Visual: circulo `rounded-full`, fundo accent lime (`--color-primary`)
- Tamanho: ~60-80px
- Conteudo: icone de seta diagonal (↗), cor preta, `--text-lg`
- Estado inicial: `scale: 0`, `opacity: 0`

#### Movimento
- `gsap.quickTo()` para atrelar X e Y ao `mousemove` do container de projetos
- Performance maxima — mesma tecnica do mouse follower da Services Section

#### Interacao
- **`mouseenter` em `.project-card`:** cursor customizado aparece (`scale: 0 → 1`, `opacity: 0 → 1`)
- **`mouseleave` de `.project-card`:** cursor desaparece (`scale: 1 → 0`, `opacity: 1 → 0`)
- Transicao: `--duration-fast` (150ms)

#### Responsivo
- Desktop: cursor customizado ativo
- Touch devices (mobile/tablet): desativar cursor customizado (`@media (hover: hover)`)

### Responsivo Geral
- Desktop: cards full-width, h-[80vh], efeito stacked completo
- Tablet: cards full-width, h-[60vh], efeito stacked mantido
- Mobile: cards full-width, h-[50vh], efeito stacked mantido (funciona naturalmente com sticky)

### Botao "Browse All Projects"
- Abaixo do ultimo card, centralizado
- Estilo: outline pill (mesmo padrao do site — borda accent, texto accent, hover fill)
- Navega para `/projects`

---

## 7. Testimonials — `<TestimonialsSection />`

### Cabecalho da Secao

- **Titulo:** "WHAT MY CLIENTS SAY"
  - Fonte: Antonio uppercase, `--text-3xl` a `--text-4xl`, `--font-weight-bold`
  - Cor: `--color-text-primary`
- **Descricao:** "Here's what my clients have shared about their experiences working with me. Their trust and satisfaction motivate me to continue delivering designs that make an impact."
  - Fonte: Inter `--text-base`, `--color-text-secondary`
  - Largura contida: `max-w-2xl` ou `max-w-3xl`

### Arquitetura do Bento Grid

Grid CSS assimetrico com cards de funcoes e visuais diferentes:

```css
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
gap-6
```

#### Ordem exata no grid (3 colunas):

| Posicao | Linha | Tipo | Visual |
|---------|-------|------|--------|
| 1 | Linha 1, Col 1 | Depoimento | Fundo cinza escuro |
| 2 | Linha 1, Col 2 | Depoimento | Fundo cinza escuro |
| 3 | Linha 1, Col 3 | Stat Card | Fundo **branco** |
| 4 | Linha 2, Col 1 | Stat Card | Fundo **verde neon** (accent lime) |
| 5 | Linha 2, Col 2 | Depoimento | Fundo cinza escuro |
| 6 | Linha 2, Col 3 | Depoimento | Fundo cinza escuro |

### Estrutura de Dados — Array Misto

```typescript
type TestimonialItem = {
  type: 'testimonial';
  quote: string;
  name: string;
  role: string;
  avatar: string;
} | {
  type: 'stat';
  variant: 'white' | 'accent';  // branco ou verde neon
  label: string;      // texto descritivo no topo
  value: number;      // valor numerico para animar (98, 200)
  suffix: string;     // "%" — concatenado APOS a animacao
  sublabel: string;   // texto na base ("Satisfaction Rate", "Growth")
};
```

Renderizar com `.map()` e condicional `if (item.type === 'testimonial')` para escolher o componente correto. Isso mantem o codigo **modular e limpo** — dois tipos de UI no mesmo grid sem bagunca.

### Design dos Cards (Tailwind)

#### Card de Depoimento
- Fundo: `bg-[#1a1a1a]` (dark) / `--color-surface-raised` (light)
- Radius: `rounded-3xl`
- Padding: `p-8` (generoso)
- Layout vertical:

  **Topo — Estrelas:**
  - 5 estrelas, cor accent lime (`--color-primary` ou `--color-warning-400` dourado)
  - Tamanho: ~16-20px cada
  - Podem ser SVG inline ou emoji ⭐ estilizado

  **Meio — Texto do depoimento:**
  - Fonte: Inter `--text-sm` a `--text-base`
  - Cor: `--color-text-primary`
  - Estilo: aspas ou italico opcional

  **Rodape — Autor:**
  - Avatar: circular, ~40px, `rounded-full`
  - Nome: Inter `--text-sm`, `--font-weight-semibold`, `--color-text-primary`
  - Cargo: Inter `--text-xs`, `--color-text-secondary`
  - Layout: flex row (avatar + coluna nome/cargo)

#### Stat Card Branco (posicao 3 — "98% Satisfaction")
- Fundo: **branco** (`bg-white`)
- Texto: **preto** (`text-black` / `--color-neutral-900`)
- Radius: `rounded-3xl`
- Padding: `p-8`
- Layout vertical:
  - **Ponto verde** no topo (indicador, ~8px, accent lime, `rounded-full`)
  - **Topo:** "I've worked with 50+ happy clients" — `--text-sm`
  - **Meio:** Numero gigante **"98%"** — Antonio `--text-4xl` a `--text-5xl`, `--font-weight-bold`
  - **Base:** "Satisfaction Rate" — `--text-sm`
- **Esse card mantem visual branco em AMBOS os temas** (destaque por contraste)

#### Stat Card Verde Neon (posicao 4 — "200% Growth")
- Fundo: **accent lime** (`--color-primary`, #d0ff71)
- Texto: **preto/cinza escuro** (`--color-neutral-950`)
- Radius: `rounded-3xl`
- Padding: `p-8`
- Layout vertical:
  - **Topo:** "My work helped clients grow their revenue by 200%" — `--text-sm`
  - **Meio:** Numero gigante **"200%"** — Antonio `--text-4xl` a `--text-5xl`, `--font-weight-bold`
  - **Base:** "Growth" — `--text-sm`
- **Esse card mantem fundo lime em AMBOS os temas** (destaque por cor)

### Animacao de Contagem GSAP (Stat Cards)

Reutilizar **exatamente a mesma logica** da AboutSection:

```javascript
// Para cada stat card (98 e 200):
const obj = { val: 0 };
gsap.to(obj, {
  val: targetValue,  // 98 ou 200
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: testimonialsSectionRef,
    start: "top 80%",
    once: true  // ← CRITICO: so roda 1 vez
  },
  onUpdate: () => {
    // Animar APENAS o numero, concatenar "%" estaticamente
    element.textContent = Math.floor(obj.val) + "%";
  }
});
```

#### ALERTA: Separar numero do sufixo
- Animar apenas a variavel numerica (0 → 98, 0 → 200)
- Concatenar `%` no `onUpdate` com `Math.floor(val) + "%"`
- NAO animar o caractere "%" junto — causa glitch visual
- `once: true` — premium, nao parque de diversoes

### Dados Mockados (Placeholder)

```typescript
const testimonialsData = [
  // Linha 1
  { type: 'testimonial', quote: "Duncan truly understood my vision and turned it into impactful designs. The results went beyond my expectations!", name: "John Harris", role: "Marketing Director", avatar: "/placeholder-avatar-1.jpg" },
  { type: 'testimonial', quote: "He took the time to understand our goals and delivered a design that resonated perfectly with our audience.", name: "Michael Lee", role: "Product Manager", avatar: "/placeholder-avatar-2.jpg" },
  { type: 'stat', variant: 'white', label: "I've worked with 50+ happy clients", value: 98, suffix: "%", sublabel: "Satisfaction Rate" },
  // Linha 2
  { type: 'stat', variant: 'accent', label: "My work helped clients grow their revenue by 200%", value: 200, suffix: "%", sublabel: "Growth" },
  { type: 'testimonial', quote: "His design skills are unmatched. He transformed my ideas into a high-performing, visually striking website.", name: "Sarah Johnson", role: "CEO", avatar: "/placeholder-avatar-3.jpg" },
  { type: 'testimonial', quote: "As a small business owner, I appreciated how stress-free Duncan made the process.", name: "Laura Bennett", role: "Small Business Owner", avatar: "/placeholder-avatar-4.jpg" },
];
```

### Responsivo
- Desktop (`lg`): 3 colunas — layout Bento completo
- Tablet (`md`): 2 colunas — stat cards podem ocupar posicoes diferentes
- Mobile: 1 coluna — cards empilhados na ordem do array

### Animacao de Entrada (opcional)
- Cards fazem fade-in + translateY com stagger ao entrar na viewport
- ScrollTrigger com `start: "top 85%"`

---

## 8. FAQ Section — `<FaqSection />`

### Dados do FAQ

Array `faqData` definido **fora do componente** (constante estatica):

```typescript
const faqData = [
  {
    question: "What services do you offer?",
    answer: "I specialize in UI/UX design, branding, web design, and development. Whether you need a complete website, a visual identity, or design consultation, I'm here to help bring your ideas to life."
  },
  {
    question: "How does the design process work?",
    answer: "My process begins with discovery and planning, where I understand your goals and audience. Then, I move on to concept creation, revisions based on your feedback, and finalize with testing and delivery. It's a collaborative process, and I keep you updated every step of the way."
  },
  {
    question: "How long does a project usually take?",
    answer: "The timeline depends on the scope of the project. Smaller projects, like logo design, may take 1-2 weeks, while larger projects, such as website design, can take 4-6 weeks. I'll provide a detailed timeline once we've discussed your needs."
  },
  {
    question: "What do I need to provide before starting a project?",
    answer: "Typically, I'll need information about your business, your goals, and any branding assets you already have, like a logo or color palette. For web projects, content like text and images will also be required. Don't worry—I'll guide you through this step."
  },
  {
    question: "Do you offer revisions?",
    answer: "Yes, revisions are part of my process to ensure the final design meets your expectations. I usually include 2-3 rounds of revisions depending on the project. Additional revisions can be arranged if needed."
  },
  {
    question: "How do I get started?",
    answer: "Simply reach out through my contact page or email me directly. We'll schedule a consultation to discuss your project, goals, and timeline. From there, I'll provide a proposal to get things moving."
  }
];
```

### Arquitetura de Layout (Grid + Sticky)

- Padding generoso: `py-24`
- Container: `grid grid-cols-1 lg:grid-cols-12 gap-12`

#### Lado Esquerdo (`lg:col-span-4`) — Titulo Sticky
- Classes: **`sticky top-32 self-start`**
- `self-start` e CRITICO: sem ele, o item estica para preencher a coluna (`align-items: stretch` e o padrao do grid) e o sticky nao funciona
- Conteudo:
  - **Titulo:** "FREQUENTLY ASKED QUESTIONS"
    - Fonte: Antonio uppercase, `--text-3xl`, `--font-weight-bold`
    - Cor: `--color-text-primary`
  - **Descricao:** Texto explicativo curto
    - Fonte: Inter `--text-base`, `--color-text-secondary`
- No mobile (`< lg`): sticky nao se aplica, colunas empilham normalmente

#### Lado Direito (`lg:col-span-8`) — Lista do Accordion
- Renderiza os 6 itens do FAQ com `.map()`
- Esta coluna rola normalmente enquanto o titulo esquerdo fica fixo

### Componente Accordion

#### Estado
```typescript
const [openIndex, setOpenIndex] = useState<number | null>(0);
// Inicia com o primeiro item aberto (index 0)
```

#### Cada Item do Accordion

**Borda:** apenas no topo — `border-t border-gray-800` (dark) / `border-neutral-200` (light)

**Cabecalho (button clicavel):**
- Layout: `flex items-center justify-between w-full`
- Padding: `py-6`
- Conteudo:
  - **Indice:** "1.", "2.", etc. — Inter `--text-sm`, `--color-text-muted`
  - **Pergunta:** Inter `--text-lg`, `--font-weight-semibold`, `--color-text-primary`
  - **Chevron:** icone `^` ou SVG chevron na extremidade direita
    - Se aberto: `rotate-180` com transicao
    - Transicao: `transition-transform duration-300`
- `cursor: pointer`
- Hover: leve mudanca de cor no texto

**Resposta (animacao suave — Tailwind, SEM GSAP):**

Tecnica: transicao de `grid-template-rows` do CSS Grid:

```html
<!-- Container da resposta -->
<div class={`
  grid transition-all duration-300 ease-in-out
  ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
`}>
  <!-- Paragrafo interno -->
  <p class="overflow-hidden">
    {answer}
  </p>
</div>
```

- **Fechado:** `grid-rows-[0fr]` + `opacity-0` — altura colapsa suavemente
- **Aberto:** `grid-rows-[1fr]` + `opacity-100` — altura expande suavemente
- `overflow-hidden` no paragrafo interno e obrigatorio para o efeito funcionar
- Transicao: `duration-300 ease-in-out`
- NAO usar GSAP aqui — o truque do grid-rows do Tailwind e mais limpo e leve para accordions

#### Comportamento
- Click no cabecalho: toggle entre aberto/fechado
- Apenas UM item aberto por vez (`openIndex` e unico, nao array)
- Click no item ja aberto: fecha ele (`setOpenIndex(null)`)

### Responsivo
- Desktop (`lg`): 2 colunas (titulo sticky 4/12 + accordion 8/12)
- Tablet/Mobile (`< lg`): 1 coluna empilhada, titulo nao e sticky, accordion full-width

---

## 9. Blog Section — `<BlogSection />`

### Dados Mock

```typescript
const blogData = [
  {
    id: "5-design-trends-that-will-define-2024",
    category: "Insights",
    date: "Apr 30, 2025",
    title: "5 Design Trends That Will Define 2024",
    excerpt: "Explore the top design trends for 2024 that will influence web, UI/UX, and branding projects, helping you stay ahead of the curve.",
    image: "/placeholder-blog-1.jpg"
  },
  {
    id: "how-to-streamline-your-design-workflow",
    category: "Tutorials",
    date: "Apr 27, 2025",
    title: "How to Streamline Your Design Workflow",
    excerpt: "Discover practical strategies to improve your design process, save time, and deliver quality work more efficiently.",
    image: "/placeholder-blog-2.jpg"
  }
];
```

### Cabecalho da Secao

- **Titulo:** "DESIGN INSIGHTS & IDEAS"
  - Fonte: Antonio uppercase, `--text-3xl` a `--text-4xl`, `--font-weight-bold`
  - Cor: `--color-text-primary`
- **Descricao:** "From design trends to creative processes, these articles offer insights to help you elevate your craft, solve challenges, and spark new ideas for your projects."
  - Fonte: Inter `--text-base`, `--color-text-secondary`
  - Largura: `max-w-2xl`
- **Botao "VIEW ALL ARTICLES":**
  - Alinhado a direita do cabecalho (desktop) ou abaixo da descricao (mobile)
  - Reutilizar **mesmo hover de preenchimento** (overflow-hidden, fill from bottom-left)
  - Estilo: outline pill, borda accent, texto accent
  - Navega para `/blogs`

### Grid de Cards

```css
grid grid-cols-1 md:grid-cols-2 gap-8
```

#### Card de Blog (`.blog-card`)

- **Clicavel:** usar `<Link>` do Next.js → `/blogs/{id}`
- **Cursor:** `cursor: pointer` (mas cursor customizado sobrepoe no desktop)

**Imagem (topo):**
- `aspect-video`, `object-cover`, `rounded-3xl`, container com `overflow-hidden`
- **Hover effect:** imagem interna faz `scale-105`
  - Usar transicoes nativas do Tailwind: `transition-transform duration-500`
  - Classe na imagem: `group-hover:scale-105` (card e o `group`)

**Textos (abaixo da imagem):**
- **Categoria + Data (mesma linha):**
  - Categoria: badge outline pill — borda `--color-border`, texto `--color-text-primary`, Inter `--text-xs`
  - Data: Inter `--text-xs`, `--color-text-secondary`
  - Gap entre eles: `--space-3`
- **Titulo:**
  - Fonte: Antonio uppercase, `--text-xl`, `--font-weight-bold`
  - Cor: `--color-text-primary`
  - Margin top: `--space-3`
- **Excerpt:**
  - Fonte: Inter `--text-sm`, `--color-text-secondary`
  - Max 2-3 linhas (`line-clamp-3` se necessario)

### Cursor Customizado (GSAP)

**NOTA DE REFATORACAO:** O cursor customizado ja foi usado na secao Featured Projects. O @dev DEVE considerar criar um componente global `<CustomCursor />` reutilizavel em vez de duplicar codigo. Isso e Clean Code.

#### Se refatorar para componente global:

```typescript
// components/CustomCursor.tsx
interface CustomCursorProps {
  containerRef: React.RefObject<HTMLElement>;
  triggerSelector: string;  // ex: ".blog-card", ".project-card"
  icon?: React.ReactNode;   // default: seta ↗
  size?: number;             // default: 64px
}
```

#### Especificacao (mesma logica da secao Featured Projects):
- `div` fixa: `position: fixed`, `pointer-events: none`, `z-50`, `rounded-full`
- Fundo: accent lime (`--color-primary`)
- Icone: seta diagonal ↗, cor preta
- Estado inicial: `scale: 0`, `opacity: 0`
- `gsap.quickTo()` para rastrear `mousemove` com fluidez
- `mouseenter` em `.blog-card`: `scale: 0 → 1`, `opacity: 0 → 1`
- `mouseleave` de `.blog-card`: `scale: 1 → 0`, `opacity: 1 → 0`
- Desativar em touch devices (`@media (hover: hover)`)

### Responsivo
- Desktop (`md+`): 2 colunas, cursor customizado ativo
- Mobile: 1 coluna, cursor customizado desativado, cards empilhados

---

## 10. Contact Section — `<ContactSection />` (Ultima secao da Home)

> Secao de conversao — transforma autoridade construida nas secoes anteriores em lead.
> Visualmente cria "ciclo completo" trazendo de volta a imagem do Hero + badge animado.
> O Card 3D Sticky ja estacionou na Secao 3 — a imagem aqui e um elemento estatico normal no DOM.

### Arquitetura de Layout

- `section` com padding generoso: `py-24`
- Grid: `grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`
- Diretiva React: `'use client'` (formulario com estado)

### Lado Esquerdo — Imagem + Badge

#### Imagem de Perfil
- Mesma foto do Hero (reutilizar asset)
- `object-cover`, `rounded-3xl`, `h-[600px]`, `w-full`, `max-w-md`
- Elemento estatico normal (NAO e o Card Sticky — este ja estacionou)

#### Badge Animado "Hi 👋"
- **Reutilizar EXATAMENTE** a mesma estrutura do badge do Hero
- Posicao: canto inferior esquerdo da foto
- Circulo com fundo accent lime (`--color-primary`)
- Animacao em loop: "Hi" ↔ "👋" alternando vertical infinitamente
- Se possivel, extrair em componente `<HiBadge />` reutilizavel entre Hero e Contact

### Lado Direito — Textos + Formulario

#### Cabecalho
- **Titulo:** "LET'S WORK TOGETHER"
  - Fonte: Antonio uppercase, `--text-3xl` a `--text-4xl`, `--font-weight-bold`
  - Cor: `--color-text-primary`
- **Descricao:** "Let's build something impactful together—whether it's your brand, your website, or your next big idea."
  - Fonte: Inter `--text-base`, `--color-text-secondary`

#### Formulario

```html
<form class="flex flex-col gap-6 mt-8">
```

##### Estilo Base dos Inputs (TODOS os campos seguem)
- Fundo: cinza muito escuro `bg-[#1a1a1a]` (dark) / `--color-surface` (light)
- Cantos: `rounded-2xl`
- Padding: `p-4` (confortavel)
- Texto: branco (dark) / `--color-text-primary` (light)
- Placeholder: `--color-text-muted`
- Borda: nenhuma por padrao (`border-none` ou `border-transparent`)
- **Focus:** `outline` na cor accent lime (`--color-primary`)
  - `focus:outline-2 focus:outline-[--color-primary]` ou `focus:ring-2 focus:ring-[--color-primary]`
- Sem bordas agressivas — visual premium, limpo
- Fonte: Inter `--text-base`

##### Labels
- Cor: **accent lime** (`--color-primary`, #d0ff71 dark / #5e67e6 light)
- Fonte: Inter `--text-sm`, `--font-weight-medium`
- Posicao: acima do campo

##### Campos

**Linha 1 — Grid 2 colunas (`grid grid-cols-1 md:grid-cols-2 gap-4`):**
- **Name:** label "Name", input `type="text"`, placeholder "John Smith"
- **Email:** label "Email", input `type="email"`, placeholder "johnsmith@gmail.com"

**Linha 2 — Full width:**
- **Service Needed:** label "Service Needed ?", `<select>` com placeholder "Select..."
  - Opcoes: UI/UX Design, Graphic Design, Web Design, Branding, Other
  - Estilo do select: mesmo fundo/radius/padding dos inputs
  - Seta do dropdown: customizada ou `appearance-none` com chevron SVG

**Linha 3 — Full width:**
- **Mensagem:** label "What Can I Help You...", `<textarea>`, placeholder "Hello, I'd like to enquire about..."
  - Altura: ~4 linhas (`rows={4}` ou `min-h-[120px]`)
  - `resize-none` (nao redimensionavel pelo usuario)

##### Botao Submit
- Texto: "SUBMIT"
- Fonte: Antonio uppercase, `--font-weight-bold`
- Estilo: **reutilizar EXATAMENTE o mesmo hover avancado** dos outros botoes:
  - `overflow-hidden`
  - Borda accent lime (`--color-primary`)
  - Pseudo-elemento `::before` com fill crescendo do bottom-left
  - Texto muda de accent → preto quando coberto
  - Radius: `--radius-full` (pill)
  - Padding: generoso (`py-4 px-8`)
- Largura: `w-fit` (nao full-width)

##### Funcionalidade (temporaria)
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Form submitted:', formData);
  // Integracao futura: API route, n8n, Make, etc.
};
```

- `e.preventDefault()` — nao recarregar a pagina
- `console.log` com os dados — pronto para integrar API depois
- Estado do form com `useState` para cada campo ou objeto unico

### Validacao Client-Side (basica)
- Campos obrigatorios: Name, Email, Service, Message
- Validacao de formato email
- Feedback visual: campos invalidos com borda `--color-danger-500` (mas so apos submit, nao no primeiro keystroke)

### Responsivo
- Desktop (`lg`): 2 colunas — imagem esquerda + form direita
- Tablet/Mobile: 1 coluna — imagem em cima (ou escondida em mobile pequeno), form abaixo full-width

---

## 11. Footer — `<Footer />`

> O footer **inverte a paleta** do site: fundo accent lime com texto escuro.
> Causa impacto visual forte e garante que informacoes de contato nao passem despercebidas.
> Sinaliza o fim da jornada de forma vibrante.

### Estilo Base — Inversao de Paleta

- **Fundo:** accent lime (`--color-primary`, #d0ff71 dark / #5e67e6 light)
  - Dark mode: `bg-[#d0ff71]` (verde neon)
  - Light mode: `bg-[#5e67e6]` (indigo) — com texto branco
- **Texto:** escuro (`text-gray-900` ou `text-black`) no dark mode — alto contraste
- **Padding:** generoso — `py-16 px-8` ou similar
- Quebra o padrao escuro do site inteiro — efeito "grand finale"

### Parte Superior — Grid de 3 Colunas

```css
grid grid-cols-1 md:grid-cols-3 gap-8
```

#### Coluna 1 — Email
- Label: "Email :" — texto pequeno, `--text-xs`, opacidade reduzida
- Valor: **"designer@example.com"** — texto grande, `--text-lg` a `--text-xl`, `--font-weight-bold`
- Link: `mailto:` clicavel

#### Coluna 2 — Telefone
- Label: "Call Today :" — texto pequeno, `--text-xs`, opacidade reduzida
- Valor: **"+1 (555) 123-4567"** — texto grande, `--text-lg` a `--text-xl`, `--font-weight-bold`
- Link: `tel:` clicavel

#### Coluna 3 — Social
- Label: "Social :" — texto pequeno, `--text-xs`, opacidade reduzida
- Icones: **X, Instagram, Behance, Dribbble**
  - SVG inline, alinhados a esquerda, horizontal
  - Cor: escura (preto/cinza-900)
  - Tamanho: ~24px
  - Hover: `hover:scale-110 transition-transform` — leve zoom suave
  - Links abrem em nova aba (`target="_blank" rel="noopener noreferrer"`)

### Separador

- `<hr>` ou `<div>` com `border-black/20` (borda preta semitransparente)
- Margem vertical: `my-12`
- Sutil, nao agressivo

### Parte Inferior — Copyright + Creditos

Layout: `flex flex-col md:flex-row justify-between items-center gap-4`

#### Lado Esquerdo — Copyright
- Texto: **"© Copyright 2026. All Rights Reserved by Gabriel Feliciano"**
- Fonte: Inter `--text-sm`

#### Lado Direito — Creditos
- Layout: flex alinhado horizontal
- Conteudo: "Created by" + Avatar pequeno circular (~24px) + **"Gabriel Feliciano"** com underline
- O nome pode ser link para o topo da pagina (scroll to top)

### Responsivo
- Desktop (`md+`): 3 colunas no topo, flex row no rodape
- Mobile: colunas empilham (1 coluna), rodape centralizado

### Acessibilidade
- Contraste: texto preto sobre verde neon = alto contraste ✓
- Links com `aria-label` nos icones sociais (sem texto visivel)
- Footer semantico: `<footer>` tag

---

## HOMEPAGE COMPLETA ✓

Todas as secoes da homepage foram especificadas:

- [x] NoiseBackground (efeito global)
- [x] Header (pilula magica com scroll animation)
- [x] Hero Section (titulo split + foto sticky + badge Hi)
- [x] Services Section (accordion + mouse follow image reveal)
- [x] About Section (estatisticas animadas + contato + redes)
- [x] Card 3D Sticky (jornada completa Hero → Services → About)
- [x] Featured Projects (stacked cards + zoom-out + cursor custom)
- [x] Testimonials (Bento Grid misto + contagem animada)
- [x] FAQ Accordion (grid sticky + transicao grid-rows)
- [x] Blog / Insights (cards + cursor reutilizavel)
- [x] Contact Section (formulario premium + imagem + badge)
- [x] Footer (inversao de paleta, grand finale)

## PAGINAS INTERNAS (a desenvolver posteriormente)

- [ ] Pagina About (completa)
- [ ] Pagina Projects (listagem)
- [ ] Pagina Projeto Individual
- [ ] Pagina Blog (listagem)
- [ ] Pagina Blog Individual
