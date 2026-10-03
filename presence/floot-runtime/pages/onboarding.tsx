import { FormEvent, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { Checkbox } from "../components/Checkbox";
import { RadioGroup, RadioGroupItem } from "../components/RadioGroup";
import { postPresenceOnboarding } from "../endpoints/presence/onboarding_POST.schema";
import { PRESENCE_ORDER_KEY, usePresenceOrder } from "../helpers/usePresenceOrder";
import styles from "./onboarding.module.css";

const serviceOptions = [
  ["particular", "Particular"],
  ["executive", "Executivo"],
  ["airport", "Aeroportos"],
  ["events", "Eventos"],
  ["corporate", "Corporativo"],
  ["travel", "Viagens"],
  ["scheduled", "Agendamentos"],
  ["recurring", "Recorrente"],
] as const;

export default function OnboardingPage() {
  const orderQuery = usePresenceOrder();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [googleBusiness, setGoogleBusiness] = useState<"not_requested" | "create" | "connect_existing">("not_requested");

  const order = orderQuery.data?.order;
  const canEdit = order?.state === "ONBOARDING" || order?.state === "DATA_VALID" || order?.state === "PREVIEW_READY";
  const orderId = order?.id;

  const currentStateText = useMemo(() => {
    if (orderQuery.isPending) return "Carregando pedido…";
    if (!order) return "Nenhum pedido ativo.";
    return `Estado atual: ${order.state}`;
  }, [orderQuery.isPending, order]);

  const toggleService = (code: string, checked: boolean) => {
    setServices((current) => checked
      ? [...new Set([...current, code])]
      : current.filter((item) => item !== code));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!orderId || !canEdit) return;
    setError(null);
    setSaving(true);

    try {
      const form = new FormData(event.currentTarget);
      const serviceAreas = String(form.get("serviceAreas") ?? "")
        .split(/\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);

      await postPresenceOnboarding({
        orderId,
        slug: String(form.get("slug") ?? ""),
        profile: {
          displayName: String(form.get("displayName") ?? ""),
          fullName: String(form.get("fullName") ?? "") || null,
          phone: String(form.get("phone") ?? "") || null,
          whatsapp: String(form.get("whatsapp") ?? ""),
          bio: String(form.get("bio") ?? "") || null,
        },
        vehicle: {
          brand: String(form.get("vehicleBrand") ?? ""),
          model: String(form.get("vehicleModel") ?? ""),
          year: Number(form.get("vehicleYear")),
          color: String(form.get("vehicleColor") ?? ""),
          capacity: form.get("capacity") ? Number(form.get("capacity")) : null,
        },
        services,
        serviceAreas,
        socialLinks: {
          instagram: String(form.get("instagram") ?? "") || null,
          linkedin: String(form.get("linkedin") ?? "") || null,
          tiktok: String(form.get("tiktok") ?? "") || null,
          youtube: String(form.get("youtube") ?? "") || null,
        },
        googleBusiness: { mode: googleBusiness },
        printPersonalization: {
          displayName: String(form.get("printDisplayName") ?? ""),
          whatsapp: String(form.get("whatsapp") ?? ""),
          shortServiceLine: String(form.get("shortServiceLine") ?? "") || null,
        },
        shippingAddress: {
          document: String(form.get("shippingDocument") ?? ""),
          postalCode: String(form.get("postalCode") ?? ""),
          street: String(form.get("street") ?? ""),
          number: String(form.get("number") ?? ""),
          complement: String(form.get("complement") ?? "") || null,
          neighborhood: String(form.get("neighborhood") ?? ""),
          city: String(form.get("city") ?? ""),
          state: String(form.get("state") ?? "").toUpperCase(),
        },
      });

      await queryClient.invalidateQueries({ queryKey: PRESENCE_ORDER_KEY });
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível salvar o cadastro.");
    } finally {
      setSaving(false);
    }
  };

  if (!canEdit) {
    return (
      <main className={styles.blocked}>
        <div className={styles.brand}>MotoristaOPS</div>
        <h1>Onboarding indisponível.</h1>
        <p>{currentStateText}</p>
        <Button onClick={() => navigate("/")}>Voltar ao painel</Button>
      </main>
    );
  }

  return (
    <>
      <Helmet><title>Cadastro | MotoristaOPS Presença</title></Helmet>
      <main className={styles.page}>
        <header className={styles.header}>
          <div>
            <div className={styles.eyebrow}>MotoristaOPS Presença</div>
            <h1>Crie sua presença.</h1>
            <p>Os mesmos dados alimentam a página pública, personalização física e entrega. Dados de envio nunca entram na página pública.</p>
          </div>
          <span>Pedido #{orderId}</span>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <section className={styles.card}>
            <div className={styles.sectionHead}><span>01</span><div><h2>Perfil profissional</h2><p>Nome, contato e apresentação.</p></div></div>
            <div className={styles.grid}>
              <label><span>Nome profissional *</span><Input name="displayName" required maxLength={120} /></label>
              <label><span>Nome completo</span><Input name="fullName" maxLength={160} /></label>
              <label className={styles.wide}><span>Slug *</span><Input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="seu-nome-profissional" /></label>
              <label><span>Telefone</span><Input name="phone" type="tel" /></label>
              <label><span>WhatsApp *</span><Input name="whatsapp" type="tel" required /></label>
              <label className={styles.wide}><span>Apresentação</span><Textarea name="bio" rows={5} maxLength={1200} /></label>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.sectionHead}><span>02</span><div><h2>Veículo e serviços</h2><p>Informação operacional que pode aparecer no perfil.</p></div></div>
            <div className={styles.grid}>
              <label><span>Marca *</span><Input name="vehicleBrand" required /></label>
              <label><span>Modelo *</span><Input name="vehicleModel" required /></label>
              <label><span>Ano *</span><Input name="vehicleYear" type="number" min={1990} max={2100} required /></label>
              <label><span>Cor *</span><Input name="vehicleColor" required /></label>
              <label><span>Passageiros</span><Input name="capacity" type="number" min={1} max={20} /></label>
            </div>
            <div className={styles.serviceGrid}>
              {serviceOptions.map(([code, label]) => (
                <label className={styles.choice} key={code}>
                  <Checkbox
                    checked={services.includes(code)}
                    onChange={(event) => toggleService(code, event.target.checked)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            <label className={styles.stack}><span>Áreas atendidas * — uma por linha ou separadas por vírgula</span><Textarea name="serviceAreas" rows={4} required /></label>
          </section>

          <section className={styles.card}>
            <div className={styles.sectionHead}><span>03</span><div><h2>Presença digital</h2><p>Links existentes e opção Google Business.</p></div></div>
            <div className={styles.grid}>
              <label><span>Instagram</span><Input name="instagram" type="url" placeholder="https://..." /></label>
              <label><span>LinkedIn</span><Input name="linkedin" type="url" placeholder="https://..." /></label>
              <label><span>TikTok</span><Input name="tiktok" type="url" placeholder="https://..." /></label>
              <label><span>YouTube</span><Input name="youtube" type="url" placeholder="https://..." /></label>
            </div>
            <RadioGroup value={googleBusiness} onValueChange={(value) => setGoogleBusiness(value as typeof googleBusiness)} className={styles.radios}>
              <label className={styles.radio}><RadioGroupItem value="not_requested" /><span>Não configurar agora</span></label>
              <label className={styles.radio}><RadioGroupItem value="create" /><span>Criar perfil</span></label>
              <label className={styles.radio}><RadioGroupItem value="connect_existing" /><span>Conectar perfil existente</span></label>
            </RadioGroup>
          </section>

          <section className={styles.card}>
            <div className={styles.sectionHead}><span>04</span><div><h2>Materiais físicos</h2><p>A personalização de impressão é persistida separadamente e alimenta os templates físicos.</p></div></div>
            <div className={styles.grid}>
              <label><span>Nome nos materiais *</span><Input name="printDisplayName" required /></label>
              <label><span>Linha curta de serviço</span><Input name="shortServiceLine" maxLength={120} placeholder="Aeroportos · Executivo · Viagens" /></label>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.sectionHead}><span>05</span><div><h2>Entrega</h2><p>Privado. Não é transformado em dado publicável.</p></div></div>
            <div className={styles.grid}>
              <label><span>CPF do destinatário *</span><Input name="shippingDocument" required inputMode="numeric" /></label>
              <label><span>CEP *</span><Input name="postalCode" required /></label>
              <label><span>UF *</span><Input name="state" required minLength={2} maxLength={2} /></label>
              <label className={styles.wide}><span>Rua / avenida *</span><Input name="street" required /></label>
              <label><span>Número *</span><Input name="number" required /></label>
              <label><span>Complemento</span><Input name="complement" /></label>
              <label><span>Bairro *</span><Input name="neighborhood" required /></label>
              <label><span>Cidade *</span><Input name="city" required /></label>
            </div>
          </section>

          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.actions}>
            <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancelar</Button>
            <Button type="submit" disabled={saving || services.length === 0}>{saving ? "Salvando…" : "Salvar e revisar"}</Button>
          </div>
        </form>
      </main>
    </>
  );
}