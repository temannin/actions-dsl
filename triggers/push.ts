import { Writer } from "../utils/Writer.ts";
import { ITrigger } from "./ITrigger.ts";

interface PullRequestOptions {
  branches?: string[];
  paths?: string[];
  "paths-ignore"?: string[];
}

export const Push = (opts: PullRequestOptions): ITrigger => {
  return {
    build: (writer: Writer) => {
      writer.append("push:");

      for (const [key, value] of Object.entries(opts)) {
        writer.incrementIndent();
        writer.append(`${key}:`);
        writer.incrementIndent();
        if (Array.isArray(value)) {
          value.forEach((val) => {
            writer.append(`- ${val}`);
          });
        }
        writer.decrementIndent();
        writer.decrementIndent();
      }
    },
  };
};
