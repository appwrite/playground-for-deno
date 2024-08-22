import { Client } from "https://deno.land/x/appwrite@11.0.0/mod.ts";
import { Databases, User, Document, Storage, Function } from "./api/index.ts";

// Configurations
const client = new Client();
client.setEndpoint("https://v16.appwrite.org/v1");
client.setKey(
  "standard_e7b66c0c36e4dc4c50190aa9dda77b09a8c94bc22e84ce12304da1c5be9bc9ba0046648031780242b6e19614297ab201785f0df28ece5953bd5d608ca35e13fd2688e200350ed0598de05249546683cc8187de6a7e2c00eb2ceb8973c5b8d23c476fc988b1b882bbd64ef72031da5c8fb53a87f89c46c266d26f1eb0bf795a39"
);
client.setProject("66c7080900194ba26959");
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
