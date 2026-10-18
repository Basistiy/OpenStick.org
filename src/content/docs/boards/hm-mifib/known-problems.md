---
title: "HM-MIFIB Troubleshooting: Battery Boot Loops & LCD Polarities"
description: Troubleshooting guide for HM-MIFIB, covering battery boot loops, USB current brownouts, LCD backlight polarity, and auto-power-on tricks.
---

Because the **HM-MIFIB** incorporates an active battery charging circuit and an LCD panel, it presents unique quirks not found on standard USB dongles.

---

## 1. Bootloop When Connected to USB Without Battery

### The Issue:
If you remove the lithium-ion battery and attempt to run the HM-MIFIB purely off a computer's 5V USB port, the device often enters a continuous bootloop (display lights up for 2 seconds, resets, and repeats).

### Why this happens:
During the initial boot stage (when the quad Cortex-A53 cores spin up and the PMIC initializes the eMMC flash), the Qualcomm MSM8916 draws a transient inrush current spike of **800mA–1.2A**. Standard USB 2.0 ports are current-limited to 500mA. The battery normally acts as a high-current reservoir (smoothing capacitor) to absorb these spikes. Without the battery present, the 5V USB line drops below 4.2V, causing a PMIC low-voltage reset (`Under-Voltage Lockout`).

### Fix / Workaround:
1. **Always keep the battery installed**, even when operating tethered over USB.
2. **If running battery-less permanently**: Solder a 1000µF 6.3V low-ESR electrolytic capacitor directly across the `VBAT` and `GND` pins on the battery connector, and connect a 10kΩ resistor between the `NTC` pin and `GND` to simulate a battery present at 25°C.

---

## 2. Inverted LCD Backlight Polarity

### The Issue:
On some hardware production batches of the `HM-MIFIB-V12`, the LCD backlight control pin is wired through an inverting NPN transistor, while on earlier batches it is wired directly to an active-high PMIC GPIO. Flashing a generic device tree may cause the LCD screen to go completely black when the kernel attempts to turn the backlight ON, and turn ON when the kernel attempts to turn it OFF.

### Fix / Workaround:
Invert the PWM polarity in the Linux sysfs or device tree:

```bash
# Check current brightness
cat /sys/class/backlight/panel/brightness

# If the screen is black at maximum value (e.g. 255), set to 0:
echo 0 | sudo tee /sys/class/backlight/panel/brightness
```

---

## 3. Auto-Power-On When Plugged into USB

### The Issue:
By default, the HM-MIFIB requires pressing and holding the physical **Power Button for 3 seconds** to boot. When plugged into USB power while turned off, the Qualcomm PMIC enters offline battery charging mode (displaying a charging animation) instead of booting the Linux operating system.

### Fix / Workaround:
To make the HM-MIFIB automatically boot Linux whenever USB power is applied (ideal for use as an unattended car tracker or home server):

1. **Bootloader trick**: In `lk2nd`, enable the `lk2nd,auto-boot-charger` device tree property.
2. **Fastboot command**:
   ```bash
   fastboot oem off-mode-charge 0
   ```
   This disables offline charging mode and forces the bootloader to proceed directly into the standard kernel boot chain.

---

## 4. Battery Calibration & "0% Capacity" Glitch

### The Issue:
After wiping partitions or flashing new root filesystems, the PM8916 Battery Management Subsystem (`qpnp-bms`) may report `0%` battery charge even when the battery is at 4.1V, triggering an immediate graceful shutdown command from systemd.

### Fix / Workaround:
Allow the battery to undergo one complete charge/discharge cycle so the PM8916 fuel gauge can recalibrate:
```bash
# Prevent systemd from automatically shutting down on critical battery warning
sudo mkdir -p /etc/systemd/logind.conf.d/
echo -e "[Login]\nHandlePowerKey=ignore\nHandleLidSwitch=ignore" | sudo tee /etc/systemd/logind.conf.d/ignore-power.conf
```
Once the battery reaches 4.2V (fully charged) while connected to USB, the fuel gauge calibration resets automatically.
