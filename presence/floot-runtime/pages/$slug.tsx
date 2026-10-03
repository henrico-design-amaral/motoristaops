import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";
import { usePublicProfile } from "../helpers/usePublicProfile";
import styles from "./$slug.module.css";

export default function PublicDriverPage() {
  const { slug } = useParams<{ slug: string }>();
  const profile = usePublicProfile(slug);

  if (profile.isPending) {
    return <main className={styles.state}><Spinner /><span>Carregando perfil…</span></main>;
  }

  if (profile.isError || !profile.data) {
    return (
      <main className={styles.state}>
        <div className={styles.brand}>MotoristaOPS</div>
        <h1>Perfil não disponível.</h1>
        <p>Este endereço ainda não foi publicado ou não existe.</p>
      </main>
    );
  }

  const data = profile.data.content;
  const whatsappHref = `https://wa.me/${data.profile.whatsapp.replace(/\D/g, "")}`;

  return (
    <>
      <Helmet>
        <title>{data.profile.displayName} | MotoristaOPS</title>
        <meta name="description" content={data.profile.bio || `Perfil profissional de ${data.profile.displayName}`} />
      </Helmet>
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.brand}>MotoristaOPS</div>
          <span>Presença profissional</span>
        </header>

        <section className={styles.hero}>
          <div>
            <div className={styles.eyebrow}>Motorista profissional</div>
            <h1>{data.profile.displayName}</h1>
            {data.profile.bio && <p>{data.profile.bio}</p>}
            <div className={styles.actions}>
              <Button asChild><a href={whatsappHref} rel="noreferrer">Falar no WhatsApp</a></Button>
            </div>
          </div>
          <aside className={styles.vehicle}>
            <span>Veículo</span>
            <strong>{data.vehicle.brand} {data.vehicle.model}</strong>
            <small>{data.vehicle.year} · {data.vehicle.color}{data.vehicle.capacity ? ` · até ${data.vehicle.capacity} passageiros` : ""}</small>
          </aside>
        </section>

        <section className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.eyebrow}>Serviços</div>
            <ul>{data.services.map((service) => <li key={service}>{service}</li>)}</ul>
          </article>
          <article className={styles.card}>
            <div className={styles.eyebrow}>Áreas atendidas</div>
            <ul>{data.serviceAreas.map((area) => <li key={area}>{area}</li>)}</ul>
          </article>
        </section>

        <footer className={styles.footer}>
          <span>Perfil publicado pelo MotoristaOPS Presença</span>
          <span>v{profile.data.publishedVersion} · {profile.data.snapshotHash.slice(0, 10)}</span>
        </footer>
      </main>
    </>
  );
}