import { Client, Databases } from "../../deps.ts";
import { bgWhite, green, bold } from "../../deps.ts";

class Collection {
  static async createDatabase(
    client: Client
  ): Promise<string> {
    console.log(bgWhite(green(bold("Running Create Database API"))));

    const database = new Databases(client, "default");
    const response = await database.create("Default");

    console.log(response);

    return response.$id;
  }

  static async createCollection(
    client: Client
  ): Promise<string> {
    console.log(bgWhite(green(bold("Running Create Collection API"))));

    const database = new Databases(client, "default");
    const response = await database.createCollection(
      "unique()", // ID of the collection
      "Movies", // Collection Name
      "collection", // Marking permission as collection-level
      ["role:all"], // Read permissions
      ["role:all"], // Write permissions
    );

    console.log(response);
    const collectionId = response.$id;

    const nameAttributeResponse = await database.createStringAttribute(collectionId, 'name', 255, false, "Empty Name", false);
    console.log(nameAttributeResponse);


    const yearAttributeResponse = await database.createIntegerAttribute(collectionId, 'release_year', false, 0, 5000, 1970, false);
    console.log(yearAttributeResponse);

    console.log("Waiting a little to ensure attributes are created ...");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return collectionId;
  }

  static async listCollections(client: Client): Promise<void> {
    console.log(bgWhite(green(bold("Running List Collections API"))));

    const database = new Databases(client, "default");
    const response = await database.listCollections();
    console.log(response);
  }

  static async listAttributes(client: Client, collectionId: string): Promise<void> {
    console.log(bgWhite(green(bold("Running List Attributes API"))));

    const database = new Databases(client, "default");
    const response = await database.listAttributes(collectionId);
    console.log(response);
  }

  static async deleteCollection(
    client: Client,
    collectionId: string
  ): Promise<void> {
    console.log(bgWhite(green(bold("Running Delete Collection API"))));

    const database = new Databases(client, "default");
    const response = await database.deleteCollection(collectionId);
    console.log(response);
  }
}

export default Collection;
