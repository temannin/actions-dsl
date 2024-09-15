import { expect } from "jsr:@std/expect";
import { Run, Triggers, Workflow } from "../mod.ts";

Deno.test("Hello World example produces expected output", () => {
  const workflow = new Workflow("Hello World")
    .when(Triggers.Push({ branches: ["demo/**"] }))
    .addJob({
      name: "hello-world",
      configureSteps: (s) => {
        s.addStep(Run('echo "Hello, World!"'));
      },
    });

  const actual = workflow.compile();
  const expected =
    '# THIS FILE WAS AUTO-GENERATED, PLEASE AVOID EDITING THIS FILE DIRECTLY\nname: Hello World\n\non: \n  push:\n    branches:\n      - demo\/**\n\njobs:\n  hello-world:\n    runs-on: ubuntu-latest\n    steps:\n      - run: |\n          echo "Hello, World!"\n';

  expect(actual).toBe(expected);
});
