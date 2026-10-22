# QA visual — nova seção do carro

Data: 22/10/2026. Escopo: somente `.mo-vehicle` na branch de prévia.

## Evidências

- Referência: `/workspace/scratch/4e6f1384e26b/upload/image(5).png`, 1672 × 941 px.
- Implementação renderizada: `http://terminal.local:4173/qa.html?w=1440` (ambiente interno; não publicado).
- Captura original de navegador: `/workspace/scratch/4e6f1384e26b/evidence/vehicle-preview/novo-carro-desktop-final.jpg`, 1363 × 936 px, incluindo a moldura de conferência.
- Desktop normalizado: `/workspace/scratch/4e6f1384e26b/evidence/vehicle-preview/motoristaops-carro-desktop.jpg`, 1201 × 773 px.
- Mobile normalizado: `/workspace/scratch/4e6f1384e26b/evidence/vehicle-preview/motoristaops-carro-mobile.jpg`, 390 × 820 px.
- Comparação conjunta: `/workspace/scratch/4e6f1384e26b/evidence/vehicle-preview/comparacao-final.jpg`.
- Comparação focada de tipografia e apresentação: `/workspace/scratch/4e6f1384e26b/evidence/vehicle-preview/comparacao-titulo.jpg`.

Desktop: iframe com viewport real de 1440 CSS px; apresentado em 1201,37 px no navegador (escala 0,83429). Captura normalizada ao mesmo tamanho horizontal da referência. A referência foi reduzida para 1201 × 676 px; a implementação é mais alta por incluir textos técnicos confirmados e duas notas de fonte/status exigidas pelo briefing. Mobile: viewport real de 390 CSS px, escala 1. As imagens finais são recortes dos pixels capturados, sem reconstrução ou geração da tela.

## Histórico e correções

1. [P1, corrigido] Título menor e com texto/quebra diferentes da referência. Agora reproduz a chamada em duas linhas: “Conheça o novo carro / da MotoristaOPS”. A tipografia continua Instrument Sans, conforme restrição do projeto.
2. [P1, corrigido] Carro avançando sobre a apresentação. Corrigidas a escala do recorte e sua posição; veículo completo, com respiro à esquerda do para-choque.
3. [P2, corrigido] Resíduos da faixa rasterizada original apareciam atrás dos atributos. O enquadramento principal começa após essa faixa; os atributos visíveis são HTML.
4. [P2, corrigido] Galeria e cards excessivamente recuados. As margens inferiores agora seguem a margem mais estreita da referência.
5. [P2, corrigido] Ritmo vertical do bloco superior e densidade dos cards. Ajustados altura, espaçamento e concisão dos textos; capturados e comparados novamente.
6. [P2, corrigido] Capturas iniciais feitas durante navegação ainda em andamento. Evidências finais obtidas após navegação `load`, fontes prontas e confirmação do controle de posicionamento da seção.

## Superfícies conferidas

- Tipografia: Instrument Sans confirmada por estilo computado; hierarquia, duas linhas do título e leitura mobile conferidas. Não foi introduzida fonte de anúncio para imitar o lettering rasterizado.
- Layout: carro à direita e texto à esquerda; cinco atributos; três imagens; seis blocos inferiores. Sem sobreposição ou cortes do veículo principal. Mobile mantém a leitura vertical e dois cards por linha; em 768 px usa três por linha.
- Cores: Noite/Grafite, Marfim/Pedra e Champagne canônicos. Não foi copiado o âmbar decorativo da arte.
- Imagens: mesmos pixels da referência, em AVIF, com recortes proporcionais. A natureza conceitual e a configuração não confirmada do interior permanecem explícitas em alt, legenda acessível e nota visível da seção.
- Conteúdo: quatro recursos confirmados na ficha Luxury; dois cuidados com status previsto. “Adquirido zero km” descreve a compra. G5 e promessas comparativas da arte não foram transformados em fatos.
- Interação: verificados o destino e o nome acessível do link da ficha técnica oficial. A seção não introduz galeria interativa, formulários ou outros controles.

## Responsividade e carregamento

| Viewport CSS | Largura da página | scrollWidth | Seções visíveis | Imagens |
| --- | ---: | ---: | ---: | --- |
| 360 | 360 | 360 | 1 | 4/4 carregadas |
| 390 | 390 | 390 | 1 | 4/4 carregadas |
| 768 | 768 | 768 | 1 | 4/4 carregadas |
| 1440 | 1440 | 1440 | 1 | 4/4 carregadas |

Onze ícones da seção renderizados. Logs consultados: nenhum erro associado à URL da landing; foram identificadas mensagens de metadados da extensão do navegador, externas à aplicação.

## Diferenças intencionais e limites

A comparação verifica fidelidade da composição dentro das restrições do briefing, não equivalência pixel a pixel. Fonte e cores seguem a identidade existente. Conteúdo técnico, status das películas e notas de fonte diferem da arte para respeitar o que foi confirmado. Fotos documentais e confirmação das aplicações continuam pendentes. Este resultado não equivale a aprovação do proprietário nem autoriza publicação.

Nenhuma pendência P0/P1/P2 de layout identificada na comparação final. Sem alteração de hero, cabeçalho ou conteúdo anterior. Comparação de fonte confirmou preservação byte a byte dos trechos anteriores após retirar as adições da seção e seu mapa de ícones.

## Autorização posterior à revisão

Em 22/10/2026, o proprietário autorizou aplicar a seção à página pública. A localização após os serviços foi mantida pelos critérios registrados em `source/vehicle/README.md`. Esta autorização substitui a restrição anterior de manter somente a prévia; não altera o escopo visual aprovado.

final result: passed

### Ajuste do gate de compartilhamento na publicação

A validação de PR ainda remontava o asset da hero com o hash da antiga fonte Open Graph. Alinhado `validate-seo-social-card.yml` ao workflow de produção: a imagem social é montada a partir de `release/visual-assets/opengraph`, com o mesmo hash aprovado e receita JPEG. Hero e imagem pública de compartilhamento não foram alteradas.
