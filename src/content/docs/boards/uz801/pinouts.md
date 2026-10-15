---
title: UZ801 - Pinouts & Test Points
description: Hardware pinouts, EDL emergency download mode test points, 1.8V UART serial console, and GPIO layout for the UZ801.
---

The UZ801 is favored by hardware hackers because its test pads are clearly exposed on the bottom side of the PCB, allowing easy recovery without having to solder underneath RF metal shields.

---

## PCB Layout & Test Point Map

### Bottom Side (Back of PCB)

```
   ┌─────────────────────────────────────────────────────────┐
   │ [USB-A]                                                 │
   │                                                         │
   │            ( ) EDL (TP1)                                │
   │                                                         │
   │            ( ) TX (1.8V)                                │
   │            ( ) RX (1.8V)                                │
   │            ( ) GND                                      │
   │                                                         │
   │                      ┌────────────────────────┐         │
   │                      │ Micro-SIM Tray         │         │
   │                      │                        │         │
   │   [Antenna IPEX]     └────────────────────────┘         │
   └─────────────────────────────────────────────────────────┘
```

---

## 1. Entering EDL Recovery Mode (Qualcomm 9008)

When the bootloader is erased or the kernel panics on boot, Qualcomm's Emergency Download Mode (EDL) is your unbrick recovery path.

### Step-by-Step Procedure:
1. Disconnect the UZ801 from all USB ports and power sources.
2. Using metal tweezers, conductive wire, or a bent paperclip:
   - Connect the gold test pad marked **`EDL`** (or **`TP1`**) to **`GND`** (or the metal frame of the USB connector).
3. While maintaining the short, plug the UZ801 into your computer's USB port.
4. Keep the short connected for **2 seconds**, then release.
5. Check your host computer:
   - **Linux**: Run `lsusb`. Look for `05c6:9008 Qualcomm, Inc. Gobi Wireless Modem (QDL mode)`.
   - **Windows**: Device Manager will list `Qualcomm HS-USB QDLoader 9008` under *Ports (COM & LPT)*.

---

## 2. Hardware UART Serial Console (1.8V Logic)

The UZ801 routes the SoC's primary hardware serial console directly to dedicated test pads.

:::caution[Strict 1.8V Logic Warning]
The MSM8916 serial pins operate at **1.8V CMOS logic level**. Connecting a 3.3V or 5V USB-UART adapter directly to these pads will permanently damage the Qualcomm SoC's I/O bank. Use a 1.8V-compatible adapter (e.g. FT232RL jumpered to 1.8V, CH343G, or CP2102N with 1.8V LDO).
:::

### Pin Connections

| UZ801 Pad | Direction | USB-to-UART Adapter Pin |
| :--- | :--- | :--- |
| **TX** | Output | **RX** (Receive on PC) |
| **RX** | Input | **TX** (Transmit from PC) |
| **GND** | Ground | **GND** (Common Ground) |

### Serial Terminal Settings:
- **Baud Rate**: `115200`
- **Data Bits**: `8`
- **Parity**: `None`
- **Stop Bits**: `1`
- **Flow Control**: `None`

```bash
# Example picocom connection
picocom -b 115200 /dev/ttyUSB0
```

---

## 3. GPIO Pin Assignments & LEDs

The UZ801 features three onboard indicator LEDs driven directly by PMIC/SoC GPIOs:

| Function | Hardware GPIO | Active State | Notes |
| :--- | :--- | :--- | :--- |
| **Power / System LED** | GPIO 0 | Active High | Controlled by systemd / Linux trigger |
| **Wi-Fi Status LED** | GPIO 1 | Active High | Linked to `phy0-rx/tx` in network configs |
| **4G Cellular LED** | GPIO 2 | Active High | Blinks during cellular registration |
| **SIM Detect Switch** | GPIO 50 | Pull-up | High when SIM is inserted |

---

## 4. RF Antenna Modification Pads

Near the edge of the board, an unpopulated Murata MS-156 / SWD RF switch footprint allows soldering an IPEX/u.FL connector:
- **Center pin**: Connect to the RF signal feed trace.
- **Flank pads**: Solder to the ground copper flood plane.
- Adding an external 4G paddle antenna improves reception by +15 to +20 dBm in fringe cellular coverage areas.
