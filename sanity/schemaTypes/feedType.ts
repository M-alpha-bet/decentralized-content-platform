import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const feedType = defineType({
  name: "feed",
  title: "Feed",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: "alias", type: "string", title: "Alias" }),
    defineField({
      name: "aliasImage",
      type: "image",
      title: "aliasImage",

      options: {
        hotspot: true,
      },
    }),
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "slug",
      type: "slug",
      hidden: true,
      options: {
        source: "title",
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    }),
    defineField({ name: "text", type: "text", title: "Text" }),
    defineField({
      name: "image",
      type: "image",
      title: "feedImage",

      options: {
        hotspot: true,
      },
    }),
    defineField({ name: "wallet", type: "string", title: "Wallet Address" }),

    defineField({
      name: "isMinted",
      type: "boolean",
      title: "Minted",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
