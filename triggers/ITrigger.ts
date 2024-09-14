import { Writer } from "../utils/Writer.ts";

/**
 * Interface representing a trigger with a build function.
 */
export interface ITrigger {
    /**
     * Function to build the trigger.
     * @param writer - The writer object used for output.
     */
    build(writer: Writer): void;
}
