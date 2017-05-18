import { Log } from "@microsoft/sp-core-library";
export class ParsedSPField {
  constructor(public id: string, public value: string
  ) { }
  public toString(): string {
    return this.id + "#;" + this.value;

  }
}
/** Parses a string that is deleimetted with '#;'. Returns a ParsedSPField where the id is the part befor the '#;' and the value is the part after the '#;'.
 * if thi input parameter is null, the id and the string of the returned ParsedSPField object will be null.
 */
export function ParseSPField(fieldValue: string): ParsedSPField {
  if (fieldValue === null) {
    return new ParsedSPField(null, null);
  }

  if (fieldValue.indexOf("#;") === -1) {
    Log.info("ParseSPField", "Parse SP field called with a field value that has no '#;' delimeter. field valud is " + fieldValue);
    return new ParsedSPField(null, null);
  }
  const parts = fieldValue.split("#;");
  return new ParsedSPField(parts[0], parts[1]);

}
