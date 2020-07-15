import * as sdk from "https://deno.land/x/appwrite/mod.ts";

export class API {
    
    private client:any ; 


    constructor(endpoint: string, project: string, key: string) {
        this.client = new sdk.Client();
        this.client.setEndpoint(endpoint);
        this.client.setKey(key);
        this.client.setProject(project);
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
                     'name': 'Spider Man',
                      'notes':['English', 'action', 'Advanture']
                },
                ['*'], ['*']
            );
            console.log(response);
    }

    async listDoc(){
        const database = new sdk.Database(this.client);
        const response  = await database.listDocuments('5f0ebb4adbe22');
        console.log(response);
    }

    async createUser(email:string, password:string, name:string, ){
        const users = new sdk.Users(this.client);
        let response = await users.create(email,    password, name);
        console.log(response);
    }
}