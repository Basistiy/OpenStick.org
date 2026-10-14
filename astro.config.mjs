import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://openstick.org',
  integrations: [
    starlight({
      title: 'OpenStick Community',
      description:
        'Community documentation, guides, projects, and videos for MSM8916 4G USB modems & wingles',
      logo: {
        src: './src/assets/logo.svg',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Basistiy/OpenStick.org',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/Basistiy/OpenStick.org/edit/main/',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Overview & Story',
          items: [
            { label: 'Origin Story & The AI Boom Shortage', slug: 'about/origin-story' },
            { label: 'MSM8916 vs Raspberry Pi Zero 2 W', slug: 'about/pi-zero-2w-comparison' },
          ],
        },
        {
          label: 'Getting Started',
          items: [
            { label: 'Quick Start Guide', slug: 'getting-started/quickstart' },
            { label: 'Device Identification', slug: 'getting-started/device-identification' },
            { label: 'Safety & Backups (QCN/EDL)', slug: 'getting-started/backup-safety' },
            { label: 'Essential Tools (EDL/Fastboot)', slug: 'getting-started/tools-setup' },
          ],
        },
        {
          label: 'Flashing & OS',
          items: [
            { label: 'Debian (OpenStick Base)', slug: 'flashing/debian' },
            { label: 'postmarketOS (Mainline Linux)', slug: 'flashing/postmarketos' },
            { label: 'OpenWrt Travel Router', slug: 'flashing/openwrt' },
            { label: '4G LTE & ModemManager', slug: 'flashing/modem-configuration' },
          ],
        },
        {
          label: 'Hardware & Modding',
          items: [
            { label: 'Board Gallery & Revisions', slug: 'hardware/boards' },
            { label: 'Test Points & EDL Recovery', slug: 'hardware/test-points' },
            { label: 'UART Serial Console', slug: 'hardware/uart-console' },
            { label: 'Antennas & Hardware Mods', slug: 'hardware/antenna-and-mods' },
          ],
        },
        {
          label: 'Community Projects',
          items: [
            { label: 'Projects Showcase', slug: 'projects/showcase' },
            { label: 'SMS & Telegram Gateway', slug: 'projects/sms-gateway' },
            { label: 'Portable Docker & Pi-hole', slug: 'projects/portable-server' },
            { label: 'USB Gadget Networking', slug: 'projects/usb-gadget-network' },
          ],
        },
        {
          label: 'Video Library',
          items: [
            { label: 'Curated Video Tutorials', slug: 'videos/library' },
          ],
        },
        {
          label: 'Contributing',
          items: [
            { label: 'How to Contribute', slug: 'community/contributing' },
            { label: 'Adding Guides & Media', slug: 'community/adding-content' },
          ],
        },
      ],
    }),
  ],
});
