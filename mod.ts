import { CHECKOUT, SETUP_NODE } from "./actions/github/mod.ts";
import { JobStep } from "./Workflow.ts";

export { Workflow } from "./Workflow.ts";
export { RunnerTypes } from "./RunnerTypes.ts";

export * from "./actions/mod.ts";

export { GITHUB_VARIABLES } from "./github/mod.ts";

export const Actions = {
    "GitHub": {
        "Checkout": CHECKOUT,
        "SetupNode": SETUP_NODE,
    },
};

export const Checkout = CHECKOUT;
export const SetupNode = SETUP_NODE;

export const Run = (command: string) => {
    return new JobStep(undefined, undefined, command, undefined);
};
