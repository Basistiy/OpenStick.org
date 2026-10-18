---
title: "MSM8916 Tools Setup: EDL 9008 Drivers, ADB & Fastboot"
description: "Complete host workstation guide for Qualcomm MSM8916 tools: EDL Emergency Download 9008 drivers, ADB, Fastboot, and partition flashers on Linux, macOS, and Windows."
---

Before communicating with an MSM8916 modem, you must prepare your host development machine with the appropriate flashing tools and USB drivers.

---

## 1. Android Platform Tools (`adb` & `fastboot`)

The Android SDK platform tools are required for high-level interaction, rebooting, and flashing partition images.

### Linux (Ubuntu / Debian / Arch)
```bash
# Debian / Ubuntu
sudo apt update && sudo apt install -y android-tools-adb android-tools-fastboot

# Arch Linux
sudo pacman -S android-tools
```

### macOS (Homebrew)
```bash
brew install android-platform-tools
```

### Windows
1. Download official [SDK Platform-Tools for Windows](https://developer.android.com/tools/releases/platform-tools).
2. Extract the folder and add its path to your system's `PATH` environment variable.

---

## 2. Qualcomm EDL Programmer (`edl.py`)

The open-source `edl` utility created by Bjoern Kerler is the standard cross-platform tool for Qualcomm Emergency Download Mode.

### Setup (Linux / macOS / Windows)
```bash
# Clone the repository
git clone https://github.com/bkerler/edl.git
cd edl

# Create a virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

---

## 3. OS-Specific Driver Configuration

### Linux: Udev Rules
On Linux, create a udev rules file so you can access USB devices without running as `root`:

```bash
sudo tee /etc/udev/rules.d/51-android-msm.rules << 'EOF'
# Qualcomm 9008 EDL Mode
SUBSYSTEM=="usb", ATTR{idVendor}=="05c6", ATTR{idProduct}=="9008", MODE="0666", GROUP="plugdev"

# Android ADB
SUBSYSTEM=="usb", ATTR{idVendor}=="05c6", ATTR{idProduct}=="9091", MODE="0666", GROUP="plugdev"

# Fastboot Mode
SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", ATTR{idProduct}=="d00d", MODE="0666", GROUP="plugdev"
EOF

# Reload rules
sudo udevadm control --reload-rules
sudo udevadm trigger
```

### Windows: Qualcomm HS-USB QDLoader 9008 Driver
When your dongle is placed in EDL mode, Windows may show it in Device Manager with a yellow exclamation mark: `QHSUSB_BULK`.

1. Download and install the official **Qualcomm HS-USB QDLoader 9008 driver** (x64).
2. Alternatively, use [Zadig](https://zadig.akeo.ie/) to assign the `libusb-win32` or `WinUSB` driver to the `QHSUSB_BULK` device if you intend to use `edl.py`.

### macOS
macOS includes native CDC-ACM drivers. For EDL mode with `edl.py`, ensure Python's `libusb` is installed:
```bash
brew install libusb
```

---

## 4. Verification

Test your setup by connecting your dongle:

```bash
# Test ADB
adb devices

# Test Fastboot (when booted in bootloader)
fastboot devices

# Test EDL (when connected in 9008 mode)
python3 edl.py printgpt
```
If `python3 edl.py printgpt` outputs the partition table of your device, your environment is 100% ready for flashing!
