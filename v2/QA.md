# MotoristaOPS /v2 — Auditoria de fidelidade e correção

**Data:** 2026-11-14 · **Destino:** https://www.motoristaops.com.br/v2/

**Status técnico:** PUBLICADO / PASS no commit `ef2346d0a533e914fc95a0c407c5cc3b0852e88d`.
**Status de aceite visual/comercial:** PASS de comparação técnica; aceite humano do operador e confirmação de mídia dos parceiros permanecem PENDENTES.
**Produção na raiz:** NÃO ALTERADA.

## Insumos e evidências
- Referência escolhida: imagem enviada pelo operador, `image(20261114-195404).png` (1086×1448 px).
- Execução antes da correção: captura enviada pelo operador, `image(20261114-195213).png` (664×2048 px).
- Código base: `v2/index.html`, versão anterior de teste.
- Código corrigido: commit `11a936d7303a6449f6b7f1486e9e60510d100fe6`.
- Workflow corrigido: commits `9ec3252ac9285426eea9128f3a58900d982525f0`, `360dd218bc9b244621d9e2ab6444365caaf4f68b`.
- GitHub Actions concluído com **success**: run ID `43636565989`, URL https://github.com/henrico-design-amaral/motoristaops/actions/runs/43636565989 .
- Hero desta revisão: asset canônico `source/landing/public/assets/hero-v4-3.webp`, documentado como composição aprovada.
- Evidências locais desta revisão: `v2/qa/hero-desktop-1440x900.png`, `v2/qa/hero-mobile-390x844.png`, `v2/qa/faq-desktop-1440x900.png` e `v2/qa/form-desktop-1440x900.png`.
- Implementação: PR `#143`, commit `ac9d77d96fcdc33e79ba9529ef3fa9f32e274178`, deploy `43660519230` concluído com sucesso.
- Correção de altura curta: PR `#144`, commit `ef2346d0a533e914fc95a0c407c5cc3b0852e88d`, deploy final `43660737348` concluído com sucesso.

## Auditoria dos defeitos e reparos

| Prioridade | Evidência observada | Correção |
|---|---|---|
| P1 | Conteúdo e cartões desproporcionais à largura da viewport; hierarquia enfraquecida | Content container responsivo de até 1880px, títulos maiores, cinco cartões em grid amplo e imagens mais presentes |
| P1 | Títulos exibiam literalmente `<br>` após aplicação da tradução | Chaves de títulos tratadas por `data-i18n-html` com dicionário controlado |
| P1 | Mesmo veículo aparecia nas cinco categorias | Restaurada a posição do sprite original por `--vimg` e `background-position-x`, preservando cinco imagens ilustrativas distintas |
| P1 | Na dobra 'Como funciona' havia sobreposição de assinatura, título e etapas | Assinatura no fluxo do grid; mobile com grid explícito para número, título e texto |
| P1 | Segundo depoimento sumia no mobile | Avaliações alteradas para carrossel horizontal navegável por toque/arraste |
| P2 | Hero subutilizava a imagem e o CTA não reproduzia a prioridade da referência | Hero mais ampla, texto de maior hierarquia; CTA de orçamento e acesso direto ao WhatsApp |
| P1 | A hero publicada em `/v2` não continha a persona real solicitada e divergia da cena da prancha | Substituída pelo asset canônico aprovado com Henrico, Omoda 5 e Ponte Estaiada; pessoa mantida à direita e texto à esquerda |
| P2 | Botão flutuante não usava o símbolo correto do serviço | Trocado caractere improvisado pelo asset oficial `/assets/whatsapp.svg` |
| P2 | Formulário usava propriedade de nome implícito em `HTMLFormElement` | Acesso explícito a `elements.namedItem('phone')`; validação testada |
| P2 | Oito seções aparentavam miolo estreito com excesso de áreas vazias | Distribuição editorial revista em todas as dobras sem agrupar seções |

## Estrutura preservada — uma seção por dobra
1. Hero
2. Cinco serviços
3. Cinco categorias de veículos
4. Como funciona
5. Avaliações
6. Perguntas frequentes
7. Formulário de orçamento
8. Footer

CSS: `100svh` por seção e `scroll-snap-align: start`. Em telas muito baixas (até 380px de largura e 620px de altura), as seções de processo e footer permitem rolagem **interna** para não ocultar informações; as outras dobras continuam isoladas.

## Verificação realizada

- Chromium/Playwright local via carregamento do HTML: **8 × 100svh** confirmados nos viewports 1440×900, 1920×1080, 390×844, 390×680; nenhuma largura excedeu a viewport. Na revisão atual, 390×844 foi medido novamente: oito dobras com 844 px, `scroll-snap-align:start`, `scroll-snap-stop:always` e zero overflow horizontal.
- Testes de comportamento: seleção PT/EN/ES mantém a quebra de linha corretamente; menu mobile expande; FAQ abre; formulário vazio apresenta erro em vez de enviar; nenhum erro JavaScript observado no teste local.
- Pré-publicação no GitHub Actions: validação estática das oito seções e sintaxe do JavaScript: **PASS**.
- Publicação Hostinger `/v2`: **HTTP 200**, hero canônica `/assets/hero-v4-3.webp`, oito dobras, `noindex,nofollow,noarchive` e separação FAQ/formulário confirmadas ao vivo.
- Medida pública em 1280×720: todas as oito dobras com 720 px, inclusive veículos; `scrollHeight` 720 px, `scroll-snap-align:start`, `scroll-snap-stop:always` e zero overflow horizontal.
- Página principal `/`: **HTTP 200** com o mesmo título anterior e release `landing-2026-11-06-header-r02`, sem substituição.

## Diferenças intencionais e pendências

1. A pessoa fictícia do desenho foi substituída por Henrico usando a composição aprovada do projeto. Avaliações/estrelas com nomes inventados no desenho não foram transferidas como evidência real; a seção usa relatos já disponibilizados na página anterior e link de origem.
2. A fonte do desenho tem aparência serifada; a implementação conserva **Instrument Sans**, única fonte aprovada no Brand Book V2. Não se declara fidelidade tipográfica pixel a pixel.
3. Imagens das cinco categorias são ilustrações. **Não comprovam disponibilidade, quantidade de assentos, bagagens, modelo ou frota própria.** Fotos reais de parceiros e dados operacionais precisam de confirmação antes do release comercial final.
4. A fidelidade é estrutural e editorial, não uma rasterização da prancha: HTML, navegação, acessibilidade, responsividade e formulário permanecem reais e editáveis.
5. O render final desta revisão foi inspecionado localmente em desktop/mobile e verificado ao vivo em 1280×720. O aceite humano do operador continua independente do PASS técnico.

**Veredito desta revisão:** PUBLICADO / PASS técnico e de fidelidade estrutural; aceite humano final PENDENTE. A V2 permanece ambiente de hipótese, separado da homepage.
