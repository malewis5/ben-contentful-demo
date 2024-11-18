import { NewsArticleSkeleton } from "@/types/contentful";
import { Document } from "@contentful/rich-text-types";
import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

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
