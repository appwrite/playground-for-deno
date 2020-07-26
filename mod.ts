import * as sdk from "https://deno.land/x/appwrite/mod.ts";
import { API } from './api.ts';


const api = new API(
    'http://localhost/v1', //endpoint
    '', // Enter Apwrite Project ID
    '' // Enter Apwrite Secret Key
    );
    

api.createCollection();
api.listCollection();
api.addDoc();
api.listDoc();
api.uploadFile();
api.createUser(new Date().getTime() + '@example.com', 'user@123','Some User');
api.listUser();
