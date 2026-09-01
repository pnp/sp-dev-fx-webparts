import * as React from 'react';
import { useState } from 'react';
import { Card, CardHeader, Text } from '@fluentui/react-components';
import { ICard } from '../types/ICard';
import { toCardViewModel } from '../utils/normalizeCards';
import { IAceReferenceProps } from './IAceReferenceProps';
import styles from './AceReference.module.scss';

const AceReference: React.FC<IAceReferenceProps> = ({ title, cards }) => {
  const [selected, setSelected] = useState<ICard | undefined>();
  return <main className={styles.root} aria-labelledby="ace-reference-title">
    <Text as="h2" size={600} weight="semibold" className={styles.heading} id="ace-reference-title">{title || 'Viva Connections reference'}</Text>
    <Text as="p" className={styles.intro}>Select a card to preview the detail experience used by an ACE.</Text>
    {cards.length ? <div className={styles.grid} role="list">{cards.map(card => { const view = toCardViewModel(card); return <Card key={card.id} className={styles.card} role="listitem" tabIndex={0} aria-label={view.ariaLabel} onClick={() => setSelected(card)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(card); } }}>
      <CardHeader header={<Text weight="semibold">{view.title}</Text>} description={<Text className={styles.category}>{view.category}</Text>} />
      <Text className={styles.summary}>{view.summary}</Text>
    </Card>; })}</div> : <Text className={styles.empty}>No valid cards are configured.</Text>}
    {selected && <section className={styles.panel} aria-live="polite" aria-labelledby="ace-detail-title"><Text as="h3" size={500} weight="semibold" className={styles.panelTitle} id="ace-detail-title">{selected.title}</Text><Text as="p">{selected.summary}</Text>{selected.link && <a className={styles.link} href={selected.link} target="_blank" rel="noreferrer">Open related link<span className="ms-hidden"> (opens in a new tab)</span></a>}</section>}
  </main>;
};
export default AceReference;
