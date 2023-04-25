import {IdentityPrincipal} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createIdentityPrincipalFromDiscriminatorValue(parseNode: ParseNode | undefined) : IdentityPrincipal {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new IdentityPrincipal();
}
