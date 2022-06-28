import { Client, Users, Account } from "../../deps.ts";
import { bgWhite, green, bold } from "../../deps.ts";

class User {
  static async createUser(
    email: string,
    password: string,
    name: string,
    client: Client,
    userId: string
  ): Promise<string> {
    console.log(bgWhite(green(bold("Running Create User API"))));

    const users = new Users(client);
    const response = await users.create("unique()", email, password, name);
    userId = response.$id;
    console.log(response);

    return userId;
  }

  static async listUsers(client: Client): Promise<void> {
    console.log(bgWhite(green(bold("Running List Users API"))));

    const users = new Users(client);
    const response = await users.list();
    console.log(response);
  }

  static async getAccount(client: Client): Promise<void> {
    console.log(bgWhite(green(bold("Running Get Account API"))));

    const account = new Account(client);
    const response = await account.get();
    console.log(response);
  }

  static async deleteUser(client: Client, userId: string): Promise<void> {
    console.log(bgWhite(green(bold("Running Delete User API"))));

    const users = new Users(client);
    const response = await users.delete(userId);
    console.log(response);
  }
}

export default User;
