import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as XLSX from "npm:xlsx@0.18.5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
});

const normalize = (value: unknown) => String(value ?? "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const present = (value: unknown) => value !== null && value !== undefined && String(value).trim() !== "";

const asNumber = (value: unknown): number => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (!present(value)) return 0;
  let text = String(value).trim().replace(/R\$|km\/l|km|h|%/gi, "").replace(/\s/g, "");
  if (text.includes(",") && text.includes(".")) text = text.replace(/\./g, "").replace(",", ".");
  else if (text.includes(",")) text = text.replace(",", ".");
  const result = Number(text.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(result) ? result : 0;
};

const round = (value: number, digits = 2) => Number(value.toFixed(digits));

const asDate = (value: unknown): string | null => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  if (typeof value === "number" && value > 20000 && value < 100000) {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (parsed) return `${String(parsed.y).padStart(4, "0")}-${String(parsed.m).padStart(2, "0")}-${String(parsed.d).padStart(2, "0")}`;
  }
  const text = String(value ?? "").trim();
  if (!text) return null;
  const iso = text.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (iso) return `${iso[1]}-${iso[2].padStart(2, "0")}-${iso[3].padStart(2, "0")}`;
  const br = text.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})/);
  if (br) {
    const year = br[3].length === 2 ? `20${br[3]}` : br[3];
    return `${year}-${br[2].padStart(2, "0")}-${br[1].padStart(2, "0")}`;
  }
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
};

const knownHeaderTerms = ["data", "turno", "plataforma", "horas", "km", "viagens", "corridas", "receita", "ganhos", "lucro"];

function headerScore(row: unknown[]): number {
  const values = row.map(normalize);
  return knownHeaderTerms.reduce((score, term) => score + (values.some((value) => value.includes(term)) ? 1 : 0), 0);
}

function findHeaderRow(rows: unknown[][]): number {
  let bestIndex = 0;
  let bestScore = -1;
  for (let index = 0; index < Math.min(rows.length, 50); index += 1) {
    const score = headerScore(rows[index] ?? []);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }
  return bestIndex;
}

function findColumn(headers: string[], aliases: string[]): number {
  const normalizedAliases = aliases.map(normalize);
  for (const alias of normalizedAliases) {
    const exact = headers.findIndex((header) => header === alias);
    if (exact >= 0) return exact;
  }
  for (const alias of normalizedAliases) {
    const partial = headers.findIndex((header) => header.includes(alias) || alias.includes(header));
    if (partial >= 0) return partial;
  }
  return -1;
}

function valueAt(row: unknown[], headers: string[], aliases: string[]): unknown {
  const index = findColumn(headers, aliases);
  return index >= 0 ? row[index] : null;
}

type ParsedRow = {
  record: Record<string, unknown>;
  complete: boolean;
  reason: string | null;
  grossRevenue: number;
  tripsTotal: number;
};

