# MotoristaOPS V2 — Landing Hero Contract v0.1

Status: READY FOR VISUAL EXPLORATION
Surface: Landing pública
Stage: Visual/content contract before high-fidelity
Parent: `landing-wireframe-v0.2.md`

## Goal
A Hero deve apresentar o MotoristaOPS como serviço real de motorista particular com presença, confiança e clareza imediata. Ela vende o serviço primeiro; a pessoa por trás dele aparece mais adiante em `Quem dirige`.

## Protected decisions
- Não usar retrato de Henrico como âncora principal da Hero.
- O veículo/rota/contexto de deslocamento é o protagonista visual.
- WhatsApp é a conversão dominante.
- `MotoristaOPS` sempre unido.
- Categoria: `MOTORISTA PARTICULAR`.
- Slogan aprovado: `Levando pessoas, cuidando de histórias.`
- Não criar estética de concessionária, limousine genérica, supercarro ou luxo vazio.
- Não exibir placa identificável na imagem de abertura.

## Asset audit
### Fotos pessoais
`perfil-normal`, `perfil-sério` e `perfil-portfolio` são adequadas para o bloco `Quem dirige`, não para a Hero v0.1.

### Fotos reais do veículo
As fotos atuais do HB20 preto são autoridade de verdade física e excelentes para `Prova real`. Não são candidatas diretas à Hero porque predominam enquadramentos verticais, estacionamento residencial, fundos de baixa intenção narrativa e pouco espaço negativo para copy.

Uso permitido na Hero: referência/edição compositiva que preserve o veículo real como um HB20 preto de uso cotidiano, sem promover um veículo mais caro ou diferente.

### Brand Book
Autoridade para logo, wordmark, grafismos, paleta, presença e uso correto/incorreto. A fotografia deve servir à marca, não competir com o emblema.

## Hero content hierarchy
1. Marca/header já fornece reconhecimento de `MotoristaOPS`.
2. Eyebrow: `MOTORISTA PARTICULAR`.
3. H1 recomendado para exploração: `Levando pessoas, cuidando de histórias.`
4. Supporting copy — working, não congelada: `Deslocamentos particulares com agendamento, cuidado e comunicação clara em cada etapa.`
5. CTA primário: `Chamar no WhatsApp`.
6. CTA secundário opcional: `Ver serviços` — só permanece se não competir visualmente com o primário.

## Visual direction
### Composition
- formato editorial horizontal, desktop-first com crop mobile previsto;
- carro deslocado para o terço direito ou central-direito;
- área negativa à esquerda para texto;
- linha de horizonte/rua baixa o suficiente para não atravessar copy;
- sensação de movimento controlado, não velocidade agressiva;
- leitura clara mesmo sem animação.

### Scene
- São Paulo/metrópole sugerida por luz, arquitetura e via, sem depender de monumento turístico;
- momento ideal: blue hour/noite inicial ou chuva leve controlada, quando ajuda contraste;
- iluminação prática, sofisticada e plausível;
- evitar neon cyberpunk, glow verde, hotel cinco estrelas genérico, aeroporto stock e cenário de supercarro.

### Vehicle fidelity
- carro preto, hatch compacto, presença coerente com o HB20 real;
- manter aparência limpa e bem cuidada;
- sem transformar em sedan premium/SUV/limousine;
- sem badges inventados em destaque;
- placa não legível ou fora de enquadramento;
- não exagerar reflexos que mudem a cor do carro.

### Brand treatment
- base `#070709` / `#151518` nas áreas de interface/overlay;
- champagne `#C79C5B` como acento, não banho de cor;
- marfim `#F3EFE4` para texto de alta prioridade onde contraste permitir;
- nenhum verde/glow;
- logo oficial como asset, nunca redesenhado pela imagem gerada.

## Image-generation modes to explore
### Direction A — Urban arrival
HB20 preto chegando/posicionado em via urbana elegante na blue hour. Quiet confidence. Maior espaço negativo à esquerda.

### Direction B — Night route
HB20 preto em deslocamento noturno controlado, rua realista, motion blur mínimo nas luzes de fundo, carro nítido. Mais impacto, sem estética esportiva.

### Direction C — Rain / care
HB20 preto parado ou chegando sob chuva leve, luz urbana refletida no asfalto, atmosfera de cuidado e acolhimento. Sem drama excessivo.

## Responsive behavior
### Desktop
- imagem ocupa a Hero toda ou 55–65% visualmente dominante;
- copy no primeiro/segundo terço esquerdo;
- CTA acima da dobra em viewport comum.

### Mobile
- crop prioriza veículo reconhecível + área limpa para copy;
- evitar texto sobre detalhes complexos do carro;
- H1 pode quebrar em 2–4 linhas sem reduzir agressivamente a fonte;
- CTA primário full/near-full width quando necessário;
- imagem não pode empurrar a proposta inteira abaixo da dobra.

## Accessibility/performance
- contraste WCAG 2.2 AA para copy/CTA;
- overlay é ferramenta de legibilidade, não filtro visual decorativo;
- fornecer alternativa textual descritiva adequada se imagem for informativa;
- suportar `<picture>`/formatos modernos e crops responsivos na implementação;
- Hero não depende de vídeo para transmitir valor.

## Rejection criteria
Rejeitar antes de apresentar se:
- o carro virar veículo premium diferente do real;
- aparecer placa legível;
- a imagem parecer concessionária, Uber genérico ou transfer stock;
- houver verde/glow ou cyberpunk;
- não existir espaço seguro para copy;
- a cena depender de luxo falso;
- o logo estiver embutido/regenerado na fotografia;
- o crop mobile destruir carro ou texto.

## Visual gate
Gerar 3 direções A/B/C. A próxima interação humana necessária será escolher/aprovar uma direção visual ou rejeitar todas. Nenhuma delas vira baseline antes dessa aprovação.
