import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  INLINES,
  MARKS,
  Document,
  Node,
} from "@contentful/rich-text-types";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface RichTextRendererProps {
  content: Document;
  className?: string;
}

export function RichTextRenderer({
  content,
  className,
}: RichTextRendererProps) {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => (
        <span className="font-bold">{text}</span>
      ),
      [MARKS.ITALIC]: (text: React.ReactNode) => (
        <span className="italic">{text}</span>
      ),
      [MARKS.UNDERLINE]: (text: React.ReactNode) => (
        <span className="underline">{text}</span>
      ),
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {text}
        </code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => (
        <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node: Node, children: React.ReactNode) => (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node: Node, children: React.ReactNode) => (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node: Node, children: React.ReactNode) => (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (node: Node, children: React.ReactNode) => (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {children}
        </h4>
      ),
      [BLOCKS.HEADING_5]: (node: Node, children: React.ReactNode) => (
        <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
          {children}
        </h5>
      ),
      [BLOCKS.HEADING_6]: (node: Node, children: React.ReactNode) => (
        <h6 className="scroll-m-20 text-base font-semibold tracking-tight">
          {children}
        </h6>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        const { url, description, width, height } =
          node.data.target.fields.file;
        return (
          <div className="my-8">
            <Image
              src={`https:${url}`}
              alt={description || ""}
              width={width || 800}
              height={height || 600}
              className="rounded-lg"
            />
            {description && (
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        );
      },
      [BLOCKS.UL_LIST]: (node: Node, children: React.ReactNode) => (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: Node, children: React.ReactNode) => (
        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: Node, children: React.ReactNode) => (
        <li>{children}</li>
      ),
      [BLOCKS.QUOTE]: (node: Node, children: React.ReactNode) => (
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-4 md:my-8" />,
      [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => (
        <Link
          href={node.data.uri}
          className="font-medium text-primary underline underline-offset-4"
        >
          {children}
        </Link>
      ),
    },
  };

  return (
    <div
      className={cn("prose prose-gray dark:prose-invert max-w-none", className)}
    >
      {documentToReactComponents(content, options)}
    </div>
  );
}
