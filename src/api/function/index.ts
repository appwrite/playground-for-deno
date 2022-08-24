import { Client, Functions, InputFile } from "../../deps.ts";
import { bgWhite, green, bold } from "../../deps.ts";

class Function {
  static async createFunction(
    client: Client,
  ): Promise<string> {
    console.log(bgWhite(green(bold("Running Create Function API"))));

    const functions = new Functions(client);
    const response = await functions.create(
      "unique()",
      "Node Hello World",
      ["role:all"],
      "node-16.0"
    );
    console.log(response);
    const functionId = response.$id;

    return functionId;
  }

  static async listFunctions(client: Client): Promise<void> {
    console.log(bgWhite(green(bold("Running List Functions API"))));

    const functions = new Functions(client);
    const response = await functions.list();
    console.log(response);
  }

  static async executeSync(client: Client, functionId: string): Promise<void> {
    console.log(bgWhite(green(bold("Running Execute Function API (sync)"))));

    const functions = new Functions(client);
    const response = await functions.createExecution(functionId, '', false);
    console.log(response);
  }

  static async executeAsync(client: Client, functionId: string): Promise<void> {
    console.log(bgWhite(green(bold("Running Execute Function API (async)"))));

    const functions = new Functions(client);
    const response = await functions.createExecution(functionId, '', true);
    console.log(response);
    const executionId = response.$id;

    console.log("Waiting a little to ensure execution is finished ...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const asyncResponse = await functions.getExecution(functionId, executionId);
    console.log(asyncResponse);
  }

  static async uploadDeployment(client: Client, functionId: string): Promise<void> {
    console.log(bgWhite(green(bold("Running Upload Deployment API"))));

    const functions = new Functions(client);
    const response = await functions.createDeployment(functionId, "index.js", InputFile.fromPath("./resources/code.tar.gz", "code.tar.gz"), true);
    console.log(response);


    console.log("Waiting a little to ensure deployment has built ...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  static async deleteFunction(
    client: Client,
    functionId: string
  ): Promise<void> {
    console.log(bgWhite(green(bold("Running Delete Function API"))));

    const functions = new Functions(client);
    const response = await functions.delete(functionId);
    console.log(response);
  }
}

export default Function;
