const ROOT = 'https://www.motoristaops.com.br';
export const legalPages = [
  {
    path: '/privacidade/',
    heading: 'Política de Privacidade',
    title: 'Política de Privacidade | MotoristaOPS',
    description: 'Entenda como a MotoristaOPS utiliza informações de contato, dados de trajetos e cookies opcionais de medição.',
    sections: [
      ['1. Quem trata os dados', [
        'A MotoristaOPS é o serviço de transporte executivo coordenado por Henrico Amaral, CNPJ 69.099.839/0001-25. Para dúvidas e solicitações sobre dados pessoais, entre em contato pelo WhatsApp (11) 98832-9725.'
      ]],
      ['2. Quais informações utilizamos', [
        'Quando você solicita um orçamento ou atendimento, poderá informar nome, contato, data, horário, origem, destino, quantidade de passageiros, bagagens, paradas e outras necessidades do trajeto.',
        'O formulário do site prepara uma mensagem no seu dispositivo. Ela somente chega ao WhatsApp se você optar por abrir a conversa e enviá-la. A simples preparação da mensagem não confirma nem envia uma reserva.'
      ]],
      ['3. Para que usamos as informações', [
        'Usamos os dados necessários para responder ao contato, preparar orçamentos, confirmar disponibilidade, organizar os trajetos e atender solicitações relacionadas ao serviço. Conforme a finalidade, o tratamento pode ser necessário a medidas pré-contratuais, execução de contrato ou cumprimento de obrigações legais.',
        'Se você permitir cookies opcionais de estatísticas, usamos Google Analytics para entender visitas e cliques de intenção de contato. Um clique no WhatsApp não significa que uma mensagem foi enviada ou que um serviço foi contratado.'
      ]],
      ['4. Com quem as informações podem ser compartilhadas', [
        'O WhatsApp recebe as informações que você decidir enviar nesse aplicativo, sujeito às condições e políticas do próprio serviço.',
        'Quando necessário para consultar disponibilidade ou organizar um atendimento, dados essenciais do trajeto podem ser compartilhados com motoristas ou empresas parceiras envolvidos na cotação ou no serviço. Também podem existir prestadores técnicos de hospedagem e medição ligados ao funcionamento do site.'
      ]],
      ['5. Cookies e suas escolhas', [
        'O site utiliza armazenamento local necessário para lembrar sua escolha de privacidade. A medição opcional por Google Analytics só é ativada com sua autorização; é possível recusar sem perder o acesso ao conteúdo ou aos contatos.',
        'Você pode alterar a escolha a qualquer momento pelo botão “Preferências de cookies” disponível no rodapé. A revogação impede novas medições pelo site, mas não elimina automaticamente informações que eventualmente já tenham sido processadas por terceiros.'
      ]],
      ['6. Conservação e segurança', [
        'Conservamos informações pelo tempo necessário às finalidades do atendimento e às obrigações legais ou contratuais aplicáveis. Não há um prazo único para todas as categorias de informação.',
        'Adotamos cuidados proporcionais para limitar o acesso e o uso das informações, sem garantir que qualquer serviço conectado à internet seja inteiramente livre de riscos.'
      ]],
      ['7. Seus direitos', [
        'De acordo com a Lei Geral de Proteção de Dados Pessoais (LGPD), você pode solicitar informações sobre o tratamento de seus dados e exercer, quando cabível, direitos como acesso, correção, eliminação, oposição e revogação do consentimento.',
        'Para fazer um pedido, use o WhatsApp (11) 98832-9725. Poderemos solicitar informações suficientes para confirmar a identidade do solicitante e proteger os dados de terceiros.'
      ]],
      ['8. Atualizações', [
        'Esta política pode ser revista quando houver mudanças nos serviços ou no tratamento de dados. A versão atual permanece disponível nesta página.'
      ]]
    ]
  },
  {
    path: '/termos-de-uso/',
    heading: 'Termos de Uso',
    title: 'Termos de Uso | MotoristaOPS',
    description: 'Condições básicas de uso do site MotoristaOPS e orientações para solicitar orçamentos de transporte executivo.',
    sections: [
      ['1. Sobre o serviço', [
        'O site MotoristaOPS apresenta serviços de transporte executivo com hora marcada em São Paulo e região, coordenados por Henrico Amaral. O atendimento pode ocorrer com veículo da operação ou com veículo de parceiro, conforme a necessidade e a disponibilidade confirmadas.'
      ]],
      ['2. Solicitação de orçamento e reserva', [
        'As informações do site são apresentadas para consulta e solicitação de orçamento. Preencher o formulário, abrir o WhatsApp ou enviar uma mensagem não representa reserva automática.',
        'Preço, disponibilidade, motorista, veículo, horários, bagagens, paradas, espera, retorno e demais condições são alinhados diretamente antes da confirmação do atendimento.'
      ]],
      ['3. Informações fornecidas pelo cliente', [
        'Para receber uma proposta adequada, informe dados corretos de origem, destino, data, horário, passageiros, bagagens e necessidades específicas. Avise sobre mudanças que possam afetar o planejamento.'
      ]],
      ['4. Veículos de parceiros', [
        'Categorias como sedã, SUV, minivan ou van podem depender de disponibilidade de parceiros. A MotoristaOPS consulta as opções e informa as condições relevantes antes da confirmação. O site não representa toda a rede parceira como frota própria.'
      ]],
      ['5. Pagamentos, alterações e cancelamentos', [
        'Valores, formas de pagamento e condições de alterações, espera ou cancelamento devem ser informados na proposta específica antes da contratação. O site não estabelece uma tarifa única nem substitui os termos combinados no atendimento.',
        'Permanecem preservados os direitos aplicáveis previstos na legislação brasileira, inclusive os de proteção do consumidor.'
      ]],
      ['6. Uso do site e links externos', [
        'Use este site de maneira lícita, sem tentar comprometer seu funcionamento. Links para WhatsApp, Google Maps e outras plataformas levam a serviços de terceiros, sujeitos a suas próprias políticas.',
        'As informações exibidas podem ser atualizadas. Se houver dúvida sobre uma condição ou disponibilidade, confirme diretamente antes de planejar o trajeto.'
      ]],
      ['7. Privacidade e contato', [
        'O tratamento de informações pessoais está descrito na Política de Privacidade disponível neste site.',
        'Para informações sobre os serviços, orçamentos e solicitações, entre em contato pelo WhatsApp (11) 98832-9725.'
      ]]
    ]
  }
];
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const PAGE_CSS = [
  'html{scroll-behavior:smooth}body{background:#070709;color:#F3EFE4;margin:0}',
  '.legal-page{box-sizing:border-box;font-family:"Instrument Sans",sans-serif;min-height:100vh}',
  '.legal-page *{box-sizing:border-box}.legal-page a{color:inherit}',
  '.legal-wrap{width:calc(100% - 48px);max-width:880px;margin-inline:auto}',
  '.legal-header,.legal-footer{border-bottom:1px solid #947546;padding:22px 0}',
  '.legal-nav{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}',
  '.legal-logo{display:block;width:180px;height:auto}',
  '.legal-links{display:flex;gap:20px;flex-wrap:wrap;font-size:13px}',
  '.legal-links a,.legal-footer a{text-decoration:underline;text-underline-offset:4px}',
  '.legal-main{padding:64px 0 88px}',
  '.legal-kicker{font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#C79C5B;margin:0 0 18px}',
  '.legal-main h1{font-size:clamp(36px,5vw,60px);line-height:1.1;margin:0 0 12px}',
  '.legal-updated{font-size:13px;color:#F3EFE4;margin:0 0 50px}',
  '.legal-section{border-top:1px solid #947546;padding:24px 0 28px}',
  '.legal-section h2{font-size:21px;line-height:1.3;margin:0 0 12px}',
  '.legal-section p{font-size:15px;line-height:1.75;color:#F3EFE4;margin:0 0 12px}',
  '.legal-footer{border-top:1px solid #947546;border-bottom:0}',
  '.legal-footer p{font-size:12px;line-height:1.6}',
  '.legal-footer [data-cookie-settings]{margin-top:14px}',
  '.legal-page :focus-visible{outline:3px solid #C79C5B;outline-offset:4px}',
  '@media(max-width:600px){.legal-wrap{width:calc(100% - 40px)}.legal-main{padding:48px 0 56px}.legal-logo{width:156px}.legal-section h2{font-size:19px}.legal-section p{font-size:14px}}'
].join('\n');
export function renderLegalPage(page, cssHref) {
  const url = ROOT + page.path;
  const structuredData = JSON.stringify({
    '@context':'https://schema.org','@type':'WebPage','@id':url+'#webpage',
    url, name:page.heading,description:page.description,
    inLanguage:'pt-BR',isPartOf:{'@id':ROOT+'/#website'}
  }).replaceAll('<','\\u003c');
  const content=page.sections.map(([title,paragraphs])=>'<section class="legal-section"><h2>'+esc(title)+'</h2>'+paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('')+'</section>').join('\n');
  return [
    '<!doctype html><html lang="pt-BR"><head>',
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">',
    '<meta name="theme-color" content="#070709"><meta name="robots" content="index,follow">',
    '<title>'+esc(page.title)+'</title>',
    '<meta name="description" content="'+esc(page.description)+'">',
    '<link rel="canonical" href="'+url+'">',
    '<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">',
    '<meta property="og:type" content="website"><meta property="og:site_name" content="MotoristaOPS">',
    '<meta property="og:title" content="'+esc(page.title)+'">',
    '<meta property="og:description" content="'+esc(page.description)+'">',
    '<meta property="og:url" content="'+url+'">',
    '<meta property="og:image" content="'+ROOT+'/assets/og-motoristaops.jpg?v=20260916">',
    '<link rel="stylesheet" href="'+esc(cssHref)+'"><link rel="stylesheet" href="/assets/cookie-consent.css">',
    '<style>'+PAGE_CSS+'</style>',
    '<script type="application/ld+json">'+structuredData+'</script>',
    '<script src="/servicos/track.js?v=20261121" defer></script><script src="/assets/cookie-consent.js" defer></script>',
    '</head><body><div class="legal-page">',
    '<header class="legal-header"><div class="legal-wrap legal-nav">',
    '<a href="/" aria-label="Voltar ao início"><img src="/assets/logo-horizontal.webp" width="908" height="246" class="legal-logo" alt="MotoristaOPS por Henrico Amaral"></a>',
    '<nav class="legal-links" aria-label="Navegação"><a href="/">Início</a><a href="/privacidade/">Privacidade</a><a href="/termos-de-uso/">Termos de Uso</a></nav>',
    '</div></header>',
    '<main class="legal-main" id="conteudo"><div class="legal-wrap">',
    '<p class="legal-kicker">MotoristaOPS · São Paulo e região</p>',
    '<h1>'+esc(page.heading)+'</h1><p class="legal-updated">Última atualização: 21 de novembro de 2026</p>',
    content,
    '</div></main>',
    '<footer class="legal-footer"><div class="legal-wrap">',
    '<p>MotoristaOPS por Henrico Amaral · CNPJ 69.099.839/0001-25</p>',
    '<p>Contato: <a href="https://wa.me/5511988329725" target="_blank" rel="noopener noreferrer">WhatsApp (11) 98832-9725</a> · <a href="/privacidade/">Política de Privacidade</a> · <a href="/termos-de-uso/">Termos de Uso</a></p>',
    '<button class="mops-cookie-settings-trigger" type="button" data-cookie-settings>Preferências de cookies</button>',
    '</div></footer></div></body></html>'
  ].join('\n');
}
