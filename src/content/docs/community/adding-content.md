---
title: Guide to Adding Content & Formatting
description: Best practices, frontmatter schema, callouts, and custom components for writing articles on OpenStick.org.
---

To ensure OpenStick.org remains clean, consistent, and easy to read, follow these formatting guidelines when writing new documentation.

---

## 1. File Placement & Frontmatter

Place your `.md` or `.mdx` file in the appropriate directory inside `src/content/docs/`:
- `about/` — History, architecture, comparisons
- `getting-started/` — Beginner tutorials, safety, prerequisites
- `flashing/` — Operating system installation guides
- `hardware/` — Board breakdowns, pinouts, schematics
- `projects/` — Practical use cases and setups
- `videos/` — Video libraries and media

### Required Frontmatter
Every article must start with:

```yaml
---
title: Descriptive Title of Your Guide
description: A 1-2 sentence summary explaining what the reader will accomplish.
---
```

---

## 2. Using Alerts and Callouts

Emphasize critical steps, hardware risks, and pro tips using Starlight callout blocks:

### Dangerous or Irreversible Operations
```markdown
:::danger[Permanent Data Loss Risk!]
Erasing modemst1 and modemst2 without a backup will erase your IMEI and modem calibration!
:::
```

### Critical Warnings
```markdown
:::caution[1.8V Logic Level Only!]
Connecting 3.3V or 5V serial adapters will destroy the SoC's UART pins.
:::
```

### Pro Tips & Advice
```markdown
:::tip[Speed Optimization]
Enable zram compressed swap to prevent out-of-memory errors on 512MB RAM boards.
:::
```

---

## 3. Using Custom Components in MDX

If your file has the `.mdx` extension, you can import custom components:

### Embedding Videos
```mdx
import VideoEmbed from '../../components/VideoEmbed.astro';

<VideoEmbed platform="youtube" id="YOUR_VIDEO_ID" title="Tutorial Title" />
```

### Specifying Hardware Boards
```mdx
import DeviceCard from '../../components/DeviceCard.astro';

<DeviceCard
  name="Board Name"
  codename="board-code"
  ram="512 MB"
  storage="4 GB"
  wifi="WCN3620"
  flashType="eMMC"
  testPoint="Pads under SIM slot"
  status="Supported"
>
  Detailed notes about this board revision.
</DeviceCard>
```

---

## 4. Code Blocks and Terminal Commands

Always specify the language for syntax highlighting (`bash`, `python`, `ini`, `json`):

```bash
# Good: clearly annotated command
fastboot flash boot lk2nd.img
```

Include comments in code snippets explaining what each line does, especially for non-obvious flags.
