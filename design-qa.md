# QA — correção de proporções da seção do carro

Data: 22/10/2026. Escopo: somente seção do carro da landing. Product Design: audit → image-to-code → design-qa. Não houve geração, troca ou redesenho de imagens.

## Fonte visual e estado

- Referência fornecida: `/workspace/scratch/4e6f1384e26b/upload/image(6).png`, 1672 × 941 px. SHA-256 `4ab3a371f58a041118a20a9c2ad1afa52c39d3e2ffab3aee1d775a06342b545d`, idêntica à referência original `image(5).png`.
- Problema apresentado pelo proprietário: `upload/image(7).png`, 1651 × 1158 px.
- Captura pública atual antes da intervenção: `evidence/proportion-audit-before.jpg`.
- Implementação final renderizada: `evidence/proportion-final-1440.jpg`, 1363 × 936 px, com viewport do iframe 1440 × 1050 CSS px, escala 0,8342857 e sem densidade adicional. Página local completa, no estado da seção do carro.
- Contexto com os serviços: `evidence/proportion-context-1440.jpg`.
- Comparação conjunta final: `evidence/proportion-comparison-final.jpg`, 2274 × 746 px.
- Comparação focada em título e carro: `evidence/proportion-header-comparison-final.jpg`.

## Normalização

A referência foi recortada somente nas margens externas horizontais, x=27 a x=1645, para obter a faixa útil de 1618 px. Ela foi reduzida proporcionalmente a 1125 × 654 px. A captura final foi recortada pelos limites reais da grade, x≈119 a 1244 e y≈102 a 814, produzindo 1125 × 712 px. As duas imagens foram colocadas lado a lado no mesmo arquivo e inspecionadas juntas. A altura adicional contém as notas de procedência e status e diferenças de conteúdo confirmado; não houve estiramento para igualar alturas. O texto e os ícones permanecem HTML/Lucide.

## Findings e histórico de correções

1. [P1, corrigido] A seção usava max-width 1672 próprio, contra 1440 px do container do site; galeria e cards ainda tinham margens negativas. Agora reutiliza a classe `.container`, sem largura paralela nem margens negativas. A conferência inclui a seção anterior, não somente o módulo isolado.
2. [P1, corrigido] A escala da imagem e os deslocamentos eram função da viewport e de compensações negativas. Agora a composição é medida na área útil da referência e dimensionada pelo próprio container, com unidades cqw. O asset aprovado permanece byte a byte igual; a imagem principal inclui a faixa de cenário à esquerda do carro. O recorte é uniforme, sem esticar a largura ou altura do veículo.
3. [P2, corrigido] A primeira revisão ainda mostrava resíduo da faixa rasterizada junto aos atributos. Ajustado o limite do recorte de composição para ocultar a faixa rasterizada sem recortar o carro. Evidência pós-fix: `proportion-pass-2.jpg` e posteriores.
4. [P2, corrigido] Os cards ficaram altos demais por textos longos e padding. Textos concisos mantêm ar digital Dual Zone/saída traseira, tecido/material premium sintético, quatro USB, sete airbags e preparações previstas. Cards desktop passaram de aproximadamente 152 a 104 CSS px na largura 1440. Evidência pós-fix: `proportion-pass-3.jpg` e finais.
5. [P2, corrigido] Iteração de título com tracking excessivo apertou a leitura. Foi descartada. O resultado final mantém Instrument Sans, escala por container e tracking moderado. Evidências: `proportion-pass-4.jpg` (intermediário descartado), `proportion-final-1440.jpg` e comparação conjunta final.

## Cinco superfícies obrigatórias

- Tipografia: Instrument Sans computada em todas as seis larguras, título desktop em duas linhas e sem overflow. Família canônica preservada; não se importou a fonte condensada da arte. Body 15+ px; cards desktop 12/13 px, mobile 13/15 px.
- Espaçamento e grid: limites da galeria coincidem exatamente com Serviços; texto superior mantém o recuo relativo da arte; largura máxima 1440 e gutters do site. Sem margens negativas. Faixa superior e galeria seguem as medidas normalizadas da referência. Cards e notas têm conteúdo técnico próprio.
- Cores: Noite, Marfim/Pedra e Champagne existentes. O amarelo/âmbar decorativo da referência não substitui a paleta canônica. Não foi adicionada decoração nova.
- Imagens: mesmo AVIF aprovado, SHA `69a59b2c9dcec4a89183b7a8354496c329b83ae824489b83803fab72c4cb523b`; enquadramentos refinados na própria imagem, sem nova geração. Razão renderizada da imagem inteira ≈1,77686, consistente com 1672/941 após arredondamento de pixels; não há distorção anisotrópica. Carro principal inteiro.
- Conteúdo: textos técnicos concisos; sem transformar G5 ou películas previstas em equipamentos já aplicados. Avisos de composição conceitual e interior não confirmado preservados. Mantidos os nomes, contatos e textos das demais seções.

## Responsividade e função

Medições completas: `source/vehicle/layout-validation-2026-10-22.json`.

| Viewport CSS px | Galeria esquerda/direita | Serviços esquerda/direita | scrollWidth | Imagens/ícones |
| --- | --- | --- | ---: | --- |
| 360 | 18 / 342 | 18 / 342 | 360 | 4 / 11 |
| 390 | 18 / 372 | 18 / 372 | 390 | 4 / 11 |
| 768 | 18 / 750 | 18 / 750 | 768 | 4 / 11 |
| 1024 | 32,765625 / 991,234375 | iguais | 1024 | 4 / 11 |
| 1440 | 46,078125 / 1393,921875 | iguais | 1440 | 4 / 11 |
| 1920 | 288 / 1632 | 288 / 1632 | 1920 | 4 / 11 |

Uma única instância visível por largura. Conferidos desktop, tablet, celular, detalhes inferiores em `proportion-mobile-details.jpg` e destino do link da ficha oficial. Não houve novo controle interativo. Logs consultados: mensagens de metadados da extensão Chrome, sem erro associado à landing. Não se afirma conformidade WCAG completa; não houve auditoria de tecnologia assistiva ou todos os estados de zoom.

## Aceite e limites

Sem pendência P0/P1/P2 encontrada na revisão final. Comparação com a referência não significa igualdade pixel a pixel: fonte/paleta, texto confirmado, notas e reflow mobile são restrições deliberadas do produto. As imagens são conceituais, não fotografias documentais do carro real. O aceite técnico não substitui a opinião final do proprietário.

Checklist concluído: fonte aberta; captura real; comparação conjunta e focada; contexto com seção anterior; seis larguras; proporção das imagens; carregamento; links; console; preservação fora do módulo. Publicação segue pelo workflow existente após versionamento.

final result: passed
