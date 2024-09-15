# `actions-dsl`

[![Check Linting and Formatting](https://github.com/temannin/actions-dsl/actions/workflows/lint.yml/badge.svg?branch=main&event=push)](https://github.com/temannin/actions-dsl/actions/workflows/lint.yml)

`actions-dsl` is an open-source project that leverages Deno to create a
Domain-Specific Language (DSL) for GitHub Actions. This DSL aims to simplify and
enhance the creation, management, and configuration of GitHub Actions workflows.

## Features

- **Simple Syntax**: Define GitHub Actions workflows using a more readable and
  concise syntax.
- **Type Safety**: Benefit from TypeScript's type checking and IntelliSense for
  GitHub Actions configuration.
- **Deno Integration**: Utilize the power of Deno for running and managing your
  DSL scripts.
- **Extensible**: Easily extend the DSL to support additional GitHub Actions
  features and custom actions.

## Installation

### Prerequisites

- [Deno](https://deno.land/) (v1.0 or later) installed on your system.

### Getting Started

1. **Create Your DSL Script**: Write your GitHub Actions workflow in a `.ts`
   file. For example:
   ```typescript
   import {
     Run,
     Triggers,
     Workflow,
   } from "https://raw.githubusercontent.com/temannin/actions-dsl/main/mod.ts";

   const workflow = new Workflow("Hello World")
     .on(
       Triggers.Push({ branches: ["demo/**"] }),
     )
     .addJob({
       name: "hello-world",
       configureSteps: (s) => {
         s.addStep(Run('echo "Hello, World!"'));
       },
     });

   Deno.writeTextFile(
     "./.github/workflows/hello_world.yml",
     workflow.compile(),
   );

   // Produces the .yml file below!
   /**
     * name: Hello World

    on:
      push:
        branches:
          - demo/**

    jobs:
      hello-world:
        runs-on: ubuntu-latest
        steps:
          - run: echo "Hello, World!"
    */
   ```

2. That's it! Because of the greatness of Deno, there's no `npm i`. Bring in
   what you want.

## Usage

- **Define Workflows**: Use the provided functions to define and configure your
  GitHub Actions workflows in TypeScript.

## Contributing

We welcome contributions to `actions-dsl`! Please follow these steps to
contribute:

1. **Fork the Repository**.
2. **Create a New Branch** for your feature or fix.
3. **Make Your Changes** and ensure that the code adheres to our coding
   standards.
4. **Submit a Pull Request** with a clear description of your changes.

## License

`actions-dsl` is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please open an issue on the
[GitHub repository](https://github.com/temannin/actions-dsl/issues).
