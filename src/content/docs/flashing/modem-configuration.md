---
title: 4G LTE & ModemManager Setup
description: How to configure cellular data, APN, signal metrics, and SMS handling in Linux using ModemManager and mmcli.
---

Once you are booted into Debian or postmarketOS, you need to manage the Qualcomm MDM9625/MDM9207/MSM8916 baseband processor. In modern Linux distributions, this is handled through **ModemManager** and its command-line companion **`mmcli`**.

---

## 1. Verifying Modem Detection

Check if ModemManager recognizes the integrated cellular baseband:

```bash
# List detected modems
mmcli -L
```

Expected output:
```
/org/freedesktop/ModemManager1/Modem/0 [QUALCOMM] MSM8916
```

Inspect detailed modem status:
```bash
mmcli -m 0
```
This command outputs manufacturer info, hardware revision, IMEI, SIM status, power state, and supported frequency bands.

---

## 2. Unlocking and Enabling the Radio

Ensure the cellular radio is powered on:

```bash
# Enable the modem
mmcli -m 0 -e
```

If your SIM card has a PIN code:
```bash
mmcli -i 0 --pin="1234"
```

---

## 3. Configuring Carrier APN with NetworkManager

The easiest and most reliable way to maintain persistent cellular connectivity on Linux is using `nmcli` (NetworkManager):

```bash
# Create a cellular connection profile
sudo nmcli connection add \
  type gsm \
  ifname cdc-wdm0 \
  con-name "Cellular-4G" \
  apn "YOUR_CARRIER_APN"

# Example for T-Mobile:
# apn "fast.t-mobile.com"

# Example for Vodafone:
# apn "live.vodafone.com"

# Activate the cellular connection
sudo nmcli connection up "Cellular-4G"
```

Test your internet connection over 4G:
```bash
curl -I https://openstick.org
```

---

## 4. Reading and Sending SMS via Terminal

Because the modem communicates directly with Linux via QMI/MBIM, you can read incoming verification codes (2FA) and send text messages directly from scripts:

### Sending an SMS
```bash
# Create SMS object
mmcli -m 0 --messaging-create-sms="text='Hello from OpenStick Linux!',number='+1234567890'"

# Send the created SMS (usually ID 0)
mmcli -s 0 --send
```

### Reading Incoming SMS
```bash
# List all messages on the SIM card
mmcli -m 0 --messaging-list-sms

# View message content (e.g. message 0)
mmcli -s 0
```
This capability forms the foundation of automated SMS verification gateways and Telegram notification bots!
