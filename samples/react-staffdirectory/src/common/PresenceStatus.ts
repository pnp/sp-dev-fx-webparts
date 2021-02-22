import { PersonaPresence } from "office-ui-fabric-react";

export interface IPresenceStatus {
  [key:string]: {presenceStatus:number, presenceStatusLabel:string};
}
export const presenceStatus:IPresenceStatus[] = [];
presenceStatus["Available"] = { presenceStatus: PersonaPresence.online, presenceStatusLabel: "Available"};
presenceStatus["AvailableIdle"] = { presenceStatus: PersonaPresence.online, presenceStatusLabel: "Available idle"};
presenceStatus["Away"] =  { presenceStatus: PersonaPresence.away, presenceStatusLabel: "Away"};
presenceStatus["BeRightBack"] =  { presenceStatus: PersonaPresence.away, presenceStatusLabel: "Be right back"};
presenceStatus["Busy"] = { presenceStatus: PersonaPresence.busy, presenceStatusLabel: "Busy"};
presenceStatus["BusyIdle"] = { presenceStatus: PersonaPresence.busy, presenceStatusLabel: "Busy idle"};
presenceStatus["DoNotDisturb"] = { presenceStatus: PersonaPresence.dnd, presenceStatusLabel: "Do not disturb"};
presenceStatus["Offline"] ={ presenceStatus: PersonaPresence.offline, presenceStatusLabel: "Offline "};
presenceStatus["PresenceUnknown"] ={ presenceStatus: PersonaPresence.none, presenceStatusLabel: "Presence Unknown" };
