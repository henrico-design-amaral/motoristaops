# MotoristaOPS V2 — 09 PRODUÇÃO — STATUS

Status: ACTIVE

## Work session ativa
`WS-011 — Landing Hero + Header`

## Implementado localmente
HTML semântico da primeira dobra; header + Hero responsivos; retrato real como âncora; slogan oficial; CTA primário WhatsApp ligado ao endpoint real classificado como `KEEP`; Instagram permanece sem destino de produção até verificação; atmosfera mínima; skip link/foco/reduced-motion; variante horizontal compacta V12 no header como derivado de protótipo; assets reais/oficiais normalizados localmente.

## QA
### Conteúdo/fonte
PASS parcial: nenhuma claim comercial inventada; categoria, nome e slogan alinhados às fontes aprovadas.

### Identidade
PASS parcial: header corrigido para a variante 03 do V12, indicada para layouts estreitos/topo de landing page. Release deve preferir o master isolado quando disponível.

### Técnico estático
PASS: `pt-BR`; H1 único; meta description; assets/dimensões locais; contrastes principais AA; endpoint WhatsApp presente apenas nos CTAs previstos; atributos de segurança para target externo; workspace local limpo.

## Links de produção
WhatsApp — `VERIFIED / KEEP`: o mesmo endpoint aparece em uma implementação recente alinhada ao V12 e é corroborado por implementação anterior do projeto. O CTA real foi ligado localmente.

Instagram — `UNVERIFIED`: o handle legado foi rejeitado para a V2 e não existe ainda fonte canônica suficiente para o perfil MotoristaOPS. Nenhum link legado foi reativado.

## Bloqueios
### Visual QA — BLOCKED BY RUNTIME
Chromium administrado bloqueia file/localhost; Playwright sem engine e runtime sem rede para baixá-la; não há projeto MotoristaOPS no Vercel conectado. Hero não está baseline-frozen.

### Binários GitHub — PENDING
Governança/specs estão sincronizadas em `v2/project-foundation`, mas binários da WS-011 permanecem locais: runtime Git não resolve github.com e Contents API disponível não oferece upload binário simples. Não publicar HTML no GitHub sem assets.

## Progressão
Não avançar para Stage 10 enquanto WS-011 não tiver Visual QA desktop/mobile e anchors aprovados congelados.
