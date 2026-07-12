# @plexus-ms/brand

The Plexus visual identity as a versioned dependency: the PLX-02 "Crossing" mark,
design tokens, and React components. The human-readable spec lives in the
compendium at [`plexus/brand`](https://github.com/plexus-ms/compendium/tree/main/plexus/brand);
this package is the machine-readable source of truth for assets.

## What's inside

| Entry | Contents |
| --- | --- |
| `@plexus-ms/brand` | Tokens (`colors`, `fonts`, `typeScale`, `wordmark`) and the generated mark geometry. |
| `@plexus-ms/brand/react` | `<Mark/>`, `<Wordmark/>`, `<BraidBand/>` (React 19 peer, optional). |
| `@plexus-ms/brand/brand.css` | All tokens as `--plx-*` custom properties, with `.dark` role-token overrides. |
| `@plexus-ms/brand/assets/*` | Standalone SVGs: `mark`, `mark-small`, `mark-twotone`, `mark-dark`, `favicon`, `braid-band`. |

## Construction

Every asset derives from one set of geometry constants in
`scripts/generate-assets.mjs`. The over-under gap of the crossing is cut
*geometrically* (real sub-paths found numerically, split via de Casteljau) so
the marks work on any background — no ground-colored halo tricks. The script
emits both the SVG files and `src/geometry.generated.ts`, so the React
components render the exact same paths: decide once, propagate.

Regenerate after changing geometry:

```sh
mise run generate   # or: pnpm generate
```

## Deliberately deferred

- Outlined-text wordmark SVGs (`wordmark.svg`) — need font-outlining tooling;
  use `<Wordmark/>` on the web (requires IBM Plex Mono 700 in context).
- Raster favicons / apple-touch icons — `assets/favicon.svg` (with embedded
  `prefers-color-scheme`) covers modern browsers.
