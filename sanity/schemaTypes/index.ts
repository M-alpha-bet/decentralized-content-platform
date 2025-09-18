import { type SchemaTypeDefinition } from "sanity";
import { feedType } from "./feedType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [feedType],
};
