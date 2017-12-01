import * as JQuery from "jquery";

export class PersonaCardHandler {
    private rootElement: JQuery;
    private oldStatus: string;
    public constructor(rootElement: JQuery) {
        this.rootElement = rootElement;
    }
    public updatePersonaInformation(displayName: string, status: string, oldStatus: string): void {
        if (!oldStatus) { // the skype API doesn't always return the old status so we have to memorize it of next call
            oldStatus = this.oldStatus;
        }
        this.rootElement.find(".ms-Persona-primaryText").text(displayName);
        this.rootElement.find(".ms-Persona-presenceIcon").addClass(this.getOfficeUiIconClassFromSkypeStatus(status));
        let msPersona: JQuery;
        if (this.rootElement.hasClass("ms-Persona")) {
            msPersona = this.rootElement;
        } else {
            msPersona = this.rootElement.find(".ms-Persona");
        }
        msPersona.addClass(this.getOfficeUiPersonaClassFromSkypeStatus(status));
        if (oldStatus && oldStatus !== status) {
            this.rootElement.find(".ms-Persona-presenceIcon").removeClass(this.getOfficeUiIconClassFromSkypeStatus(oldStatus));
            msPersona.removeClass(this.getOfficeUiPersonaClassFromSkypeStatus(oldStatus));
        }
        this.oldStatus = status;
    }
    public setLoading(): void {
        let msPersona: JQuery;
        if (this.rootElement.hasClass("ms-Persona")) {
            msPersona = this.rootElement;
        } else {
            msPersona = this.rootElement.find(".ms-Persona");
        }
        const currentText: string = msPersona.find(".ms-Persona-primaryText").text();
        msPersona.find(".ms-Persona-primaryText").text(currentText + " (...)");
    }
    private getOfficeUiIconClassFromSkypeStatus(skypeStatus: string): string {
        switch (skypeStatus) {
            case "Online":
                return "ms-Icon--SkypeCheck";
            case "Idle":
            case "BeRightBack":
            case "Away":
                return "ms-Icon--SkypeClock";
            case "DoNotDisturb":
                return "ms-Icon--SkypeMinus";
            case "Busy":
            case "Hidden":
            case "Unknown":
            case "Offline":
            default:
                return "";
        }
    }
    private getOfficeUiPersonaClassFromSkypeStatus(skypeStatus: string): string {
        switch (skypeStatus) {
            case "Online": // green
                return "ms-Persona--online";
            case "Idle":
            case "BeRightBack":
            case "Away": // yellow
                return "ms-Persona--away";
            case "Busy":
                return "ms-Persona--busy";
            case "DoNotDisturb": // red
                return "ms-Persona--dnd";
            case "Hidden":
            case "Unknown":
            case "Offline": // grey
                return "ms-Persona--offline";
            default:
                return "ms-Persona--offline";
        }
    }
}
