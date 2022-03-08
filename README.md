# Playground for Deno
Simple examples that help you to get started with Appwrite + Deno (=❤️)

**Work in Progress**

Appwrite playground for Deno is a simple way to explore the Deno integration with Appwrite SDK. Use the source code to understand how to use the different Appwrite SDK features with Deno.

## Get Started

This playground doesn't include any deno best practices but rather intended to show some of the most simple examples and use cases of using the Appwrite API in your deno application.

## Requirements
* A system with Deno or Docker installed.
* An Appwrite instance.
* An Appwrite project created in the console.
* An Appwrite API key created in the console.

### Installation

1. Clone this repository.
2. `cd` into the repository.
3. Open the `mod.ts` file found in the root of the cloned repository.
4. Copy Project ID, endpoint and API key from Appwrite console into `mod.ts`
5. Run the playground:
    Deno:
        - Install dependencies `deno cache src/mod.ts`
        - Execute the command `deno run -A src/mod.ts`
    Docker:
        - Execute the command `docker compose up`
6. You will see the JSON response in the console.

### API's Covered

- Databse
    * Create Collection
    * List Collections
    * Delete Collection
    * Create Document
    * List Documents
    * Delete Document

- Storage
    * Create Bucket
    * List Buckets
    * Delete Bucket
    * Upload File
    * List Files
    * Delete File

- Users
    * Create User
    * List Users
    * Delete User

- Functions
    * Create Function
    * List Functions
    * Delete Function
    * Upload Deployment
    * Execute function (sync)
    * Execute function (async)

## Contributing

All code contributions - including those of people having commit access - must go through a pull request and approved by a core developer before being merged. This is to ensure proper review of all the code.

We truly ❤️ pull requests! If you wish to help, you can learn more about how you can contribute to this project in the [contribution guide](https://github.com/appwrite/appwrite/blob/master/CONTRIBUTING.md).

## Security

For security issues, kindly email us [security@appwrite.io](mailto:security@appwrite.io) instead of posting a public issue in GitHub.

## Follow Us

Join our growing community around the world! Follow us on [Twitter](https://twitter.com/appwrite), [Facebook Page](https://www.facebook.com/appwrite.io), [Facebook Group](https://www.facebook.com/groups/appwrite.developers/) or join our [Discord Server](https://appwrite.io/discord) for more help, ideas and discussions.

