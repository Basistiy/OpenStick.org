---
title: UFI001B / UFI001C - Known Problems & Quirks
description: Troubleshooting common issues on UFI001B and UFI001C dongles, including Wi-Fi regulatory limits, LED differences, and thermal throttling.
---

This page documents the known hardware quirks and software fixes for the **UFI001B** and **UFI001C** boards.

---

## 1. Swapped LED GPIO Routing Between V01 and V02

### The Issue:
On `UFI001B_MB_V01`, the Wi-Fi LED is controlled by GPIO 1 and the cellular LED by GPIO 2. On certain `UFI001B_MB_V02` batches, these lines were reversed or pulled through an inverting buffer. As a result, the Wi-Fi LED may illuminate when cellular data is active, or blink erratically.

### Fix / Workaround:
You can verify and reassign the LED triggers in Linux:

```bash
# Set LED 1 to Wi-Fi traffic
echo phy0-rx | sudo tee /sys/class/leds/blue:wifi/trigger

# Set LED 2 to modem network registration
echo netdev | sudo tee /sys/class/leds/green:lte/trigger
```

---

## 2. Wi-Fi Regulatory Domain Restricting Channels 12–14

### The Issue:
The Qualcomm WCN3620 driver may initialize with the default regulatory domain set to `US` or `00` (World Regulatory), disabling channels 12, 13, and 14 (frequently used in Europe and Asia).

### Fix / Workaround:
Set your country code using `iw`:

```bash
# Set regulatory domain to your country (e.g. DE, GB, JP)
sudo iw reg set DE

# Make permanent across reboots
echo 'REGDOMAIN=DE' | sudo tee -a /etc/default/crda
```

---

## 3. Excessive eMMC Flash Wear from Systemd Journals

### The Issue:
The onboard 4GB eMMC storage has limited write endurance compared to server-grade SSDs. By default, Debian writes verbose system logs to `/var/log/journal/`, which can cause premature eMMC wear over months of 24/7 uptime.

### Fix / Workaround:
Configure systemd to log exclusively to volatile RAM:

```ini
# Edit /etc/systemd/journald.conf
[Journal]
Storage=volatile
RuntimeMaxUse=32M
```

Restart the logging service:
```bash
sudo systemctl restart systemd-journald
```

---

## 4. Thermal Throttling in Closed USB Enclosures

### The Issue:
Under heavy LTE downloads or multi-threaded CPU tasks, the UFI001B SoC can reach 75°C+. 

### Fix / Workaround:
- Attach a 1.0mm silicone thermal pad between the metal SoC shielding and the plastic top case.
- Drill small 1mm ventilation holes in the cap to allow passive convection cooling.
