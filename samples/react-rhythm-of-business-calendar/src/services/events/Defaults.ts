import { Guid } from "@microsoft/sp-core-library";

const Environments = {
    LOCAL: { TeamsAppId: Guid.empty },
    DEV: { TeamsAppId: Guid.parse('771c6f47-c589-4bdd-af37-8584f753b5da') },
    TEST: { TeamsAppId: Guid.parse('21ddbee7-d6be-4eb3-8888-a3a5ae388810') },
    STAGE: { TeamsAppId: Guid.empty },
    PROD: { TeamsAppId: Guid.parse('1e92a7c2-d849-4fa7-bd2d-8fb9f876609d') }
};

const Environment = Environments.LOCAL;

export const Defaults = {
    TeamsAppId: Environment.TeamsAppId
};