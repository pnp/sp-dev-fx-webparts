/* eslint-disable @typescript-eslint/no-explicit-any */

import { IHierarchyEntry, navLinkBuilder } from "./NavLinkBuilder";

interface IMockLink extends IHierarchyEntry<IMockLink> {
  name: string;
}

const DEPTH_NO_COLLAPSABLE_HEADER = 0;
const DEPTH_COLLAPSABLE_HEADER = 1;

describe("The NavLinkBuilder without a preceding collapsable header", () => {

  const depth = DEPTH_NO_COLLAPSABLE_HEADER;
  const h1 = depth;
  const h2 = h1 + 1;
  const h3 = h2 + 1;
  const h4 = h3 + 1;

  it("should nest correctly without h1", () => {
    const linkH2: IMockLink = {
      name: "h2",
    };
    const linkH3: IMockLink = {
      name: "h3",
    };
    const linkH2a: IMockLink = {
      name: "another h2",
    };
    const linkH3a: IMockLink = {
      name: "another h3",
    };

    const actual: any[] = [];
    navLinkBuilder.build(actual, linkH2, h2);
    navLinkBuilder.build(actual, linkH3, h3);
    navLinkBuilder.build(actual, linkH2a, h2);
    navLinkBuilder.build(actual, linkH3a, h3);

    expect(actual).toMatchSnapshot();
  });


  it("should nest correctly for wrong order headings", () => {
    const linkH1: IMockLink = {
      name: "h1",
    };
    const linkH2: IMockLink = {
      name: "h2",
    };
    const linkH3: IMockLink = {
      name: "h3",
    };
    const linkH4: IMockLink = {
      name: "h4",
    };

    const actual: any[] = [];
    navLinkBuilder.build(actual, linkH4, h4);
    navLinkBuilder.build(actual, linkH3, h3);
    navLinkBuilder.build(actual, linkH2, h2);
    navLinkBuilder.build(actual, linkH1, h1);

    expect(actual).toMatchSnapshot();
  });

  it("should nest correctly for headings with a jump", () => {
    const linkH1: IMockLink = {
      name: "h1",
    };
    const linkH2: IMockLink = {
      name: "h2",
    };
    const linkH3: IMockLink = {
      name: "h3",
    };
    const linkH4: IMockLink = {
      name: "h4",
    };

    const actual: any[] = [];
    navLinkBuilder.build(actual, linkH3, h3);
    navLinkBuilder.build(actual, linkH4, h4);
    navLinkBuilder.build(actual, linkH1, h1);
    navLinkBuilder.build(actual, linkH2, h2);

    expect(actual).toMatchSnapshot();
  });

  it("should add a single item to an empty list", () => {
    const lnk: IMockLink = {
      name: "xyz",
    };

    const actual: any[] = [];
    navLinkBuilder.build(actual, lnk, h1);

    expect(actual).toMatchSnapshot();
  });

  it("should add a two items on the same level", () => {
    const lnk1: IMockLink = {
      name: "xyz",
    };
    const lnk2: IMockLink = {
      name: "abc",
    };

    const actual: any[] = [];
    navLinkBuilder.build(actual, lnk1, h1);
    navLinkBuilder.build(actual, lnk2, h1);

    expect(actual).toMatchSnapshot();
  })

  it("should add a two items on different levels", () => {
    const lnk1: IMockLink = {
      name: "xyz",
    };
    const lnk2: IMockLink = {
      name: "abc",
    };

    const actual: any[] = [];
    navLinkBuilder.build(actual, lnk1, h1);
    navLinkBuilder.build(actual, lnk2, h2);

    expect(actual).toMatchSnapshot();
  });

  it("should add a two items on the same level and two items on different levels", () => {
    const lnk1: IMockLink = {
      name: "xyz",
    };
    const lnk2: IMockLink = {
      name: "abc",
    };
    const lnk11: IMockLink = {
      name: "xyz.1",
    };
    const lnk21: IMockLink = {
      name: "abc.1",
    };

    const actual: any[] = [];
    navLinkBuilder.build(actual, lnk1, h1);
    navLinkBuilder.build(actual, lnk11, h2);
    navLinkBuilder.build(actual, lnk2, h1);
    navLinkBuilder.build(actual, lnk21, h2);

    expect(actual).toMatchSnapshot();
  });

  it("should add a four items on different levels", () => {
    const lnk1: IMockLink = {
      name: "xyz",
    };
    const lnk2: IMockLink = {
      name: "abc",
    };
    const lnk3: IMockLink = {
      name: "def",
    };
    const lnk4: IMockLink = {
      name: "geh",
    };

    const actual: any[] = [];
    navLinkBuilder.build(actual, lnk1, h1);
    navLinkBuilder.build(actual, lnk2, h2);
    navLinkBuilder.build(actual, lnk3, h3);
    navLinkBuilder.build(actual, lnk4, h4);

    expect(actual).toMatchSnapshot();
  });

  it("should not nest two h2", () => {
    const lnk1: IMockLink = {
      name: "h1",
    };
    const lnk2: IMockLink = {
      name: "h2",
    };
    const lnk3: IMockLink = {
      name: "h2",
    };
    const lnk4: IMockLink = {
      name: "h3",
    };

    const actual: any[] = []
    navLinkBuilder.build(actual, lnk1, h1);
    navLinkBuilder.build(actual, lnk2, h2);
    navLinkBuilder.build(actual, lnk3, h2);
    navLinkBuilder.build(actual, lnk4, h3);

    expect(actual).toMatchSnapshot();
  });

  it("should not nest two h3", () => {
    const lnk0: IMockLink = {
      name: "h1",
    };
    const lnk1: IMockLink = {
      name: "h1",
    };
    const lnk2: IMockLink = {
      name: "h2",
    };
    const lnk3: IMockLink = {
      name: "h2",
    };
    const lnk4: IMockLink = {
      name: "h3",
    };
    const lnk5: IMockLink = {
      name: "h3",
    };
    const lnk6: IMockLink = {
      name: "h4",
    };

    const actual: any[] = [];
    navLinkBuilder.build(actual, lnk0, h1);
    navLinkBuilder.build(actual, lnk1, h1);
    navLinkBuilder.build(actual, lnk2, h2);
    navLinkBuilder.build(actual, lnk3, h2);
    navLinkBuilder.build(actual, lnk4, h3);
    navLinkBuilder.build(actual, lnk5, h3);
    navLinkBuilder.build(actual, lnk6, h4);

    expect(actual).toMatchSnapshot();
  });
});

