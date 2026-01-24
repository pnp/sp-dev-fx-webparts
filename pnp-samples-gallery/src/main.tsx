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
  admin?: boolean;
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
        admin={options.admin}
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
  const adminFlag = (el.getAttribute('data-admin') || el.dataset.admin) as string | undefined;
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

    // Treat explicit true/1 values or the presence of the attribute as admin.
    // Coerce explicitly to a boolean so `SamplesGallery` always receives a boolean.
    const admin = Boolean(adminFlag === "true" || adminFlag === "1" || el.hasAttribute('data-admin'));

    // Force a console log for every mount so debugging is always visible.
    try {
      console.log("PnpSamplesGallery: autoMount element", { src, adminFlag, admin, el });
    } catch {
      // swallow logging errors
    }

    // Always write a debug attribute (stringified boolean) so DOM inspection shows the computed value.
    try {
      el.setAttribute('data-pnp-admin-detected', String(admin));
    } catch {
      // ignore DOM write errors
    }
    if (!src) {
      return;
    }

    mount(el, { src, initialSearch: el.dataset.initialSearch, baseUrl, giscusSettings, config, admin });
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

