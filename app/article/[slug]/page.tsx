import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsArticleBySlug } from "@/lib/contentful";
import { RichTextRenderer } from "@/components/ui/rich-text";
import { ChevronLeft, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const readingTime = getReadingTime(article.excerpt + article.content);

  return (
    <article className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center space-x-1 text-sm text-muted-foreground">
        <Link
          href="/"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {article.title}
        </h1>

        {/* Author and Metadata */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-x-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-x-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
            <span>·</span>
            <time dateTime={article.publishDate}>
              {new Date(article.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>

        {/* Article Excerpt */}
        <p className="text-xl text-muted-foreground">{article.excerpt}</p>
      </header>

      {/* Article Content */}
      <div className="mt-8">
        <RichTextRenderer
          content={article.content}
          className={cn(
            "prose-quoteless",
            "prose-h2:text-3xl prose-h2:font-semibold",
            "prose-h3:text-2xl prose-h3:font-semibold",
            "prose-p:text-base prose-p:leading-7",
            "prose-a:font-normal prose-a:text-primary prose-a:no-underline prose-a:transition-colors hover:prose-a:underline"
          )}
        />
      </div>
    </article>
  );
}
