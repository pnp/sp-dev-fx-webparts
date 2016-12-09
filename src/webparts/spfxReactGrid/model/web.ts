//Webs is only needed when we ara ading a list, dont pupulate it until then
export class WebListField {
    public constructor(public id: string,
        public name: string,
        public internalName: string,
        public type: string) {
    }
}
export class WebList {
    public fields: Array<WebListField>;
    public constructor(
        public id: string,
        public title: string,
        public url: string) {
        this.fields = new Array<WebListField>();
    }
}


export class Web {
    public lists: Array<WebList>;
    public constructor(public id: string,
        public title: string,
        public url: string) {

        this.lists = new Array<WebList>();
    }
}
