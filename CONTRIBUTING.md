# Contributing to OpenStick.org

Thank you for helping build **OpenStick.org**! This website is an open-source, community-driven repository of knowledge, tutorials, pinouts, and projects for **Qualcomm MSM8916 4G USB modems/wingles**.

Everyone is welcome to contribute: whether you are fixing a typo, adding photos of a new board revision, writing a flashing tutorial, or showcasing your personal project.

---

## 🚀 Quickest Way: Edit Directly in Your Browser

You **do not need to install Node.js or Git** on your computer to contribute!

1. Navigate to the page you want to update on [openstick.org](https://openstick.org).
2. Scroll to the bottom of the article and click **"Edit this page"**.
3. GitHub will open the source file in its web markdown editor.
4. Make your improvements, fixes, or additions.
5. Scroll down to **"Propose changes"**, describe what you did, and click **"Propose changes"** -> **"Create pull request"**.
6. Our automated GitHub Actions workflow will check your changes, and once reviewed, your updates will be live on `openstick.org`!

---

## 💻 Local Development Workflow

If you prefer working locally:

### 1. Prerequisites
- **Node.js**: v20 or higher
- **npm**: v10 or higher
- **Git**

### 2. Setup
```bash
# Clone the repository
git clone https://github.com/Basistiy/OpenStick.org.git
cd OpenStick.org

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:4321` to preview your changes in real-time with hot reloading.

### 3. Verify Before Submitting
Before opening your Pull Request, verify that the site builds cleanly:
```bash
npm run build
```

---

## 📂 Content Organization

All documentation files live inside `src/content/docs/`:

- `about/` — Origin story, Raspberry Pi Zero 2 W comparison, overview.
- `getting-started/` — Quickstart, device identification, backup and safety instructions.
- `flashing/` — Operating system installation guides (Debian OpenStick, postmarketOS, OpenWrt, modem configuration).
- `hardware/` — Board revisions (UFI001B, UFI003, Uz801, Zhihe), test points, UART, antenna soldering.
- `projects/` — Community showcases, SMS gateways, portable Docker servers, USB gadget networking.
- `videos/` — Curated video tutorials, teardowns, and flashing walkthroughs.
- `community/` — Contributing guidelines and formatting tips.

---

## 📝 Writing a New Guide or Article

Every document is a Markdown (`.md`) or MDX (`.mdx`) file. Include frontmatter at the top:

```markdown
---
title: Guide Title Here
description: Brief one or two sentence description of what this guide teaches.
---

## Overview
Write your content here using standard GitHub markdown.

### Key Sections:
- **Prerequisites**: What dongles or tools are needed.
- **Safety Warnings**: Highlight backup reminders.
- **Step-by-Step Instructions**: Clear terminal commands.
```

### Safety Callouts
When writing commands that could brick a device (like `fastboot flash` or partition resizing), use GitHub callouts:

```markdown
:::caution[Backup First!]
Always backup your `fsg`, `modemst1`, `modemst2`, and `aboot` partitions before flashing!
:::
```

### Embedding Videos
To embed a YouTube or Bilibili video in an `.mdx` file:

```mdx
import VideoEmbed from '../../components/VideoEmbed.astro';

<VideoEmbed platform="youtube" id="YOUR_YOUTUBE_VIDEO_ID" title="Flashing Debian on MSM8916" />
```

---

## 🤝 Code of Conduct
Please be respectful and helpful. We are makers and hobbyists sharing knowledge to save hardware from e-waste and make low-cost computing accessible to everyone.
