---
title: Test Points & EDL Recovery Mode
description: How to locate test points, short boot pins, and recover soft-bricked MSM8916 modems via Qualcomm Emergency Download (EDL 9008) mode.
---

When a bootloader is corrupt or the device fails to boot into Fastboot or Android, **Qualcomm Emergency Download Mode (EDL 9008)** is the hardware-level lifeline.

Because EDL mode is executed directly by the Primary Boot Loader (PBL) stored permanently inside the MSM8916 SoC's internal ROM, **it is practically impossible to permanently brick an MSM8916 device** as long as the silicon is not physically damaged.

---

## 1. What are EDL Test Points?

The Snapdragon 410 checks specific hardware pins (known as `FORCE_USB_BOOT` or `BOOT_CONFIG`) during power-on. 

If this pin is pulled low (shorted to Ground) when power is applied:
1. The CPU bypasses reading eMMC flash entirely.
2. The SoC immediately initializes its internal USB PHY.
3. The device enumerates on your PC as `Qualcomm HS-USB QDLoader 9008` (VID: `05c6`, PID: `9008`).

---

## 2. Locating Test Points on Popular Boards

```
   ┌──────────────────────────────────────────────┐
   │ [USB Plug]                                   │
   │                                              │
   │     ┌────────────┐                           │
   │     │  MSM8916   │     ┌──────────────┐      │
   │     │    SoC     │     │ SIM Holder   │      │
   │     └────────────┘     │              │      │
   │                        │              │      │
   │        o o <─── EDL    └──────────────┘      │
   │      Pads        Test Pads                   │
   │                                              │
   └──────────────────────────────────────────────┘
```

### UFI001B / UFI001C
- **Location**: Near the SIM card slot on the top or bottom layer.
- Look for two small round gold test pads side-by-side with no components populated.
- One pad is connected to the CPU's `BOOT_CONFIG` trace; the adjacent pad or outer shield is Ground (`GND`).

### UFI003
- **Location**: Typically located directly under the SIM tray or near the edge of the RF metal shield.
- On some revisions, a small button is factory-mounted on the PCB; holding this button while plugging the USB stick into the PC enters EDL mode automatically!

### UZ801
- **Location**: Clearly silkscreened on the back of the board with a small gold dot labeled `EDL` or `TP1`.

---

## 3. How to Trigger EDL Mode (The Paperclip / Tweezers Method)

1. Unplug the dongle from all power sources and USB ports.
2. Take a pair of metal tweezers, a conductive paperclip, or a small wire.
3. Gently short the two EDL test pads together (or short the `EDL` test pad to the metal USB shield which serves as `GND`).
4. While holding the short, insert the USB plug into your computer.
5. Wait **2 to 3 seconds**, then release the tweezers/wire.
6. Check your host computer:
   - On Linux: Run `lsusb`. You should see `05c6:9008 Qualcomm, Inc. Gobi Wireless Modem (QDL mode)`.
   - On Windows: Open Device Manager. Look under *Ports (COM & LPT)* for `Qualcomm HS-USB QDLoader 9008`.

---

## 4. Recovering the Device with `edl.py`

Once in EDL mode, you can restore damaged partitions:

```bash
# Verify connection
python3 edl.py printgpt

# Flash working bootloader and boot partition
python3 edl.py w aboot emmc_appsboot.mbn
python3 edl.py w boot boot.img

# Reset device back to normal boot
python3 edl.py reset
```
Your modem will reboot immediately and return to life!
