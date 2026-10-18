import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { Link } from '@fluentui/react/lib/Link';
import { IGlossaryItem } from '../models/IGlossaryItem';
import './ModernGlossary.scss';

export interface IGlossaryAccordionItemProps {
  item: IGlossaryItem;
  isExpanded: boolean;
  onToggle: (id: number) => void;
}

export const GlossaryAccordionItem: React.FC<IGlossaryAccordionItemProps> = ({
  item,
  isExpanded,
  onToggle
}) => {
  const panelId = `glossary-panel-${item.id}`;
  const headerId = `glossary-header-${item.id}`;

  return (
    <div className="accordionItem">
      <h3 className="accordionHeaderWrapper">
        <button
          type="button"
          id={headerId}
          className="accordionHeader"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => onToggle(item.id)}
        >
          <span className="accordionTitle">{item.title}</span>
          <Icon
            iconName="ChevronRight"
            className={isExpanded ? 'chevron chevronExpanded' : 'chevron'}
          />
        </button>
      </h3>

      {isExpanded && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          className="accordionPanel"
        >
          {item.description && (
            <p className="description">{item.description}</p>
          )}

          <div className="linkRow">
            {item.applicationUrl && (
              <div className="linkField">
                <span className="linkFieldLabel">Application URL</span>
                <Link href={item.applicationUrl} target="_blank" rel="noopener noreferrer">
                  {item.applicationUrlLabel || item.applicationUrl}
                </Link>
              </div>
            )}

            {item.detailsUrl && (
              <div className="linkField">
                <span className="linkFieldLabel">Details URL</span>
                <Link href={item.detailsUrl} target="_blank" rel="noopener noreferrer">
                  {item.detailsUrlLabel || item.detailsUrl}
                </Link>
              </div>
            )}
          </div>

          {!item.description && !item.applicationUrl && !item.detailsUrl && (
            <p className="emptyDetail">No additional details provided.</p>
          )}
        </div>
      )}
    </div>
  );
};