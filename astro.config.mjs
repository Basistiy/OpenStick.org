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
          label: 'UZ801',
          items: [
            { label: 'Buying Guide & Identification', slug: 'boards/uz801/buying' },
            { label: 'Pinouts & Test Points', slug: 'boards/uz801/pinouts' },
            { label: 'Flashing & OS Guide', slug: 'boards/uz801/flashing' },
            { label: 'Known Problems & Quirks', slug: 'boards/uz801/known-problems' },
          ],
        },
        {
          label: 'HMUF02',
          items: [
            { label: 'Buying Guide & Identification', slug: 'boards/hmuf02/buying' },
            { label: 'Pinouts & Test Points', slug: 'boards/hmuf02/pinouts' },
            { label: 'Flashing & OS Guide', slug: 'boards/hmuf02/flashing' },
            { label: 'Known Problems & Quirks', slug: 'boards/hmuf02/known-problems' },
          ],
        },
        {
          label: 'HM-MIFIB (Display & Battery)',
          items: [
            { label: 'Buying Guide & Identification', slug: 'boards/hm-mifib/buying' },
            { label: 'Pinouts, Screen & Battery', slug: 'boards/hm-mifib/pinouts' },
            { label: 'Flashing & OS Guide', slug: 'boards/hm-mifib/flashing' },
            { label: 'Known Problems & Quirks', slug: 'boards/hm-mifib/known-problems' },
          ],
        },
        {
          label: 'UFI001B / UFI001C',
          items: [
            { label: 'Buying Guide & Identification', slug: 'boards/ufi001/buying' },
            { label: 'Pinouts & Test Points', slug: 'boards/ufi001/pinouts' },
            { label: 'Flashing & OS Guide', slug: 'boards/ufi001/flashing' },
            { label: 'Known Problems & Quirks', slug: 'boards/ufi001/known-problems' },
          ],
        },
        {
          label: 'UFI003 (1GB RAM Flagship)',
          items: [
            { label: 'Buying Guide & Identification', slug: 'boards/ufi003/buying' },
            { label: 'Pinouts & Test Points', slug: 'boards/ufi003/pinouts' },
            { label: 'Flashing & OS Guide', slug: 'boards/ufi003/flashing' },
            { label: 'Known Problems & Quirks', slug: 'boards/ufi003/known-problems' },
          ],
        },
        {
          label: 'SP970',
          items: [
            { label: 'Buying Guide & Identification', slug: 'boards/sp970/buying' },
            { label: 'Pinouts & Test Points', slug: 'boards/sp970/pinouts' },
            { label: 'Flashing & OS Guide', slug: 'boards/sp970/flashing' },
            { label: 'Known Problems & Quirks', slug: 'boards/sp970/known-problems' },
          ],
        },
        {
          label: 'UF896 & NAND Clones',
          items: [
            { label: 'Buying Guide & Identification', slug: 'boards/zhihe-nand/buying' },
            { label: 'Pinouts & Test Points', slug: 'boards/zhihe-nand/pinouts' },
            { label: 'Flashing & OS Guide', slug: 'boards/zhihe-nand/flashing' },
            { label: 'Known Problems & Quirks', slug: 'boards/zhihe-nand/known-problems' },
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
