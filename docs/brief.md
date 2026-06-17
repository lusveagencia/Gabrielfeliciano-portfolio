---
documento: Brief do Projeto
projeto: Portfolio Gabriel
autor: @estrategista (Ester)
fase: 1 — Descoberta
versao: 1.1
status: aprovado
criado_em: 2026-06-16
atualizado_em: 2026-06-16
dependencias: []
---

# Brief do Projeto — Portfolio Gabriel

## 1. Visao Geral

**O que e:** Portfolio pessoal profissional para apresentacao de trabalhos de desenvolvimento de sites.

**Objetivo:** Posicionar Gabriel como desenvolvedor de alto nivel, atrair agencias e clientes finais, e gerar contatos comerciais atraves de formulario.

**Referencia principal:** [Portavia (Framer)](https://portavia.framer.website/) — estrutura, layout e textos identicos como base.

**Nivel de qualidade:** Awwwards — animacoes cinematograficas, micro-interacoes, smooth scrolling, design pixel-perfect.

## 2. Publico-Alvo

| Perfil | Descricao | O que busca |
|--------|-----------|-------------|
| Agencias digitais | Agencias procurando devs freelancers ou parceiros | Qualidade tecnica, portfolio visualmente impressionante, cases relevantes |
| Clientes finais | Empresarios/profissionais que precisam de um site | Confianca, profissionalismo, facilidade de contato |

**Contexto de uso:** Desktop no escritorio (principal) e mobile para consultas rapidas. Visitantes avaliam em segundos — o impacto visual inicial e decisivo.

**Conversao desejada:** Visitante preenche o formulario de contato apos ser impactado pelo portfolio.

## 3. Estrutura do Site

Replica exata da estrutura do Portavia:

### Homepage
1. **Hero** — Nome + titulo profissional + subtitulo + elemento visual de impacto
2. **Services (What I Can Do)** — 4 cards de servicos com subitens
   - UI/UX Design (wireframing, prototipagem, testes, micro-animacoes)
   - Graphic Design (logo, social media, infograficos, ilustracoes)
   - Web Design (responsivo, landing pages, Webflow, manutencao)
   - Branding (estrategia, style guide, tipografia, storytelling)
3. **About Me** — Texto bio + 3 estatisticas (anos exp, projetos, clientes) + contato direto + link "My Story"
4. **Featured Projects** — 4 projetos com categoria, titulo, descricao e imagem
5. **Testimonials** — 4 depoimentos (nome, cargo, texto) + metricas (satisfacao, crescimento)
6. **FAQ** — 6 perguntas em accordion
   - What services do you offer?
   - How does the design process work?
   - How long does a project usually take?
   - What do I need to provide before starting a project?
   - Do you offer revisions?
   - How do I get started?
7. **Blog/Insights** — 2 artigos recentes com categoria, data, titulo e descricao
8. **CTA Final** — Frase de impacto + botao de acao
9. **Contact** — Formulario de contato (secao na homepage)

### Pagina About
- Bio completa
- Services (repetido da home)
- Timeline de experiencia profissional (4 posicoes com cargo, empresa, periodo)
- Tech Stack (5 ferramentas com descricao)
- Design Process (5 etapas: Research, Concept, Feedback, Testing, Launch)

### Pagina Projects
- Featured Projects (4 destaques)
- More Projects (5 projetos adicionais)
- Cada projeto com categoria e descricao

### Pagina Projeto Individual
- Hero com titulo
- Metadados (ano, industria, cliente, duracao)
- Secoes: Problema / Solucao / Desafio
- Projetos relacionados

### Pagina Blog (listagem)
- Lista de artigos com categoria, data, titulo e descricao

### Pagina Blog Individual
- Artigo completo
- Posts relacionados

### Header (global)
- Logo/Nome
- Navegacao: About, Projects, Blogs, Contact
- Email + Telefone
- Redes sociais
- Seletor de idioma (PT-BR / EN-US)
- Toggle de tema (Dark / Light)

### Footer (global)
- Navegacao repetida
- Contato (email + telefone)
- Redes sociais

## 4. Features Obrigatorias

| Feature | Descricao |
|---------|-----------|
| Traducao i18n | Bilingue: Portugues Brasil (PT-BR) e Ingles EUA (EN-US). Todo conteudo traduzido. |
| Tema Dark/Light | Toggle de tema com transicao suave. Respeitar preferencia do sistema (prefers-color-scheme). |
| Responsividade | 100% responsivo — mobile, tablet, desktop, monitores ultrawide. Breakpoints bem definidos. |
| Animacoes GSAP | ScrollTrigger para animacoes de entrada, parallax, reveal de secoes. Nivel Awwwards. |
| Smooth Scrolling | Lenis para scroll suave e fluido em toda a navegacao. |
| Formulario de contato | Campos para nome, email, mensagem. Envio funcional. |
| SEO | Meta tags, Open Graph, sitemap, semantica HTML5 correta. |
| Performance | Lighthouse 90+. Lazy loading de imagens, code splitting, otimizacao de fontes. |

## 5. Stack Tecnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14+ (App Router) |
| UI | React 18+ |
| Estilizacao | Tailwind CSS |
| Animacoes | GSAP (com ScrollTrigger) |
| Smooth Scroll | Lenis |
| Tema Dark/Light | next-themes (prefers-color-scheme + localStorage) |
| Internacionalizacao | next-intl (ou react-i18next) |
| Linguagem | TypeScript |
| Deploy | A definir (Vercel recomendado) |
| Dominio | A comprar posteriormente |

## 6. Conteudo

- **Textos:** Placeholder identico ao Portavia (ingles). Traducao para PT-BR sera necessaria.
- **Imagens:** Placeholder/improvisadas inicialmente. Substituicao posterior pelo conteudo real do Gabriel.
- **Projetos:** 9 projetos placeholder (mesmo do Portavia). Conteudo real sera adicionado depois.
- **Depoimentos:** 4 depoimentos placeholder do Portavia.
- **Blog:** 2+ artigos placeholder do Portavia.

### Gestao de Conteudo (Sem CMS)

Nenhum texto de conteudo deve ficar hardcoded nos componentes. Toda a informacao editavel deve estar centralizada em uma pasta `/data` com arquivos TypeScript ou JSON:

```
/data
├── projects.ts      # Todos os projetos (titulo, descricao, metadados, imagens)
├── services.ts      # Servicos oferecidos (titulo, subitens)
├── testimonials.ts  # Depoimentos de clientes
├── faq.ts           # Perguntas e respostas
├── blog.ts          # Artigos do blog
├── experience.ts    # Timeline de experiencia profissional
├── techstack.ts     # Ferramentas e tecnologias
└── site.ts          # Dados globais (nome, contato, redes sociais, bio)
```

Os componentes React fazem `.map()` sobre esses dados — nunca escrevem conteudo inline. Isso facilita:
- Traducao (cada arquivo tem as duas versoes de idioma)
- Manutencao (trocar conteudo sem mexer em componentes)
- Escalabilidade (adicionar projetos/artigos sem duplicar codigo)

## 7. Tom e Personalidade

Baseado na referencia Portavia:
- **Visual:** Clean, minimalista, muito espaco em branco, tipografia forte
- **Tom:** Profissional mas acessivel, confiante sem ser arrogante
- **Sensacao:** Premium, moderno, sofisticado — "esse dev sabe o que faz"

## 8. Restricoes

| Restricao | Detalhe |
|-----------|---------|
| Prazo | Ate 21/06/2026 (final da semana) |
| Sem backend | Sem banco de dados, sem autenticacao |
| Sem CMS | Conteudo estatico (pode evoluir para CMS depois) |
| Dominio | Ainda nao adquirido — deploy inicial em URL temporaria |

## 9. Criterios de Sucesso

- [ ] Site visualmente no nivel de projetos premiados no Awwwards
- [ ] Animacoes fluidas em 60fps, sem jank
- [ ] Nota Lighthouse 90+ em todas as categorias
- [ ] Funciona perfeitamente em Chrome, Firefox, Safari, Edge
- [ ] Responsivo em telas de 320px ate 2560px+
- [ ] Traducao completa PT-BR/EN-US sem quebra de layout
- [ ] Tema dark/light com transicao suave
- [ ] Formulario de contato funcional
- [ ] Tempo de carregamento inicial < 3 segundos
