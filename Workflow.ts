export interface Job {
  id: string;
  runsOn: RunnerTypes;
  steps: Array<{ name: string; uses?: string; run?: string }>;
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
  public addJob(id: string, runsOn: RunnerTypes, steps: Array<{ name: string; uses?: string; run?: string }>): this {
    this.jobs.push({ id, runsOn, steps });
    return this;
  }
}
