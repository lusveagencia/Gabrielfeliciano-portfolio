# Checklist: Compliance LGPD

> Usado por @juridico na Fase 4 para verificar conformidade com a LGPD.

---

## 1. Politica de Privacidade

- [ ] Publicada e acessivel (link no footer ou menu)
- [ ] Linguagem clara e acessivel (nao juridiques)
- [ ] Identifica o controlador (nome, CNPJ, contato)
- [ ] Lista todos os dados coletados e finalidade
- [ ] Informa base legal de cada tratamento
- [ ] Descreve direitos do titular e como exerce-los
- [ ] Informa compartilhamento com terceiros
- [ ] Informa tempo de retencao de cada dado
- [ ] Contato do DPO/encarregado disponivel
- [ ] Atualizada (data da ultima revisao visivel)

## 2. Consentimento

- [ ] Consentimento coletado ANTES de processar dados
- [ ] Consentimento granular (por finalidade)
- [ ] Checkbox NAO pre-marcado
- [ ] Linguagem clara sobre o que esta consentindo
- [ ] Mecanismo de revogacao tao facil quanto dar consentimento
- [ ] Consentimento registrado (quem, quando, para que)
- [ ] Timestamp de cada consentimento armazenado
- [ ] Recusa nao impede acesso a funcionalidades essenciais

## 3. Cookies e Tracking

- [ ] Banner de cookies na primeira visita
- [ ] Cookies categorizado (necessario, analitico, marketing)
- [ ] Cookies necessarios: ativos sem consentimento (OK)
- [ ] Cookies analiticos/marketing: so apos consentimento
- [ ] Preferencia do usuario persistida
- [ ] Nenhum tracker carrega antes do consentimento
- [ ] Link para politica de cookies no banner
- [ ] Opcao de revogar a qualquer momento

## 4. Direitos do Titular

- [ ] **Acesso:** usuario consegue ver seus dados
- [ ] **Correcao:** usuario consegue editar seus dados
- [ ] **Exclusao:** usuario consegue deletar sua conta/dados
- [ ] **Portabilidade:** usuario consegue exportar dados (JSON/CSV)
- [ ] **Revogacao:** usuario consegue revogar consentimentos
- [ ] Canal de contato funcional para exercicio de direitos
- [ ] Prazo de atendimento: 15 dias uteis

## 5. Minimizacao de Dados

- [ ] Coletamos APENAS o necessario (nenhum campo extra "por via das duvidas")
- [ ] Formularios pedem somente o indispensavel
- [ ] Dados opcionais claramente marcados como opcionais
- [ ] Nenhuma coleta oculta (analytics sem declarar, etc.)

## 6. Seguranca dos Dados (Art. 46)

- [ ] HTTPS em toda a aplicacao
- [ ] Dados sensiveis criptografados em repouso
- [ ] Acesso a dados pessoais controlado (RLS/roles)
- [ ] Logs de acesso a dados pessoais existem
- [ ] Backup protegido com mesma seguranca

## 7. Compartilhamento com Terceiros

- [ ] Terceiros listados na politica de privacidade
- [ ] Base legal para cada compartilhamento
- [ ] DPA assinado com operadores (quando aplicavel)
- [ ] Dados transferidos internacionalmente? Se sim, clausulas padrao

## 8. Dados de Menores (Art. 14)

- [ ] Sistema coleta dados de menores de 18 anos? Se sim:
  - [ ] Consentimento de pais/responsaveis obrigatorio
  - [ ] Verificacao de idade implementada
  - [ ] Dados de menores com protecao extra

## 9. Incidentes

- [ ] Plano de resposta a incidentes documentado
- [ ] Prazo de 72h para notificar ANPD (se risco relevante)
- [ ] Processo de notificacao aos titulares definido
- [ ] Canal interno de reporte de incidentes

## Veredicto

- [ ] **CONFORME** — Todos os requisitos atendidos
- [ ] **NAO-CONFORME** — Correcoes obrigatorias listadas abaixo

### Nao-Conformidades
| # | Artigo LGPD | Descricao | Correcao Necessaria | Prazo |
|---|-------------|-----------|--------------------:|-------|
| 1 | Art. {N} | {descricao} | {o que fazer} | {prazo} |
