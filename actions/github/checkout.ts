import { RunnerTypes } from "../../mod.ts";
import { JobStep } from "../../Workflow.ts";

export interface CheckoutOptions {
    repository?: string;
    ref?: string;
    token?: string;
    "ssh-key"?: string;
    "ssh-known-hosts"?: string;
    "ssh-strict"?: boolean;
    "ssh-user"?: string;
    "persist-credentials"?: boolean;
    path?: string;
    clean?: boolean;
    filter?: string;
    "sparse-checkout"?: string;
    "sparse-checkout-cone-mode"?: boolean;
    "fetch-depth"?: number;
    "fetch-tags"?: boolean;
    "show-progress"?: boolean;
    lfs?: boolean;
    submodules?: boolean | "recursive";
    "set-safe-directory"?: boolean;
    "github-server-url"?: string;
}

export const CHECKOUT = (
    options?: CheckoutOptions,
    customRunnerType?: RunnerTypes,
) => {
    return new JobStep(
        "Checkout",
        "actions/checkout@v4",
        customRunnerType,
        options,
    );
};
