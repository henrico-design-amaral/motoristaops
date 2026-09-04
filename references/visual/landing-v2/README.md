# Landing V2 — Visual Golden Master

This folder holds the approved visual oracle(s) for the MotoristaOPS V2 landing direction.

A golden master is NOT code and must never be pasted behind the page as a background image. It is a comparison baseline used to reconstruct the page in semantic HTML/CSS while preserving visual intent.

Rules:
- never regenerate brand assets when official assets exist;
- build one section at a time;
- use the exact approved font, colors, assets and copy;
- capture the real browser output at a fixed viewport;
- compare against the golden reference after every meaningful change;
- do not promote a section while its visual diff remains materially wrong;
- once a section is approved, create a section-level golden crop so future changes cannot silently degrade it.
