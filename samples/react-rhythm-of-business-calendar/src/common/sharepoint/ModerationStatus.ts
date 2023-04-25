export class ModerationStatus {
    public static readonly Approved = new ModerationStatus("Approved", 0);
    public static readonly Rejected = new ModerationStatus("Rejected", 1);
    public static readonly Pending = new ModerationStatus("Pending", 2);
    public static readonly Draft = new ModerationStatus("Draft", 3);
    public static readonly Scheduled = new ModerationStatus("Scheduled", 4);

    public static readonly all = [
        ModerationStatus.Approved,
        ModerationStatus.Rejected,
        ModerationStatus.Pending,
        ModerationStatus.Draft,
        ModerationStatus.Scheduled
    ] as const;
    private static readonly _statusesByName = new Map(ModerationStatus.all.map(s => [s.name, s] as const));

    private constructor(
        public readonly name: string,
        public readonly value: number) {
    }

    public static fromName(name: string) {
        return ModerationStatus._statusesByName.get(name);
    }
}