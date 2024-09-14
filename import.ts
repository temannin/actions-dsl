// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

class Writer {
    output = "";
    workflow;
    indentLevel = 0;
    constructor(workflow){
        this.workflow = workflow;
        this.append(`name: ${this.workflow.name}`);
        this.append(`jobs:`);
        this.writeJobs();
    }
    indent = ()=>{
        return "  ".repeat(this.indentLevel);
    };
    append(str) {
        this.output = this.output + `${this.indent()}${str}\n`;
    }
    getYaml() {
        return this.output;
    }
    incrementIndent() {
        this.indentLevel++;
    }
    decrementIndent() {
        this.indentLevel--;
    }
    writeJobs() {
        for(let index = 0; index < this.workflow.jobs.length; index++){
            this.indentLevel = 1;
            const job = this.workflow.jobs[index];
            this.append(`${job.name}:`);
            this.incrementIndent();
            this.append("steps:");
            this.incrementIndent();
            job.getReadOnlySteps().forEach((element)=>{
                if (!element.name) {
                    this.append(`- run: ${element.run}`);
                } else {
                    this.append(`- name: ${element.name}`);
                    this.incrementIndent();
                    this.append(`uses: ${element.uses}`);
                    if (element.with !== undefined) {
                        this.append(`with: `);
                        this.incrementIndent();
                        Object.keys(element.with).forEach((key)=>{
                            this.append(`${key}: ${element.with[key]}`);
                        });
                        this.decrementIndent();
                    }
                    this.decrementIndent();
                }
            });
        }
    }
}
class JobStepCollection {
    name;
    matrix;
    steps = [];
    constructor(name){
        this.name = name;
    }
    addStep(step) {
        if (Array.isArray(step)) {
            this.steps.push(...step);
        } else {
            this.steps.push(step);
        }
        return this;
    }
    getReadOnlySteps() {
        return JSON.parse(JSON.stringify(this.steps));
    }
}
class JobStep {
    name;
    uses;
    run;
    with;
    constructor(name, uses, run, withParams){
        this.name = name;
        this.uses = uses;
        this.run = run;
        this.with = withParams;
    }
}
class Workflow {
    name;
    runnerType;
    jobs = [];
    triggers = [];
    constructor(name, runnerType){
        this.name = name;
        this.runnerType = runnerType;
    }
    on(trigger) {
        if (Array.isArray(trigger)) {
            this.triggers.concat(trigger);
        } else {
            this.triggers.push(trigger);
        }
        return this;
    }
    addJob(name, configureSteps) {
        const collection = new JobStepCollection(name);
        this.jobs.push(collection);
        configureSteps(collection);
        return this;
    }
    addMatrixJob(name, matrix, configureSteps) {
        const collection = new JobStepCollection(name);
        this.jobs.push(collection);
        configureSteps(collection);
        return this;
    }
    compile() {
        const writer = new Writer(this);
        return writer.getYaml();
    }
}
const CHECKOUT = (options, customRunnerType)=>{
    return new JobStep("Checkout", "actions/checkout@v4", customRunnerType, options);
};
const SETUP_NODE = (options, customRunnerType)=>{
    return new JobStep("Setup Node", "actions/setup-node@v4", customRunnerType, options);
};
const mod = {
    CHECKOUT: CHECKOUT,
    SETUP_NODE: SETUP_NODE
};
var RunnerTypes;
(function(RunnerTypes) {
    RunnerTypes["UBUNTU_LATEST"] = "ubuntu-latest";
    RunnerTypes["UBUNTU_22_04"] = "ubuntu-22.04";
    RunnerTypes["WINDOWS_LATEST"] = "windows-latest";
    RunnerTypes["MACOS_LATEST"] = "macos-latest";
})(RunnerTypes || (RunnerTypes = {}));
export { mod as githubActions };
const CI = "${{ github.ci }}";
const ACTION = "${{ github.action }}";
const ACTION_PATH = "${{ github.action_path }}";
const ACTION_REPOSITORY = "${{ github.action_repository }}";
const ACTIONS = "${{ github.actions }}";
const ACTOR = "${{ github.actor }}";
const ACTOR_ID = "${{ github.actor_id }}";
const API_URL = "${{ github.api_url }}";
const BASE_REF = "${{ github.base_ref }}";
const ENV = "${{ github.env }}";
const EVENT_NAME = "${{ github.event_name }}";
const EVENT_PATH = "${{ github.event_path }}";
const GRAPHQL_URL = "${{ github.graphql_url }}";
const HEAD_REF = "${{ github.head_ref }}";
const JOB = "${{ github.job }}";
const OUTPUT = "${{ github.output }}";
const PATH = "${{ github.path }}";
const REF = "${{ github.ref }}";
const REF_NAME = "${{ github.ref_name }}";
const REF_PROTECTED = "${{ github.ref_protected }}";
const REF_TYPE = "${{ github.ref_type }}";
const REPOSITORY = "${{ github.repository }}";
const REPOSITORY_ID = "${{ github.repository_id }}";
const REPOSITORY_OWNER = "${{ github.repository_owner }}";
const REPOSITORY_OWNER_ID = "${{ github.repository_owner_id }}";
const RETENTION_DAYS = "${{ github.retention_days }}";
const RUN_ATTEMPT = "${{ github.run_attempt }}";
const RUN_ID = "${{ github.run_id }}";
const RUN_NUMBER = "${{ github.run_number }}";
const SERVER_URL = "${{ github.server_url }}";
const SHA = "${{ github.sha }}";
const STEP_SUMMARY = "${{ github.step_summary }}";
const TRIGGERING_ACTOR = "${{ github.triggering_actor }}";
const WORKFLOW = "${{ github.workflow }}";
const WORKFLOW_REF = "${{ github.workflow_ref }}";
const WORKFLOW_SHA = "${{ github.workflow_sha }}";
const WORKSPACE = "${{ github.workspace }}";
const RUNNER_ARCH = "${{ github.runner_arch }}";
const RUNNER_DEBUG = "${{ github.runner_debug }}";
const RUNNER_ENVIRONMENT = "${{ github.runner_environment }}";
const RUNNER_NAME = "${{ github.runner_name }}";
const RUNNER_OS = "${{ github.runner_os }}";
const RUNNER_TEMP = "${{ github.runner_temp }}";
const RUNNER_TOOL_CACHE = "${{ github.runner_tool_cache }}";
const mod1 = {
    CI: CI,
    ACTION: ACTION,
    ACTION_PATH: ACTION_PATH,
    ACTION_REPOSITORY: ACTION_REPOSITORY,
    ACTIONS: ACTIONS,
    ACTOR: ACTOR,
    ACTOR_ID: ACTOR_ID,
    API_URL: API_URL,
    BASE_REF: BASE_REF,
    ENV: ENV,
    EVENT_NAME: EVENT_NAME,
    EVENT_PATH: EVENT_PATH,
    GRAPHQL_URL: GRAPHQL_URL,
    HEAD_REF: HEAD_REF,
    JOB: JOB,
    OUTPUT: OUTPUT,
    PATH: PATH,
    REF: REF,
    REF_NAME: REF_NAME,
    REF_PROTECTED: REF_PROTECTED,
    REF_TYPE: REF_TYPE,
    REPOSITORY: REPOSITORY,
    REPOSITORY_ID: REPOSITORY_ID,
    REPOSITORY_OWNER: REPOSITORY_OWNER,
    REPOSITORY_OWNER_ID: REPOSITORY_OWNER_ID,
    RETENTION_DAYS: RETENTION_DAYS,
    RUN_ATTEMPT: RUN_ATTEMPT,
    RUN_ID: RUN_ID,
    RUN_NUMBER: RUN_NUMBER,
    SERVER_URL: SERVER_URL,
    SHA: SHA,
    STEP_SUMMARY: STEP_SUMMARY,
    TRIGGERING_ACTOR: TRIGGERING_ACTOR,
    WORKFLOW: WORKFLOW,
    WORKFLOW_REF: WORKFLOW_REF,
    WORKFLOW_SHA: WORKFLOW_SHA,
    WORKSPACE: WORKSPACE,
    RUNNER_ARCH: RUNNER_ARCH,
    RUNNER_DEBUG: RUNNER_DEBUG,
    RUNNER_ENVIRONMENT: RUNNER_ENVIRONMENT,
    RUNNER_NAME: RUNNER_NAME,
    RUNNER_OS: RUNNER_OS,
    RUNNER_TEMP: RUNNER_TEMP,
    RUNNER_TOOL_CACHE: RUNNER_TOOL_CACHE
};
export { Workflow as Workflow };
export { RunnerTypes as RunnerTypes };
export { mod1 as GITHUB_VARIABLES };
const Actions = {
    "GitHub": {
        "Checkout": CHECKOUT,
        "SetupNode": SETUP_NODE
    }
};
const Run = (command)=>{
    return new JobStep(undefined, undefined, command, undefined);
};
export { Actions as Actions };
export { CHECKOUT as Checkout };
export { SETUP_NODE as SetupNode };
export { Run as Run };

