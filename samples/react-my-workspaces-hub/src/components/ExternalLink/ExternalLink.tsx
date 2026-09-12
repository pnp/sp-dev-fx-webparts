import * as React from 'react';
import { Link } from '@fluentui/react-components';
import { OpenRegular } from '@fluentui/react-icons';

export interface IExternalLinkProps {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

const ExternalLink: React.FC<Readonly<IExternalLinkProps>> = ({ href, children, ariaLabel }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
    <Link href={href} target="_blank" rel="noopener noreferrer" data-interception="off">
      {children}
    </Link>
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-interception="off"
      aria-label={ariaLabel ?? 'Open in new tab'}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <OpenRegular fontSize={14} />
    </Link>
  </span>
);

export default ExternalLink;