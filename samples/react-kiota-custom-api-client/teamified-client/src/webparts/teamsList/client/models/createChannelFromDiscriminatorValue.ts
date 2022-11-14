import {Channel} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createChannelFromDiscriminatorValue(parseNode: ParseNode | undefined) : Channel {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new Channel();
}
