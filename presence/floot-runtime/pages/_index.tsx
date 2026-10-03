import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";
import { useAuth } from "../helpers/useAuth";
import { PRESENCE_ORDER_KEY, useCreatePresenceOrder, usePresenceOrder } from "../helpers/usePresenceOrder";
import { usePresenceReadiness } from "../helpers/usePresenceReadiness";
import { postCreatePresencePayment } from "../endpoints/presence/payment/create_POST.schema";
import { postConfirmPresence } from "../endpoints/presence/confirm_POST.schema";
import { postPublishPresence } from "../endpoints/presence/publish_POST.schema";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./_index.module.css";

const money = (cents: number | null, currency = "BRL") => {
  if (!cents) return "não definido";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(cents / 100);
};

export default function HomePage() {
  const { authState, logout } = useAuth();
  const orderQuery = usePresenceOrder();
  const readiness = usePresenceReadiness();
  const createOrder = useCreatePresenceOrder();
  const queryClient = useQueryClient();
  const [actionBusy, setActionBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const order = orderQuery.data?.order ?? null;
  const product = orderQuery.data?.catalog?.[0] ?? null;
  const customerName = authState.type === "authenticated" ? authState.user.displayName : "Cliente";

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: PRESENCE_ORDER_KEY });
  };

  const runAction = async (fn: () => Promise<void>) => {
    setActionError(null);
    setActionBusy(true);
    try {
      await fn();
      await refresh();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "A operação falhou.");
    } finally {
      setActionBusy(false);
    }
  };

  const primaryAction = () => {
    if (orderQuery.isPending) {
      return <Button disabled><Spinner size="sm" /> Carregando</Button>;
    }
    if (!order) {
      const ready = product?.status === "active" && Boolean(product.priceCents);
      return (
        <Button
          disabled={!ready || createOrder.isPending}
          onClick={() => product && runAction(async () => {
            await createOrder.mutateAsync({ sku: product.sku, version: product.version });
          })}
        >
          {ready ? "Iniciar meu pedido" : "Venda ainda não liberada"}
        </Button>
      );
    }
    if (order.state === "PRODUCT_SELECTED") {
      return <Button disabled={actionBusy} onClick={() => runAction(async () => {
        const payment = await postCreatePresencePayment({ orderId: order.id });
        window.location.assign(payment.checkoutUrl);
      })}>Ir para pagamento</Button>;
    }
    if (order.state === "PAYMENT_PENDING") {
      return <Button disabled>Aguardando confirmação do pagamento</Button>;
    }
    if (order.state === "ONBOARDING") {
      return <Button asChild><Link to="/onboarding">Preencher meu cadastro</Link></Button>;
    }
    if (order.state === "DATA_VALID") {
      return <Button asChild><Link to="/preview">Revisar dados públicos</Link></Button>;
    }
    if (order.state === "CUSTOMER_CONFIRMED") {
      return <Button disabled={actionBusy} onClick={() => runAction(async () => {
        await postPublishPresence({ orderId: order.id });
      })}>Publicar minha página</Button>;
    }
    if (order.state === "SITE_PUBLISHED" && order.slug) {
      return <Button asChild><Link to={`/${order.slug}`}>Abrir minha página</Link></Button>;
    }
    return <Button disabled>{order.state}</Button>;
  };

  return (
    <>
      <Helmet>
        <title>MotoristaOPS Presença</title>
        <meta name="description" content="Painel operacional do MotoristaOPS Presença." />
      </Helmet>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div>
            <div className={styles.brand}>MotoristaOPS</div>
            <div className={styles.product}>Presença</div>
          </div>
          <nav className={styles.nav}>
            <a className={styles.active} href="#overview">Visão geral</a>
            <a href="#journey">Jornada</a>
            <a href="#dependencies">Dependências</a>
          </nav>
          <div className={styles.sidebarFoot}>
            <span>{customerName}</span>
            <button className={styles.logout} type="button" onClick={() => void logout()}>Sair</button>
          </div>
        </aside>

        <main className={styles.main}>
          <header className={styles.header}>
            <div>
              <div className={styles.eyebrow}>MotoristaOPS Presença</div>
              <h1>Sua presença, em uma jornada só.</h1>
              <p>Pagamento, cadastro, página pública, materiais e entrega são acompanhados pela mesma conta e pelo mesmo pedido.</p>
            </div>
            <Badge>{order ? order.state : "sem pedido"}</Badge>
          </header>

          <section id="overview" className={styles.metricGrid}>
            <article className={styles.metricCard}>
              <span>Pedido</span>
              <strong>{order ? `#${order.id}` : "—"}</strong>
              <small>{order?.state ?? "Nenhum pedido criado"}</small>
            </article>
            <article className={styles.metricCard}>
              <span>Produto</span>
              <strong>{order?.productSku ?? product?.name ?? "—"}</strong>
              <small>{order ? money(order.amountCents, order.currency) : product ? money(product.priceCents, product.currency) : "Catálogo indisponível"}</small>
            </article>
            <article className={styles.metricCard}>
              <span>Pagamento</span>
              <strong>{order?.paymentStatus ?? "—"}</strong>
              <small>{order?.state === "PAYMENT_PENDING" ? "Confirmação vem do webhook autenticado" : "Mercado Pago server-side"}</small>
            </article>
            <article className={styles.metricCard}>
              <span>Página</span>
              <strong>{order?.publicationStatus ?? "—"}</strong>
              <small>{order?.slug ? `motoristaops.com.br/${order.slug}` : "Slug ainda não reservado"}</small>
            </article>
          </section>

          <section id="journey" className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <div className={styles.eyebrow}>Próxima ação</div>
                <h2>{order ? "Continue de onde parou." : "Comece pelo produto."}</h2>
              </div>
              {primaryAction()}
            </div>
            {actionError && <div className={styles.actionError}>{actionError}</div>}
            <div className={styles.pipeline}>
              <div className={styles.pipelineRow}><span className={styles.index}>01</span><div><strong>Pagamento</strong><p>Order criada no backend e confirmada apenas por evidência server-side.</p></div><span className={order && ["PAYMENT_PENDING","ONBOARDING","DATA_VALID","CUSTOMER_CONFIRMED","SITE_PUBLISHED"].includes(order.state) ? styles.ok : styles.blocked}>{order?.paymentStatus ?? "pendente"}</span></div>
              <div className={styles.pipelineRow}><span className={styles.index}>02</span><div><strong>Cadastro</strong><p>Persistência transacional; personalização física e endereço privado ficam separados.</p></div><span className={order && ["DATA_VALID","CUSTOMER_CONFIRMED","SITE_PUBLISHED"].includes(order.state) ? styles.ok : styles.blocked}>{order?.state === "ONBOARDING" ? "liberado" : order?.state === "DATA_VALID" ? "validado" : "pendente"}</span></div>
              <div className={styles.pipelineRow}><span className={styles.index}>03</span><div><strong>Página pública</strong><p>Somente snapshot confirmado pode ser publicado em /slug.</p></div><span className={order?.publicationStatus === "published" ? styles.ok : styles.blocked}>{order?.publicationStatus ?? "pendente"}</span></div>
              <div className={styles.pipelineRow}><span className={styles.index}>04</span><div><strong>Entrega</strong><p>Rastreio será ativado após BOM, embalagem e Melhor Envio estarem completos.</p></div><span className={order?.shipmentStatus ? styles.ok : styles.blocked}>{order?.shipmentStatus ?? "bloqueado"}</span></div>
            </div>
          </section>

          <section id="dependencies" className={styles.twoCol}>
            <article className={styles.panel}>
              <div className={styles.eyebrow}>Catálogo</div>
              <h2>{product?.status ?? "indisponível"} · {product ? money(product.priceCents, product.currency) : "—"}</h2>
              <p>O pedido só pode nascer quando o produto estiver ativo e o preço estiver confirmado. O banco atual mantém o produto em draft e preço nulo.</p>
            </article>
            <article className={styles.panel}>
              <div className={styles.eyebrow}>Dependências externas</div>
              <h2>{readiness.data ? `${readiness.data.blockers} bloqueador(es)` : "calculando…"}</h2>
              <p>{readiness.data?.readyForFirstCustomer ? "Primeiro cliente liberado." : "O sistema permanece fail-closed até todos os requisitos canônicos estarem completos."}</p>
              {readiness.data && (
                <div className={styles.readinessList}>
                  {readiness.data.items.map((item) => (
                    <div className={styles.readinessItem} key={item.key}>
                      <span className={item.ready ? styles.readyDot : styles.blockedDot} />
                      <div><strong>{item.label}</strong><small>{item.detail}</small></div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </section>
        </main>
      </div>
    </>
  );
}