import { PersonaPresence } from "office-ui-fabric-react";

export class StringUtilities {
    public static getInitials(fullName: string) {
        if (!fullName) {
            return "";
        }
        let initials = "";
        let names = fullName.split(" ");
        for (let i = 0; i < names.length && i < 2; i++) {
            let name = names[i];
            if (name) {
                initials += name.charAt(0);
            }
        }
        return initials.toUpperCase();
    }
    public static getPresence(presenceString): PersonaPresence{
        switch (presenceString) {
            case "":
                return PersonaPresence.none;
            case "Available":
                return PersonaPresence.online;
            case "Busy":
                return PersonaPresence.busy;
            default:
                return PersonaPresence.offline;
        }
    }
}