---
documento: Requisitos do Projeto
projeto: Portfolio Gabriel
autor: @estrategista (Ester)
fase: 1 — Descoberta
versao: 1.1
status: aprovado
criado_em: 2026-06-16
atualizado_em: 2026-06-16
dependencias:
  - docs/brief.md
---

# Requisitos do Projeto — Portfolio Gabriel

## Requisitos Funcionais

### RF-01: Navegacao Global
**Prioridade:** Alta
**Descricao:** Header fixo com navegacao entre paginas (About, Projects, Blogs, Contact), logo/nome, informacoes de contato e redes sociais.
**Criterio de aceite:**
- Header visivel em todas as paginas
- Links navegam corretamente entre paginas
- Header responsivo com menu hamburger em mobile
- Animacao suave de scroll ao clicar em links ancora (#contact)

### RF-02: Hero Section
**Prioridade:** Alta
**Descricao:** Secao inicial com nome, titulo profissional, subtitulo e elementos visuais com animacoes de entrada.
**Criterio de aceite:**
- Animacao de entrada ao carregar a pagina (GSAP)
- Textos responsivos com tipografia impactante
- Transicao suave para proxima secao

### RF-03: Secao de Servicos
**Prioridade:** Alta
**Descricao:** 4 cards de servicos (UI/UX, Graphic Design, Web Design, Branding) com subitens listados.
**Criterio de aceite:**
- 4 cards com hover interativo
- Animacao de reveal ao scroll (ScrollTrigger)
- Layout responsivo: grid em desktop, stack em mobile

### RF-04: Secao About Me
**Prioridade:** Alta
**Descricao:** Texto biografico, 3 estatisticas animadas (contador), contato direto e link para pagina About.
**Criterio de aceite:**
- Contadores animados ao entrar na viewport
- Estatisticas: anos de experiencia, projetos completos, clientes
- Link funcional para pagina /about

### RF-05: Secao Featured Projects
**Prioridade:** Alta
**Descricao:** Grid de 4 projetos em destaque com categoria, titulo, descricao e imagem.
**Criterio de aceite:**
- Hover com animacao na imagem/card
- Click navega para pagina individual do projeto
- Animacao de reveal ao scroll
- Botao "Browse All Projects" navega para /projects

### RF-06: Secao Testimonials
**Prioridade:** Media
**Descricao:** 4 depoimentos de clientes com nome, cargo e texto, acompanhados de metricas.
**Criterio de aceite:**
- Cards de depoimento com layout clean
- Metricas animadas (satisfaction rate, growth)
- Animacao de entrada ao scroll

### RF-07: Secao FAQ
**Prioridade:** Media
**Descricao:** 6 perguntas frequentes em formato accordion (abre/fecha).
**Criterio de aceite:**
- Click abre/fecha resposta com animacao suave
- Apenas um item aberto por vez (ou multiplos — decisao do designer)
- Acessivel por teclado (Enter/Space para toggle)

### RF-08: Secao Blog/Insights
**Prioridade:** Media
**Descricao:** 2 artigos recentes com categoria, data, titulo e descricao.
**Criterio de aceite:**
- Cards clicaveis navegam para pagina do artigo
- Botao "Browse All Insights" navega para /blogs

### RF-09: Secao CTA Final
**Prioridade:** Alta
**Descricao:** Frase de impacto com botao de acao direcionando ao contato.
**Criterio de aceite:**
- Animacao de texto impactante ao scroll
- Botao funcional direcionando para secao/pagina de contato

### RF-10: Formulario de Contato
**Prioridade:** Alta
**Descricao:** Formulario com campos para nome, email e mensagem, com envio funcional.
**Criterio de aceite:**
- Validacao client-side (campos obrigatorios, formato email)
- Feedback visual de envio (loading, sucesso, erro)
- Envio funcional (API route ou servico externo)
- Protecao contra spam (honeypot ou reCAPTCHA)

### RF-11: Pagina About
**Prioridade:** Alta
**Descricao:** Pagina completa com bio, servicos, timeline de experiencia, tech stack e design process.
**Criterio de aceite:**
- Timeline de experiencia com 4 posicoes (cargo, empresa, periodo)
- Tech stack com 5 ferramentas e descricoes
- Design process com 5 etapas numeradas
- Animacoes de scroll em todas as secoes

### RF-12: Pagina Projects (listagem)
**Prioridade:** Alta
**Descricao:** Listagem de todos os projetos: 4 featured + 5 adicionais.
**Criterio de aceite:**
- Grid de projetos com hover interativo
- Cada card navega para pagina individual
- Layout responsivo

### RF-13: Pagina Projeto Individual
**Prioridade:** Alta
**Descricao:** Pagina detalhada de cada projeto com metadados, problema/solucao/desafio e projetos relacionados.
**Criterio de aceite:**
- Metadados: ano, industria, cliente, duracao
- Secoes narrativas: problema, solucao, desafio
- Secao "More Projects" com navegacao para outros projetos
- Animacoes de entrada

### RF-14: Pagina Blog (listagem)
**Prioridade:** Media
**Descricao:** Listagem de todos os artigos do blog com categoria, data, titulo e descricao.
**Criterio de aceite:**
- Grid/lista de artigos
- Cards clicaveis

### RF-15: Pagina Blog Individual
**Prioridade:** Media
**Descricao:** Pagina de artigo completo com conteudo, metadados e posts relacionados.
**Criterio de aceite:**
- Renderizacao de conteudo com tipografia adequada
- Secao "Related Posts" ao final
- Responsivo e legivel

### RF-16: Traducao i18n (next-intl / react-i18next)
**Prioridade:** Alta
**Descricao:** Todo o conteudo do site disponivel em Portugues Brasil e Ingles EUA, gerenciado via next-intl (ou react-i18next).
**Criterio de aceite:**
- Seletor de idioma visivel no header
- Troca de idioma sem reload da pagina (ou com transicao suave)
- Todos os textos traduzidos (UI + conteudo)
- URL reflete o idioma (/pt-br/... ou /en/...)
- Idioma padrao detectado pelo navegador do visitante
- Meta tags e SEO adaptados por idioma
- Traducoes centralizadas em arquivos dedicados (sem strings hardcoded nos componentes)
- Implementacao via next-intl ou react-i18next

### RF-17: Tema Dark / Light (next-themes)
**Prioridade:** Alta
**Descricao:** Toggle de tema com transicao suave entre modo escuro e claro, gerenciado via next-themes.
**Criterio de aceite:**
- Toggle visivel no header
- Transicao suave entre temas (sem flash — next-themes previne FOUC)
- Respeita prefers-color-scheme do sistema como padrao inicial
- Persistencia da escolha em localStorage (gerenciado pelo next-themes)
- Todas as secoes/componentes adaptados para ambos os temas
- Implementacao via next-themes (ThemeProvider)

### RF-18: Footer Global
**Prioridade:** Media
**Descricao:** Footer com navegacao, contato e redes sociais, presente em todas as paginas.
**Criterio de aceite:**
- Links de navegacao funcionais
- Email e telefone clicaveis
- Links de redes sociais abrindo em nova aba

## Requisitos Nao-Funcionais

### NFR-01: Performance
**Prioridade:** Alta
**Descricao:** Site rapido e otimizado.
**Criterio de aceite:**
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Lazy loading em imagens abaixo do fold
- Code splitting por rota

### NFR-02: Animacoes em 60fps
**Prioridade:** Alta
**Descricao:** Todas as animacoes devem rodar a 60fps sem jank.
**Criterio de aceite:**
- GSAP com will-change e transform (GPU-accelerated)
- Sem jank em scroll animations
- Degradacao graciosa em dispositivos fracos (prefers-reduced-motion)

### NFR-03: Responsividade
**Prioridade:** Alta
**Descricao:** Layout adaptavel a qualquer tamanho de tela.
**Criterio de aceite:**
- Funciona de 320px (mobile pequeno) ate 2560px+ (ultrawide)
- Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (1024-1440px), large (1440px+)
- Sem scroll horizontal em nenhuma resolucao
- Touch-friendly em dispositivos moveis (alvos de toque >= 44px)

### NFR-04: SEO
**Prioridade:** Alta
**Descricao:** Otimizacao para mecanismos de busca.
**Criterio de aceite:**
- Meta tags (title, description) por pagina e por idioma
- Open Graph e Twitter Cards
- Sitemap.xml gerado automaticamente
- HTML semantico (header, main, nav, section, article, footer)
- Heading hierarchy correta (h1 > h2 > h3)
- Alt text em todas as imagens

### NFR-05: Acessibilidade
**Prioridade:** Alta
**Descricao:** WCAG AA compliance.
**Criterio de aceite:**
- Contraste minimo 4.5:1 em texto
- Navegacao completa por teclado
- Focus visible em elementos interativos
- Aria labels em elementos sem texto visivel
- prefers-reduced-motion desativa animacoes pesadas
- Leitor de tela: estrutura compreensivel

### NFR-06: Compatibilidade de Navegadores
**Prioridade:** Alta
**Descricao:** Funciona nos principais navegadores.
**Criterio de aceite:**
- Chrome 90+ (desktop e mobile)
- Firefox 90+
- Safari 15+ (desktop e iOS)
- Edge 90+

### NFR-07: Qualidade de Codigo
**Prioridade:** Alta
**Descricao:** Codigo limpo, tipado e bem estruturado.
**Criterio de aceite:**
- TypeScript strict mode
- ESLint + Prettier configurados
- Componentizacao coerente (componentes reutilizaveis)
- Nomenclatura consistente (inglês para codigo)
- Separacao clara de concerns (componentes, hooks, utils, constants)

### NFR-08: Gestao de Conteudo via /data
**Prioridade:** Alta
**Descricao:** Todo conteudo editavel centralizado em pasta /data com arquivos .ts/.json — nunca hardcoded em componentes.
**Criterio de aceite:**
- Pasta /data com arquivos separados por dominio (projects.ts, services.ts, testimonials.ts, faq.ts, blog.ts, experience.ts, techstack.ts, site.ts)
- Componentes consomem dados via import e renderizam com .map()
- Cada arquivo suporta ambos idiomas (PT-BR e EN-US)
- Adicionar/editar conteudo nao requer mexer em componentes React

### NFR-09: Deploy
**Prioridade:** Media
**Descricao:** Deploy automatizado e acessivel.
**Criterio de aceite:**
- Deploy via Vercel (recomendado) ou similar
- URL temporaria funcional para preview
- Build sem erros em producao
