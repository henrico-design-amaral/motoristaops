# MotoristaOPS — Rotina de privacidade, parceiros e GA4

**Data:** 2026-11-24 · **Escopo:** serviços de transporte executivo em www.motoristaops.com.br.  
**Estado:** PROCEDIMENTO PREPARADO / NÃO IMPLANTADO AUTOMATICAMENTE EM WHATSAPP, HOSTINGER, MERCADO PAGO OU GA4.  
**Autoridade de negócio:** MotoristaOPS e sua política comercial canônica; **não** confundir com o projeto separado “MotoristaOPS Presença”, que possui outro fluxo de checkout.

## 1. Inventário mínimo de dados e sistemas

| Fonte | Dados potenciais | Finalidade | Sistema que pode conservar | Evidência e pendência |
|---|---|---|---|---|
| Formulário desktop | Origem, destino, data/horário opcionais, passageiros, detalhes | Cotação | Navegador antes do clique; WhatsApp após abertura/envio | Código público em `src/TripForm.jsx`. Não foi encontrado POST do formulário para banco próprio |
| Formulário mobile | Nome, serviço, data, horário, origem, destino, passageiros, malas/veículo/detalhes opcionais | Cotação | Navegador antes do clique; WhatsApp após abertura/envio | `public/mobile/index.html`. Campos livres podem conter dados pessoais incidentais |
| WhatsApp Business | Identificação, telefone, mensagens, propostas, roteiros, aceite, atendimento | Pré-contrato/contrato | Meta, dispositivos vinculados, backups e integrações ainda não inventariadas | **PENDENTE: inspeção autenticada e política interna de retenção** |
| GA4 | Navegação e eventos de intenção com consentimento | Estatísticas opcionais | Google Analytics | Código `src/analytics.mjs`, `scripts/service-tracking.js`, `scripts/cookie-consent.js`; **PENDENTE: propriedade autenticada, Medição otimizada, Ocultar dados, DebugView** |
| Hospedagem | IP e logs técnicos potencialmente tratados | Funcionamento e segurança | Hostinger, rede/CDN contratada | **PENDENTE: hPanel, contratos, retenção de logs/backups e localização** |
| Mercado Pago (quando utilizado) | Dados de cobrança e transação fornecidos ao provedor | Recebimento/estorno | Mercado Pago | Canal de pagamento previsto em `foundation/COMMERCIAL_PRICING_PAYMENT_2026-11-14.md`; **PENDENTE: conta efetiva e transações** |
| Prestadores parceiros (se utilizados) | Horário, local, passageiros, contato necessário, informações de acesso | Disponibilidade/execução | Comunicação e sistemas de cada prestador | **PENDENTE: cadastro de parceiros, contrato, retenção, comprovação de habilitação** |

Não usar listas internas de clientes, planilhas financeiras ou conversas reais como fixtures de QA. **Nunca publicar** nomes, contatos, CPF, placa, comprovantes, trajetos ou transcrições de clientes no GitHub ou nos documentos públicos.

## 2. Fluxo de exercício de direitos do titular (DSAR)

**Canal publicado:** WhatsApp (11) 98832-9725, pela Política de Privacidade; um botão específico no site prepara pedido genérico, mas o usuário precisa confirmar o envio no WhatsApp.

1. **Recebimento:** identificar a natureza do pedido (informações/acesso/correção/oposição/revogação/exclusão); registrar número interno aleatório e data em sistema privado com acesso restrito. O site não cria automaticamente um chamado de DSAR.
2. **Segurança:** confirmar identidade proporcional ao risco, sem exigir CPF/documento integral por padrão. Evitar repassar registros de outro titular.
3. **Inventário:** pesquisar WhatsApp e dispositivos vinculados; históricos de proposta e pagamento efetivamente usados; arquivos internos; outros operadores/parceiros que tenham recebido dados.
4. **Decisão:** separar dados passíveis de correção, bloqueio, anonimização ou exclusão dos sujeitos a guarda fiscal/contratual/legal. Registrar a justificativa de retenção e os sistemas em que permanece.
5. **Execução:** efetuar ação nos sistemas sob controle; pedir e registrar confirmação dos operadores/parceiros envolvidos quando aplicável. Conferir tratamento dos backups conforme ciclo e contrato reais; **não** alegar exclusão completa sem comprovação.
6. **Resposta e registro:** enviar retorno compreensível ao titular, com ações, exceções e canais de recurso. Conservar apenas o registro mínimo necessário para demonstrar tratamento do pedido.

**Modelo de registro interno (não preencher no repositório):** ID aleatório | data/hora | categoria | sistema consultado | base de manutenção/exclusão | operador comunicado | evidência de execução | data da resposta | responsável | próxima revisão.

**Prazos:** consultar a LGPD e os regulamentos vigentes da ANPD, considerando eventual regime aplicável a agentes de pequeno porte. Não presumir que todos os pedidos tenham o mesmo prazo; uma resposta preliminar não equivale à execução de exclusão. Para declaração simplificada de agentes de pequeno porte, o art. 15 da Resolução CD/ANPD 2/2022 dispõe prazo de até 15 dias; demais hipóteses e dobros dependem da previsão específica.

