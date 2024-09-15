import { Writer } from "../utils/Writer.ts";
import { ITrigger } from "./ITrigger.ts";

/**
 * Possible actions that can occur on a GitHub Pull Request.
 */
export type PullRequestType =
    /**
     * A user is assigned to the pull request.
     */
    | "assigned"
    /**
     * A user is unassigned from the pull request.
     */
    | "unassigned"
    /**
     * A label is added to the pull request.
     */
    | "labeled"
    /**
     * A label is removed from the pull request.
     */
    | "unlabeled"
    /**
     * The pull request is opened.
     */
    | "opened"
    /**
     * The pull request is edited.
     */
    | "edited"
    /**
     * The pull request is closed.
     */
    | "closed"
    /**
     * The pull request is reopened.
     */
    | "reopened"
    /**
     * The pull request is synchronized (e.g., new commits are pushed).
     */
    | "synchronize"
    /**
     * The pull request is converted to a draft.
     */
    | "converted_to_draft"
    /**
     * The pull request is marked as ready for review.
     */
    | "ready_for_review"
    /**
     * The pull request is locked.
     */
    | "locked"
    /**
     * The pull request is unlocked.
     */
    | "unlocked"
    /**
     * A review is requested for the pull request.
     */
    | "review_requested"
    /**
     * A review request is removed from the pull request.
     */
    | "review_request_removed"
    /**
     * Auto-merge is enabled for the pull request.
     */
    | "auto_merge_enabled"
    /**
     * Auto-merge is disabled for the pull request.
     */
    | "auto_merge_disabled";

export interface PullRequestTriggerOptions {
    types?: PullRequestType[];
    branches?: string | string[];
    paths?: string[];
    "paths-ignore"?: string[];
}

/**
 * For more information about arguments go here: https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#pull_request
 */
class PULL_REQUEST implements ITrigger {
    private opts: PullRequestTriggerOptions;

    constructor(opts: PullRequestTriggerOptions) {
        this.opts = opts;
    }

    build(writer: Writer): void {
        writer.append("pull_request:");
        writer.incrementIndent();

        for (const [key, value] of Object.entries(this.opts)) {
            writer.append(`${key}: [${value.join(", ")}]`);
        }
    }
}

export const PullRequest = (opts: PullRequestTriggerOptions) => {
    return new PULL_REQUEST(opts);
};
