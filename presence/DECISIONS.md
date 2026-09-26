# MotoristaOPS Presença — Decisões aprovadas

## 2026-09-26

### D-001 — Produto

Criar uma linha MotoristaOPS Presença com presença digital, social e física integradas.

### D-002 — Página individual

O endereço padrão do motorista será:

`motoristaops.com.br/{slug}`

Domínio próprio será adicional comercial.

### D-003 — Painel

O painel ficará em:

`motoristaops.com.br/painel`

### D-004 — Página comercial

A landing comercial do produto ficará em:

`motoristaops.com.br/presenca`

A raiz atual `motoristaops.com.br` permanece preservada neste estágio.

### D-005 — Banco

PostgreSQL é o banco canônico.

Supabase pode ser usado como plataforma gerenciada de PostgreSQL, Auth e Storage.

### D-006 — Fonte da verdade

Skills, agentes, prompts, memória de modelo e screenshots não são fonte da verdade.

A verdade operacional deve estar em dados canônicos, contratos, templates, regras e estados persistidos.

### D-007 — Layout

É proibido depender de imagem -> interpretação por IA -> reconstrução de layout para produção automática.

A produção deve usar templates determinísticos.

### D-008 — Redes sociais

Instagram, LinkedIn, TikTok e YouTube são informados por URL/perfil.

A MotoristaOPS não publica nem administra conteúdo dessas redes dentro do painel na V1.

### D-009 — Google Business

Google Business é a integração social/local que deve fazer parte do painel quando o cliente autorizar.

### D-010 — Influenciadores

Influenciadores são clientes reais, inclusive quando recebem Press Kit promocional.

Não são testers.

### D-011 — Primeiro usuário de aceitação

Henrico será o primeiro usuário de validação de ponta a ponta depois que a estrutura estiver pronta.

Seu cadastro deve seguir o fluxo comum, sem perfil pré-criado.

### D-012 — Printi

Printi é a gráfica utilizada para materiais gráficos.

Enquanto uma API/webhook não for comprovada, o envio do pedido para a Printi permanece manual e explícito.

### D-013 — Kit físico

O kit completo é enviado em uma única remessa e pode incluir:

- cartão;
- placa;
- organizador;
- bala;
- lixinho automotivo;
- lenço umedecido;
- lenço seco;
- álcool em gel;
- brinde;
- embalagem.

### D-014 — Montagem

Após o recebimento dos materiais gráficos, a MotoristaOPS terá 2 a 3 dias úteis para montagem, embalagem e despacho.

### D-015 — Rastreamento

O painel deve exibir previsão e rastreamento do pacote com atualização automática quando a integração logística fornecer eventos verificáveis.


### D-016 — Publicação estática das páginas de motorista

As páginas públicas em `motoristaops.com.br/{slug}` serão renderizadas de forma determinística no momento da publicação.

O PostgreSQL permanece fonte da verdade. O HTML é artefato derivado, versionado e reproduzível.

Visitas públicas não devem depender de consulta ao banco em tempo real na arquitetura inicial.
