import { EntryFieldTypes } from "contentful";

export interface NewsArticleSkeleton {
  contentTypeId: "newsArticle";
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    excerpt: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
    featuredImage: EntryFieldTypes.AssetLink;
    publishDate: EntryFieldTypes.Text;
  };
}
