import * as sdk from "https://deno.land/x/appwrite/mod.ts";
import { API } from './api.ts';

// let client = new sdk.Client();
// client.setKey("d4688ed268bbee7216bfee8686e7b31a34e5450b41e69d61de3bd9844626dcc9c4b436ad09cd14123dd4f45f3c8345356304122f380bbf3820d244855267eb904f45b52ad21760916623aad60ee51da97e08c6fb8d5646552f207bb3959d3fd56b57903aff0cd13e618792f916f983d18a49e58912c85f00354eb81ecbd8eb63")
// client.setProject("5f0807b93ba5f");
// client.setEndpoint("http://localhost/v1");
// uploadFile(client);
const api = new API();
//api.createCollection();
//api.addDoc();
//api.uploadFile();
api.createUser('user1@example.com', 'user@123','User');

