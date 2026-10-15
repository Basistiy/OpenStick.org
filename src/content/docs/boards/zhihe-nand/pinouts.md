---
title: UF896 & Zhihe (NAND Clones) - Pinouts & Test Points
description: Pinouts, NAND clock pin shorting method for EDL recovery, and 1.8V UART serial console for Zhihe and UF896 boards.
---

Because many **Zhihe** and **UF896** boards lack clearly labeled EDL test pads, entering Qualcomm 9008 Emergency Download Mode often requires a specialized technique: shorting the SPI-NAND clock line.

---

## PCB Layout & Component Map

### Top / Component Side

```
   ┌─────────────────────────────────────────────────────────┐
   │ [USB-A]                                                 │
   │                                                         │
   │   [TX] [RX] [GND] (1.8V UART)                           │
   │                                                         │
   │        ┌─────────────────────────┐                      │
   │        │     MSM8916 SoC         │                      │
   │        │     (under shield)      │     ┌─────────┐      │
   │        └─────────────────────────┘     │  NAND   │      │
   │                                        │  Flash  │      │
   │        ┌─────────────────────────┐     └─────────┘      │
   │        │     Micro-SIM Tray      │     (SOP-8/TSOP)     │
   │        │                         │                      │
   │        └─────────────────────────┘                      │
   │                                                         │
   │   [Antenna Trace]                                       │
   └─────────────────────────────────────────────────────────┘
```

---

## 1. Entering Qualcomm EDL Mode (The NAND CLK Short Method)

When a NAND board is soft-bricked and has no labeled EDL test pads:

### Why this method works:
When the MSM8916 powers on, its internal ROM bootloader attempts to communicate with the NAND flash over SPI/QSPI. If the clock (`CLK`) or data line (`MISO`/`MOSI`) is grounded during this initial handshake, the hardware read fails. The ROM bootloader interprets this as total flash failure and automatically falls back to **Qualcomm Emergency Download Mode (EDL 9008)**.

### Step-by-Step Procedure:
1. Disconnect the stick from USB power.
2. Locate the 8-pin SOP-8 SPI NAND chip (e.g. GigaDevice GD5F or Winbond 25N):
   - **Pin 6** is typically the **Clock (CLK)** line.
   - **Pin 4** is **Ground (GND)**.
3. Take a pair of metal tweezers and gently short **Pin 6 (CLK)** to **Pin 4 (GND)** (or short Pin 6 to the metal USB outer casing).
4. While holding the short, plug the stick into your PC's USB port.
5. After **1 to 2 seconds**, release the tweezers.
6. Check your host computer:
   ```bash
   lsusb | grep 05c6:9008
   # Qualcomm, Inc. Gobi Wireless Modem (QDL mode)
   ```

---

## 2. Hardware UART Serial Console (1.8V Logic)

The Zhihe/UF896 boards expose standard Snapdragon 410 serial pins:

:::danger[1.8V Logic Warning]
Never connect 3.3V or 5V serial levels to the board. Ensure your adapter is strictly operating at **1.8V**.
:::

- **TX**: Connects to USB adapter **RX** (1.8V)
- **RX**: Connects to USB adapter **TX** (1.8V)
- **GND**: Connects to adapter **GND**
- **Baud Rate**: `115200` (8N1)
