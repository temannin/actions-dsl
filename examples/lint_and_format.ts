import { Checkout, JobConfiguration, Run, SetupDeno, Triggers, Workflow } from "../mod.ts";

// two different ways to configure steps.
// 1. return an ordered array of steps
const checkLintingJob: JobConfiguration = {
    name: "lint",
    configureSteps: () => [
        Checkout(),
        SetupDeno(),
        Run("deno lint"),
    ],
    styledName: "Check Linting",
};

// 2. or manually edit the supplied collection; ie: "s"
const checkFormatJob: JobConfiguration = {
    name: "format",
    configureSteps: (s) => {
        s.addStep(Checkout());
        s.addStep(SetupDeno());
        s.addStep(Run("deno fmt --check"));
    },
    styledName: "Check Formatting",
};

const unitTestJob: JobConfiguration = {
    configureSteps: () => [Checkout(), SetupDeno(), Run("deno test")],
    name: "unit-test",
    styledName: "Unit Tests",
};

// combine in workflow
const workflow = new Workflow("Lint, Format, and Unit Test")
    .on([
        Triggers.PullRequest({
            types: ["synchronize", "opened"],
            paths: ['"**.ts"'],
        }),
    ])
    .on([Triggers.Push({ branches: ["main", "master"], paths: ['"**.ts"'] })])
    .addJobs([checkLintingJob, checkFormatJob, unitTestJob]);

Deno.writeTextFile(
    "./.github/workflows/lint.yml",
    workflow.compile(),
);
