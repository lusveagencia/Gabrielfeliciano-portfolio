# Vertex Constitution

> Regras inegociaveis que todos os agentes DEVEM seguir. Violacoes bloqueiam o fluxo.

---

## SEGURANCA (aplica a TODOS os agentes)

1. **NUNCA** incluir secrets, tokens, API keys, senhas ou credentials em codigo versionado
2. **NUNCA** confiar em dados vindos do cliente — validar SEMPRE no server-side
3. **SEMPRE** aplicar principio do menor privilegio (RLS, roles, scoped tokens)
4. **NUNCA** desabilitar HTTPS ou certificados em producao
5. **SEMPRE** sanitizar inputs contra SQL injection, XSS, CSRF, path traversal
6. **NUNCA** logar dados sensiveis (senhas, CPF, numeros de cartao, tokens)
7. **SEMPRE** usar hashing forte para senhas (bcrypt/argon2, NUNCA MD5/SHA1)
8. **NUNCA** expor stack traces ou mensagens de erro internas ao usuario final

---

## LGPD — Lei Geral de Protecao de Dados (aplica a TODOS os agentes)

9. **NUNCA** coletar dados pessoais sem consentimento explicito e informado
10. **SEMPRE** implementar direito de exclusao (usuario pode pedir delete dos seus dados)
11. **SEMPRE** minimizar dados coletados — pedir somente o estritamente necessario
12. **NUNCA** compartilhar dados pessoais com terceiros sem base legal documentada
13. **SEMPRE** documentar a finalidade de cada dado pessoal coletado
14. **SEMPRE** implementar politica de privacidade acessivel e em linguagem clara
15. **SEMPRE** registrar consentimento com timestamp (quando, como, para que)
16. **NUNCA** usar dados coletados para finalidade diferente da informada ao usuario

---

## DESIGN (aplica a @dev e @designer)

17. **NUNCA** inventar cores, espacamentos ou tipografia fora do Design System definido
18. **SEMPRE** usar tokens do Design System (nenhum valor magico no codigo)
19. **SEMPRE** garantir WCAG AA: contraste minimo 4.5:1, navegacao por teclado funcional
20. **SEMPRE** implementar estados: hover, active, focus-visible, disabled em todo elemento interativo
21. **NUNCA** produzir estetica generica de IA (gradientes roxos, neon, sans-serif generica sem personalidade)
22. **SEMPRE** implementar layout 100% responsivo — mobile (320px), tablet (768px), desktop (1280px+). Sem excecoes. Todo sistema, site, landing page ou app DEVE funcionar em qualquer dispositivo e tamanho de tela
23. **NUNCA** entregar layout que quebre, corte conteudo ou gere scroll horizontal em qualquer viewport entre 320px e 2560px
24. **SEMPRE** dar feedback visual para TODA acao do usuario (< 100ms). Nenhuma acao pode ser silenciosa — se o usuario clica e nada acontece visivelmente, e bug de UX
25. **NUNCA** bloquear uma acao do usuario sem feedback visual explicando o motivo (campos bloqueados, botoes desabilitados, etc. devem mostrar PORQUE)

---

## CODIGO (aplica a @dev)

26. **SEMPRE** tratar erros adequadamente (never swallow exceptions silently)
27. **NUNCA** commitar arquivos .env, credentials, keys ou qualquer secret
28. **SEMPRE** usar imports absolutos quando o projeto estiver configurado para tal
29. **SEMPRE** escrever codigo limpo, autodocumentado, seguindo padroes existentes
30. **NUNCA** deixar TODO/FIXME criticos sem resolver antes de declarar feature completa

---

## DOCUMENTACAO (aplica a TODOS os agentes que geram documentos)

31. **SEMPRE** incluir frontmatter YAML de assinatura em todo documento gerado (conforme `.vertex/templates/_signature.md`)
32. **SEMPRE** preencher todos os campos obrigatorios: documento, projeto, autor, fase, versao, status, criado_em, atualizado_em, dependencias
33. **SEMPRE** atualizar `atualizado_em` e incrementar `versao` ao editar documento existente
34. **NUNCA** alterar o campo `criado_em` apos a criacao do documento

---

## PROCESSO (aplica a TODOS os agentes)

35. **SEMPRE** gerar handoff ao passar trabalho para outro agente
36. **NUNCA** pular fases do workflow sem aprovacao explicita do usuario
37. **SEMPRE** declarar impedimentos imediatamente quando encontrados
38. **NUNCA** assumir decisoes de arquitetura ou design sem consultar o agente responsavel

---

## Enforcement

Estas regras sao verificadas em:
- **Gate de Fundacao (Fase 2):** @seguranca e @juridico validam que suas regras foram definidas
- **Gate de Validacao (Fase 4):** @revisor, @seguranca, @juridico e @designer verificam conformidade
- **Hook de pre-commit:** Bloqueia commits com secrets detectados (.env, API keys)

Violacao de regras 1-8 (Seguranca) ou 9-16 (LGPD) resulta em **BLOQUEIO** imediato.
Violacao de regras 17-25 (Design, Responsividade, UX) resulta em **CORRECAO** obrigatoria antes de aprovacao.
Violacao de regras 24-25 (Feedback/UX) resulta em **CORRECAO** obrigatoria — acao silenciosa ou bloqueio sem explicacao e bug de UX.
Violacao de regras 31-34 (Documentacao) resulta em **CORRECAO** obrigatoria — documento sem assinatura nao e aceito em gates.
