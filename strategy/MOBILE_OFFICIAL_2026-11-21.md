# MotoristaOPS — página inicial mobile oficial V4
Data: 2026-11-21 (America/Sao_Paulo)
Estado de desenvolvimento: fonte e testes em PR, publicação sujeita aos gates de release.

## Decisão do operador
A Bio V3 passa a ser a home mobile de `www.motoristaops.com.br`. Manter cabeçalho, hero, acessos WhatsApp/formulário, Instagram e TikTok; incluir serviços e categorias da frota; orçamento por último. Remover apenas o link autorreferente `Visitar o site oficial` e o separador sob os links sociais. Nenhum botão fixo.

## Arquitetura, SEO e operação
- Mesma URL canônica e esquema do site; rewrite interno de `/` para `/mobile/index.html` em UA smartphone, `Vary: User-Agent`.
- Desktop inalterado. Inglês e espanhol preservados com o layout responsivo traduzido existente, sem forçar português em URLs `/en/` e `/es/`.
- Imagens provenientes da V3 fornecida; logo horizontal oficial do repositório. Fotos da frota explicitamente ilustrativas, categorias disponíveis somente sob consulta.
- Fontes Instrument Sans locais, assets WebP, manifest SHA-256, verificação pública de HTML para UA desktop/mobile e conteúdo.
- Contato ao WhatsApp `5511988329725`; formulário apenas prepara e permite revisar mensagem, sem envio automático. Clique não equivale a orçamento recebido ou reserva.
- A versão mobile contém menos conteúdo que o desktop: risco de SEO mobile-first a acompanhar por Search Console; páginas de serviço adicionais permanecem no sitemap.

## QA e release
Validar em 320, 360, 390, 430 e 768 px; sem overflow, logo/cabeçalho, imagens e textos legíveis; form valida obrigatório, data min, prévia e invalidação após edição; checagem de browser e GitHub Actions; publicação somente após verificação pública e QA de identidade.
