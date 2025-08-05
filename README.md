# 📵 Facebook Time Blocker - Chrome Extension

A Chrome extension that **blocks access to Facebook after a specific time** (default: 8 PM). This tool is designed to help reduce distractions and improve focus during work or study hours.

---

## ✨ Features

- ⏰ Set a custom block time (24-hour format).
- 🛑 Automatically blocks Facebook after the set time.
- 🔧 Uses `chrome.storage` for persistent settings.
- ⚡ Lightweight and easy to use.

---

## 🛠️ How to Install and Use Locally (Without Publishing)

You can load this extension manually on your machine using Chrome’s Developer Mode.

### ✅ Steps:

1. **Clone or Download this Repository**
Or [Download ZIP](https://github.com/salabibne/facebook-Blocker-Extensions.git) and extract it.

2. **Open Chrome Extensions Page**
- Navigate to: `chrome://extensions/`

3. **Enable Developer Mode**
- Toggle the switch at the top-right.

4. **Load the Unpacked Extension**
- Click **"Load unpacked"**.
- Select the extracted/cloned folder.

5. **Done!**
- The extension is now active.
- Facebook will be blocked after the specified time (default is 8 PM).

---

## 🧠 How It Works

The background script checks the current time whenever you access Facebook. If it’s past your configured block time, it will inject a content script (`content.js`) to block the site.

---

