import {
  Client,
  Databases,
  ID,
  Permission,
  Role,
} from "https://deno.land/x/appwrite@12.0.0/mod.ts";
import {
  bgWhite,
  green,
  bold,
} from "https://deno.land/std@0.224.0/fmt/colors.ts";

export const createDocument = async (
  client: Client,
  databaseId: string,
  collectionId: string
): Promise<string> => {
  console.log(bgWhite(green(bold("Running Create Document API"))));

  const databases = new Databases(client);

  const response = await databases.createDocument(
    databaseId,
    collectionId,
    ID.unique(),
    {
      name: "Spider Man",
      release_year: 1920,
    },
    [
      Permission.read(Role.users()),
      Permission.write(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ]
  );
  console.log(response);
  const documentId = response.$id;

  return documentId;
};

export const listDocuments = async (
  client: Client,
  databaseId: string,
  collectionId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running List Documents API"))));

  const databases = new Databases(client);
  const response = await databases.listDocuments(databaseId, collectionId);
  console.log(response);
};

export const deleteDocument = async (
  client: Client,
  databaseId: string,
  collectionId: string,
  documentId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running Delete Document API"))));

  const databases = new Databases(client);
  const response = await databases.deleteDocument(
    databaseId,
    collectionId,
    documentId
  );
  console.log(response);
};
