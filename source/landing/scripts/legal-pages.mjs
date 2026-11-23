import {legalIdentity} from '../src/legal-identity.mjs';
const ROOT = 'https://www.motoristaops.com.br';
export const legalPages = [
  {
    path: '/privacidade/',
    heading: 'Política de Privacidade',
    title: 'Política de Privacidade | MotoristaOPS',
    description: 'Entenda como a MotoristaOPS utiliza informações de contato, dados de trajetos e cookies opcionais de medição.',
    sections: [
      ['1. Quem trata os dados', [
        `O serviço MotoristaOPS é prestado por ${legalIdentity.registeredName}, CNPJ ${legalIdentity.cnpj}, nome de divulgação MotoristaOPS. Endereço cadastral: ${legalIdentity.address}. Canal de atendimento e privacidade: WhatsApp ${legalIdentity.contactPhone}. O CCMEI informa como atividade principal CNAE ${legalIdentity.cnae} (locação de automóveis com motorista).`
      ]],
      ['2. Quais informações utilizamos', [
        'O formulário desktop pede origem e destino e permite informar data, horário, passageiros e detalhes. No formulário mobile, também são pedidos nome, tipo de serviço, data, horário e passageiros; há campos opcionais para bagagens, veículo e observações. Na conversa pelo WhatsApp, a própria conta pode fornecer número de telefone, identificação, mensagens e informações adicionais. Não solicitamos CPF ou cartão no formulário público do site.',
        'Ao preencher e revisar o formulário, o texto é preparado no seu navegador e não é enviado a um banco de orçamentos do site. Ao escolher abrir o WhatsApp, o conteúdo preparado é incluído no endereço de abertura da conversa e pode ser processado pela plataforma WhatsApp antes mesmo de você apertar o botão de enviar. A mensagem ao atendimento só será enviada se você confirmar o envio no WhatsApp. Nenhuma reserva é confirmada automaticamente.'
      ]],
      ['3. Para que usamos as informações', [
        'Utilizamos nome e contato para identificar e responder à solicitação; origem, destino, data, horário, passageiros, bagagem e preferências para avaliar rota, disponibilidade, categoria de veículo, orçamento e execução do transporte; dados de negociação e pagamento para confirmar ou administrar a contratação. Conforme o caso, as bases legais podem incluir procedimentos preliminares e execução do contrato, cumprimento de obrigações legais e legítimos interesses observados os direitos do titular. Informações de saúde não devem ser incluídas no campo livre; necessidades de acessibilidade podem ser informadas apenas quando necessárias ao atendimento.',
        'Após autorização opcional, usamos Google Analytics 4 (Google) para medir acesso ao site e intenção de contato por eventos de cliques, sem enviar propositalmente campos digitados no formulário. Os eventos próprios não incluem nome, CPF, e-mail ou o texto da solicitação. O GA4 poderá tratar dados técnicos do navegador e da visita segundo suas configurações. Um clique no WhatsApp não demonstra mensagem enviada, orçamento aceito ou reserva. A medição do Google é desativada se a pessoa rejeitar ou revogar a autorização.'
      ]],
      ['4. Com quem as informações podem ser compartilhadas', [
        'O WhatsApp/Meta pode receber o texto preparado ao abrir o link da conversa, assim como metadados de acesso à plataforma, e recebe a mensagem quando você decide enviá-la. O uso do WhatsApp está sujeito às políticas dessa empresa. O site é hospedado pela Hostinger, que pode tratar dados técnicos de conexão e registros de acesso necessários à hospedagem.',
        'Compartilhamos com motoristas ou empresas parceiras somente as informações necessárias à cotação e ao atendimento confirmado, conforme a necessidade. Quando for utilizado Link de Pagamento Mercado Pago, dados de cobrança ou transação informados ao provedor serão tratados por esse serviço nos termos de sua política. Links para Instagram, TikTok e Google Maps levam a serviços de terceiros, mas não significam, por si, instalação de seus pixels de publicidade nesta página. Não afirmamos que exista integração de CRM, e-mail marketing ou inteligência artificial com estes formulários.'
      ]],
      ['5. Cookies e suas escolhas', [
        'O site registra no armazenamento local do navegador a escolha de permitir ou rejeitar estatísticas sob a chave motoristaops.analytics. A configuração é independente de cadastro e não é obrigatória para navegar, pedir orçamento ou conversar pelo WhatsApp. A tag de Google Analytics não é carregada antes de uma autorização válida. O consentimento concedido é opcional e pode ser recusado sem prejuízo ao serviço.',
        'Para alterar a escolha, use “Preferências de cookies” no rodapé. O navegador deixa de carregar a tag de medição após a revogação e recarregamento. Essa ação não apaga automaticamente informações que já tenham sido coletadas pelo Google ou por outras plataformas; pedidos de dados devem ser avaliados também conforme as regras aplicáveis aos respectivos fornecedores.'
      ]],
      ['6. Conservação e segurança', [
        'Conservamos dados de conversas, propostas e pagamentos apenas pelo tempo necessário ao atendimento e às obrigações contratuais, fiscais e legais aplicáveis. Os prazos e as cópias em WhatsApp, backups ou serviços de terceiros dependem do sistema e das obrigações correspondentes; não há um prazo único confirmado para todas as categorias. O formulário do site não cria cadastro próprio, mas o histórico de mensagens enviadas pode continuar existindo nos serviços utilizados.',
        'Adotamos cuidados proporcionais para limitar o acesso e o uso das informações, sem garantir que qualquer serviço conectado à internet seja inteiramente livre de riscos.'
      ]],
      ['7. Seus direitos', [
        'Conforme a Lei Geral de Proteção de Dados Pessoais (LGPD), é possível pedir confirmação do tratamento, acesso, correção, anonimização, bloqueio ou eliminação quando cabível, informação sobre compartilhamentos, oposição e revogação de consentimento. O pedido de exclusão será analisado considerando obrigações legais de guarda e a possibilidade de atender ao pedido nos serviços e operadores envolvidos; não prometemos eliminação automática e imediata de backups de terceiros.',
        `Para exercer esses direitos, envie uma mensagem ao WhatsApp ${legalIdentity.contactPhone} com o assunto “Privacidade e dados pessoais”. Poderemos confirmar sua identidade com as informações estritamente necessárias, localizar os registros dos sistemas sob nosso controle, corrigir ou excluir o que for cabível e orientar sobre dados mantidos por terceiros. O pedido não exige pagamento.`
      ]],
      ['8. Atualizações', [
        'Esta política descreve os fluxos públicos identificados em 23 de novembro de 2026. Alterações materiais no tratamento exigem revisão do texto e dos serviços conectados. Questões sobre retenção de backups, permissões das contas e dados compartilhados com parceiros precisam de verificação periódica e não se consideram comprovadas apenas por esta publicação.'
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
        'O site permite solicitar e revisar um orçamento, mas não vende uma assinatura, não oferece teste grátis e não confirma reserva automaticamente. A mensagem de orçamento só chega ao atendimento após envio pelo usuário dentro do WhatsApp.',
        'Preço final, veículo, condutor, disponibilidade, horários, roteiro, bagagens, paradas, espera e retorno devem constar da proposta apresentada ao cliente antes do aceite. A confirmação depende da aceitação expressa das condições por mensagem ou outro meio verificável, e de confirmação da operação. Abertura da conversa não constitui aceite contratual.'
      ]],
      ['3. Informações fornecidas pelo cliente', [
        'Para receber uma proposta adequada, informe dados corretos de origem, destino, data, horário, passageiros, bagagens e necessidades específicas. Avise sobre mudanças que possam afetar o planejamento.'
      ]],
      ['4. Veículos de parceiros', [
        'Categorias como sedã, SUV, minivan ou van podem depender de disponibilidade de parceiros. A MotoristaOPS consulta as opções e informa as condições relevantes antes da confirmação. O site não representa toda a rede parceira como frota própria.'
      ]],
      ['5. Pagamentos, alterações e cancelamentos', [
        'Valores são apresentados por orçamento, sem tabela pública única. Quando oferecido, o pagamento direto poderá ocorrer por Link de Pagamento Mercado Pago, no valor integral ou com sinal e saldo, conforme a proposta e a disponibilidade do meio. Não existe assinatura, renovação automática ou cobrança recorrente por este site. Antes de pagar, confira a identidade do recebedor e as condições confirmadas na conversa. Pedágios, estacionamento, espera e adicionais devem ser informados no orçamento quando aplicáveis.',
        'Regras de alteração, cancelamento, reembolso e arrependimento estão na Política de Cancelamento e Reembolso acessível neste site, além das condições específicas informadas antes do aceite. O direito legal de arrependimento em contratações fora do estabelecimento, inclusive o prazo de sete dias do art. 49 do CDC quando aplicável, não será excluído por cláusula de orçamento. Nenhuma disposição limita direitos irrenunciáveis do consumidor.'
      ]],
      ['6. Uso do site e links externos', [
        'Use o site de modo lícito, sem comprometer sua operação. O atendimento é de transporte de passageiros; não há prestação de serviços médicos, nem promessa de acessibilidade do veículo não confirmada previamente. Links para WhatsApp, Google Maps, Instagram, TikTok e pagamento externo levam a serviços de terceiros sujeitos às respectivas políticas. A MotoristaOPS não exclui a responsabilidade legal pela prestação de serviços próprios ou por atos de parceiros quando aplicável.',
        'O site pode ser atualizado e conter imagens ilustrativas de categorias de veículos. O fornecedor deve confirmar as características efetivas, o condutor, as condições e a disponibilidade do serviço contratado. Não são prometidos resultados garantidos, disponibilidade irrestrita ou desempenho específico de veículos. Esta informação não substitui a proposta comercial aceita.'
      ]],
      ['7. Privacidade e contato', [
        'A Política de Privacidade descreve os dados tratados ao solicitar orçamento, usar WhatsApp e realizar pagamentos externos. A Política de Cancelamento e Reembolso explica os procedimentos de alterações e devoluções.',
        `Para atendimento, dúvidas, cancelamentos e solicitações, entre em contato pelo WhatsApp ${legalIdentity.contactPhone}. O fornecedor é ${legalIdentity.registeredName}, CNPJ ${legalIdentity.cnpj}, com endereço cadastral ${legalIdentity.address}.`
      ]]
    ]
  }

  ,{
    path: '/cancelamento/',
    heading: 'Cancelamento e Reembolso',
    title: 'Cancelamento e Reembolso | MotoristaOPS',
    description: 'Orientações para cancelar serviços, solicitar reembolso e exercer o direito de arrependimento em contratos com a MotoristaOPS.',
    sections: [
      ['1. Como solicitar', [
        'Para solicitar alteração, cancelamento, esclarecimento sobre cobrança ou reembolso, utilize o WhatsApp (11) 98832-9725, o mesmo canal de orçamento e contratação. Informe os dados suficientes para localizar a proposta ou serviço; não envie documentos pessoais desnecessários.',
        'O pedido será analisado conforme as informações da proposta aceita, o estágio da prestação do serviço e os direitos garantidos pela legislação brasileira. A solicitação de cancelamento não exige cadastro nem conta no site.'
      ]],
      ['2. Antes da confirmação do orçamento', [
        'Preencher o formulário, preparar uma mensagem ou abrir a conversa não cria uma reserva, não gera cobrança e não exige pedido formal de cancelamento. Uma cotação ainda não aceita pode simplesmente ser encerrada.'
      ]],
      ['3. Direito de arrependimento', [
        'Em contratações de consumo concluídas fora do estabelecimento comercial, especialmente pela internet ou por telefone, o art. 49 do Código de Defesa do Consumidor prevê o direito de desistir no prazo de sete dias, contado da assinatura do contrato ou do recebimento do serviço, conforme a legislação aplicável.',
        'Quando o direito de arrependimento for aplicável e regularmente exercido, os valores pagos devem ser devolvidos conforme a lei. Situações de serviço solicitado para execução imediata ou já realizado precisam de análise das circunstâncias concretas e da legislação; esta política não anuncia renúncia automática ao direito do consumidor.'
      ]],
      ['4. Alterações, ausência no embarque e cancelamento fora do arrependimento', [
        'Mudanças de data, horário, passageiros, percurso e veículo devem ser solicitadas o quanto antes. Disponibilidade, possíveis ajustes de preço e eventual custo por serviços comprovadamente iniciados devem ser informados e avaliados antes do aceite de condições alteradas.',
        'Não estabelecemos, por esta página, multas, percentuais ou prazos fictícios de cancelamento. Qualquer condição específica de sinal, espera ou ausência no embarque deve ser previamente comunicada na proposta, observada sua validade jurídica e os direitos do consumidor.'
      ]],
      ['5. Pagamento e restituição', [
        'Se houver pagamento, a operação verificará a transação e a modalidade utilizada, inclusive Link de Pagamento Mercado Pago quando empregado. O estorno deve seguir a legislação aplicável e os procedimentos técnicos do meio de pagamento; o prazo efetivo de disponibilização pode depender do banco ou da administradora.',
        'Não realizamos cobrança recorrente, renovação automática ou assinatura por meio deste site.'
      ]],
      ['6. Serviços prestados por parceiros', [
        'Quando um veículo de parceiro estiver envolvido, as condições e a identificação da operação deverão ser esclarecidas previamente ao cliente. A existência de parceiros não afasta responsabilidades legais aplicáveis à MotoristaOPS ou ao prestador que efetivamente contratar o serviço.'
      ]],
      ['7. Atendimento e resolução', [
        'Para obter cópia do que foi combinado ou contestar uma cobrança, entre em contato pelo WhatsApp (11) 98832-9725. A equipe analisará a proposta, a confirmação, comprovantes e registros disponíveis, respeitando a legislação de consumo e de proteção de dados.',
        'Estas orientações não restringem o acesso a órgãos de defesa do consumidor ou ao Poder Judiciário. A aplicação a modalidades específicas de transporte deve ser revisada por profissional jurídico.'
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
    '<script src="/servicos/track.js?v=20261121" defer></script><script src="/assets/site-preferences.js" defer></script>',
    '</head><body><div class="legal-page">',
    '<header class="legal-header"><div class="legal-wrap legal-nav">',
    '<a href="/" aria-label="Voltar ao início"><img src="/assets/logo-horizontal.webp" width="908" height="246" class="legal-logo" alt="MotoristaOPS por Henrico Amaral"></a>',
    '<nav class="legal-links" aria-label="Navegação"><a href="/">Início</a><a href="/privacidade/">Privacidade</a><a href="/termos-de-uso/">Termos de Uso</a><a href="/cancelamento/">Cancelamento</a></nav>',
    '</div></header>',
    '<main class="legal-main" id="conteudo"><div class="legal-wrap">',
    '<p class="legal-kicker">MotoristaOPS · São Paulo e região</p>',
    '<h1>'+esc(page.heading)+'</h1><p class="legal-updated">Última atualização: 23 de novembro de 2026 · Minuta operacional sujeita a revisão jurídica.</p>',
    content,
    '</div></main>',
    '<footer class="legal-footer"><div class="legal-wrap">',
    '<p>'+esc(legalIdentity.registeredName)+' · CNPJ '+esc(legalIdentity.cnpj)+'</p><p>Endereço cadastral: '+esc(legalIdentity.address)+'</p>',
    '<p>Contato: <a href="https://wa.me/5511988329725" target="_blank" rel="noopener noreferrer">WhatsApp (11) 98832-9725</a> · <a href="/privacidade/">Política de Privacidade</a> · <a href="/termos-de-uso/">Termos de Uso</a> · <a href="/cancelamento/">Cancelamento e Reembolso</a></p>',
    '<button class="mops-cookie-settings-trigger" type="button" data-cookie-settings>Preferências de cookies</button>',
    '</div></footer></div></body></html>'
  ].join('\n');
}
