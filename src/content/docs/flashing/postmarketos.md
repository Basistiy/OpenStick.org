---
title: Installing postmarketOS (Mainline Linux)
description: Running genuine mainline Linux on MSM8916 modems with postmarketOS (pmOS) and modern kernel features.
---

**postmarketOS** (pmOS) is a Linux distribution based on Alpine Linux tailored specifically for smartphones and mobile embedded platforms. Because Snapdragon 410 (MSM8916) has exceptional upstream Linux kernel support, postmarketOS offers a lean, security-focused, and modern Linux environment.

---

## Why postmarketOS?

- **Upstream Mainline Kernel**: Runs bleeding-edge Linux (6.x+) without vendor Android hacks.
- **Ultra-Lightweight Memory Footprint**: Idle RAM usage is often under **40–60 MB**, leaving over 400 MB of free memory on 512 MB devices!
- **Fast Package Management**: `apk` package manager is lightning fast on eMMC storage.
- **Active Upstream Community**: Maintained by the core mobile Linux developers.

---

## Method 1: Using pmbootstrap (Recommended)

`pmbootstrap` is postmarketOS's official Python deployment tool.

### 1. Install pmbootstrap
```bash
# On your Linux/macOS host machine
pip install --user pmbootstrap
```

### 2. Initialize the Device Profile
```bash
pmbootstrap init
```
During the prompt:
- **Work path**: Keep default (`~/.local/var/pmbootstrap`)
- **Channel**: `edge` (or `v24.06`+)
- **Vendor**: `generic` (or `qualcomm`)
- **Device**: Select `generic-msm8916` or your specific board model (`msm8916-ufi001b`, `msm8916-ufi003`)
- **User Interface**: `none` (headless server)
- **Extra packages**: `networkmanager`, `modemmanager`, `openssh`

### 3. Build & Flash
Put your dongle into `fastboot` mode:

```bash
# Build the images
pmbootstrap install

# Flash kernel and bootloader
pmbootstrap flasher flash_kernel

# Flash the root filesystem
pmbootstrap flasher flash_rootfs
```

Reboot the dongle:
```bash
fastboot reboot
```

---

## Connecting & First Boot

postmarketOS brings up USB networking with CDC-ECM:

1. Host PC IP: `172.16.42.2`
2. Dongle IP: `172.16.42.1`

Connect via SSH:
```bash
ssh user@172.16.42.1
```

Once connected, update packages and install your needed software:
```bash
sudo apk update
sudo apk upgrade
sudo apk add htop curl nano docker
```
