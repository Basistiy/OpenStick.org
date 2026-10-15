---
title: UFI001B / UFI001C - Pinouts & Test Points
description: Hardware pinouts, EDL emergency download pads, 1.8V UART console, and GPIO layout for UFI001B and UFI001C boards.
---

The **UFI001B / UFI001C** boards are simple, rugged, and straightforward to service, with EDL test points positioned directly adjacent to the SIM slot.

---

## PCB Layout & Test Point Map

### Top / SIM Side

```
   ┌─────────────────────────────────────────────────────────┐
   │ [USB-A]                                                 │
   │                                                         │
   │        ┌─────────────────────────┐                      │
   │        │     MSM8916 SoC         │                      │
   │        │     (under shield)      │     [TX] [RX] [GND]  │
   │        └─────────────────────────┘     (1.8V UART pads) │
   │                                                         │
   │        ┌─────────────────────────┐                      │
   │        │     Micro-SIM Tray      │   (o) (o) <── EDL    │
   │        │                         │       Test Pads      │
   │        └─────────────────────────┘                      │
   │                                                         │
   │   [Antenna Pad]                                         │
   └─────────────────────────────────────────────────────────┘
```

---

## 1. Entering Qualcomm EDL Mode (9008)

When the boot partition is corrupted or fastboot fails to respond:

1. Unplug the dongle from all USB ports.
2. Locate the two small round gold pads immediately adjacent to the side of the metal SIM cage.
3. Bridge both pads together using metal tweezers or a bent paperclip.
4. While holding the bridge, insert the USB connector into your computer.
5. Wait **2 seconds**, then release the tweezers.
6. Verify device enumeration on your host:
   ```bash
   lsusb | grep 05c6:9008
   # 05c6:9008 Qualcomm, Inc. Gobi Wireless Modem (QDL mode)
   ```

You can now use `edl.py` or QFIL to re-flash partition tables, bootloaders, and firmware images.

---

## 2. Hardware UART Serial Console (1.8V Logic)

The UFI001 exposes UART on 3 small circular pads near the edge of the PCB opposite the RF shield:

:::caution[1.8V Signal Level Only]
MSM8916 UART logic levels are **1.8V**. Never attach 3.3V or 5V serial adapters directly to these pads!
:::

### Pinouts:
- **TX**: Connect to USB adapter **RX** (Output from MSM8916).
- **RX**: Connect to USB adapter **TX** (Input to MSM8916).
- **GND**: Solder to USB connector shield or common Ground.
- **Baud Rate**: `115200`, 8 data bits, no parity, 1 stop bit (`8N1`).

---

## 3. GPIO Assignments & Status LEDs

| Function | Hardware GPIO | Polarity | Description |
| :--- | :--- | :--- | :--- |
| **Wi-Fi LED** | GPIO 1 | Active High | Blinks during wireless transmission |
| **Cellular (4G) LED** | GPIO 2 | Active High | Steady when registered on LTE |
| **SIM Detect** | GPIO 50 | Pull-up | Low when SIM is seated |

---

## 4. External Antenna Modification

Next to the onboard ceramic antenna, there is an unpopulated SMD coaxial footprint:
- Solder an **IPEX MHF1 / u.FL socket** to attach external high-gain antennas.
- When doing this mod, scrape away the thin copper trace going to the internal ceramic antenna to avoid RF impedance mismatch.
