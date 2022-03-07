import * as sdk from "https://deno.land/x/appwrite@3.0.0/mod.ts";
import { Collection, User, Document, Storage } from "./api/index.ts";

// Configurations
const client: any = new sdk.Client();
client.setEndpoint("http://YOUR_HOST/v1");
client.setKey(
  "YOU_API_KEY"
);
client.setProject("YOUR_PROJECT_ID");
// client.setJWT('jwt') // Use this to authenticate with JWT generated from client

// API Calls
(async function () {
  const collectionId = await Collection.createCollection(client);
  await Collection.listCollections(client);
  await Collection.listAttributes(client, collectionId);

  const documentId = await Document.createDocument(client, collectionId);
  await Document.listDocuments(client, collectionId);

  await Document.deleteDocument(client, collectionId, documentId);
  await Collection.deleteCollection(client, collectionId);

  const bucketId = await Storage.createBucket(client);
  await Storage.listBuckets(client);

  const fileId = await Storage.uploadFile(client, bucketId);
  await Storage.listFiles(client, bucketId);

  await Storage.deleteFile(client, bucketId, fileId);
  await Storage.deleteBucket(client, bucketId);

  // await User.getAccount(client); //Works only with JWT
  const userId = await User.createUser(
    new Date().getTime() + "@example.com",
    "user@123",
    "Some User",
    client,
    collectionId
  );
  await User.listUsers(client);
  await User.deleteUser(client, userId);
})().catch((err) => {
  console.error(err);
})
