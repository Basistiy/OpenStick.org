---
title: UZ801 - Buying Guide & Identification
description: How to identify genuine UZ801 MSM8916 4G USB dongles, verify eMMC storage, and avoid non-Qualcomm clones when purchasing.
---

The **UZ801** (manufactured by Yiming / Zhihe) is one of the most widely adopted and best-documented 4G LTE USB dongles in the OpenStick community. It is renowned for having clearly exposed test pads and reliable eMMC flash memory.

---

## Hardware Specifications at a Glance

| Component | Specification |
| :--- | :--- |
| **SoC** | Qualcomm Snapdragon 410 (MSM8916) Quad-Core Cortex-A53 @ 1.2 GHz (ARM64) |
| **RAM** | 512 MB LPDDR3 |
| **Storage** | 4 GB eMMC 5.0 (BGA chip, e.g. Samsung KLM4G1FETE or Kingston) |
| **Wireless** | Qualcomm WCN3620 (802.11b/g/n 2.4 GHz Wi-Fi + Bluetooth 4.0) |
| **Cellular Modem** | Integrated Qualcomm LTE Cat 4 (B1, B3, B5, B7, B8, B20, B38, B40, B41) |
| **Power Input** | Standard 5V USB-A male connector (~300mA idle, up to 1.2A under cellular load) |
| **SIM Slot** | Standard Micro-SIM (3FF) push-pull or sliding tray |

---

## Exterior Appearance & Case Styles

The UZ801 is commonly sold in two plastic case variants:
1. **Curved White/Black Case**: Rounded rectangular stick with a removable protective USB cap, small LED light pipes (labeled `4G`, `Wi-Fi`, `Power`), and sliding back cover for SIM access.
2. **Ventilated Car Dongle Style**: White stick with circular heat dissipation holes on the back panel and a lanyard hole at the corner.

```
       ┌──────────────────────────────────────────────────┐
       │ [===]    4G [●]   WIFI [●]   PWR [●]             │
[USB]  │                                     UZ801 Stick  │
       │                                                  │
       └──────────────────────────────────────────────────┘
```

---

## Verifying the Board Silkscreen

Before purchasing or flashing, opening the snap-on plastic shell reveals the main PCB. Check the silkscreen text printed on the circuit board:

- **Confirmed Supported Silkscreens**:
  - `UZ801_V2.1`
  - `UZ801_V2.2`
  - `UZ801_V3.0` (most common)
  - `UZ801_V3.2`

Look for the Qualcomm logo on the central processor: `MSM8916`.

:::danger[Avoid Counterfeit Chipsets!]
Do not buy sticks with processors marked **ASR1802**, **ZX297520**, or **SP9820E**. These are non-Qualcomm chipsets and cannot boot OpenStick, Debian, or postmarketOS.
:::

---

## Identifying eMMC vs. NAND Storage

Ensure your board has **eMMC** flash memory:
- **eMMC (Compatible)**: A smooth square BGA chip with hidden solder balls underneath (usually labeled *Samsung*, *Kingston*, *SanDisk*, or *Foresee*).
- **SPI-NAND (Incompatible)**: An 8-pin SOP-8 or 48-pin TSOP chip with visible metal legs extending from the sides (e.g. *GigaDevice*, *Winbond*). Standard OpenStick Debian images do not run on raw NAND.

---

## Software Verification (Stock Android ADB)

If the device powers up with its factory Android firmware, verify its hardware via USB:

```bash
# Check if ADB detects the device
adb devices

# Query the SoC platform
adb shell getprop ro.board.platform
# Output must be: msm8916

# Verify block storage partitions
adb shell ls -l /dev/block/bootdevice/by-name
# You should see: boot, aboot, system, userdata, modem, fsg
```

---

## Purchasing Tips on AliExpress & Taobao

1. **Search Keywords**: `UZ801 4G USB`, `MSM8916 4G LTE stick`, `Snapdragon 410 USB modem car router`.
2. **Contact Seller**: Send a message asking: *"Does this board have Qualcomm MSM8916 with eMMC flash and silkscreen UZ801?"*
3. **Price Range**: Genuine units typically cost between **$8 to $14 USD**. Anything under $5 USD is almost always an ASR or ZXIC cost-reduced clone.
