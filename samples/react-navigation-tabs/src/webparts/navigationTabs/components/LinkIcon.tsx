/**
 * LinkIcon Component
 *
 * Renders an icon for a navigation link. If the link has a custom image URL
 * (from the LinkIcon Thumbnail column), it displays the image scaled to the
 * requested size. Otherwise it falls back to a generic Fluent UI "Link" icon.
 */

import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { Image, ImageFit } from '@fluentui/react/lib/Image';

export interface ILinkIconProps {
  /** URL of the custom icon image. Empty string triggers the fallback icon. */
  iconUrl: string;
  /** Width and height in pixels for the icon. */
  size: number;
  /** Alt text for the image (uses the link title). */
  title: string;
}

export const LinkIcon: React.FC<ILinkIconProps> = ({ iconUrl, size, title }) => {
  // Custom image provided — render it at the specified size
  if (iconUrl) {
    return (
      <Image
        src={iconUrl}
        alt={title}
        width={size}
        height={size}
        imageFit={ImageFit.contain}
      />
    );
  }

  // No custom image — show a generic link icon from Fluent UI
  return (
    <Icon
      iconName="Link"
      styles={{ root: { fontSize: size, width: size, height: size, lineHeight: `${size}px` } }}
      aria-hidden="true"
    />
  );
};
