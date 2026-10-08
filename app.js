const instructions = {
  android: [
    [
      "Download the APK",
      "Use the Android download button on this phone, or transfer the downloaded file from your computer.",
    ],
    [
      "Open it in Files",
      "Find NEXUS-OS-1.0.0-beta.apk in Downloads. If prompted, allow your file manager to install this app, then choose Install.",
    ],
    [
      "Make yourself at home",
      "Open NEXUS OS from its app icon. It currently opens in landscape. Add your own TMDb read token in Settings for movie and TV discovery.",
    ],
    [
      "Try the essentials",
      "Check live TV sound, channel switching, Back and opening your streaming apps. Bluetooth remote behavior needs testing on your particular device.",
    ],
  ],
  tv: [
    [
      "Download the same APK",
      "Android TV and compatible Android TV boxes use the same APK as the phone beta. Android 7.0 or newer is required.",
    ],
    [
      "Transfer it to your TV",
      "Copy the APK using a USB drive if supported, or a file-transfer method you already use. Open it with a file manager on your TV.",
    ],
    [
      "Install and open NEXUS OS",
      "If prompted, allow that file manager to install the APK. Launch NEXUS from the Apps screen. Android TV boxes vary; not every box is verified yet.",
    ],
    [
      "Give your remote a test",
      "Try arrows, Select and Back, then test playback, sound and app switching. Keep your existing home launcher until you are happy with how NEXUS behaves.",
    ],
  ],
};
const steps = document.querySelector("#installation-steps");
function showInstructions(platform, scroll = false) {
  const selected = platform === "tv" ? "tv" : "android";
  steps.replaceChildren(
    ...instructions[selected].map(([title, description], index) => {
      const row = document.createElement("article");
      row.className = "step";
      const number = document.createElement("span");
      number.className = "step-number";
      number.textContent = `0${index + 1}`;
      const content = document.createElement("div");
      const heading = document.createElement("h3");
      heading.textContent = title;
      const text = document.createElement("p");
      text.textContent = description;
      content.append(heading, text);
      row.append(number, content);
      return row;
    }),
  );
  document
    .querySelectorAll(".device-switch [data-platform]")
    .forEach((button) => {
      const active = button.dataset.platform === selected;
      button.classList.toggle("selected", active);
      button.setAttribute("aria-pressed", String(active));
    });
  if (scroll)
    document
      .querySelector("#install")
      .scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
}
document
  .querySelectorAll("[data-platform]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      showInstructions(
        button.dataset.platform,
        !button.closest(".device-switch"),
      ),
    ),
  );
showInstructions("android");
fetch("/release.json")
  .then((response) => {
    if (!response.ok) throw new Error("Release information unavailable");
    return response.json();
  })
  .then((release) => {
    document
      .querySelectorAll("[data-release-size]")
      .forEach((node) => (node.textContent = `${release.sizeMB} MB · APK`));
    document
      .querySelectorAll("[data-release-version]")
      .forEach((node) => (node.textContent = release.version));
    document.querySelector("#checksum").textContent = release.sha256;
  })
  .catch(() => {
    document
      .querySelectorAll("[data-release-size]")
      .forEach((node) => (node.textContent = "Android APK"));
    document.querySelector("#checksum").textContent =
      "Verification details are temporarily unavailable. Please retry later.";
  });
