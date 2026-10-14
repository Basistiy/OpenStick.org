---
title: Safety & Partition Backups
description: Critical guide to dumping and protecting your modem's unique calibration partitions (EFS, QCN, and IMEI) before flashing.
---

:::danger[Crucial Warning: Back Up Before Flashing!]
Every cellular device has radio-frequency (RF) calibration values and an IMEI uniquely paired to its hardware. On Qualcomm devices, this data is stored in the Non-Volatile (NV) RAM and specific flash partitions:
- `modemst1`
- `modemst2`
- `fsg`
- `fsc`

If you erase or overwrite these partitions without having a backup, **your modem will never register on a cellular network again**, and the device will be restricted to Wi-Fi only.
:::

---

## Method 1: Full Backup via Qualcomm EDL Mode (Recommended)

Qualcomm Emergency Download (EDL / 9008) mode operates at the primary bootloader level in ROM. It allows you to read the entire eMMC raw storage byte-for-byte, even if the operating system is locked or corrupted.

### 1. Requirements
- Python 3.8+ installed on your computer.
- The open-source `edl` tool:
  ```bash
  git clone https://github.com/bkerler/edl.git
  cd edl
  pip install -r requirements.txt
  ```

### 2. Enter EDL Mode
Connect the dongle while shorting the **EDL test points** (or use `adb reboot edl` if ADB is active). Your computer should detect:
- **Linux**: `Qualcomm, Inc. Gobi Wireless Modem (QDL mode)` in `lsusb`
- **Windows**: `Qualcomm HS-USB QDLoader 9008` in Device Manager

### 3. Dump the Critical Calibration Partitions
Run `edl` to dump the radio partitions:

```bash
# Dump the primary partition table
python3 edl.py r gpt gpt_backup.bin

# Dump the modem calibration partitions
python3 edl.py r modemst1 modemst1.bin
python3 edl.py r modemst2 modemst2.bin
python3 edl.py r fsg fsg.bin
python3 edl.py r fsc fsc.bin

# (Optional but recommended) Dump the boot and recovery partitions
python3 edl.py r boot boot_stock.bin
python3 edl.py r aboot aboot_stock.bin
```

### 4. Create a Full eMMC Image (Ultimate Safety)
If you have 4–8 GB of disk space on your computer, dump the entire flash drive:

```bash
# Dump entire eMMC drive
python3 edl.py rl my_dongle_full_dump/
```

Store `my_dongle_full_dump/` in a safe folder or cloud backup. If anything ever goes wrong, you can completely restore the device to factory state with `python3 edl.py wl my_dongle_full_dump/`.

---

## Method 2: Backup via ADB Root (If Available)

If your device's stock Android OS allows `adb root`:

```bash
# Obtain root shell
adb root
adb wait-for-device

# Create a backup folder on the device
adb shell "mkdir /sdcard/backup"

# Dump calibration partitions directly from block devices
adb shell "dd if=/dev/block/bootdevice/by-name/modemst1 of=/sdcard/backup/modemst1.img"
adb shell "dd if=/dev/block/bootdevice/by-name/modemst2 of=/sdcard/backup/modemst2.img"
adb shell "dd if=/dev/block/bootdevice/by-name/fsg of=/sdcard/backup/fsg.img"
adb shell "dd if=/dev/block/bootdevice/by-name/fsc of=/sdcard/backup/fsc.img"

# Pull the backup to your PC
adb pull /sdcard/backup ./modem_backup/
```

---

## How to Restore Your Backup If Cellular Fails

If after flashing Linux or OpenWrt your modem shows `No SIM` or refuses to register on 4G LTE:

1. Put the dongle into EDL mode.
2. Restore the original calibration files:
   ```bash
   python3 edl.py w modemst1 modemst1.bin
   python3 edl.py w modemst2 modemst2.bin
   python3 edl.py w fsg fsg.bin
   python3 edl.py w fsc fsc.bin
   python3 edl.py reset
   ```
3. Reboot the device. Cellular functionality and original IMEI will be fully restored!
