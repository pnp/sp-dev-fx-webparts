jest.mock("react-dom/client", () => ({
  createRoot: jest.fn()
}));

jest.mock("@microsoft/sp-core-library", () => ({
  Version: { parse: jest.fn() }
}));

jest.mock("@microsoft/sp-webpart-base", () => ({
  BaseClientSideWebPart: class {
    public domElement = document.createElement("div");
    public properties = {};
    public context = {};
  }
}));

jest.mock("@microsoft/sp-property-pane", () => ({}));
jest.mock("@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker", () => ({}));
jest.mock("@pnp/sp", () => ({}));
jest.mock("@pnp/sp/profiles", () => ({}));
jest.mock("OrganizationChartWebPartStrings", () => ({}), { virtual: true });
jest.mock("../../components/OrgChart/OrgChart", () => ({
  OrgChart: () => null
}));

import { createRoot } from "react-dom/client";
import OrganizationChartWebPart from "./OrganizationChartWebPart";

class TestOrganizationChartWebPart extends OrganizationChartWebPart {
  public get element(): HTMLElement {
    return this.domElement;
  }

  public dispose(): void {
    this.onDispose();
  }
}

describe("OrganizationChartWebPart React 18 lifecycle", () => {
  const root = {
    render: jest.fn(),
    unmount: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(createRoot).mockReturnValue(root);
  });

  it("reuses one root when rendering property updates", () => {
    const webPart = new TestOrganizationChartWebPart();

    webPart.render();
    webPart.render();

    expect(createRoot).toHaveBeenCalledTimes(1);
    expect(createRoot).toHaveBeenCalledWith(webPart.element);
    expect(root.render).toHaveBeenCalledTimes(2);
  });

  it("unmounts and clears the root when disposed", () => {
    const webPart = new TestOrganizationChartWebPart();

    webPart.render();
    webPart.dispose();
    webPart.dispose();

    expect(root.unmount).toHaveBeenCalledTimes(1);

    webPart.render();

    expect(createRoot).toHaveBeenCalledTimes(2);
  });

  it("can be disposed before the first render", () => {
    const webPart = new TestOrganizationChartWebPart();

    expect(() => webPart.dispose()).not.toThrow();
    expect(root.unmount).not.toHaveBeenCalled();
  });
});
