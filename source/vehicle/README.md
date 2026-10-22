# Novo carro — prévia conforme referência visual

Escopo TASK. Branch `preview/novo-carro-luxury-20261021`. Base de produção preservada: `b7fb22456ab9c0f303ae2c058a031223b22d0995`.

## Direção visual fornecida pelo proprietário

A referência `image(5).png` substitui a proposta clara anterior. Aplicada à seção somente: fundo Noite, apresentação à esquerda, carro em destaque à direita, faixa com cinco atributos, três enquadramentos e seis blocos inferiores. Textos são HTML selecionável; ícones são Lucide. Instrument Sans e Champagne preservados conforme o pedido original, sem importar a tipografia condensada ou o tom âmbar da imagem.

A referência foi reencodificada integralmente em AVIF; os enquadramentos são janelas de CSS sobre seus pixels, sem gerar ou reconstruir carro, interior, placa ou identidade. Não se usa a imagem inteira como seção de texto rasterizado.

- Origem: imagem fornecida pelo proprietário nesta conversa.
- PNG original SHA-256: `4ab3a371f58a041118a20a9c2ad1afa52c39d3e2ffab3aee1d775a06342b545d`.
- AVIF: 239.833 bytes; SHA-256 `69a59b2c9dcec4a89183b7a8354496c329b83ae824489b83803fab72c4cb523b`.
- Asset versionado em `release/vehicle-assets/part-00000.bin` a `part-00004.bin`.
- Uso previsto na landing: `/assets/vehicle-reference.avif`.

## Imagens conceituais e limite de evidência

A direção mais recente solicita reproduzir a imagem fornecida. As vistas principal, traseira, interior e detalhe são reutilizadas como composição conceitual, com legenda e alt explícitos. Não documentam o veículo real nem comprovam equipamentos da Luxury. O interior tem aviso próprio de configuração não confirmada. Nenhum novo interior foi gerado.

Permanece pendente substituir a composição por fotografias reais da Luxury do proprietário ou fotos autorizadas e verificadas. A utilização da referência para esta prévia não transforma suas imagens em evidência técnica.

## Conteúdo confirmado

Proprietário: Omoda 5 Luxury cinza, adquirido zero quilômetro. O texto descreve a aquisição e não afirma odômetro atual de 0 km.

Ficha técnica oficial: https://cms.omodajaecoo.com.br/manual/pdf/FichaTecnicaSimplificada_Omoda5.pdf

PDF consultado e renderizado em 21/10/2026; SHA-256 `dbcdbe9758268bcca99470db86d5709d36659f9c224e34251f14258df585eb4f`.

Conferidos na coluna Luxury:
- Ar automático digital Dual Zone com saída para o banco traseiro.
- Bancos em tecido e material premium sintético.
- Quatro portas USB.
- Sete airbags: frontais duplos, laterais dianteiros, central dianteiro e de cortina.

Não copiadas da arte: G5, alegações comparativas de espaço/segurança/eficiência, odômetro permanente de 0 km ou películas já instaladas.

Película antivandalismo e PPF integral constam como preparação prevista. Produto, especificações e conclusão das aplicações permanecem pendentes. Não há promessas de blindagem, inviolabilidade ou segurança garantida.

## Arquivos desta revisão

- `source/parts/001-vehicle.htmlfrag`: novo CSS escuro, restrito à seção.
- `source/parts/002.htmlfrag`: somente bloco do carro desktop.
- `source/parts/002a-mobile-exclusive.htmlfrag`: somente bloco do carro mobile.
- `source/parts/002z-lucide-runtime.htmlfrag`: oito novas entradas semânticas para os ícones da seção; entradas e comportamento anteriores preservados.
- `source/vehicle/section.html`: matriz editorial das duas instâncias.
- `source/vehicle/README.md`: decisões, fontes e limites.
- `scripts/preview-vehicle.py`: opção de abrir a prévia diretamente na seção, sem alterar a landing de produção.
- `release/vehicle-assets/part-00000.bin` até `part-00004.bin`: referência otimizada em cinco partes.
- `.github/workflows/deploy-landing-hostinger.yml`: somente montagem e verificação SHA do novo asset; nenhuma alteração de gatilho, destino, credenciais, publicação da hero ou dashboard.

## Revisão após rejeição da prévia

Em 22/10/2026, a seção foi refeita e confrontada com a referência em captura real de navegador. A chamada passou a seguir a referência: “Conheça o novo carro / da MotoristaOPS”. Corrigidos escala e posição do carro, quebra e tamanho do título, margem da galeria, densidade dos cards e resíduos rasterizados atrás da faixa de atributos. As legendas das imagens permanecem acessíveis; a informação de natureza conceitual é exibida em nota da seção.

## Validação concluída

Relatório completo em `design-qa.md`, incluindo comparação conjunta da referência com a captura e comparação focada do título.

- Foundation e `git diff --check`: PASS.
- Preservação do conteúdo anterior: comparação byte a byte ao retirar somente os novos blocos e o mapa semântico acrescentado.
- Navegador: 360, 390, 768 e 1440 CSS px; uma única seção visível em cada largura, quatro imagens carregadas, onze ícones renderizados e largura de rolagem igual à largura da página.
- Conferidos recursos, legibilidade, enquadramento e destino do link técnico.
- Nenhum erro da landing encontrado nos logs consultados; mensagens de metadados da extensão são externas à aplicação.
- Prévia autocontida com imagens, fontes e scripts incorporados; abre na nova seção.
- Capturas finais: `motoristaops-carro-desktop.jpg` e `motoristaops-carro-mobile.jpg`.

Sem merge ou publicação em produção. Fotografias reais e confirmação das películas continuam pendentes. O relatório visual não representa aprovação do proprietário.
