---
title: "UFI103S / UFI103: Hardware Specs, Revisions & Debian Flashing"
description: "Community guide for UFI103S (UFI103S_V02, UFI103S_V03, ufi103s_v05) Qualcomm MSM8916 4G USB modems, including Debian 12 installation."
---

import { Badge, Card, CardGrid } from '@astrojs/starlight/components';

The **UFI103S** (often identified in stock web admin interfaces simply as **UFI103**) is a widely circulating Snapdragon 410 (MSM8916) USB dongle. It is visually very similar to the UFI003 and UZ801, featuring a push-slide Micro-SIM slot and an onboard EDL recovery button.

Community members have successfully flashed Debian 12 onto UFI103S dongles, achieving working USB gadget networking, Wi-Fi hotspot mode, and SSH access.

---

## Hardware Specifications

| Component | Specification |
| :--- | :--- |
| **SoC** | Qualcomm Snapdragon 410 (MSM8916) 4x Cortex-A53 @ 1.2 GHz 64-bit |
| **RAM** | 512 MB LPDDR3 |
| **Storage** | 4 GB eMMC 5.0 (BGA chip) |
| **Wireless** | Qualcomm WCN3620 (802.11b/g/n 2.4 GHz + Bluetooth 4.0) |
| **Cellular Modem** | Qualcomm LTE Cat 4 |
| **SIM Slot** | Standard push-slide Micro-SIM (3FF) metal slot |
| **Hardware Button** | SMD push button located directly adjacent to the SIM slot |
| **MicroSD Slot** | None |
| **Power Input** | USB-A 5V, ~250mA idle, up to 1.1A peak LTE load |

---

## Known Silkscreen Revisions

<CardGrid>
  <Card title="UFI103S_V02" icon="approve-check">
    **Silkscreen**: `UFI103S_V02`<br/>
    **Verified Status**: <Badge text="Working Debian 12" variant="success" /><br/>
    Confirmed by community member *Olivia Chernomorets*. Flashes cleanly with standard kernel and provides immediate USB / Wi-Fi SSH connectivity.
  </Card>

  <Card title="UFI103S_V03" icon="document">
    **Silkscreen**: `UFI103S_V03`<br/>
    **Web Admin**: Displays `UFI103`<br/>
    Reported by community member *황지훈*. Similar hardware layout with recycled LTE module package; supports standard EDL recovery.
  </Card>

  <Card title="ufi103s_v05" icon="document">
    **Silkscreen**: `ufi103s_v05`<br/>
    Reported by community member *AMZ*. Tested with custom Debian releases.
  </Card>
</CardGrid>

---

## Flashing Debian 12 on UFI103S

The OpenStick automated 1-Click installer is actively working to incorporate native UFI103S images. In the interim, community members use the dedicated **`ufi103s-debian`** toolset:

### Step-by-Step Installation:

1. **Clone the Dedicated Flashing Repository**:
   ```bash
   git clone https://github.com/maomomo-eth/ufi103s-debian.git
   cd ufi103s-debian
   chmod -R 755 .
   ```

2. **Download the Release RootFS & Base Packages**:
   The installer script expects release tarballs in the `release/` directory:
   ```bash
   mkdir -p release/v2.2.0 && cd release/v2.2.0
   wget https://github.com/maomomo-eth/ufi103s-debian/releases/download/v2.2.0/rootfs-debian12-usb-wifi-ssh-vocat-mm-wifi.img
   wget https://github.com/maomomo-eth/ufi103s-debian/releases/download/v2.2.0/ufi103s-debian-v2.2.0-base.tar.gz
   tar -xvf ufi103s-debian-v2.2.0-base.tar.gz
   cd ../..
   ```

3. **Reboot Stick into EDL Mode**:
   ```bash
   adb reboot edl
   ```
   *Hardware fallback*: If ADB is inaccessible, unplug the stick, hold down the button located next to the SIM card slot, plug it into the USB port, and hold for 2 seconds.

4. **Execute the Flash Script**:
   ```bash
   ./flash.sh
   ```
   The script automatically reads and backs up existing stock partitions before flashing Debian 12.

5. **Access Debian Linux**:
   Once flashing finishes and the device reboots:
   * **USB Ethernet**: Connect via `ssh root@192.168.68.1` (or the IP configured in your network gadget).
   * **Wi-Fi Hotspot**: The stick broadcasts a recovery Wi-Fi SSID providing local SSH terminal access.

---

## Differences vs UFI003

* **Exterior**: Packaging and plastic casing appear nearly identical to the UFI003.
* **Firmware ID**: The stock web admin page reports `"UFI103"` instead of `"UFI003"`.
* **Partition Layout**: Uses slightly different partition offsets from reference UFI001/UFI003 images, which is why flashing an unmodified UZ801/UFI003 image may cause SIM detection or boot issues.

---

## Community-Verified Store Links

| Platform | Listing Link | Confirmed Silkscreen | Verified By | Status |
| :--- | :--- | :--- | :--- | :--- |
| **AliExpress** | [UFI103S 4G LTE USB Modem Dongle](/go/ufi103s-aliexpress-1) | `UFI103S_V03` ("Red Box Item") | 황지훈 | <Badge text="Confirmed" variant="success" /> |
