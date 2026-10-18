---
title: "UFI001 Flashing Guide: Install Debian, OpenWrt & postmarketOS"
description: Step-by-step flashing guide for UFI001B and UFI001C boards with lk2nd, Debian OpenStick base, postmarketOS, and OpenWrt.
---

Because the **UFI001B / UFI001C** was the first hardware platform targeted by the OpenStick community, all standard OpenStick firmware releases, recovery tools, and scripts have native, first-class compatibility with this board.

---

## Prerequisites

1. An authentic **UFI001B / UFI001C (MSM8916 with eMMC)** dongle.
2. PC with `fastboot` and `adb` installed.
3. Essential backups saved (`modemst1`, `modemst2`, `fsg`) — see [Safety & Backups](/getting-started/backup-safety/).
4. Download the OpenStick release packages (`base.zip` and `debian.zip`).

---

## Step 1: Boot into Fastboot

Insert the dongle into your computer:

```bash
# Verify connection
adb devices

# Reboot to fastboot
adb reboot bootloader
```

If ADB is unavailable, enter EDL mode using the test pads (see [UFI001 Pinouts](/boards/ufi001/pinouts/)) and restore the bootloader.

Confirm Fastboot detects the device:
```bash
fastboot devices
```

---

## Step 2: Flash the lk2nd Bootloader

`lk2nd` manages the boot process and prepares the mainline device tree:

```bash
# Flash lk2nd into the boot partition
fastboot flash boot lk2nd.img

# Reboot into lk2nd
fastboot reboot
```

The dongle reboots, and the LED will pulse blue. Fastboot will now identify the device as running under `lk2nd`.

---

## Step 3: Flash Debian OpenStick Base

Once in `lk2nd` fastboot:

```bash
# Flash the rootfs image
fastboot flash rootfs debian-rootfs.img

# Wipe old Android userdata
fastboot erase userdata

# Boot into Debian
fastboot reboot
```

---

## Step 4: First Boot & SSH Access

1. After roughly 30 seconds, your computer will detect a new USB network card.
2. The stick runs a DHCP server on the `192.168.68.x` subnet.
3. The stick IP address is **`192.168.68.1`**.

Log in via SSH:

```bash
ssh user@192.168.68.1
```

- **User**: `user`
- **Password**: `1`
- **Root**: `sudo su` (password `1`)

---

## Step 5: Post-Install Configuration

```bash
# Expand filesystem to full eMMC size
sudo resize2fs /dev/mmcblk0p20

# Connect to your Wi-Fi network
sudo nmcli dev wifi connect "MyNetwork" password "MyPassword"

# Update package lists
sudo apt update && sudo apt upgrade -y
```

---

## Step 6: 4G Cellular Connection Setup

```bash
# Check modem status with ModemManager
mmcli -m 0

# Enable modem
mmcli -m 0 --enable

# Configure APN profile
sudo nmcli connection add type gsm ifname cdc-wdm0 con-name "4G-LTE" apn "internet"
sudo nmcli connection up "4G-LTE"
```
