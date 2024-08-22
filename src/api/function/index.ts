import {
  Client,
  Functions,
  ID,
} from "https://deno.land/x/appwrite@11.0.0/mod.ts";
import {
  bgWhite,
  green,
  bold,
} from "https://deno.land/std@0.224.0/fmt/colors.ts";
import { Runtime } from "https://deno.land/x/appwrite@11.0.0/src/enums/runtime.ts";
import { InputFile } from "https://deno.land/x/appwrite@11.0.0/src/inputFile.ts";

export const createFunction = async (client: Client): Promise<string> => {
  console.log(bgWhite(green(bold("Running Create Function API"))));

  const functions = new Functions(client);
  const response = await functions.create(
    ID.unique(),
    "Node Hello World",
    Runtime.Node180
  );
  console.log(response);
  const functionId = response.$id;

  return functionId;
};

export const listFunctions = async (client: Client): Promise<void> => {
  console.log(bgWhite(green(bold("Running List Functions API"))));

  const functions = new Functions(client);
  const response = await functions.list();
  console.log(response);
};

export const executeSync = async (
  client: Client,
  functionId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running Execute Function API (sync)"))));

  const functions = new Functions(client);
  const response = await functions.createExecution(functionId, "", false);
  console.log(response);
};

export const executeAsync = async (
  client: Client,
  functionId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running Execute Function API (async)"))));

  const functions = new Functions(client);
  const response = await functions.createExecution(functionId, "", true);
  console.log(response);
  const executionId = response.$id;

  console.log("Waiting a little to ensure execution is finished ...");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const asyncResponse = await functions.getExecution(functionId, executionId);
  console.log(asyncResponse);
};

export const uploadDeployment = async (
  client: Client,
  functionId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running Upload Deployment API"))));

  const functions = new Functions(client);
  const response = await functions.createDeployment(
    functionId,
    InputFile.fromPath("./resources/code.tar.gz", "code.tar.gz"),
    true,
    "index.js"
  );
  console.log(response);

  console.log("Waiting a little to ensure deployment has built ...");
  await new Promise((resolve) => setTimeout(resolve, 5000));
};

export const createExecution = async (
  client: Client,
  functionId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running Create Execution API"))));

  const functions = new Functions(client);
  const response = await functions.createExecution(functionId);
  console.log(response);
};

export const deleteFunction = async (
  client: Client,
  functionId: string
): Promise<void> => {
  console.log(bgWhite(green(bold("Running Delete Function API"))));

  const functions = new Functions(client);
  const response = await functions.delete(functionId);
  console.log(response);
};
