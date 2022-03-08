import * as sdk from "https://deno.land/x/appwrite@3.0.0/mod.ts";
import { bgWhite, green, bold } from "https://deno.land/std/fmt/colors.ts";

namespace Storage {
  export const uploadFile = async (client: sdk.Client, bucketId: string): Promise<string> => {
    console.log(bgWhite(green(bold("Running Upload File API"))));

    let storage = new sdk.Storage(client);
    let response = await storage.createFile(bucketId, "unique()", "./resources/nature.jpg", ["role:all"], ["role:all"]);
    console.log(response);
    const fileId = response.$id;

    return fileId;
  };

  export const listFiles = async (
    client: sdk.Client,
    bucketId: string
  ): Promise<void> => {
    console.log(bgWhite(green(bold("Running List Files API"))));

    const storage = new sdk.Storage(client);
    const response = await storage.listFiles(bucketId);
    console.log(response);
  };

  export const createBucket = async (
    client: sdk.Client,
  ): Promise<string> => {
    console.log(bgWhite(green(bold("Running Create Bucket API"))));

    const storage = new sdk.Storage(client);

    const response = await storage.createBucket(
      "unique()",
      "All Files",
      "bucket",
      ["role:all"],
      ["role:all"]
    );
    console.log(response);
    const bucketId = response.$id;

    return bucketId;
  };


  export const listBuckets = async (
    client: sdk.Client
  ): Promise<void> => {
    console.log(bgWhite(green(bold("Running List Buckets API"))));

    const storage = new sdk.Storage(client);
    const response = await storage.listBuckets();
    console.log(response);
  };

  export const deleteFile = async (
    client: sdk.Client,
    bucketId: string,
    fileId: string
  ): Promise<void> => {
    console.log(bgWhite(green(bold("Running Delete File API"))));

    const storage = new sdk.Storage(client);
    const response = await storage.deleteFile(bucketId, fileId);
    console.log(response);
  };

  export const deleteBucket = async (
    client: sdk.Client,
    bucketId: string
  ): Promise<void> => {
    console.log(bgWhite(green(bold("Running Delete Bucket API"))));

    const storage = new sdk.Storage(client);
    const response = await storage.deleteBucket(bucketId);
    console.log(response);
  };
}

export default Storage;
