import { Client } from "./deps.ts";
import { Collection, User, Document, Buckets, Function } from "./api/index.ts";

// Configurations
const client = new Client();
client.setEndpoint("http://YOUR_HOST/v1");
client.setKey(
  "YOUR_API_KEY"
);
client.setProject("YOUR_PROJECT_ID");
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
