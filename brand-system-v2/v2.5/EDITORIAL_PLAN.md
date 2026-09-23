# MotoristaOPS — Brand Book V2.5

**Estado:** proposta editorial para revisão. Não substitui o Brand Book V2 aprovado, `DESIGN.md`, `VISUAL_LOCK.json` nem os tokens até que as páginas, o conteúdo e os assets sejam verificados e aprovados.  
**Decisões do operador, 23/09/2026:** consolidar redundâncias preservando todas as regras aprovadas; Figma como arquivo mestre editável.  
**Arquivo de prova:** [Figma — seis páginas modelo](https://www.figma.com/design/AAVzvnHDXZ1rcHYqHOeJAW).  
**Fonte da verdade:** [`DESIGN.md`](https://github.com/henrico-design-amaral/motoristaops/blob/main/DESIGN.md), [`VISUAL_LOCK.json`](https://github.com/henrico-design-amaral/motoristaops/blob/main/VISUAL_LOCK.json), [`design/tokens.json`](https://github.com/henrico-design-amaral/motoristaops/blob/main/design/tokens.json), [`source/ICONOGRAPHY.md`](https://github.com/henrico-design-amaral/motoristaops/blob/main/source/ICONOGRAPHY.md), [Brand Book V2 publicado](https://www.motoristaops.com.br/brand-system-v2/brandbook-v2.html) e anexo `Brand Book V2.zip` fornecido pelo operador.

## O problema observado no V2 anexado

O ZIP contém 74 arquivos PNG numerados em sequência; as páginas impressas chegam a 77 e incluem numeração repetida. Nas páginas iniciais, há áreas de respiro e hierarquia evidente. Mais adiante, a composição se torna uma coleção de listas, caixas, ícones e pequenas imagens. A página impressa 29 repete o logo grande; a 54 acrescenta azul vivo e texto pequeno; a 77 mantém três colunas e muitas enumerações. A coloração azul, os acentos laranja/vermelho, o uso recorrente de serifada como display e o brasão grande em praticamente toda página divergem dos papéis de cor, fonte e presença estabelecidos pelo sistema V2 vigente. As observações visuais são fatos do ZIP; a avaliação de legibilidade é uma inferência de design a validar em PDF/impresso e tela.

O conteúdo do ZIP mistura manifesto, regras de marca, instruções de produção, Design System, protocolos de atendimento, portfólio e casos de uso. Esses elementos são relevantes, porém precisam de níveis de leitura diferentes. A consolidação não elimina normas: cada decisão preservada terá uma origem, destino e estado na matriz de rastreabilidade.

## Arquitetura editorial proposta

| Parte | Capítulos | Conteúdo principal | Detalhe que passa aos anexos |
| --- | --- | --- | --- |
| I · Fundação | 1. Tese; 2. Princípios; 3. Papel do operador | Passageiro, serviço, contexto, presença discreta, evidência antes da promessa | Lista integral de princípios e casos de fronteira |
| II · Identidade | 4. Assinatura; 5. Cor; 6. Tipografia; 7. Espaço; 8. Ícones | Uso correto e incorreto com pelo menos um exemplo verificável por regra | Medidas, variantes de logo, tokens, contraste, mapa de ícones |
| III · Linguagem | 9. Fotografia; 10. Voz; 11. Movimento | Fotografia real, escrita, hierarquia narrativa e motion restrito | Roteiros, microcopy, especificações por formato |
| IV · Experiência | 12. Jornada; 13. Serviço; 14. Aplicações | A experiência antes, durante e depois do trajeto, por canal e ponto de contato | Serviços à disposição, aeroporto, saúde, eventos, reuniões, viagens; canais e formatos |
| V · Controle | 15. Acessibilidade; 16. Governança | Brand Gate, fonte da verdade, direitos, exceções, bloqueio e aprovação | Checklist detalhado e registros de QA |
| Anexos | A. Ativos; B. Casos e canais; C. Rastreabilidade; D. Histórico | Evidência operacional consultável, sem sobrecarregar as páginas narrativas | Páginas extensas do V2 anexado, tabelas e exemplos técnicos |

### Critério de consolidação

Cada bloco do V2 deve receber uma ação rastreável: **preservar**, **fundir**, **mover para anexo**, **corrigir por autoridade mais recente** ou **marcar como histórico**. Nenhuma decisão aprovada será excluída só para reduzir páginas. Claim ou métrica sem fonte será identificado como pendente, nunca reescrito como fato.

## Regras da página mestre — proposta para validação visual

- Formato A4 vertical proporcional (prova editável 1240 × 1754 no Figma). A4 é uma escolha de produção reversível, ainda sem aprovação de impressão.
- Quatro famílias de página: **abertura**, **regra e demonstração**, **caso contextual** e **anexo técnico**. Cada uma tem uma área visual dominante e um único objetivo de leitura.
- Marfim `#F3EFE4` estrutura a leitura. Noite `#070709` serve a aberturas institucionais, não a todo capítulo. Grafite `#151518` é texto em claro. Champagne `#C79C5B` assina/accentua; Âmbar `#F0B44D` aparece somente em exemplos de rota/localização.
- Instrument Sans domina corpo, legendas, regras e títulos. Bebas Neue aparece apenas em display selecionado. Não usar outra família tipográfica para a nova composição.
- Usar 8 px como ritmo estrutural e 4 px como subdivisão. Manter margens e alinhamentos previsíveis; romper o grid apenas quando a regra e o contexto justificarem.
- Logo institucional completo em abertura/encerramento (L3); nos miolos, marcador textual editorial sem repetir logo, podendo usar L1/L2 com master oficial em contexto apropriado.
- Ícones funcionais somente Lucide 24 × 24, stroke 1.75, quando trazem sentido. Não usar pictogramas decorativos para numerar tudo.
- Fotografia real do serviço e do HB20 preto; revisar placas, rostos de terceiros e dados sensíveis antes de qualquer publicação. Não substituir prova real por imagem gerada.
- Textos e imagens são camadas editáveis. Logo e marca são assets oficiais; nada da identidade é reconstruído por IA.

## Mapa do material anexado

| Faixa dos PNGs no ZIP | Assuntos observados | Destino proposto |
| --- | --- | --- |
| 01–18 | Fundação, cor, tipografia, espaço, marca, foto, ícones, voz, serviços, redes, CTA, vídeo, acessibilidade e governança | Partes I–V, removendo repetição de cabeçalhos e slogans |
| 19–29 | Detalhamento dos mesmos sistemas e de governança | Regras centrais e anexos técnicos |
| 30–47 | Fotografia, presença humana, aplicações, canais, templates, componentes, microcopy e Brand Gate | Partes II–V e anexos A/B |
| 48–56 | Vídeo, portfólio, jornada, atendimento, WhatsApp, veículo, inclusão e governança | Partes III–V e anexos B/C |
| 57–74 | Casos de serviço, campanhas e ecosistema digital, com páginas impressas até 77 | Capítulos 12–14 e anexos B/C, preservando distinções operacionais |

## Evidência, divergências e bloqueios

1. **Autoridade antiga no Drive.** `MotoristaOPS V2 — SOURCES`, criado em 03/09, chama “V12” de autoridade. O [kernel vigente](https://github.com/henrico-design-amaral/motoristaops/blob/main/foundation/DECISION_MEMORY.md) declara essa referência inválida; o documento antigo é histórico e não dita a nova identidade. Deve ser reconciliado em etapa própria, sem atualização silenciosa de outra fonte.
2. **Asset ausente no Git.** [`ASSET_REGISTRY.md`](https://github.com/henrico-design-amaral/motoristaops/blob/main/brand-system-v2/ASSET_REGISTRY.md) aponta `/landing-v3/logo-oficial.svg`; o caminho não consta na árvore atual da branch `main` consultada em 23/09. O PNG `LogoOficial.png` fornecido pelo operador serve como master institucional para a capa de prova. Outras variantes, em especial a assinatura cotidiana brasão + “MotoristaOPS”, permanecem **bloqueadas** até localizar o arquivo produtivo exato.
3. **O ZIP visual não altera o canon.** Quando a página antiga contradiz `DESIGN.md` ou `VISUAL_LOCK.json`, a regra vigente prevalece. O conteúdo válido é preservado com tipografia e cor atuais.
4. **Status do protótipo.** Seis páginas no Figma demonstram direção; não representam livro completo, PDF final, validação de impressão nem atualização do Brand System publicado.

## Gate para expandir as páginas

1. Aprovar ou corrigir a arquitetura e as seis páginas modelo.
2. Completar a matriz página antiga → nova seção → estado → fonte.
3. Localizar masters de todas as variantes de assinatura necessárias. Se ausentes, mostrar apenas as variantes com asset exato disponível e registrar os demais usos como bloqueados.
4. Expandir no mesmo arquivo Figma, revisar página por página e exportar PDF de prova.
5. Validar leitura em tela e impressão, acessibilidade básica, cores, todos os textos e links, imagens reais/privacidade, consistência da primeira à última página.
6. Só então promover V2.5 a autoridade, se houver aprovação explícita, mantendo changelog e preservando o V2 como versão anterior.
