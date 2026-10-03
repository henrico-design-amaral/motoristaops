import superjson from "superjson";
import { db } from "../../helpers/db";
import type { OutputType } from "./profile_GET.schema";
import { schema } from "./profile_GET.schema";

export async function handle(request: Request) {
  try {
    const url = new URL(request.url);
    const { slug } = schema.parse({ slug: url.searchParams.get("slug") });

    const page = await db
      .selectFrom("presenceDriverPages")
      .select(["orderId", "slug", "publishedHash", "publishedVersion", "publicationStatus"])
      .where("slug", "=", slug)
      .where("publicationStatus", "=", "published")
      .executeTakeFirst();
    if (!page || !page.publishedHash || !page.publishedVersion) {
      return new Response(superjson.stringify({ error: "Perfil não publicado." }), { status: 404 });
    }

    const snapshot = await db
      .selectFrom("presenceSnapshots")
      .select(["content", "contentHash"])
      .where("orderId", "=", page.orderId)
      .where("snapshotKind", "=", "public_page")
      .where("contentHash", "=", page.publishedHash)
      .orderBy("createdAt", "desc")
      .executeTakeFirst();
    if (!snapshot) {
      return new Response(superjson.stringify({ error: "Snapshot publicado não encontrado." }), { status: 500 });
    }

    const output: OutputType = {
      slug: page.slug,
      snapshotHash: snapshot.contentHash,
      publishedVersion: page.publishedVersion,
      content: snapshot.content as OutputType["content"],
    };
    return new Response(superjson.stringify(output), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao carregar perfil";
    return new Response(superjson.stringify({ error: message }), { status: 400 });
  }
}