describe("The NavLinkBuilder with a collapsable header", () => {
  let head: IMockLink;
  const depth = DEPTH_COLLAPSABLE_HEADER;
  const h1 = depth;
  const h2 = h1 + 1;
  const h3 = h2 + 1;
  const h4 = h3 + 1;

  beforeEach(() => {
    head = {
      name: "head",
    };
  });

  it("should nest correctly without h1", () => {
    const linkH2: IMockLink = {
      name: "h2",
    };
    const linkH3: IMockLink = {
      name: "h3",
    };
    const linkH2a: IMockLink = {
      name: "another h2",
    };
    const linkH3a: IMockLink = {
      name: "another h3",
    };

    const actual = [head];
    navLinkBuilder.build(actual, linkH2, h2);
    navLinkBuilder.build(actual, linkH3, h3);
    navLinkBuilder.build(actual, linkH2a, h2);
    navLinkBuilder.build(actual, linkH3a, h3);

    expect(actual).toMatchSnapshot();
  });

  it("should nest correctly for wrong order nestings", () => {
    const linkH1: IMockLink = {
      name: "h1",
    };
    const linkH2: IMockLink = {
      name: "h2",
    };
    const linkH3: IMockLink = {
      name: "h3",
    };
    const linkH4: IMockLink = {
      name: "h4",
    };

    const actual = [head];
    navLinkBuilder.build(actual, linkH4, h4);
    navLinkBuilder.build(actual, linkH3, h3);
    navLinkBuilder.build(actual, linkH2, h2);
    navLinkBuilder.build(actual, linkH1, h1);

    expect(actual).toMatchSnapshot();
  });

  it("should nest correctly for headings with a jump", () => {
    const linkH1: IMockLink = {
      name: "h1",
    };
    const linkH2: IMockLink = {
      name: "h2",
    };
    const linkH3: IMockLink = {
      name: "h3",
    };
    const linkH4: IMockLink = {
      name: "h4",
    };

    const actual: any[] = [];
    navLinkBuilder.build(actual, linkH3, h3);
    navLinkBuilder.build(actual, linkH4, h4);
    navLinkBuilder.build(actual, linkH1, h1);
    navLinkBuilder.build(actual, linkH2, h2);

    expect(actual).toMatchSnapshot();
  });

  it("should add a single item to the heading", () => {
    const lnk: IMockLink = {
      name: "xyz",
    };

    const actual = [head];
    navLinkBuilder.build(actual, lnk, h1);

    expect(actual).toMatchSnapshot();
  });

  it("should add a two items on the same level", () => {
    const lnk1: IMockLink = {
      name: "xyz",
    };
    const lnk2: IMockLink = {
      name: "abc",
    };

    const actual = [head];
    navLinkBuilder.build(actual, lnk1, h1);
    navLinkBuilder.build(actual, lnk2, h1);

    expect(actual).toMatchSnapshot();
  })

  it("should add a one item in a collapsable section two inside that one", () => {
    const lnk1: IMockLink = {
      name: "xyz",
    };
    const lnk2: IMockLink = {
      name: "abc",
    };
    const lnk3: IMockLink = {
      name: "def",
    };

    const actual = [head];
    navLinkBuilder.build(actual, lnk1, h1);
    navLinkBuilder.build(actual, lnk2, h2);
    navLinkBuilder.build(actual, lnk3, h2);

    expect(actual).toMatchSnapshot();
  })

  it("should not nest two h2", () => {
    const lnk1: IMockLink = {
      name: "h1",
    };
    const lnk2: IMockLink = {
      name: "h2",
    };
    const lnk3: IMockLink = {
      name: "h2",
    };
    const lnk4: IMockLink = {
      name: "h3",
    };

    const actual = [head];
    navLinkBuilder.build(actual, lnk1, h1);
    navLinkBuilder.build(actual, lnk2, h2);
    navLinkBuilder.build(actual, lnk3, h2);
    navLinkBuilder.build(actual, lnk4, h3);

    expect(actual).toMatchSnapshot();
  });

  it("should not nest two h3", () => {
    const lnk0: IMockLink = {
      name: "h1",
    };
    const lnk1: IMockLink = {
      name: "h1",
    };
    const lnk2: IMockLink = {
      name: "h2",
    };
    const lnk3: IMockLink = {
      name: "h2",
    };
    const lnk4: IMockLink = {
      name: "h3",
    };
    const lnk5: IMockLink = {
      name: "h3",
    };
    const lnk6: IMockLink = {
      name: "h4",
    };

    const actual = [head];
    navLinkBuilder.build(actual, lnk0, h1);
    navLinkBuilder.build(actual, lnk1, h1);
    navLinkBuilder.build(actual, lnk2, h2);
    navLinkBuilder.build(actual, lnk3, h2);
    navLinkBuilder.build(actual, lnk4, h3);
    navLinkBuilder.build(actual, lnk5, h3);
    navLinkBuilder.build(actual, lnk6, h4);

    expect(actual).toMatchSnapshot();
  });
});