# Templates de impressão

## Regra

Os materiais físicos seguem o mesmo princípio das landing pages:

**template aprovado + dados estruturados + assets aprovados = arquivo final**

Não usar imagem de referência como fonte para reconstrução generativa.

## Primeiros templates

- cartão de visita;
- placa de identificação;
- personalização do organizador, quando aplicável;
- etiqueta/identificação do kit, quando aplicável.

## Dimensões e sangria

Ainda não são canônicas.

Antes de fechar SVG/PDF mestre, é obrigatório selecionar o produto exato na Printi e registrar:

- tamanho final;
- sangria;
- área segura;
- perfil de cor;
- formato de arquivo;
- resolução mínima;
- acabamento;
- restrições do fornecedor.

Nenhum template deve ser marcado como `PRINT_READY` enquanto essas especificações não estiverem comprovadas.

## Campos variáveis

Os templates devem consumir diretamente os mesmos dados do perfil:

- `driver.display_name`;
- `driver.whatsapp`;
- `driver.page_url`;
- `driver.qr_code`;
- `driver.short_service_line`.

Redigitação manual é anti-pattern.
