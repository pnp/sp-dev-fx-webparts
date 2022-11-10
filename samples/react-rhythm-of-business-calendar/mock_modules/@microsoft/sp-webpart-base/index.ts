
export abstract class BaseWebPart<TProperties extends {}> {
    protected readonly dataVersion: any; //Version;
    protected readonly properties: TProperties;
    protected readonly disableReactivePropertyChanges: boolean;
    protected readonly previewImageUrl: string | undefined;
    protected readonly accessibleTitle: string;
    protected readonly title: string;
    protected readonly description: string;

    constructor() { }

    protected async onInit(): Promise<void> { }
    protected getPropertyPaneConfiguration(): any { return null; } //IPropertyPaneConfiguration;
}

export abstract class BaseClientSideWebPart<TProperties> extends BaseWebPart<TProperties> {
    protected readonly context: any; //WebPartContext;
    protected readonly domElement: HTMLElement;

    constructor() { super(); }

    protected abstract render(): void;
    protected onDispose(): void { }
}