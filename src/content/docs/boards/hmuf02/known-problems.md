---
title: "HMUF02 Troubleshooting: LED Drivers, Reset Switch & Thermals"
description: Troubleshooting guide for HMUF02 wingles, covering LED driver inversions, counterfeit chipsets, reset switch bugs, and thermal limits.
---

This page documents the known issues, hardware variations, and fixes specific to the HMUF02 board family.

---

## 1. Silent Substitution of Counterfeit / Non-Qualcomm Chipsets

### The Issue:
The greatest hazard with HMUF02 sticks is that late production batches often reuse the exact same plastic shell and packaging while replacing the Qualcomm MSM8916 with an **ASR1802** or **ZX297520** chipset. These clone chips cannot run ARM64 Linux or OpenStick firmware.

### Diagnosis:
Connect the factory device to a PC and run:

```bash
adb shell getprop ro.board.platform
```

- If it returns `msm8916`, your stick is authentic.
- If it returns `asr1802`, `zx297520`, or `sp9820e`, the board is incompatible with OpenStick.

---

## 2. Inverted Power & Status LED GPIOs

### The Issue:
On standard OpenStick Debian kernels, the HMUF02's main status LED may remain unlit, or the 4G LED might turn solid red instead of green upon establishing a network connection. This occurs because the HMUF02 routes the power indicator to **GPIO 3** with Active Low polarity, whereas reference UFI001B boards expect Active High on GPIO 0.

### Fix / Workaround:
Create a custom systemd startup service to configure the LED properly:

```bash
# /etc/systemd/system/hmuf02-leds.service
[Unit]
Description=HMUF02 LED Fix
After=network.target

[Service]
Type=oneshot
ExecStart=/bin/sh -c 'echo 0 > /sys/class/leds/red:power/brightness && echo 1 > /sys/class/leds/green:power/brightness'

[Install]
WantedBy=multi-user.target
```

Enable the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now hmuf02-leds.service
```

---

## 3. Stuck or Misaligned Reset Switch

### The Issue:
The mechanical reset button on the PCB is aligned beneath a thin plastic actuation pin. On some cheap shells, the button can become physically stuck in a depressed state when the casing is snapped together, causing the stick to boot perpetually into recovery mode or reboot every 10 seconds.

### Fix / Workaround:
1. Open the two plastic shell halves with a plastic spudger.
2. Inspect the miniature SMD tactile switch on the board. Ensure the metal dome clicks freely.
3. If necessary, trim 0.5mm off the interior plastic pin using an X-Acto knife or utility blade to prevent mechanical binding.

---

## 4. RF Signal Attenuation from Stock Ceramic Antenna

### The Issue:
The HMUF02 uses a very small onboard ceramic chip antenna for 4G LTE. In indoor environments or areas with weak LTE signals, speeds can drop below 1 Mbps and the modem may disconnect frequently.

### Fix / Workaround:
Solder a 5cm IPEX/u.FL coaxial pigtail to the antenna feed pad near the edge of the board (see [HMUF02 Pinouts](/boards/hmuf02/pinouts/)) and attach an external 3dBi or 5dBi rubber ducky antenna. Community tests report an immediate **15–20 dBm improvement in RSRP signal quality**.
