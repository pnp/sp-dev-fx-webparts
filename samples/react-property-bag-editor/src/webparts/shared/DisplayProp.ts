export default class DisplayProp {
    constructor(
        public crawledPropertyName: string,
        public managedPropertyName?: string,
        public value?: string,
        public searchable?: boolean,
     
    ) { }
}