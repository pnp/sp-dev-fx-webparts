import * as React from 'react';
import { IGlossaryGroup } from '../models/IGlossaryItem';
import { GlossaryAccordionItem } from './GlossaryAccordionItem';
import './ModernGlossary.scss';

export interface IGlossaryGroupProps {
  group: IGlossaryGroup;
  expandedIds: Set<number>;
  onToggleItem: (id: number) => void;
}

export const GlossaryGroupSection: React.FC<IGlossaryGroupProps> = ({
  group,
  expandedIds,
  onToggleItem
}) => {
  return (
    <section className="letterGroup" aria-labelledby={`letter-heading-${group.letter}`}>
      <div className="accordionList">
        {group.items.map((item) => (
          <GlossaryAccordionItem
            key={item.id}
            item={item}
            isExpanded={expandedIds.has(item.id)}
            onToggle={onToggleItem}
          />
        ))}
      </div>
    </section>
  );
};