# MotoristaOPS /v2 — Auditoria de fidelidade e correção

**Data:** 2026-11-14 · **Destino:** https://www.motoristaops.com.br/v2/

**Status técnico:** IMPLANTADO / PASS (deploy isolado e verificações automatizadas).  
**Status de aceite visual/comercial:** PENDENTE de comparação humana com a referência e confirmação de mídia dos parceiros.  
**Produção na raiz:** NÃO ALTERADA.

## Insumos e evidências
- Referência escolhida: imagem enviada pelo operador, `image(20261114-195404).png` (1086×1448 px).
- Execução antes da correção: captura enviada pelo operador, `image(20261114-195213).png` (664×2048 px).
- Código base: `v2/index.html`, versão anterior de teste.
- Código corrigido: commit `11a936d7303a6449f6b7f1486e9e60510d100fe6`.
- Workflow corrigido: commits `9ec3252ac9285426eea9128f3a58900d982525f0`, `360dd218bc9b244621d9e2ab6444365caaf4f68b`.
- GitHub Actions concluído com **success**: run ID `43636565989`, URL https://github.com/henrico-design-amaral/motoristaops/actions/runs/43636565989 .

## Auditoria dos defeitos e reparos

| Prioridade | Evidência observada | Correção |
|---|---|---|
| P1 | Conteúdo e cartões desproporcionais à largura da viewport; hierarquia enfraquecida | Content container responsivo de até 1880px, títulos maiores, cinco cartões em grid amplo e imagens mais presentes |
| P1 | Títulos exibiam literalmente `<br>` após aplicação da tradução | Chaves de títulos tratadas por `data-i18n-html` com dicionário controlado |
| P1 | Mesmo veículo aparecia nas cinco categorias | Restaurada a posição do sprite original por `--vimg` e `background-position-x`, preservando cinco imagens ilustrativas distintas |
| P1 | Na dobra 'Como funciona' havia sobreposição de assinatura, título e etapas | Assinatura no fluxo do grid; mobile com grid explícito para número, título e texto |
| P1 | Segundo depoimento sumia no mobile | Avaliações alteradas para carrossel horizontal navegável por toque/arraste |
| P2 | Hero subutilizava a imagem e o CTA não reproduzia a prioridade da referência | Hero mais ampla, texto de maior hierarquia; CTA de orçamento e acesso direto ao WhatsApp |
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

- Chromium/Playwright local via carregamento do HTML: **8 × 100svh** confirmados nos viewports 1440×900, 1920×1080, 390×844, 390×680; nenhuma largura excedeu a viewport.
- Testes de comportamento: seleção PT/EN/ES mantém a quebra de linha corretamente; menu mobile expande; FAQ abre; formulário vazio apresenta erro em vez de enviar; nenhum erro JavaScript observado no teste local.
- Pré-publicação no GitHub Actions: validação estática das oito seções e sintaxe do JavaScript: **PASS**.
- Publicação Hostinger `/v2`: **HTTP 200**, conteúdo atualizado contém os marcadores `data-i18n-html="servicesTitle"`, `class="wa-logo"` e regras de sprite corrigidas. `noindex,nofollow,noarchive` presente.
- Página principal `/`: **HTTP 200** com o mesmo título anterior e release `landing-2026-11-06-header-r02`, sem substituição.

## Diferenças intencionais e pendências

1. A pessoa fictícia e as avaliações/estrelas com nomes inventados no desenho não foram transferidas como evidência real. A hero conserva mídia conceitual sem pessoa falsa; avaliações usam relatos já disponibilizados na página anterior e link de origem.
2. A fonte do desenho tem aparência serifada; a implementação conserva **Instrument Sans**, única fonte aprovada no Brand Book V2. Não se declara fidelidade tipográfica pixel a pixel.
3. Imagens das cinco categorias são ilustrações. **Não comprovam disponibilidade, quantidade de assentos, bagagens, modelo ou frota própria.** Fotos reais de parceiros e dados operacionais precisam de confirmação antes do release comercial final.
4. Testes locais de imagem usaram temporariamente recortes das capturas do operador para conferir geometria sem acessar os assets remotos. Por isso não equivalem a QA visual do render final carregado ao vivo em todos os breakpoints.
5. QA humano final dos oito folds em browser real, fonte efetivamente carregada, contraste e fidelidade da hero permanece **PENDENTE**.

**Veredito:** PASS técnico de publicação de teste e interação estrutural; **aceite visual final PENDENTE**. A V2 permanece ambiente de hipótese, separado da homepage.
