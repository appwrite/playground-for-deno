import * as sdk from "https://deno.land/x/appwrite@0.2.1/mod.ts";
import { bgWhite, green, bold } from "https://deno.land/std/fmt/colors.ts";

namespace Collection {
  export const createCollection = async (
    client: any,
    collectionId: string
  ): Promise<void> => {
    const database = new sdk.Database(client);
    let response: any = await database.createCollection(
      "movies", // collection id
      "Movies", // Collection Name
      "document",
      ["role:all"], // Read permissions
      ["role:all"], // Write permissions
    );
    collectionId = response.$id;
    console.log(bgWhite(green(bold("Running Create Collection API"))));
    console.log(response);
    response = await database.createStringAttribute(
      collectionId,
      'name',
      255,
      true,
    )
    console.log(response)
    response = database.createIntegerAttribute(
      collectionId,
      'release_year',
      true,
      0,
      9999,
    )
    console.log(response)
  };

  export const listCollection = async (client: any): Promise<void> => {
    const database = new sdk.Database(client);
    let response: any = await database.listCollections();
    let collection = response.collections[0];
    console.log(bgWhite(green(bold("Running List Collection API"))));
    console.log(collection);
  };
}

export default Collection;
