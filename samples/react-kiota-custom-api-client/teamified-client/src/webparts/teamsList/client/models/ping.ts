import {Parsable, ParseNode, SerializationWriter} from '@microsoft/kiota-abstractions';

export class Ping implements Parsable {
    /** The id property */
    private _id?: string | undefined;
    /** The now property */
    private _now?: string | undefined;
    /**
     * The deserialization information for the current model
     * @returns a Record<string, (node: ParseNode) => void>
     */
    public getFieldDeserializers() : Record<string, (node: ParseNode) => void> {
        return {
            "id": n => { this.id = n.getStringValue(); },
            "now": n => { this.now = n.getStringValue(); },
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
     * Gets the now property value. The now property
     * @returns a string
     */
    public get now() {
        return this._now;
    };
    /**
     * Sets the now property value. The now property
     * @param value Value to set for the now property.
     */
    public set now(value: string | undefined) {
        this._now = value;
    };
    /**
     * Serializes information the current object
     * @param writer Serialization writer to use to serialize this model
     */
    public serialize(writer: SerializationWriter) : void {
        if(!writer) throw new Error("writer cannot be undefined");
        writer.writeStringValue("id", this.id);
        writer.writeStringValue("now", this.now);
    };
}
