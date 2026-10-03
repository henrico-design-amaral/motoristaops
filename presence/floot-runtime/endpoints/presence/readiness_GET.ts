import superjson from "superjson";
import { db } from "../../helpers/db";
import { getExternalSecret } from "../../helpers/externalResources";
import type { OutputType, ReadinessItem } from "./readiness_GET.schema";

export async function handle() {
  try {
    const [product, shippingConfig, packageSpec, printSpecs] = await Promise.all([
      db.selectFrom("presenceProducts")
        .select(["status", "priceCents", "currency"])
        .where("sku", "=", "PRESENCE_COMPLETE")
        .where("version", "=", 1)
        .executeTakeFirst(),
      db.selectFrom("presenceShippingConfig").selectAll().where("id", "=", 1).executeTakeFirst(),
      db.selectFrom("presencePackageSpecs")
        .selectAll()
        .where("productSku", "=", "PRESENCE_COMPLETE")
        .where("productVersion", "=", 1)
        .executeTakeFirst(),
      db.selectFrom("presencePrintSpecs")
        .select([
          "itemCode", "supplier", "productName", "sourceUrl", "verifiedAt",
          "finishedWidthMm", "finishedHeightMm", "bleedMm", "safeAreaMm",
          "minimumDpi", "colorProfile", "outputFormat", "finish"
        ])
        .where("itemCode", "in", ["business_card", "identification_plate"])
        .execute(),
    ]);

    const paymentConnected = Boolean(
      getExternalSecret("MERCADO_PAGO_ACCESS_TOKEN") &&
      getExternalSecret("MERCADO_PAGO_WEBHOOK_SECRET")
    );
    const shippingConnected = Boolean(
      getExternalSecret("MELHOR_ENVIO_ACCESS_TOKEN") &&
      getExternalSecret("MELHOR_ENVIO_WEBHOOK_SECRET")
    );

    const printReady = printSpecs.length === 2 && printSpecs.every((item) =>
      Boolean(
        item.supplier &&
        item.productName &&
        item.sourceUrl &&
        item.verifiedAt &&
        item.finishedWidthMm &&
        item.finishedHeightMm &&
        item.bleedMm != null &&
        item.safeAreaMm != null &&
        item.minimumDpi &&
        item.colorProfile &&
        item.outputFormat &&
        item.finish
      )
    );

    const packageReady = Boolean(
      packageSpec?.verifiedAt &&
      packageSpec.widthCm &&
      packageSpec.heightCm &&
      packageSpec.lengthCm &&
      packageSpec.weightKg
    );

    const originReady = Boolean(
      shippingConfig?.verifiedAt &&
      shippingConfig.originPostalCode &&
      shippingConfig.originName &&
      shippingConfig.originDocument &&
      shippingConfig.originPhone &&
      shippingConfig.originEmail &&
      shippingConfig.userAgent
    );

    const items: ReadinessItem[] = [
      {
        key: "catalog",
        label: "Produto e preço",
        ready: Boolean(product?.status === "active" && product.priceCents && product.priceCents > 0),
        detail: product?.status === "active" && product.priceCents
          ? `Ativo por ${product.priceCents} centavos ${product.currency}.`
          : "PRESENCE_COMPLETE v1 ainda está draft e/ou sem preço canônico.",
      },
      {
        key: "auth",
        label: "Auth e PostgreSQL",
        ready: true,
        detail: "Floot Postgres + JWT + Google OAuth provisionados.",
      },
      {
        key: "payment",
        label: "Mercado Pago",
        ready: paymentConnected,
        detail: paymentConnected ? "Credenciais server-side conectadas." : "Access token/webhook secret pendentes.",
      },
      {
        key: "print",
        label: "Printi",
        ready: printReady,
        detail: printReady ? "Cartão e placa com specs verificadas." : "Produto/gabarito oficial atual de cartão e placa ainda não registrados.",
      },
      {
        key: "shipping-package",
        label: "Embalagem",
        ready: packageReady,
        detail: packageReady ? "Peso e dimensões verificados." : "Peso/dimensões do pacote físico ainda não verificados.",
      },
      {
        key: "shipping-origin",
        label: "Origem logística",
        ready: originReady,
        detail: originReady ? "Remetente verificado." : "Dados verificados do remetente/origem ainda não registrados.",
      },
      {
        key: "shipping-credentials",
        label: "Melhor Envio",
        ready: shippingConnected,
        detail: shippingConnected ? "Credenciais sandbox conectadas." : "Token/webhook secret sandbox pendentes.",
      },
      {
        key: "digital-flow",
        label: "Fluxo digital",
        ready: true,
        detail: "Pedido, onboarding atômico, preview, confirmação e publicação por slug implementados.",
      },
    ];

    const blockers = items.filter((item) => !item.ready).length;
    const output: OutputType = {
      readyForFirstCustomer: blockers === 0,
      blockers,
      items,
    };
    return new Response(superjson.stringify(output), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao calcular prontidão";
    return new Response(superjson.stringify({ error: message }), { status: 500 });
  }
}