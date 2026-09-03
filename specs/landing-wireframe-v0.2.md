# MotoristaOPS V2 — Landing Wireframe v0.2

Status: APPROVED WITH STRUCTURAL ADJUSTMENTS
Surface: Landing pública
Stage: Wireframe / information architecture

## Goal
Estabelecer a arquitetura da landing antes de qualquer high-fidelity ou implementação, preservando clareza, confiança e conversão sem misturar acabamento visual com decisão estrutural.

## Narrative
impacto -> entendimento -> confiança -> evidência -> pessoa real -> validação externa -> contato

## Page architecture

### 01. Header
Purpose: orientação mínima + ação principal.
- Brand oficial MotoristaOPS.
- Navegação curta para âncoras essenciais.
- CTA principal de contato/WhatsApp.
- Não sobrecarregar com controles ou opções secundárias no bootstrap.

### 02. Hero
Purpose: presença imediata do serviço.
- Imagem de fundo expressiva, real e contextual.
- Carro/estrada/cidade como protagonista visual; não usar retrato do motorista como âncora principal.
- Copy curta, específica e comprovável.
- CTA principal visível sem disputar com múltiplas ações.
- Evitar estética de concessionária, transfer genérico ou banco de imagem corporativo.

### 03. Proposta rápida / microbenefícios
Purpose: explicar rapidamente por que considerar o serviço.
- 3 a 4 benefícios reais e curtos.
- Exemplos de eixos: pontualidade, cuidado, discrição, acompanhamento.
- Não transformar em grade extensa de features.

### 04. Serviços
Purpose: tornar as ocasiões de uso imediatamente compreensíveis.
- Aeroportos / rodoviárias.
- Reuniões e compromissos.
- Eventos.
- Viagens e deslocamentos particulares.
- Espera/acompanhamento quando aplicável.
- Conteúdo final deve refletir apenas serviços realmente oferecidos.

### 05. Como funciona / método
Purpose: reduzir atrito e incerteza.
- Contato.
- Alinhamento da necessidade.
- Confirmação/agendamento.
- Execução e acompanhamento.
- Sem linguagem de processo corporativo.

### 06. Experiência e diferenciais
Purpose: provar qualidade pela prática.
- Experiência real como motorista.
- Cuidado com o passageiro e contexto da viagem.
- Clareza de comunicação.
- Pontualidade e discrição.
- Usar evidência concreta; evitar promessas genéricas de luxo/premium.

### 07. Prova real do serviço
Purpose: materializar a operação.
- Imagens reais do veículo e/ou contexto de trabalho.
- Situações compatíveis com o serviço.
- Nenhuma imagem descontextualizada apenas para preencher layout.

### 08. Quem dirige
Purpose: humanizar após o serviço já estar entendido.
- Foto de Henrico Amaral entra aqui, não na Hero.
- Texto curto e factual sobre quem dirige e como trabalha.
- A pessoa reforça confiança; não substitui a proposta de valor do serviço.

### 09. Prova social
Purpose: confirmação externa antes da conversão final.
- 2 ou 3 avaliações reais do Google.
- Nome abreviado ou primeiro nome quando necessário.
- Nota/estrelas.
- Trecho curto e fiel do comentário.
- Não inventar, adaptar ou sintetizar depoimentos como se fossem reviews reais.
- A origem deve ser verificável antes da publicação.

### 10. CTA final
Purpose: transformar confiança acumulada em contato.
- Uma ação principal.
- Copy objetiva.
- Reforço curto sobre disponibilidade/agendamento sem promessa não comprovada.

### 11. Footer
Purpose: encerramento e utilidade.
- Brand.
- Contato.
- Navegação essencial.
- Links legais/operacionais somente quando existirem.

## Protected decisions
- Hero não usa retrato de Henrico como elemento principal.
- Hero deve trabalhar com imagem de serviço mais expressiva.
- Foto de Henrico fica concentrada no bloco `Quem dirige`.
- Prova social fica próxima do encerramento, antes do CTA final.
- Reviews do Google precisam ser reais e verificadas.
- Nenhum conteúdo, dado ou depoimento pode ser inventado.

## High-fidelity entry criteria
Só avançar para high-fidelity quando:
- ordem dos blocos estiver validada;
- conteúdo necessário estiver identificado como real, pendente ou indisponível;
- Hero tiver direção fotográfica definida;
- reviews reais estiverem disponíveis para seleção;
- foto oficial para `Quem dirige` estiver definida;
- CTA e objetivo de conversão estiverem claros;
- desktop e mobile tiverem regras estruturais de reflow previstas.

## Non-goals
- escolher stack técnica;
- implementar componentes;
- redesenhar logo/identidade;
- inventar reviews;
- usar referência externa como estética automática;
- finalizar tipografia, spacing ou detalhes de UI antes da arquitetura ser congelada.
