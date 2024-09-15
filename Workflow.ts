import { Permissions } from "./github/permissions.ts";
import { RunnerTypes } from "./RunnerTypes.ts";
import { ITrigger } from "./triggers/ITrigger.ts";
import { addToArray } from "./utils/helpers.ts";
import { SingularOrArray } from "./utils/SingularOrArray.ts";
import { Writer } from "./utils/Writer.ts";

export interface JobConfiguration {
    name: string;
    configureSteps: (steps: JobStepCollection) => void | JobStep[];
    styledName?: string;
}

export class JobStepCollection {
    public name: string;
    public styledName?: string;
    private matrix?: Record<string, string[]>;
    private steps: JobStep[] = [];
    public runsOn: RunnerTypes;

    constructor(
        name: string,
        runsOn: RunnerTypes = RunnerTypes.UBUNTU_LATEST,
        styledName?: string,
    ) {
        this.name = name;
        this.styledName = styledName;
        this.runsOn = runsOn;
    }

    public addStep(step: SingularOrArray<JobStep>): this {
        addToArray(this.steps, step);
        return this;
    }

    public getReadOnlySteps(): JobStep[] {
        return JSON.parse(JSON.stringify(this.steps));
    }
}

export class JobStep {
    public name?: string;
    public uses?: string;
    public run?: string;
    public with?: Record<string, string>;

    constructor(
        name?: string,
        uses?: string,
        run?: string,
        // deno-lint-ignore no-explicit-any
        withParams?: Record<string, any>,
    ) {
        this.name = name;
        this.uses = uses;
        this.run = run;
        this.with = withParams;
    }
}

export class Workflow {
    public name: string;

    public jobs: JobStepCollection[] = [];
    public triggers: ITrigger[] = [];
    public workflowPermissions: Permissions[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public on(trigger: SingularOrArray<ITrigger>): this {
        addToArray(this.triggers, trigger);
        return this;
    }

    public when(trigger: SingularOrArray<ITrigger>): this {
        return this.on(trigger);
    }

    /**
     * Set the permissions for the workflow
     * @param permissions Object representing the permissions granted to this workflow
     * @returns Workflow builder
     */
    public allow(permissions: SingularOrArray<Permissions>): this {
        addToArray(this.workflowPermissions, permissions);
        return this;
    }

    /**
     * Set the permissions for the workflow
     * @param permissions Object representing the permissions granted to this workflow
     * @returns Workflow builder
     */
    public permissions(desiredPerms: SingularOrArray<Permissions>): this {
        this.allow(desiredPerms);
        return this;
    }

    public addJob(
        { name, configureSteps, styledName }: JobConfiguration,
    ): this {
        const collection = new JobStepCollection(name, undefined, styledName);
        this.jobs.push(collection);
        const steps = configureSteps(collection);

        if (
            Array.isArray(steps) && collection.getReadOnlySteps().length === 0
        ) {
            steps.forEach((step) => collection.addStep(step));
        }

        return this;
    }

    public do(
        props: JobConfiguration,
    ): this {
        return this.addJob(props);
    }

    public addJobs(configs: JobConfiguration[]): this {
        configs.forEach((config) => {
            this.addJob(config);
        });
        return this;
    }

    public addMatrixJob(
        name: string,
        _matrix: Record<string, string[]>,
        configureSteps: (steps: JobStepCollection) => void,
    ): this {
        const collection = new JobStepCollection(name);
        this.jobs.push(collection);
        configureSteps(collection);
        return this;
    }

    public compile(): string {
        const writer = new Writer(this);
        return writer.getYaml();
    }
}
