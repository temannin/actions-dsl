import { RunnerTypes } from "./RunnerTypes.ts";
import { ITrigger } from "./triggers/ITrigger.ts";
import { Writer } from "./utils/Writer.ts";

export class JobStepCollection {
  public name: string;
  private matrix?: Record<string, any[]>;
  private steps: JobStep[] = [];

  constructor(name: string) {
    this.name = name;
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

  public getReadOnlySteps() {
    return JSON.parse(JSON.stringify(this.steps));
  }
}

export class JobStep {
  public name?: string;
  public uses?: string;
  public run?: string;
  public with?: Record<string, any>;

  constructor(
    name?: string,
    uses?: string,
    run?: string,
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
  public runnerType: RunnerTypes;

  public jobs: JobStepCollection[] = [];
  public triggers: ITrigger[] = [];

  constructor(name: string, runnerType: RunnerTypes) {
    this.name = name;
    this.runnerType = runnerType;
  }

  public on(trigger: ITrigger | ITrigger[]): this {
    if (Array.isArray(trigger)) {
      this.triggers.concat(trigger);
    } else {
      this.triggers.push(trigger);
    }

    return this;
  }

  public addJob(
    name: string,
    configureSteps: (steps: JobStepCollection) => void,
  ): this {
    const collection = new JobStepCollection(name);
    this.jobs.push(collection);
    configureSteps(collection);
    return this;
  }

  public addMatrixJob(
    name: string,
    matrix: Record<string, any[]>,
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
