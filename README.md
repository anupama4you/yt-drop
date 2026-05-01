# YTDrop 🎬

A beautiful, minimal YouTube downloader built with Electron + yt-dlp.

![YTDrop](screenshot.png)

## Features

- Download YouTube videos in 1080p, 720p, 480p, 360p
- Download audio as MP3, M4A, or WAV
- Choose your output folder
- Real-time download progress
- Dark, minimal UI with custom title bar
- Cross-platform: macOS, Windows, Linux

---

## Prerequisites

You need **yt-dlp** installed on the system running the app.

```bash
# macOS
brew install yt-dlp

# Windows (winget)
winget install yt-dlp

# Linux
sudo pip install yt-dlp --break-system-packages
```

---

## Development

```bash
# Install dependencies
npm install

# Run in development
npm start
```

---

## Build & Publish

```bash
# Install dependencies
npm install

# Build for your current platform
npm run build

# Build for specific platforms
npm run build:mac    # → dist/YTDrop.dmg
npm run build:win    # → dist/YTDrop Setup.exe
npm run build:linux  # → dist/YTDrop.AppImage
```

Output files go to the `dist/` folder.

---

## Bundling yt-dlp (optional, for standalone distribution)

To ship the app without requiring users to install yt-dlp separately:

1. Download the yt-dlp binary for your target platform from https://github.com/yt-dlp/yt-dlp/releases
2. Place it in a `bin/` folder at the root:
   ```
   bin/
     yt-dlp          ← macOS/Linux
     yt-dlp.exe      ← Windows
   ```
3. The `extraResources` config in `package.json` will include it in the built app automatically.

---

## Publishing to GitHub Releases

1. Push your code to a GitHub repo
2. Create a release tag:
   ```bash
   git tag v1.0.0 && git push --tags
   ```
3. Run the build and upload the `dist/` files to the GitHub release
4. Users download the installer for their platform

---

## Publishing to itch.io or direct

Upload the built installers from `dist/` directly.

---

## Legal

This app is for personal use. Only download content you have the right to download.
Redistribution of copyrighted content is not permitted.
