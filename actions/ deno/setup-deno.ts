import { RunnerTypes } from "../../RunnerTypes.ts";
import { JobStep } from "../../Workflow.ts";

interface DenoOptions {
  /**
   * The Deno version to install. Can be a semver version of a stable release, 'canary' for the latest canary, or the Git hash of a specific canary release.
   * Defaults to "1.x".
   */
  "deno-version"?: string;

  /**
   * File containing the Deno version to install, such as .dvmrc or .tool-versions.
   */
  "deno-version-file"?: string;

  /**
   * The name to use for the binary. Defaults to "deno".
   */
  "deno-binary-name"?: string;
}

export const SETUP_DENO = (
  options?: DenoOptions,
  customRunnerType?: RunnerTypes,
) => {
  return new JobStep(
    "Setup Deno",
    "denoland/setup-deno@v1",
    customRunnerType,
    options,
  );
};
