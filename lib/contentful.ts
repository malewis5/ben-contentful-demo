import { NewsArticleSkeleton } from "@/types/contentful";
import { Document } from "@contentful/rich-text-types";
import { createClient } from "contentful";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { draftMode } from "next/headers";

export const createContentfulClient = (preview: boolean) => {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: preview
      ? process.env.CONTENTFUL_PREVIEW_TOKEN!
      : process.env.CONTENTFUL_ACCESS_TOKEN!,
    host: preview ? "preview.contentful.com" : undefined,
  });
};

export interface NewsArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: Document;
  featuredImage?: {
    file?: string;
    description: string;
  };
  publishDate: string;
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  "use cache";
  cacheTag("newsArticle");

  const { isEnabled } = await draftMode();
  const client = createContentfulClient(isEnabled);

  const response =
    await client.withoutUnresolvableLinks.getEntries<NewsArticleSkeleton>({
      content_type: "newsArticle",
      limit: 10,
    });

  return response.items.map((item) => ({
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    content: item.fields.content,
    featuredImage: item.fields.featuredImage && {
      file: item.fields.featuredImage.fields.file?.url,
      description: item.fields.featuredImage.fields.description ?? "",
    },
    publishDate: item.fields.publishDate,
  }));
}

export async function getNewsArticleBySlug(
  slug: string
): Promise<NewsArticle | null> {
  "use cache";
  cacheTag("newsArticle", slug);
  const { isEnabled } = await draftMode();
  const client = createContentfulClient(isEnabled);

  const response =
    await client.withoutUnresolvableLinks.getEntries<NewsArticleSkeleton>({
      content_type: "newsArticle",
      "fields.slug": slug,
      limit: 1,
    });

  if (response.items.length === 0) {
    return null;
  }

  const item = response.items[0];
  return {
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: item.fields.excerpt,
    content: item.fields.content,
    featuredImage: item.fields.featuredImage && {
      file: item.fields.featuredImage.fields.file?.url,
      description: item.fields.featuredImage.fields.description ?? "",
    },
    publishDate: item.fields.publishDate,
  };
}
