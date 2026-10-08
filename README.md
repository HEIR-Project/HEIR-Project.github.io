# HEIR project website

Anonymous, responsive static project page based on the supplied ICLR 2027 manuscript. No build step, analytics, or third-party runtime requests. Fonts are bundled locally. Video players use the supplied edited clips, re-encoded without audio for web delivery; original files remain unchanged.

Preview from this directory with `python3 -m http.server 8000`. Publish the contents of this directory at the root of a GitHub Pages repository. Relative asset paths also support project-repository Pages URLs.

## Contents

- `index.html`: project narrative, demos, dataset and benchmark.
- `styles.css`: desktop and mobile layout.
- `app.js`: accessible benchmark tabs, result tables/charts, figure enlargement.
- `assets/paper.pdf`: supplied anonymous manuscript, renamed without an author identifier.
- `assets/*.mp4`: edited demo clips (speed labels are preserved).
- `assets/*overview.png`: figure crops from the supplied paper.

Before public release, confirm demo control modes and public-display permission, anonymize recognizable people and laptop contents as needed, and verify the actual dataset availability. The current manuscript differs between the Figure 3 caption (16 categories) and Section 3.5 (20); category counts are intentionally omitted. Tables use physical error units where Table 6's caption incorrectly says all values are percentages. The existing HEIR-Code repository link is preserved. No official acceptance claim is included.
