---
documento: Regras LGPD
projeto: {Nome do Projeto}
autor: @juridico (Juno)
fase: 2 — Fundacao
versao: 1.0
status: rascunho
criado_em: {YYYY-MM-DD}
atualizado_em: {YYYY-MM-DD}
dependencias: [brief.md, arquitetura.md]
base_legal: LGPD (Lei 13.709/2018), Marco Civil da Internet (Lei 12.965/2014)
---

# Regras LGPD: {Nome do Projeto}

---

## 1. Mapeamento de Dados Pessoais

| Dado | Tipo | Finalidade | Base Legal | Retencao |
|------|------|-----------|-----------|----------|
| Email | Pessoal | Autenticacao, comunicacao | Contrato | Enquanto conta ativa |
| Nome | Pessoal | Identificacao | Contrato | Enquanto conta ativa |
| {dado} | {pessoal/sensivel} | {finalidade} | {base legal} | {tempo} |

### Classificacao

- **Dados Pessoais:** nome, email, telefone, endereco
- **Dados Sensiveis (Art. 5, II):** saude, biometria, religiao, opiniao politica, vida sexual, dados geneticos, filiacao sindical
- **Dados de Menores (Art. 14):** requer consentimento dos pais/responsaveis

---

## 2. Bases Legais Utilizadas (Art. 7)

- [ ] **Consentimento (Art. 7, I):** {quais dados}
- [ ] **Contrato (Art. 7, V):** {quais dados}
- [ ] **Legitimo Interesse (Art. 7, IX):** {quais dados — requer LIA}
- [ ] **Obrigacao Legal (Art. 7, II):** {quais dados}

---

## 3. Consentimento

### Requisitos (Art. 8)

- [ ] Consentimento livre, informado e inequivoco
- [ ] Finalidade especifica e destacada
- [ ] Granular (por finalidade, nao "aceito tudo")
- [ ] Revogavel a qualquer momento (tao facil quanto dar)
- [ ] Registro com timestamp (quem, quando, para que consentiu)

### Implementacao

```
[ ] Banner de cookies com opcoes granulares
[ ] Checkbox de consentimento em formularios (NAO pre-marcado)
[ ] Mecanismo de revogacao acessivel
[ ] Log de consentimentos em tabela dedicada
```

---

## 4. Direitos do Titular (Art. 18)

| Direito | Implementacao | Prazo |
|---------|---------------|-------|
| Acesso | Exportar dados em JSON/CSV | 15 dias |
| Correcao | Editar perfil | Imediato |
| Exclusao | Delete account + dados | 15 dias |
| Portabilidade | Export padronizado | 15 dias |
| Revogacao | Revogar consentimentos | Imediato |
| Informacao | Politica de privacidade | Sempre acessivel |

### Implementacao Obrigatoria

- [ ] Pagina "Meus Dados" no perfil do usuario
- [ ] Botao "Excluir minha conta" funcional
- [ ] Export de dados em formato legivel
- [ ] Canal de contato para exercicio de direitos (email DPO ou formulario)

---

## 5. Politica de Privacidade

Deve conter (Art. 9):
- [ ] Identidade do controlador (nome, CNPJ, contato)
- [ ] Dados coletados e finalidade de cada um
- [ ] Base legal para cada tratamento
- [ ] Compartilhamento com terceiros (quem, por que)
- [ ] Direitos do titular e como exerce-los
- [ ] Tempo de retencao
- [ ] Medidas de seguranca adotadas
- [ ] Contato do DPO/encarregado

---

## 6. Cookies e Tracking

| Cookie/Tracker | Tipo | Finalidade | Consentimento |
|---------------|------|-----------|---------------|
| Session | Necessario | Auth | Dispensado |
| Analytics | Performance | Metricas | Obrigatorio |
| Marketing | Publicidade | Ads | Obrigatorio |
| {cookie} | {tipo} | {finalidade} | {obrigatorio?} |

### Implementacao

- [ ] Banner de cookies na primeira visita
- [ ] Opcoes: Necessarios (sempre on) + Analiticos + Marketing
- [ ] Nenhum cookie nao-essencial antes do consentimento
- [ ] Persistir preferencia do usuario
- [ ] Link para politica de cookies

---

## 7. Compartilhamento com Terceiros

| Terceiro | Dados Compartilhados | Base Legal | DPA |
|----------|---------------------|-----------|-----|
| {servico} | {dados} | {base} | {sim/nao} |

- [ ] DPA (Data Processing Agreement) assinado com cada operador
- [ ] Terceiros listados na politica de privacidade

---

## 8. Seguranca dos Dados (Art. 46)

- [ ] Criptografia em transito (HTTPS)
- [ ] Criptografia em repouso para dados sensiveis
- [ ] Controle de acesso (menor privilegio)
- [ ] Logs de acesso a dados pessoais
- [ ] Backup com mesma protecao dos dados originais

---

## 9. Incidentes (Art. 48)

Plano de resposta:
1. Identificar e conter o incidente
2. Avaliar risco aos titulares
3. Notificar ANPD em **72 horas** (se risco relevante)
4. Notificar titulares afetados
5. Documentar e implementar melhorias

---

## Checklist Pre-Deploy

- [ ] Politica de privacidade publicada e acessivel
- [ ] Cookie consent funcional (nao apenas visual)
- [ ] Mecanismo de exclusao de conta funcional
- [ ] Consentimentos registrados com timestamp
- [ ] Dados coletados = dados declarados (nenhum extra)
- [ ] Terceiros documentados e com DPA
- [ ] Canal de contato DPO/encarregado ativo
