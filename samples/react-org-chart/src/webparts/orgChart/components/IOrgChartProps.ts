import * as React from 'react';
import { IOrgNode } from '../models/IOrgNode';
import { OrgService } from '../services/OrgService';

export interface IOrgChartProps {
  title: string;
  view: string;                // teams (vertical list) | tree (horizontal)
  layout: string;              // card | minimal | bold | compact
  showTitle: boolean;
  frameStyle: React.CSSProperties;
  showPhoto: boolean;
  webUrl: string;
  accent: string;
  // Theme colours for the full-screen explorer (so it respects dark mode).
  overlayBg?: string;
  overlayText?: string;
  overlayBar?: string;

  // Data
  isDemo: boolean;
  demoManager?: IOrgNode;
  demoMe?: IOrgNode;
  demoReports?: IOrgNode[];
  service?: OrgService;        // live data source (undefined in demo mode)
  rootAccount?: string;        // '' / undefined = the signed-in viewer

  // Behaviour
  maxReports: number;          // reports shown before a "Show all" expander; 0 = always show all
  enableActions: boolean;      // email / Teams chat / Teams call / profile links on each card
  showExport: boolean;         // show the Print / Save-as-PDF button in the full-screen explorer

  // Optional Graph presence (undefined = off). Resolves emails -> availability string.
  presenceProvider?: (emails: string[]) => Promise<Record<string, string>>;
}
