import * as sdk from "https://deno.land/x/appwrite@3.0.0/mod.ts";
import { bgWhite, green, bold } from "https://deno.land/std/fmt/colors.ts";

namespace Document {
  export const createDocument = async (
    client: sdk.Client,
    collectionId: string
  ): Promise<string> => {
    console.log(bgWhite(green(bold("Running Create Document API"))));

    const database = new sdk.Database(client);

    const response = await database.createDocument(
      collectionId,
      "unique()",
      {
        name: "Spider Man",
        release_year: 1920,
      },
      ["role:all"],
      ["role:all"]
    );
    console.log(response);
    const documentId = response.$id;

    return documentId;
  };

  export const listDocuments = async (
    client: sdk.Client,
    collectionId: string
  ): Promise<void> => {
    console.log(bgWhite(green(bold("Running List Documents API"))));

    const database = new sdk.Database(client);
    const response = await database.listDocuments(collectionId);
    console.log(response);
  };

  export const deleteDocument = async (
    client: sdk.Client,
    collectionId: string,
    documentId: string
  ): Promise<void> => {
    console.log(bgWhite(green(bold("Running Delete Document API"))));

    const database = new sdk.Database(client);
    const response = await database.deleteDocument(collectionId, documentId);
    console.log(response);
  };
}

export default Document;
