import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { SamplesGallery } from "./SamplesGallery";


export type MountOptions = {
  src: string;
  initialSearch?: string;
  baseUrl?: string;
  giscusSettings?: {
    repo?: string;
    repoId?: string;
    category?: string;
    categoryId?: string;
  };
  config?: Record<string, unknown>;
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
      <SamplesGallery
        src={options.src}
        initialSearch={options.initialSearch}
        baseUrl={options.baseUrl}
        giscusSettings={options.giscusSettings}
        config={options.config}
      />
    </React.StrictMode>
  );
}

function autoMount(): void {
  const els = document.querySelectorAll<HTMLElement>("[data-pnp-samples-gallery]");

  els.forEach((el) => {
    const src = el.dataset.src;
    const baseUrl = (el.getAttribute('data-base-url') || el.dataset.baseUrl || undefined) as string | undefined;
    const giscusSettings = {
      repo: (el.getAttribute('data-giscus-repo') || el.dataset.giscusRepo) as string | undefined,
      repoId: (el.getAttribute('data-giscus-repo-id') || el.dataset.giscusRepoId) as string | undefined,
      category: (el.getAttribute('data-giscus-category') || el.dataset.giscusCategory) as string | undefined,
      categoryId: (el.getAttribute('data-giscus-category-id') || el.dataset.giscusCategoryId) as string | undefined
    };
    let config: Record<string, unknown> | undefined = undefined;
    const rawConfig = el.getAttribute('data-config') || el.dataset.config;
    if (rawConfig) {
      try {
        config = JSON.parse(rawConfig as string) as Record<string, unknown>;
      } catch {
        // ignore invalid JSON
      }
    }

    if (!src) {
      return;
    }

    mount(el, { src, initialSearch: el.dataset.initialSearch, baseUrl, giscusSettings, config });
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

