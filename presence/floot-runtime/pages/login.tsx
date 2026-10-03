import { Helmet } from "react-helmet";
import { PasswordLoginForm } from "../components/PasswordLoginForm";
import { PasswordRegisterForm } from "../components/PasswordRegisterForm";
import { OAuthButtonGroup } from "../components/OAuthButtonGroup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Entrar | MotoristaOPS Presença</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className={styles.page}>
        <section className={styles.brandPanel}>
          <div>
            <div className={styles.brand}>MotoristaOPS</div>
            <span>Presença</span>
          </div>
          <div className={styles.copy}>
            <div className={styles.eyebrow}>Conta real ativada</div>
            <h1>Sua presença profissional começa aqui.</h1>
            <p>Entre para criar, revisar e acompanhar página, materiais e entrega em uma única jornada.</p>
          </div>
        </section>

        <section className={styles.authPanel}>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <div className={styles.eyebrow}>Acesso seguro</div>
              <h2>Entrar no painel</h2>
            </div>

            <OAuthButtonGroup />

            <div className={styles.divider}><span>ou</span></div>

            <Tabs defaultValue="login">
              <TabsList>
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Criar conta</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <PasswordLoginForm />
              </TabsContent>
              <TabsContent value="register">
                <PasswordRegisterForm />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </>
  );
}