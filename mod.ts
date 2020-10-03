import * as sdk from "https://deno.land/x/appwrite@0.0.2/mod.ts";
import { bgWhite, green, bold } from "https://deno.land/std/fmt/colors.ts";

//Configurations

const client: any = new sdk.Client();
client.setEndpoint("http://localhost/v1");
client.setKey(
  "d4688ed268bbee7216bfee8686e7b31a34e5450b41e69d61de3bd9844626dcc9c4b436ad09cd14123dd4f45f3c8345356304122f380bbf3820d244855267eb904f45b52ad21760916623aad60ee51da97e08c6fb8d5646552f207bb3959d3fd56b57903aff0cd13e618792f916f983d18a49e58912c85f00354eb81ecbd8eb63",
);
client.setProject("5f0807b93ba5f");
let collectionId: string;
let userId: any = "";

//API Calls
//api.createCollection();
// api.listCollection();
// api.addDoc();
// api.listDoc();
// api.uploadFile();
// api.createUser(new Date().getTime() + '@example.com', 'user@123','Some User');
// api.listUser();

//List of Api Definitions
const createCollection = async (): Promise<void> => {
  let database = new sdk.Database(client);
  let response: any = await database.createCollection(
    "Movies", // Collection Name
    ["*"], // Read permissions
    ["*"], // Write permissions
    [
      {
        "label": "Name",
        "key": "name",
        "type": "text",
        "default": "Empty Name",
        "required": true,
        "array": false,
      },
      {
        "label": "release_year",
        "key": "release_year",
        "type": "numeric",
        "default": 1970,
        "required": true,
        "array": false,
      },
    ],
  );
  collectionId = response.$id;
  console.log(bgWhite(green(bold("Running Create Collection API"))));
  //console.log(bgWhite(green(bold(''))));
  console.log(response);
};

const listCollection = async (): Promise<void> => {
  const database = new sdk.Database(client);
  let response: any = await database.listCollections();
  let collection = response.collections[0];
  console.log(bgWhite(green(bold("Running List Collection API"))));
  console.log(collection);
};

const addDoc = async (): Promise<void> => {
  const database = new sdk.Database(client);

  const response = await database.createDocument(
    collectionId,
    {
      "name": "Spider Man",
      "release_year": 1920,
    },
    ["*"],
    ["*"],
  );
  console.log(response);
};

const listDoc = async (): Promise<void> => {
  const database = new sdk.Database(client);
  const response: any = await database.listDocuments(collectionId);
  console.log(bgWhite(green(bold("Running List Documents API"))));
  console.log(response);
};

const uploadFile = async (): Promise<void> => {
  let storage = new sdk.Storage(client);
  const fileArray = await Deno.readFile("nature.jpg");
  const fileBlob = new Blob([fileArray.buffer]);
  const file = new File([fileBlob], "nature.jpg");

  let response = await storage.createFile(file, ["*"], ["*"]);
  console.log(bgWhite(green(bold("Running Upload File API"))));
  console.log(response);
};

const createUser = async (
  email: string,
  password: string,
  name: string,
): Promise<void> => {
  const users = new sdk.Users(client);
  let response: any = await users.create(email, password, name);
  userId = response.$id;
  console.log(bgWhite(green(bold("Running Create User API"))));
  console.log(response);
};

const listUser = async (): Promise<void> => {
  const users = new sdk.Users(client);
  let response = await users.list();
  console.log(bgWhite(green(bold("Running List User API"))));

  console.log(response);
};

await createCollection();
await listCollection();
await addDoc();
await listDoc();
await uploadFile();
await createUser(
  new Date().getTime() + "@example.com",
  "user@123",
  "Some User",
);
await listUser();
