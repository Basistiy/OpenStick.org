---
title: Community Projects Showcase
description: Inspiring real-world projects, builds, and applications powered by hacked MSM8916 modems.
---

import { Card, CardGrid } from '@astrojs/starlight/components';

Discover what makers and engineers around the world have built with their \$5–\$10 MSM8916 modems. Have a project you'd like to share? Submit a pull request!

---

<CardGrid>
  <Card title="📱 4G Telegram SMS Gateway" icon="email">
    Forward SMS verification codes and 2FA tokens directly to a private Telegram channel. Supports sending SMS messages via Telegram bot commands.
    <br/>👉 **[View Tutorial](/projects/sms-gateway/)**
  </Card>

  <Card title="🛡️ Portable Pi-hole & DNS Sinkhole" icon="seti:lock">
    An ad-blocking DNS server running on a USB stick. Plug it into your home router or laptop USB port to block trackers network-wide.
    <br/>👉 **[View Tutorial](/projects/portable-server/)**
  </Card>

  <Card title="🌐 ZeroTier & Tailscale VPN Gateway" icon="rocket">
    A self-contained mesh VPN node that stays connected over 4G cellular anywhere in the world. Ideal for accessing remote lab equipment behind CGNAT.
    <br/>👉 **[View Tutorial](/projects/portable-server/#mesh-vpn-tailscale--zerotier)**
  </Card>

  <Card title="⚡ USB Multi-Gadget Workstation" icon="laptop">
    Turn your dongle into a virtual Ethernet adapter, Serial debug console, and Mass Storage flash drive over a single physical USB connection.
    <br/>👉 **[View Tutorial](/projects/usb-gadget-network/)**
  </Card>

  <Card title="☀️ Solar-Powered Off-Grid Monitor" icon="sun">
    Pair an MSM8916 dongle with a small solar panel and 18650 Li-ion cell to stream sensor readings (temperature, air quality) via MQTT over 4G.
    <br/>👉 *Community contribution welcome!*
  </Card>

  <Card title="📻 RTL-SDR ADS-B Aircraft Tracker" icon="signal">
    Use USB Host mode to connect an RTL-SDR tuner, tracking overhead flights with `dump1090` and feeding data over cellular to FlightRadar24.
    <br/>👉 *Community contribution welcome!*
  </Card>
</CardGrid>

---

## Want to Showcase Your Project Here?

Adding your project to OpenStick.org takes less than 5 minutes!
1. Click **"Edit this page"** at the bottom of the page or create a markdown file in `src/content/docs/projects/`.
2. Include a summary, hardware requirements, and links to your GitHub repo or YouTube build video.
3. Submit a Pull Request!
