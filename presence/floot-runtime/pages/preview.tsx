import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";
import { postConfirmPresence } from "../endpoints/presence/confirm_POST.schema";
import { PRESENCE_ORDER_KEY } from "../helpers/usePresenceOrder";
import { usePresencePreview } from "../helpers/usePresencePreview";
import styles from "./preview.module.css";

export default function PresencePreviewPage() {
  const preview = usePresencePreview();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (preview.isPending) {
    return <main className={styles.state}><Spinner /><span>Preparando preview…</span></main>;
  }
  if (preview.isError || !preview.data) {
    return (
      <main className={styles.state}>
        <h1>Preview indisponível.</h1>
        <p>{preview.error instanceof Error ? preview.error.message : "Não foi possível preparar a página."}</p>
        <Button onClick={() => navigate("/")}>Voltar ao painel</Button>
      </main>
    );
  }

  const { content, orderId } = preview.data;
  const confirm = async () => {
    await postConfirmPresence({ orderId });
    await queryClient.invalidateQueries({ queryKey: PRESENCE_ORDER_KEY });
    navigate("/");
  };

  return (
    <>
      <Helmet><title>Preview | MotoristaOPS Presença</title></Helmet>
      <main className={styles.page}>
        <header className={styles.toolbar}>
          <div>
            <div className={styles.eyebrow}>Preview privado</div>
            <strong>Revise exatamente os dados que poderão ser publicados.</strong>
          </div>
          <div className={styles.actions}>
            <Button variant="outline" onClick={() => navigate("/onboarding")}>Corrigir cadastro</Button>
            <Button onClick={() => void confirm()}>Confirmar dados públicos</Button>
          </div>
        </header>

        <section className={styles.preview}>
          <div className={styles.topline}>
            <span className={styles.brand}>MotoristaOPS</span>
            <span>/{content.slug}</span>
          </div>
          <div className={styles.hero}>
            <div>
              <div className={styles.eyebrow}>Motorista profissional</div>
              <h1>{content.profile.displayName}</h1>
              {content.profile.bio && <p>{content.profile.bio}</p>}
            </div>
            <aside>
              <span>Veículo</span>
              <strong>{content.vehicle.brand} {content.vehicle.model}</strong>
              <small>{content.vehicle.year} · {content.vehicle.color}</small>
            </aside>
          </div>
          <div className={styles.grid}>
            <article>
              <div className={styles.eyebrow}>Serviços</div>
              <ul>{content.services.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <div className={styles.eyebrow}>Áreas atendidas</div>
              <ul>{content.serviceAreas.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <p className={styles.privacy}>Endereço de entrega, nome completo e telefone interno não fazem parte deste snapshot.</p>
      </main>
    </>
  );
}