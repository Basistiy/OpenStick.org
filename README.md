# OpenStick.org

[![Deploy to GitHub Pages](https://github.com/Basistiy/OpenStick.org/actions/workflows/deploy.yml/badge.svg)](https://github.com/Basistiy/OpenStick.org/actions/workflows/deploy.yml)
[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)
[![Telegram](https://img.shields.io/badge/Telegram-Chat-blue.svg?logo=telegram)](https://t.me/openstick_org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official community documentation, modding, and project hub for **Qualcomm Snapdragon 410 (MSM8916) 4G LTE USB modems & wingles**, hosted at [openstick.org](https://openstick.org).

---

## ⚡ The OpenStick Mission

During the **2025–2026 AI boom hardware shortage**, standard single-board computers like the **Raspberry Pi Zero 2 W** became scarce, backordered, and expensive.

Makers and developers turned to the massive global supply of generic **\$5–\$10 4G LTE USB dongles** powered by the Qualcomm MSM8916:
- **CPU**: Quad-core 64-bit ARM Cortex-A53 @ 1.2 GHz
- **RAM**: 512 MB – 1 GB LPDDR3
- **Storage**: 4 GB – 8 GB onboard high-speed eMMC (no SD card corruption!)
- **Connectivity**: Onboard 4G LTE Cat 4 modem + 2.4 GHz Wi-Fi + Bluetooth
- **Form Factor**: Self-contained USB thumb drive with integrated power management

**OpenStick.org** provides curated guides, hardware schematics, safety procedures, video tutorials, and showcase projects for these devices.

---

## 💬 Community

Join the live Telegram discussion group to ask questions, verify board clones from PCB photos, and share your setups:
👉 **[t.me/openstick_org](https://t.me/openstick_org)**

---

## 🚀 How to Contribute

Anyone can contribute! Every page on [openstick.org](https://openstick.org) has an **"Edit this page"** button that lets you submit updates directly through GitHub in your browser.

See [CONTRIBUTING.md](CONTRIBUTING.md) for full instructions.

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/Basistiy/OpenStick.org.git
cd OpenStick.org

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` in your browser.

### Building for Production
```bash
npm run build
```
Static output is compiled to the `dist/` directory with full offline Pagefind search indices.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
