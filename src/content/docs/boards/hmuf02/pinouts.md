---
title: HMUF02 - Pinouts & Test Points
description: Hardware pinouts, EDL 9008 test pads, 1.8V UART serial console, and button/LED GPIO mappings for the HMUF02 wingle.
---

The **HMUF02** integrates its EDL recovery test points adjacent to the SIM tray and provides a physical SMD reset push button on the PCB.

---

## PCB Test Point Map

### Top / Component Side

```
   ┌─────────────────────────────────────────────────────────┐
   │ [USB-A]                                                 │
   │                                                         │
   │   [TX]  [RX]  [GND] (1.8V UART)                         │
   │                                                         │
   │        ┌─────────────────────────┐                      │
   │        │     MSM8916 SoC         │    [===] Reset Button│
   │        │     (under shield)      │          (or pinhole)│
   │        └─────────────────────────┘                      │
   │                                                         │
   │          (o) (o) <── EDL Test Pads                      │
   │                                                         │
   │        ┌─────────────────────────┐                      │
   │        │    Micro-SIM Tray       │    [Antenna Pigtail] │
   │        └─────────────────────────┘                      │
   └─────────────────────────────────────────────────────────┘
```

---

## 1. Entering Qualcomm EDL Mode (9008)

If your bootloader fails or you flash an incompatible kernel image, EDL mode provides full raw eMMC read/write recovery.

### Method A: The Physical Reset Switch (On Select Batches)
1. Disconnect the HMUF02 from USB.
2. Insert a paperclip into the `Reset` pinhole on the casing (or press the miniature SMD tactile switch on the board).
3. While holding the button down, plug the dongle into a USB port.
4. Release the button after **2 seconds**.
5. Check if the PC enumerates `05c6:9008` (EDL).

### Method B: Tweezers on EDL Test Pads
1. If the reset button does not trigger EDL on your specific firmware version:
2. Locate the two small circular gold test pads situated right next to the Micro-SIM tray.
3. Short the two pads together with conductive metal tweezers.
4. Insert the stick into the USB port, hold for 2 seconds, and release.
5. Verify on Linux:
   ```bash
   lsusb | grep 05c6:9008
   # Qualcomm, Inc. Gobi Wireless Modem (QDL mode)
   ```

---

## 2. Hardware UART Serial Console (1.8V)

The HMUF02 features 3 small unpopulated SMD solder pads along the edge near the USB-A connector.

:::danger[1.8V Logic Level Requirement]
The Qualcomm Snapdragon 410 GPIO lines operate at **1.8V**. Connecting a standard 3.3V or 5V USB-TTL adapter directly to these pads will burn out the SoC's serial controller. Ensure your UART adapter is set to 1.8V logic level!
:::

### Pin Connections

| HMUF02 Pad | Direction | USB-to-UART Adapter Pin |
| :--- | :--- | :--- |
| **TX** | Output | **RX** |
| **RX** | Input | **TX** |
| **GND** | Ground | **GND** (or USB metal shielding) |

### Serial Terminal Configuration
- **Baud rate**: `115200`
- **Data bits**: `8`
- **Parity**: `None`
- **Stop bits**: `1`
- **Flow control**: `None`

---

## 3. GPIO Pin Assignments

The HMUF02 uses the following Qualcomm PMIC and SoC GPIO connections:

| Function | Hardware GPIO | Logic Level | Description |
| :--- | :--- | :--- | :--- |
| **Power / 4G LED** | GPIO 3 | Active Low | Lights up during cellular connection |
| **Wi-Fi LED** | GPIO 1 | Active High | Controlled by WCN3620 driver trigger |
| **SMS LED** | GPIO 2 | Active High | Flashes when SMS message is queued |
| **Reset Key** | GPIO 107 | Active Low (Pull-up) | Linked to physical tactile button |
| **SIM Hotplug** | GPIO 50 | Pull-up | Triggers SIM detection interrupt |
