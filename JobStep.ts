export interface JobStep {
    name: string;
    uses?: string;
    run?: string;
    with?: Record<string, any>; // Optional field for additional inputs to the action
}
