import { Workflow } from "../mod.ts";
import { JobStep } from "../Workflow.ts";

export class Writer {
  private output = "";
  private workflow: Workflow;
  public indentLevel = 0;

  constructor(workflow: Workflow) {
    this.workflow = workflow;
  }

  private indent = () => {
    return "  ".repeat(this.indentLevel);
  };

  public append(str: string) {
    this.output = this.output + `${this.indent()}${str}\n`;
  }

  public appendMultiple(strs: string[]) {
    strs.forEach((str) => {
      this.append(str);
    });
  }

  public getYaml() {
    this.append(
      "# THIS FILE WAS AUTO-GENERATED, PLEASE AVOID EDITING THIS FILE DIRECTLY",
    );
    this.append(`name: ${this.workflow.name}`);
    this.writeTriggers();
    this.writePermissions();
    this.writeJobs();
    return this.output;
  }

  public incrementIndent() {
    this.indentLevel++;
  }

  public decrementIndent() {
    this.indentLevel--;
  }

  private writeJobs() {
    this.append(`jobs:`);
    for (let index = 0; index < this.workflow.jobs.length; index++) {
      this.indentLevel = 1;
      const job = this.workflow.jobs[index];
      this.append(`${job.name}:`);
      this.incrementIndent();
      this.append(`runs-on: ${job.runsOn}`);

      if (job.styledName) {
        this.append(`name: ${job.styledName}`);
      }

      this.append("steps:");
      this.incrementIndent();

      job.getReadOnlySteps().forEach((element: JobStep) => {
        if (!element.name) {
          this.append(
            `- run: |`,
          );
          this.incrementIndent();
          this.incrementIndent();
          this.appendMultiple(
            element.run!.trim().replace(/\s{2,}/g, " \\\n").split(
              "\n",
            ),
          );
        } else {
          this.append(`- name: ${element.name}`);
          this.incrementIndent();
          this.append(`uses: ${element.uses}`);
          if (element.with !== undefined) {
            this.append(`with: `);
            this.incrementIndent();

            Object.keys(element.with).forEach((key) => {
              this.append(`${key}: ${element.with![key]}`);
            });
            this.decrementIndent();
          }
          this.decrementIndent();
        }
      });
    }
  }

  private writePermissions() {
    if (this.workflow.workflowPermissions.length === 0) return;

    this.append("permissions:");
    this.incrementIndent();

    this.workflow.workflowPermissions.forEach((permission) => {
      for (const [key, value] of Object.entries(permission)) {
        this.append(`${key}: ${value}`);
      }
    });

    this.decrementIndent();
    this.append("");
  }

  private writeTriggers() {
    this.append("");
    this.indentLevel = 0;
    this.append("on: ");

    this.workflow.triggers.forEach((trigger) => {
      this.indentLevel = 0;
      this.incrementIndent();
      trigger.build(this);
      this.decrementIndent();
    });

    this.indentLevel = 0;
    this.append("");
  }
}
