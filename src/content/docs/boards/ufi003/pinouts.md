---
title: "UFI003 Pinouts: EDL 9008 Hardware Button, 1.8V UART & GPIO Map"
description: "Hardware pinouts, onboard EDL 9008 recovery push button, 1.8V UART serial console, IPEX antenna socket, and GPIO map for the UFI003 (1GB RAM) OpenStick flagship."
---

A key quality-of-life feature of the **UFI003** is the inclusion of an **integrated physical push button** directly mounted on the PCB for entering EDL mode without requiring tweezers or wire jumpers.

---

## PCB Layout & Component Map

### Top / Component Side

```
   ┌─────────────────────────────────────────────────────────┐
   │ [USB-A]                                                 │
   │                                                         │
   │   [TX] [RX] [GND] (1.8V UART pads)                      │
   │                                                         │
   │        ┌─────────────────────────┐                      │
   │        │     MSM8916 SoC         │    [o] Hardware EDL  │
   │        │     1GB RAM / 8GB eMMC  │        Push Button   │
   │        └─────────────────────────┘                      │
   │                                                         │
   │        ┌─────────────────────────┐                      │
   │        │     Micro-SIM Tray      │    (o) (o) Backup    │
   │        │                         │            EDL Pads  │
   │        └─────────────────────────┘                      │
   │                                                         │
   │   [IPEX Antenna Socket]                                 │
   └─────────────────────────────────────────────────────────┘
```

---

## 1. Entering Qualcomm EDL Mode (The Button Method)

Entering EDL mode on the UFI003 is effortless:

1. Unplug the dongle from your computer.
2. **Press and hold the onboard SMD push button** with your finger or a plastic stylus.
3. While holding the button, plug the dongle into your computer's USB port.
4. Keep the button depressed for **2 seconds**, then release.
5. Check your host terminal:
   ```bash
   lsusb | grep 05c6:9008
   # Qualcomm, Inc. Gobi Wireless Modem (QDL mode)
   ```

*(Note: On revisions without the button populated, dual gold backup pads are present adjacent to the SIM slot, which can be shorted with tweezers).*

---

## 2. Hardware UART Serial Console (1.8V)

The UFI003 routes hardware UART console lines (`UART_TX` and `UART_RX`) to 3 gold circular pads located near the USB plug.

:::danger[1.8V Logic Level Requirement]
The Qualcomm Snapdragon 410 serial interface requires **1.8V logic level**. Connecting standard 3.3V/5V FTDI adapters will permanently fry the SoC's serial UART transceiver.
:::

### Pinout:
- **TX Pad**: Connect to USB serial adapter **RX**
- **RX Pad**: Connect to USB serial adapter **TX**
- **GND Pad**: Connect to common **GND**
- **Baud Rate**: `115200`, 8 data bits, no parity, 1 stop bit (`8N1`)

---

## 3. GPIO Pin Assignments

| Function | Hardware GPIO | State | Description |
| :--- | :--- | :--- | :--- |
| **Status / Power LED** | GPIO 0 | Active High | Green system indicator |
| **Wi-Fi LED** | GPIO 1 | Active High | Wireless traffic indicator |
| **Cellular (LTE) LED** | GPIO 2 | Active High | Blue modem status |
| **EDL / Function Key** | GPIO 107 | Active Low | Linked to physical tactile button |
| **SIM Detect Switch** | GPIO 50 | Pull-up | High when SIM is inserted |

---

## 4. Factory IPEX / u.FL Socket

Many UFI003 boards come from the factory with a miniature **IPEX MHF1 / u.FL antenna connector** already soldered on the PCB!
- You do not need to solder dangerous jumper wires; simply plug in a standard IPEX to SMA female pigtail cable.
- Cut a small notch in the plastic dongle cap to route the cable out to an external high-gain antenna.
