// Import React core library
import * as React from "react";
// Import ReactDOM for rendering React elements into the DOM
import * as ReactDom from "react-dom";
// Import SPFx property pane types and controls
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneHorizontalRule,
  PropertyPaneButton,
  PropertyPaneButtonType
} from "@microsoft/sp-property-pane";
// Import base class for client-side web parts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
// Import enum to detect if page is in Edit or Read mode
import { DisplayMode } from '@microsoft/sp-core-library';
// Import helper to initialize SP (e.g. PnPjs) with current context
import { getSP } from "../../common";
// Import service responsible for scanning the page and detecting web parts
import { PageScannerService } from "../../common/services/PageScannerService";
// Import service that manages reveal-on-scroll animations
import {
  RevealOnScrollService,
  PresetType,
} from "../../common/services/RevealOnScrollService";
// Import model that represents a web part on the page
import { IPageWebPart } from "../../common/models/IPageWebPart";

// Import main React component rendered by this web part
import { AnimPageMotion } from "./components/AnimPageMotion";
// Import TypeScript interface describing web part properties
import {
  IAnimPageMotionWebPartProps,

} from "./components/IAnimPageMotionProps";

// Import union type describing allowed animation preset values
import {
  
  AnimationPreset
} from "../../common/types/AnimationPreset";

// Import global CSS used by this web part
import "../../common/styles/animPageMotion.css";

// Mapping preset -> CSS class
// Helper function: convert logical animation preset to CSS class name
function mapPresetToCss(preset: AnimationPreset): PresetType {
  switch (preset) {
    case "fade":
      return "apm-fade";
    case "slide":
      return "apm-slide";
    case "scale":
      return "apm-scale";
    case "fadeUpSoft":
      return "apm-fade-soft";
    case "fadeUpStrong":
      return "apm-fade-strong";
    case "cardPop":
      return "apm-card-pop";
      default:
        // Safety: throw if an unsupported preset is used
        throw new Error('Unsupported preset:${preset}');
  }
}

// Main SPFx web part class
export default class AnimPageMotionWebPart extends BaseClientSideWebPart<IAnimPageMotionWebPartProps> {
  // Service used to scan the page and retrieve web parts
  private scanner!: PageScannerService;
  // List of web parts detected on the current page
  private pageWebParts: IPageWebPart[] = [];

  // Initialization logic for the web part
  public async onInit(): Promise<void> {
    // Initialize SP helper with current web part context
    const sp = getSP(this.context);
    // Create an instance of the page scanner service
    this.scanner = new PageScannerService(sp);

    // Ensure the configuration object exists on the web part properties
    if (!this.properties.webPartsConfig) {
      this.properties.webPartsConfig = {};
    }

    // Get current page URL from legacy page context
    const pageUrl =
      this.context.pageContext.legacyPageContext.serverRequestPath;

    // If page URL is not available, stop initialization
    if (!pageUrl) return;

    // Scan the page and get all web parts present on it
    this.pageWebParts = await this.scanner.scanPage(pageUrl);

    // For each detected web part, ensure it has a default configuration
    this.pageWebParts.forEach((wp) => {
      if (!this.properties.webPartsConfig[wp.id]) {
        this.properties.webPartsConfig[wp.id] = {
          enabled: false,    // animation disabled by default
          preset: "fade",    // default animation preset
          mode:"always",     // default animation mode
          delayMs:0          // default delay
        };
      }
    });
  }

  // Render method: called whenever the web part needs to be rendered
  public render(): void {
      // Create React element for the AnimPageMotion component
      const element = React.createElement(AnimPageMotion, {
      // Pass whether the page is currently in edit mode
      isEditMode: this.displayMode === DisplayMode.Edit
    });
    // Render the React component into the web part DOM element
    ReactDom.render(element, this.domElement);

    // Defer animation application to the next animation frame
    requestAnimationFrame(() => {
      this.applyAnimations();
    });
  }

