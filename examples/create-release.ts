import { GITHUB_VARIABLES, Run, Triggers, Workflow } from "../mod.ts";

const _workflow = new Workflow("Create Release")
  .allow({ contents: "write" })
  .when([Triggers.Push({ "branches": "main" })])
  .do({
    name: "create-tag",
    configureSteps: () => {
      return [Run(
        `
                curl -f -L \
                    -X POST \
                    -H "Accept: application/vnd.github+json" \
                    -H "Authorization: Bearer ${GITHUB_VARIABLES.TOKEN}" \
                    -H "X-GitHub-Api-Version: 2022-11-28" \
                    ${GITHUB_VARIABLES.API_URL_FOR_REPO}/releases \
                    -d '{"tag_name":"v1.0.0","target_commitish":"main","name":"v1.0.0","body":"Description of the release","draft":false,"prerelease":false,"generate_release_notes":false}'
                `,
      )];
    },
  });

// Deno.writeTextFile(
//     "./.github/workflows/create-release.yml",
//     workflow.compile(),
// );
