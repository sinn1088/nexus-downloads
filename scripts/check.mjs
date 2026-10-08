import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const release = JSON.parse(
  await readFile(new URL("../release.json", import.meta.url)),
);
assert.match(release.sha256, /^[a-f0-9]{64}$/i);
assert.ok(release.sizeMB > 0);
assert.equal(release.personalCredentialsIncluded, false);
assert.equal(release.trialEnabled, false);
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
for (const section of ["downloads", "experience", "install"])
  assert.ok(html.includes(`id="${section}"`));
const config = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url)),
);
assert.ok(config.redirects[0].destination.endsWith(release.fileName));
assert.ok(html.includes("No desktop installer is available yet."));
assert.ok(html.includes("No native iOS download is available yet."));
console.log(
  "PASS: release integrity metadata, honest platform availability, sections and download route.",
);
