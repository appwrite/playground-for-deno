import * as sdk from "https://deno.land/x/appwrite@0.2.1/mod.ts";
import { bgWhite, green, bold } from "https://deno.land/std/fmt/colors.ts";

namespace Document {
  export const addDoc = async (
    client: any,
    collectionId: string
  ): Promise<void> => {
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
  };

  export const listDoc = async (
    client: any,
    collectionId: string
  ): Promise<void> => {
    const database = new sdk.Database(client);
    const response: any = await database.listDocuments(collectionId);
    console.log(bgWhite(green(bold("Running List Documents API"))));
    console.log(response);
  };

  export const uploadFile = async (client: any): Promise<void> => {
    let storage = new sdk.Storage(client);
    const fileArray = await Deno.readFile("nature.jpg");
    const fileBlob = new Blob([fileArray.buffer]);
    const file = new File([fileBlob], "nature.jpg");

    let response = await storage.createFile("unique()", file, ["role:all"], ["role:all"]);
    console.log(bgWhite(green(bold("Running Upload File API"))));
    console.log(response);
  };
}

export default Document;
