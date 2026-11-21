---
title: "MSM8916 Device Identification: eMMC vs NAND, Silkscreens & ASR1802 Clones"
description: "Identify your Qualcomm MSM8916 4G modem PCB silkscreen (UZ801_V3.0, UFI001B/C, UFI003, HMUF02-V05, SP970) and spot eMMC vs SPI-NAND or ASR1802 / ZX297520 clones."
---

Due to how generic Chinese 4G modems are manufactured, devices sold under identical exterior plastic cases often contain completely different motherboards and chipsets.

Before attempting to flash, you must identify:
1. **The Processor**: Is it genuine Qualcomm MSM8916 (Snapdragon 410)?
2. **Flash Memory Type**: Is it **eMMC** or **NAND (SPINand/SLC)**?
3. **Board Revision & Silkscreen**: What specific hardware layout does it use?

---

## 1. The Most Important Check: eMMC vs NAND Flash

```
  ┌─────────────────────────────────┐       ┌─────────────────────────────────┐
  │         eMMC Flash Chip         │       │         NAND Flash Chip         │
  │                                 │       │     │││││││││││││││││││││││     │
  │     [ Smooth square chip with ] │       │   ┌─┴─────────────────────┴─┐   │
  │     [ hidden solder balls BGA ] │       │   │   Visible solder legs   │   │
  │                                 │       │   │  (SOP-8 or TSOP-48)     │   │
  │                                 │       │   └─┬─────────────────────┬─┘   │
  │       ✅ FULLY SUPPORTED        │       │     │││││││││││││││││││││││     │
  │    (Mainline Linux / Debian)    │       │     ⚠️ HIGHLY RESTRICTED        │
  └─────────────────────────────────┘       └─────────────────────────────────┘
```

- **eMMC (Recommended)**:
  - Appears as a smooth, flat square or rectangular black chip (often branded Kingston, Samsung, SanDisk, Foresee, or Micron).
  - All solder contacts are beneath the chip (BGA).
  - Typically 4 GB or 8 GB capacity.
  - Works natively with standard block device drivers (`/dev/mmcblk0`) in mainline Linux.

- **NAND Flash (Avoid for New Purchases)**:
  - Appears as a chip with visible pins extending from its sides, or a small 8-pin SPI NAND chip (e.g., GigaDevice, Winbond).
  - Typically 256 MB or 512 MB.
  - Requires raw MTD flash management, lacks standard partitions, and mainline Linux support is extremely experimental.

---

## 2. Common Board Families

