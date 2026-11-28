import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import SmartSupportRequest from '../../src/webparts/smartSupportRequest/components/SmartSupportRequest';

let root: Root | undefined;
let container: HTMLDivElement | undefined;

export function mount(): void {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  root.render(<SmartSupportRequest description="" isDarkTheme={false} instanceId="isolation-test" />);
}

export function unmount(): void {
  root?.unmount();
  container?.remove();
  root = undefined;
  container = undefined;
}
