import * as sdk from "https://deno.land/x/appwrite@0.2.1/mod.ts";
import { bgWhite, green, bold } from "https://deno.land/std/fmt/colors.ts";

namespace User {
  export const createUser = async (
    email: string,
    password: string,
    name: string,
    client: any,
    userId: any
  ): Promise<void> => {
    const users = new sdk.Users(client);
    let response: any = await users.create("unique()", email, password, name);
    userId = response.$id;
    console.log(bgWhite(green(bold("Running Create User API"))));
    console.log(response);
  };

  export const listUser = async (client: any): Promise<void> => {
    const users = new sdk.Users(client);
    console.log(bgWhite(green(bold("Running List User API"))));
    let response = await users.list();
    console.log(response);
  };

  export const getAccount = async (client: any): Promise<void> => {
    const account = new sdk.Account(client);
    console.log(bgWhite(green(bold("Running Get Account API"))));
    let response = await account.get();
    console.log(response);
  };
}

export default User;
