---
title: "UZ801 Troubleshooting & Common Issues: Wi-Fi, Thermals & LEDs"
description: Common issues, troubleshooting tips, thermal fixes, LED bugs, and solutions for the UZ801 4G USB dongle.
---

While the UZ801 is one of the most reliable MSM8916 boards, several known quirks and limitations have been identified by the community.

---

## 1. Thermal Throttling Under Sustained Load

### The Issue:
The MSM8916 CPU and Qualcomm PMIC are enclosed inside a sealed plastic shell. Under heavy compilation or continuous 4G LTE downloads, internal temperatures can exceed **80°C**, triggering CPU thermal frequency throttling (dropping from 1.2 GHz down to 400 MHz).

### Fix / Workaround:
1. **Silicone Thermal Pad**: Apply a 1.0mm or 1.5mm thermal conductive pad directly between the RF metal shield covering the MSM8916 and the interior of the plastic shell.
2. **Ventilation Holes**: Drill or slice small 1.5mm ventilation holes in the top and bottom covers above the processor area.
3. **Copper Heatsink**: Affix a miniature 9x9mm copper shim to the metal RF can.

---

## 2. LED Indicator Inversions Across Board Revisions

### The Issue:
Between board revisions `UZ801_V2.1` and `UZ801_V3.0`, the manufacturer altered the GPIO routing and polarity for the status LEDs:
- On some batches, the power LED remains illuminated red while booting and never turns green.
- On other batches, the Wi-Fi LED stays permanently off.

### Fix / Workaround:
You can manually test and control the LEDs via Linux sysfs:

```bash
# Check available LEDs
ls /sys/class/leds/

# Turn on green LED
echo 1 | sudo tee /sys/class/leds/green:power/brightness

# Turn off red LED
echo 0 | sudo tee /sys/class/leds/red:power/brightness

# Set Wi-Fi activity trigger
echo phy0-rx | sudo tee /sys/class/leds/blue:wifi/trigger
```

---

## 3. Brownout Reboots on Low-Current USB Ports

### The Issue:
When the cellular modem transmits at maximum RF power in fringe signal areas, instantaneous peak current draw can spike to **1.1A–1.3A**. Connecting the stick to an unpowered USB hub or an older PC port rated for only 500mA can cause an instant power brownout, resulting in unexpected reboots or eMMC filesystem corruption.

### Fix / Workaround:
- Always power the UZ801 from a USB 3.0 port (900mA minimum), a dedicated 5V 2A USB wall adapter, or a powered USB hub.
- When flashing or updating system packages over Wi-Fi/4G, avoid low-quality USB extension cables with thin gauge wiring.

---

## 4. MAC Address Randomization on Mainline Linux

### The Issue:
Stock Android firmware read the Wi-Fi MAC address from the modem NV partition (`fsg` / `modemst1`). Under vanilla mainline Linux or minimal postmarketOS builds, the WCN3620 driver may generate a random MAC address on every reboot, causing your local router to assign a new DHCP IP address.

### Fix / Workaround:
Configure a static MAC address in NetworkManager or systemd-networkd:

```ini
# /etc/NetworkManager/conf.d/10-persistent-mac.conf
[device]
wifi.scan-rand-mac-address=no

[connection]
wifi.cloned-mac-address=preserve
```

Or assign a fixed MAC via udev rule:
```bash
# /etc/udev/rules.d/70-persistent-net.rules
SUBSYSTEM=="net", ACTION=="add", DRIVERS=="?*", ATTR{address}=="*", KERNEL=="wlan0", ATTR{address}="02:ba:89:16:01:02"
```

---

## 5. No Physical Fastboot Hardware Key

Unlike smartphones or tablets, the UZ801 has no physical volume buttons. If a faulty kernel or broken init system prevents booting to Linux:
- `adb reboot bootloader` cannot be used.
- **Solution**: You must pop open the plastic casing and short the **`EDL`** test pad to **`GND`** with tweezers during USB insertion (see [UZ801 Pinouts](/boards/uz801/pinouts/)).

---

## 6. ADB Disabled on Factory Firmware

### The Issue:
When plugging a brand-new UZ801 into your computer, `adb devices` returns an empty list, and the stick only enumerates as a virtual CD-ROM or USB modem.

### Fix / Workaround:
USB debugging is disabled by default in factory firmware. You do not need to short test points to access ADB:
1. Connect your computer or phone to the modem's Wi-Fi network.
2. In your web browser, navigate to:
   ```
   http://192.168.100.1/usbdebug.htm
   ```
3. Enable USB debugging (ADB).
4. Run `adb devices` over USB to verify that the device is now detected.
