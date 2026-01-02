import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { SamplesGallery } from "./SamplesGallery";


export type MountOptions = {
  src: string;
  initialSearch?: string;
};

const roots = new WeakMap<Element, Root>();

export function mount(el: Element, options: MountOptions): void {


  const existing = roots.get(el);
  if (existing) {
    existing.unmount();
  }

  const root = createRoot(el);
  roots.set(el, root);

  root.render(
    <React.StrictMode>
      <SamplesGallery src={options.src} initialSearch={options.initialSearch} />
    </React.StrictMode>
  );
}

function autoMount(): void {
  const els = document.querySelectorAll<HTMLElement>("[data-pnp-samples-gallery]");

  els.forEach((el) => {
    const src = el.dataset.src;

    if (!src) {
      return;
    }

    mount(el, { src, initialSearch: el.dataset.initialSearch });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autoMount);
} else {
  autoMount();
}

declare global {
  interface Window {
    PnpSamplesGallery?: { mount: typeof mount };
  }
}
window.PnpSamplesGallery = { mount };

