---
title: UART Serial Console & Pinouts
description: How to wire a hardware serial UART console to your MSM8916 modem for boot logs, kernel debugging, and low-level recovery.
---

When bringing up new Linux kernels or debugging early boot issues where USB networking has not yet initialized, having a physical **UART serial console** is invaluable.

:::caution[1.8V Logic Level Warning!]
The MSM8916 GPIO and UART lines operate strictly at **1.8V logic level**. Connecting a 3.3V or 5V USB-to-UART adapter (like standard FTDI or CH340 modules configured for 3.3V/5V) directly to the board **can permanently destroy the SoC's internal I/O pins**. Always use a 1.8V-capable USB-UART adapter or a bidirectional logic level shifter!
:::

---

## 1. UART Pinouts on Common Boards

MSM8916 exposes hardware UART on GPIO 4 (`UART_TX`) and GPIO 5 (`UART_RX`).

```
   ┌──────────────────────────────────────────────┐
   │ [USB Plug]                                   │
   │                                              │
   │     ┌────────────┐        [O] TX (1.8V)      │
   │     │  MSM8916   │        [O] RX (1.8V)      │
   │     │    SoC     │        [O] GND            │
   │     └────────────┘                           │
   │                                              │
   └──────────────────────────────────────────────┘
```

- **TX (Transmit)**: Connects to your USB adapter's **RX** pin.
- **RX (Receive)**: Connects to your USB adapter's **TX** pin.
- **GND (Ground)**: Connects to your USB adapter's **GND** (you can solder to the metal casing/shield).

---

## 2. Recommended Hardware

1. **1.8V USB-to-UART Adapter**:
   - FT232RL or FT2232H with 1.8V VCCIO jumper.
   - CH343G / CP2102N with 1.8V voltage regulator.
2. **Fine-gauge enameled magnet wire** (30–36 AWG) and a fine-tip soldering iron.

---

## 3. Terminal Connection Parameters

Connect your adapter to your PC and launch your preferred serial client:

```bash
# Using picocom
picocom -b 115200 /dev/ttyUSB0

# Using minicom
minicom -D /dev/ttyUSB0 -b 115200

# Using screen
screen /dev/ttyUSB0 115200
```

- **Baud Rate**: `115200`
- **Data Bits**: `8`
- **Parity**: `None`
- **Stop Bits**: `1`
- **Flow Control**: `None`

---

## 4. What You Will See

Upon plugging the modem into USB power, you will observe the complete boot sequence:
1. Primary Boot Loader (PBL) initialization.
2. Secondary Boot Loader (`sbl1`) memory training.
3. TrustZone / KeyMaster (`tz`) validation.
4. `lk2nd` bootloader output and countdown timer.
5. Linux kernel dmesg stream (`earlycon` / `console=ttyMSM0`).
6. A standard Linux login prompt (`openstick login:`).
