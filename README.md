# `actions-dsl`

`actions-dsl` is an open-source project that leverages Deno to create a Domain-Specific Language (DSL) for GitHub Actions. This DSL aims to simplify and enhance the creation, management, and configuration of GitHub Actions workflows.

## Features

- **Simple Syntax**: Define GitHub Actions workflows using a more readable and concise syntax.
- **Type Safety**: Benefit from TypeScript's type checking and IntelliSense for GitHub Actions configuration.
- **Deno Integration**: Utilize the power of Deno for running and managing your DSL scripts.
- **Extensible**: Easily extend the DSL to support additional GitHub Actions features and custom actions.

## Installation

### Prerequisites

- [Deno](https://deno.land/) (v1.0 or later) installed on your system.

### Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/actions-dsl.git
   cd actions-dsl
   ```

2. **Install Deno Dependencies**:
   The project uses Deno to manage dependencies. Ensure you have the necessary modules installed by running:
   ```bash
   deno run --allow-read --allow-write https://deno.land/x/deps.ts
   ```

3. **Create Your DSL Script**:
   Write your GitHub Actions workflow in a `.dsl.ts` file. For example:
   ```typescript
   import { defineWorkflow } from "./src/mod.ts";

   defineWorkflow({
     name: "CI",
     on: "push",
     jobs: {
       build: {
         runs_on: "ubuntu-latest",
         steps: [
           { uses: "actions/checkout@v2" },
           { run: "npm install" },
           { run: "npm test" }
         ]
       }
     }
   });
   ```

4. **Run Your DSL Script**:
   To compile and generate the corresponding GitHub Actions YAML, use:
   ```bash
   deno run --allow-read --allow-write src/cli.ts path/to/your-script.dsl.ts
   ```

## Usage

- **Define Workflows**: Use the provided functions to define and configure your GitHub Actions workflows in TypeScript.
- **Generate YAML**: Convert your `.dsl.ts` files into GitHub Actions YAML configurations for use in your repositories.

## Contributing

We welcome contributions to `actions-dsl`! Please follow these steps to contribute:

1. **Fork the Repository**.
2. **Create a New Branch** for your feature or fix.
3. **Make Your Changes** and ensure that the code adheres to our coding standards.
4. **Submit a Pull Request** with a clear description of your changes.

## Documentation

For detailed documentation on how to use and extend the DSL, check the [docs](https://github.com/yourusername/actions-dsl/docs).

## License

`actions-dsl` is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please open an issue on the [GitHub repository](https://github.com/yourusername/actions-dsl/issues).
