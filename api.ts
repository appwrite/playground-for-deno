import * as sdk from "https://deno.land/x/appwrite/mod.ts";

export class API {
    
    private client:any ; 


    constructor() {
        this.client = new sdk.Client();
        this.client.setKey("d4688ed268bbee7216bfee8686e7b31a34e5450b41e69d61de3bd9844626dcc9c4b436ad09cd14123dd4f45f3c8345356304122f380bbf3820d244855267eb904f45b52ad21760916623aad60ee51da97e08c6fb8d5646552f207bb3959d3fd56b57903aff0cd13e618792f916f983d18a49e58912c85f00354eb81ecbd8eb63")
        this.client.setProject("5f0807b93ba5f");
        this.client.setEndpoint("http://localhost/v1");
      }

      async uploadFile(){
        let storage = new sdk.Storage(this.client);
        const fileArray = await Deno.readFile("nature.jpg");
        const fileBlob = new Blob([fileArray.buffer]);
        const file = new File([fileBlob], 'nature.jpg');
    
        let response = await storage.createFile(file, ['*'], ['*']);
        console.log(response);    
    }

    async createCollection(){
        let database = new sdk.Database(this.client);
  
        let response = await database.createCollection(
             'Movies', // Collection Name
             ['*'], // Read permissions
             ['*'], // Write permissions
             [ ]     
     );
     console.log(response);
    }

    async addDoc(){
        const database = new sdk.Database(this.client);

         const response  = await database.createDocument(
                '5f0ebb4adbe22',
                 {
                     'name': 'SpiderMa',
                      'notes':['English', 'action']
                },
                ['*'], ['*']
            );
            console.log(response);
    }

    async createUser(email:string, password:string, name:string, ){
        const users = new sdk.Users(this.client);
        let response = await users.create(email,    password, name);
        console.log(response);
    }
}