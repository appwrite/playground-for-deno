import * as sdk from "https://deno.land/x/appwrite@0.0.2/mod.ts";

export class API {
    
    private client:any ; 
    private collectionId:any = '';
    private userId:any = '';


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
  
        let response:any = await database.createCollection(
             'Movies', // Collection Name
             ['*'], // Read permissions
             ['*'], // Write permissions
             [
                 { "label": "Name", "key": "name", "type": "text", "default": "Empty Name", "required": true, "array": false, }, 
                 { "label": "release_year", "key": "release_year", "type": "numeric", "default": 1970, "required": true, "array": false, },
            ]     
     );
     this.collectionId = response.$id;
     console.log(response);
    }

    async listCollection(){
        const database = new sdk.Database(this.client);
        let response: any = await database.listCollections();
        let collection = response.collections[0];
        console.log(collection);
    }

    async getCollection(){
        const database = new sdk.Database(this.client);
        let response: any = await database.getCollection(this.collectionId);
        console.log(response);
    }

    async addDoc(){
        const database = new sdk.Database(this.client);

         const response  = await database.createDocument(
                '5f1d6e60beaa3',
                 {
                     'name': 'Spider Man',
                      'release_year': 1920
                },
                ['*'], ['*']
            );
            console.log(response);
    }

    async listDoc(){
        const database = new sdk.Database(this.client);
        const response:any  = await database.listDocuments('5f18559bc4528');
        console.log(response);
    }

    async createUser(email:string, password:string, name:string, ){
        const users = new sdk.Users(this.client);
        let response:any = await users.create(email,    password, name);
        this.userId = response.$id;
        console.log(response);
    }

    async listUser(){
        const users = new sdk.Users(this.client);
        let response = await users.list();
        console.log(response);
    }

    async getUser(){
        const users = new sdk.Users(this.client);
        let response = await users.get(this.userId);
        console.log(response);
    }

    async getTeamMemberships(teamId:string){
        const team = new sdk.Teams(this.client);
        let response = await team.getMemberships(teamId);
        console.log(response);
    }
}