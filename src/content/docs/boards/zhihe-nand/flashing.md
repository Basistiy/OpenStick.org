---
title: UF896 & Zhihe (NAND Clones) - Flashing Guide
description: Firmware flashing procedures, OpenWrt NAND limitations, and unbricking/restoring stock firmware on Zhihe and UF896 NAND boards.
---

Because **Zhihe** and **UF896** boards with SPI-NAND flash do not use standard eMMC block storage, flashing procedures differ significantly from standard OpenStick dongles.

---

## 1. Why Debian OpenStick Cannot Run on NAND

- **Storage Constraints**: Debian requires at least 1.5 GB of storage space for a minimal rootfs. NAND boards only have 256 MB or 512 MB of total flash.
- **Missing Block Device Driver**: Standard Linux distributions expect a standard MMC block device (`/dev/mmcblk0`). NAND flash operates over MTD (Memory Technology Devices) with raw UBIFS or SquashFS filesystems.

Attempting to flash `debian-rootfs.img` onto a NAND board will result in `fastboot: error: cannot determine partition size` or an immediate kernel panic during boot.

---

## 2. Supported Operating System: OpenWrt (UBIFS / SquashFS)

The only Linux operating system viable on 256MB/512MB NAND boards is a stripped-down **OpenWrt** image built specifically for MSM8916 NAND targets:

### Step 1: Boot into Fastboot
```bash
adb reboot bootloader
```

### Step 2: Flash OpenWrt Kernel & Rootfs
```bash
# Flash custom NAND boot image
fastboot flash boot openwrt-msm8916-nand-boot.img

# Flash UBIFS root filesystem
fastboot flash system openwrt-msm8916-nand-rootfs.ubi

# Reboot into OpenWrt
fastboot reboot
```

After booting, OpenWrt will initialize an RNDIS gadget interface on `192.168.1.1` with the LuCI web interface.

---

## 3. Restoring Factory Stock Android via EDL

If your NAND board becomes bricked or unresponsive:

1. Trigger EDL mode by shorting the **NAND CLK pin** during insertion (see [Zhihe Pinouts](/boards/zhihe-nand/pinouts/)).
2. Use Qualcomm `qdl` or `edl.py` to restore the stock rawprogram XML package:
   ```bash
   qdl prog_emmc_firehose_8916.mbn rawprogram_nand.xml patch0.xml
   ```
3. Once completed, the stick will reboot into factory stock firmware.
