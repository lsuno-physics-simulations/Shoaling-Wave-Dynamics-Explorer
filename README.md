# Coastal Wave Lab 2

A self-contained HTML/JavaScript adaptation of the supplied MATLAB coastal wave and morphodynamics simulator. Open `index.html` in a browser. No MATLAB, installation, build step, external dependencies, account, or server is required for local use.

## Publish on GitHub Pages

1. Extract the ZIP. Create a GitHub repository, for example `coastal-wave-simulator-v2`.
2. Upload the extracted folder's **contents** to the repository root. Upload `index.html`, not just the ZIP. The HTML alone is sufficient to run the simulator; retain the other files for reference.
3. In **Settings → Pages**, choose **Deploy from a branch**, select **main**, **/(root)**, and save.
4. Wait for deployment. Use the published URL shown in Pages settings, typically `https://YOUR-USERNAME.github.io/coastal-wave-simulator-v2/`.

Official instructions: [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Embed in Canvas

1. Open `Canvas-embed-code.txt` and replace **both** placeholder URLs with your published GitHub Pages URL.
2. Edit a Canvas Page and switch to the Rich Content Editor's HTML editor. Paste the iframe and link.
3. Save and test in Student View. Adjust iframe height as needed. If embeds are restricted by your institution, use the accompanying link to open the simulator in a new tab.

Use the published `github.io` URL, rather than a GitHub repository, blob, or raw-file URL. Host the simulator on GitHub Pages; do not paste its full JavaScript source into Canvas.

Official instructions: [Canvas HTML editor](https://community.instructure.com/en/kb/articles/662912-how-do-i-use-the-html-view-in-the-rich-content-editor), [external embeds](https://community.instructure.com/en/kb/articles/662934-unknown).

## What is new in Simulator 2

Adapted from Jamie Hiern’s MATLAB Simulator 2 (May 19, 2026). A separate, always-visible lower panel shows the instantaneous energy proxy η² over water-depth contours. Both panels use the same model state and time. The upper 3D surface is now colored by η², matching MATLAB, with white breaking cells. Auto scaling uses the current maximum η² with a 10⁻⁶ m² floor; fixed energy ranges are available for comparing runs. The 3D surface and lower energy panel share the energy scale. Signed elevation maps retain their own diverging scale. The energy panel does not use white foam overlays, so breaking does not obscure energy values.

The snapshot includes both plots. The original version’s package is preserved separately.

## Controls

Start/Pause, Step (0.01 model seconds), Reset, amplitude, mean swell angle, playback speed, and stop time. The page initially pauses to avoid unexpected animation. Space toggles playback while the plot has focus. Drag the 3D surface to rotate. The upper plot offers five views showing surface height, elevation map, energy proxy, water depth, and depth change. Snapshot saves both plots as one PNG. Changing a seabed feature resets time and repeats the same seeded swell. Physics switches apply as the simulation advances. Reload restores defaults. No student data is stored or transmitted; there is no grading integration.

## Conversion notes and limitations

This is a browser adaptation, **not a bit-for-bit MATLAB translation** or a validated engineering model. `original-matlab.m` preserves the supplied program verbatim.

- Domain 320 × 220 m, g = 9.81 m/s², dt = 0.01 s. Grid reduced from 240 × 180 to 160 × 110 for browser speed. Default stop time is 60 s to let waves cross the domain; 10 s remains available.
- The base slope, sandbar, channel, reef, headland, and 1 m minimum initial depth use the supplied formulas.
- Conservative nearest-neighbor face fluxes approximate div(h grad η), rather than nested MATLAB gradient calls. Side and far boundaries have zero normal gradient. The rightmost 50 m has the original quadratic sponge strength when enabled. A small background damping rate of 0.003 s⁻¹ limits persistent numerical noise.
- The original script redraws wave numbers, directions, and phases each time step and adds forcing directly to displacement. Here, 12 seeded components remain fixed through a run and prescribe elevation at the offshore edge with a 5 s ramp. Frequencies use ω² = g k tanh(22k). The amplitude control is a scale parameter, not significant wave height; individual components have amplitude A/√12. Turning off directional swell selects one regular wave instead of removing forcing. Set amplitude to zero to remove forcing.
- The original dispersion differentiates the Laplacian once in each direction. This version substitutes the heuristic fourth-derivative correction −0.01 g h² ∇⁴η. This is numerically distinct and is **not a physical Boussinesq solver**; its constant is a demonstration coefficient. The explicit step is small for the supplied grid and depth range.
- Breaking uses 2|η|/h > 0.78 and multiplies affected updated elevations by 0.82 per step. White marks those cells.
- The energy display is η² in m², matching the original proxy, rather than total physical energy density in J/m².
- Sediment defaults off and follows h_t = 10⁻⁵ ∇²(η²), with depths clamped to 1–25 m. Enabling sediment also clips initial depths above 25 m, as the MATLAB branch does; this can dominate the depth-change display. No Gaussian bathymetry smoothing is applied: repeatedly smoothing would change the seabed even without waves. This heuristic has no calibrated sediment transport or mass conservation. Changes are tiny at the supplied coefficient; the depth-change view rescales to expose them.
- The MATLAB per-step Gaussian surface filter is omitted to avoid suppressing waves excessively. Damping and the small step provide regularization. There are no currents, wetting/drying, shoreline runup, or validated sediment predictions.
- 3D surface height is exaggerated. Depth contours at 2 m intervals are projected onto the water surface rather than drawn as a separate 3D bed. Maps use increasing y downward; the lower map preserves the domain aspect ratio. Contours are approximate raster bands.

## Verification

The JavaScript was executed under Node with a mocked DOM/canvas (run `node verify.cjs` to repeat) to check initialization, finite propagation, seeded repeatability, zero-amplitude invariance, a high-amplitude run with sediment enabled and sponge disabled, depth limits, feature reset, all five upper rendering code paths, synchronized energy colors and ranges, the zero-energy scale floor, and combined snapshot dimensions. This does not verify browser painting, pointer interactions, Canvas embedding, or agreement with MATLAB. Visual browser QA was not performed for this version; the available browser rejected local-file preview under its URL policy during the previous conversion. Test the deployed page and Student View after upload.

## Package

- `index.html`: complete interactive app (embedded CSS and JavaScript).
- `Canvas-embed-code.txt`: iframe plus separate launch link.
- `original-matlab.m`: unchanged supplied source.
- `.nojekyll`: static GitHub Pages marker.
- `README.md`: setup, model differences, and verification limits.
- `verify.cjs`: repeatable numerical and render-path checks (requires Node.js).

This package has been prepared for upload; no GitHub repository or Canvas Page has been modified.


