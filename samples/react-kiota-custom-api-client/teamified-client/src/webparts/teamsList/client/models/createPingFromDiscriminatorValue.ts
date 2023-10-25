import {Ping} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createPingFromDiscriminatorValue(parseNode: ParseNode | undefined) : Ping {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new Ping();
}
