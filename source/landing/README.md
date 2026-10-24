# Landing pública MotoristaOPS

Fonte única da landing aprovada em 23/10/2026. Substitui integralmente a implementação anterior.

Node.js 22 ou posterior. Executar nesta pasta:

```sh
npm ci
npm run build
npm test
```

`dist/` é o pacote estático publicado na Hostinger. O build pré-renderiza o conteúdo completo em HTML e hidrata as interações no navegador. Não requer Node no servidor, banco de dados, chave de API ou endpoint de formulário. Instrument Sans normal/itálica é local; JS/CSS e fontes do build têm nomes com hash. O manifest público identifica e verifica cada arquivo publicado por SHA-256.

## Atendimento e privacidade

O formulário trata os dados no navegador. “Preparar mensagem” valida e mostra o resumo; “Abrir conversa no WhatsApp” abre `wa.me/5511988329725` com texto codificado, acentos e quebras de linha. O visitante precisa enviar a mensagem no WhatsApp. Não há envio automático, armazenamento no servidor ou reserva automática. Alterar um campo invalida o resumo anterior. Não testar enviando mensagens ao atendimento.

## Fontes e mídia

- Logo horizontal: recorte determinístico do arquivo oficial fornecido pelo operador.
- `henrico-original.webp`: retrato original fornecido (`perfil-normal(6).png`), apenas rosto/tronco na seção pessoal, conforme correção explícita.
- `hero-v4-3.webp`: composição aprovada, editada com as referências de rosto, corpo e outfit fornecidas; não é fotografia documental nem garantia de identidade biométrica exata.
- `omoda-front/rear/light.webp`: recortes da composição conceitual aprovada.
- Fotos de contexto dos serviços e cidade: geradas e identificadas como ilustrativas na página.
- Equipamentos Luxury: ficha oficial https://cms.omodajaecoo.com.br/manual/pdf/FichaTecnicaSimplificada_Omoda5.pdf . PPF/película descritos como preparação prevista.
- Social card: JPEG aprovado preservado byte a byte da página pública anterior, SHA-256 `d92ed571db561a3af3fdf027b9d66b9c6452bb3d3a4fccbc87b4450747661c82`. Favicon oficial preservado.
- Avaliações atribuídas a Thaís Barbosa e Fernanda Josias: transcritas da página pública anterior, com link para o Google; sem nota agregada inventada.
- Lucide React: ícones funcionais de pacote fixado em lockfile; símbolos de plataformas são arquivos SVG locais.

## Publicação

Workflow único: `.github/workflows/deploy-landing-hostinger.yml`. Após build e gates, envia assets, substitui o HTML e remove os assets obsoletos e diretórios antigos `landing-v3` e `hero`. Nunca executar mirror com exclusão na raiz pública. Dashboard e Brand System não são incluídos no alvo de exclusão. Não criar backup ou ambiente alternativo da landing. Os secrets existentes são usados sem expor valores.

A publicação só está concluída após `scripts/verify-public-landing.sh` confirmar os arquivos públicos por hash, indexação/canonical, remoção dos assets antigos, redirecionamento HTTPS/www e marcadores operacionais do dashboard.
