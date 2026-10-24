# QA da landing aprovada — 23/10/2026

A nova implementação de `source/landing/` substitui integralmente a antiga. O contrato visual é a landing local aprovada (V4.5), com Instrument Sans exclusiva, mínimo 12 px, introduções de seção à direita e retrato original de rosto em “Quem dirige”. Não foram introduzidos novos estilos ou CTAs.

Validação técnica local: build cliente e pré-renderização; oito testes passando (HTML indexável/SEO/JSON-LD, integridade de recursos, tipografia, assets/remoções e regras do formulário WhatsApp). O CSS e as imagens mantêm o material aprovado; carregamento abaixo da dobra passa a lazy sem alterar a composição. O campo de data inicializa o limite local após hidratação para evitar divergências de fuso horário entre build e visitante.

Fontes são WOFF2 incluídas no pacote, sem dependência de Google Fonts externo. Social card aprovado preservado por hash. Publicação pela pipeline canônica GitHub Actions → Hostinger; dashboard validado antes e depois e jamais incluído em exclusão de arquivos. Resultado dos gates públicos deve ser consultado na execução do workflow; aprovação de build não é evidência de publicação.

QA no navegador do pacote estático: 1363 px e iframes de 390, 768 e 1024 px (áreas úteis 375/753/1009 px por barra de rolagem). Sem overflow horizontal nas larguras medidas; Instrument Sans local; quatro introduções alinhadas à direita; nenhum texto visível menor que 12 px na varredura desktop. Formulário vazio mostrou erro e foco; preenchimento preparou link correto com acentos/quebras; editar origem removeu o resumo anterior. Galeria abriu, navegou para imagem traseira e fechou; FAQ expandiu. Avisos da extensão do ambiente foram separados dos erros da aplicação. Nenhuma mensagem foi enviada.
