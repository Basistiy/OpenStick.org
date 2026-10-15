---
title: HMUF02 - Flashing & OS Guide
description: Step-by-step flashing guide for the HMUF02 4G wingle, including lk2nd setup, Debian OpenStick base, postmarketOS, and modem setup.
---

This guide provides instructions for replacing the factory Android firmware on your HMUF02 wingle with full mainline Linux or Debian.

---

## Prerequisites

1. An authentic **HMUF02 stick with Qualcomm MSM8916 and eMMC flash**.
2. Host computer with `fastboot` and `adb` installed.
3. Essential backups taken (`modemst1`, `modemst2`, `fsg`) — see [Safety & Backups](/getting-started/backup-safety/).
4. Download the OpenStick release packages (`base.zip` and `debian.zip`).

---

## Step 1: Boot into Fastboot Mode

Plug the HMUF02 into your computer:

```bash
# Verify the computer sees the device over ADB
adb devices

# Reboot into fastboot mode
adb reboot bootloader
```

If the stock firmware does not expose ADB or is locked:
1. Enter EDL mode via the reset button or test pads (see [HMUF02 Pinouts](/boards/hmuf02/pinouts/)).
2. Flash the unbrick bootloader using `python3 edl.py w aboot emmc_appsboot.mbn`.
3. Reboot to fastboot: `python3 edl.py reset`.

Confirm Fastboot detects the device:
```bash
fastboot devices
```

---

## Step 2: Flash the lk2nd Bootloader

`lk2nd` operates as a secondary bootloader that packages a mainline Linux device tree:

```bash
# Flash lk2nd to the boot partition
fastboot flash boot lk2nd.img

# Reboot into lk2nd
fastboot reboot
```

The HMUF02 will reboot into the `lk2nd` fastboot interface. The blue indicator LED will pulse gently, confirming `lk2nd` is running.

---

## Step 3: Flash the Root Filesystem

Once in the `lk2nd` fastboot mode:

```bash
# Flash Debian rootfs into the system partition
fastboot flash rootfs debian-rootfs.img

# Clear userdata to wipe previous stock Android caches
fastboot erase userdata

# Reboot into Debian!
fastboot reboot
```

---

## Step 4: First Boot & SSH Access

1. Wait roughly 30–45 seconds for first-boot system initialization.
2. The stick will create a virtual USB network card (CDC-ECM / RNDIS) on your PC.
3. The stick IP address is **`192.168.68.1`**.

Connect via SSH from your computer terminal:

```bash
ssh user@192.168.68.1
```

- **Username**: `user`
- **Password**: `1`
- **Root access**: `sudo su` (password `1`)

---

## Step 5: Post-Install Configuration

```bash
# Resize filesystem to utilize entire 4GB eMMC storage
sudo resize2fs /dev/mmcblk0p20

# Scan for local Wi-Fi networks
sudo nmcli dev wifi list

# Connect to your Wi-Fi network
sudo nmcli dev wifi connect "MyHomeNetwork" password "MySecretPassword"

# Update package repositories
sudo apt update && sudo apt upgrade -y
```

---

## Step 6: Enabling 4G Cellular Internet

```bash
# Check ModemManager status
mmcli -L

# Verify modem details (usually index 0)
mmcli -m 0

# Configure cellular data profile (replace with your carrier APN)
sudo nmcli connection add type gsm ifname cdc-wdm0 con-name "LTE-Data" apn "internet"
sudo nmcli connection up "LTE-Data"
```
