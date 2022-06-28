import { Client } from "./deps.ts";
import { Collection, User, Document, Buckets, Function } from "./api/index.ts";

// Configurations
const client = new Client();
client.setEndpoint("http://8080-appwrite-appwrite-fit3ikbto7v.ws-eu47.gitpod.io/v1");
client.setKey(
  "dc4dcc8c2d6248108e63b9147f2dc1ea2377da15e3663825687ae6ff3076bfef0dd08b724a76458f310623a5e494bc6a396ed70dee4c753be319a677eadf228c24cadf6c64c2921959452b59fd39f42a0712b6278efc919d46200b245b93818b4cce9f5a45623b8b277faa366b74f712deba2c4838a69861266d2c022d167fec"
);
client.setProject("dev");
// client.setJWT('jwt') // Use this to authenticate with JWT generated from client

// API Calls
(async function () {
  await Collection.createDatabase(client);

  const collectionId = await Collection.createCollection(client);
  await Collection.listCollections(client);
  await Collection.listAttributes(client, collectionId);

  const documentId = await Document.createDocument(client, collectionId);
  await Document.listDocuments(client, collectionId);

  await Document.deleteDocument(client, collectionId, documentId);
  await Collection.deleteCollection(client, collectionId);

  const bucketId = await Buckets.createBucket(client);
  await Buckets.listBuckets(client);

  const fileId = await Buckets.uploadFile(client, bucketId);
  await Buckets.listFiles(client, bucketId);

  await Buckets.deleteFile(client, bucketId, fileId);
  await Buckets.deleteBucket(client, bucketId);

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

  const functionId = await Function.createFunction(client);
  await Function.listFunctions(client);
  await Function.uploadDeployment(client, functionId);
  await Function.executeSync(client, functionId);
  await Function.executeAsync(client, functionId);
  await Function.deleteFunction(client, functionId);
})().catch((err) => {
  console.error(err);
})
