---
title: "UFI003 Flashing Guide: OpenStick Debian Linux Setup"
description: "Step-by-step flashing guide for the UFI003 (UFI003_MB_V01/V02) board: install OpenStick Debian Linux and lk2nd bootloader."
---

With its onboard physical EDL recovery push button, the **UFI003** is one of the easiest MSM8916 dongles to recover and flash with OpenStick Debian Linux.

---

## Prerequisites

1. An authentic **UFI003 (MSM8916)** wingle.
2. PC with `fastboot` and `adb` installed.
3. Complete backup of modem partitions (`modemst1`, `modemst2`, `fsg`) — see [Safety & Backups](/getting-started/backup-safety/).
4. Download the OpenStick release packages (`base.zip` and `debian.zip`).

---

## Step 1: Boot into Fastboot Mode

Connect the UFI003 to your computer:

```bash
# Verify ADB detection
adb devices

# Reboot to fastboot
adb reboot bootloader
```

*Alternative*: If the device is soft-bricked, hold the physical **onboard push button** while inserting the USB plug into your PC to enter EDL mode, then flash the bootloader via `edl.py`.

Confirm fastboot detects the board:
```bash
fastboot devices
```

---

## Step 2: Flash the lk2nd Bootloader

`lk2nd` detects the UFI003 board ID and properly configures hardware peripherals and clocks:

```bash
# Flash lk2nd to boot partition
fastboot flash boot lk2nd.img

# Reboot into lk2nd fastboot interface
fastboot reboot
```

The device will reboot into `lk2nd`. The blue LED will pulse steadily.

---

## Step 3: Flash Debian Root Filesystem

Once in the `lk2nd` fastboot interface:

```bash
# Flash Debian rootfs into the system partition
fastboot flash rootfs debian-rootfs.img

# Erase old Android userdata partition
fastboot erase userdata

# Reboot into Debian!
fastboot reboot
```

---

## Step 4: First Boot & SSH Access

1. Wait roughly 30 seconds for the system to initialize.
2. The UFI003 will enumerate as a virtual USB network card on your computer.
3. Connect via SSH to **`192.168.68.1`**:

```bash
ssh user@192.168.68.1
```

- **Username**: `user`
- **Password**: `1`
- **Root access**: `sudo su` (password `1`)

---

## Step 5: Expanding Storage & Verifying Memory

Verify your system memory and storage:

```bash
free -h
# Standard factory UFI003 boards show ~480MiB Total RAM

# Expand filesystem to fill the eMMC partition
sudo resize2fs /dev/mmcblk0p20

# Check available disk space
df -h /
```

---

## Step 6: Configuring Swap for Background Services

Because factory UFI003 boards feature 512MB of RAM, configuring swap space or zram is essential before running Docker or background services:

```bash
# Create a 1GB swapfile
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make swap persistent across reboots
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

With swap enabled, the device can reliably run lightweight daemons, Tailscale VPN, Pi-hole, or Python bots without triggering Out-Of-Memory (OOM) kernel panics.
