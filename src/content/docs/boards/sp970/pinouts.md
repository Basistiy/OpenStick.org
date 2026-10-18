---
title: SP970 Pinouts, Test Points & EDL 9008 Recovery Pads
description: Hardware pinouts, EDL 9008 test pads, 1.8V UART serial console, and GPIO layout for SP970 boards.
---

The **SP970** provides clearly delineated test pads on the rear surface of the circuit board for EDL mode and serial communications.

---

## PCB Test Point Map

### Bottom / Solder Side

```
   ┌─────────────────────────────────────────────────────────┐
   │ [USB-A]                                                 │
   │                                                         │
   │   ( ) ( ) <── EDL Test Pads                             │
   │                                                         │
   │   ( ) TX (1.8V)                                         │
   │   ( ) RX (1.8V)                                         │
   │   ( ) GND                                               │
   │                                                         │
   │        ┌─────────────────────────┐                      │
   │        │     Micro-SIM Tray      │                      │
   │        │     (top side)          │                      │
   │        └─────────────────────────┘                      │
   │                                                         │
   │   [Antenna Pad]                                         │
   └─────────────────────────────────────────────────────────┘
```

---

## 1. Entering Qualcomm EDL Mode (9008)

To recover from a corrupted bootloader or bricked flash:

1. Unplug the SP970 from USB power.
2. Locate the two circular gold test pads labeled `EDL` (or adjacent unlabeled pads near the USB connector).
3. Short the two pads together using metal tweezers or a bent paperclip.
4. While holding the short, plug the USB stick into your computer.
5. Wait **2 seconds**, then release.
6. Verify device detection on Linux:
   ```bash
   lsusb | grep 05c6:9008
   # Qualcomm, Inc. Gobi Wireless Modem (QDL mode)
   ```

---

## 2. Hardware UART Serial Console (1.8V Logic)

The SP970 exposes its low-level serial console via 3 test pads on the bottom layer:

:::caution[1.8V Logic Level Requirement]
The Qualcomm Snapdragon 410 serial interface requires **1.8V logic level**. Do not attach standard 3.3V or 5V serial adapters directly to these pads!
:::

### Pin Connections:
- **TX**: Connects to adapter **RX** (1.8V)
- **RX**: Connects to adapter **TX** (1.8V)
- **GND**: Connects to adapter **GND** (or USB outer shell)
- **Baud Rate**: `115200` (8N1)

---

## 3. GPIO Pin Assignments & LEDs

| Function | Hardware GPIO | Polarity | Description |
| :--- | :--- | :--- | :--- |
| **Power / 4G LED** | GPIO 0 | Active High | Solid blue upon cellular network attach |
| **Wi-Fi LED** | GPIO 1 | Active High | Blinks with wireless packets |
| **SIM Detect Switch** | GPIO 50 | Pull-up | High when SIM is inserted |
