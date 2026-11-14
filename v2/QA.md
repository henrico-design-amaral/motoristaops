# QA de publicação — MotoristaOPS /v2
Data: 2026-11-14 (America/Sao_Paulo)

**Status de publicação:** CONFIRMADO — HTTP 200 para `https://www.motoristaops.com.br/v2/`, conteúdo estático da V2 retornado com `data-screen="8"`, SEO robots `noindex,nofollow,noarchive`. Verificação externa do conteúdo via Firecrawl (live fetch, maxAge 0). GitHub contém commit `813444d389748818e412e3955d649feb4aa39e5c` para `v2/index.html` e workflow isolado `.github/workflows/deploy-v2-hostinger.yml`.

**Proteção da raiz:** CONFIRMADO por GET independente à homepage `https://www.motoristaops.com.br/`, HTTP 200, título `Motorista Particular em São Paulo | MotoristaOPS` e marcador `motoristaops-release=landing-2026-11-06-header-r02`, sem alterações decorrentes do fluxo /v2.

**Verificação estrutural:** PASS em análise estática — oito seções distintas `data-screen="1..8"` com IDs hero, serviços, veículos, como-funciona, avaliações, FAQ, orçamento e footer; cinco serviços, cinco categorias, seis perguntas; configurações PT/EN/ES; assinatura horizontal compacta aprovada 03; camada CSS `.fold { height: 100svh; overflow: hidden; scroll-snap-align:start; }`; mobile prevê carrosséis horizontais. JavaScript `node --check` aprovado.

**Verificação de fatos:** imagens de categorias ilustrativas (não comprovam frota, capacidade ou modelo); lotação e malas sob confirmação; depoimentos exibidos como relatos já presentes no site atual, não substituídos por pessoas sintéticas; formulário não realiza envio automático nem confirma reserva; hero não apresenta o motorista fictício da imagem referência.

**PENDÊNCIAS:** comparação de pixels frente ao mockup e inspeção visual em 1440x900, 390x844 e viewports curtos; impacto de `overflow:hidden` em acessibilidade/text-size aumentado; carregamento efetivo de todas as imagens, Instrument Sans e teste real de interação no browser; resultados de console. Navegador local retorna `ERR_BLOCKED_BY_ADMINISTRATOR` e sessão remota de interação excedeu o limite. A captura de tela remota foi gerada mas não pôde ser revisada com confiabilidade aqui. Portanto design QA final = BLOCKED, não APPROVED. Não declarar fidelidade perfeita ou pronto para trocar a raiz.

**Decisões respeitadas:** imagem conceitual sem pessoa sintética; exatamente uma seção por dobra em CSS; FAQ e orçamento independentes; conteúdo de teste em /v2 sem mudança no site principal.
