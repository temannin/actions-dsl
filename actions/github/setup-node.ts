import { RunnerTypes } from "../../RunnerTypes.ts";
import { JobStep } from "../../Workflow.ts";

export interface NodeOptions {
  "node-version"?: string;
  "node-version-file"?: string;
  "check-latest"?: boolean;
  architecture?: string;
  token?: string;
  cache?: string;
  "cache-dependency-path"?: string;
  "registry-url"?: string;
  scope?: string;
  "always-auth"?: string;
}

export const SETUP_NODE = (
  options?: NodeOptions,
  customRunnerType?: RunnerTypes,
) => {
  return new JobStep(
    "Setup Node",
    "actions/setup-node@v4",
    customRunnerType,
    options,
  );
};
