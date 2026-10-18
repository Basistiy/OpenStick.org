---
title: "HM-MIFIB Flashing Guide: Linux, LCD Drivers & Battery Setup"
description: How to flash lk2nd, Debian, and Linux on the HM-MIFIB portable router, including LCD screen driver and battery monitoring setup.
---

Flashing the **HM-MIFIB** is very similar to standard OpenStick dongles, with the added benefit that `lk2nd` and Linux can initialize the onboard color LCD display and battery fuel gauge!

---

## Prerequisites

1. An authentic **HM-MIFIB (MSM8916 with eMMC)** router.
2. A **fully charged battery** (at least 3.8V; never flash on an empty battery!).
3. Host computer with `fastboot`, `adb`, and `python3-serial`.
4. Safety backups of your calibration data (`fsg`, `modemst1`, `modemst2`) — see [Safety & Backups](/getting-started/backup-safety/).
5. Download the HM-MIFIB OpenStick firmware package (`lk2nd.img` and `debian-rootfs.img`).

---

## Step 1: Boot into Fastboot Mode

1. Power on the HM-MIFIB by holding the **Power button** for 3 seconds until the boot logo appears on the LCD.
2. Connect the router to your computer with a Micro-USB or USB-C data cable.
3. Check ADB detection:
   ```bash
   adb devices
   ```
4. Reboot into Fastboot:
   ```bash
   adb reboot bootloader
   ```

*Alternative*: If the device is powered off, hold the **WPS button** while inserting the USB cable to enter fastboot directly on supported bootloader revisions.

Confirm fastboot sees the device:
```bash
fastboot devices
```

---

## Step 2: Flash the lk2nd Secondary Bootloader

`lk2nd` includes built-in panel drivers for the HM-MIFIB's ST7735S display:

```bash
# Flash lk2nd into the boot partition
fastboot flash boot lk2nd.img

# Reboot into lk2nd
fastboot reboot
```

### The LCD Screen Comes Alive!
Unlike headless dongles, the HM-MIFIB will display the **`lk2nd` graphical fastboot screen** directly on the 1.44" color LCD, rendering:
- Fastboot mode indicator
- Battery voltage and charge percentage
- Current device tree target (`msm8916-hm-mifib`)

---

## Step 3: Flash the Debian Root Filesystem

Once in the `lk2nd` fastboot interface:

```bash
# Flash the root filesystem into the system partition
fastboot flash rootfs debian-rootfs.img

# Erase old Android userdata
fastboot erase userdata

# Reboot into Debian!
fastboot reboot
```

---

## Step 4: First Boot & SSH Access over USB

1. Allow roughly 45 seconds for the first boot.
2. The router will start up and configure a USB Ethernet adapter on your PC.
3. The router's default IP is **`192.168.68.1`**.

Log in via SSH:
```bash
ssh user@192.168.68.1
```
- **Username**: `user`
- **Password**: `1`
- **Root access**: `sudo su` (password `1`)

---

## Step 5: Enabling the LCD Screen & Framebuffer in Linux

If your image does not have the console on the display enabled by default, verify the framebuffer:

```bash
# Check if fb0 exists
ls -l /dev/fb0

# Enable text console on the LCD
sudo sh -c 'echo 1 > /sys/class/graphics/fbcon/cursor_blink'
```

### Running an OLED / LCD System Monitor Widget
You can run a lightweight Python script or daemon that reads `/sys/class/power_supply/battery/` and displays live system health on the screen:

```python
# Quick battery monitor test
with open('/sys/class/power_supply/battery/capacity', 'r') as f:
    capacity = f.read().strip()
with open('/sys/class/power_supply/battery/voltage_now', 'r') as f:
    voltage = int(f.read().strip()) / 1000000

print(f"Battery: {capacity}% ({voltage:.2f}V)")
```

---

## Step 6: 4G LTE Modem Initialization

```bash
# Enable modem
mmcli -m 0 --enable

# Add your cellular connection profile
sudo nmcli connection add type gsm ifname cdc-wdm0 con-name "Cellular4G" apn "internet"
sudo nmcli connection up "Cellular4G"
```
