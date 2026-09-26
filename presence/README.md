# MotoristaOPS Presença

**Status:** EXPERIMENTAL / BOOTSTRAP

MotoristaOPS Presença é a linha de produto que combina presença digital, presença social e kit físico para motoristas profissionais.

## Escopo inicial

- landing page pública por motorista em `motoristaops.com.br/{slug}`;
- landing comercial do produto em `motoristaops.com.br/presenca`;
- painel autenticado em `motoristaops.com.br/painel`;
- Google Business integrado ao fluxo quando o cliente autorizar;
- Instagram, LinkedIn, TikTok e YouTube como links declarados pelo cliente, sem publicação social pela MotoristaOPS;
- cartão, placa, organizador e kit de ativação física;
- geração determinística por templates;
- logística e rastreamento integrados;
- operação zero-touch do lado MotoristaOPS, com exceção explícita do handoff físico para a Printi enquanto não houver integração confiável.

## Autoridade

A ordem de autoridade deste domínio é:

1. decisões explicitamente aprovadas e registradas;
2. contratos e schemas versionados;
3. dados canônicos persistidos em PostgreSQL;
4. templates aprovados e versionados;
5. Brand Book / Style Guide / Design System MotoristaOPS;
6. integrações externas verificadas;
7. agentes, skills e modelos como executores.

Skills, agentes, prompts, memória de modelo e interpretação de screenshots **não são fonte da verdade**.

## Documentos

- `PROJECT_PROFILE.md` — escopo, atores, limites e objetivos.
- `ARCHITECTURE.md` — arquitetura lógica e responsabilidades.
- `DECISIONS.md` — decisões aprovadas do produto.
- `contracts/driver-profile.schema.json` — contrato de dados do motorista.
- `contracts/order-state.schema.json` — contrato de estados do pedido.
- `contracts/product-catalog.schema.json` — contrato do catálogo e BOM.

## Regra de geração

Nenhuma landing page ou material físico deve ser reconstruído por IA a partir de imagem.

Produção automática = **template aprovado + dados estruturados + assets aprovados + validação**.
