export interface RedirectLink {
  slug: string;
  target: string;
  title: string;
  device: string;
  platform: string;
  silkscreen: string;
}

export const redirectLinks: Record<string, RedirectLink> = {
  'uz801-aliexpress-1': {
    slug: 'uz801-aliexpress-1',
    target: 'https://www.aliexpress.com/item/1005012883269576.html',
    title: 'UZ801 4G LTE USB Modem Dongle (Store 1)',
    device: 'UZ801',
    platform: 'AliExpress',
    silkscreen: 'UZ801_V3.31',
  },
  'uz801-aliexpress-2': {
    slug: 'uz801-aliexpress-2',
    target: 'https://www.aliexpress.com/item/1005012985657609.html',
    title: 'UZ801 4G LTE USB Wireless Modem (Store 2)',
    device: 'UZ801',
    platform: 'AliExpress',
    silkscreen: 'UZ801_V3.31',
  },
  'uz801-aliexpress-3': {
    slug: 'uz801-aliexpress-3',
    target: 'https://www.aliexpress.com/item/1005010169664336.html',
    title: 'UZ801 4G Wi-Fi Router USB Dongle (Store 3)',
    device: 'UZ801',
    platform: 'AliExpress',
    silkscreen: 'UZ801_V3.31',
  },
  'uz801-allegro': {
    slug: 'uz801-allegro',
    target: 'https://allegro.pl/oferta/modem-4g-lte-usb-wifi-na-karte-sim-domowy-router-odu-mobilny-mocny-szybki-18259575322',
    title: 'Modem 4G LTE USB Wi-Fi SIM (Allegro)',
    device: 'UZ801',
    platform: 'Allegro',
    silkscreen: 'UZ801_V3.0',
  },
  'hm-mifib-allegro': {
    slug: 'hm-mifib-allegro',
    target: 'https://allegro.pl/oferta/przenosny-mobilny-router-wifi-4g-lte-wifi-sim-play-plus-t-mobile-orange-18917774623',
    title: 'Przenośny Router Wi-Fi 4G LTE SIM (Allegro)',
    device: 'HM-MIFIB',
    platform: 'Allegro',
    silkscreen: 'HM-MIFIB_V18',
  },
};
