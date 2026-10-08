# NEXUS downloads

A separate static download website. No changes to resume26 or netstalgia-os.

Source: `C:\resume26\nexus-downloads`. GitHub repository/project name: `nexus-downloads`.

Android / Android TV use one credential-free beta APK. Windows/Mac native installers and iOS packaging are unavailable and clearly labeled. The APK is a debug-signed beta, not a production signed release. No trials or automatic Android updates are implemented.

`release.json` records the version, size and SHA-256. `/downloads/NEXUS-OS-1.0.0-beta.apk` redirects to the separate GitHub Release asset. Update metadata, download URLs and installation instructions together for new versions.

`npm run check` validates assets and release metadata. `npm run dev` serves this project at its registered preview port. Production uses a separate Vercel project connected only to this repository.

Shared checklist: `C:\Users\sinn1\OneDrive\Documents\New project\NexusLauncher\NEXUS_CHECKLIST.md`. Items stay unchecked until user and Codex both accept completion.
