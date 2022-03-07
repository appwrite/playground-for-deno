import * as sdk from "https://deno.land/x/appwrite@3.0.0/mod.ts";
import { bgWhite, green, bold } from "https://deno.land/std/fmt/colors.ts";

namespace Function {
  export const createFunction = async (
    client: sdk.Client,
  ): Promise<string> => {
    console.log(bgWhite(green(bold("Running Create Function API"))));

    const functions = new sdk.Functions(client);
    const response = await functions.create(
      "unique()",
      "Node Hello World",
      ["role:all"],
      "node-16.0"
    );
    console.log(response);
    const functionId = response.$id;

    return functionId;
  };

  export const listFunctions = async (client: sdk.Client): Promise<void> => {
    console.log(bgWhite(green(bold("Running List Functions API"))));

    const functions = new sdk.Functions(client);
    let response = await functions.list();
    console.log(response);
  };

  export const executeSync = async (client: sdk.Client, functionId: string): Promise<void> => {
    console.log(bgWhite(green(bold("Running Execute Function API (sync)"))));

    const functions = new sdk.Functions(client);
    let response = await functions.createExecution(functionId, '', false);
    console.log(response);
  };

  export const executeAsync = async (client: sdk.Client, functionId: string): Promise<void> => {
    console.log(bgWhite(green(bold("Running Execute Function API (async)"))));

    const functions = new sdk.Functions(client);
    let response = await functions.createExecution(functionId, '', true);
    console.log(response);
    const executionId = response.$id;

    console.log("Waiting a little to ensure execution is finished ...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    let asyncResponse = await functions.getExecution(functionId, executionId);
    console.log(asyncResponse);
  };

  export const uploadDeployment = async (client: sdk.Client, functionId: string): Promise<void> => {
    console.log(bgWhite(green(bold("Running Upload Deployment API"))));

    const functions = new sdk.Functions(client);
    let response = await functions.createDeployment(functionId, "index.js", "./resources/code.tar.gz", true);
    console.log(response);


    console.log("Waiting a little to ensure deployment has built ...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  export const deleteFunction = async (
    client: sdk.Client,
    functionId: string
  ): Promise<void> => {
    console.log(bgWhite(green(bold("Running Delete Function API"))));

    const functions = new sdk.Functions(client);
    const response = await functions.delete(functionId);
    console.log(response);
  };
}

export default Function;
