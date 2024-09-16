// https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/controlling-permissions-for-github_token

/**
 * Interface representing permissions for GitHub Actions
 */
export interface Permissions {
    /**
     * Work with GitHub Actions. For example, `actions: write` permits an action to cancel a workflow run.
     * For more information, see "Permissions required for GitHub Apps."
     */
    actions?: "read" | "write";

    /**
     * Work with artifact attestations. For example, `attestations: write` permits an action to generate an artifact attestation for a build.
     * For more information, see "Using artifact attestations to establish provenance for builds."
     */
    attestations?: "read" | "write";

    /**
     * Work with check runs and check suites. For example, `checks: write` permits an action to create a check run.
     * For more information, see "Permissions required for GitHub Apps."
     */
    checks?: "read" | "write";

    /**
     * Work with the contents of the repository. For example, `contents: read` permits an action to list the commits, and `contents: write` allows the action to create a release.
     * For more information, see "Permissions required for GitHub Apps."
     */
    contents?: "read" | "write";

    /**
     * Work with deployments. For example, `deployments: write` permits an action to create a new deployment.
     * For more information, see "Permissions required for GitHub Apps."
     */
    deployments?: "read" | "write";

    /**
     * Work with GitHub Discussions. For example, `discussions: write` permits an action to close or delete a discussion.
     * For more information, see "Using the GraphQL API for Discussions."
     */
    discussions?: "read" | "write";

    /**
     * Fetch an OpenID Connect (OIDC) token. This requires `id-token: write`.
     * For more information, see "About security hardening with OpenID Connect."
     */
    "id-token"?: "read" | "write";

    /**
     * Work with issues. For example, `issues: write` permits an action to add a comment to an issue.
     * For more information, see "Permissions required for GitHub Apps."
     */
    issues?: "read" | "write";

    /**
     * Work with GitHub Packages. For example, `packages: write` permits an action to upload and publish packages on GitHub Packages.
     * For more information, see "About permissions for GitHub Packages."
     */
    packages?: "read" | "write";

    /**
     * Work with GitHub Pages. For example, `pages: write` permits an action to request a GitHub Pages build.
     * For more information, see "Permissions required for GitHub Apps."
     */
    pages?: "read" | "write";
}
