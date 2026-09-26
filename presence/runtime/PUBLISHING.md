# Publicação das páginas públicas

## Princípio

GitHub guarda **código e templates**.

PostgreSQL guarda **dados canônicos do cliente**.

A hospedagem recebe **artefatos públicos derivados**.

## Regra de privacidade

O repositório MotoristaOPS é público.

Portanto, nunca commitar:

- onboarding de cliente;
- endereço de entrega;
- e-mail privado;
- telefone não autorizado para publicação;
- payload de pagamento;
- tokens OAuth;
- dados de rastreamento privados;
- snapshots completos de pedido.

## Pipeline previsto

```text
PostgreSQL
  -> snapshot CUSTOMER_CONFIRMED
  -> filtro de campos públicos
  -> template + versão
  -> render-driver.mjs
  -> QA
  -> hash do artefato
  -> deploy /{slug}/index.html
  -> registrar hash e versão no backend
```

## Artefato

O HTML público não precisa ser commitado.

Ele deve ser criado em workspace temporário e enviado ao destino de publicação.

Isso evita transformar o histórico Git em banco de dados de clientes.

## Atualização

Quando o motorista altera conteúdo público:

1. os dados passam por validação;
2. novo preview é gerado;
3. confirmação aplicável é registrada;
4. nova versão é renderizada;
5. QA é executado;
6. o artefato anterior só é substituído depois do gate verde.

## Rollback

Guardar no banco:

- template_key;
- template_version;
- hash do snapshot;
- hash do artefato;
- published_at.

O sistema deve conseguir reproduzir a versão anterior a partir do snapshot aprovado, sem depender de memória de IA.

## Dados públicos permitidos

Somente informações explicitamente aprovadas para a landing podem entrar no HTML público, como:

- nome profissional;
- biografia;
- WhatsApp profissional;
- veículo quando autorizado;
- serviços;
- áreas atendidas;
- redes sociais;
- imagens aprovadas.

Endereço de entrega nunca pertence à landing.
