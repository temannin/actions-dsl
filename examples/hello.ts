import { Run, Triggers, Workflow } from "../mod.ts";

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
