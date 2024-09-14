import {
  Checkout,
  JobConfiguration,
  Run,
  SetupDeno,
  Triggers,
  Workflow,
} from "../mod.ts";

const lintJob: JobConfiguration = {
  name: "lint",
  configureSteps: (s) => {
    s.addStep(Checkout()); // standard git checkout
    s.addStep(SetupDeno({ "deno-version": "v1.x" })); // setup deno
    s.addStep(Run("deno lint")); // run lint
  },
  styledName: "Check Linting",
};

const formatJob: JobConfiguration = {
  name: "format",
  configureSteps: (s) => {
    s.addStep(Checkout());
    s.addStep(SetupDeno());
    s.addStep(Run("deno fmt --check"));
  },
  styledName: "Check Formatting",
};

const workflow = new Workflow("Check Linting and Formatting")
  .on([
    Triggers.PullRequest({
      types: ["synchronize", "opened"],
      paths: ['"**.ts"'],
    }),
  ])
  .on([Triggers.Push({ branches: ["main", "master"], paths: ['"**.ts"'] })])
  .addJobs([lintJob, formatJob]);

Deno.writeTextFile(
  "./.github/workflows/lint.yml",
  workflow.compile(),
);
