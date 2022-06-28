import { Client, Databases } from "../../deps.ts";
import { bgWhite, green, bold } from "../../deps.ts";

class Document {
  static async createDocument(
    client: Client,
    collectionId: string
  ): Promise<string> {
    console.log(bgWhite(green(bold("Running Create Document API"))));

    const database = new Databases(client, "default");

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
  }

  static async listDocuments(
    client: Client,
    collectionId: string
  ): Promise<void> {
    console.log(bgWhite(green(bold("Running List Documents API"))));

    const database = new Databases(client, "default");
    const response = await database.listDocuments(collectionId);
    console.log(response);
  }

  static async deleteDocument(
    client: Client,
    collectionId: string,
    documentId: string
  ): Promise<void> {
    console.log(bgWhite(green(bold("Running Delete Document API"))));

    const database = new Databases(client, "default");
    const response = await database.deleteDocument(collectionId, documentId);
    console.log(response);
  }
}

export default Document;
