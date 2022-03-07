import * as sdk from "https://deno.land/x/appwrite@3.0.0/mod.ts";
import { bgWhite, green, bold } from "https://deno.land/std/fmt/colors.ts";

namespace User {
  export const createUser = async (
    email: string,
    password: string,
    name: string,
    client: sdk.Client,
    userId: string
  ): Promise<string> => {
    console.log(bgWhite(green(bold("Running Create User API"))));

    const users = new sdk.Users(client);
    let response = await users.create("unique()", email, password, name);
    userId = response.$id;
    console.log(response);

    return userId;
  };

  export const listUsers = async (client: sdk.Client): Promise<void> => {
    console.log(bgWhite(green(bold("Running List Users API"))));

    const users = new sdk.Users(client);
    let response = await users.list();
    console.log(response);
  };

  export const getAccount = async (client: sdk.Client): Promise<void> => {
    console.log(bgWhite(green(bold("Running Get Account API"))));

    const account = new sdk.Account(client);
    let response = await account.get();
    console.log(response);
  };

  export const deleteUser = async (client: sdk.Client, userId: string): Promise<void> => {
    console.log(bgWhite(green(bold("Running Delete User API"))));

    const users = new sdk.Users(client);
    let response = await users.delete(userId);
    console.log(response);
  };
}

export default User;
