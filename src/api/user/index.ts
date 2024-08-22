import {
  Client,
  Users,
  Account,
  ID,
} from "https://deno.land/x/appwrite@11.0.0/mod.ts";
import {
  bgWhite,
  green,
  bold,
} from "https://deno.land/std@0.224.0/fmt/colors.ts";

export const createUser = async (
  email: string,
  phone: string,
  password: string,
  name: string,
  client: Client,
  userId: string
): Promise<string> => {
  console.log(bgWhite(green(bold("Running Create User API"))));

  const users = new Users(client);
  const response = await users.create(
    ID.unique(),
    email,
    phone,
    password,
    name
  );
  userId = response.$id;
  console.log(response);

  return userId;
};

export const listUsers = async (client: Client): Promise<void> => {
  console.log(bgWhite(green(bold("Running List Users API"))));

  const users = new Users(client);
  const response = await users.list();
  console.log(response);
};

export const getAccount = async (client: Client): Promise<void> => {
  console.log(bgWhite(green(bold("Running Get Account API"))));

  const account = new Account(client);
  const response = await account.get();
  console.log(response);
};

export const deleteUser = async (
  client: Client,
  userId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running Delete User API"))));

  const users = new Users(client);
  const response = await users.delete(userId);
  console.log(response);
};
