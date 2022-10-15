import { Icon } from 'office-ui-fabric-react';
import * as React from 'react';

import { ILink } from '../utils/ILink';

interface IReactAssociatedHubLinksProps {
  links: ILink[];
}

const ReactAssociatedHubLinks = (props: IReactAssociatedHubLinksProps) => {
  return (
    <section className={`tw-flex tw-gap-3 tw-flex-wrap`}>
      {props.links.map((link) => (
        <a
          className={`
            tw-border tw-border-solid tw-border-[#dddddd] tw-text-lg tw-p-3 tw-no-underline 
            tw-flex tw-gap-4 tw-items-center tw-basis-[27%] hover:tw-bg-gray-100 tw-text-inherit
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
  );
};

export { IReactAssociatedHubLinksProps, ReactAssociatedHubLinks };
