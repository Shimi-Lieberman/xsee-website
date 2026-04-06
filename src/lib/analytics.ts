import posthog from "posthog-js";

export const track = (event: string, properties?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  posthog.capture(event, properties);
};

export const Analytics = {
  ctaClicked: (location: string, label: string) => track("cta_clicked", { location, label }),

  demoPageViewed: () => track("demo_page_viewed"),
  demoScreenReached: (screen: number, name: string) => track("demo_screen_reached", { screen, name }),

  formStarted: (formName: string) => track("form_started", { form_name: formName }),
  formSubmitted: (formName: string) => track("form_submitted", { form_name: formName }),
  formAbandoned: (formName: string, lastField: string) =>
    track("form_abandoned", { form_name: formName, last_field: lastField }),

  pricingViewed: () => track("pricing_viewed"),
  freeScanViewed: () => track("free_scan_viewed"),

  scrollDepth: (percent: number) => track("scroll_depth", { percent }),
};
