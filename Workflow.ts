import { RunnerTypes } from "./RunnerTypes.ts";
import { JobStep } from "./JobStep.ts";

interface Job {
  id: string;
  runsOn?: RunnerTypes;
  steps: JobStep[];
}

export class Workflow {
  private name: string;
  private runnerType: RunnerTypes;
  private jobs: Job[] = [];

  constructor(name: string, runnerType: RunnerTypes) {
    this.name = name;
    this.runnerType = runnerType;
  }

  // Method to add a job to the workflow
  public addJob(id: string, runsOn: RunnerTypes, steps: JobStep[]): this {
    this.jobs.push({ id, runsOn, steps });
    return this;
  }

  public checkout() {
    this.jobs.push({});
  }
}