## 3. Verificação de pagamento, aceite e cancelamento

Na proposta apresentada por mensagem, identificar (sem inventar campos ou preços): serviço, dia, horários, origem/destino, número de passageiros e bagagem, prestador/veículo sujeito a confirmação, valor e despesas adicionais, forma de pagamento, condições de sinal/espera/alterações, condições de cancelamento e link para Termos, Privacidade e Cancelamento.

Não declarar reserva confirmada antes de comprovar aceite da proposta e disponibilidade. Pagamento com link externo só será considerado efetivo segundo confirmação do provedor e método contratual utilizado. Em pedido de arrependimento ou cancelamento, verificar CDC art. 49 e as condições efetivamente aplicáveis; não criar multas, descontos, prazos fixos de estorno ou renúncia automática.

**Mensagem-modelo opcional para resposta humana:** “Recebi sua solicitação de cancelamento/reembolso. Vou localizar a proposta e verificar as condições aceitas, o status do atendimento e os direitos aplicáveis. Informe somente a data e os dados necessários para identificar a reserva; não envie documentos pessoais sem orientação.”  
Esse texto é um **rascunho operacional**; não foi configurado nem enviado no WhatsApp Business.

## 4. Validação dos parceiros e direitos de imagem

Antes de anunciar ou confirmar veículo de parceiro, registrar em ambiente privado: prestador/contato, categoria e capacidade real, autorização/licença aplicável à modalidade/rota, seguro exigível, CNH/qualificação do condutor conforme modalidade, identificação do prestador no contrato, compartilhamento mínimo de dados e procedimento de exclusão/retenção. A categoria “van” requer checagem separada; não presumir que o CNAE 4923-0/02 e o CCMEI autorizem transporte coletivo ou fretamento.

Imagens e avaliações: só republicar ativos retirados da landing se houver licença comprovada ou URL individual verificável e autorização aplicável. A origem em anúncio externo **não** é licença de reprodução.

## 5. GA4: o que o código resolve e o que depende do painel

**Implementado no código:** Consent Mode v2 básico (Google bloqueado antes de autorização), estatísticas opt-in e revogáveis; eventos próprios de intenção sem dados digitados; formulários usam botões de WhatsApp em vez de links dinâmicos rastreáveis. A partir desta intervenção, o referrer passado ao GA4 limita-se à origem do URL, sem caminho, fragmento ou query. Isso reduz granularidade de relatórios por página referenciadora.

**Inspeção autenticada ainda necessária:** propriedade do ID `G-ZQZ76XPPLP` > Administrador > Fluxos de dados > Web > Medição otimizada (Cliques de saída/Interações com formulário) e **Ocultar dados**, com e-mails e parâmetros como `text`, `email`, `nome`, `cpf`, `telefone` habilitados quando aplicável. Testar com dados **inteiramente fictícios** no Tag Assistant e DebugView. Eventos GA4 podem conter `link_url`, `page_location`, `page_referrer`, `form_destination`; verificar na rede e na propriedade. Código correto não prova configuração da conta.

A integração Windsor.ai disponível neste runtime está ligada apenas ao Instagram; o conector GA4 requer autorização OAuth do titular. Não copiar tokens nem conceder acesso privilegiado sem a ação do usuário.

## 6. Segurança e incidentes

- Ativar MFA e restringir acesso a dispositivos, WhatsApp, hospedagem, analytics e pagamentos; revisar usuários e aparelhos periodicamente.
- Evitar copiar conversas e endereços para grupos ou planilhas amplamente compartilhadas.
- Definir e documentar prazos de retenção reais por categoria e backup após consultar os contratos dos fornecedores; não inventar período único.
- Manter plano de resposta a incidentes. Havendo risco ou dano relevante aos titulares, verificar a Resolução CD/ANPD nº 15/2024 e as regras aplicáveis a agentes de pequeno porte, notificar conforme prazos e registrar evidências. **Não houve incidente confirmado nesta auditoria.**

## 7. Limites de conclusão

- **PENDENTE:** painel interno GA4; WhatsApp e seus backups; Hostinger logs/backups; Mercado Pago transações; documentos dos parceiros; consentimentos/aceites reais; direitos autorais de materiais externos; revisão jurídica humana.
- **NÃO EXECUTADO:** exclusão de clientes, alteração em painéis externos, envio de mensagens, aprovação de contratos, concessão de licenças ou auditoria integral WCAG 2.2 AA.
- **ENTREGÁVEL REPRODUTÍVEL:** código versionado com testes de não vazamento de referrer, páginas de solicitações e checklist operacional; executar CI, deploy e auditoria pública antes de declarar implementado.

## Referências primárias

- LGPD: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm
- CDC: https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm
- ANPD, Resolução 2/2022: https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022
- ANPD, guia segurança pequenos agentes: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte
- Google GA4 Data Redaction: https://support.google.com/analytics/answer/13544947
- Google GA4 config `page_referrer`: https://developers.google.com/analytics/devguides/collection/ga4/reference/config
- Google Consent Mode básico: https://developers.google.com/tag-platform/security/concepts/consent-mode
