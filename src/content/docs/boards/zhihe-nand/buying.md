---
title: "UF896, Zhihe NAND & ASR1802 Clones: Buying Warnings & Identification"
description: "How to spot and avoid UF896 (UF896_MB_V02), Zhihe SPI-NAND boards, and non-Qualcomm ASR1802 / ZX297520 / SP9820E clone 4G dongles that cannot run OpenStick Debian."
---

While genuine Qualcomm MSM8916 boards equipped with eMMC are fantastic mini single-board computers, the market is flooded with cost-reduced clones commonly designated as **Zhihe**, **UF896**, or **4G-UFI-16**.

:::danger[Crucial Warning: Avoid NAND Boards for OpenStick!]
Many cheap Zhihe and UF896 boards replace standard high-speed **eMMC** storage with inexpensive **SPI-NAND** or **SLC NAND** flash memory (256 MB or 512 MB). **Standard Debian OpenStick and mainline Linux images will NOT work on these boards!**
:::

---

## Hardware Comparison: eMMC vs. NAND Clones

| Feature | Genuine OpenStick (UZ801 / UFI001B / UFI003) | Zhihe / UF896 NAND Clones |
| :--- | :--- | :--- |
| **Flash Memory** | **eMMC 5.0 (BGA chip)** | **SPI-NAND or SLC NAND (SOP-8 / TSOP)** |
| **Storage Capacity** | 4 GB to 8 GB | 256 MB to 512 MB |
| **Linux Partitions** | Standard GPT block device (`/dev/mmcblk0`) | Raw MTD partitions (`/dev/mtdX`) |
| **Debian Linux** | ✅ **Fully Supported** | ❌ **Unsupported** (Insufficient capacity & no block driver) |
| **postmarketOS** | ✅ **Fully Supported** | ❌ **Unsupported** |
| **OpenWrt** | ✅ **Fully Supported** | ⚠️ **Experimental only** (Custom NAND kernel required) |
| **EDL Recovery** | Straightforward via test pads | Difficult (Requires shorting NAND CLK pin) |

---

## Physical Visual Identification: How to Spot NAND Flash

The surest way to identify a NAND board is to examine the flash chip's packaging:

```
  ┌─────────────────────────────────┐       ┌─────────────────────────────────┐
  │         eMMC Flash Chip         │       │         NAND Flash Chip         │
  │                                 │       │     │││││││││││││││││││││││     │
  │     [ Smooth square chip with ] │       │   ┌─┴─────────────────────┴─┐   │
  │     [ hidden solder balls BGA ] │       │   │   Visible solder legs   │   │
  │                                 │       │   │  (SOP-8 or TSOP-48)     │   │
  │                                 │       │   └─┬─────────────────────┬─┘   │
  │       ✅ FULLY SUPPORTED        │       │     │││││││││││││││││││││││     │
  │    (Standard OpenStick Debian)  │       │     ⚠️ HIGHLY RESTRICTED        │
  └─────────────────────────────────┘       └─────────────────────────────────┘
```

1. **eMMC (Compatible)**:
   - Perfectly smooth flat black square or rectangle.
   - Zero visible pins or solder legs on the sides; all electrical contacts are BGA solder balls hidden beneath the chip.
   - Branded *Samsung*, *SanDisk*, *Kingston*, *Foresee*, or *Micron*.
2. **NAND (Incompatible with Debian)**:
   - Visible metal pins extending from the sides of the chip package (either an 8-pin SOP-8 chip or a 48-pin rectangular TSOP-48 chip).
   - Branded *GigaDevice*, *Winbond*, *ESMT*, or *XTX*.

---

## Silkscreens Associated with NAND Boards

- **`ZHIHE_...`** (e.g. `ZHIHE_MSM8916_MB_V01`)
- **`UF896_MB_V02`**
- **`UFI-16-V3`**

---

## Software Verification (Stock Android ADB)

If the device is booted with stock Android:

```bash
adb shell ls -l /dev/block/bootdevice/by-name
```

- **If it outputs standard partition symlinks** (`boot`, `system`, `userdata`, etc.): The device has **eMMC**.
- **If `/dev/block/bootdevice` does not exist**, and you only see `/proc/mtd`: The device is **NAND flash**!

---

## Non-Qualcomm CPU Clones (`ASR1802`, `ZX297520`, `SP9820E`)

If you searched for **`asr1802`**, **`zx297520`**, or **`sp9820e`** after opening your 4G USB dongle, your stick does **not** have a Qualcomm Snapdragon 410 (`MSM8916`) processor:

| Chip Marking | Manufacturer / Architecture | OpenStick Debian Support | Notes |
| :--- | :--- | :--- | :--- |
| **`MSM8916`** | **Qualcomm Snapdragon 410 (4x Cortex-A53 ARM64)** | ✅ **Fully Supported (with eMMC)** | Genuine OpenStick processor (`UZ801`, `UFI003`, `UFI001B/C`, `HMUF02-V05`). |
| **`ASR1802` / `ASR1803`** | ASR Microelectronics (32-bit ARM Cortex-R4 / Marvell PXA) | ❌ **Incompatible** | Cheap RTOS/custom cellular baseband chip; cannot boot mainline Linux or OpenStick Debian. |
| **`ZX297520` (V2 / V3)** | Sanechips / ZTE ZXIC | ❌ **Incompatible** | Proprietary ZTE cellular router SoC with tiny NAND flash; cannot run OpenStick. |
| **`SP9820E`** | Unisoc / Spreadtrum (2x Cortex-A53) | ❌ **Incompatible** | Different bootloader and radio architecture; incompatible with Qualcomm `edl` and `lk2nd`. |

👉 **Need a genuine Qualcomm MSM8916 stick with eMMC?** Check our **[Community-Verified Store Links & Buying Guide](/buying-guide/)** for tested `UZ801` and `HM-MIFIB` listings.
