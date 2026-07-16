import * as React from 'react';
import { Card, Image, makeStyles, Text, tokens } from '@fluentui/react-components';

export interface IResultViewerProps {
  result: unknown;
  error?: string;
}

interface IContentBlock {
  type?: unknown;
  text?: unknown;
  data?: unknown;
  mimeType?: unknown;
  url?: unknown;
}

const useStyles = makeStyles({
  card: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS },
  error: { backgroundColor: tokens.colorPaletteRedBackground1, color: tokens.colorPaletteRedForeground1 },
  pre: { margin: 0, overflowX: 'auto', whiteSpace: 'pre-wrap' },
  image: { maxWidth: '100%', height: 'auto' },
});

const isContentResult = (value: unknown): value is { content: unknown[] } =>
  typeof value === 'object' && value !== null && Array.isArray((value as { content?: unknown }).content);

const imageSource = (block: IContentBlock): string | undefined => {
  if (typeof block.url === 'string') return block.url;
  if (typeof block.data !== 'string') return undefined;
  return `data:${typeof block.mimeType === 'string' ? block.mimeType : 'image/png'};base64,${block.data}`;
};

export const ResultViewer: React.FC<IResultViewerProps> = ({ result, error }) => {
  const styles = useStyles();

  if (error) {
    return <Card className={`${styles.card} ${styles.error}`}><Text weight="semibold">{error}</Text></Card>;
  }
  if (result === undefined || result === null) return null;

  if (!isContentResult(result)) {
    return <Card className={styles.card}><pre className={styles.pre}>{JSON.stringify(result, null, 2)}</pre></Card>;
  }

  return (
    <Card className={styles.card}>
      {result.content.map((content, index) => {
        const block = (typeof content === 'object' && content !== null ? content : {}) as IContentBlock;
        if (block.type === 'text' && typeof block.text === 'string') {
          return <pre key={index} className={styles.pre}>{block.text}</pre>;
        }
        const source = block.type === 'image' ? imageSource(block) : undefined;
        if (source) return <Image key={index} className={styles.image} src={source} alt="Tool result" />;
        return <pre key={index} className={styles.pre}>{JSON.stringify(content, null, 2)}</pre>;
      })}
    </Card>
  );
};
