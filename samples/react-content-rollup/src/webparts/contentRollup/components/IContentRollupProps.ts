import * as React from 'react';
import { IRollupItem } from '../models/IRollup';

export interface IContentRollupProps {
  title: string;
  layout: string;              // card | minimal | bold | compact
  showTitle: boolean;
  frameStyle: React.CSSProperties;
  isDemo: boolean;
  accent: string;
  items: IRollupItem[];
  loading: boolean;
  error?: string;
}
