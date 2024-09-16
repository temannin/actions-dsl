import { Writer } from "../utils/Writer.ts";
import { ITrigger } from "./ITrigger.ts";

/**
 * Builder class to create a cron expression string.
 */
export class CronBuilder implements ITrigger {
    private minute: string;
    private hour: string;
    private dayOfMonth: string;
    private month: string;
    private dayOfWeek: string;

    constructor() {
        this.minute = "0";
        this.hour = "*";
        this.dayOfMonth = "*";
        this.month = "*";
        this.dayOfWeek = "*";
    }

    build(writer: Writer): void {
        writer.append("schedule:");
        writer.incrementIndent();

        const cronExpression = `${this.minute} ${this.hour} ${this.dayOfMonth} ${this.month} ${this.dayOfWeek}`;

        writer.append(`${cronExpression}\n`);
    }

    /**
     * Set the cron job to run every day at the specified hour.
     * @param hour - Hour of the day (0-23).
     */
    public EverydayAtHour(hour: number): this {
        this.hour = hour.toString();
        this.minute = "0";
        this.dayOfMonth = "*";
        this.month = "*";
        this.dayOfWeek = "*";
        return this;
    }

    /**
     * Set the cron job to run every day at the specified hour and minute.
     * @param hour - Hour of the day (0-23).
     * @param minute - Minute of the hour (0-59).
     */
    public EverydayAtHourAndMinute(hour: number, minute: number): this {
        this.hour = hour.toString();
        this.minute = minute.toString();
        this.dayOfMonth = "*";
        this.month = "*";
        this.dayOfWeek = "*";
        return this;
    }

    /**
     * Set the cron job to run every week on the specified day at the specified hour.
     * @param dayOfWeek - Day of the week (0 for Sunday to 6 for Saturday).
     * @param hour - Hour of the day (0-23).
     */
    public WeeklyOnDayAtHour(dayOfWeek: number, hour: number): this {
        this.hour = hour.toString();
        this.minute = "0";
        this.dayOfMonth = "*";
        this.month = "*";
        this.dayOfWeek = dayOfWeek.toString();
        return this;
    }

    /**
     * Set the cron job to run on the first day of every month at the specified hour.
     * @param hour - Hour of the day (0-23).
     */
    public MonthlyOnFirstDayAtHour(hour: number): this {
        this.hour = hour.toString();
        this.minute = "0";
        this.dayOfMonth = "1";
        this.month = "*";
        this.dayOfWeek = "*";
        return this;
    }
}
