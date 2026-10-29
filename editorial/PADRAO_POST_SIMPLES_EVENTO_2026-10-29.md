# MotoristaOPS — Padrão oficial de composição: post simples com evento protagonista

**Status da decisão editorial:** APPROVED / PROJECT  
**Aprovação explícita do operador:** 2026-10-29 (conversa MotoristaOPS, lote de BTS, GP de São Paulo, FENATRAN e E-MOB em versões clara/escura)  
**Formato canônico:** `single_static` — não cria um quarto formato  
**Autoridade:** `SOCIAL_EDITORIAL.md`, Brand Book V2, `DESIGN.md`, `VISUAL_LOCK.json`, `design/tokens.json` e `editorial/EDITORIAL_FORMAT_LOCK.json`  
**Escopo:** posts simples de eventos, conteúdo contextual e serviço de mobilidade. Aplica-se ao Instagram e, mediante adaptação nativa controlada, ao TikTok.

## Decisão aprovada

O operador aprovou expressamente a direção de composição do último lote de 8 imagens: discreta, limpa, legível, reconhecível e facilmente reproduzível. Esta composição passa a ser **um dos padrões oficiais** de post único do sistema atual. Ela **não substitui** os demais padrões aprovados, o modo claro/escuro ou a arquitetura de carrossel.

Não se aprova uma nova identidade de marca nem se concede liberdade para mudar formatos, logo, fonte, paleta, veículo ou CTA. A aprovação é do **arranjo editorial contextual**, a ser reexecutado com ativos e textos oficiais.

## Gramática reutilizável

1. **Contexto primeiro:** a imagem principal é a ocasião real (show, corrida, feira, destino ou serviço). A cidade só assume protagonismo quando o tema for urbano ou não houver fotografia de evento autorizada e adequada.
2. **Uma mensagem forte:** título do evento/assunto como elemento de leitura dominante, acompanhado de um enquadramento editorial curto, sem poluição visual.
3. **Fatos úteis:** data e local quando realmente pertinentes, verificados nas fontes oficiais. Evitar horários, públicos, estatísticas e promessas sem confirmação.
4. **Fotografia protagonista:** grande área contextual, reconhecível e sem substitutos fictícios; proteger a leitura do texto por enquadramento e contraste, sem painéis excessivos.
5. **Serviço contextual:** orientação breve sobre ida/volta, transfer, acompanhamento ou disponibilidade, somente se pertinente ao evento.
6. **CTA de encerramento:** uma ação clara, em texto editorial legível. Aplicar a trava atual: **não usar ícone do WhatsApp sem telefone imediatamente associado; não tratar copy de CTA como botão/cápsula sem autorização específica**.
7. **Assinatura discreta:** aplicar **uma** versão exata e oficial da assinatura social, preferencialmente brasão + MotoristaOPS, no fechamento. Não duplicar logo na abertura e no rodapé de post único por mera repetição do exemplo gerado.
8. **Respiro:** margens generosas, contraste mobile, hierarquia estável e baixa densidade; sem cartões repetidos, molduras obrigatórias ou lista de ícones sem função.

## Modos contextuais

- **Escuro:** eventos noturnos, shows, festas e ocasiões cuja fotografia/ambiente peça leitura de baixa luminosidade.
- **Claro:** eventos diurnos, feiras, mobilidade cotidiana, serviço de dia e fotos com boa iluminação.
- Ambos são variações do **mesmo sistema**, nunca conjuntos de tokens novos.

## Slots e restrições de reprodução

| Elemento | Tratamento |
| --- | --- |
| Contexto, tema, título, data e local | `CONTENT_SLOT` — conteúdo verificado |
| Foto do evento/cidade | `CONTENT_SLOT` — imagem real autorizada preferencial; atmosfera ilustrativa somente quando não representar falsamente fato/evento |
| Recorte e balanço texto/imagem | `BOUNDED` — adaptar ao contexto sem alterar a gramática |
| Claro/escuro | `BOUNDED` — somente tokens oficiais e cores naturais da foto |
| Logo/assinatura | `LOCKED` — arquivo oficial exato, nunca gerado ou redesenhado |
| Tipografia | `LOCKED` — Instrument Sans exclusiva |
| Paleta | `LOCKED` — valores exatos do Brand Book V2 |
| Veículo operacional quando mostrado | `LOCKED` — Omoda 5 Luxury **cinza**, foto real aprovada; nunca gerar veículo por IA |
| Adaptação Instagram/TikTok | `FORMAT_TRANSFORM` — reflow e áreas seguras, sem introduzir formato não permitido |

## Referência de aprovação e limites

Referência humana: imagens de BTS, GP de São Paulo, FENATRAN e E-MOB nas versões clara e escura, apresentadas e aprovadas pelo operador na conversa MotoristaOPS em **2026-10-29**.

As imagens geradas no chat são **referência aprovada de direção/estrutura**, não prova de que seus pixels de logotipo, tipografia, CTA, placas, cartazes de feira ou locais sejam ativos oficiais. O arquivo binário exato desse lote **não está anexado a este registro no repositório**; não declarar que existe master editável ou raster arquivado aqui.

Em novas reproduções:
- o motor permitido é GPT Images no ChatGPT para as camadas liberadas, conforme `SOCIAL_EDITORIAL.md` §19;
- a identidade final e a tipografia devem usar **assets oficiais**, sem regeneração de marcas;
- não usar o carro apenas para preencher composição, nem o HB20 histórico, nem Omoda inventado;
- conferir a fotografia e a fidelidade da localização/evento;
- aplicar o gate de `editorial/EDITORIAL_FORMAT_LOCK.json` e `scripts/validate_social_editorial.py`;
- inspecionar cada render individual em escala de celular.

**Situação de produção:** padrão editorial aprovado; cada arquivo final segue sujeito a QA de marca, conteúdo, evento, direitos de mídia e liberação para publicar. A aprovação deste padrão **não autoriza publicar automaticamente** o lote anterior.
