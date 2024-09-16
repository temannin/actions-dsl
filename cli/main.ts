// Access the command-line arguments
const args = Deno.args;
if (args.length === 0) Deno.exit(1);

const name = args[
    args.findIndex((val) => {
        return val === "-n";
    }) + 1
];

const starterWorkflow = `
    import { Run, Triggers, Workflow } from "https://raw.githubusercontent.com/temannin/actions-dsl/main/mod.ts";

    const workflow = new Workflow("Hello World")
        .when(Triggers.Push({ branches: ["demo/**"] }))
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
    `;

await Deno.mkdir("./.github/dsl", { recursive: true });
await Deno.writeTextFile(`./.github/dsl/${name}.ts`, starterWorkflow);
