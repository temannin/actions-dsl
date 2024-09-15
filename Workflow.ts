import { RunnerTypes } from "./RunnerTypes.ts";
import { ITrigger } from "./triggers/ITrigger.ts";
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

  public addStep(step: JobStep | JobStep[]): this {
    if (Array.isArray(step)) {
      // If step is an array, add each element to steps
      this.steps.push(...step);
    } else {
      // If step is a single JobStep, add it directly
      this.steps.push(step);
    }
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

  constructor(name: string) {
    this.name = name;
  }

  public on(trigger: ITrigger | ITrigger[]): this {
    if (Array.isArray(trigger)) {
      this.triggers = this.triggers.concat(trigger);
    } else {
      this.triggers.push(trigger);
    }

    return this;
  }

  public when(trigger: ITrigger | ITrigger[]): this {
    return this.on(trigger);
  }

  public addJob({ name, configureSteps, styledName }: JobConfiguration): this {
    const collection = new JobStepCollection(name, undefined, styledName);
    this.jobs.push(collection);
    const steps = configureSteps(collection);

    if (Array.isArray(steps) && collection.getReadOnlySteps().length === 0) {
      steps.forEach((step) => collection.addStep(step));
    }

    return this;
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
