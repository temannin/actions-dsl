import { SingularOrArray } from "../utils/SingularOrArray.ts";
import { Writer } from "../utils/Writer.ts";
import { ITrigger } from "./ITrigger.ts";

interface PullRequestOptions {
    branches?: SingularOrArray<string>;
    paths?: SingularOrArray<string>;
    "paths-ignore"?: SingularOrArray<string>;
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
                } else {
                    writer.append(`- ${value}`);
                }

                writer.decrementIndent();
                writer.decrementIndent();
            }
        },
    };
};
