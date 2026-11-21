---
title: "JZ08C / JZ08 (H807pro): USB-C MiFi Router with Color Screen & Battery"
description: "Hardware identification, pinouts, and Linux installation guide for JZ08C (JZ08C_V50, JZ08C_V51, H807pro) Qualcomm MSM8916 portable routers."
---

import { Badge, Card, CardGrid } from '@astrojs/starlight/components';

The **JZ08C** (frequently sold under the retail brand name **H807pro** or **H806 / H807pro LED**) is a modern, battery-powered portable 4G LTE MiFi router powered by the Qualcomm Snapdragon 410 (MSM8916). 

It is closely related to the HM-MIFIB family but features significant modern upgrades: a **USB Type-C port** (replacing legacy Micro-USB), updated power circuitry, and a 1.44-inch color SPI status display.

---

## Hardware Specifications

| Component | Specification |
| :--- | :--- |
| **SoC** | Qualcomm Snapdragon 410 (MSM8916) 4x Cortex-A53 @ 1.2 GHz 64-bit |
| **RAM** | 512 MB LPDDR3 (e.g. `JZ08V50-DDR3`) |
| **Storage** | 4 GB eMMC 5.0 (BGA chip, SK Hynix `H9TQ32A4GTMC`) |
| **Display** | 1.44" Color TFT SPI LCD (ST7735S `wx144` or NV3023A `jz05`) |
| **Battery** | Removable 3.7V / 3.8V Li-ion battery (2100 mAh to 3000 mAh) |
| **Ports** | **USB Type-C** (power charging and USB gadget data) |
| **Wireless** | Qualcomm WCN3620 (802.11b/g/n 2.4 GHz + Bluetooth) |
| **Cellular Modem** | Qualcomm LTE Cat 4 + 3G WCDMA |
| **SIM Slot** | Standard push-slide Micro-SIM (3FF) slot |
| **Battery Life** | Tested at **10+ hours** active standby (85% to 20%) with Wi-Fi and LTE enabled |

---

## Known Silkscreen Revisions & Retail Names

<CardGrid>
  <Card title="JZ08C_V50 (H807pro)" icon="approve-check">
    **Silkscreen**: `JZ08C_V50_20250930 BOT` / `TOP`<br/>
    **Board Markings**: `20260602-JZ-10K EU`, sticker `JZ08V50-DDR3-3[T]-XPA`<br/>
    **Retail Listing**: Sold on Shopee (Vietnam/SE Asia) as *H807pro* or *H806-H807pro-LED*.<br/>
    **Display**: ST7735S SPI panel. Verified working with OpenStick Debian installer.
  </Card>

  <Card title="JZ08C_V51" icon="document">
    **Silkscreen**: `JZ08C_V51_20260609 TOP`<br/>
    **Retail Listing**: Discovered on European marketplaces (Allegro Poland).<br/>
    **Hardware**: MSM8916, SK Hynix eMMC, USB-C connector, tactile buttons.
  </Card>

  <Card title="MF800B / MF800B-E" icon="document">
    **Casing Model**: Labeled *MF800B, Mobile WiFi 4G LTE* on the rear regulatory label.<br/>
    Houses an internal `HM-MIFIB-V18` or `JZ08C` board with battery contacts and front screen.
  </Card>
</CardGrid>

---

## SPI Color LCD Device Tree Wiring

From stock Android kernel device tree analysis conducted by community member *Marc Khuong*, the SPI LCD on the JZ08C_V50 is wired as follows:

| Signal | SoC GPIO | Controller / Device Tree Details |
| :--- | :--- | :--- |
| **SPI MOSI / SDA** | **GPIO 12** | Bidirectional serial data line |
| **SPI MISO** | **GPIO 13** | Listed in stock DT (typically unread on 3-wire panels) |
| **SPI CS** | **GPIO 14** | Chip Select (Active Low) |
| **SPI CLK** | **GPIO 15** | Serial Clock (SPI mode 0) |
| **D/C (Data/Cmd)** | **GPIO 116** | High = Data, Low = Command |
| **RESET** | **GPIO 118** | Hardware Reset (Active Low) |
| **Backlight** | **PM8916 MPP4** | Managed via PMIC current sink (`lcd-bl`), not a standard GPIO |
| **Bus Controller** | **BLSP1 QUP4** | Hardware SPI peripheral block (`spi@78b8000`) |

:::note[Panel Controller Detection]
Stock firmware supports two panel types and identifies the installed display at boot:
1. **ST7735S** (`wx144`)
2. **NV3023A** (`jz05`)
:::

---

## Flashing OpenStick Debian

Community members report that the standard OpenStick 1-Click installer works well on the JZ08C with one critical caveat:

1. **Reboot Directly to EDL**:
   * Do **not** use the standard Fastboot pathway.
   * Put the device into EDL mode via ADB while running the stock Android OS:
     ```bash
     adb reboot edl
     ```
2. **Run Installer**:
   * Select the **HM-MIFIB** board target in the OpenStick installer.
3. **Display Status**:
   * Standard OpenStick Debian boots and runs reliably. A custom devicetree or LCD driver configuration using the GPIO mappings above is required to initialize the framebuffer on the color screen.
