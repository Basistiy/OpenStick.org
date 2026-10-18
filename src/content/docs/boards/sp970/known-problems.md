---
title: "SP970 Troubleshooting: Antenna Impedance, SIM Cages & LEDs"
description: Troubleshooting guide for SP970 dongles, covering Wi-Fi antenna trace impedance, loose SIM cages, and LED trigger configurations.
---

This page documents the known issues, hardware variations, and troubleshooting steps for the **SP970** board family.

---

## 1. Onboard Wi-Fi Antenna Trace Attenuation

### The Issue:
On certain `SP970_V10` production batches, the PCB trace leading from the Qualcomm WCN3620 chip to the onboard ceramic Wi-Fi antenna suffers from poor impedance matching. In practice, this results in weak Wi-Fi reception: the stick may fail to see networks situated more than 5 meters away or through a single wall.

### Fix / Workaround:
1. Locate the small gold RF switch / test footprint near the ceramic antenna.
2. Solder a thin 32 AWG insulated wire (roughly 31mm in length, representing a quarter-wave monopole antenna for 2.4 GHz) directly to the antenna feed pad.
3. Tuck the wire along the inside edge of the plastic casing. Wi-Fi range typically doubles immediately.

---

## 2. Loose Micro-SIM Tray Contact Pressure

### The Issue:
The SP970 uses a friction-fit metal slide cage for the Micro-SIM card. After several insertions and removals, the metal leaf contacts can lose their spring tension, causing intermittent SIM card disconnection errors (`SimNotFoundError` in ModemManager).

### Fix / Workaround:
1. Unplug the dongle and remove the SIM card.
2. Using a fine sewing needle or tip of tweezers, gently bend the gold leaf contacts slightly upward to increase spring contact pressure against the SIM card pads.
3. When closing the sliding metal cage, ensure it clicks completely into the locked detent.

---

## 3. LED Trigger Persistence Across Reboots

### The Issue:
Under Debian, the SP970's secondary status LED can remain unconfigured after boot unless explicitly instructed by a udev rule or systemd service.

### Fix / Workaround:
Create a udev rule to automatically bind the Wi-Fi LED to network activity:

```bash
# /etc/udev/rules.d/99-sp970-leds.rules
ACTION=="add", SUBSYSTEM=="leds", KERNEL=="*:wifi", ATTR{trigger}="phy0-rx"
```
