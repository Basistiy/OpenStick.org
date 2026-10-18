---
title: "SP970 Flashing Guide: Install Debian, OpenWrt & postmarketOS"
description: Step-by-step flashing guide for the SP970 4G USB dongle with lk2nd, Debian OpenStick base, postmarketOS, and OpenWrt.
---

This guide provides instructions for flashing custom Linux distributions onto the **SP970** 4G dongle.

---

## Prerequisites

1. An authentic **SP970 (MSM8916 with eMMC)** stick.
2. PC with `fastboot` and `adb` installed.
3. Essential backups saved (`modemst1`, `modemst2`, `fsg`) — see [Safety & Backups](/getting-started/backup-safety/).
4. Download the OpenStick release packages (`base.zip` and `debian.zip`).

---

## Step 1: Boot into Fastboot

Insert the SP970 into your computer:

```bash
# Verify ADB detects the stick
adb devices

# Reboot into Fastboot mode
adb reboot bootloader
```

If ADB is locked or disabled, use the tweezers method on the EDL test pads (see [SP970 Pinouts](/boards/sp970/pinouts/)) and restore the bootloader using `edl.py`.

Confirm fastboot detects the stick:
```bash
fastboot devices
```

---

## Step 2: Flash the lk2nd Bootloader

```bash
# Flash lk2nd into the boot partition
fastboot flash boot lk2nd.img

# Reboot into lk2nd
fastboot reboot
```

The SP970 will reboot, and `lk2nd` will take over hardware initialization, pulsing the blue LED.

---

## Step 3: Flash Debian Root Filesystem

Once in `lk2nd` fastboot:

```bash
# Flash the Debian system image into the rootfs/system partition
fastboot flash rootfs debian-rootfs.img

# Erase userdata partition
fastboot erase userdata

# Reboot into Debian!
fastboot reboot
```

---

## Step 4: First Boot & SSH Access

1. After approximately 30–45 seconds, the stick will expose a virtual USB network card on your computer.
2. The stick IP address is **`192.168.68.1`**.

Log in via SSH:

```bash
ssh user@192.168.68.1
```

- **User**: `user`
- **Password**: `1`
- **Root**: `sudo su` (password `1`)

---

## Step 5: Post-Install Configuration & 4G Setup

```bash
# Expand storage to fill eMMC
sudo resize2fs /dev/mmcblk0p20

# Connect to Wi-Fi
sudo nmcli dev wifi connect "MyWiFi" password "MyPassword"

# Initialize cellular modem
mmcli -m 0 --enable
sudo nmcli connection add type gsm ifname cdc-wdm0 con-name "Cellular4G" apn "internet"
sudo nmcli connection up "Cellular4G"
```
