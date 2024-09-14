import {
    Checkout,
    Run,
    RunnerTypes,
    SetupNode,
    Workflow,
} from "https://raw.githubusercontent.com/temannin/actions-dsl/main/mod.ts";

let yaml = new Workflow("Lint Workflow", RunnerTypes.UBUNTU_LATEST)
    .addJob("lint", (s) => {
        s.addStep(Checkout()); // standard git checkout
        s.addStep(SetupNode()); // setup node
        s.addStep(Run("npm i")); // install deps
        s.addStep(Run("npm run lint")); // run lint
    }).compile();

console.log(yaml);
