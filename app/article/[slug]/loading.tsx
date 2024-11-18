import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlePageSkeleton() {
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
        <Skeleton className="min-h-9 min-w-9 lg:min-h-12 lg:min-w-12" />
        {/* Author and Metadata */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-x-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-y-2 flex-col">
              <Skeleton className="min-h-4 min-w-64 /" />
              <Skeleton className="min-h-4 min-w-64 /" />
              <Skeleton className="min-h-4 min-w-64 /" />
            </div>
          </div>
        </div>

        {/* Article Excerpt */}

        <Skeleton className="text-xl text-muted-foreground" />
      </header>

      {/* Article Content */}
      <div className="mt-8">
        <Skeleton />
      </div>
    </article>
  );
}
