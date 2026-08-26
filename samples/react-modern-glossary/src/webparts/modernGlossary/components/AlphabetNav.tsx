import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import './ModernGlossary.scss';

const ALPHABET: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export interface IAlphabetNavProps {
  availableLetters: Set<string>;
  selectedLetter: string | null; 
  onSelectLetter: (letter: string | null) => void;
  isAllExpanded: boolean;
  hasVisibleItems: boolean;
  onExpandCollapseAll: () => void;
}

export const AlphabetNav: React.FC<IAlphabetNavProps> = ({
  availableLetters,
  selectedLetter,
  onSelectLetter,
  isAllExpanded,
  hasVisibleItems,
  onExpandCollapseAll
}) => {
  return (
    <nav
      className="alphabetNav"
      role="tablist"
      aria-label="Filter glossary by letter"
    >
      <div className="navActionGroup">
        <button
          type="button"
          role="tab"
          aria-selected={selectedLetter === null}
          className={
            selectedLetter === null
              ? 'actionPill actionPillActive'
              : 'actionPill'
          }
          onClick={() => onSelectLetter(null)}
        >
          Show All
        </button>

        <button
          type="button"
          className="actionPill"
          disabled={!hasVisibleItems}
          onClick={onExpandCollapseAll}
        >
          <Icon iconName={isAllExpanded ? 'CollapseContent' : 'ExploreContent'} className="actionPillIcon" />
          {isAllExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <span className="alphabetDivider" aria-hidden="true" />

      <div className="letterGrid">
        {ALPHABET.map((letter) => {
          const hasItems = availableLetters.has(letter);
          const isSelected = selectedLetter === letter;
          return (
            <button
              key={letter}
              type="button"
              role="tab"
              aria-selected={isSelected}
              disabled={!hasItems}
              title={hasItems ? `Show terms starting with ${letter}` : `No terms starting with ${letter}`}
              className={
                isSelected
                  ? 'alphabetLetter alphabetLetterActive'
                  : 'alphabetLetter'
              }
              onClick={() => onSelectLetter(letter)}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </nav>
  );
};