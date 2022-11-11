import {createChannelFromDiscriminatorValue} from './createChannelFromDiscriminatorValue';
import {createIdentityPrincipalFromDiscriminatorValue} from './createIdentityPrincipalFromDiscriminatorValue';
import {Channel, IdentityPrincipal} from './index';
import {Parsable, ParseNode, SerializationWriter} from '@microsoft/kiota-abstractions';

export class Team implements Parsable {
    /** The channels property */
    private _channels?: Channel[] | undefined;
    /** The description property */
    private _description?: string | undefined;
    /** The displayName property */
    private _displayName?: string | undefined;
    /** The id property */
    private _id?: string | undefined;
    /** The members property */
    private _members?: IdentityPrincipal[] | undefined;
    /** The owners property */
    private _owners?: IdentityPrincipal[] | undefined;
    /**
     * Gets the channels property value. The channels property
     * @returns a Channel
     */
    public get channels() {
        return this._channels;
    };
    /**
     * Sets the channels property value. The channels property
     * @param value Value to set for the channels property.
     */
    public set channels(value: Channel[] | undefined) {
        this._channels = value;
    };
    /**
     * Gets the description property value. The description property
     * @returns a string
     */
    public get description() {
        return this._description;
    };
    /**
     * Sets the description property value. The description property
     * @param value Value to set for the description property.
     */
    public set description(value: string | undefined) {
        this._description = value;
    };
    /**
     * Gets the displayName property value. The displayName property
     * @returns a string
     */
    public get displayName() {
        return this._displayName;
    };
    /**
     * Sets the displayName property value. The displayName property
     * @param value Value to set for the displayName property.
     */
    public set displayName(value: string | undefined) {
        this._displayName = value;
    };
    /**
     * The deserialization information for the current model
     * @returns a Record<string, (node: ParseNode) => void>
     */
    public getFieldDeserializers() : Record<string, (node: ParseNode) => void> {
        return {
            "channels": n => { this.channels = n.getCollectionOfObjectValues<Channel>(createChannelFromDiscriminatorValue); },
            "description": n => { this.description = n.getStringValue(); },
            "displayName": n => { this.displayName = n.getStringValue(); },
            "id": n => { this.id = n.getStringValue(); },
            "members": n => { this.members = n.getCollectionOfObjectValues<IdentityPrincipal>(createIdentityPrincipalFromDiscriminatorValue); },
            "owners": n => { this.owners = n.getCollectionOfObjectValues<IdentityPrincipal>(createIdentityPrincipalFromDiscriminatorValue); },
        };
    };
    /**
     * Gets the id property value. The id property
     * @returns a string
     */
    public get id() {
        return this._id;
    };
    /**
     * Sets the id property value. The id property
     * @param value Value to set for the id property.
     */
    public set id(value: string | undefined) {
        this._id = value;
    };
    /**
     * Gets the members property value. The members property
     * @returns a IdentityPrincipal
     */
    public get members() {
        return this._members;
    };
    /**
     * Sets the members property value. The members property
     * @param value Value to set for the members property.
     */
    public set members(value: IdentityPrincipal[] | undefined) {
        this._members = value;
    };
    /**
     * Gets the owners property value. The owners property
     * @returns a IdentityPrincipal
     */
    public get owners() {
        return this._owners;
    };
    /**
     * Sets the owners property value. The owners property
     * @param value Value to set for the owners property.
     */
    public set owners(value: IdentityPrincipal[] | undefined) {
        this._owners = value;
    };
    /**
     * Serializes information the current object
     * @param writer Serialization writer to use to serialize this model
     */
    public serialize(writer: SerializationWriter) : void {
        if(!writer) throw new Error("writer cannot be undefined");
        writer.writeCollectionOfObjectValues<Channel>("channels", this.channels);
        writer.writeStringValue("description", this.description);
        writer.writeStringValue("displayName", this.displayName);
        writer.writeStringValue("id", this.id);
        writer.writeCollectionOfObjectValues<IdentityPrincipal>("members", this.members);
        writer.writeCollectionOfObjectValues<IdentityPrincipal>("owners", this.owners);
    };
}
