# QA da landing aprovada — 23/10/2026

A nova implementação de `source/landing/` substitui integralmente a antiga. O contrato visual é a landing local aprovada (V4.5), com Instrument Sans exclusiva, mínimo 12 px, introduções de seção à direita e retrato original de rosto em “Quem dirige”. Não foram introduzidos novos estilos ou CTAs.

Validação técnica local: build cliente e pré-renderização; oito testes passando (HTML indexável/SEO/JSON-LD, integridade de recursos, tipografia, assets/remoções e regras do formulário WhatsApp). O CSS e as imagens mantêm o material aprovado; carregamento abaixo da dobra passa a lazy sem alterar a composição. O campo de data inicializa o limite local após hidratação para evitar divergências de fuso horário entre build e visitante.

Fontes são WOFF2 incluídas no pacote, sem dependência de Google Fonts externo. Social card aprovado preservado por hash. Publicação pela pipeline canônica GitHub Actions → Hostinger; dashboard validado antes e depois e jamais incluído em exclusão de arquivos. Resultado dos gates públicos deve ser consultado na execução do workflow; aprovação de build não é evidência de publicação.

QA no navegador do pacote estático: 1363 px e iframes de 390, 768 e 1024 px (áreas úteis 375/753/1009 px por barra de rolagem). Sem overflow horizontal nas larguras medidas; Instrument Sans local; quatro introduções alinhadas à direita; nenhum texto visível menor que 12 px na varredura desktop. Formulário vazio mostrou erro e foco; preenchimento preparou link correto com acentos/quebras; editar origem removeu o resumo anterior. Galeria abriu, navegou para imagem traseira e fechou; FAQ expandiu. Avisos da extensão do ambiente foram separados dos erros da aplicação. Nenhuma mensagem foi enviada.

Pré-publicação: primeira execução foi interrompida antes do SFTP por timeout na consulta HTTPS do dashboard a partir do GitHub. Nova checagem independente confirmou HTTP 200 e marcadores operacionais. O preflight passou a usar IPv4 e janela maior de conexão, preservando o gate. Vite atualizado de 6.4.2 para 6.4.5; novo build mantém os mesmos hashes de CSS/JS/fontes e a auditoria npm reporta zero vulnerabilidades.

A segunda execução confirmou conexão/preflight e transferiu os assets. A Hostinger recusou renomear o HTML temporário sobre um `index.html` existente; a publicação foi ajustada para `put -e`, substituição direta suportada pelo cliente SFTP, seguida da remoção do temporário. Sem backup da página antiga.

O manifest de verificação HTTP enumera somente arquivos públicos; `.htaccess` é entregue ao servidor e validado localmente, sem tentar ler a configuração protegida por URL pública. Bootstrap de desenvolvimento ignora o comentário placeholder ao distinguir página vazia de HTML pré-renderizado.

A conferência pública detectou transformação automática somente no JPEG de compartilhamento: dimensões 1200×630 preservadas, mas bytes alterados pela CDN. Aplicada diretiva HTTP `no-transform` ao social card e nonce de verificação por requisição; os hashes continuam sendo exigidos, sem afrouxar o gate de integridade.

## Resultado público confirmado

**PUBLICADO E VALIDADO — 23/10/2026 (America/Sao_Paulo).** Workflow de deploy `40048817368` concluído com sucesso para o commit `117b3e16e85431517c7069fa590351edbc8aa042`. Os 25 arquivos públicos passaram por SHA-256; canonical/redirecionamento/indexação e remoção dos assets antigos passaram; dashboard e Brand System operacionais. O social card passou sem transformação. Formulário preparado e resumo revisado no domínio público, sem envio de mensagem. Evidência atual em `ops/publication-evidence/`. Nenhuma cópia extra da landing antiga foi criada.

## Motion aprovado — 26/10/2026

Aplicadas as sete intervenções autorizadas, descritas em `source/landing/MOTION.md`. Build e 11 testes passaram. QA de interações no navegador de validação incluiu interrupções, teclado, foco, galeria, FAQ, formulário e WhatsApp contextual, além de desktop/celular. Redução de movimento inicial/dinâmica e fallback foram verificados em testes automatizados; não foi alterada a preferência de animações do sistema do usuário. Imagens, fontes, textos e grade aprovados permanecem. Publicação segue workflow canônico com verificação de arquivos por hash e preservação de dashboard/Brand System.

**PUBLICADO E VALIDADO — 26/10/2026.** Deploy `40436189486` e verificação independente `40436269982` concluídos com sucesso no commit `e99516f983f0d5ac494597e91979641ca598727c`. Os 25 arquivos públicos passaram por hash; dashboard e Brand System preservados. Conferência pública adicional em Edge: marcador `native-2026-10-26`, FAQ funcional em 390 px, Instrument Sans e zero textos abaixo de 12 px na varredura; sem overflow em 390/1024 px; formulário exibiu resumo e foco correto, WhatsApp flutuante recolhido na seção final, sem envio. Evidência visual em `ops/publication-evidence/motion-desktop.jpg`.


## Seção do carro aprovada — 27/10/2026

- Aplicação da prévia estática aprovada, restrita a `#o-carro` e seu ampliador. Quatro fotos internas da Luxury e cinco proteções realizadas.
- Build e 11 testes existentes aprovados; Foundation e `git diff --check` aprovados. Sem dependências novas.
- O HTML pré-renderizado fora da seção permanece idêntico ao release anterior, normalizados somente os identificadores de release e hashes dos bundles. SHA-256 normalizado: `123434d8e058705e8960e8f2332dad40c40b1798ddc73c2643504e9d29be8557`.
- QA no navegador, larguras nominais 390, 768, 1024 e 1363 px: sem overflow horizontal; mesma largura de `.container` em Serviços e Carro; nenhum texto do módulo abaixo de 12 CSS px. As larguras úteis em iframes incluem a barra de rolagem do navegador.
- Desktop: quatro fotos internas abertas com Enter, Escape fecha e devolve o foco ao botão acionado; navegação da última imagem para a primeira aprovada. No celular: ampliação do banco traseiro e Escape aprovados; fotos em duas colunas e proteções em uma.
- Origem das fotos e confirmação das proteções documentadas em `source/landing/VEHICLE.md` e `foundation/DECISION_MEMORY.md`.
- Publicado pelo commit `1e76e16817fe63b9883029cad7e4768203c9e21f`. Deploy `40493192216` e verificação independente `40493324321`: sucesso. Confirmados 29 arquivos públicos byte a byte, dashboard e Brand System intactos. QA pública em Edge (largura útil observada de 355 px) e Chrome desktop: quatro fotos carregadas, galeria e retorno de foco aprovados. Evidência em `ops/publication-evidence/vehicle-published-2026-10-27.jpg`.