function mapRow(row: unknown[], headers: string[], ownerId: string): ParsedRow | null {
  const operationDate = asDate(valueAt(row, headers, ["data", "data fechamento", "data operacao", "dia"]));
  if (!operationDate) return null;

  const platform = String(valueAt(row, headers, ["plataforma principal", "plataforma", "aplicativo", "app principal", "app"]) ?? "").trim();
  const grossRaw = valueAt(row, headers, ["receita bruta", "faturamento bruto", "bruto", "receita total", "ganho total"]);
  const profitRaw = valueAt(row, headers, ["lucro operacional", "lucro", "resultado operacional"]);
  const directExpenseRaw = valueAt(row, headers, ["despesa operacional", "despesas operacionais", "custo operacional", "custos operacionais", "despesas"]);
  const gross = asNumber(grossRaw);
  const profit = asNumber(profitRaw);
  const directExpense = asNumber(directExpenseRaw);

  let revenueUber = asNumber(valueAt(row, headers, ["ganhos uber", "receita uber", "ganho uber", "uber receita"]));
  let revenue99 = asNumber(valueAt(row, headers, ["ganhos 99", "receita 99", "ganho 99", "99 receita"]));
  let revenuePrivate = asNumber(valueAt(row, headers, ["ganhos particular", "receita particular", "ganho particular", "particular receita"]));
  const tips = asNumber(valueAt(row, headers, ["gorjetas extras", "gorjetas / extras", "gorjetas", "extras", "adicionais"]));

  if (gross > 0 && revenueUber + revenue99 + revenuePrivate + tips === 0) {
    const platformKey = normalize(platform);
    if (platformKey.includes("99") && !platformKey.includes("uber")) revenue99 = gross;
    else if (platformKey.includes("particular") && !platformKey.includes("uber") && !platformKey.includes("99")) revenuePrivate = gross;
    else if (!platformKey.includes("misto") && !platformKey.includes("99") && !platformKey.includes("particular")) revenueUber = gross;
  }

  let tripsUber = Math.round(asNumber(valueAt(row, headers, ["corridas uber", "viagens uber", "uber viagens"])));
  let trips99 = Math.round(asNumber(valueAt(row, headers, ["corridas 99", "viagens 99", "99 viagens"])));
  let tripsPrivate = Math.round(asNumber(valueAt(row, headers, ["corridas particular", "corridas particulares", "viagens particulares", "particulares"])));
  const totalTrips = Math.round(asNumber(valueAt(row, headers, ["corridas totais", "viagens", "corridas", "total viagens", "total corridas"])));
  if (totalTrips > 0 && tripsUber + trips99 + tripsPrivate === 0) {
    const platformKey = normalize(platform);
    if (platformKey.includes("99") && !platformKey.includes("uber")) trips99 = totalTrips;
    else if (platformKey.includes("particular") && !platformKey.includes("uber") && !platformKey.includes("99")) tripsPrivate = totalTrips;
    else if (!platformKey.includes("misto") && !platformKey.includes("99") && !platformKey.includes("particular")) tripsUber = totalTrips;
  }

  const fuelRaw = valueAt(row, headers, ["combustivel estimado", "custo combustivel", "combustivel", "fuel cost"]);
  const foodRaw = valueAt(row, headers, ["alimentacao", "refeicao", "comida"]);
  const washRaw = valueAt(row, headers, ["lavagem", "limpeza"]);
  const otherRaw = valueAt(row, headers, ["outros operacionais", "outros custos", "outras despesas", "outro custo"]);
  const fuelCost = asNumber(fuelRaw);
  const foodCost = asNumber(foodRaw);
  const washCost = asNumber(washRaw);
  let otherCost = asNumber(otherRaw);
  if (directExpense > 0 && fuelCost + foodCost + washCost + otherCost === 0) otherCost = directExpense;
  if (present(profitRaw) && gross > 0 && fuelCost + foodCost + washCost + otherCost === 0 && gross >= profit) otherCost = gross - profit;

  const hoursOnline = round(asNumber(valueAt(row, headers, ["horas online", "horas trabalhadas", "total horas", "horas"])), 2);
  const kmTotal = round(asNumber(valueAt(row, headers, ["km total", "km rodados", "quilometragem total", "quilometragem"])), 2);
  const tripsTotal = Math.max(0, tripsUber) + Math.max(0, trips99) + Math.max(0, tripsPrivate);
  const revenueTotal = Math.max(0, revenueUber) + Math.max(0, revenue99) + Math.max(0, revenuePrivate) + Math.max(0, tips);
  const hasCostEvidence = fuelCost + foodCost + washCost + otherCost > 0 || directExpense > 0 || (present(profitRaw) && gross > profit + 0.01);
  const meaningful = hoursOnline > 0 || kmTotal > 0 || tripsTotal > 0 || revenueTotal > 0;
  if (!meaningful) return null;

  let reason: string | null = null;
  if (hoursOnline <= 0) reason = "horas online ausentes";
  else if (!hasCostEvidence) reason = "custos operacionais não comprovados";
  else if (revenueTotal <= 0 && gross > 0) reason = "receita por plataforma ambígua";
  const complete = reason === null;

  const record = {
    owner_id: ownerId,
    operation_date: operationDate,
    weekday_label: String(valueAt(row, headers, ["dia semana", "dia da semana", "dia", "weekday"]) ?? "").trim() || null,
    shift: String(valueAt(row, headers, ["turno", "periodo"]) ?? "Misto").trim() || "Misto",
    primary_platform: platform || null,
    hours_online: hoursOnline,
    hours_in_ride: round(asNumber(valueAt(row, headers, ["horas em corrida", "horas passageiro", "tempo com passageiro"])), 2) || null,
    km_total: kmTotal || null,
    km_passenger: round(asNumber(valueAt(row, headers, ["km com passageiro", "km passageiro", "quilometragem passageiro"])), 2) || null,
    trips_uber: Math.max(0, tripsUber),
    trips_99: Math.max(0, trips99),
    trips_private: Math.max(0, tripsPrivate),
    revenue_uber: round(Math.max(0, revenueUber)),
    revenue_99: round(Math.max(0, revenue99)),
    revenue_private: round(Math.max(0, revenuePrivate)),
    tips_extras: round(Math.max(0, tips)),
    fuel_cost: round(Math.max(0, fuelCost)),
    food_cost: round(Math.max(0, foodCost)),
    wash_cost: round(Math.max(0, washCost)),
    other_operational_cost: round(Math.max(0, otherCost)),
    fuel_efficiency_km_l: round(asNumber(valueAt(row, headers, ["consumo km l", "km l", "consumo"])), 2) || null,
    fuel_price_reference: round(asNumber(valueAt(row, headers, ["preco combustivel", "preco litro", "valor litro"])), 3) || null,
    notes: String(valueAt(row, headers, ["observacoes", "observacao", "notas"]) ?? "").trim() || null,
    source: "excel",
  };

  return { record, complete, reason, grossRevenue: round(gross || revenueTotal), tripsTotal };
}

