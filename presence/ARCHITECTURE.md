# MotoristaOPS Presença — Arquitetura

## Visão geral

```text
Cliente
  -> /presenca
  -> Auth
  -> Checkout
  -> /painel
  -> Onboarding
  -> PostgreSQL
  -> State Machine
  -> Renderers
       -> Landing
       -> Print
  -> Validation Gates
       -> Publish
       -> Print-ready
  -> Fulfillment
       -> Printi
       -> Inventory
       -> Assembly
       -> Shipping
  -> Tracking
```

## Componentes

### 1. Web pública

Responsável por:

- página do produto;
- páginas públicas dos motoristas;
- SEO;
- CTA;
- conteúdo público.

### 2. Painel

Responsável por:

- autenticação;
- onboarding;
- edição de dados permitidos;
- preview;
- Google Business;
- status do pedido;
- prazo;
- rastreamento.

### 3. Control Plane

Responsável por:

- orquestração determinística;
- regras de transição;
- validações;
- integração com serviços externos;
- geração e publicação;
- auditoria.

### 4. PostgreSQL

Fonte canônica de:

- usuários;
- perfis;
- produtos;
- pedidos;
- pagamentos;
- estados;
- estoque;
- remessas;
- eventos;
- versões de conteúdo.

### 5. Templates

Landing pages e peças gráficas devem ser versionadas.

A geração deve preencher campos estruturados. IA não pode reconstruir layout livremente.

### 6. Google

Google Auth e Google Business devem usar consentimento explícito e escopos separados quando necessário.

### 7. Print pipeline

```text
dados canônicos
  + template versionado
  + assets aprovados
  -> render
  -> preflight
  -> PDF final
  -> PRINT_READY
  -> handoff Printi
```

### 8. Inventory

Todo kit físico deve possuir uma BOM versionada.

Estoque precisa registrar:

- item;
- quantidade física;
- reservado;
- disponível;
- estoque mínimo;
- custo unitário;
- fornecedor;
- lead time.

### 9. Shipping

A camada logística deve suportar:

- cotação;
- etiqueta;
- rastreio;
- webhook;
- previsão de entrega.

A implementação inicial pode usar um agregador logístico desde que a integração seja verificável.

## Fail closed

Se uma etapa crítica não puder ser verificada:

- não publicar;
- não imprimir;
- não despachar;
- não avançar o estado silenciosamente.

## IA e skills

Podem gerar ou transformar conteúdo.

Toda saída deve:

1. obedecer contrato;
2. passar validação;
3. ser persistida como dado;
4. nunca alterar estado crítico sem regra determinística.
