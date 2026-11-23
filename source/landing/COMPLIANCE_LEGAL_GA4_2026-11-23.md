# MotoristaOPS — Conformidade documental e técnica

Data: 23/11/2026. Escopo: website publico www.motoristaops.com.br (desktop, mobile, EN/ES, paginas de servicos e documentos legais), sem alterar o dashboard.

## Autoridade e limite de uso do CCMEI

O usuario forneceu certificado CCMEI emitido em 13/09/2026. Nome empresarial: 69.099.839 CARLOS HENRICO AMARAL DE ASSIS; CNPJ: 69.099.839/0001-25; atividade principal CNAE 4923-0/02. A empresa consta ATIVA na emissao. CPF e arquivo PDF original nao foram publicados nem versionados. O certificado nao e evidencia de todas as licencas setoriais de frota ou parceiros, e a autenticidade cadastral atual depende de consulta oficial.

## Correcoes feitas no codigo (dependem de CI/deploy para status publico)

- Politica de Privacidade e Termos ampliados; nova pagina /cancelamento/ com direito de arrependimento do CDC art. 49, sem taxa, multa ou prazo de terceiro inventado. Todas as paginas legais informam que o texto e minuta sujeita a revisao juridica.

- Nome empresarial, CNPJ e endereco cadastral da empresa, alem dos canais de contato, passaram a ser publicos nas homepages desktop/mobile, servicos e documentos legais; nenhum CPF.

- Formulario desktop e mobile apresentam finalidade e links diretos a politicas. Mobile ja nao mantem link de WhatsApp com nome/rota em atributo href: abertura somente por botao com evento explicito; custom event de intencao de contato sem PII.

- Google Analytics 4 em Consent Mode v2 basico, com analytics_storage default denied, update granted exclusivamente apos consentimento e ad_storage, ad_user_data e ad_personalization negados. Recusa e revogacao conservadas; foco do botao Preferencias corrigido. Referencia da propriedade: G-ZQZ76XPPLP.

- Tipografia da pagina mobile acima de 12 CSS px e contraste visual da chamada e bordas de campos conforme WCAG AA. Estrela sem rotulo correto substituida por link publico sem avaliacoes nominais nao verificadas.

- Quatro imagens internas provenientes de concessionaria removidas de distribuicao, sem substituicao por imagem sintetica. Os itens originais aprovados permanecem.

## Pendente de acesso autenticado ou documentacao operacional

1. GA4: Administrador > Fluxos de dados > Web > Medicao otimizada. Verificar Cliques de saida e Interacoes com formulario; em Ocultar dados habilitar redacao de e-mails e parametro text e executar Teste da redacao. Conferir em Tag Assistant e DebugView apenas com dados ficticios: page_location, page_referrer, link_url, form_destination e eventos automaticos. Sem esse acesso nao ha prova do que ocorre dentro da propriedade.

2. WhatsApp Business e historico: identificar dispositivos vinculados, politicas de backup, eventual API/CRM, retencao, compartilhamentos, formacao da proposta e aceite comprovado de orcamentos.

3. Hostinger: conferir logs de acesso, backup, retencao, ambiente e possibilidade de exclusao. Landing nao tem endpoint proprio de cadastro/DB, mas os fornecedores podem conservar dados tecnicos.

4. Mercado Pago: verificar meio de pagamento efetivamente utilizado e politicas da conta, estornos, retencao e comprovantes. O site nao possui assinatura automatica.

5. Licencas e depoimentos: restaurar materiais de terceiros apenas com licencas ou URLs originais e evidencias verificadas. Origem documentada nao equivale a licenca.

6. Regras especificas da operacao: cotejar autorizações municipais, requisitos de veiculos proprios/parceiros, seguros e modalidades municipais/coletivas. CNAE de automovel com motorista nao autoriza automaticamente fretamento de vans.

7. Minutas legais: revisão humana de advogado antes de declarar aprovacao juridica integral.

## Procedimento sugerido para direitos dos titulares (nao automatizado)

Receber solicitacao pelo WhatsApp sobre privacidade; confirmar identidade minimamente; identificar sistemas onde a informacao possa existir; separar dados legalmente exigidos de dados apagaveis; corrigir, anonimizar ou excluir quando cabivel; avisar parceiros e operadores pertinentes e registrar evidencias de atendimento. Nao declarar exclusao em backups/terceiros sem comprovacao.

## Fontes primarias

- CDC: https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm

- Decreto 7.962/2013: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm

- LGPD: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm

- ANPD pequenos agentes: https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022

- Consent Mode: https://developers.google.com/tag-platform/security/guides/consent

- GA4 Data Redaction: https://support.google.com/analytics/answer/13544947

- WCAG 2.2: https://www.w3.org/TR/WCAG22/

Não confundir código versionado com deploy, teste de URL sem PII com certeza sobre o painel do GA4 ou aceite de orçamento com clique de WhatsApp.