  // Apply reveal-on-scroll animations to all configured web parts
  private applyAnimations(): void {
    // Iterate over each web part detected on the page
    this.pageWebParts.forEach((wp, index) => {
      // Get configuration for the current web part
      const config = this.properties.webPartsConfig[wp.id];
      // Skip if configuration is missing or animation is disabled
      if (!config?.enabled) return;

      // Find the DOM element matching the web part instance ID
      const el = document.querySelector<HTMLElement>(
        `[data-sp-feature-instance-id="${wp.id}"]`
      );
      // If element is not found, do nothing
      if (!el) return;

      // Map preset to the corresponding CSS class
      const cssPreset = mapPresetToCss(config.preset);

      // Register the element with the RevealOnScrollService
      RevealOnScrollService.observe(el, cssPreset, {
        mode: config.mode,
        // Use configured delay, or fallback to a stagger based on index
        delayMs: config.delayMs ?? index * 120, // automatic stagger
      });
    });
  }

  // Scroll smoothly to a specific web part on the page and briefly highlight it
  private scrollToWebPart(webPartId:string):void{
    // Select the DOM element of the target web part by its instance ID
    const el = document.querySelector<HTMLElement>(
      `[data-sp-feature-instance-id="${webPartId}"]`
    );
    // If no element is found, exit
    if (!el) return;
    // Smoothly scroll the target web part into view
    el.scrollIntoView({
      behavior:"smooth",
      block:"center"
    });
    // Add highlight CSS class to visually indicate the target
    el.classList.add("apm-highlight");
    // Remove the highlight after 1.7 seconds
    setTimeout(()=> el.classList.remove("apm-highlight"),1700)
  }

  // Triggered when the property pane configuration changes
  protected onPropertyPaneConfigurationChanged(): void {
    // Re-apply animations so that the latest settings take effect
    this.applyAnimations();
  }

  // Build the configuration of the property pane
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    // Build a group of controls for each web part detected on the page
    const groups = this.pageWebParts.map((wp) => ({
      groupName: "",
      groupFields: [
        
        // Button to scroll to the associated web part
        PropertyPaneButton("",{
          
          text:wp.title || "Web Part",     // Button text uses the web part title when available
          icon:"ChevronRight",            // Icon displayed on the button

          buttonType:PropertyPaneButtonType.Command,
          ariaDescription:"Scroll to web part",
          // On click, scroll to the corresponding web part on the page
          onClick:()=>this.scrollToWebPart(wp.id)
        }),
        // Toggle to enable or disable animation for this web part
        PropertyPaneToggle(`webPartsConfig.${wp.id}.enabled`, {
          label: "Enable animation",
        }),
        // Dropdown to select the animation preset
        PropertyPaneDropdown(`webPartsConfig.${wp.id}.preset`, {
          label: "Animation type",
          options: [
            { key: "fade", text: "Fade" },
            { key: "slide", text: "Slide" },
            { key: "scale", text: "Scale" },
            { key: "fadeUpSoft", text: "Fade Up (Soft)" },
            { key: "fadeUpStrong", text: "Fade Up (Strong)" },
            { key: "cardPop", text: "Card Pop" },
          ],
        }),
        // Dropdown to choose animation mode (once vs always)
        PropertyPaneDropdown(`webPartsConfig.${wp.id}.mode`, {
          label: "Animation mode",
          options: [
            { key: "once", text: "Once" },
            { key: "always", text: "On every scroll" },
          ],
        }),

        // Slider to configure delay before animation starts
        PropertyPaneSlider(`webPartsConfig.${wp.id}.delayMs`, {
          label: "Delay (ms)",
          min: 0,
          max: 1000,
          step: 50,
        }),
        // Horizontal rule to visually separate web parts in the property pane
         PropertyPaneHorizontalRule()
      ],
    }));

    // Return final property pane configuration
    return {
      pages: [
        {
          header: { description: "" },
          groups,
        },
      ],
    };
  }
}
