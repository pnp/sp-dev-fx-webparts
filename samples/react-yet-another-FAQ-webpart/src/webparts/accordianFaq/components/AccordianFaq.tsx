import * as React from 'react';
import { useState, useMemo, useCallback } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEvent,
  AccordionToggleData
} from "@fluentui/react-components";
import { IAccordianFaqProps } from './IAccordianFaqProps';
import ReactMarkdown from 'react-markdown';
import { debounce } from 'lodash';
import styles from './AccordianFaq.module.scss';
import { SearchRegular } from "@fluentui/react-icons";

// Error Boundary Component
class FAQErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div role="alert" className={styles.errorMessage}>
          Something went wrong loading the FAQ content. Please try refreshing the page.
        </div>
      );
    }
    return this.props.children;
  }
}

interface AccordionGroupProps {
  items: IAccordianFaqProps['faqItems'];
  openItems: string[];
  onToggle: (event: AccordionToggleEvent, data: AccordionToggleData) => void;
  headerPosition?: 'left' | 'center';
  headerBgColor?: string;
  headerTextColor?: string;
  panelBgColor?: string;
  enableMarkdown?: boolean;
}

const renderContent = (content: string, enableMarkdown: boolean): JSX.Element => {
  if (enableMarkdown) {
    return <ReactMarkdown>{content}</ReactMarkdown>;
  }
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};


const AccordionGroup: React.FC<AccordionGroupProps> = ({
  items,
  openItems,
  onToggle,
  headerPosition = 'left',
  headerBgColor,
  headerTextColor,
  panelBgColor,
  enableMarkdown
}) => (
  <Accordion
    className={styles.accordion}
    multiple
    collapsible
    openItems={openItems}
    onToggle={onToggle}
  >
    {items.map((item, index) => {
      const itemValue = `item-${index}`;
      return (
        <AccordionItem key={itemValue} value={itemValue}>
          <AccordionHeader
            className={styles.header}
            style={{
              backgroundColor: headerBgColor,
              color: headerTextColor,
              justifyContent: headerPosition === 'center' ? 'center' : 'flex-start',
              textAlign: headerPosition === 'center' ? 'center' : 'left'
            }}
          >
            <strong>{item.Title}</strong>
          </AccordionHeader>
          <AccordionPanel
            className={styles.panel}
            style={{ backgroundColor: panelBgColor }}
          >
            {renderContent(item.Answer, enableMarkdown || false)}
          </AccordionPanel>
        </AccordionItem>
      );
    })}
  </Accordion>
);

interface GroupedFAQsProps {
  items: IAccordianFaqProps['faqItems'];
  groupField: string;
  openItems: string[];
  onToggle: (event: AccordionToggleEvent, data: AccordionToggleData) => void;
  headerPosition?: 'left' | 'center';
  headerBgColor?: string;
  headerTextColor?: string;
  panelBgColor?: string;
  enableMarkdown?: boolean;
}

// Grouped FAQs component
const GroupedFAQs: React.FC<GroupedFAQsProps> = ({
  items,
  groupField,
  openItems,
  onToggle,
  headerPosition = 'left',
  headerBgColor,
  headerTextColor,
  panelBgColor,
  enableMarkdown
}) => {
  const grouped = items.reduce((acc, item) => {
    const key = (item[groupField] as string) || 'Uncategorized';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <>
      {Object.entries(grouped).sort().map(([group, groupItems]) => (
        <section key={group} className={styles.groupSection} aria-label={group}>
          <h3 className={styles.groupHeader}>{group}</h3>
          <AccordionGroup
            items={groupItems.sort((a, b) => a.ID - b.ID)}
            openItems={openItems}
            onToggle={onToggle}
            headerPosition={headerPosition}
            headerBgColor={headerBgColor}
            headerTextColor={headerTextColor}
            panelBgColor={panelBgColor}
            enableMarkdown={enableMarkdown}
          />
        </section>
      ))}
    </>
  );
};

// Main component
const AccordianFaq: React.FC<IAccordianFaqProps> = (props): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  // Debounced search handler
  const debouncedSetSearchQuery = useMemo(
    () => debounce((value: string) => setSearchQuery(value), 300),
    []
  );

  // Memoized filtered items
  const filteredFaqItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return props.faqItems.filter(item =>
      item.Title.toLowerCase().includes(query) ||
      item.Answer.toLowerCase().includes(query)
    );
  }, [props.faqItems, searchQuery]);

  // Handle expand/collapse all
  const handleExpandAll = useCallback(() => {
    const allItemIds = filteredFaqItems.map((_, index) => `item-${index}`);
    setOpenItems(allItemIds);
  }, [filteredFaqItems]);

  const handleCollapseAll = useCallback(() => {
    setOpenItems([]);
  }, []);

  // Handle accordion toggle
  const handleToggle = useCallback((event: AccordionToggleEvent, data: AccordionToggleData) => {
    if (Array.isArray(data.openItems)) {
      const openItemsArray = data.openItems.filter((item): item is string => typeof item === 'string');
      setOpenItems(openItemsArray);
    }
  }, []);

  return (
    <FAQErrorBoundary>
      <div
        className={`${styles.container} ${props.darkMode ? styles.dark : ''}`}
        role="region"
        aria-label="FAQ Section"
      >
        {props.title && (
          <h2 className={styles.webPartTitle} id="faq-title">
            {props.title}
          </h2>
        )}

        {!props.hideExpandCollapseButtons && (
          <div
            className={`${styles.expandButtons} ${props.expandButtonsPosition === 'right' ? styles.right : styles.left
              }`}
          >
            <button
              onClick={handleExpandAll}
              className={styles.expandButton}
              aria-controls="faq-content"
            >
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              className={styles.expandButton}
              aria-controls="faq-content"
            >
              Collapse All
            </button>
          </div>
        )}

        {!props.hideSearchBar && (
          <div className={styles.searchContainer}>
            <SearchRegular className={styles.searchIcon} />
            <label htmlFor="faq-search" className={styles.srOnly}>Search FAQs</label>
            <input
              id="faq-search"
              type="search"
              placeholder="Search FAQs..."
              onChange={(e) => debouncedSetSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-controls="faq-content"
            />
          </div>
        )}

        <div id="faq-content">
          {props.groupBy ? (
            <GroupedFAQs
              items={filteredFaqItems}
              groupField={props.groupField || 'Category'}
              openItems={openItems}
              onToggle={handleToggle}
              headerPosition={props.headerPosition}
              headerBgColor={props.headerBgColor}
              headerTextColor={props.headerTextColor}
              panelBgColor={props.panelBgColor}
              enableMarkdown={props.enableMarkdown}
            />
          ) : (
            <AccordionGroup
              items={filteredFaqItems}
              openItems={openItems}
              onToggle={handleToggle}
              headerPosition={props.headerPosition}
              headerBgColor={props.headerBgColor}
              headerTextColor={props.headerTextColor}
              panelBgColor={props.panelBgColor}
              enableMarkdown={props.enableMarkdown}
            />
          )}
        </div>
      </div>
    </FAQErrorBoundary>
  );
};

export default React.memo(AccordianFaq);
