import * as sdk from "https://deno.land/x/appwrite@3.0.0/mod.ts";
import { bgWhite, green, bold } from "https://deno.land/std/fmt/colors.ts";

namespace Collection {
  export const createCollection = async (
    client: sdk.Client
  ): Promise<string> => {
    console.log(bgWhite(green(bold("Running Create Collection API"))));

    const database = new sdk.Database(client);
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
  };

  export const listCollections = async (client: sdk.Client): Promise<void> => {
    console.log(bgWhite(green(bold("Running List Collections API"))));

    const database = new sdk.Database(client);
    let response = await database.listCollections();
    console.log(response);
  };

  export const listAttributes = async (client: sdk.Client, collectionId: string): Promise<void> => {
    console.log(bgWhite(green(bold("Running List Attributes API"))));

    const database = new sdk.Database(client);
    let response = await database.listAttributes(collectionId);
    console.log(response);
  };

  export const deleteCollection = async (
    client: sdk.Client,
    collectionId: string
  ): Promise<void> => {
    console.log(bgWhite(green(bold("Running Delete Collection API"))));

    const database = new sdk.Database(client);
    const response = await database.deleteCollection(collectionId);
    console.log(response);
  };
}

export default Collection;
