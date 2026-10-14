---
title: Antennas, Thermals & Hardware Mods
description: Hardware modding tutorials for adding external 4G/Wi-Fi antennas, thermal heatsinks, USB OTG host ports, and battery power.
---

Because MSM8916 modems are manufactured as budget consumer items, community members frequently perform hardware modifications to unlock their full potential.

---

## 1. External Antenna Mod (IPEX / u.FL Sockets)

Most stock wingles rely on tiny stamped metal or ceramic onboard antennas. In weak signal areas, signal reception can be poor.

### How to Add an External Antenna
1. Locate the **RF test switch socket** (often a small gold barrel with a hole in the center, typically a Murata SWD/MS-156 type) or the unpopulated antenna pad on the PCB.
2. Carefully solder an **IPEX/u.FL coaxial pigtail**:
   - Center conductor goes to the RF feed trace.
   - Outer ground braid solders to the surrounding copper ground plane.
3. Drill a small 3mm hole through the plastic dongle cap.
4. Mount an **SMA female bulkhead connector** to connect high-gain 4G LTE paddle antennas or external Yagi/MIMO directional antennas.

*Result: Typically improves cellular signal (RSRP) by 15–25 dBm, drastically increasing throughput and link stability!*

---

## 2. Thermal Management & Copper Shims

Under heavy compilation, continuous LTE downloads, or running Docker containers, the MSM8916 SoC and PM8916 power management IC can heat up to 70°C–80°C inside the sealed plastic enclosure.

### Recommended Cooling Mods
- **Thermal Pad to Plastic Case**: Place a 1.0mm or 1.5mm silicone thermal pad directly on top of the RF shield above the SoC, transferring heat directly to the exterior plastic.
- **Copper Heatsink**: Affix a small 10x10mm copper or aluminum raspberry pi heatsink to the SoC shield.
- **Ventilation Slots**: Drill or slice small airflow vents on the top and bottom lids of the plastic shell.

---

## 3. Adding a USB Host (OTG) Port

The MSM8916 USB controller natively supports dual-role OTG (Host and Device). While the stick's primary USB-A plug is typically wired for power input and device gadget mode, you can tap into USB host capability:

1. **Hardware Modification**:
   - Locate the USB `ID` pad (GPIO) or switch the controller via Linux sysfs:
     ```bash
     echo host > /sys/devices/platform/soc/78d9000.usb/mode
     ```
2. **Powering USB Peripherals**:
   - Because the stick only receives 5V input, connect a 5V step-up booster or external powered USB hub to supply 5V to downstream USB devices (such as USB flash drives, GPS receivers, or RTL-SDR dongles).
