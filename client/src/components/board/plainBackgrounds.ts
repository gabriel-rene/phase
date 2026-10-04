export interface PlainBackgroundConfig {
  id: string;
  label: string;
  css: string;
}

export const PLAIN_BACKGROUNDS: PlainBackgroundConfig[] = [
  // Personal build: vintage play surfaces. `css` is a full CSS background.
  { id: "table_walnut",    label: "Walnut table", css: `radial-gradient(ellipse at center, transparent 45%, rgba(8, 5, 2, 0.55) 100%), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' base0.012 0.6requency='0.012 0.6' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.06 0 0 0 0 0.02 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E"), repeating-linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0) 5px, rgba(255,220,170,0.03) 9px, rgba(0,0,0,0) 14px), linear-gradient(180deg, #3b2716, #2c1d10)` },
  { id: "table_felt",      label: "Green felt",   css: `radial-gradient(ellipse at center, transparent 45%, rgba(8, 5, 2, 0.55) 100%), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' base0.85requency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.75 0 0 0 0 0.8 0 0 0 0 0.6 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E"), radial-gradient(ellipse at 50% 45%, #2f4a2c, #1d2f1c 75%)` },
  { id: "table_leather",   label: "Leather",      css: `radial-gradient(ellipse at center, transparent 45%, rgba(8, 5, 2, 0.55) 100%), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' base0.55requency='0.55' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.06 0 0 0 0 0.03 0 0 0 0.3 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E"), radial-gradient(ellipse at 50% 40%, #4a3221, #2a1b10 80%)` },
  { id: "plain_slate",     label: "Slate",     css: "#1e293b" },
  { id: "plain_midnight",  label: "Midnight",  css: "#0b1220" },
  { id: "plain_charcoal",  label: "Charcoal",  css: "#18181b" },
  { id: "plain_forest",    label: "Forest",    css: "#14532d" },
  { id: "plain_indigo",    label: "Indigo",    css: "#312e81" },
  { id: "plain_crimson",   label: "Crimson",   css: "#7f1d1d" },
];

export const PLAIN_BACKGROUND_MAP: Record<string, PlainBackgroundConfig> = Object.fromEntries(
  PLAIN_BACKGROUNDS.map((b) => [b.id, b]),
);
