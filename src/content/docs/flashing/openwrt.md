---
title: OpenWrt Pocket Travel Router
description: Transform your MSM8916 4G USB dongle into a fully featured OpenWrt router with LuCI web interface, VPN, and Wi-Fi hotspot.
---

By flashing **OpenWrt** onto an MSM8916 USB stick, you convert a cheap \$7 dongle into an enterprise-grade portable router with:
- **LuCI Web Interface**: Manage firewall, DHCP, and Wi-Fi visually from any browser.
- **Failover / Dual WAN**: Seamlessly route traffic between cellular 4G LTE and hotel/café Wi-Fi.
- **WireGuard / OpenVPN Client**: Route all connected devices through your encrypted home or cloud VPN tunnel.
- **Ad-blocking**: Run `adblock` or `simple-adblock` directly on the stick to protect mobile devices.

---

## Prerequisites
- Supported MSM8916 eMMC dongle (UFI001B / UFI003 recommended).
- Fastboot / LK2ND installed.
- OpenWrt firmware image (`openwrt-msm8916-boot.img` and `openwrt-msm8916-rootfs.img`).

---

## Flashing Instructions

1. Place your device in **Fastboot mode**:
   ```bash
   adb reboot bootloader
   ```

2. Flash the OpenWrt kernel and root filesystem:
   ```bash
   # Flash boot image containing OpenWrt kernel
   fastboot flash boot openwrt-msm8916-boot.img

   # Flash rootfs containing OpenWrt system
   fastboot flash rootfs openwrt-msm8916-rootfs.img

   # Erase leftover Android userdata
   fastboot erase userdata

   # Reboot into OpenWrt
   fastboot reboot
   ```

---

## First-Time Configuration & Web UI Access

1. Plug the dongle into a USB power supply or computer.
2. The device will broadcast a Wi-Fi network named **OpenWrt** (unencrypted on first boot) or assign an IP over USB (`192.168.1.1`).
3. Connect your laptop or smartphone to the Wi-Fi or USB network.
4. Open your web browser and navigate to:
   ```
   http://192.168.1.1
   ```
5. Click **Login** (default has no password set).
6. Set a strong administrator password under **System -> Administration**.

---

## Setting up 4G LTE Cellular in LuCI

1. Navigate to **Network -> Interfaces**.
2. Look for the `MODEM` or `WWAN` interface (driven by `qmi_wwan` or `cdc_mbim`).
3. Edit the interface:
   - **Protocol**: QMI Cellular or MBIM.
   - **Device**: `/dev/cdc-wdm0`.
   - **APN**: Enter your mobile carrier's Access Point Name (e.g., `fast.t-mobile.com`, `wholesale`, `internet`).
   - **PIN**: Leave blank unless your SIM card requires a PIN code.
4. Click **Save & Apply**.
5. Within 15 seconds, the modem will connect to 4G LTE, acquire an IP address, and begin routing traffic to all Wi-Fi clients!
