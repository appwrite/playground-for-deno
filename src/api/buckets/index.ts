import { Client, Storage, InputFile } from "../../deps.ts";
import { bgWhite, green, bold } from "../../deps.ts";

class Buckets {
  static async uploadFile(client: Client, bucketId: string): Promise<string> {
    console.log(bgWhite(green(bold("Running Upload File API"))));

    const storage = new Storage(client);
    const response = await storage.createFile(bucketId, "unique()", InputFile.fromPath("./resources/nature.jpg", "nature.jpg"), ["role:all"], ["role:all"]);
    console.log(response);
    const fileId = response.$id;

    return fileId;
  }

  static async listFiles(
    client: Client,
    bucketId: string
  ): Promise<void> {
    console.log(bgWhite(green(bold("Running List Files API"))));

    const storage = new Storage(client);
    const response = await storage.listFiles(bucketId);
    console.log(response);
  }

  static async createBucket(
    client: Client,
  ): Promise<string> {
    console.log(bgWhite(green(bold("Running Create Bucket API"))));

    const storage = new Storage(client);

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
  }


  static async listBuckets(
    client: Client
  ): Promise<void> {
    console.log(bgWhite(green(bold("Running List Buckets API"))));

    const storage = new Storage(client);
    const response = await storage.listBuckets();
    console.log(response);
  }

  static async deleteFile(
    client: Client,
    bucketId: string,
    fileId: string
  ): Promise<void> {
    console.log(bgWhite(green(bold("Running Delete File API"))));

    const storage = new Storage(client);
    const response = await storage.deleteFile(bucketId, fileId);
    console.log(response);
  }

  static async deleteBucket(
    client: Client,
    bucketId: string
  ): Promise<void> {
    console.log(bgWhite(green(bold("Running Delete Bucket API"))));

    const storage = new Storage(client);
    const response = await storage.deleteBucket(bucketId);
    console.log(response);
  }
}

export default Buckets;
