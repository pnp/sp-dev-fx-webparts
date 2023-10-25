export class EventModerationStatus {
    public static readonly Pending = new EventModerationStatus("Pending");
    public static readonly Approved = new EventModerationStatus("Approved");
    public static readonly Rejected = new EventModerationStatus("Rejected");

    public static readonly all = [
        EventModerationStatus.Pending,
        EventModerationStatus.Approved,
        EventModerationStatus.Rejected
    ] as const;

    private static readonly _statusesByName = new Map(EventModerationStatus.all.map(s => [s.name, s] as const));

    public static fromName(name: string) {
        return EventModerationStatus._statusesByName.get(name) || EventModerationStatus.Pending;
    }

    private constructor(
        public readonly name: string
    ) {
    }

    public clone(): this {
        return this;
    }
}