---
title: "Pocket Linux Server: Docker, Pi-hole & Tailscale on MSM8916"
description: Turn your MSM8916 4G USB modem into an ultra-low-power pocket server running Docker containers, Pi-hole DNS ad-blocking, and Tailscale mesh VPN.
---

With 4x ARM Cortex-A53 cores and up to 1GB RAM, an OpenStick modem running Debian or postmarketOS can effortlessly host lightweight microservices, ad-blockers, and VPN clients.

---

## 1. Setting up Pi-hole (Network Ad Blocking)

Pi-hole acts as a DNS sinkhole, blocking advertising and tracking domains before they reach your devices.

### Installing Pi-hole
SSH into your dongle and run the official unattended installer:

```bash
# Fetch and run the Pi-hole installation script
curl -sSL https://install.pi-hole.net | bash
```

- When prompted for the network interface, choose `wlan0` (if acting as Wi-Fi AP) or `usb0` (if connected via USB Ethernet).
- Set an admin web password:
  ```bash
  pihole -a -p
  ```
- Access the web interface at `http://192.168.68.1/admin`.

*Power draw: ~1.2W. You now have a complete hardware ad-blocker powered directly from any USB port.*

---

## 2. Mesh VPN: Tailscale & ZeroTier

If you deploy your modem in a remote location (e.g. holiday home, remote weather station, inside a vehicle), cellular carriers put your connection behind **Carrier-Grade NAT (CGNAT)**, preventing incoming port forwarding.

A mesh VPN like **Tailscale** or **ZeroTier** punches through NAT seamlessly.

### Installing Tailscale
```bash
# Install Tailscale repository and package
curl -fsSL https://tailscale.com/install.sh | sh

# Authenticate and bring up interface
sudo tailscale up --advertise-exit-node
```

Now, your MSM8916 dongle is accessible from your laptop or phone anywhere in the world over a secure WireGuard mesh. By advertising itself as an exit node, you can even route your laptop's web traffic through the dongle's 4G cellular connection!

---

## 3. Running Docker Containers

For modems equipped with **1 GB RAM** (e.g. UFI003 revisions), Docker provides a clean way to deploy microservices.

### Installing Docker
```bash
# Install official Docker script
curl -fsSL https://get.docker.com | sh

# Add user to docker group
sudo usermod -aG docker user
```

### Recommended Lightweight Containers
Because RAM is limited (512MB–1GB), choose lightweight Alpine-based images:

```bash
# Uptime Kuma (Server monitoring)
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:alpine

# Nginx Web Server
docker run -d --restart=always -p 8080:80 nginx:alpine
```

### Memory Optimization Tip: Enable zram
To maximize RAM on 512MB/1GB devices, enable compressed RAM swap:
```bash
sudo apt install -y zram-tools
sudo tee /etc/default/zramswap << 'EOF'
ALGO=zstd
PERCENT=50
EOF
sudo systemctl restart zramswap
```
This effectively increases available memory by 50–70% with negligible CPU overhead!
