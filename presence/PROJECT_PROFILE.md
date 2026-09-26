# MotoristaOPS Presença — Project Profile

## Objetivo

Transformar MotoristaOPS Presença em um produto comercial escalável, com jornada majoritariamente automatizada do primeiro contato ao pós-venda.

## Cliente

Motorista profissional que deseja fortalecer presença própria, captar clientes particulares e elevar a experiência física no veículo.

Motoristas influenciadores são clientes reais. Não devem ser usados como testers.

## Primeiro ciclo de aceitação

Henrico será o primeiro usuário de validação de ponta a ponta **depois** que produto, painel, templates e fluxo estiverem implementados. Seu perfil não deve ser pré-criado nem receber tratamento especial.

## Produto completo

### Digital

- landing page hospedada inicialmente pela MotoristaOPS;
- Google Business;
- Instagram;
- LinkedIn;
- TikTok e YouTube quando aplicável;
- WhatsApp;
- QR Codes.

Somente Google Business entra como integração de gestão dentro do painel na primeira arquitetura. As demais redes são registradas por URL/perfil e continuam sendo operadas nas próprias plataformas.

### Físico

- cartão de visita;
- placa de identificação;
- organizador;
- bala;
- lixinho automotivo;
- lenço umedecido;
- lenço seco;
- álcool em gel;
- brinde;
- embalagem.

O pacote físico é enviado completo, em uma única remessa.

## Rotas públicas

- `/` — site MotoristaOPS atual, preservado;
- `/presenca` — landing comercial do produto;
- `/painel` — autenticação e gestão do cliente;
- `/{slug}` — landing pública do motorista.

## Banco

PostgreSQL é o banco canônico.

Supabase pode ser usado como infraestrutura gerenciada para PostgreSQL, Auth, Storage e RLS, sem substituir PostgreSQL como fonte dos dados.

## Autenticação

- Google como método preferencial;
- e-mail/senha como alternativa;
- permissões adicionais do Google devem ser solicitadas progressivamente quando necessárias;
- login Google não implica automaticamente permissão para gerenciar Google Business.

## Produção gráfica

A Printi é a gráfica definida para os materiais gráficos.

Enquanto não existir integração comprovada com API/webhook da Printi, o envio do pedido para a gráfica permanece uma etapa humana explícita.

## Montagem e despacho

Após o recebimento dos itens gráficos pela MotoristaOPS:

- montagem;
- conferência;
- embalagem;
- despacho;

devem ocorrer em **2 a 3 dias úteis**.

## Logística

O painel deve mostrar:

- status do kit;
- previsão de entrega;
- transportadora;
- código de rastreamento;
- atualizações automáticas quando a integração logística permitir.

## Princípio operacional

O objetivo é zero-touch do lado MotoristaOPS para tarefas repetíveis.

Exceções humanas devem ser explícitas, mensuráveis e nunca mascaradas como automação.
