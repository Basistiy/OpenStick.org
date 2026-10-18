---
title: "UFI001B / UFI001C: Buying Guide & Hardware Identification"
description: Buying guide for the classic UFI001B and UFI001C boards, the original reference hardware of the OpenStick project.
---

The **UFI001B** and **UFI001C** boards are the foundational reference devices of the OpenStick project. When developer HandsomeYingyan first ported mainline Linux and Debian to low-cost 4G USB modems, the UFI001B was the original target board.

---

## Hardware Specifications

| Component | Specification |
| :--- | :--- |
| **SoC** | Qualcomm Snapdragon 410 (MSM8916) 4x Cortex-A53 @ 1.2 GHz 64-bit |
| **RAM** | 512 MB LPDDR3 |
| **Storage** | 4 GB eMMC 5.0 (BGA chip, typically Samsung KLM4G1FETE or Kingston) |
| **Wireless** | Qualcomm WCN3620 (802.11b/g/n 2.4 GHz + Bluetooth 4.0) |
| **Cellular Modem** | Qualcomm LTE Cat 4 (B1, B3, B5, B8, B38, B39, B40, B41) |
| **SIM Slot** | Standard Micro-SIM (3FF) push-slide metal cage |
| **Power Input** | USB-A male 5V, ~280mA idle, up to 1.1A peak LTE |

---

## Exterior Shell & Design

The UFI001B/C family is commonly encased in a flat white plastic thumb drive with rounded ends:

```
       ┌──────────────────────────────────────────────────┐
       │ [===]    4G [●]   WiFi [●]                       │
[USB]  │                                     UFI001 Dongle│
       │                                                  │
       └──────────────────────────────────────────────────┘
```

The top shell features two LED indicators labeled **4G** and **Wi-Fi**. The rear panel slides backward to reveal the SIM card slot.

---

## Motherboard Silkscreen Revisions

Opening the plastic housing reveals the motherboard silkscreen:

- **`UFI001B_MB_V01`**: The earliest reference revision.
- **`UFI001B_MB_V02`**: Enhanced ground shielding and improved thermal dissipation.
- **`UFI001C`**: Compact revision with updated power inductors and slightly altered RF routing.

The central chip must be labeled **`MSM8916`** with the Qualcomm logo.

---

## Purchasing Recommendations

1. **Popular Aliases**: Often listed on AliExpress and eBay as *"Qualcomm 4G USB Modem Stick"*, *"Car Wi-Fi Dongle UFI001B"*, or *"4G LTE Portable Router with Qualcomm Chip"*.
2. **eMMC Verification**: Always confirm the flash chip is a smooth black square BGA package (not an 8-pin or 48-pin chip with visible solder legs).
3. **Price**: Typically available for **$7 to $12 USD**.
