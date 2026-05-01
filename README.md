# YTDrop

**A simple YouTube video and audio downloader for macOS, Windows, and Linux.** 🎬

YTDrop gives you a clean desktop app for saving YouTube videos or extracting audio, without ads, sign-ins, or confusing menus.

---

## What You Can Do ✨

- Download YouTube videos as MP4
- Save audio as MP3, M4A, or WAV
- Pick video quality: Best Quality, 1080p, 720p, 480p, or 360p
- Choose where files are saved
- See live download progress
- Open your download folder when finished
- Use a dark, minimal interface

---

## Download & Install 📦

Go to the **[latest release](../../releases/latest)** and download the file for your computer.

### macOS Apple Silicon

Use this if your Mac has an Apple M1, M2, M3, or M4 chip.

1. Download **YTDrop-1.0.0-arm64.dmg**
2. Open the `.dmg` file
3. Drag **YTDrop** into your **Applications** folder
4. Open YTDrop from Launchpad, Spotlight, or Applications

If macOS says the app cannot be opened, go to **System Settings -> Privacy & Security** and click **Open Anyway**.

### macOS Intel

Use this if your Mac has an Intel processor.

1. Download **YTDrop-1.0.0.dmg**
2. Open the `.dmg` file
3. Drag **YTDrop** into your **Applications** folder
4. Open YTDrop from Launchpad, Spotlight, or Applications

Not sure which Mac you have? Click the Apple menu and choose **About This Mac**.

If macOS says the app cannot be opened, go to **System Settings -> Privacy & Security** and click **Open Anyway**.

### Windows

1. Download **YTDrop-1.0.0-win.zip**
2. Right-click the `.zip` file and choose **Extract All**
3. Open the extracted folder
4. Double-click **YTDrop.exe**

No installer is needed. You can keep the folder anywhere you like.

If Windows SmartScreen appears, click **More info** and then **Run anyway**. This can happen because the app is not code-signed yet.

### Linux

1. Download **YTDrop.AppImage**
2. Make it executable:

   ```bash
   chmod +x YTDrop.AppImage
   ```

3. Run it:

   ```bash
   ./YTDrop.AppImage
   ```

---

## How To Use YTDrop 🚀

1. Copy a YouTube video link
2. Paste it into YTDrop
3. Choose your format, such as **1080p MP4** or **MP3 Audio**
4. Choose where you want to save the file
5. Click **Download**
6. Wait for the progress bar to finish

That is it. Your file will be saved in the folder you selected.

---

## Format Guide 🎧

| Choose this | Best for |
| --- | --- |
| Best Quality | Highest available MP4 video quality |
| 1080p MP4 | Full HD video |
| 720p MP4 | Smaller HD video files |
| 480p MP4 | Standard quality video |
| 360p MP4 | Small video files |
| MP3 Audio | Music, podcasts, and general audio |
| M4A Audio | Good quality audio with smaller files |
| WAV Audio | Uncompressed audio |

---

## System Requirements 💻

| System | Minimum |
| --- | --- |
| macOS | macOS 10.13 High Sierra or later |
| Windows | Windows 10 or later, 64-bit |
| Linux | A modern 64-bit Linux distribution |

---

## Common Questions ❓

**Do I need a YouTube account?**  
No. YTDrop does not require sign-in.

**Where do downloads go?**  
By default, YTDrop starts with your Downloads folder. You can choose a different folder before downloading.

**Why did my download fail?**  
Check that the link is valid, the video is available in your region, and your internet connection is working.

**Can I download playlists?**  
YTDrop is designed for one video at a time.

---

## For Developers 🛠️

YTDrop is an Electron app powered by `yt-dlp`.

```bash
npm install
npm start
```

Build commands:

```bash
npm run build:mac
npm run build:win
npm run build:linux
npm run build:all
```

---

## Legal Note ⚖️

YTDrop is intended for personal use only. Only download content you own, content you have permission to download, or content that is legally available for downloading. Downloading copyrighted content without permission may violate YouTube's Terms of Service and applicable laws.

---

## License 📄

MIT
