---
title: "UFI003 Troubleshooting: Fake Listings, Docker Thermals & Power"
description: Troubleshooting guide for the UFI003 1GB RAM flagship, covering fake listings, thermal throttling under Docker, cgroups limits, and power requirements.
---

While the UFI003 is the top-tier board in the OpenStick lineup, power users who run containers and continuous services should be aware of several operational considerations.

---

## 1. Fake 1GB RAM Listings & Relabeled Flash

### The Issue:
The single most frequent complaint from buyers is purchasing a device advertised as "UFI003 1GB+8GB" only to discover that the seller shipped a standard 512MB UFI001B board.

### Diagnosis & Proof:
Run:
```bash
cat /proc/meminfo | grep MemTotal
```
- **Genuine UFI003**: `MemTotal: ~980000 kB`
- **Fake / Misrepresented**: `MemTotal: ~480000 kB`

If you receive a 512MB stick, open a dispute immediately on AliExpress/eBay and provide a screenshot of `/proc/meminfo` and a photo of the PCB showing the missing button and silkscreen.

---

## 2. Elevated Thermal Dissipation Under Docker Loads

### The Issue:
Because users run compute-heavy tasks on the UFI003 (Docker containers, Tailscale encryption, web servers), the SoC operates at higher average CPU utilization than simpler headless dongles. Inside the sealed plastic casing, temperatures can climb above **85°C**, leading to aggressive CPU thermal throttling.

### Fix / Workaround:
1. **Remove the Plastic Lid**: For permanent 24/7 home server setups, remove the top plastic cover.
2. **Aluminum Heatsink**: Affix a 14x14x6mm self-adhesive aluminum heatsink directly to the metal RF shield.
3. **Set CPU Frequency Governor**: Lock the CPU to a balanced governor to avoid sudden thermal spikes:
   ```bash
   echo "powersave" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
   ```
   Or set the maximum frequency to 998 MHz instead of 1.2 GHz.

---

## 3. Docker "cgroup memory: missing" Warning

### The Issue:
When installing or running Docker Engine, you may encounter warnings stating that memory cgroup swap accounting is disabled:
```text
WARNING: No swap limit support
WARNING: No memory limit support
```

### Fix / Workaround:
Enable memory cgroups in your kernel boot arguments:

1. Edit the bootloader environment or `/boot/extlinux/extlinux.conf` (or via `lk2nd` cmdline):
   ```text
   cgroup_enable=memory swapaccount=1
   ```
2. Reboot the device. Docker will now enforce memory limits on containers accurately.

---

## 4. Higher Peak Current Draw

### The Issue:
Running 4 CPU cores at 100% load while the 4G LTE modem is transmitting data at full bandwidth can push current consumption to **1.2A–1.4A**. Attempting to run the UFI003 from a computer USB 2.0 port (500mA rating) will cause brownouts and immediate device resets.

### Fix / Workaround:
- Connect the UFI003 to a dedicated 5V 2A USB power supply.
- If plugging into a PC, use a **USB 3.0 (blue port)** or a powered USB hub.
