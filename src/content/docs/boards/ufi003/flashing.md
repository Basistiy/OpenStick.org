---
title: "UFI003 Flashing Guide: OpenStick Debian Linux & Docker Setup (1GB RAM)"
description: "Step-by-step flashing guide for the 1GB RAM / 8GB eMMC UFI003 (UFI003_MB_V01/V02) flagship board: install OpenStick Debian Linux, lk2nd, and Docker."
---

Because the **UFI003** features 1GB of RAM and 8GB of eMMC storage, flashing custom Linux operating systems turns it into a genuinely capable, production-ready micro-server.

---

## Prerequisites

1. An authentic **UFI003 (MSM8916 with 1GB RAM and 8GB eMMC)** wingle.
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

`lk2nd` detects the UFI003 board ID and configures the kernel for 1GB physical RAM address space:

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

## Step 5: Expanding Storage & Verifying 1GB RAM

Verify that your system recognizes the full 1GB of RAM:

```bash
free -h
# Output should show: ~980MiB Total RAM!

# Expand filesystem to fill the entire 8GB eMMC storage
sudo resize2fs /dev/mmcblk0p20

# Check available disk space
df -h /
# You will have approximately ~5.5 GB to 6.0 GB of free space!
```

---

## Step 6: Installing Docker Engine

Because the UFI003 has 1GB of RAM, it runs **Docker Engine** natively without running out of memory!

```bash
# Install Docker prerequisites
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key and repository
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=arm64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine and Compose
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Verify Docker is running
sudo docker run --rm hello-world
```

You can now deploy lightweight Docker containers such as **Pi-hole**, **AdGuard Home**, or a **Node.js/Go backend** directly on your $12 USB stick!
