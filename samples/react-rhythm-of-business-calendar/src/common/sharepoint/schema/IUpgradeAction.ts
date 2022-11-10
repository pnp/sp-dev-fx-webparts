export interface IUpgradeAction {
    description: string;
    shared?: boolean;
    execute(services: {}): Promise<void>;
}