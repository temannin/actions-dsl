import { Workflow } from "../mod.ts";
import { JobStep } from "../Workflow.ts";

export class Writer {
    private output = "";
    private workflow: Workflow;
    public indentLevel = 0;

    constructor(workflow: Workflow) {
        this.workflow = workflow;
        this.append(`name: ${this.workflow.name}`);
        this.append(`jobs:`);

        this.writeJobs();
    }

    private indent = () => {
        return "  ".repeat(this.indentLevel);
    };

    public append(str: string) {
        this.output = this.output + `${this.indent()}${str}\n`;
    }

    public getYaml() {
        return this.output;
    }

    public incrementIndent() {
        this.indentLevel++;
    }

    public decrementIndent() {
        this.indentLevel--;
    }

    private writeJobs() {
        for (let index = 0; index < this.workflow.jobs.length; index++) {
            this.indentLevel = 1;
            const job = this.workflow.jobs[index];
            this.append(`${job.name}:`);
            this.incrementIndent();
            this.append("steps:");
            this.incrementIndent();

            job.getReadOnlySteps().forEach((element: JobStep) => {
                if (!element.name) {
                    this.append(`- run: ${element.run}`);
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
}
