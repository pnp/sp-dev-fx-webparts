
import { find } from '@microsoft/sp-lodash-subset';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export class VisioService {

  private _webPartContext: IWebPartContext;

  private _url = "";
  /**
   * gets the url of the Visio document to embed
   * @returns a string with the document url
   */
  get url(): string {
    return this._url;
  }
  /**
   * sets the url of the Visio document to embed
   * @param url the url of the document
   */
  set url(url: string) {
    // apis are enabled for EmbedView action only
    url = url.replace("action=view", "action=embedview");
    url = url.replace("action=interactivepreview", "action=embedview");
    url = url.replace("action=default", "action=embedview");
    url = url.replace("action=edit", "action=embedview");

    this._url = url;
  }

  private _session: OfficeExtension.EmbeddedSession = null;
  private _shapes: Visio.Shape[] = [];
  private _selectedShape: Visio.Shape;

  private _documentLoadComplete = false;
  private _pageLoadComplete = false;
  /**
   * gets a pre-loaded collection of relevant shapes from the diagram
   */
  public get shapes(): Visio.Shape[] {
    return this._shapes;
  }

  // delegate functions passed from the react component
  public onSelectionChanged: (selectedShape: Visio.Shape) => void;
  public getAllShapes: (shapes: Visio.Shape[]) => void;

  /**
   * class constructor
   * @param webPartContext the context of the web part
   */
  constructor(webPartContext: IWebPartContext) {
    // set web part context
    this._webPartContext = webPartContext;
  }

  /**
   * initialize session by embedding the Visio diagram on the page
   * @returns returns a promise
   */
  private async _init(): Promise<any> {
    // initialize communication between the developer frame and the Visio Online frame
    this._session = new OfficeExtension.EmbeddedSession(
      this._url, {
        id: "embed-iframe",
        container: document.getElementById("iframeHost"),
        width: "100%",
        height: "600px"
      }
    );
    await this._session.init();
    console.log("Session successfully initialized");
  }

  /**
   * function to add custom event handlers
   * @returns returns a promise
   */
  private _addCustomEventHandlers = async (): Promise<any> => {

    try {
      await Visio.run(this._session, async (context: Visio.RequestContext) => {
        var doc: Visio.Document = context.document;

        // on document load complete
        const onDocumentLoadCompleteEventResult: OfficeExtension.EventHandlerResult<Visio.DocumentLoadCompleteEventArgs> =
          doc.onDocumentLoadComplete.add(
            this._onDocumentLoadComplete
          );
        // on page load complete
        const onPageLoadCompleteEventResult: OfficeExtension.EventHandlerResult<Visio.PageLoadCompleteEventArgs> =
          doc.onPageLoadComplete.add(
            this._onPageLoadComplete
          );
        // on selection changed
        const onSelectionChangedEventResult: OfficeExtension.EventHandlerResult<Visio.SelectionChangedEventArgs> =
          doc.onSelectionChanged.add(
            this._onSelectionChanged
          );

        await context.sync();
        console.log("Document Load Complete handler attached");
      });
    } catch (error) {
      this.logError(error);
    }
  }

  /**
   * method executed after a on document load complete event is triggered
   * @param args event arguments
   * @returns returns a promise
   */
  private _onDocumentLoadComplete = async (args: Visio.DocumentLoadCompleteEventArgs): Promise<void> => {

    // only execute if not executed yet
    if (!this._documentLoadComplete) {

      try {
        console.log("Document Loaded Event: " + JSON.stringify(args));

        // set internal flag to prevent event from running again if triggered twice
        this._documentLoadComplete = true;

        await Visio.run(this._session, async (context: Visio.RequestContext) => {
          var doc: Visio.Document = context.document;
          // disable Hyperlinks on embed diagram
          doc.view.disableHyperlinks = true;
          // hide diagram boundary on embed diagram
          doc.view.hideDiagramBoundary = true;

          await context.sync();
        });


      } catch (error) {
        this.logError(error);
      }
    }
  }

  /**
   * method executed after a on page load event is triggered
   * @param args event arguments
   * @returns returns a promise
   */
  private _onPageLoadComplete = async (args: Visio.PageLoadCompleteEventArgs): Promise<void> => {

    // only execute if not executed yet
    if (!this._pageLoadComplete) {

      try {
        console.log("Page Loaded Event: " + JSON.stringify(args));

        // set internal flag to prevent event from running again if triggered twice
        this._pageLoadComplete = true;

        // get all relevant shapes and populate the class variable
        this._shapes = await this._getAllShapes();

        // call delegate function from the react component
        this.getAllShapes(this._shapes);

      } catch (error) {
        this.logError(error);
      }
    }
  }

  /**
   * method executed after a on selection change event is triggered
   * @param args event arguments
   * @returns returns a promise
   */
  private _onSelectionChanged = async (args: Visio.SelectionChangedEventArgs): Promise<void> => {

    try {
      console.log("Selection Changed Event " + JSON.stringify(args));

      if (args.shapeNames.length > 0 && this._shapes && this._shapes.length > 0) {

        // get name of selected item
        const selectedShapeText: string = args.shapeNames[0];

        // find selected shape on the list of pre-loaded shapes
        this._selectedShape = find(this._shapes,
          s => s.name === selectedShapeText
        );

        // call delegate function from the react component
        this.onSelectionChanged(this._selectedShape);

      } else {
        // shape was deselected
        this._selectedShape = null;
      }
    } catch (error) {
      this.logError(error);
    }
  }

  /**
   * select a shape on the visio diagram
   * @param name the name of the shape to select
   */
  public selectShape = async (name: string): Promise<void> => {

    try {

      // find the correct shape from the pre-loaded list of shapes
      // check the ShapeData item with the 'Name' key
      const shape: Visio.Shape = find(this._shapes,
        s => (find(s.shapeDataItems.items, i => i.label === "Name").value === name)
      );

      // only select shape if not the currently selected one
      if (this._selectedShape === null
        || this._selectedShape === undefined
        || (this._selectedShape && this._selectedShape.name !== shape.name)) {

        await Visio.run(this._session, async (context: Visio.RequestContext) => {
          const page: Visio.Page = context.document.getActivePage();
          const shapesCollection: Visio.ShapeCollection = page.shapes;
          shapesCollection.load();
          await context.sync();

          const diagramShape: Visio.Shape = shapesCollection.getItem(shape.name);
          // select shape on diagram
          diagramShape.select = true;

          await context.sync();
          console.log(`Selected shape '${shape.name}' in diagram`);
          this._selectedShape = shape;
        });
      } else {
        console.log(`Shape '${shape.name}' is already selected in diagram`);
      }

    } catch (error) {
      this.logError(error);
    }
  }

  /**
   * get all shapes from page
   * @returns returns a promise
   */
  private _getAllShapes = async (): Promise<Visio.Shape[]> => {

    console.log("Getting all shapes");

    try {
      let shapes: Visio.Shape[];

      await Visio.run(this._session, async (context: Visio.RequestContext) => {
        const page: Visio.Page = context.document.getActivePage();
        const shapesCollection: Visio.ShapeCollection = page.shapes;
        shapesCollection.load();
        await context.sync();

        // load all required properties for each shape
        for (let i: number = 0; i < shapesCollection.items.length; i++) {
          shapesCollection.items[i].shapeDataItems.load();
          shapesCollection.items[i].hyperlinks.load();
        }
        await context.sync();

        shapes = shapesCollection.items;

        return shapes;
      });

      return shapes;
    } catch (error) {
      this.logError(error);
    }
  }

  /**
   * initializes the embed session and attaches event handlers
   * this is the function that should be called to start the session
   * @param docUrl embed url of the document
   * @returns returns a promise
   */
  public load = async (docUrl: string): Promise<void> => {
    console.log("Start loading Visio data");

    try {

      // sets the url, modifying it if required - uses set method to re-use logic
      this.url = docUrl;

      // init
      await this._init();

      // add custom onDocumentLoadComplete event handler
      await this._addCustomEventHandlers();

      // trigger document and page loaded event handlers manually as sometimes Visio fails to trigger them
      // we are sending a null event, which is fine in this case as we don't need any of the event data
      // this is randomly happening on chrome, but seems to always fail on IE...
        // this._onDocumentLoadComplete(null);
        // this._onPageLoadComplete(null);

    } catch (error) {
      this.logError(error);
    }
  }

  /**
   * generate embed url for a document
   * @param docId the list item ID of the target document
   */
  private generateEmbedUrl = async (itemProperties: any): Promise<string> => {
    let url: string = "";

    try {
      // check if data was returned
      if (itemProperties) {
        // generate required URL
        const siteUrl: string = this._webPartContext.pageContext.site.absoluteUrl;
        const sourceDoc: string = encodeURIComponent(itemProperties.File.ContentTag.split(",")[0]);
        const fileName: string = encodeURIComponent(itemProperties.File.Name);

        if (siteUrl && sourceDoc && fileName) {
          url = `${siteUrl}/_layouts/15/Doc.aspx?sourcedoc=${sourceDoc}&file=${fileName}&action=default`;
        }
      }

    } catch (error) {
      console.error(error);
    }

    return url;
  }

  /**
   * log error
   * @param error error object
   */
  private logError = (error: any): void => {
    console.error("Error");
    if (error instanceof OfficeExtension.Error) {
      console.error("Debug info: ", JSON.stringify(error.debugInfo));
    } else {
      console.error(error);
    }
  }
}
