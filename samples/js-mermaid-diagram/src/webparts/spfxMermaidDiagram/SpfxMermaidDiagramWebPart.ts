import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

// ✅ Import Mermaid.js from npm
import mermaid from 'mermaid';

export interface ISpfxMermaidDiagramWebPartProps {
  description: string;
  mermaidText: string; // Mermaid diagram definition
}

export default class SpfxMermaidDiagramWebPart extends BaseClientSideWebPart<ISpfxMermaidDiagramWebPartProps> {

  protected async onInit(): Promise<void> {
    mermaid.initialize({ startOnLoad: false }); // Initialize Mermaid.js
    return Promise.resolve();
  }

  public render(): void {
    // Get the Mermaid text from properties
    const mermaidText = this.properties.mermaidText?.trim() || '';

    // Clear previous content
    this.domElement.innerHTML = '';

    // If no Mermaid text is provided, show an error message
    if (!mermaidText) {
      this.domElement.innerHTML = `<p style="color: red; font-size: 16px;">Please include the Mermaid Diagram Text</p>`;
      return;
    }

    // Create a new unique div ID for the diagram
    const uniqueGraphId = `mermaidGraph_${new Date().getTime()}`;
    
    // Inject the container for the Mermaid diagram
    this.domElement.innerHTML = `
      <div id="${uniqueGraphId}" style="border: 1px solid #ccc; padding: 10px;"></div>
    `;

    // Render the Mermaid diagram after DOM is ready
    setTimeout(() => this._renderMermaidDiagram(mermaidText, uniqueGraphId), 100);
  }

  private async _renderMermaidDiagram(graphDefinition: string, graphId: string): Promise<void> {
    const graphDiv = this.domElement.querySelector(`#${graphId}`) as HTMLDivElement;
    
    if (!graphDiv) {
      console.error("Mermaid diagram container not found.");
      return;
    }

    try {
      const { svg, bindFunctions } = await mermaid.render(graphId, graphDefinition);
      graphDiv.innerHTML = svg;
      this.domElement.innerHTML = svg;
      console.log(svg + "Mermaid diagram rendered successfully.");

      if (bindFunctions) {
        bindFunctions(graphDiv);
      }
    } catch (error) {
      console.log("Failed to render Mermaid diagram:", error);
      graphDiv.innerHTML = `<p style="color: red;">Error rendering Mermaid diagram. Please check the syntax.</p>`;
    }
  }

  // Ensure re-rendering when Property Pane updates
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === "mermaidText" && oldValue !== newValue) {
      this.render(); // Re-render WebPart when Mermaid text changes
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Configure Mermaid Diagram"
          },
          groups: [
            {
              groupName: "Mermaid Settings",
              groupFields: [
                PropertyPaneTextField('mermaidText', {
                  label: 'Mermaid Diagram Definition',
                  multiline: true,
                  rows: 5
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
