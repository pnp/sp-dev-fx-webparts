import {ProvisionTeamCommand} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createProvisionTeamCommandFromDiscriminatorValue(parseNode: ParseNode | undefined) : ProvisionTeamCommand {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new ProvisionTeamCommand();
}
