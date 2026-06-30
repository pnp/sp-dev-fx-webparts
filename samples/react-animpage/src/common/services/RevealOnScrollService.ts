// Type alias for all supported CSS animation preset class names
export type PresetType =
  | "apm-fade"
  | "apm-slide"
  | "apm-scale"
  | "apm-fade-soft"
  | "apm-fade-strong"
  | "apm-card-pop";

// Options used when registering an element with the reveal-on-scroll service
interface ObserveOptions {
  // "once" = animate only the first time it appears
  // "always" = animate every time it enters/leaves the viewport
  mode: "once" | "always";
  // Optional delay before showing the element (in milliseconds)
  delayMs?: number;
}

// Service responsible for revealing elements when they scroll into view
export class RevealOnScrollService {
  // Shared IntersectionObserver instance used for all observed elements
  private static observer = new IntersectionObserver(
    (entries) => {
      // Callback executed whenever observed elements intersect the viewport
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        // Read the animation mode from data attributes
        const mode = el.dataset.apmMode as "once" | "always";

        if (entry.isIntersecting) {
          // Element enters the viewport
          const delay = Number(el.dataset.apmDelay || 0);

          // Apply a delay before making the element visible
          setTimeout(() => {
            el.classList.add("apm-visible");
          }, delay);

          // If mode is "once", stop observing this element after first reveal
          if (mode === "once") {
            this.observer.unobserve(el);
          }
        } else if (mode === "always") {
          // Element leaves the viewport and mode is "always":
          // remove the visible class so it can animate again next time
          el.classList.remove("apm-visible");
        }
      });
    },
    {
      // Intersection configuration:
      // threshold: 0 => callback when any pixel intersects
      threshold: 0,
      // rootMargin: negative bottom margin triggers a bit earlier before fully in view
      rootMargin: "0px 0px -20% 0px",
    }
  );

  // Register an element to be animated when it scrolls into view
  public static observe(
    el: HTMLElement,
    preset: PresetType,
    options: ObserveOptions
  ): void {
    // Remove any previous animation or visibility classes
    el.classList.remove(
      "apm-visible",
      "apm-fade",
      "apm-slide",
      "apm-scale",
      "apm-fade-soft",
      "apm-fade-strong",
      "apm-card-pop"
    );

    // Add the selected animation preset class
    el.classList.add(preset);

    // Store configuration on data attributes for later use in the observer callback
    el.dataset.apmMode = options.mode;
    el.dataset.apmDelay = String(options.delayMs ?? 0);

    // Start observing this element for intersection events
    this.observer.observe(el);
  }
}