async function sha256(bytes: ArrayBuffer) {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Use POST com um arquivo .xlsx." }, 405);

  const authorization = req.headers.get("Authorization") ?? "";
  const token = authorization.replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Sessão ausente." }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authorization } } });
  const { data: userData, error: userError } = await authClient.auth.getUser(token);
  if (userError || !userData.user) return json({ error: "Sessão inválida.", details: userError?.message }, 401);
  const ownerId = userData.user.id;
  const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  let jobId: string | null = null;
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const mode = String(formData.get("mode") ?? "preview");
    const expectedHash = String(formData.get("expected_hash") ?? "");
    if (!(file instanceof File)) return json({ error: "Envie o arquivo no campo 'file'." }, 400);
    if (!/\.xlsx?$/.test(file.name.toLowerCase())) return json({ error: "Formato inválido. Use XLSX ou XLS." }, 400);
    if (!['preview', 'commit'].includes(mode)) return json({ error: "Modo inválido." }, 400);

    const bytes = await file.arrayBuffer();
    const fileHash = await sha256(bytes);
    if (mode === "commit" && (!expectedHash || expectedHash !== fileHash)) {
      return json({ error: "O arquivo mudou após a revisão. Gere uma nova prévia antes de confirmar." }, 409);
    }

    const workbook = XLSX.read(bytes, { type: "array", cellDates: true });
    const preferredName = workbook.SheetNames.find((name) => normalize(name).includes("operacao diaria"));
    const sheetName = preferredName ?? workbook.SheetNames[0];
    if (!sheetName) throw new Error("A planilha não possui abas legíveis.");
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: true, defval: null }) as unknown[][];
    const headerRowIndex = findHeaderRow(rows);
    const headers = (rows[headerRowIndex] ?? []).map(normalize);
    const parsed = rows.slice(headerRowIndex + 1).map((row) => mapRow(row, headers, ownerId)).filter(Boolean) as ParsedRow[];
    const eligible = parsed.filter((item) => item.complete);
    const ignored = parsed.filter((item) => !item.complete);

    if (!parsed.length) throw new Error("Nenhum registro operacional foi encontrado. Verifique a aba Operação Diária e os cabeçalhos.");

    if (mode === "preview") {
      return json({
        ok: true,
        mode,
        file_hash: fileHash,
        sheet: sheetName,
        header_row: headerRowIndex + 1,
        rows_read: Math.max(0, rows.length - headerRowIndex - 1),
        eligible: eligible.length,
        ignored: ignored.length,
        preview: eligible.slice(0, 25).map((item) => ({
          operation_date: item.record.operation_date,
          platform: item.record.primary_platform,
          hours_online: item.record.hours_online,
          km_total: item.record.km_total,
          trips: item.tripsTotal,
          gross_revenue: item.grossRevenue,
        })),
        ignored_preview: ignored.slice(0, 25).map((item) => ({
          operation_date: item.record.operation_date,
          reason: item.reason,
        })),
      });
    }

    if (!eligible.length) throw new Error("Nenhum fechamento completo passou pelos critérios de segurança. Nada foi gravado.");

    const { data: job, error: jobError } = await admin.from("import_jobs").insert({
      owner_id: ownerId,
      file_name: file.name,
      file_hash: fileHash,
      status: "processing",
      rows_read: Math.max(0, rows.length - headerRowIndex - 1),
    }).select("id").single();
    if (jobError) throw jobError;
    jobId = job.id;

    const dates = eligible.map((item) => String(item.record.operation_date));
    const { data: existingRows, error: existingError } = await admin.from("daily_closings")
      .select("operation_date")
      .eq("owner_id", ownerId)
      .in("operation_date", dates);
    if (existingError) throw existingError;
    const existingDates = new Set((existingRows ?? []).map((row) => row.operation_date));

    const records = eligible.map((item) => item.record);
    const chunkSize = 200;
    for (let start = 0; start < records.length; start += chunkSize) {
      const { error } = await admin.from("daily_closings").upsert(records.slice(start, start + chunkSize), { onConflict: "owner_id,operation_date" });
      if (error) throw error;
    }

    const inserted = eligible.filter((item) => !existingDates.has(item.record.operation_date)).length;
    const updated = eligible.length - inserted;
    await admin.from("import_jobs").update({
      status: "completed",
      rows_inserted: inserted,
      rows_updated: updated,
      rows_failed: 0,
      error_summary: ignored.length ? `${ignored.length} linha(s) ignorada(s) por dados incompletos.` : null,
      completed_at: new Date().toISOString(),
    }).eq("id", jobId);

    return json({ ok: true, mode, imported: eligible.length, inserted, updated, ignored: ignored.length, job_id: jobId });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (jobId) await admin.from("import_jobs").update({
      status: "failed",
      error_summary: message,
      rows_failed: 1,
      completed_at: new Date().toISOString(),
    }).eq("id", jobId);
    return json({ error: message }, 400);
  }
});
