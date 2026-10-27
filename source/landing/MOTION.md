# Motion da landing

Aprovado pelo operador em 26/10/2026. Escopo SURFACE, sem alterar identidade, imagens ou conteúdo comercial.

| Ponto | Comportamento | Duração |
| --- | --- | --- |
| Hero | Três linhas, deslocamento de 12 px e opacidade 0,65→1; foto permanece visível | 340 ms por linha, intervalos de 40 ms; total 420 ms |
| Serviços | Entrada única de 10 px; diferença por vizinho reiniciada a cada linha da grade | 280 ms + 0/40/80/120 ms conforme colunas |
| Processo | Linha champagne acompanha grade responsiva; números em sequência; não indica reserva em andamento | 420 ms; números 180 ms com diferença de 60 ms |
| Galeria | Foto anterior fica até a próxima carregar; sobreposição; cliques novos substituem a intenção anterior | 200 ms; saída do ampliador 130 ms |
| FAQ | Details/summary nativos; expansão/recolhimento interrompível; estado final limpa altura temporária | 200 ms por clique; teclado imediato |
| Formulário | Resumo aparece por opacidade e deslocamento de 6 px; foco no título sem esperar animação | 180 ms |
| WhatsApp | Entrada/recolhimento por opacidade e 8 px; oculto ao alcançar contato; foco existente preservado até sair do controle | Entrada 160 ms; saída 120 ms |

Curva: `cubic-bezier(.22,1,.36,1)`. Sem loops, pulsação contínua, cursor magnético, controle de scroll ou transformação da fotografia.

## Implementação e acessibilidade

`motion.mjs` centraliza tempos e cancela animações ativas quando a preferência de redução é ligada. `Motion.jsx` controla estados e observadores; `motion.css` mantém geometria e feedback CSS. IntersectionObserver é desconectado após as entradas. O processo usa ResizeObserver para acompanhar a grade existente. Não há biblioteca adicional ou conteúdo essencial oculto por CSS aguardando JavaScript.

O servidor continua entregando conteúdo completo, FAQ nativa e links. Foco e aria-hidden/inert permanecem coerentes com o estado visível. O link flutuante não desaparece enquanto estiver focado. Galeria aguarda imagem carregada antes de trocar; eventos antigos são descartados; Escape remove o modal imediatamente. Não alegar FPS, métricas de conversão ou melhoria em Lighthouse sem medição específica.

## QA executada antes da publicação

- Build cliente + HTML pré-renderizado e 11 testes: PASS.
- Testes automatizados de redução de movimento inicial e ativada durante execução, cancelamento e fallback sem Web Animations: PASS. A preferência do sistema operacional do navegador não foi alterada.
- Navegador de validação: FAQ abriu/fechou, inclusive cliques consecutivos e Enter; galeria alternou miniaturas, navegou por teclado e restaurou foco após Escape; conteúdo de fundo saiu de inert.
- Formulário vazio apresentou erro; preparação válida exibiu resumo e foco no título, sem enviar mensagem. Link flutuante ficou invisível/inert na seção final.
- Desktop de 1363 px e iframe de 390 px, sem overflow horizontal medido; linha do processo acompanha quatro e duas colunas, respectivamente.
- A extensão do navegador local não alcançou o endereço interno de preview; a QA prévia foi realizada no navegador de validação.

As medições de duração acima são parâmetros implementados, não benchmark de desempenho do dispositivo. Verificação pública posterior é registrada no workflow de deploy.
