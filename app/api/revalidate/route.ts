import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

export const POST = async () => {
  try {
    const headerStore = await headers();

    const webhook_secret = headerStore.get("x-contentful-webhook-secret");

    if (webhook_secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
      const response = new Response("unauthorized", { status: 401 });
      return response;
    }

    revalidateTag("newsArticle");
    const response = new Response("success", { status: 200 });
    console.log("Revalidation triggered for articles");
    return response;
  } catch (error) {
    console.error(error);
    const response = new Response("error", { status: 500 });
    return response;
  }
};
