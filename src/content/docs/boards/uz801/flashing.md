---
title: UZ801 - Flashing & OS Guide
description: Step-by-step flashing instructions for the UZ801 board with lk2nd, Debian OpenStick base, postmarketOS, and OpenWrt.
---

This guide walks you through installing custom Linux operating systems onto your UZ801 USB stick.

---

## Prerequisites

1. A verified **UZ801 (MSM8916 with eMMC)** stick.
2. Host machine with `adb` and `fastboot` installed (`sudo apt install android-tools-adb android-tools-fastboot` or Android SDK Platform Tools).
3. **Crucial Safety Step**: A complete backup of your modem NV partitions (`modemst1`, `modemst2`, `fsg`) as described in [Safety & Backups](/getting-started/backup-safety/).
4. Download the OpenStick UZ801 release package (`base.zip` and `debian.zip`) or postmarketOS / OpenWrt image.

---

## Step 1: Reboot into Fastboot Mode

Connect your UZ801 stick to your computer:

```bash
# Verify ADB connection
adb devices

# Reboot into the stock Android fastboot bootloader
adb reboot bootloader
```

If your stock firmware does not respond to ADB, trigger EDL mode using the tweezers method (see [UZ801 Pinouts](/boards/uz801/pinouts/)) and flash `emmc_appsboot.mbn` with `edl.py`.

Confirm fastboot detects the board:
```bash
fastboot devices
# Output: [device_serial] fastboot
```

---

## Step 2: Flash the lk2nd Secondary Bootloader

`lk2nd` provides standard mainline Linux device tree booting for Qualcomm MSM8916 boards.

```bash
# Flash lk2nd into the boot partition
fastboot flash boot lk2nd.img

# Reboot into lk2nd
fastboot reboot
```

The device will reboot. The blue LED will pulse, and the stick will re-enumerate in host `fastboot` mode with `lk2nd` active.

```bash
fastboot devices
# Should return device name containing 'lk2nd'
```

For the UZ801, `lk2nd` automatically detects the board ID and targets the `msm8916-yiming-uz801v3.dtb` device tree.

---

## Step 3: Flash the Operating System

### Option A: Debian (OpenStick Base - Recommended)

```bash
# Flash the root filesystem into system/rootfs
fastboot flash rootfs debian-rootfs.img

# (Optional) Erase userdata partition for clean boot
fastboot erase userdata

# Reboot into Debian
fastboot reboot
```

### Option B: postmarketOS (Alpine-based Mainline)

```bash
# Using pmbootstrap or pre-built postmarketOS image
pmbootstrap flasher flash_rootfs --partition rootfs
fastboot reboot
```

### Option C: OpenWrt (Travel Router)

```bash
fastboot flash rootfs openwrt-msm8916-uz801-rootfs.img
fastboot reboot
```

---

## Step 4: First Login & SSH over USB Gadget

After approximately 30 seconds:
1. The UZ801 enumerates as a USB RNDIS/CDC-ECM Ethernet gadget adapter.
2. The stick acts as a DHCP server, assigning your host PC an IP in the `192.168.68.x` range.
3. The stick IP address is **`192.168.68.1`**.

Log in via SSH:

```bash
ssh user@192.168.68.1
```

- **Default User**: `user`
- **Default Password**: `1`
- **Root Password**: `1` (switch with `sudo su`)

---

## Step 5: Connecting to Wi-Fi & Initial Setup

```bash
# Expand rootfs partition to use full eMMC storage
sudo resize2fs /dev/mmcblk0p20

# Scan for Wi-Fi networks
sudo nmcli device wifi list

# Connect to your home or office Wi-Fi
sudo nmcli device wifi connect "Your_SSID" password "Your_Password"

# Update package repositories
sudo apt update && sudo apt upgrade -y
```

---

## Step 6: Initializing the 4G LTE Modem

The cellular modem runs via Qualcomm's QMI interface and `ModemManager`:

```bash
# Check modem detection status
mmcli -L

# Verify modem details (e.g. modem index 0)
mmcli -m 0

# Enable modem radio
mmcli -m 0 --enable

# Set your APN (replace 'internet' with your carrier APN)
sudo nmcli connection add type gsm ifname cdc-wdm0 con-name "Cellular4G" apn "internet"
sudo nmcli connection up "Cellular4G"
```
