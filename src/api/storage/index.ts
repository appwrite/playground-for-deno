import {
  Client,
  Storage,
  ID,
  InputFile,
  Permission,
  Role,
} from "https://deno.land/x/appwrite@11.0.0/mod.ts";
import {
  bgWhite,
  green,
  bold,
} from "https://deno.land/std@0.224.0/fmt/colors.ts";

export const uploadFile = async (
  client: Client,
  bucketId: string
): Promise<string> => {
  console.log(bgWhite(green(bold("Running Upload File API"))));

  const storage = new Storage(client);
  const response = await storage.createFile(
    bucketId,
    ID.unique(),
    InputFile.fromPath("./resources/nature.jpg", "nature.jpg"),
    [
      Permission.read(Role.users()),
      Permission.write(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ]
  );
  console.log(response);
  const fileId = response.$id;

  return fileId;
};

export const listFiles = async (
  client: Client,
  bucketId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running List Files API"))));

  const storage = new Storage(client);
  const response = await storage.listFiles(bucketId);
  console.log(response);
};

export const createBucket = async (client: Client): Promise<string> => {
  console.log(bgWhite(green(bold("Running Create Bucket API"))));

  const storage = new Storage(client);

  const response = await storage.createBucket(ID.unique(), "All Files", [
    Permission.read(Role.users()),
    Permission.create(Role.users()),
    Permission.update(Role.users()),
    Permission.delete(Role.users()),
  ]);
  console.log(response);
  const bucketId = response.$id;

  return bucketId;
};

export const listBuckets = async (client: Client): Promise<void> => {
  console.log(bgWhite(green(bold("Running List Buckets API"))));

  const storage = new Storage(client);
  const response = await storage.listBuckets();
  console.log(response);
};

export const deleteFile = async (
  client: Client,
  bucketId: string,
  fileId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running Delete File API"))));

  const storage = new Storage(client);
  const response = await storage.deleteFile(bucketId, fileId);
  console.log(response);
};

export const deleteBucket = async (
  client: Client,
  bucketId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running Delete Bucket API"))));

  const storage = new Storage(client);
  const response = await storage.deleteBucket(bucketId);
  console.log(response);
};
