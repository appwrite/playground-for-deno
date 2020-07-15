import * as sdk from "https://deno.land/x/appwrite/mod.ts";
import { API } from './api.ts';


const api = new API(
    'http://localhost/v1', //endpoint
    '', // Project ID
    '' //Secret Key
    );
    

//api.createCollection();
api.addDoc();
api.uploadFile();
api.createUser('someuser1@example.com', 'user@123','Some User');
api.listDoc();

