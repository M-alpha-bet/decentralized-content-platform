import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Feed")
    .items([
      S.documentTypeListItem("feed").title("Feeds"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !["feed"].includes(item.getId()!)
      ),
    ]);
