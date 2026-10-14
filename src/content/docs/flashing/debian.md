---
title: Flashing Debian (OpenStick Base)
description: Complete step-by-step guide to flashing Debian GNU/Linux on Qualcomm MSM8916 modems with USB gadget networking.
---

The **Debian OpenStick** image (spearheaded by handsomehacker and the community) is the most popular distribution for MSM8916 dongles. It provides a full Debian system with `apt` package management, USB gadget networking, Wi-Fi hotspot support, and automatic modem initialization.

---

## Prerequisites
- A verified **MSM8916 modem with eMMC flash** (e.g. UFI001B, UFI003, Uz801).
- Host computer with `fastboot` and `adb` installed.
- Verified backup of your `modemst1`, `modemst2`, and `fsg` partitions (see [Backup Guide](/getting-started/backup-safety/)).
- The latest OpenStick release package (`base.zip` and `debian.zip`).

---

## Step 1: Boot into Fastboot Mode

Connect your dongle to your computer:

```bash
# Check if ADB detects the device
adb devices

# Reboot into Fastboot mode
adb reboot bootloader
```

If your device is unresponsive or bricked, enter EDL mode via test points and flash `lk2nd` or recovery bootloader.

Verify that `fastboot` detects the device:
```bash
fastboot devices
# Should output: [serial_number] fastboot
```

---

## Step 2: Flash the Bootloader & Kernel (LK2ND)

OpenStick relies on `lk2nd`, a secondary bootloader that mimics a standard Android bootloader while providing mainline Linux device-tree booting:

```bash
# Flash the secondary bootloader into boot partition
fastboot flash boot lk2nd.img

# Reboot into lk2nd fastboot interface
fastboot reboot
```

The device will reboot. On boards with an LED, the LED will flash or turn blue, signaling that `lk2nd` is running.

---

## Step 3: Flash the Root Filesystem

Once in the `lk2nd` fastboot interface:

```bash
# Flash the Debian system image into the rootfs/system partition
fastboot flash rootfs debian-rootfs.img

# (Optional) Erase userdata to ensure a clean first boot
fastboot erase userdata

# Reboot into Debian!
fastboot reboot
```

---

## Step 4: First Login over USB Gadget Network

Once the device finishes booting (takes ~30–45 seconds on first boot):
1. The dongle exposes a virtual USB Ethernet adapter (RNDIS / CDC-ECM).
2. The dongle assigns itself the IP `192.168.68.1` and runs a DHCP server for your computer.
3. Your computer should automatically receive an IP in the `192.168.68.x` subnet.

Connect via SSH:

```bash
ssh user@192.168.68.1
```

- **Default Username**: `user`
- **Default Password**: `1` (or `openstick`)
- **Root Password**: `1` (switch with `sudo su`)

---

## Step 5: Post-Installation Essentials

Once logged into your dongle:

```bash
# Expand filesystem to fill the eMMC (if not resized automatically)
sudo resize2fs /dev/mmcblk0p20

# Connect dongle to your home Wi-Fi
sudo nmcli device wifi connect "Your_WiFi_SSID" password "Your_WiFi_Password"

# Update package lists
sudo apt update && sudo apt upgrade -y

# Install favorite tools
sudo apt install -y htop git curl tmux neofetch
```

Congratulations! You now have a full-fledged Debian 64-bit ARM Linux server running on a \$7 USB stick.
