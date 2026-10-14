---
title: USB Gadget Multi-Function Networking
description: Configure Linux USB Gadget mode to provide virtual Ethernet, serial console, and mass storage over a single USB cable.
---

One of the most powerful features of Linux on the MSM8916 is the **Linux USB Gadget Subsystem (ConfigFS)**. 

Because the USB controller is natively dual-role (OTG), the dongle does not simply act as a consumer device—it can emulate multiple USB peripheral devices simultaneously to your host computer.

---

## What Can USB Gadget Emulate?

```
                    ┌─────────────────────────┐
                    │   MSM8916 OpenStick     │
                    └───────────┬─────────────┘
                                │ (Single USB-A Plug)
             ┌──────────────────┼──────────────────┐
             ▼                  ▼                  ▼
    Virtual Ethernet    Virtual Serial Port   Mass Storage
       (RNDIS/ECM)           (CDC-ACM)            (LUN)
    192.168.68.1 / SSH   /dev/ttyACM0 debug    Mounted Drive
```

1. **Virtual Ethernet (RNDIS / CDC-ECM / CDC-NCM)**:
   - Appears as a high-speed network adapter.
   - Provides instant IP communication (`192.168.68.1`) and SSH access without needing Wi-Fi.
2. **Serial Console (CDC-ACM)**:
   - Appears as a COM port (Windows) or `/dev/ttyACM0` (Linux/macOS).
   - Allows direct terminal login even if the network stack fails or IP changes.
3. **Mass Storage (USB Drive)**:
   - Presents a portion of the eMMC or a loopback `.img` file as a plug-and-play USB thumb drive to your PC.

---

## Managing Gadget Functions via ConfigFS

On OpenStick Debian, gadget configuration is automated via `/usr/sbin/gadget` or systemd scripts located in `/etc/init.d/usb-gadget`.

### Changing the Gadget IP Address
If `192.168.68.1` conflicts with your local home network:

```bash
# Edit the DHCP / DNS daemon config
sudo nano /etc/dnsmasq.d/usb.conf

# Change interface address:
# address=/openstick/192.168.70.1
# dhcp-range=192.168.70.10,192.168.70.50,12h

# Update the network interface config
sudo nano /etc/network/interfaces.d/usb0

# Restart networking
sudo systemctl restart networking
sudo systemctl restart dnsmasq
```

---

## Connecting via USB Serial Console

If your computer fails to acquire an IP over USB Ethernet:

1. Open your terminal or PuTTY / Serial client.
2. Select device `/dev/ttyACM0` (or `COMx` on Windows).
3. Set baud rate to `115200`.
4. Press `Enter` to see the login prompt:
   ```
   Debian GNU/Linux 11 openstick ttyGS0

   openstick login:
   ```
This provides a 100% reliable rescue channel regardless of firewall or network configuration!