### UZ801
- **Silkscreen**: `UZ801_V2.1`, `UZ801_V2.2`, `UZ801_V3.0`, `UZ801_V3.31`, `FY_UZ801_V3.31`
- **Specs**: MSM8916, 512MB RAM, 4GB eMMC.
- **Status**: **Fully Supported** (Community #1 recommendation). Clearly labeled test points on the PCB.
- **Guide**: [UZ801 Board Guide & Flashing](/boards/uz801/buying/)

### HMUF02
- **Silkscreen**: `HMUF02-V05`, `HMUF02-MB-V01` / `V02`
- **Casing Label**: Often marked **`U96-3`** or generic `4G-UFI-XXXX` on the back cover.
- **Specs**: MSM8916, 512MB RAM, 4GB eMMC. Features a tiny reset pinhole on the case.
- **Status**: **Fully Supported**. Note: Physical SIM slot on Debian may require toggling `esim1_en` (GPIO 119).
- **Guide**: [HMUF02 Board Guide & Flashing](/boards/hmuf02/buying/)

### HM-MIFIB & JZ08C (Pocket Routers with Battery & Screen)
- **Silkscreen**: `HM-MIFIB-V18`, `HM-MIFIB-V13`, `HM-MIFIB-V12`, `HM_MIFIB_V10`, `HM-MIFIB v50` (`20260602-JZ-10K EU` / `JZ08C_V50`), `JZ08C_V51`
- **Retail Models**: Marketed as **MF800B**, **MF800B-E**, **MF968**, or **H807pro** / **H806**.
- **Specs**: MSM8916, 512MB RAM, 4GB eMMC, 1.44" Color TFT LCD (ST7735S or NV3023A), 2100–3000mAh battery. Newer JZ08C revisions feature a **USB Type-C port**.
- **Status**: **Fully Supported**.
- **Guides**: [HM-MIFIB Guide](/boards/hm-mifib/buying/) and [JZ08C / H807pro Guide](/boards/jz08c/)

### UFI001B / UFI001C
- **Silkscreen**: `UFI001B_MB_V01`, `UFI001B_MB_V02`, `UFI001C`, `UFI001C_MB_V01`
- **Related Markings**: Sometimes marked `JZ01_V1` or fitted in bracket `KPS-JZ01-45-MA-V` / `UF1001C`.
- **Specs**: MSM8916, 512MB RAM, 4GB eMMC.
- **Wi-Fi**: WCN3620 (2.4 GHz).
- **Status**: **Fully Supported**. Original reference hardware for OpenStick.
- **Guide**: [UFI001 Board Guide & Flashing](/boards/ufi001/buying/)

### UFI003 & UF003S
- **Silkscreen**: `UFI003_MB_V01` / `V02`, `UF003S_V05`
- **Specs**: MSM8916, 512MB RAM, 4GB eMMC.
- **Features**: Integrated physical push button for instant EDL 9008 recovery and an IPEX antenna connector. (Note: Online listings advertising "1GB RAM" are unverified false advertising).
- **Status**: **Fully Supported**.
- **Guide**: [UFI003 Board Guide & Flashing](/boards/ufi003/buying/)

### SP970
- **Silkscreen**: `SP970_V3`, `SP970_V10`
- **Specs**: MSM8916, 512MB RAM, 4GB eMMC.
- **Status**: **Fully Supported**.
- **Guide**: [SP970 Board Guide & Flashing](/boards/sp970/buying/)

### JZ0145 (XiaoXun JZ0145)
- **Silkscreen**: `JZ0145_V33` (sticker `JZ01-45-XFY-30H-135`), `JZ0145 V40` / `JZ0145_V40_20260509`
- **Specs**: MSM8916, 512MB RAM, 4GB eMMC (SK Hynix).
- **Status**: Community supported via dedicated unbrick/installer repositories.
- **Guide**: [JZ0145 Board Guide](/boards/jz0145/)

### UFI103S / UFI103
- **Silkscreen**: `UFI103S_V02`, `UFI103S_V03`, `ufi103s_v05`
- **Web Admin**: Identifies model as `UFI103`.
- **Specs**: MSM8916, 512MB RAM, 4GB eMMC. Hardware EDL button next to SIM slot.
- **Status**: Verified working Debian 12 via `maomomo-eth/ufi103s-debian`.
- **Guide**: [UFI103S Board Guide](/boards/ufi103s/)

### Zhihe & Other Observed Variants
- **Silkscreen**: `ZHIHE_...`, `JZ02_V30`, `UZ810`
- **Specs**: Varies widely. Earlier versions used MSM8916 with eMMC; newer cost-reduced versions switched to ASR or ZXIC chipsets!
- **Warning**: Always verify that the central processor has the Qualcomm logo and `MSM8916` printed on the chip.

:::tip[Unsure About Your Board Revision?]
If you opened your dongle and can't find a matching silkscreen or want to double check before flashing, snap a clear photo of the board and share it in our Telegram community: **[t.me/openstick_org](https://t.me/openstick_org)** or Discord: **[discord.gg/92gfPYV7B](https://discord.gg/92gfPYV7B)**. Members can help you spot test points and verify genuine Qualcomm eMMC hardware.
:::

---

## 3. Software Identification via ADB

If your device is running its stock Android firmware and has USB debugging enabled:

```bash
# Verify ADB connection
adb devices

# Query the SoC model
adb shell getprop ro.board.platform
# Expected output: msm8916

# Check storage device
adb shell ls -l /dev/block/bootdevice/by-name
# If you see partitions like boot, system, userdata, fsg -> It is eMMC!
```

If `getprop ro.board.platform` returns `sp9820e`, `asr1802`, `zx297520`, or if the stick uses a Qualcomm baseband-only chip like **`mdm9610`** or **`mdm9607`** (such as certain `model-UF910-V5.3` variants), your device is **not** an MSM8916 and cannot run OpenStick Debian firmware.

---

## 4. Buying Tips for New Devices

When purchasing on AliExpress or Taobao:
1. Search for keywords: `MSM8916 4G USB`, `Snapdragon 410 USB modem`, `UZ801`, `HMUF02`, `UFI003`.
2. Check customer reviews for motherboard photos showing the Qualcomm chip.
3. Message the seller directly asking: *"Is the main chip Qualcomm MSM8916 with eMMC storage?"*
4. Avoid listings advertising "ZXIC 7520" or "ASR 1802" (these use different architectures).

👉 **[Browse Community-Verified Store Links & Buying Guide](/buying-guide/)** for tested listings, prices, buyer verification tips, and guidelines on publishing your own purchase links.
