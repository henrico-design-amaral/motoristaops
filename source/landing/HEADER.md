# Header mínimo R02

**APPROVED — SURFACE / landing — 2026-11-06.** O operador validou a prévia
R02 e autorizou sua publicação com “pode publicar”.

Contrato: cabeçalho fixo e opaco em Noite, logo horizontal oficial, texto da
região junto à marca e seletor PT / EN / ES em uma cápsula discreta à direita.
Sem ícone de localização, divisor ou rótulo visível “Idioma”. Manter Instrument
Sans e a paleta oficial. Acessibilidade conserva os nomes completos dos idiomas
e o idioma atual; cada opção oferece pelo menos 44 × 44 CSS px.

Altura da linha: 88 CSS px em desktop e 96 em telas de até 760 px. A área segura
do dispositivo é acrescentada acima; âncoras respeitam a altura fixa. No celular,
a região aparece abaixo do logo e pode ocupar duas linhas em inglês.

Baseline aprovado: `08_DELIVERABLES/HEADER_PREVIEW_2026-11-06/header-desktop-v2.png`
e `header-celular-v2.png` no workspace do projeto. Implementação em `src/App.jsx`
e `src/locale.css`, sobre o mesmo conteúdo, assets, SEO e fluxo multilíngue.

Release: `landing-2026-11-06-header-r02`. Validar build, testes existentes,
Foundation, as três línguas em desktop/celular, rolagem fixa e troca de idioma.
O gate público verifica o release e os arquivos por SHA-256, além do isolamento
do dashboard e Brand System.
