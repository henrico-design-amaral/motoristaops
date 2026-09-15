# MotoristaOPS — Iconografia funcional canônica

A landing page usa **Lucide Icons** como única família de iconografia funcional. Esta decisão é obrigatória para manutenção futura da interface.

## Contrato visual

- Família: Lucide Icons.
- Base nativa: `24 x 24`.
- Estilo: outline / monoline exclusivamente.
- Stroke: `1.75`.
- `fill: none`.
- `stroke-linecap: round` e `stroke-linejoin: round`.
- Cor via `currentColor`.
- 24 px: ações, contatos funcionais, metadados e indicadores. Não reduzir abaixo de 24 px.
- 32 px: cards de serviços, etapas e processo.
- 42 px: diferenciais e princípios editoriais (faixa permitida pelo Brand Book: 40–46 px).
- Champagne `#C79C5B`: padrão sobre Noite/Grafite.
- Grafite `#151518`: padrão em superfícies claras.
- Âmbar `#F0B44D`: reservado a rota, localização, pin e percurso.

Logos de marcas externas (WhatsApp, Instagram, Google etc.) usam os glifos oficiais da marca e não fazem parte da família funcional Lucide.

## Arquitetura

Tokens CSS: `--mo-icon-stroke`, `--mo-icon-size-sm`, `--mo-icon-size-md`, `--mo-icon-size-lg`.

Componente de interface: `.mo-icon` + `data-mo-icon`. O mapa semântico vive em `MotoristaIconSystem` e é a única camada autorizada a escolher o nome do pictograma Lucide. Assim, tamanho e cor são controlados por tokens e a troca de pictograma ocorre em um único mapa, sem SVG espalhado pela página.

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
| Comunicação | `message-circle` | 24/32/42 | Champagne |
| Detalhes alinhados | `clipboard-check` | 32 | Champagne |
| Pontualidade | `timer` | 42 | Champagne |
| Discrição | `eye-off` | 42 | Champagne |
| Cuidado | `heart` | 42 | Champagne |
| Continuidade | `repeat-2` | 42 | Champagne |
| Experiência na rua | `car-front` | 24 | Champagne |
| Compromisso | `clock` | 24 | Champagne |
| Postura | `shield-check` | 24 | Champagne |
| Ação seguinte | `arrow-right` | 24 | Champagne/currentColor |
| Link externo | `arrow-up-right` | 24 | Champagne |
| Localização | `map-pin` | 24 | Âmbar |
