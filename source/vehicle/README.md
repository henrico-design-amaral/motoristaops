# Novo carro — prévia isolada

Escopo TASK, 2026-10-21. Branch `preview/novo-carro-luxury-20261021`.
Base aprovada: `b7fb22456ab9c0f303ae2c058a031223b22d0995`.
Somente nova seção após serviços. Não promover para main/publicar sem validação do proprietário.

## Fontes e limites

- Proprietário: anexo `Texto colado(20261021-234205).txt`: Omoda 5 Luxury cinza, adquirido zero quilômetro; películas informadas.
- Ficha oficial: https://cms.omodajaecoo.com.br/manual/pdf/FichaTecnicaSimplificada_Omoda5.pdf
- PDF consultado e renderizado em 2026-10-21; SHA-256 `dbcdbe9758268bcca99470db86d5709d36659f9c224e34251f14258df585eb4f`.
- Conferidos visualmente na coluna Luxury: ar automático digital Dual Zone com saída traseira; bancos em tecido e material premium sintético; 4 portas USB; 7 airbags (frontais duplos, laterais dianteiros, central dianteiro e cortina).
- Nenhuma alegação de ADAS 2.5, bancos elétricos/aquecidos/ventilados, Sony ou carregador por indução: a ficha os reserva à Prestige.

## Imagem

A seção reutiliza o asset conceitual já aprovado e versionado em `release/visual-assets/hero`, sem edição: `/assets/hero-omoda-56c0068f8b55.avif`, SHA-256 `56c0068f8b55f7fcf750402bbcb695b3efc4dcd6d28f93493d5e11a4b991ea78`. A legenda e o alt identificam sua natureza conceitual. Não é evidência de equipamentos, versão ou veículo real.

Pendente: fotografia principal real e duas ou três fotografias complementares de bancos traseiros/interior da Luxury, próprias ou com autorização comercial verificada. Não foram utilizadas imagens de catálogo: a página oficial mistura equipamentos da Prestige e não forneceu autorização de reutilização identificável. Nenhum interior gerado por IA.

## Preparação

Os registros disponíveis descrevem aplicação futura; não há confirmação de conclusão. Película antivandalismo e PPF integral são apresentados como preparação prevista. Produto, especificações e conclusão permanecem pendentes. Não há alegações de blindagem, proteção garantida, G5, transparência legal, resistência ou garantia.

## Implementação

- `source/parts/001-vehicle.htmlfrag`: CSS restrito a `.mo-vehicle*`.
- `source/parts/002.htmlfrag`: adição desktop após serviços.
- `source/parts/002a-mobile-exclusive.htmlfrag`: adição mobile após serviços.
- `source/vehicle/section.html`: matriz editorial das duas instâncias, substituindo `{mode}` e `{id}`; não entra na concatenação de produção.
- `scripts/preview-vehicle.py`: montagem local de HTML integrado/autocontido usando assets e vendors aprovados; sem deploy.
- Este arquivo: fontes, pendências e decisão de escopo.

Os dois blocos têm IDs próprios; CSS exibe só um a cada largura, respeitando o breakpoint existente de 780 px. Não há carrossel, dependência nova ou JavaScript da seção. Imagem com proporção original, dimensões explícitas e carregamento lazy. A hero, cabeçalho, metadados, conteúdo anterior e workflows não são alterados.

## Validação desta entrega

- Gate Foundation: PASS.
- Comparação com base: ao remover somente os blocos delimitados `mo-vehicle`, todos os fragmentos anteriores ficam idênticos byte a byte.
- As duas instâncias correspondem à matriz editorial, com IDs exclusivos.
- Prévia HTML com imagens, fonte e Lucide incorporados: sem referências externas de scripts/fontes/imagens renderizadas.
- `git diff --check`: PASS.
- PENDENTE: inspeção visual e capturas em 360, 390, 768 e 1440 px. O navegador disponível recusou o protocolo local `file:` por política de segurança. Não houve contorno do bloqueio. O HTML funcional é entregue para validação; não se declara aprovação visual responsiva.
- Nenhum deploy ou alteração de main, dashboard, hospedagem ou segurança.
