import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NewsArticle } from "@/lib/contentful";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          priority
          src={`https:${article?.featuredImage?.file ?? ""}`}
          alt={article?.featuredImage?.description ?? "Image of the article"}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant="secondary">
          <CalendarIcon className="mr-1 h-3 w-3" />
          {new Date(article.publishDate).toLocaleDateString()}
        </Badge>
        <Button asChild>
          <Link prefetch={true} href={`/article/${article.slug}`}>
            Read more
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
