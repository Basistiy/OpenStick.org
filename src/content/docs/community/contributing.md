---
title: How to Contribute to OpenStick.org
description: Complete guide on contributing documentation, fixes, and tutorials to the OpenStick community website.
---

import { Steps } from '@astrojs/starlight/components';

**OpenStick.org** is 100% open-source and maintained by makers for makers. Whether you are correcting a small typo or writing a full tutorial on a newly discovered board, your contribution is deeply appreciated!

---

## The Easiest Way: Edit Directly in Your Web Browser

You don't need Git or any local developer tools installed.

<Steps>
1. **Find the Page**: Browse to the page on [openstick.org](https://openstick.org) that you want to improve.
2. **Click "Edit this page"**: Scroll to the bottom and click the GitHub edit link.
3. **Make Your Changes**: Edit the Markdown text directly inside GitHub's web editor.
4. **Propose Changes**: Enter a short title explaining your fix (e.g., "Add UFI003 1GB RAM note"), and click **"Propose changes"**.
5. **Open Pull Request**: Click **"Create pull request"**.
</Steps>

Our automated continuous integration will check the formatting and build. Once reviewed, it will be automatically published to the website!

---

## Local Development (For Large Contributions)

If you are adding multiple pages, diagrams, or components:

```bash
# 1. Clone your fork of the repository
git clone https://github.com/Basistiy/OpenStick.org.git
cd OpenStick.org

# 2. Install dependencies with npm
npm install

# 3. Start local development server with hot reload
npm run dev

# 4. Open in browser
# http://localhost:4321
```

Before submitting a PR, make sure the static build passes:
```bash
npm run build
```

---

## What We Need Help With

- **Board Photos & Test Points**: High-resolution photos of new board revisions, labeling EDL test pads and UART lines.
- **Flashing Quirks**: Known workarounds for carrier-locked or stubborn wingles.
- **Projects & Scripts**: Python or shell scripts for novel use cases (LoRa gateway, sensor streaming, VPN travel routers).
- **Video Embeds**: Links and descriptions for high-quality video tutorials on YouTube or Bilibili.

---

## Join the Community Chat

Have questions, want to discuss a new board discovery, or want feedback before submitting documentation?
Join the official OpenStick Telegram group: **[t.me/openstick_org](https://t.me/openstick_org)**.
