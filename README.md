# NEXUS downloads

Live website: https://nexus-downloads-ten.vercel.app/

GitHub: https://github.com/sinn1088/nexus-downloads

Android beta: https://github.com/sinn1088/nexus-downloads/releases/tag/v1.0.0-beta

A separate static download website. No changes to resume26 or netstalgia-os.

Source: `C:\resume26\nexus-downloads`. GitHub repository/project name: `nexus-downloads`.

Android / Android TV use one credential-free beta APK. Windows/Mac native installers and iOS packaging are unavailable and clearly labeled. The APK is a debug-signed beta, not a production signed release. No trials or automatic Android updates are implemented.

`release.json` records the version, size and SHA-256. `/downloads/NEXUS-OS-1.0.0-beta.apk` redirects to the separate GitHub Release asset. Update metadata, download URLs and installation instructions together for new versions.

`npm run check` validates assets and release metadata. `npm run dev` serves this project at its registered preview port. Production uses a separate Vercel project connected only to this repository.

Shared checklist: `C:\Users\sinn1\OneDrive\Documents\New project\NexusLauncher\NEXUS_CHECKLIST.md`. Items stay unchecked until user and Codex both accept completion.

Verification 2026-10-08: public website/logo/metadata returned HTTP 200; live downloaded APK SHA-256 matched release metadata; Android beta signature verified; personal TMDb token exclusion verified against the APK JS assets. Phone viewport had no horizontal overflow, phone/TV instruction toggles worked, and desktop visual review passed. Physical Android phone/TV runtime is still pending. Existing Vercel projects were not modified.
