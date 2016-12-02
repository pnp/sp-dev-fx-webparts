import { Log } from "@microsoft/sp-client-base";
export class ParsedSPField {
  constructor(public id: string, public value: string

  ) { }
}
export function ParseSPField(fieldValue: string): ParsedSPField {
  if (fieldValue.indexOf("#;") === -1) {
    Log.info("ParseSPField", "Parse SP field called with a field value that has no '#;' delimeter. field valud is " + fieldValue)

  }
  let parts = fieldValue.split("#;");
  return new ParsedSPField(parts[0], parts[1]);

}
