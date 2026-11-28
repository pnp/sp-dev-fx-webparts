import * as React from 'react';
import { createRoot } from 'react-dom/client';
import SmartSupportRequest from '../src/webparts/smartSupportRequest/components/SmartSupportRequest';

const root = document.getElementById('root');
if (!root) throw new Error('Preview root element was not found.');
createRoot(root).render(
  <SmartSupportRequest description="" isDarkTheme={false} instanceId="local-demo" />
);
