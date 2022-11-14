const Environments = {
    LOCAL: { Prefix: 'LCL' },
    DEV: { Prefix: 'DEV' },
    TEST: { Prefix: 'TST' },
    STAGE: { Prefix: 'STG' },
    PROD: { Prefix: '' }
};

const Environment = Environments.LOCAL;
const AppPrefix = "RoB Calendar";

const combine = (...segments: string[]) => segments.join(' ').trim();
const title = (baseTitle: string) => combine(Environment.Prefix, AppPrefix, baseTitle);

export const Defaults = {
    ListTitles: {
        Configuration: title("Configuration"),
        Events: title('Events'),
        Refiners: title('Refiners'),
        RefinerValues: title('Refiner Values'),
        Approvers: title('Approvers')
    }
};