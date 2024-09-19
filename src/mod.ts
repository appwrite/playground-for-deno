import { Client } from "https://deno.land/x/appwrite@12.0.0/mod.ts";
import { Databases, User, Document, Storage, Function } from "./api/index.ts";

// Configurations
const client = new Client();
client.setEndpoint("http://YOUR_HOST/v1");
client.setKey("YOUR_API_KEY");
client.setProject("YOUR_PROJECT_ID");
// client.setJWT('jwt') // Use this to authenticate with JWT generated from client

// API Calls
(async function () {
  const databaseId = await Databases.createDatabase(client);
  await Databases.createCollection(client, databaseId);
  await Databases.listDatabases(client);

  const collectionId = await Databases.createCollection(client, databaseId);
  await Databases.listCollections(client, databaseId);
  await Databases.listAttributes(client, databaseId, collectionId);

  const documentId = await Document.createDocument(
    client,
    databaseId,
    collectionId
  );
  await Document.listDocuments(client, databaseId, collectionId);

  await Document.deleteDocument(client, databaseId, collectionId, documentId);
  await Databases.deleteCollection(client, databaseId, collectionId);

  const bucketId = await Storage.createBucket(client);
  await Storage.listBuckets(client);

  const fileId = await Storage.uploadFile(client, bucketId);
  await Storage.listFiles(client, bucketId);

  await Storage.deleteFile(client, bucketId, fileId);
  await Storage.deleteBucket(client, bucketId);

  // await User.getAccount(client); //Works only with JWT
  const userId = await User.createUser(
    new Date().getTime() + "@example.com",
    "+1234567890",
    "user@123",
    "Some User",
    client,
    collectionId
  );
  await User.listUsers(client);
  await User.deleteUser(client, userId);

  const functionId = await Function.createFunction(client);
  await Function.listFunctions(client);
  await Function.uploadDeployment(client, functionId);
  await Function.executeSync(client, functionId);
  await Function.executeAsync(client, functionId);
  await Function.deleteFunction(client, functionId);
})().catch((err) => {
  console.error(err);
});
