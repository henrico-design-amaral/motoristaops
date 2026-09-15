# MotoristaOPS — Iconografia funcional canônica

A landing page usa **Lucide Icons** como única família de iconografia funcional. Esta decisão é obrigatória para manutenção futura da interface.

## Contrato visual

- Família funcional: Lucide Icons.
- Base nativa: `24 x 24`.
- Estilo: outline / monoline exclusivamente.
- Stroke: `1.75`.
- `fill: none`.
- `stroke-linecap: round` e `stroke-linejoin: round`.
- Cor via `currentColor`.
- 24 px: ações, contatos funcionais, metadados e indicadores. Não reduzir abaixo de 24 px.
- 32 px: cards de serviços, etapas, processo e metadados de destaque como o bloco **Quem dirige**.
- 42 px: diferenciais e princípios editoriais (faixa permitida pelo Brand Book: 40–46 px).
- Champagne `#C79C5B`: padrão sobre Noite/Grafite.
- Grafite `#151518`: padrão em superfícies claras.
- Âmbar `#F0B44D`: reservado a rota, localização, pin e percurso.

## Logos e glifos de marcas externas

WhatsApp, Instagram, Google e outras marcas externas **não são pictogramas funcionais** e não entram na família Lucide. Eles usam o glifo reconhecível da própria marca, renderizado de forma centralizada pelo `MotoristaBrandSystem`, sem PNG minúsculo, emoji, fallback tipográfico ou desenho artesanal.

Escalas atuais de marca:

- 28 px: WhatsApp do CTA principal no header e em botões.
- 30 px: Instagram e Google na Hero.
- 30 px: WhatsApp e Instagram no footer.

Os glifos externos podem usar `currentColor` para integração com a identidade MotoristaOPS, preservando a forma da marca. Em CTA Champagne, o glifo usa Noite; em superfícies escuras, usa Champagne.

## Arquitetura

Tokens CSS funcionais: `--mo-icon-stroke`, `--mo-icon-size-sm`, `--mo-icon-size-md`, `--mo-icon-size-lg`.

Tokens de marca: `--mo-brand-size-header`, `--mo-brand-size-hero`, `--mo-brand-size-footer`, `--mo-brand-size-button`.

Componente funcional: `.mo-icon` + `data-mo-icon`. O mapa semântico vive em `MotoristaIconSystem` e é a única camada autorizada a escolher o nome do pictograma Lucide.

Componente de marca: `.brand-icon` + `data-brand-icon`. O mapa de marcas vive em `MotoristaBrandSystem`. Assim, a mesma marca não muda de desenho entre Hero, header e footer.

Não usar PNG funcional, SVG copiado manualmente, emoji, caracteres pictográficos, Phosphor, Heroicons, Iconbuddy ou qualquer outro pack na landing.

## Mapa semântico atual

| Semântica MotoristaOPS | Lucide | Tamanho | Cor |
| --- | --- | ---: | --- |
| Aeroporto | `plane` | 32 | Champagne |
| Reunião | `briefcase` | 32 | Champagne |
| Consulta/exame | `stethoscope` | 32 | Champagne |
| Evento | `calendar-days` | 32 | Champagne |
| Viagem/percurso | `route` | 32 | Âmbar |
| Espera | `hourglass` | 32 | Champagne |
| Horário agendado | `calendar-check` | 32 | Champagne |
| Rota planejada | `route` | 32 | Âmbar |
| Comunicação | `message-circle` | 32/42 | Champagne |
| Detalhes alinhados | `clipboard-check` | 32 | Champagne |
| Pontualidade | `timer` | 42 | Champagne |
| Discrição | `eye-off` | 42 | Champagne |
| Cuidado | `heart` | 42 | Champagne |
| Continuidade | `repeat-2` | 42 | Champagne |
| Experiência na rua | `car-front` | 32 | Champagne |
| Compromisso | `clock` | 32 | Champagne |
| Postura | `shield-check` | 32 | Champagne |
| Ação seguinte | `arrow-right` | 24 | Champagne/currentColor |
| Link externo | `arrow-up-right` | 20–24 | Champagne |
| Localização | `map-pin` | 32 | Âmbar |
