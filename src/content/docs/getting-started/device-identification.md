---
title: Device Identification & Buying Guide
description: How to identify your MSM8916 board revision, spot eMMC vs NAND flash, and find the best modems for hacking.
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

### UFI001B / UFI001C
- **Silkscreen**: `UFI001B_MB_V01`, `UFI001B_MB_V02`, `UFI001C`
- **Specs**: MSM8916, 512MB RAM, 4GB eMMC.
- **Wi-Fi**: WCN3620 (2.4 GHz).
- **Status**: **Fully Supported**. One of the most documented boards in the community.
- **EDL Test Point**: Two test pads located near the SIM card slot.

### UFI003
- **Silkscreen**: `UFI003_MB_V01` / `V02`
- **Specs**: MSM8916, 512MB or 1GB RAM, 4GB or 8GB eMMC.
- **Features**: Often features upgraded 1GB RAM and 8GB eMMC, making it the most coveted board for running Docker and heavy Linux applications.
- **Status**: **Highly Recommended**.

### UZ801
- **Silkscreen**: `UZ801_V2.1`, `UZ801_V2.2`
- **Specs**: MSM8916, 512MB RAM, 4GB eMMC.
- **Status**: **Fully Supported**. Features clearly labeled test points on the PCB.

### Zhihe (4G Wingle)
- **Silkscreen**: `ZHIHE_...`
- **Specs**: Varies widely. Earlier versions used MSM8916 with eMMC; newer cost-reduced versions switched to ASR or ZXIC chipsets!
- **Warning**: Always verify that the central processor has the Qualcomm logo and `MSM8916` printed on the chip.

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

If `getprop ro.board.platform` returns `sp9820e`, `asr1802`, or `zx297520`, your device is **not** an MSM8916 and cannot run OpenStick firmware.

---

## 4. Buying Tips for New Devices

When purchasing on AliExpress or Taobao:
1. Search for keywords: `MSM8916 4G USB`, `Snapdragon 410 USB modem`, `UFI001B`.
2. Check customer reviews for motherboard photos showing the Qualcomm chip.
3. Message the seller directly asking: *"Is the main chip Qualcomm MSM8916 with eMMC storage?"*
4. Avoid listings advertising "ZXIC 7520" or "ASR 1802" (these use different architectures).
