---
title: "SP970 4G USB Modem: Buying Guide & Revisions (V3 / V10)"
description: Buying guide and hardware identification for the SP970 MSM8916 4G USB wingle family, including V3 and V10 revisions.
---

The **SP970** (commonly found as `SP970_V3` or `SP970_V10`) is a prominent MSM8916 wingle family widely sold across Asian markets (China, Southeast Asia, India) and AliExpress. It is well-documented in the original OpenStick project archives.

---

## Hardware Specifications

| Component | Specification |
| :--- | :--- |
| **SoC** | Qualcomm Snapdragon 410 (MSM8916) Quad-Core Cortex-A53 @ 1.2 GHz (ARM64) |
| **RAM** | 512 MB LPDDR3 |
| **Storage** | 4 GB eMMC 5.0 (BGA chip, e.g. Foresee or Kingston) |
| **Wireless** | Qualcomm WCN3620 (802.11b/g/n 2.4 GHz + Bluetooth 4.0) |
| **Cellular Modem** | Qualcomm LTE Cat 4 (B1, B3, B5, B8, B38, B39, B40, B41) |
| **SIM Slot** | Standard Micro-SIM (3FF) push-slide tray |
| **Power Input** | USB-A male 5V, ~270mA idle, up to 1.1A peak cellular |

---

## Exterior Shell & Design

The SP970 typically uses a compact rectangular plastic shell with rounded corners and a removable cap:

```
       ┌──────────────────────────────────────────────────┐
       │ [===]    [ 4G ]   [ WiFi ]                       │
[USB]  │                                      SP970 Wingle│
       │                                                  │
       └──────────────────────────────────────────────────┘
```

The front shell features two distinct light guides for the **4G LTE** and **Wi-Fi** status indicators.

---

## Board Silkscreen Revisions

Opening the snap-together plastic enclosure reveals the PCB silkscreen:
- **`SP970_V3`**: Earliest widespread version; uses high-quality Samsung eMMC.
- **`SP970_V10`**: Cost-optimized version with slightly modified antenna trace geometry and updated PMIC filtering capacitors.

The main processor must be marked with the Qualcomm Snapdragon logo and **`MSM8916`**.

---

## Purchasing Recommendations

- **AliExpress / Taobao Queries**: `SP970 4G USB`, `MSM8916 SP970 modem`, `Qualcomm 410 SP970 wingle`.
- **eMMC Check**: Always verify the flash chip is a smooth BGA square without visible metal pins.
- **Price Range**: Typically **$7 to $10 USD**.
