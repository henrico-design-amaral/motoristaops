# MotoristaOPS V2 — 02 PDR

Status: VALIDATED

## RESUMO EXECUTIVO
MotoristaOPS V2 é a reconstrução definitiva da presença digital do serviço MotoristaOPS: um sistema enxuto de apresentação, prova, conteúdo e contato para um serviço real de motorista particular. O produto deve apresentar Henrico Amaral e o serviço com clareza, demonstrar confiança com evidência real, manter presença social sustentável e transformar interesse em conversa pelo WhatsApp Business.

## PROBLEMA
A pessoa que encontra o serviço por indicação, Instagram, busca, compartilhamento ou QR Code precisa decidir rapidamente se existe confiança suficiente para iniciar conversa. A V2 resolve apresentação fragmentada, presença genérica, excesso de superfícies, inconsistência entre peças e dependência de promessas sem evidência.

## OBJETIVOS
Clareza imediata; confiança baseada em realidade; conversão direta; presença reconhecível entre Landing e Instagram; sustentabilidade operacional; e reutilização seletiva do capital válido da V1 sem herdar dívida técnica ou estrutural.

## USUÁRIOS
Potencial cliente: precisa entender, confiar e encontrar contato. Cliente/contato recorrente: precisa reencontrar rapidamente marca e WhatsApp. Operador da marca: precisa de um sistema simples de manter, com regras e peças reutilizáveis.

## JORNADA MACRO
DESCOBERTA → RECONHECIMENTO → ENTENDIMENTO → CONFIANÇA/PROVA → CONTATO → RELACIONAMENTO.

## SUPERFÍCIES BASELINE
Landing — MUST: apresentação, prova e conversão. Deve conter identidade correta, apresentação clara, proposta curta, visão objetiva do serviço, fotos reais do motorista e carro, prova verificável, CTA primário para WhatsApp, acesso secundário ao Instagram, responsividade e metadados básicos.

Instagram — MUST: presença recorrente e prova social por Reels, carrossel e Stories. Deve operar por sistema de formatos e regras reutilizáveis, com conteúdo real e identidade coerente com a Landing.

WhatsApp Business — MUST: conversa, atendimento e conversão. Deve receber tráfego da Landing/Instagram, manter perfil coerente e permitir organização/respostas rápidas básicas. Chatbot, CRM completo e automação agressiva não são baseline.

## CONTEÚDO
Obrigatório: marca oficial, categoria correta, apresentação humana real, imagens reais aprovadas, descrição objetiva, CTA e sinais de confiança com fonte. Bloqueado sem fonte: depoimentos, números, ratings, promessas absolutas, alegações de luxo/premium, preços/condições e imagens que simulem realidade inexistente.

## MARCA E LINGUAGEM
Brand Book e assets oficiais precedem interpretações do executor. MotoristaOPS deve manter arquitetura oficial. Nome/assinatura pessoal usam forma aprovada. Escrita pública é curta, direta, factual e humana. Evitar linguagem corporativa genérica, jargão e superlativos vazios.

## REQUISITOS NÃO FUNCIONAIS
Acessibilidade: alvo WCAG 2.2 AA. Performance: página leve e rápida, com imagens dimensionadas e sem bibliotecas/animações sem benefício. Responsividade: mobile como experiência completa. SEO: HTML semântico, title/description e metadados de compartilhamento. Privacidade: não expor dados desnecessários nem exigir trackers. Manutenção: simplicidade e baixa abstração.

## ARQUITETURA FUNCIONAL DA LANDING
A página precisa cumprir as funções IDENTIFICAÇÃO, PROPOSTA, SERVIÇO, PROVA, CONFIANÇA, CONTATO e CONTINUIDADE. A ordem/composição visual só será resolvida após Level 0, referências e protocolos.

## INTEGRAÇÕES
Obrigatórias: Landing → WhatsApp Business; Landing → Instagram; Instagram → WhatsApp ou Landing conforme contexto. Possíveis e não obrigatórias: Google Business Profile, analytics, pixels, automação de publicação, CRM e agenda/reserva.

## DADOS E TECNOLOGIA
O baseline não exige banco de dados próprio. Conteúdo estático/estruturado é suficiente enquanto não houver necessidade real de persistência. O PDR não escolhe framework; a solução deve ser leve, SEO-friendly, controlável no deploy e simples de manter.

## CRITÉRIOS DE ACEITAÇÃO
Marca/nome/assinatura corretos; Landing compreensível sem contexto externo; CTA funcional; mobile e desktop sem sobreposição/perda; uso apropriado de fotos reais; Instagram com sistema coerente; WhatsApp alinhado; nenhum claim não verificado; acessibilidade/QA aprovados; escopo pequeno e justificável.

## RISCOS E MITIGAÇÕES
Crescimento de escopo: manter dashboard/app/booking complexo fora do baseline. Visual genérico: Brand Book + assets reais + referências específicas. Conteúdo inventado: proveniência obrigatória. Contaminação da V1: migração explícita por item. Operação social pesada: poucos formatos oficiais. Tecnologia dominar produto: stack somente após requisitos/contratos.

## NON-GOALS BASELINE
Dashboard financeiro/operacional; aplicativo; login; marketplace; booking complexo; backoffice; banco de clientes; CRM próprio; automação editorial total; multilíngue; tema claro/escuro; animação como diferencial obrigatório.

## POLÍTICA DE MIGRAÇÃO V1 → V2
Cada item vindo da V1 deve ser classificado como KEEP, ADAPT, RESEARCH, REJECT ou ARCHIVE. Nenhuma categoria é presumida por existência.

## GATE
2. PDR — VALIDATED. Próximo estágio: 3. PROJECT BASE PACK.
