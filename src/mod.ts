import * as sdk from "https://deno.land/x/appwrite@0.2.1/mod.ts";
import { Collection, User, Document } from "./api";
// Configurations

const client: any = new sdk.Client();
client.setEndpoint("http://localhost/v1");
client.setKey(
  "d4688ed268bbee7216bfee8686e7b31a34e5450b41e69d61de3bd9844626dcc9c4b436ad09cd14123dd4f45f3c8345356304122f380bbf3820d244855267eb904f45b52ad21760916623aad60ee51da97e08c6fb8d5646552f207bb3959d3fd56b57903aff0cd13e618792f916f983d18a49e58912c85f00354eb81ecbd8eb63"
);
// client.setJWT('jwt') // Use this to authenticate with JWT generated from client
client.setProject("5f0807b93ba5f");
let collectionId: string;
let userId: any = "";

// API Calls

(async function () {
  await Collection.createCollection(client, collectionId);
  await Collection.listCollection(client);

  await Document.uploadFile(client);
  await Document.listDoc(client, collectionId);
  await Document.addDoc(client, collectionId);
  await User.createUser(
    new Date().getTime() + "@example.com",
    "user@123",
    "Some User",
    client,
    collectionId
  );
  await User.listUser(client);
  await User.getAccount(client); //Works only with JWT
})();
