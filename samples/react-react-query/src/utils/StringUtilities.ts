import { PersonaPresence } from "office-ui-fabric-react";

export class StringUtilities {
    public static getInitials(fullName: string): string {
        if (!fullName) {
            return "";
        }
        let initials = "";
        const names = fullName.split(" ");
        for (let i = 0; i < names.length && i < 2; i++) {
            const name = names[i];
            if (name) {
                initials += name.charAt(0);
            }
        }
        return initials.toUpperCase();
    }
    public static getPresence(presenceString: string): PersonaPresence{
        switch (presenceString) {
            case "":
                return PersonaPresence.none;
            case "Available":
                return PersonaPresence.online;
            case "Away":
                return PersonaPresence.away;
            case "Busy":
                return PersonaPresence.busy;
            default:
                return PersonaPresence.offline;
        }
    }
}