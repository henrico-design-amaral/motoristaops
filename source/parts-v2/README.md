`source/parts/*.htmlfrag` is the canonical modular source for the production MotoristaOPS landing page and is assembled by the protected deployment workflow. `source/index.html` and this `source/parts-v2` directory are legacy/read-only snapshots and must not be used as the source of truth for new changes.

Functional iconography is canonicalized on Lucide Icons: 24x24 base, outline/monoline, `stroke-width: 1.75`, rounded caps/joins, `fill: none`, and `currentColor`. Operational sizes are 24 px for actions/metadata, 32 px for service/process cards, and 42 px for editorial differentiators. Champagne is the default icon color on dark surfaces; Amber is reserved for route/location/path semantics. External brand marks such as WhatsApp and Instagram remain official brand assets and are not part of the Lucide functional family.

See `source/ICONOGRAPHY.md` for the semantic map and implementation contract.
