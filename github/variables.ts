// https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs

/**
 * Always set to true.
 */
export const CI = "${{ github.ci }}";

/**
 * The name of the action currently running, or the id of a step.
 */
export const ACTION = "${{ github.action }}";

/**
 * The path where an action is located. Supported in composite actions.
 */
export const ACTION_PATH = "${{ github.action_path }}";

/**
 * For a step executing an action, this is the owner and repository name of the action.
 */
export const ACTION_REPOSITORY = "${{ github.action_repository }}";

/**
 * Always set to true when GitHub Actions is running the workflow.
 */
export const ACTIONS = "${{ github.actions }}";

/**
 * The name of the person or app that initiated the workflow.
 */
export const ACTOR = "${{ github.actor }}";

/**
 * The account ID of the person or app that triggered the initial workflow run.
 */
export const ACTOR_ID = "${{ github.actor_id }}";

/**
 * Returns the API URL, ie: https://api.github.com
 */
export const API_URL = "${{ github.api_url }}";

/**
 * The name of the base ref or target branch of the pull request in a workflow run.
 */
export const BASE_REF = "${{ github.base_ref }}";

/**
 * The path on the runner to the file that sets variables from workflow commands.
 */
export const ENV = "${{ github.env }}";

/**
 * The name of the event that triggered the workflow.
 */
export const EVENT_NAME = "${{ github.event_name }}";

/**
 * The path to the file on the runner that contains the full event webhook payload.
 */
export const EVENT_PATH = "${{ github.event_path }}";

/**
 * Returns the GraphQL API URL.
 */
export const GRAPHQL_URL = "${{ github.graphql_url }}";

/**
 * The head ref or source branch of the pull request in a workflow run.
 */
export const HEAD_REF = "${{ github.head_ref }}";

/**
 * The job_id of the current job.
 */
export const JOB = "${{ github.job }}";

/**
 * The path on the runner to the file that sets the current step's outputs from workflow commands.
 */
export const OUTPUT = "${{ github.output }}";

/**
 * The path on the runner to the file that sets system PATH variables from workflow commands.
 */
export const PATH = "${{ github.path }}";

/**
 * The fully-formed ref of the branch or tag that triggered the workflow run.
 */
export const REF = "${{ github.ref }}";

/**
 * The short ref name of the branch or tag that triggered the workflow run.
 */
export const REF_NAME = "${{ github.ref_name }}";

/**
 * true if branch protections or rulesets are configured for the ref that triggered the workflow run.
 */
export const REF_PROTECTED = "${{ github.ref_protected }}";

/**
 * The type of ref that triggered the workflow run. Valid values are branch or tag.
 */
export const REF_TYPE = "${{ github.ref_type }}";

/**
 * The owner and repository name.
 */
export const REPOSITORY = "${{ github.repository }}";

/**
 * The ID of the repository.
 */
export const REPOSITORY_ID = "${{ github.repository_id }}";

/**
 * The repository owner's name.
 */
export const REPOSITORY_OWNER = "${{ github.repository_owner }}";

/**
 * The repository owner's account ID.
 */
export const REPOSITORY_OWNER_ID = "${{ github.repository_owner_id }}";

/**
 * The number of days that workflow run logs and artifacts are kept.
 */
export const RETENTION_DAYS = "${{ github.retention_days }}";

/**
 * A unique number for each attempt of a particular workflow run in a repository.
 */
export const RUN_ATTEMPT = "${{ github.run_attempt }}";

/**
 * A unique number for each workflow run within a repository.
 */
export const RUN_ID = "${{ github.run_id }}";

/**
 * A unique number for each run of a particular workflow in a repository.
 */
export const RUN_NUMBER = "${{ github.run_number }}";

/**
 * The URL of the GitHub server.
 */
export const SERVER_URL = "${{ github.server_url }}";

/**
 * The commit SHA that triggered the workflow.
 */
export const SHA = "${{ github.sha }}";

/**
 * The path on the runner to the file that contains job summaries from workflow commands.
 */
export const STEP_SUMMARY = "${{ github.step_summary }}";

/**
 * A token to authenticate on behalf of the GitHub App installed on your repository. This is functionally equivalent to the GITHUB_TOKEN secret. For more information, see "Automatic token authentication."
Note: This context property is set by the Actions runner, and is only available within the execution steps of a job. Otherwise, the value of this property will be null.
 */
export const TOKEN = "${{ github.token }}";

/**
 * The username of the user that initiated the workflow run.
 */
export const TRIGGERING_ACTOR = "${{ github.triggering_actor }}";

/**
 * The name of the workflow.
 */
export const WORKFLOW = "${{ github.workflow }}";

/**
 * The ref path to the workflow.
 */
export const WORKFLOW_REF = "${{ github.workflow_ref }}";

/**
 * The commit SHA for the workflow file.
 */
export const WORKFLOW_SHA = "${{ github.workflow_sha }}";

/**
 * The default working directory on the runner for steps, and the default location of your repository.
 */
export const WORKSPACE = "${{ github.workspace }}";

/**
 * The architecture of the runner executing the job.
 */
export const RUNNER_ARCH = "${{ github.runner_arch }}";

/**
 * This is set only if debug logging is enabled, and always has the value of 1.
 */
export const RUNNER_DEBUG = "${{ github.runner_debug }}";

/**
 * The environment of the runner executing the job.
 */
export const RUNNER_ENVIRONMENT = "${{ github.runner_environment }}";

/**
 * The name of the runner executing the job.
 */
export const RUNNER_NAME = "${{ github.runner_name }}";

/**
 * The operating system of the runner executing the job.
 */
export const RUNNER_OS = "${{ github.runner_os }}";

/**
 * The path to a temporary directory on the runner.
 */
export const RUNNER_TEMP = "${{ github.runner_temp }}";

/**
 * The path to the directory containing preinstalled tools for GitHub-hosted runners.
 */
export const RUNNER_TOOL_CACHE = "${{ github.runner_tool_cache }}";

/***********************
 *
 * Custom helper variables
 */

/**
 * Returns the API URL + your repo's name.
 */
export const API_URL_FOR_REPO = `${API_URL}/${REPOSITORY}`;
