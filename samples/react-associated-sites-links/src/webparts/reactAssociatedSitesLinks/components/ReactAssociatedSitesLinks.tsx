import { SPFI } from "@pnp/sp";
import { SearchResults } from "@pnp/sp/search";
import {
  Icon,
  Shimmer,
  ShimmerElementType,
} from "office-ui-fabric-react";
import * as React from "react";
import { useEffect, useState } from "react";

import { ILink } from "../utils/ILink";

interface IReactAssociatedSitesLinksProps {
  sp: SPFI;
}

const ReactAssociatedSitesLinks = (
  props: IReactAssociatedSitesLinksProps
): JSX.Element => {
  const shimmerElements = [
    { type: ShimmerElementType.line, width: 255.67, height: 66 },
    { type: ShimmerElementType.gap, width: 12 },
    { type: ShimmerElementType.line, width: 255.67, height: 66 },
    { type: ShimmerElementType.gap, width: 12 },
    { type: ShimmerElementType.line, width: 255.67, height: 66 },
  ];

  const [isDataLeaded, setIsDataLoded] = useState(false);
  const [links, setLinks] = useState<ILink[]>([]);

  useEffect(() => {
    getAssociatedSitesLinks()
      .then((result) => {
        setLinks(result);
        setIsDataLoded(true);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed on getting associated sites links.");
      });
  }, []);

  async function getAssociatedSitesLinks(): Promise<ILink[]> {
    const site = await props.sp.site();
    const searchResults: SearchResults = await props.sp.search(
      `DepartmentId=${site.Id} contentclass:sts_site -SiteId:${site.Id}`
    );
    return searchResults.PrimarySearchResults.map(
      (result): ILink => ({
        title: result.Title,
        url: result.Path,
        logoUrl: result.SiteLogo,
      })
    );
  }

  return (
    <>
      {isDataLeaded ? (
        <section className={`tw-flex tw-gap-3 tw-flex-wrap`}>
          {links.map((link) => (
            <a
              key={link.url}
              className={`
              tw-border tw-border-solid tw-border-[#dddddd] tw-text-lg tw-p-3 tw-no-underline 
              tw-flex tw-gap-4 tw-items-center tw-basis-[32%] hover:tw-bg-gray-100 tw-text-inherit
              tw-h-[66px] tw-box-border
            `}
              href={link.url}
            >
              {link.logoUrl ? (
                <img src={link.logoUrl} className="tw-w-10" alt="logo" />
              ) : (
                <Icon className="tw-text-lg" iconName="Globe" />
              )}
              {link.title}
            </a>
          ))}
        </section>
      ) : (
        <Shimmer shimmerElements={shimmerElements} />
      )}
    </>
  );
};

export { IReactAssociatedSitesLinksProps, ReactAssociatedSitesLinks };
