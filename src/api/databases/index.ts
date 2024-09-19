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

export const createDatabase = async (client: Client): Promise<string> => {
  console.log(bgWhite(green(bold("Running Create Database API"))));

  const databases = new Databases(client);
  const response = await databases.create(ID.unique(), "Movies");

  console.log(response);
  const databaseId = response.$id;

  return databaseId;
};

export const listDatabases = async (client: Client): Promise<void> => {
  console.log(bgWhite(green(bold("Running List Databases API"))));

  const databases = new Databases(client);
  const response = await databases.list();
  console.log(response);
};

export const createCollection = async (
  client: Client,
  databaseId: string
): Promise<string> => {
  console.log(bgWhite(green(bold("Running Create Collection API"))));

  const databases = new Databases(client);
  const response = await databases.createCollection(
    databaseId,
    ID.unique(), // Collection ID
    "Movies", // Collection Name
    [
      Permission.read(Role.users()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ]
  );

  console.log(response);
  const collectionId = response.$id;

  const nameAttributeResponse = await databases.createStringAttribute(
    databaseId,
    collectionId,
    "name",
    255,
    false,
    "Empty Name",
    false
  );
  console.log(nameAttributeResponse);

  const yearAttributeResponse = await databases.createIntegerAttribute(
    databaseId,
    collectionId,
    "release_year",
    false,
    0,
    5000,
    1970,
    false
  );
  console.log(yearAttributeResponse);

  console.log("Waiting a little to ensure attributes are created ...");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return collectionId;
};

export const listCollections = async (
  client: Client,
  databaseId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running List Collections API"))));

  const databases = new Databases(client);
  const response = await databases.listCollections(databaseId);
  console.log(response);
};

export const listAttributes = async (
  client: Client,
  databaseId: string,
  collectionId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running List Attributes API"))));

  const databases = new Databases(client);
  const response = await databases.listAttributes(databaseId, collectionId);
  console.log(response);
};

export const deleteCollection = async (
  client: Client,
  databaseId: string,
  collectionId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running Delete Collection API"))));

  const databases = new Databases(client);
  const response = await databases.deleteCollection(databaseId, collectionId);
  console.log(response);
};
